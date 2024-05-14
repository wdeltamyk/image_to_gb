# Pic To GB

[demo](https://nogfbcmikeoxmaul.github.io/image_to_gb/)

## What is this?

A tool for converting pictures into Game Boy graphics!

You select a picture. ~~The picture is cropped and resized to fit the Game Boy's 160x144 display~~ The picture is output at the same size that it's input in as, for no reason I also changed the initial display of the program, which instantly shrinks to the correct size, this does not impact the image in any way. It's then reduced to 4 colours, converted to tile based graphics and rendered.

You can adjust the contrast and brightness to get a better rendering then download the image or even a ROM to play on your Game Boy!

If you want to get even more of a taste for Game Boy graphics you can limit the number of tiles to 256 or fewer. This will "simplify" the picture and make it look glitchy and blocky.

## Data privacy

Nothing is uploaded. Everything is done locally in the browser and the picture isn't sent to a server.

## ROM?

You can generate a game ROM that you can play in a browser or put on a flash cart to play on original hardware. The ROM just displays the image, that's it!

## Mike's changes - the "why?"

I love the original program, but it's designed for gameboyifying an image for aesthetics, hence the size limit of 160x144. My changes alter the behaviour for the purpose of homebrew game development, so you can create a graphically intense scene with a lot of colours and details, then chop it up into a several files (preferably a size divisible of 8), figure out the tile limit, for example if you have 4 images making up one entire scene, limit each image to 64 tiles, and after the settings are adjusted, you can stitch the image back together with the changes, and throw this into GB Studio or use with GBSDK.

## Tile limits

If you're making a homebrew game you're probably aware of these already, but for a standard GB game it's 196, for a GBC game it's 256, anything past that and you'll lose tiles or outright have a corrupted image/no image at all.

## Running

As the original, you can export as a rom, or you can just run the html file through VSCode or serve it through a cli local server like http for python.
Note however that the bigger the image is the more sluggish it will return results, so I strongly recommend chopping an image up.