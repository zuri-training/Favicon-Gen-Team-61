//Dark & Light Mode
document.getElementById("darkmode").onclick = function() {darkMode()};

function darkMode() {
    var dark = document.body;

    dark.classList.toggle("dark-mode");
};


// // document.getElementById("darkmode").onclick = function() {darkMode()};

// function myFunction() {
//   document.body.style.backgroundColor = "red";
// }



//counter

var counterBox = document.querySelector(".counter-box")
var	countUp = document.querySelectorAll(".counter");


window.onscroll = function () {

	if(window.scrollY >= counterBox.offsetTop) {

		startCounter();

	}

	function startCounter () {

		setInterval(function () {

			for(i=0; i<countUp.length; i++) {

				if (countUp[i].textContent == countUp[i].getAttribute("data-count")) {

					countUp[i].textContent = countUp[i].getAttribute("data-count");

					clearInterval();

				} else {

					countUp[i].textContent = parseInt(countUp[0].textContent) + 1;

				}

			}

		}, 140);

	} 

};