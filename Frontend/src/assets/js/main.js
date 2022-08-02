//Dark & Light Mode
document.getElementById("darkmode").onclick = function() {darkMode()};

function darkMode() {
    var dark = document.body;

    dark.classList.toggle("dark-mode");
}


// // document.getElementById("darkmode").onclick = function() {darkMode()};

// function myFunction() {
//   document.body.style.backgroundColor = "red";
// }


const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))