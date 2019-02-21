
(function () {
    //切换选项卡
    tab();
    //加载图片
    createPullImg();
    setTimeout(function () {
        waterFull("dom_pull", "dom-pull-box");
    }, 200);
    //监听窗口滚动
    window.onscroll = function () {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (scrollTop > 180) {
            $("page_nav").style.display = "block";
            $("elevator").style.display = "block";
        } else {
            $("page_nav").style.display = "none";
            $("elevator").style.display = "none";
        }

        if (checkWillLoadImage()) {
            createPullImg();
            spyClick();
            waterFull("dom_pull", "dom-pull-box");
        }
    };
    //监听点击事件
    $("hbw_login").onclick = function () {
      $("page_mask").style.display = "block";
    };
    $("hbw_register").onclick = function () {
        $("page_mask").style.display = "block";
    };
    $("close_btn").onclick = function () {
      $("page_mask").style.display = "none";
    };
    $("elevator").onclick = function () {
        buffer(document.documentElement, {scrollTop: 0}, null)
    };
    $("pic_container").onclick = function() {
        $("pic_container").style.display = "none";
    };

    spyClick();
    autoPlay();

})();


function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;
}

function spyClick() {
    // "监听图片点击"
    const allBox = $("dom_pull").getElementsByClassName("dom-pull-box");
    for (let i=0; i<allBox.length; i++) {
        const box = allBox[i];
        box.onclick = function () {
            console.log(0);
            const src = this.childNodes[0].childNodes[0].src;
            openPreview(src);
        }
    }
}

function openPreview(src) {
    const str = "<div id='box'>" +
        "<div id='small_box'>" +
        "<span></span>" +
        "<img src=" + src + " />" +
        "</div>" +
        "<div id='big_box'>" +
        "<img src=" + src + " style='position: absolute;left: 0;top: 0;' />" +
        "</div>" +
        "</div>";
    $("pic_container").innerHTML = str;
    $("pic_container").style.display = "block";
    //获取所需标签
    var box = document.getElementById("box");
    var small_box = box.children[0];
    var smallImg = small_box.children[1];
    var big_box = box.children[1];
    var bigImg = big_box.children[0];
    var mask = small_box.children[0];

    //监听鼠标进入
    small_box.onmouseover = function(){
        mask.style.display = 'block';
        big_box.style.display = 'block';
    };
    small_box.onmousemove = function(event){
        var event = event || window.event;
        var pointX = event.clientX - small_box.offsetParent.offsetLeft - mask.offsetWidth*0.5;
        var pointY = event.clientY - small_box.offsetParent.offsetTop - mask.offsetHeight*0.5;
        //console.log(pointX +','+pointY);

        if(pointX < 0){
            pointX = 0;
        }else if(pointX > small_box.offsetParent.offsetWidth - mask.offsetWidth){
            pointX = small_box.offsetParent.offsetWidth - mask.offsetWidth;
        }

        if(pointY < 0){
            pointY = 0;
        }else if(pointY > small_box.offsetParent.offsetHeight - mask.offsetHeight){
            pointY = small_box.offsetParent.offsetHeight - mask.offsetHeight
        };

        mask.style.left = pointX + 'px';
        mask.style.top = pointY + 'px';

        //等比移动

        bigImg.style.left = - pointX / (small_box.offsetParent.offsetWidth/big_box.offsetWidth) + 'px';
        bigImg.style.top = - pointY / (small_box.offsetParent.offsetHeight/big_box.offsetHeight) + 'px';
    };
    small_box.onmouseout = function(){
        //隐藏显示元素
        mask.style.display = 'none';
        big_box.style.display = 'none';
    };
}

function checkWillLoadImage() {
    const allBox = $("dom_pull").getElementsByClassName("dom-pull-box");
    const lastBox = allBox[allBox.length - 1];
    const lastBoxTop = lastBox.offsetHeight / 2 + lastBox.offsetTop;
    const screenHeight = document.body.clientHeight || document.documentElement.clientHeight;
    const scrollTop = window.pageYOffset || document.body.scrollTop;
    return lastBoxTop <= screenHeight + scrollTop;
}

