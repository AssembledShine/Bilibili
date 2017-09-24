$(function () {

    // ----------------------------------

    $('.nav>li').on('mouseenter', function (e) {
        $(this).find('ul').css('display', 'flex');
    })

    $('.nav>li').on('mouseleave', function (e) {
        $(this).find('ul').css('display', 'none');
    })

    // ----------------------------------

    // var bannerWidth = $('.rec-carousel').width();
    // var banners = document.querySelector('.slide');
    // var imgIndex = 0;
    //
    // var ulNewLi = banners.children[0].cloneNode(true);
    // banners.appendChild(ulNewLi);
    //
    // banners.style.transition = 'all .6s';
    // banners.style.left = -imgIndex * bannerWidth + "px";
    //
    // var timer = setInterval(function () {
    //     imgIndex++;
    //     banners.style.transition = 'all .6s';
    //     banners.style.left = -imgIndex * bannerWidth + "px";
    // }, 3000)
    //
    // banners.addEventListener('webkitTransitionEnd', function () {
    //     if (imgIndex > 4) {
    //         imgIndex = 0;
    //         banners.style.transition = 'all .0s';
    //         banners.style.left = -imgIndex * bannerWidth + "px";
    //     }
    // })

    // JQ实现

    var imgWidth = $('.rec-carousel').width();
    var banners = $('.slide');
    var dots = $('.dot');
    var imgIndex = 0;

    var newLi = banners.children().eq(0).clone();
    banners.append(newLi);

    var width = banners.children().length * 100 + '%'
    banners.width(width);

    banners.css('transition', 'all .6s');
    banners.css('left', -imgIndex * imgWidth);

    var timer;
    clearInterval(timer);
    timer = setInterval(autoScroll, 3000)

    function autoScroll() {
        imgIndex++;
        banners.css('transition', 'all .6s');
        banners.css('left', -imgIndex * imgWidth);
        var dotIndex = imgIndex > 4 ? 0 : imgIndex;
        dots.children().removeClass('active').eq(dotIndex).addClass('active');
    }

    banners.bind('webkitTransitionEnd', function () {
        if (imgIndex > 4) {
            imgIndex = 0;
            banners.css('transition', 'all .0s');
            banners.css('left', -imgIndex * imgWidth);
        }
    })

    var dotArr = dots.children();
    for (var i = 0; i < dotArr.length; i++) {
        dotArr.eq(i).attr('index', i);
        dotArr.eq(i).click(function () {
            imgIndex = $(this).attr('index');
            console.log(imgIndex);
            clearInterval(timer);
            banners.css('transition', 'all .6s');
            banners.css('left', -imgIndex * imgWidth);
            dots.children().removeClass('active').eq(imgIndex).addClass('active');
            timer = setInterval(autoScroll, 3000)
        })
    }
})