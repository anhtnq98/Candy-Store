function afterPageLoad() {
    window.setTimeout(function () {
        document.getElementById("loading").style.display = "none";
        document.getElementById("mask").style.display = "none";
    }, 950);
}
