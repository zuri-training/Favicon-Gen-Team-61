var $4w2f2$swchelpers = require("@swc/helpers");


var $147f589d770fb746$var$$ab4e1cafa3bfd981$var$CenterJS = /*#__PURE__*/ function() {
    "use strict";
    function $147f589d770fb746$var$$ab4e1cafa3bfd981$var$CenterJS(canvas) {
        $4w2f2$swchelpers.classCallCheck(this, $147f589d770fb746$var$$ab4e1cafa3bfd981$var$CenterJS);
        this.canvas = canvas;
    }
    $4w2f2$swchelpers.createClass($147f589d770fb746$var$$ab4e1cafa3bfd981$var$CenterJS, [
        {
            key: "generate",
            value: function generate(options) {
                this.ctx = this.canvas.getContext("2d");
                /**
     * Set defaults.
     */ var defaults = {
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
        },
        {
            key: "drawBackground",
            value: function drawBackground() {
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
        },
        {
            key: "drawSquare",
            value: function drawSquare() {
                this.ctx.beginPath();
                this.ctx.rect(0, 0, this.width, this.height);
                this.ctx.fillStyle = this.backgroundColor;
                this.ctx.fill();
            }
        },
        {
            key: "drawCircle",
            value: function drawCircle() {
                this.ctx.beginPath();
                this.ctx.arc(this.width / 2, this.height / 2, this.height / 2, 0, 2 * Math.PI, false);
                this.ctx.fillStyle = this.backgroundColor;
                this.ctx.fill();
            }
        },
        {
            key: "drawRounded",
            value: function drawRounded() {
                this.ctx.beginPath();
                var radius = this.height / 10;
                this.ctx.moveTo(this.width, this.height);
                this.ctx.arcTo(0, this.height, 0, 0, radius);
                this.ctx.arcTo(0, 0, this.width, 0, radius);
                this.ctx.arcTo(this.width, 0, this.width, this.height, radius);
                this.ctx.arcTo(this.width, this.height, 0, this.height, radius);
                this.ctx.fillStyle = this.backgroundColor;
                this.ctx.fill();
            }
        },
        {
            key: "drawText",
            value: function drawText() {
                this.ctx.fillStyle = this.fontColor;
                this.ctx.font = this.fontString();
                this.ctx.textBaseline = "alphabetic";
                this.ctx.textAlign = "center";
                var offsets = this.measureOffsets(this.text, this.fontFamily, this.fontSize);
                var x = this.width / 2 + offsets.horizontal;
                var y = this.height / 2 + offsets.vertical;
                this.ctx.fillText(this.text, x, y);
            }
        },
        {
            /**
   * Offsets are the differece between the center of the canvas and the center
   * of the text on the canvas.
   */ key: "measureOffsets",
            value: function measureOffsets(text, fontFamily, fontSize) {
                /**
     * Create and setup canvas
     */ var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
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
     */ var data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
                var textTop;
                var textBottom;
                for(var y = 0; y <= canvas.height; y++)for(var x = 0; x <= canvas.width; x++){
                    var r_index = 4 * (canvas.width * y + x);
                    var r_value = data[r_index];
                    if (r_value === 255) {
                        if (!textTop) textTop = y;
                        textBottom = y;
                        break;
                    }
                }
                /**
     * Vertical offset is the difference between the horizontal center of the
     * canvas and the horizontal center of the text on the canvas.
     */ var canvasHorizontalCenterLine = canvas.height / 2;
                var textHorizontalCenterLine = (textBottom - textTop) / 2 + textTop;
                var textLeft;
                var textRight;
                for(var x1 = 0; x1 <= canvas.width; x1++)for(var y1 = 0; y1 <= canvas.height; y1++){
                    var r_index1 = 4 * (canvas.width * y1 + x1);
                    var r_value1 = data[r_index1];
                    if (r_value1 === 255) {
                        if (!textLeft) textLeft = x1;
                        textRight = x1;
                        break;
                    }
                }
                /**
     * Horizontal offset is the difference between the vertical center of the
     * canvas and the vertical center of the text on the canvas.
     */ var canvasVerticalCenterLine = canvas.width / 2;
                var textVerticalCenterLine = (textRight - textLeft) / 2 + textLeft;
                return {
                    vertical: canvasHorizontalCenterLine - textHorizontalCenterLine,
                    horizontal: canvasVerticalCenterLine - textVerticalCenterLine
                };
            }
        },
        {
            key: "fontString",
            value: function fontString() {
                return "".concat(this.fontStyle, " ").concat(this.fontWeight, " ").concat(this.fontSize, "px ").concat(this.fontFamily);
            }
        }
    ]);
    return $147f589d770fb746$var$$ab4e1cafa3bfd981$var$CenterJS;
}();
var $147f589d770fb746$export$2e2bcd8739ae039 = $147f589d770fb746$var$$ab4e1cafa3bfd981$var$CenterJS;



var $1e668f9d7388492a$var$$058517cf1355ff1a$var$Resize = /*#__PURE__*/ function() {
    "use strict";
    function $1e668f9d7388492a$var$$058517cf1355ff1a$var$Resize(canvas) {
        $4w2f2$swchelpers.classCallCheck(this, $1e668f9d7388492a$var$$058517cf1355ff1a$var$Resize);
        this.canvas = canvas;
    }
    $4w2f2$swchelpers.createClass($1e668f9d7388492a$var$$058517cf1355ff1a$var$Resize, [
        {
            /**
   * Resize the canvas by halving the width and height. This produces better
   * sampling and the image quality is generally better.
   */ key: "generate",
            value: function generate(width, height) {
                while(this.canvas.width / 2 >= width)this._resize(this.canvas.width / 2, this.canvas.height / 2);
                if (this.canvas.width > width) this._resize(width, height);
                return this.canvas;
            }
        },
        {
            /**
   * Simple resize of a canvas element.
   */ key: "_resize",
            value: function _resize(width, height) {
                var canvas = document.createElement("canvas");
                var resizedContext = canvas.getContext("2d");
                canvas.width = width;
                canvas.height = height;
                resizedContext.drawImage(this.canvas, 0, 0, width, height);
                this.canvas = canvas;
            }
        }
    ]);
    return $1e668f9d7388492a$var$$058517cf1355ff1a$var$Resize;
}();
var $1e668f9d7388492a$var$$058517cf1355ff1a$export$2e2bcd8739ae039 = $1e668f9d7388492a$var$$058517cf1355ff1a$var$Resize;
var $1e668f9d7388492a$var$$9b5b47f028ff428c$var$Ico = /*#__PURE__*/ function() {
    "use strict";
    function $1e668f9d7388492a$var$$9b5b47f028ff428c$var$Ico(canvas) {
        $4w2f2$swchelpers.classCallCheck(this, $1e668f9d7388492a$var$$9b5b47f028ff428c$var$Ico);
        this.canvas = canvas;
    }
    $4w2f2$swchelpers.createClass($1e668f9d7388492a$var$$9b5b47f028ff428c$var$Ico, [
        {
            key: "generate",
            value: function generate() {
                var sizes = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [
                    16,
                    32,
                    48
                ];
                var canvasMaster = new $1e668f9d7388492a$var$$058517cf1355ff1a$export$2e2bcd8739ae039(this.canvas).generate(128, 128);
                var iconDirectoryHeader = this.createIconDirectoryHeader(sizes.length);
                var iconDirectoryEntries = "";
                var bitmapData = "";
                for(var i = 0; i < sizes.length; i++){
                    var size = sizes[i];
                    var canvas = new $1e668f9d7388492a$var$$058517cf1355ff1a$export$2e2bcd8739ae039(canvasMaster).generate(size, size);
                    var context = canvas.getContext("2d");
                    var width = canvas.width;
                    var height = canvas.height;
                    var imageData = context.getImageData(0, 0, width, height);
                    var bitmapInfoHeader = this.createBitmapInfoHeader(width, height);
                    var bitmapImageData = this.createBitmapImageData(canvas);
                    var bitmapSize = bitmapInfoHeader.length + bitmapImageData.length;
                    var bitmapOffset = this.calculateBitmapOffset(sizes, i);
                    iconDirectoryEntries += this.createIconDirectoryEntry(width, height, bitmapSize, bitmapOffset);
                    bitmapData += bitmapInfoHeader + bitmapImageData;
                }
                var binary = iconDirectoryHeader + iconDirectoryEntries + bitmapData;
                var base64 = "data:image/x-icon;base64," + btoa(binary);
                return base64;
            }
        },
        {
            /**
   * Calculates the location to the bitmap entry.
   */ key: "calculateBitmapOffset",
            value: function calculateBitmapOffset(sizes, entry) {
                var offset = 6; // icon header size
                offset += 16 * sizes.length; // icon entry header size
                // size of previous bitmaps
                for(var i = 0; i < entry; i++){
                    var size = sizes[i];
                    offset += 40; // bitmap header size
                    offset += 4 * size * size; // bitmap data size
                    offset += 2 * size * size / 8; // bitmap mask size
                }
                return offset;
            }
        },
        {
            key: "createBitmapImageData",
            value: function createBitmapImageData(canvas) {
                var ctx = canvas.getContext("2d");
                var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                var bitmapPixelData = new Uint32Array(imageData.data.buffer);
                var bitmapBuffer = bitmapPixelData.reverse().buffer;
                var bitmapMask = new Uint8Array(canvas.width * canvas.height * 2 / 8);
                bitmapMask.fill(0);
                var binary = this.arrayBufferToBinary(this.canvasToBitmap(canvas));
                binary += this.Uint8ArrayToBinary(bitmapMask);
                return binary;
            }
        },
        {
            key: "canvasToBitmap",
            value: function canvasToBitmap(canvas) {
                var ctx = canvas.getContext("2d");
                var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                var rgbaData8 = imageData.data;
                var bgraData8 = new Uint8ClampedArray(imageData.data.length);
                for(var i = 0; i < rgbaData8.length; i += 4){
                    var r = rgbaData8[i];
                    var g = rgbaData8[i + 1];
                    var b = rgbaData8[i + 2];
                    var a = rgbaData8[i + 3];
                    bgraData8[i] = b;
                    bgraData8[i + 1] = g;
                    bgraData8[i + 2] = r;
                    bgraData8[i + 3] = a;
                }
                var bgraData32 = new Uint32Array(bgraData8.buffer);
                var bgraData32Rotated = new Uint32Array(bgraData32.length);
                for(var i1 = 0; i1 < bgraData32.length; i1++){
                    var xPos = i1 % canvas.width;
                    var yPos = Math.floor(i1 / canvas.width);
                    var xPosRotated = xPos;
                    var yPosRotated = canvas.height - 1 - yPos;
                    var indexRotated = yPosRotated * canvas.width + xPosRotated;
                    var pixel = bgraData32[i1];
                    bgraData32Rotated[indexRotated] = pixel;
                }
                return bgraData32Rotated.buffer;
            }
        },
        {
            key: "createIconDirectoryHeader",
            value: function createIconDirectoryHeader(numImages) {
                var buffer = new ArrayBuffer(6);
                var view = new DataView(buffer);
                view.setUint16(0, 0, true); // Reserved. Must always be 0.
                view.setUint16(2, 1, true); // Specifies type. 1 = ICO.
                view.setUint16(4, numImages, true); // Number of images.
                return this.arrayBufferToBinary(buffer);
            }
        },
        {
            key: "createIconDirectoryEntry",
            value: function createIconDirectoryEntry(width, height, size, offset) {
                var buffer = new ArrayBuffer(16);
                var view = new DataView(buffer);
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
        },
        {
            key: "createBitmapInfoHeader",
            value: function createBitmapInfoHeader(width, height) {
                var buffer = new ArrayBuffer(40);
                var view = new DataView(buffer);
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
        },
        {
            key: "arrayBufferToBinary",
            value: function arrayBufferToBinary(buffer) {
                var binary = "";
                var bytes = new Uint8Array(buffer);
                var len = bytes.byteLength;
                for(var i = 0; i < len; i++)binary += String.fromCharCode(bytes[i]);
                return binary;
            }
        },
        {
            key: "Uint8ArrayToBinary",
            value: function Uint8ArrayToBinary(Uint8Array) {
                var binary = "";
                var bytes = Uint8Array;
                var len = bytes.byteLength;
                for(var i = 0; i < len; i++)binary += String.fromCharCode(bytes[i]);
                return binary;
            }
        }
    ]);
    return $1e668f9d7388492a$var$$9b5b47f028ff428c$var$Ico;
}();
var $1e668f9d7388492a$var$$9b5b47f028ff428c$export$2e2bcd8739ae039 = $1e668f9d7388492a$var$$9b5b47f028ff428c$var$Ico;
var $1e668f9d7388492a$var$$faba7f80617af102$export$2e2bcd8739ae039 = /*#__PURE__*/ function() {
    "use strict";
    function $1e668f9d7388492a$var$$faba7f80617af102$export$2e2bcd8739ae039(canvas) {
        $4w2f2$swchelpers.classCallCheck(this, $1e668f9d7388492a$var$$faba7f80617af102$export$2e2bcd8739ae039);
        this.canvas = canvas;
    }
    $4w2f2$swchelpers.createClass($1e668f9d7388492a$var$$faba7f80617af102$export$2e2bcd8739ae039, [
        {
            key: "generate",
            value: function generate(size) {
                return new $1e668f9d7388492a$var$$058517cf1355ff1a$export$2e2bcd8739ae039(this.canvas).generate(size, size).toDataURL();
            }
        }
    ]);
    return $1e668f9d7388492a$var$$faba7f80617af102$export$2e2bcd8739ae039;
}();
var $1e668f9d7388492a$var$$4953411d24246927$var$Bundle = /*#__PURE__*/ function() {
    "use strict";
    function $1e668f9d7388492a$var$$4953411d24246927$var$Bundle(canvas) {
        $4w2f2$swchelpers.classCallCheck(this, $1e668f9d7388492a$var$$4953411d24246927$var$Bundle);
        this.canvas = canvas;
    }
    $4w2f2$swchelpers.createClass($1e668f9d7388492a$var$$4953411d24246927$var$Bundle, [
        {
            key: "generate",
            value: function generate() {
                var ico = new $1e668f9d7388492a$var$$9b5b47f028ff428c$export$2e2bcd8739ae039(this.canvas);
                var png = new $1e668f9d7388492a$var$$faba7f80617af102$export$2e2bcd8739ae039(this.canvas);
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
        }
    ]);
    return $1e668f9d7388492a$var$$4953411d24246927$var$Bundle;
}();
var $1e668f9d7388492a$var$$4953411d24246927$export$2e2bcd8739ae039 = $1e668f9d7388492a$var$$4953411d24246927$var$Bundle;
var $1e668f9d7388492a$var$$2361830c7095c6f6$var$FaviconJS = /*#__PURE__*/ function() {
    "use strict";
    function $1e668f9d7388492a$var$$2361830c7095c6f6$var$FaviconJS(canvas) {
        $4w2f2$swchelpers.classCallCheck(this, $1e668f9d7388492a$var$$2361830c7095c6f6$var$FaviconJS);
        this.canvas = canvas;
    }
    $4w2f2$swchelpers.createClass($1e668f9d7388492a$var$$2361830c7095c6f6$var$FaviconJS, [
        {
            key: "bundle",
            value: function bundle() {
                return new $1e668f9d7388492a$var$$4953411d24246927$export$2e2bcd8739ae039(this.canvas).generate();
            }
        },
        {
            key: "ico",
            value: function ico(sizes) {
                return new $1e668f9d7388492a$var$$9b5b47f028ff428c$export$2e2bcd8739ae039(this.canvas).generate(sizes);
            }
        },
        {
            key: "png",
            value: function png(size) {
                return new $1e668f9d7388492a$var$$faba7f80617af102$export$2e2bcd8739ae039(this.canvas).generate(size);
            }
        },
        {
            key: "resize",
            value: function resize(size) {
                return new $1e668f9d7388492a$var$$058517cf1355ff1a$export$2e2bcd8739ae039(this.canvas).generate(size, size);
            }
        }
    ]);
    return $1e668f9d7388492a$var$$2361830c7095c6f6$var$FaviconJS;
}();
var $1e668f9d7388492a$export$2e2bcd8739ae039 = $1e668f9d7388492a$var$$2361830c7095c6f6$var$FaviconJS;


var $b8a8a03dfeaf28ec$var$selectFrom = document.querySelector('.select_from');
var $b8a8a03dfeaf28ec$var$inputText = document.querySelector('.icon_text');
var $b8a8a03dfeaf28ec$var$generateBtn = document.querySelector('.generate_btn');
var $b8a8a03dfeaf28ec$var$canvas = document.getElementById("rounded");
var $b8a8a03dfeaf28ec$var$bgcolor = document.querySelector('.bg_color');
var $b8a8a03dfeaf28ec$var$font_color = document.querySelector('.font-color_input');
var $b8a8a03dfeaf28ec$var$font_size = document.querySelector('.Input-TEXT');
var $b8a8a03dfeaf28ec$var$saveBtn = document.querySelector('.save_btn');
// Create Canva Function
function $b8a8a03dfeaf28ec$var$createCanva(txt, shape, size, fontcolor, bgcolor, fontfam) {
    new $147f589d770fb746$export$2e2bcd8739ae039($b8a8a03dfeaf28ec$var$canvas).generate({
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
$b8a8a03dfeaf28ec$var$inputText.addEventListener('change', function() {
    var textvalue = $b8a8a03dfeaf28ec$var$inputText.value.toUpperCase();
    if (textvalue === "") $b8a8a03dfeaf28ec$var$createCanva("C", 'rounded', 47, "#fff", "#f3de", "Helvatica");
    else $b8a8a03dfeaf28ec$var$createCanva(textvalue, 'rounded', 47, "#f45", "#4ff", "Helvatica");
});
// Google Fonts code 
var $b8a8a03dfeaf28ec$var$json = $.getJSON('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBwIX97bVWr3-6AIUvGkcNnmFgirefZ6Sw', function(data) {
    $.each(data.items, function(index, font) {
        $('.combobox').append($('<option></option>').attr('value', font.family).text(font.family));
    });
});
var $b8a8a03dfeaf28ec$var$fonn = document.querySelector('.combobox');
$b8a8a03dfeaf28ec$var$fonn.addEventListener('change', $b8a8a03dfeaf28ec$var$selectOption);
// Font Selection
function $b8a8a03dfeaf28ec$var$selectOption(e) {
    var font = e.target.value;
    WebFont.load({
        google: {
            families: [
                font
            ]
        },
        active: function active() {
            new $147f589d770fb746$export$2e2bcd8739ae039($b8a8a03dfeaf28ec$var$canvas).generate({
                width: 80,
                height: 80,
                shape: "rounded",
                fontColor: "#3ff",
                backgroundColor: "#f3e",
                text: "C",
                fontFamily: font,
                fontSize: 47
            });
        }
    });
}
// Shape Selection
$b8a8a03dfeaf28ec$var$selectFrom.addEventListener('change', function(e) {
    var shape = e.target.value;
    new $147f589d770fb746$export$2e2bcd8739ae039($b8a8a03dfeaf28ec$var$canvas).generate({
        width: 80,
        height: 80,
        shape: shape,
        fontColor: "#fff",
        backgroundColor: "#56f",
        text: "W",
        fontFamily: "Helvatica",
        fontSize: 47
    });
});
// Size 
$b8a8a03dfeaf28ec$var$font_size.addEventListener('change', function(e) {
    var size = e.target.value;
    if (size === "" || !parseInt(size)) size = 47;
    else size = e.target.value;
    new $147f589d770fb746$export$2e2bcd8739ae039($b8a8a03dfeaf28ec$var$canvas).generate({
        width: 80,
        height: 80,
        shape: "square",
        fontColor: "#fff",
        backgroundColor: "#45f",
        text: "C",
        fontFamily: "Helvatica",
        fontSize: size
    });
});
// Colors
$b8a8a03dfeaf28ec$var$bgcolor.addEventListener('click', function(e) {
    var bgColor = e.target.value;
    if (bgColor === "") bgColor = "#f3e";
    else bgColor = e.target.value;
    new $147f589d770fb746$export$2e2bcd8739ae039($b8a8a03dfeaf28ec$var$canvas).generate({
        width: 80,
        height: 80,
        shape: "circle",
        fontColor: "#fec",
        backgroundColor: bgColor,
        text: "C",
        fontFamily: "Helvatica",
        fontSize: 47
    });
});
// Font Color
$b8a8a03dfeaf28ec$var$font_color.addEventListener('change', function(e) {
    var fontColor = e.target.value;
    new $147f589d770fb746$export$2e2bcd8739ae039($b8a8a03dfeaf28ec$var$canvas).generate({
        width: 80,
        height: 80,
        shape: "rounded",
        fontColor: fontColor,
        backgroundColor: "#f3e",
        text: "C",
        fontFamily: "Helvatica",
        fontSize: 47
    });
});
// var hueb = new Huebee( )
// console.log(hueb)
$b8a8a03dfeaf28ec$var$generateBtn.addEventListener('click', $b8a8a03dfeaf28ec$var$generateFavicon);
// Generate Icon Function
function $b8a8a03dfeaf28ec$var$generateFavicon() {
    var favicon = new $1e668f9d7388492a$export$2e2bcd8739ae039($b8a8a03dfeaf28ec$var$canvas);
    var icon = favicon.ico();
    console.log(icon);
    document.querySelector('.generated').src = icon;
    $b8a8a03dfeaf28ec$var$saveBtn.addEventListener('click', function() {
        var download = document.getElementById('download');
        download.href = icon;
        download.setAttribute("download", 'favicon');
    });
}


//# sourceMappingURL=textgenerator.js.map