function createPullImg() {
    const json = [
        {txt: '当我们正在为生活疲于奔命的时候，生活已经离我们而去。——约翰·列侬', pic: 'images/0.jpg'},
        {txt: '活在世上，不必什么都知道，只知道最好的就够了。——王小波', pic: 'images/1.jpg'},
        {txt: '世界上任何书籍都不能带给你好运，但是它们能让你悄悄变成你自己。——黑塞', pic: 'images/2.jpg'},
        {txt: '很多人不需要再见，只是路过而已。——《彼岸花》', pic: 'images/3.jpg'},
        {txt: '人生最困难的三件事：保守秘密，忘掉所受的创伤，充分利用余暇。——吉罗', pic: 'images/4.jpg'},
        {txt: '有些人是离开后，才会发觉那个人是最喜欢的。——《东邪西毒》', pic: 'images/5.jpg'},
        {txt: '我总是在日暮时分,书影与书影之间,宁静的悲哀里,最想念你。——亦舒', pic: 'images/6.jpg'},
        {txt: '再长的路，一步步地能走完，再短的路，不迈开双脚也无法到达。', pic: 'images/7.jpg'},
        {txt: '哪里会有人喜欢孤独，不过是不喜欢失望。——村上春树', pic: 'images/8.jpg'},
        {txt: '人时已尽，人世很长，我在中间，应当休息。——顾城', pic: 'images/9.jpg'},
        {txt: '信任的深浅，不在于会不会对你笑，而在于愿不愿意在你面前哭。', pic: 'images/10.jpg'},
        {txt: '有一种旅行，不为跋涉千里的向往，只为漫无目的的闲逛，不为人山人海的名胜，只为怡然自乐的街景...', pic: 'images/11.jpg'},
        {txt: '人都会孤独，但唯独他，可以越过这尘世的热闹，一眼明白这世间所有的繁华不过是他身边的过眼云烟。', pic: 'images/12.jpg'},
        {txt: '不乱于心，不困于情。不畏将来，不念过往。如此，安好。', pic: 'images/13.jpg'},
        {txt: '每一个人都需要这样一个朋友：当以为自己再也笑不出来的时候，他能让你开怀大笑！', pic: 'images/14.jpg'},
        {txt: '咖啡苦与甜，不在于怎么搅拌，而在于是否放糖；一段伤痛，不在于怎么忘记，而在于是否有勇气重新开始。', pic: 'images/15.jpg'},
        {txt: '其实我不是一定要等你，只是等上了，就等不了别人了。——《朝露若颜》', pic: 'images/16.jpg'},
        {txt: '一切都是瞬间，一切都会过去，一切过去了的都会变成亲切的怀念。——普希金', pic: 'images/17.jpg'},
        {txt: '多少人曾爱慕你年轻时的容颜，可知谁愿承受岁月无情的变迁', pic: 'images/18.jpg'},
        {txt: '不在任何东西面前失去自我，哪怕是教条，哪怕是别人的目光，哪怕是爱情。——《成为简·奥斯汀》', pic: 'images/19.jpg'},
        {txt: '你如果认识从前的我，也许你会原谅现在的我。——张爱玲', pic: 'images/20.jpg'},
        {txt: '简约不是少，而是没有多余。足够也不是多，而是刚好你在。', pic: 'images/21.jpg'},
        {txt: '若只是喜欢 何必夸张成爱。——林夕', pic: 'images/22.jpg'},
        {txt: '梦里出现的人，醒来时就该去见她，生活就是这么简单。——《新桥恋人》', pic: 'images/23.jpg'},
        {txt: '与众不同的你是幸运的，何必让自己变得与别人一样。', pic: 'images/24.jpg'},
        {txt: '阳光温热，岁月静好，你还不来，我怎敢老。', pic: 'images/25.jpg'},
        {txt: '一个人知道自己为什么而活，就能忍受任何生活。——尼采', pic: 'images/26.jpg'},
        {txt: '我们已经出发了太久，以至于我们忘了为什么要出发。——纪伯伦', pic: 'images/27.jpg'},
        {txt: '水来，我在水中等你；火来，我在灰烬中等你。——《你是我的独家记忆》', pic: 'images/28.jpg'},
        {txt: '天下就没有偶然，那不过是化了妆的，戴了面具的必然。——钱钟书', pic: 'images/29.jpg'}
    ];
    let desc, imgUrl, domBox, dompic, newStr, str;

    for (let i=0; i<json.length; i++) {
        str = $("dom_pull").innerHTML;

        desc = json[i].txt;
        imgUrl = json[i].pic;

        newStr = "<div id='dom_pull-box' class='dom-pull-box'>" +
                    "<div id='dom_pull-box_pic' class='dom-pull-box_pic'>" +
                    "<img src="+ imgUrl +" alt=''>" +
                    "<div class='cover'></div>" +
                    "</div><div class='dom-pull-box_desc'>" + desc +
                    "</div><div class='box-btn'>" +
                    "<div class='collect'>采集</div>" +
                    "<div class='like'>" +
                    "<span class='heart'></span></div></div></div>";

        str += newStr;
        $("dom_pull").innerHTML = str;

        domBox = $("dom_pull").getElementsByClassName("dom-pull-box");
        dompic = $("dom_pull").getElementsByClassName("dom-pull-box_pic")
        for (let j=0; j<domBox.length; j++) {

            domBox[j].onmouseover = function () {
                this.childNodes[2].style.display = "flex"
            };
            domBox[j].onmouseout = function () {
                this.childNodes[2].style.display = "none"
            };
            dompic[j].onmouseover = function () {
                this.childNodes[1].style.display = "block"
            };
            dompic[j].onmouseout = function () {
                this.childNodes[1].style.display = "none"
            };
        }

    }
}

function tab() {
    const tabList = $("page_tab_header").getElementsByTagName("li");
    const doms = $("page_tab_content").getElementsByClassName("dom");
    let lastOne = 0;

    for (let i=0; i<tabList.length; i++) {
        let li = tabList[i];
        li.onmousedown = function () {
            tabList[lastOne].className = "";
            doms[lastOne].style.display = "none";

            doms[i].style.display = "block";
            this.className = "current";
            lastOne = i;
        }
    }
}

function autoPlay() {
    let lis = $("page_banner").getElementsByTagName("li");
    let timer = null, index = 0;
    clearInterval(timer);
    timer = setInterval(function () {
        for (let i=0; i<lis.length; i++) {
            const li = lis[i];
            buffer(li, {opacity: 0}, null)
        }
        buffer(lis[index], {opacity: 1}, null)
        index++;
        if (index === lis.length) {
            index = 0;
        }
    }, 2000)
}

