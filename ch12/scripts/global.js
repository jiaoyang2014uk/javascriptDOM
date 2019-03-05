function addLoadEvent (func){
    var oldonload = window.onload;
    if(typeof window.onload !== "function"){
        window.onload =  func;
    }else {
        window.onload = function (){
            oldonload();
            func();
        }
    }
}

function insertAfter(newElement, targetElement){
    var parent =  targetElement.parentNode;
    if (parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function addClass(element, value){
    if(!element.className){
        element.className = value;
    }else {
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName; 
    }
}

function highlightPage (){
    if(!document.getElementsByTagName) return false; //检查元素是否存在
    var headers =  document.getElementsByTagName("header");
    if(headers.length == 0) return false;
    var navs =  headers[0].getElementsByTagName("nav");
    if(navs.length == 0) return false;
    var links = navs[0].getElementsByTagName("a");//取得导航链接，循环遍历
    var linkurl;
    for (var i =0; i < links.length; i++){
        linkurl = links[i].getAttribute("href");//取得链接的url
        if(window.location.href.indexOf(linkurl) != -1){//取得当前页面url
            links[i].className = "here";//添加类
            var linktext = links[i].lastChild.nodeValue.toLowerCase();
            var curid = document.body.getAttribute("id");//为每个页面的body添加id属性
            document.body.setAttribute("id", linktext);
        }
    }
}
addLoadEvent(highlightPage);

function moveElement(elementID, final_x, final_y, interval){
    if(!document.getElementById) return false;
    if(!document.getElementById(elementID)) return false;
    var elem = document.getElementById(elementID);
    if(elem.movement){
        clearTimeout(elem.movement);
    }
    if(!elem.style.left){
        elem.style.left = "0px";
    }
    if(!elem.style.top){
        elem.style.top = "0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if(xpos == final_x && ypos == final_y ){
        return false;
    }
    if(xpos < final_x){
        var dist = Math.ceil((final_x - xpos)/10);
        xpos = xpos + dist;
    }
    if(xpos > final_x ){
        var dist = Math.ceil((xpos - final_x)/10);
        xpos = xpos - dist;
    }
    if(ypos < final_y){
        var dist = Math.ceil((final_y - ypos)/10);
        ypos = ypos + dist;
    }
    if(ypos > final_y){
        var dist = Math.ceil((ypos - final_y)/10);
        ypos = ypos - dist;
    }
    elem.style.left  =  xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('" + elementID + "'," + final_x + "," + final_y + "," + interval + ")";
    elem.movement = setTimeout(repeat,interval);
}

function prepareSlideshow(){
    if(!document.getElementById) return false;//创建幻灯片元素，放在intro段落后面
    if(!document.getElementById("intro")) return false;
    var intro = document.getElementById("intro");
    var slideShow = document.createElement("div");
    slideShow.setAttribute("id","slideshow");
    var frame = document.createElement("img");// 动画效果添加小窗口
    frame.setAttribute("src", "images/frame.png");
    frame.setAttribute("id", "frame");
    slideShow.appendChild(frame);
    var preview =  document.createElement("img");
    preview.setAttribute("src", "images/slideshow.png");
    preview.setAttribute("id","preview");
    slideShow.appendChild(preview);
    insertAfter(slideShow,intro);
    var links = document.getElementsByTagName("a");
    var destination;
    for (var i = 0; i < links.length; i++){//遍历所有链接，根据鼠标坐在链接移动preview元素
        links[i].onmouseover = function () {
            destination = this.getAttribute("href");
            if(destination.indexOf("index.html") != -1){
                moveElement("preview", 0, 0, 5);
            }
            if(destination.indexOf("about.html") != -1){
                moveElement("preview", -150, 0, 5);
            }
            if(destination.indexOf("photos.html") != -1){
                moveElement("preview", -300, 0, 5);
            }
            if(destination.indexOf("live.html") != -1){
                moveElement("preview", -450, 0, 5);
            }
            if(destination.indexOf("contact.html") != -1){
                moveElement("preview", -600, 0, 5);
            }
        }
    }
}
addLoadEvent(prepareSlideshow);

function showSection(id){
    var sections = document.getElementsByTagName("section");
    for(var i=0; i < sections.length; i++){
        if(sections[i].getAttribute("id") != id){
            sections[i].style.display = "none";
        } else {
            sections[i].style.display = "block";
        }
    }
}

function prepareInternalnav (){
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    var articles = document.getElementsByTagName("article");
    if(articles.length ==0 ) return false;
    var navs = articles[0].getElementsByTagName("nav");
    if(navs.length == 0) return false;
    var links = navs[0].getElementsByTagName("a");
    for(var i=0; i < links.length; i++){
        var sectionId = links[i].getAttribute("href").split("#")[1];
        if(!document.getElementById(sectionId)) continue;
        document.getElementById(sectionId).style.display = "none";
        links[i].destination = sectionId;
        links[i].onclick = function (){
            showSection(this.destination);
            return false;
        }
    }
}
addLoadEvent(prepareInternalnav);

function preparePlaceholer(){
    if(!document.createElement) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById("imagegallery")) return false;
    if(!document.createTextNode) return false;
    var placeholer = document.createElement("img");
    placeholer.setAttribute("id","placeholder");
    placeholer.setAttribute("src","images/photos/placeholder");
    var description = document.createElement("p");
    description.setAttribute("id","description");
    var text  = document.createTextNode ("choose an image");
    description.appendChild(text);
    var gallery = document.getElementById("imagegallery");
    insertAfter(description,gallery);
    insertAfter(placeholer,description);
    
}

function prepareGallery (){
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById("imagegallery")) return false;
    var gallery = document.getElementById("imagegallery");
    var links  = gallery.getElementsByTagName("a");
    for(var i = 0; i < links.length; i++){
        links[i].onclick  = function () {
            return showPic(this);
        }
    }
}

