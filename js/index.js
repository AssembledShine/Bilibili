$(function () {

    addNavLiListener();

    recBannerCarousel();

    liveTabSwitch();

    liveBannerCarousel();

    animeTabSwitch();

    bangumiTabSwitch();

    bangumiBannerCarousel();

    sideNavScroll();
})

function sideNavScroll() {
    var val = $('.side-nav').offset().top;
    var lastTop = 0;
    var num = 0;
    window.onscroll = function () {
        var top = scroll().top;
        var disY = top - lastTop;
        lastTop = top;
        if (top > val) {
            var anim = {'top': top - val};
            num = top - val;
        } else if (disY < 0) {
            if (top - val <= 0) {
                var anim = {'top': 0};
                num = 0;
            } else {
                var anim = {'top': top - val};
                num = top - val;
            }
        }
        $('.side-nav').css('top', num);
        var top = $('.push').offset().top - $(this).scrollTop();
        console.log(top);
    }
    $('.go-top').click(function () {
        $('body,html').animate({scrollTop: 0}, 200);
    });
}

function scroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft
    }
}

function bangumiBannerCarousel() {
    bannerCarousel($('.bangumi > .bangumi-right > .carousel-inside'));
}

function bangumiTabSwitch() {
    var tabArr = $('.bangumi-schedule > .bangumi-left > .bangumi-title > .week > .w-item');
    var tabContent = $('.bangumi-schedule > .bangumi-left > .schedule > .sch-item');
    tabArr.mouseenter(function () {
        tabArr.removeClass('on').eq($(this).index()).addClass('on');
        tabContent.removeClass('on').eq($(this).index()).addClass('on');
    });
}

function animeTabSwitch() {
    var tabArr = $('.anime > .anime-right > .title > .tab > .tab-panel');
    var tabContent = $('.anime > .anime-right > .tab-item > .carousel-outside');
    tabSwitch(tabArr, tabContent);
}

function tabSwitch($tab, $content) {
    var tabArr = $tab;
    var tabContent = $content;
    tabArr.mouseenter(function () {
        tabArr.removeClass('on').eq($(this).index()).addClass('on');
        if (tabContent != undefined) {
            var left = -$(this).index() * tabContent.parent().width();
            tabContent.css('left', left);
        }
    });
}

function bannerCarousel($bannerCTNR) {
    var bannerCTNR = $bannerCTNR;
    var bannerCTNRWidth = bannerCTNR.width();
    var banners = bannerCTNR.find('.slide');
    var bannerArr = bannerCTNR.find('.slide > li');
    var dotArr = bannerCTNR.find('.dot > li');
    var imgIndex = 0;

    var newBanner = bannerArr.eq(0).clone();
    banners.append(newBanner);

    var length = banners.children().length;
    var bannersWidth = length * 100 + "%";
    banners.width(bannersWidth);

    banners.css('transition', 'all .6s');
    banners.css('left', -imgIndex * bannerCTNRWidth);

    var timer;
    clearInterval(timer)
    timer = setInterval(autoPlay, 5000);

    function autoPlay() {
        imgIndex++;
        banners.css('transition', 'all .6s');
        banners.css('left', -imgIndex * bannerCTNRWidth);
        var dotIndex = imgIndex >= length - 1 ? 0 : imgIndex;
        dotArr.removeClass('active').eq(dotIndex).addClass('active');
    }

    banners.bind('webkitTransitionEnd', function () {
        if (imgIndex >= length - 1) {
            imgIndex = 0;
            banners.css('transition', 'all 0s');
            banners.css('left', -imgIndex * bannerCTNRWidth);
        }
    })

    for (var i = 0; i < dotArr.length; i++) {
        dotArr.eq(i).attr('index', i);
        dotArr.eq(i).click(function () {
            imgIndex = $(this).attr('index');
            clearInterval(timer);
            banners.css('transition', 'all .6s');
            banners.css('left', -imgIndex * bannerCTNRWidth);
            dotArr.removeClass('active').eq(imgIndex).addClass('active');
            timer = setInterval(autoPlay, 5000);
        })
    }
}

// 直播Banner轮播
function liveBannerCarousel() {
    bannerCarousel($('.live > .live-right > .tab-item > .carousel-outside > .recommend > .carousel-inside'));
}

// 直播Tab切换
function liveTabSwitch() {
    var tabArr = $('.live > .live-right > .tab > .tab-panel');
    var tabContent = $('.live > .live-right > .tab-item > .carousel-outside');
    tabSwitch(tabArr, tabContent);
}

// 二级导航栏添加鼠标移入移除监听
function addNavLiListener() {
    $('.nav-guide > .guide-wrapper > .nav > li').on('mouseenter', function (e) {
        $(this).find('ul').css('display', 'flex');
    })

    $('.nav-guide > .guide-wrapper > .nav > li').on('mouseleave', function (e) {
        $(this).find('ul').css('display', 'none');
    })
}

// 推荐Banner轮播
function recBannerCarousel() {
    bannerCarousel($('.main-page > .recommend > .rec-carousel'));
}