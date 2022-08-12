class $1553da85f4acc4fe$var$$ab4e1cafa3bfd981$var$CenterJS {
    generate(options) {
        this.ctx = this.canvas.getContext("2d");
        /**
     * Set defaults.
     */ const defaults = {
            canvas: document.createElement("canvas"),
            width: 128,
            height: 128,
            text: "C",
            fontColor: "white",
            fontFamily: "Helvetica",
            fontSize: 64,
            fontWeight: "400",
            fontStyle: "normal",
            shape: "square",
            backgroundColor: "black"
        };
        /**
     * Override defaults with options.
     */ this.data = Object.assign({}, defaults, options);
        this.width = this.data.width;
        this.height = this.data.height;
        this.text = this.data.text;
        this.fontColor = this.data.fontColor;
        this.fontFamily = this.data.fontFamily;
        this.fontSize = this.data.fontSize;
        this.fontWeight = this.data.fontWeight;
        this.fontStyle = this.data.fontStyle;
        this.shape = this.data.shape;
        this.backgroundColor = this.data.backgroundColor;
        /**
     * Set the width and height of the canvas as 2x of the desired width and
     * height. Use the style attribute of the canvas to set the desired width
     * and height of the canvas then scale the content up by a factor of 2. This
     * will allow support for retina displays.
     */ this.canvas.width = 2 * this.width;
        this.canvas.height = 2 * this.height;
        this.canvas.style.width = this.width + "px";
        this.canvas.style.height = this.height + "px";
        this.ctx.scale(2, 2);
        /**
     * Draw and return the canvas.
     */ this.drawBackground();
        this.drawText();
        return this.canvas;
    }
    drawBackground() {
        switch(this.shape){
            case "square":
                this.drawSquare();
                break;
            case "circle":
                this.drawCircle();
                break;
            case "rounded":
                this.drawRounded();
                break;
            default:
                this.drawSquare();
                break;
        }
    }
    drawSquare() {
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.width, this.height);
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fill();
    }
    drawCircle() {
        this.ctx.beginPath();
        this.ctx.arc(this.width / 2, this.height / 2, this.height / 2, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fill();
    }
    drawRounded() {
        this.ctx.beginPath();
        const radius = this.height / 10;
        this.ctx.moveTo(this.width, this.height);
        this.ctx.arcTo(0, this.height, 0, 0, radius);
        this.ctx.arcTo(0, 0, this.width, 0, radius);
        this.ctx.arcTo(this.width, 0, this.width, this.height, radius);
        this.ctx.arcTo(this.width, this.height, 0, this.height, radius);
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fill();
    }
    drawText() {
        this.ctx.fillStyle = this.fontColor;
        this.ctx.font = this.fontString();
        this.ctx.textBaseline = "alphabetic";
        this.ctx.textAlign = "center";
        const offsets = this.measureOffsets(this.text, this.fontFamily, this.fontSize);
        const x = this.width / 2 + offsets.horizontal;
        const y = this.height / 2 + offsets.vertical;
        this.ctx.fillText(this.text, x, y);
    }
    /**
   * Offsets are the differece between the center of the canvas and the center
   * of the text on the canvas.
   */ measureOffsets(text, fontFamily, fontSize) {
        /**
     * Create and setup canvas
     */ const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        ctx.font = this.fontString();
        /**
     * Make sure that there is enough room on the canvas for the text. Changing
     * the width or height of a canvas element clears the content so you need
     * to set the font again.
     */ canvas.width = 2 * ctx.measureText(text).width;
        canvas.height = 2 * fontSize;
        /**
     * Center the text vertically and horizontally using the build in canvas
     * functionality (textBaseline and textAlign). We're going to measure how
     * far off the text is from the actual center since the textBaseline and
     * textAlign are not always accurate.
     */ ctx.font = this.fontString();
        ctx.textBaseline = "alphabetic";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
        /**
     * Get image data so that we can iterate of every RGBA pixel.
     */ const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let textTop;
        let textBottom;
        for(let y = 0; y <= canvas.height; y++)for(let x = 0; x <= canvas.width; x++){
            let r_index = 4 * (canvas.width * y + x);
            let r_value = data[r_index];
            if (r_value === 255) {
                if (!textTop) textTop = y;
                textBottom = y;
                break;
            }
        }
        /**
     * Vertical offset is the difference between the horizontal center of the
     * canvas and the horizontal center of the text on the canvas.
     */ const canvasHorizontalCenterLine = canvas.height / 2;
        const textHorizontalCenterLine = (textBottom - textTop) / 2 + textTop;
        let textLeft;
        let textRight;
        for(let x1 = 0; x1 <= canvas.width; x1++)for(let y1 = 0; y1 <= canvas.height; y1++){
            let r_index = 4 * (canvas.width * y1 + x1);
            let r_value = data[r_index];
            if (r_value === 255) {
                if (!textLeft) textLeft = x1;
                textRight = x1;
                break;
            }
        }
        /**
     * Horizontal offset is the difference between the vertical center of the
     * canvas and the vertical center of the text on the canvas.
     */ const canvasVerticalCenterLine = canvas.width / 2;
        const textVerticalCenterLine = (textRight - textLeft) / 2 + textLeft;
        return {
            vertical: canvasHorizontalCenterLine - textHorizontalCenterLine,
            horizontal: canvasVerticalCenterLine - textVerticalCenterLine
        };
    }
    fontString() {
        return `${this.fontStyle} ${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`;
    }
    constructor(canvas){
        this.canvas = canvas;
    }
}
var $1553da85f4acc4fe$export$2e2bcd8739ae039 = $1553da85f4acc4fe$var$$ab4e1cafa3bfd981$var$CenterJS;


