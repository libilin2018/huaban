$(function(){
    load360Img(0, 30);
});
function load360Img(start, count) {
    $.ajax({
        type: "GET",
        url: "http://wallpaper.apc.360.cn/index.php",
        // data: "c=WallPaper&a=getAppsByOrder&order=create_time&start="+ start +"&count=" + count + "&from=360chrome",
        data: {
            "c": "WallPaper&a=getAppsByOrder",
            "order": "create_time",
            "start": 0,
            "count": 10,
            "from": "360chrome"
        },
        dataType : "jsonp",
        jsonp: "callback",
        success: function (data) {
            console.log(data);
        },
        fail: function (res) {
            console.log(res);
        }
    })
}

