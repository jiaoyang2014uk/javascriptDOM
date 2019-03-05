function addLoadEvent(func){
    var oldonload = window.onload;
    if (typeof oldonload !== "function"){
        window.onload = func;
    } else {
        window.onload = function (){
            oldonload();
            func();
        }
    }
}

addLoadEvent (prepareGallery);

function prepareGallery(){
    if(!document.getElementsByTagName){
        return false;
    }
    if(!document.getElementById){
        return false;
    }
    if(!document.getElementById("imggallery")){
        return false;
    }
    var gallery = document.getElementById("imggallery");
    var links = gallery.getElementsByTagName("a");
    for(var i=0; i< links.length; i++){
        links[i].onclick = function (){
            return showPic(this) ? false: true;
        }
    }
}

function showPic(whichpic){
    if(!document.getElementById("placeholder")){
        return false;
    }
    var sourse =  whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    if(placeholder.nodeName !== "IMG"){
        return false;
    }
    placeholder.setAttribute("src", sourse);
    if(document.getElementById("description")){
        var text = whichpic.getAttribute("title")? whichpic.getAttribute("title") : "";
        var description = document.getElementById("description");
        if(description.firstChild.nodeType == 3){
            description.firstChild.nodeValue = text;
        }
    }
    return true;
}