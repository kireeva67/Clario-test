function openPopup() {
	document.querySelector(".popup").style.display = "block";
}

function closePopup() {
	document.querySelector(".popup").style.display = "none";
    document.querySelector(".popup").onclick = function (event){
        if (event.target.className === "popup__buttons-uninstall") {
           setTimeout(alert, 100, 'DONE');
         }
    }

}

window.onclick = function(event) {
    if (event.target.className === "popup__body") {
       closePopup();
    }
 }