class $2674e46c3172c630$var$$058517cf1355ff1a$var$Resize {
    /**
   * Resize the canvas by halving the width and height. This produces better
   * sampling and the image quality is generally better.
   */ generate(width, height) {
        while(this.canvas.width / 2 >= width)this._resize(this.canvas.width / 2, this.canvas.height / 2);
        if (this.canvas.width > width) this._resize(width, height);
        return this.canvas;
    }
    /**
   * Simple resize of a canvas element.
   */ _resize(width, height) {
        let canvas = document.createElement("canvas");
        let resizedContext = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;
        resizedContext.drawImage(this.canvas, 0, 0, width, height);
        this.canvas = canvas;
    }
    constructor(canvas){
        this.canvas = canvas;
    }
}
var $2674e46c3172c630$var$$058517cf1355ff1a$export$2e2bcd8739ae039 = $2674e46c3172c630$var$$058517cf1355ff1a$var$Resize;
class $2674e46c3172c630$var$$9b5b47f028ff428c$var$Ico {
    generate(sizes = [
        16,
        32,
        48
    ]) {
        const canvasMaster = new $2674e46c3172c630$var$$058517cf1355ff1a$export$2e2bcd8739ae039(this.canvas).generate(128, 128);
        const iconDirectoryHeader = this.createIconDirectoryHeader(sizes.length);
        let iconDirectoryEntries = "";
        let bitmapData = "";
        for(let i = 0; i < sizes.length; i++){
            const size = sizes[i];
            const canvas = new $2674e46c3172c630$var$$058517cf1355ff1a$export$2e2bcd8739ae039(canvasMaster).generate(size, size);
            const context = canvas.getContext("2d");
            const width = canvas.width;
            const height = canvas.height;
            const imageData = context.getImageData(0, 0, width, height);
            const bitmapInfoHeader = this.createBitmapInfoHeader(width, height);
            const bitmapImageData = this.createBitmapImageData(canvas);
            const bitmapSize = bitmapInfoHeader.length + bitmapImageData.length;
            const bitmapOffset = this.calculateBitmapOffset(sizes, i);
            iconDirectoryEntries += this.createIconDirectoryEntry(width, height, bitmapSize, bitmapOffset);
            bitmapData += bitmapInfoHeader + bitmapImageData;
        }
        const binary = iconDirectoryHeader + iconDirectoryEntries + bitmapData;
        const base64 = "data:image/x-icon;base64," + btoa(binary);
        return base64;
    }
    /**
   * Calculates the location to the bitmap entry.
   */ calculateBitmapOffset(sizes, entry) {
        let offset = 6; // icon header size
        offset += 16 * sizes.length; // icon entry header size
        // size of previous bitmaps
        for(let i = 0; i < entry; i++){
            const size = sizes[i];
            offset += 40; // bitmap header size
            offset += 4 * size * size; // bitmap data size
            offset += 2 * size * size / 8; // bitmap mask size
        }
        return offset;
    }
    createBitmapImageData(canvas) {
        const ctx = canvas.getContext("2d");
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const bitmapPixelData = new Uint32Array(imageData.data.buffer);
        const bitmapBuffer = bitmapPixelData.reverse().buffer;
        const bitmapMask = new Uint8Array(canvas.width * canvas.height * 2 / 8);
        bitmapMask.fill(0);
        let binary = this.arrayBufferToBinary(this.canvasToBitmap(canvas));
        binary += this.Uint8ArrayToBinary(bitmapMask);
        return binary;
    }
    canvasToBitmap(canvas) {
        const ctx = canvas.getContext("2d");
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const rgbaData8 = imageData.data;
        const bgraData8 = new Uint8ClampedArray(imageData.data.length);
        for(let i = 0; i < rgbaData8.length; i += 4){
            const r = rgbaData8[i];
            const g = rgbaData8[i + 1];
            const b = rgbaData8[i + 2];
            const a = rgbaData8[i + 3];
            bgraData8[i] = b;
            bgraData8[i + 1] = g;
            bgraData8[i + 2] = r;
            bgraData8[i + 3] = a;
        }
        const bgraData32 = new Uint32Array(bgraData8.buffer);
        const bgraData32Rotated = new Uint32Array(bgraData32.length);
        for(let i1 = 0; i1 < bgraData32.length; i1++){
            const xPos = i1 % canvas.width;
            const yPos = Math.floor(i1 / canvas.width);
            const xPosRotated = xPos;
            const yPosRotated = canvas.height - 1 - yPos;
            const indexRotated = yPosRotated * canvas.width + xPosRotated;
            const pixel = bgraData32[i1];
            bgraData32Rotated[indexRotated] = pixel;
        }
        return bgraData32Rotated.buffer;
    }
    createIconDirectoryHeader(numImages) {
        const buffer = new ArrayBuffer(6);
        const view = new DataView(buffer);
        view.setUint16(0, 0, true); // Reserved. Must always be 0.
        view.setUint16(2, 1, true); // Specifies type. 1 = ICO.
        view.setUint16(4, numImages, true); // Number of images.
        return this.arrayBufferToBinary(buffer);
    }
    createIconDirectoryEntry(width, height, size, offset) {
        const buffer = new ArrayBuffer(16);
        const view = new DataView(buffer);
        view.setUint8(0, width); // Pixel width (0..256). 0 = 256 pixels.
        view.setUint8(1, height); // Pixel height (0..256). 0 = 256 pixels.
        view.setUint8(2, 0); // Number of colors in pallet. 0 = no pallet.
        view.setUint8(3, 0); // Reserved. Should be 0.
        view.setUint16(4, 1, true); // Color planes. 0 or 1.
        view.setUint16(6, 32, true); // Specifies bits per pixel.
        view.setUint32(8, size, true); // Image size (bytes).
        view.setUint32(12, offset, true); // Offset to BMP of PNG.
        return this.arrayBufferToBinary(buffer);
    }
    createBitmapInfoHeader(width, height) {
        const buffer = new ArrayBuffer(40);
        const view = new DataView(buffer);
        view.setUint32(0, 40, true); // Header size (40 bytes).
        view.setInt32(4, width, true); // BMP width.
        view.setInt32(8, 2 * height, true); // BMP height.
        view.setUint16(12, 1, true); // Number of color planes. Must be 1.
        view.setUint16(14, 32, true); // Bits per pixel
        view.setUint32(16, 0, true); // Compression method. 0 = none.
        view.setUint32(20, 0, true); // Image size (bytes). 0 = no compression.
        view.setUint32(24, 0, true); // Horizontal resolution.
        view.setUint32(28, 0, true); // Vertical resolution.
        view.setUint32(32, 0, true); // Number of colors. 0 = default.
        view.setUint32(36, 0, true); // Number of important colors. 0 =  all
        return this.arrayBufferToBinary(buffer);
    }
    arrayBufferToBinary(buffer) {
        let binary = "";
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for(let i = 0; i < len; i++)binary += String.fromCharCode(bytes[i]);
        return binary;
    }
    Uint8ArrayToBinary(Uint8Array) {
        let binary = "";
        const bytes = Uint8Array;
        const len = bytes.byteLength;
        for(let i = 0; i < len; i++)binary += String.fromCharCode(bytes[i]);
        return binary;
    }
    constructor(canvas){
        this.canvas = canvas;
    }
}
var $2674e46c3172c630$var$$9b5b47f028ff428c$export$2e2bcd8739ae039 = $2674e46c3172c630$var$$9b5b47f028ff428c$var$Ico;
class $2674e46c3172c630$var$$faba7f80617af102$export$2e2bcd8739ae039 {
    generate(size) {
        return new $2674e46c3172c630$var$$058517cf1355ff1a$export$2e2bcd8739ae039(this.canvas).generate(size, size).toDataURL();
    }
    constructor(canvas){
        this.canvas = canvas;
    }
}
class $2674e46c3172c630$var$$4953411d24246927$var$Bundle {
    generate() {
        const ico = new $2674e46c3172c630$var$$9b5b47f028ff428c$export$2e2bcd8739ae039(this.canvas);
        const png = new $2674e46c3172c630$var$$faba7f80617af102$export$2e2bcd8739ae039(this.canvas);
        return {
            ico: ico.generate([
                16,
                32,
                48
            ]),
            png16: png.generate(16),
            png32: png.generate(32),
            png150: png.generate(150),
            png180: png.generate(180),
            png192: png.generate(192),
            png512: png.generate(512)
        };
    }
    constructor(canvas){
        this.canvas = canvas;
    }
}
var $2674e46c3172c630$var$$4953411d24246927$export$2e2bcd8739ae039 = $2674e46c3172c630$var$$4953411d24246927$var$Bundle;
class $2674e46c3172c630$var$$2361830c7095c6f6$var$FaviconJS {
    bundle() {
        return new $2674e46c3172c630$var$$4953411d24246927$export$2e2bcd8739ae039(this.canvas).generate();
    }
    ico(sizes) {
        return new $2674e46c3172c630$var$$9b5b47f028ff428c$export$2e2bcd8739ae039(this.canvas).generate(sizes);
    }
    png(size) {
        return new $2674e46c3172c630$var$$faba7f80617af102$export$2e2bcd8739ae039(this.canvas).generate(size);
    }
    resize(size) {
        return new $2674e46c3172c630$var$$058517cf1355ff1a$export$2e2bcd8739ae039(this.canvas).generate(size, size);
    }
    constructor(canvas){
        this.canvas = canvas;
    }
}
var $2674e46c3172c630$export$2e2bcd8739ae039 = $2674e46c3172c630$var$$2361830c7095c6f6$var$FaviconJS;


