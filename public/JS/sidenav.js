function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function openMenu() {
    document.getElementById("dropdownBox").style.display = "inline";
    document.getElementById("buttonBox").setAttribute("onClick" , "javascript: closeMenu();");
}

function closeMenu(){
    document.getElementById("dropdownBox").style.display = "none";
    document.getElementById("buttonBox").setAttribute("onClick" , "javascript: openMenu();");
}