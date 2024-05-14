
/**
 * @param {ImageData} imageData 
 * @param {(imageData: ImageData) => Uint8Array} imageQuantizer 
 * @param {(pixels: ArrayBuffer) => Uint8Array[]} tiler 
 */
function imageDataToColourIndexedTiles(imageData, imageQuantizer, tiler) {
  const colourIndexedPixels = imageQuantizer(imageData);
  return tiler(colourIndexedPixels);
}


/**
 * @param {HTMLImageElement} image
 * @param {HTMLCanvasElement} canvas
 * @param {"fit" | "crop"} fitType
 */
function imageToCanvas(image, canvas, fitType='fit') {
  let dx, dy, dw, dh, sx, sy, sw, sh;
  const ctx = canvas.getContext('2d');
  const aspectRatio = image.width / image.height;
  if (fitType === 'fit') {
    dw = canvas.width;
    dh = dw / aspectRatio;
    if (dh > canvas.height) {
      dh = canvas.height;
      dw = dh * aspectRatio;
    }
    dx = (canvas.width - dw) / 2;
    dy = (canvas.height - dh) / 2;
  } else {
    dx = 0;
    dy = 0;
    dw = canvas.width;
    dh = canvas.height;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, image.width, image.height, dx, dy, dw, dh);
}

export {
  imageDataToColourIndexedTiles,
  imageToCanvas
}