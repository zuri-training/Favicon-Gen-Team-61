//Dark & Light Mode
document.getElementById("darkmode").onclick = function() {darkMode()};

function darkMode() 
    var dark = document.body;
    dark.classList.toggle("dark-mode");