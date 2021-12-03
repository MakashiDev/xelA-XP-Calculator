// index.html script
document.getElementsByClassName("submit")[0].onclick = function() {
    localStorage.setItem("xp", document.getElementById("current-xp").value);
    localStorage.setItem("date", document.getElementById("time-join").value);
    localStorage.setItem("level", document.getElementById("level").value);
};