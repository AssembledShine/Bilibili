$(function () {

    addNavLiListener();

    recBannerCarousel();

    liveTabSwitch();

    liveBannerCarousel();
})

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
    var tabContent = $('.tab-item > .carousel-outside');
    tabArr.mouseenter(function () {
        tabArr.removeClass('on').eq($(this).index()).addClass('on');
        var left = -$(this).index() * tabContent.parent().width();
        tabContent.css('left', left);
    });

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