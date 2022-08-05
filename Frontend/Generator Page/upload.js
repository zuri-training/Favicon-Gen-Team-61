const fileInput = document.querySelector(".file-input"); 
previewImg = document.querySelector(".preview-img img");
const chooseImg = document.querySelector(".btn3");

const loadImage = () => {
    let file = fileInput.files[0];//getting user selected file
    if(!file) return; //return if user hasn't selected file
    previewImg.src = URL.createObjectURL(file); //passing file url as preview img src
    previewImg.addEventListener("load", () => {
        document.querySelector(".buttons").classList.remove("disable");
    });
}


fileInput.addEventListener("change", loadImage);
chooseImg.addEventListener("click", () => fileInput.click());



const favicon = new FaviconJS(".canvas");
const package = favicon.bundle();


const download = document.getElementById("download");
download.href = dataurl;
download.setAttribute("download", "favicon.ico");