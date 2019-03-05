function addLoadEvent(func){
    var oldonload = window.onload;
    if(typeof oldonload != "function"){
        window.onload = func;
    }else{
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

addLoadEvent(dispalyCitation);

function dispalyCitation (){
    //检查兼容性
    if(! document.getElementsByTagName) return false;
    if(! document.createElement) return false;
    if(! document.createTextNode) return false;
    //取得所有引用
    var quotes = document.getElementsByTagName("blockquote");
    //遍历引用
    for(var i=0; i< quotes.length; i++){
        //没有cite值 继续循环
        if(!quotes[i].getAttribute("cite")) continue;
        //保存cite属性
        var citation = quotes[i].getAttribute("cite");
        //取得引用中所有元素节点
        var quotesElements = quotes[i].getElementsByTagName("*");
        //如果没有元素节点 继续循环
        if(quotesElements.length < 1 ) continue;
        //取得引用中 最后一个元素节点
        var elem = quotesElements[quotesElements.length - 1];
        //创建标记
        var links = document.createElement("a");
        var links_source = document.createTextNode("source");
        links.appendChild(links_source);
        links.setAttribute("href", citation);
        var superScript = document.createElement("sup");
        superScript.appendChild(links);
        //把标记添加到引用中最后一个元素节点
        elem.appendChild(superScript);
    }
}
