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

addLoadEvent(displayAccessKey);

function displayAccessKey(){
    //检查兼容性
    if(! document.getElementsByTagName) return false;
    if(! document.createElement) return false;
    if(! document.createTextNode) return false;
    //取得所有链接
    var links = document.getElementsByTagName("a");
    if(links.length < 1) return false;
    //创建数组，存储访问键
    var defs = new Array();
      //遍历链接
    for (var i=0; i<links.length; i++){
        //如果没有accesskey属性，继续循环
        if(! links[i].getAttribute("accesskey")) continue;
        //取得accesskey值
        var key = links[i].getAttribute("accesskey");
        //取得链接文本
        var text =  links[i].lastChild.nodeValue;
        //添加到数组
        defs[key] = text;

    }
    //创建列表
    var list = document.createElement("ul");
    //遍历访问键
    for (key in defs){
        var text = defs [key];
        //创建放入列表项的字符串
        var str = key + ":" + text;
        //创建列表项
        var item = document.createElement("li");
        var item_text =  document.createTextNode(str);
        item.appendChild(item_text);
        //把列表项添加到列表中
        list.appendChild(item);
    }
    //创建标题
    var header = document.createElement("h3");
    var header_text = document.createTextNode("AccessKey");
    header.appendChild(header_text);
    //把标题添加到页面主体
    document.body.appendChild(header);
    //把列表添加到页面主体
    document.body.appendChild(list);
}
