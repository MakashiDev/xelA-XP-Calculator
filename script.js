// index.html script
document.getElementsByClassName("submit")[0].onclick = function() {
    localStorage.setItem("xp", document.getElementById("current-xp").value);
    localStorage.setItem("date", document.getElementById("time-join").value);
    localStorage.setItem("level", document.getElementById("level").value);
};

document.getElementById("current-xp").onchange = function() {
    if (document.getElementById("current-xp").value < 0) {
        document.getElementById("current-xp").value = 0;
    }
};

document.getElementById("level").onchange = function() {
    if (document.getElementById("level").value < 0) {
        document.getElementById("level").value = 0;
    }
};

document.getElementsByTagName("body")[0].onload = function() {
    document.getElementById("time-join").value = localStorage.getItem("date");
};