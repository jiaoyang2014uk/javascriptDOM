function convertToGs(img){
    //如果浏览器不支持canvas就返回
    if(! Modernizr.canvas) return;
    //存储原始的彩色版
    img.color = img.src;
    //创建灰度版
    img.grayscale = createGSCanvas(img);
    //在mouseover/out事件发生时切换图片
    img.onmouseover = function (){
        this.src = this.color;
    }
    img.onmouseout = function (){
        this.src = this.grayscale;
    }
    img.onmouseout();
}

function createGSCanvas(img){
    //绘制彩色图片
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height =  img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img,0,0);

    //注意：getImageData只能操作与脚本位于同一域中的图片
    //取得原始图像数据
    var c = ctx.getImageData(0,0,img.width, img.height);
    //遍历每一个元素
    for(i=0; i<c.height; i++){
        for(j=0; j<c.width;j++){
            var x = (i*4)*c.height+(j*4);
            var r = c.data[x];
            var g = c.data[x+1];
            var b = c.data[x+2];
            //求平均值，得到对应彩色值的灰度值
            c.data[x] = c.data[x+1] = c.data[x+2] = (r+g+b)/3;
        }
    }
    //放回
    ctx.putImageData(c, 0, 0, 0, 0, c.width, c.height);

    //返回原始的图像数据
    return canvas.toDataURL();
}

//添加load事件。如果有其它脚本，可以使用addloadEvent函数
window.onload = function (){
    convertToGs(document.getElementById("avatar"));
}