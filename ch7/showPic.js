
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

function insertAfter(newElement, targetElement){
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function preparePlaceholder(){
    if (!document.createElement){
        return false;
    }
    if (!document.createTextNode){
        return false;
    }
    if (!document.getElementById) {
        return false;
    }
    if (!document.getElementById("imggallery")){
        return false;
    }
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","img/sea.jpg");
    placeholder.setAttribute("alt","my sea");
    var description = document.createElement("p");
    description.setAttribute("id","description");
    var txt = document.createTextNode("Choose an image");
    description.appendChild(txt);
    var gallery = document.getElementById("imggallery");
    insertAfter(placeholder,gallery);
    insertAfter(description,placeholder);
}

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
        links[i].onkeypress = links[i].onclick;
    }
}

function showPic(whichpic){   
    if(!document.getElementById("placeholder")){
        alert(111);
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

addLoadEvent (preparePlaceholder);
addLoadEvent (prepareGallery);