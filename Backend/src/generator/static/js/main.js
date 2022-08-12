//Dark & Light Mode
// document.getElementById("darkmode").onclick = function() {darkMode()};

// function darkMode() {
//     var dark = document.body;

//     dark.classList.toggle("dark-mode");
// };



const toggleBtn = document.getElementById("darkmode");
const theme = document.body;
let darkMode = localStorage.getItem("dark-mode");

const enableDarkMode = () => {
  theme.classList.add("dark-mode");
  toggleBtn.classList.add("slider:before");
  localStorage.setItem("dark-mode", "enabled");
};

const disableDarkMode = () => {
  theme.classList.remove("dark-mode");
  toggleBtn.classList.remove("slider:before");
  localStorage.setItem("dark-mode", "disabled");
};

if (darkMode === "enabled") {
  enableDarkMode(); // set state of darkMode on page load
}

toggleBtn.addEventListener("click", (e) => {
  darkMode = localStorage.getItem("dark-mode"); // update darkMode when clicked
  if (darkMode === "disabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

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