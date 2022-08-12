
const fileInput = document.querySelector(".file-input"); 
previewImg = document.querySelector(".preview-img img");
const chooseImg = document.querySelector(".btn3");
saveImgBtn = document.querySelector(".btn2");

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


//To downloading the image.
const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.png", "image.ico";
    link.href = canvas.toDataURL();
    link.click();
}

saveImgBtn.addEventListener("click", saveImage)