const $3571ab3e8f76ad74$var$selectFrom = document.querySelector('.select_from');
let $3571ab3e8f76ad74$var$inputText = document.querySelector('.icon_text');
let $3571ab3e8f76ad74$var$generateBtn = document.querySelector('.generate_btn');
let $3571ab3e8f76ad74$var$canvas = document.getElementById("rounded");
let $3571ab3e8f76ad74$var$fontContain = document.querySelector('.text_input');
let $3571ab3e8f76ad74$var$bgcolor = document.querySelector('.bg_color');
let $3571ab3e8f76ad74$var$font_color = document.querySelector('.font-color_input');
let $3571ab3e8f76ad74$var$font_size = document.querySelector('.Input-TEXT');
let $3571ab3e8f76ad74$var$download = document.getElementById('download');
$3571ab3e8f76ad74$var$generateBtn.addEventListener('click', $3571ab3e8f76ad74$var$generateFavicon);
// Generate Icon Function
function $3571ab3e8f76ad74$var$generateFavicon() {
    const favicon = new $2674e46c3172c630$export$2e2bcd8739ae039($3571ab3e8f76ad74$var$canvas);
    const packages = favicon.bundle();
    let files = [
        packages.ico,
        packages.png150,
        packages.png16,
        packages.png180,
        packages.png32,
        packages.png512,
        packages.png192
    ];
    console.log(packages);
    document.querySelector('.generated').src = packages.png150;
    $3571ab3e8f76ad74$var$download.href = packages;
    $3571ab3e8f76ad74$var$download.setAttribute("download", 'packages.png150');
}
// Google Fonts code 
var $3571ab3e8f76ad74$var$json = $.getJSON('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBwIX97bVWr3-6AIUvGkcNnmFgirefZ6Sw', function(data) {
    $.each(data.items, function(index, font) {
        $('.combobox').append($('<option></option>').attr('value', font.family).text(font.family));
    });
});
let $3571ab3e8f76ad74$var$fonn = document.querySelector('.combobox');
$3571ab3e8f76ad74$var$fonn.addEventListener('change', $3571ab3e8f76ad74$var$selectOption);
function $3571ab3e8f76ad74$var$selectOption(e1) {
    let font = e1.target.value;
    WebFont.load({
        google: {
            families: [
                font
            ]
        },
        active: function() {
            $3571ab3e8f76ad74$var$selectFrom.addEventListener('change', (e)=>{
                let shape = e.target.value;
                let sizeVal = $3571ab3e8f76ad74$var$font_size.value;
                let bgColor = $3571ab3e8f76ad74$var$bgcolor.value;
                let fontColor = $3571ab3e8f76ad74$var$font_color.value;
                console.log(bgColor, fontColor);
                if (sizeVal === "" || !parseInt(sizeVal)) sizeVal = 47;
                else sizeVal = parseInt($3571ab3e8f76ad74$var$font_size.value);
                $3571ab3e8f76ad74$var$inputText.addEventListener('change', ()=>{
                    let textvalue = $3571ab3e8f76ad74$var$inputText.value.toUpperCase();
                    if (textvalue === "") $3571ab3e8f76ad74$var$createCanva("C", shape, sizeVal, fontColor, bgColor, font);
                    else $3571ab3e8f76ad74$var$createCanva(textvalue, shape, sizeVal, fontColor, bgColor, font);
                });
            });
        }
    });
}
// color
// Shape Selection and Text Input
// selectFrom.forEach(shape=>{
//     shape.addEventListener('click', function() {
//         console.log(shape.textContent)
//         
//     })          
// })
// Create Canva Function
function $3571ab3e8f76ad74$var$createCanva(txt, shape, size, fontcolor, bgcolor, fontfam) {
    new $1553da85f4acc4fe$export$2e2bcd8739ae039($3571ab3e8f76ad74$var$canvas).generate({
        width: 64,
        height: 64,
        shape: shape,
        fontColor: fontcolor,
        backgroundColor: bgcolor,
        text: txt,
        fontFamily: fontfam,
        fontSize: size
    });
}


//# sourceMappingURL=textgenerator.mjs.map


