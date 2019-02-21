function waterFull(parent, child) {
    const allBox = $(parent).getElementsByClassName(child)
    const boxWidth = allBox[0].offsetWidth;
    const xyMargin = 12;

    let heightArr = [], minBoxHeight = 0, minBoxIndex = 0;
    for (let i=0; i<allBox.length; i++) {
        let boxHeight = allBox[i].offsetHeight + xyMargin;
        if (i < 5) {
            heightArr.push(boxHeight);
            allBox[i].style.position = "absolute";
            allBox[i].style.left = i * (boxWidth + xyMargin) + "px";
        } else {
            minBoxHeight = Math.min.apply(this, heightArr);
            minBoxIndex = getArrIndex(heightArr, minBoxHeight);

            allBox[i].style.position = "absolute";
            allBox[i].style.left = (boxWidth + xyMargin) * minBoxIndex + "px";
            allBox[i].style.top = minBoxHeight + 30 + "px";

            heightArr[minBoxIndex] += boxHeight;
        }
    }

    const parentHeight = allBox[allBox.length - 1].offsetTop + allBox[allBox.length - 1].offsetHeight;
    $(parent).style.height = parentHeight + 'px';
}

function getArrIndex(arr, val) {
    for (let i=0; i<arr.length; i++) {
        if (arr[i] === val) {
            return i;
        }
    }

}

function buffer(obj, json, fn) {
    // 1. 清除定时器
    clearInterval(obj.timer);
    var begin = 0, end = 0;

    // 2. 设置定时器
    obj.timer = setInterval(function () {
        // 2.0 旗帜, 决定动画是否结束
        var flag = true;
        // 2.1 遍历
        for(var k in json){
            // 2.2.-1 求出起始值 和 结束值
            if(k === 'opacity'){ // 透明度
                //console.log(typeof(getCssAttr(obj, k)));
                begin = parseInt( parseFloat(getCssAttr(obj, k)) * 100);
                end = parseInt(parseFloat(json[k]) * 100);
            }else if(k === 'scrollTop'){ // 滚动到头部
                begin = obj.scrollTop;
                end = parseInt(json[k]);
            }else { // 正常情况
                begin = parseInt(getCssAttr(obj, k));
                end = parseInt(json[k]);
            }
            // 2.2.0 求出步长
            var step = (end - begin) * 0.2;
            step = step >=0 ? Math.ceil(step) : Math.floor(step);
            // 2.2.1 计算起始位置
            if(k === 'opacity'){
                obj.style.opacity = (begin + step) / 100;
                obj.style.filter = 'alpha(opacity=' + (begin + end)+')'; // 针对IE
            }else if(k === 'scrollTop'){
                obj.scrollTop = begin + step;
            }else if(k === 'zIndex'){
                obj.style[k] = json[k];
            }else {
                obj.style[k] = begin + step + 'px';
            }

            // 2.2.2 判断
            if(begin !== end){
                flag = false;
            }
        }

        // 3.0 结束动画
        if(flag){
            clearInterval(obj.timer);
            // 开启动画组中的下一组动画
            if(fn){ // 判断有没有这个函数
                fn();
            }
        }
    }, 60);
}
function getCssAttr(obj, attr) {
    if(obj.currentStyle){ // IE 和 Opera
        return obj.currentStyle[attr];
    }else { // 遵循W3C的
        return window.getComputedStyle(obj, null)[attr];
    }
}