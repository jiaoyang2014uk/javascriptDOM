function prepareSlideShow () {
    //确保浏览器支持DOM方法
    if(! document.getElementById) return false;
    if(! document.getElementsByTagName) return false;
    //确保元素存在
    if(! document.getElementById("linklist")) return false;
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id","slideshow");
    var preivew =  document.createElement("img");
    preivew.setAttribute("src","topic.gif");
    preivew.setAttribute("id","preview");
    slideshow.appendChild(preivew);
    var list  = document.getElementById("linklist");
    inserAfter(slideshow,list);
    //为图片应用样式
    var preivew = document.getElementById("preview");
    //取得列表中的链接
    var links = document.getElementsByTagName("a");
    //为mouseover添加动画效果
    links[0].onmouseover = function () {
        moveElement("preview",-100,0,10);
    }
    links[1].onmouseover = function () {
        moveElement("preview",-200,0,10);
    }
    links[2].onmouseover = function () {
        moveElement("preview",-300,0,10);
    }
}

addLoadEvent(prepareSlideShow);

function addLoadEvent (func){
    var oldonload = window.onload;
    if(typeof window.onload != "function"){
        window.onload = func;
    } else {
        window.onload = function (){
            oldonload();
            func();
        }
    }
}

function inserAfter(newElement, targetElement){
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}