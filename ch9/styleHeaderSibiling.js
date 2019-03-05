function addLoadEvent (func){
    var oldonload = window.onload;
    if(typeof window.onload != "function"){
        window.onload = func;
    }else{
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

addLoadEvent(function() {styleElementSibiling("h1", "intro");});

function styleElementSibiling(tag, theClass){
    if(! document.getElementsByTagName) return  false;
    var headers = document.getElementsByTagName(tag);
    var elem;

    for(var i=0; i< headers.length; i++){
        elem = getNextElement(headers[i].nextSibling);
        addClass(elem, theClass);
    }
}

function getNextElement(node){
    if(node.nodeType == 1){
        return node;
    }
    if(node.nextSibling){
        return getNextElement(node.nextSibling);
    }
    return null;
}

function addClass(element,value){
    if(!element.className){
        element.className = value;
    } else {
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}