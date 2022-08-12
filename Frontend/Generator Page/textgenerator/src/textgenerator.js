import CenterJS from "./center.mjs";
import FaviconJS from "./favicon.mjs";
const selectFrom = document.querySelector('.select_from')
let inputText = document.querySelector('.icon_text')
let generateBtn = document.querySelector('.generate_btn')
let canvas = document.getElementById("rounded");
let fontContain = document.querySelector('.text_input')
let bgcolor = document.querySelector('.bg_color')
let font_color = document.querySelector('.font-color_input')
let font_size = document.querySelector('.Input-TEXT')
let download = document.getElementById('download')



generateBtn.addEventListener('click', generateFavicon)


// Generate Icon Function
function generateFavicon(){
    const favicon = new FaviconJS(canvas)
    const packages = favicon.bundle()

    let files = [packages.ico, packages.png150, packages.png16, packages.png180, packages.png32, packages.png512, packages.png192]
    console.log(packages)
    document.querySelector('.generated').src = packages.png150

    download.href = packages;
    download.setAttribute("download", 'packages.png150')
}


// Google Fonts code 
var json = $.getJSON('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBwIX97bVWr3-6AIUvGkcNnmFgirefZ6Sw', function(data) {
  $.each( data.items, function( index, font ) {
    $('.combobox').append( $('<option></option>').attr('value', font.family).text(font.family) );
  });
});
    
let fonn = document.querySelector('.combobox')


fonn.addEventListener('change', selectOption)

function selectOption(e){
    
    let font = e.target.value
  


    WebFont.load({
        google: {
          families: [font],
        },
        active: function () {
            
            selectFrom.addEventListener('change', e=>{
                let shape = e.target.value
                let sizeVal = font_size.value
                let bgColor = bgcolor.value
                let fontColor = font_color.value

                console.log(bgColor, fontColor)
                if (sizeVal === "" || !parseInt(sizeVal)) {
                    sizeVal = 47
                } else {
                    sizeVal = parseInt(font_size.value)
                }
                inputText.addEventListener('change', ()=>{
                    let textvalue = inputText.value.toUpperCase()
                    if (textvalue === ""){
                        createCanva("C", shape, sizeVal, fontColor, bgColor, font)            
                    } else {
                        createCanva(textvalue, shape, sizeVal, fontColor, bgColor, font)            
                        // createCanva(textvalue, shape, sizeVal, fontColor, bgColor, font)
                    }
                })
            })
        },
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

function createCanva(txt, shape, size, fontcolor, bgcolor, fontfam){
    new CenterJS(canvas).generate({
        width: 64,
        height: 64,
        shape: shape,
        fontColor: fontcolor,
        backgroundColor: bgcolor,
        text: txt,
        fontFamily: fontfam,
        fontSize: size,
    });
}