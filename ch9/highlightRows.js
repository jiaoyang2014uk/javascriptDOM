function addLoadEvent (func){
    var oldonload = window.onload;
    if(typeof window.onload != "function"){
        window.onload = func;
    }else{
        window.onload = function (){
            oldonload();
            func();
        }
    }
}

addLoadEvent(highlightRows);

function highlightRows(){
    if(! document.getElementsByTagName ) return false;
    var rows =  document.getElementsByTagName("tr")
    for(var i=0; i<rows.length; i++){
        rows[i].onmouseover = function (){
            this.style.fontWeight = "bold";
        }
        rows[i].onmouseout = function (){
            this.style.fontWeight = "normal";
        }
    }
}