import { SimpleTwoBitCanvas } from "./simpletwobitcanvas.js";
import { TileMap, TileSet } from "../modules/tile_collections.js";
import { imageToCanvas, imageDataToColourIndexedTiles } from "../modules/image_conversion.js";
import { ditherToColourIndex } from "../modules/dither.js";
import { pixelArrayToTiles } from "../modules/data_conversion.js";
import { kMeans } from "../modules/kmeans.js";
import { kGreenColours } from "../modules/colours.js";

const kTemplate = document.createElement('template');
kTemplate.innerHTML = `
<div id="container">
  <simple-two-bit-canvas id="drawing"></simple-two-bit-canvas>
`;

export class PictureRender extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(kTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    /** @type{SimpleTwoBitCanvas} */
    this.drawing = this.shadowRoot.getElementById('drawing');
    this.width = 160;
    this.height = 144;
    const ctx = this.drawing.canvas.getContext('2d');
    ctx.fillStyle = 'rgb(240 248 208)';
    ctx.fillRect(0, 0, 1984, 1984);
  }
  draw({image, contrast, brightness, tileCount}) {
    image ??= this.image;
    contrast ??= this.contrast ?? 1;
    brightness ??= this.brightness ?? 1;
    tileCount ??= this.tileCount ?? 360;
    const needConvertToRawTiles = image !== this.image || contrast !== this.contrast || brightness !== this.brightness;
    const needTileReduction = needConvertToRawTiles || tileCount !== this.tileCount;
    this.image = image;
    this.contrast = contrast;
    this.brightness = brightness;
    this.tileCount = tileCount;
  
    if (!this.image) {
      return;
    }
  
    const canvas = document.createElement('canvas');
    canvas.width = this.image.width;
    canvas.height = this.image.height;
    const ctx = canvas.getContext('2d');
    const hasFilter = !!ctx.filter;
    ctx.filter = `contrast(${this.contrast}) brightness(${this.brightness})`;
    imageToCanvas(this.image, canvas, 'fit');
    ctx.filter = 'none';
  
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
    if (!hasFilter) {
      for (let i = 0; i < canvas.width * canvas.height; ++i) {
        for (let j = 0; j < 3; ++j) {
          let value = imageData.data[i * 4 + j];
          value = Math.min(255, value * contrast + (0.5 - contrast * 0.5) * 256);
          value = Math.min(255, value * brightness);
          imageData.data[i * 4 + j] = value;
        }
      }
    }
  
    this.rawTiles = imageDataToColourIndexedTiles(
      imageData,
      ditherToColourIndex,
      (pixels) => pixelArrayToTiles(pixels, canvas.width, canvas.height).tiles
    );
  
    const uniqueStringTiles = new Set();
    for (const t of this.rawTiles) {
      uniqueStringTiles.add(t.toString());
    }
    const uniqueTiles = [];
    for (const st of uniqueStringTiles) {
      uniqueTiles.push(Uint8Array.from(st.split(',')));
    }
    this.uniqueTileCount = uniqueTiles.length;
    const initialCentroids = uniqueTiles.slice(0, this.tileCount);
  
    if (initialCentroids.length < this.tileCount) {
      const diff = this.tileCount - initialCentroids.length;
      for (let i = 0; i < diff; ++i) {
        initialCentroids.push(initialCentroids[i]);
      }
    }
  
    const [_, reducedTiles, assignments] = kMeans(this.rawTiles, this.tileCount, {round: true, initialCentroids});
  
    const tileSet = new TileSet(this.tileCount);
    for (let i = 0; i < this.tileCount; ++i) {
      tileSet.setTile(i, reducedTiles[i]);
    }
  
    const widthInTiles = Math.ceil(this.image.width / 8);
    const heightInTiles = Math.ceil(this.image.height / 8);
    this.tileMap = new TileMap(widthInTiles, heightInTiles, tileSet);
    for (let i = 0; i < this.rawTiles.length; ++i) {
      this.tileMap.setTile(i, assignments[i]);
    }
  
    this.drawing.width = this.image.width;
    this.drawing.height = this.image.height;
    this.drawing.draw(this.tileMap, tileSet, kGreenColours, 0, 0);
  }  
}
customElements.define('picture-render', PictureRender);