function showPic(whichpic){
    if(!document.getElementById("placeholder")) return false;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src",source);
    if(!document.getElementById("description")) return false;
    if(whichpic.getAttribute("title")){
        var text = whichpic.getAttribute("title");
    } else {
        var text = "";
    }
    var description =  document.getElementById("description");
    if(description.firstChild.nodeType == 3){
        description.firstChild.nodeValue = text;
    }
    return false;
}

addLoadEvent(preparePlaceholer);
addLoadEvent(prepareGallery);

function stripeTables (){
    if(!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName("table");
    for(var i = 0; i < tables.length; i ++){
        var odd = false;
        var rows = tables[i].getElementsByTagName("tr");
        for(var j = 0; j < rows.length; j++){
            if(odd == true){
                addClass(rows[j], "odd");
                odd = false;
            } else {
                odd = true;
            }
        }
    }
}

function highlightRows(){
    if(!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for(var i = 0; i < rows.length; i++){
        rows[i].oldClassName = rows[i].className;
        rows[i].onmouseover = function (){
            addClass(this, "highlight");
        }
        rows[i].onmouseout = function (){
            this.className = this.oldClassName;
        }
    }
}

function displayAbbreviations(){
    if(!document.getElementsByTagName) return false;
    if(!document.createElement) return false;
    if(!document.createTextNode) return false;
    var abbrs = document.getElementsByTagName("abbr");
    if(abbrs.length < 1) return false;
    var defs = new Array ();
    for (var i = 0; i < abbrs.length; i++){
        if(abbrs[i].childNodes.length < 1) continue;
        var definations = abbrs[i].getAttribute("title");
        var keys = abbrs[i].lastChild.nodeValue;
        defs[keys] = definations;
    }

    var dlist = document.createElement("dl");
    for (keys in defs) {
        var definations = defs[keys];
        var dtitle = document.createElement("dt");
        var dtitle_text = document.createTextNode(keys);
        dtitle.appendChild(dtitle_text);
        var ddsc = document.createElement("dd");
        var ddsc_text = document.createTextNode(definations);
        ddsc.appendChild(ddsc_text);
        dlist.appendChild(dtitle);
        dlist.appendChild(ddsc);
    }
    if(dlist.childNodes.length < 1) return false;
    var header = document.createElement("h3");
    var header_text = document.createTextNode("Abbreviations");
    header.appendChild(header_text);
    var articles = document.getElementsByTagName("article");
    if(articles.length == 0) return false;
    articles[0].appendChild(header);
    articles[0].appendChild(dlist);
}

addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);

function focusLabels (){
    if(!document.getElementsByTagName) return false;
    var labels = document.getElementsByTagName("label");
    for (var i = 0; i < labels.length; i++){
        if(!labels[i].getAttribute("for")) continue;
        labels[i].onclick = function (){
            var id = this.getAttribute("for");
            if(!document.getElementById(id)) return false;
            document.getElementById(id).focus();
        }
    }
}
addLoadEvent(focusLabels);

function resetField(whichform){
    if(!Modernizr.input.placeholder) return;
    for(var i = 0; i < whichform.elements.length; i ++){
        var element = whichform.elements[i];
        if(element.type == "submit") continue;
        var check = element.placeholder || element.getAttribute("placeholder");
        if(!check) continue;
        element.onfocus = function (){
            var text = this.placeholder || this.getAttribute("placeholder");
            if(this.value == text ){
                this.className = "";
                this.value = "";
            }
        }
        element.onblur = function (){
            if(this.value == ""){
                this.className = "placeholder";
                this.value = this.placeholder || this.getAttribute("placeholder");
            }
        }
        element.onblur();
    }
    
}

function prepareForms(){
    for(var i = 0; i < document.forms.length; i ++){
        var thisform = document.forms[i];
        resetField(thisform);
        thisform.onsubmit = function(){
            if(!checkForm(this)) return false;
            var articles = document.getElementsByTagName("article")[0];
            if(submitFormWithAjax(this, articles)) return false;
            return true;
        }
    }
}
addLoadEvent(prepareForms);

function isFilled(field){
    if(field.value.replace(" ","").length == 0) return false;
    var placeholder = field.placeholder || field.getAttribute("placeholder");
    return (field.value != placeholder);
}

function isEmail(field){
    return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}

function checkForm(whichform) {
    for (var i = 0; i < whichform.elements.length; i ++) {
        var element = whichform.elements[i];
        if(element.required == true) {
            if(!isFilled(element)){
                alert("Please fill in the " + element.name + " field.");
                return false;
            }
        }
        if(element.type == "email"){
            if(!isEmail(element)){
                alert("The " + element.name + " field must be a valid email address");
                return false;
            }
        }
    }
    return true;
}

function getHTTPObject (){
    if(typeof XMLHttpRequest == "undefined")
        XMLHttpRequest= function (){
            try {return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
            catch(e){}
            try {return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
            catch(e){}
            try {return new ActiveXObject("Msxml2.XMLHTTP");}
            catch(e){}
            return false;
        }
        return new XMLHttpRequest();
}

function dispalyAjaxLoading(element){
    while(element.hasChildNodes()){
        element.removeChild(element.lastChild);
    }
    var content = document.createElement("img");
    content.setAttribute("src", "images/loading.gif")
    element.appendChild(content);
}

function submitFormWithAjax(whichform, thetarget){
    var request = getHTTPObject();
    if(!request) return false;
    dispalyAjaxLoading(thetarget);
    var dataParts = [];
    var element;
    for (var i =0; i < whichform.elements.length; i++){
        element = whichform.elements[i];
        dataParts[i] =  element.name + "=" + encodeURIComponent(element.value);
    }
    var data = dataParts.join("&");
    request.open("POST", whichform.getAttribute("action"), true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.onreadystatechange = function () {
        if(request.readyState == 4){
            if(request.status == 200 || request.status == 0){
                var matches  = request.responseText.match (/<article>([\s\S]+)<\/article>/);
                if(matches.length > 0){
                    thetarget.innerHTML = matches[1];
                } else {
                    thetarget.innerHTML = "<p>There was an error</p>";
                }
            } else {
                thetarget.innerHTML = "<p>" + request.statusText + "</p>";
            }
        }
    };
    request.send(data);
    return true;
};
