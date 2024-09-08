# Pic To GB

[Live Demo](https://wdeltamyk.github.io/image_to_gb/)

## Overview

Pic To GB is a sophisticated tool designed for converting images into Game Boy graphics format. This project caters to both aesthetic enthusiasts and homebrew game developers, offering a unique blend of retro styling and practical functionality.

## Features

- **Flexible Image Processing**: Converts images to Game Boy graphics while maintaining original dimensions.
- **Color Reduction**: Implements a 4-color palette conversion, emulating the classic Game Boy aesthetic.
- **Tile-Based Graphics**: Transforms images into tile-based formats, authentic to Game Boy architecture.
- **Adjustable Parameters**: Fine-tune contrast and brightness for optimal rendering.
- **Export Options**: Download processed images or generate playable Game Boy ROMs.
- **Tile Limitation**: Option to restrict tile count, creating intentional glitch aesthetics or optimizing for hardware constraints.

## Technical Specifications

- **Processing**: All operations are performed client-side, ensuring data privacy and rapid processing.
- **ROM Generation**: Creates simple, image-display ROMs compatible with both emulators and original hardware.
- **Tile Limits**: Supports standard Game Boy (196 tiles) and Game Boy Color (256 tiles) specifications.

## Developer Notes

This project extends the original concept to support homebrew game development. Key modifications include:

- Removal of the 160x144 pixel restriction, allowing for larger, more detailed scenes.
- Implementation of customizable tile limits for multi-part scene development.
- Optimized for integration with tools like GB Studio and GBSDK.

## Usage Guidelines

1. For optimal performance, process large images in sections.
2. When creating multi-part scenes, allocate tile budgets accordingly (e.g., 64 tiles per quarter for a four-part scene).
3. Export processed images for reassembly or direct use in development environments.

## Running the Application

- Open the HTML file directly in a web browser.
- Alternatively, serve through a local development server (e.g., VSCode's Live Server or Python's `http.server`).

Note: Processing time may increase with larger images. Sectioning large images is recommended for efficiency.

## Data Privacy

This application processes all data locally within the user's browser. No information is uploaded or transmitted to external servers.

---

Contributions and feedback are welcome. For any inquiries or suggestions, please open an issue on the GitHub repository.
