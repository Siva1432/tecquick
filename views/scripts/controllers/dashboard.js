function sidenavbar() {
    var el=document.getElementsByClassName("wrapper-2");
    if(el[0].style.display=="none"){
    el[0].style.display="block";
    el[0].style.width=260+"px";
    }
    else{
        el[0].style.display="none";
    }
}
