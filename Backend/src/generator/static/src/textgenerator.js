import CenterJS from "./center.mjs";
import FaviconJS from "./favicon.mjs"
const selectFrom = document.querySelector('.select_from')
let inputText = document.querySelector('.icon_text')
let generateBtn = document.querySelector('.generate_btn')
let canvas = document.getElementById("rounded");
let bgcolor = document.querySelector('.bg_color')
let font_color = document.querySelector('.font-color_input')
let font_size = document.querySelector('.Input-TEXT')
let saveBtn = document.querySelector('.save_btn')



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


inputText.addEventListener('change', ()=>{
    let textvalue = inputText.value.toUpperCase()
    if (textvalue === ""){
        createCanva("C", 'rounded', 47, "#fff", "#f3de", "Helvatica")            
    } else {
        createCanva(textvalue, 'rounded', 47, "#f45", "#4ff", "Helvatica")            
        // createCanva(textvalue, shape, sizeVal, fontColor, bgColor, font)
    }
})


// Google Fonts code 
var json = $.getJSON('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBwIX97bVWr3-6AIUvGkcNnmFgirefZ6Sw', function(data) {
  $.each( data.items, function( index, font ) {
    $('.combobox').append( $('<option></option>').attr('value', font.family).text(font.family) );
  });
});
    
let fonn = document.querySelector('.combobox')


fonn.addEventListener('change', selectOption)
// Font Selection
function selectOption(e){
    
    let font = e.target.value

    WebFont.load({
        google: {
          families: [font],
        },
        active: function () {
            
            new CenterJS(canvas).generate({
                width: 80,
                height: 80,
                shape: "rounded",
                fontColor: "#3ff",
                backgroundColor: "#f3e",
                text: "C",
                fontFamily: font,
                fontSize: 47,
            });  
        },
      }); 
}


// Shape Selection
selectFrom.addEventListener('change', e=>{
    let shape = e.target.value

    new CenterJS(canvas).generate({
        width: 80,
        height: 80,
        shape: shape,
        fontColor: "#fff",
        backgroundColor: "#56f",
        text: "W",
        fontFamily: "Helvatica",
        fontSize: 47,
    });  

})


// Size 

font_size.addEventListener('change', e=>{
    let size = e.target.value
     
    if (size === "" || !parseInt(size)){
        size = 47
    } else {
        size = e.target.value
     
    }

    new CenterJS(canvas).generate({
        width: 80,
        height: 80,
        shape: "square",
        fontColor: "#fff",
        backgroundColor: "#45f",
        text: "C",
        fontFamily: "Helvatica",
        fontSize: size,
    });  

})


// Colors

bgcolor.addEventListener('click', e=>{
    let bgColor = e.target.value
    if (bgColor === "" ){
        bgColor = "#f3e"
    } else {
        bgColor = e.target.value
    }

    new CenterJS(canvas).generate({
        width: 80,
        height: 80,
        shape: "circle",
        fontColor: "#fec",
        backgroundColor: bgColor,
        text: "C",
        fontFamily: "Helvatica",
        fontSize: 47,
    });  

})



// Font Color

font_color.addEventListener('change', e=>{
    let fontColor = e.target.value
    new CenterJS(canvas).generate({
        width: 80,
        height: 80,
        shape: "rounded",
        fontColor:  fontColor,
        backgroundColor: "#f3e",
        text: "C",
        fontFamily: "Helvatica",
        fontSize: 47,
    });  

})

// var hueb = new Huebee( )

// console.log(hueb)

generateBtn.addEventListener('click', generateFavicon)


// Generate Icon Function
function generateFavicon(){
    const favicon = new FaviconJS(canvas)
    const icon = favicon.ico()
  
    console.log(icon)
    document.querySelector('.generated').src = icon

    saveBtn.addEventListener('click', ()=>{
        let download =  document.getElementById('download')
        download.href = icon;
        download.setAttribute("download", 'favicon')
    })
    
}
