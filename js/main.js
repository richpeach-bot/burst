$(function () {

    // $('.top__slider').slick({
    //     arrows: false,
    //     autoplay: true,
    //     autoplaySpeed: 3000,
    //     fade: true,
    //     infinity: true,
    // });

    // $('.top__link').click(function(){
    //     $('.top__slider').slick('slickPlay');
    // });

    // $('.top__link').click(function(){
    //     $('.top__slider').slick('slickPause');
    // });

    // sliders

    $('.gallery__slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<button type="button" class="slick-btn slick-prev"><img src="images/arrow-left.svg" alt=""></button>',
        nextArrow: '<button type="button" class="slick-btn slick-next"><img src="images/arrow-right.svg" alt=""></button>',
    });

    $('.product-item__slider').slick({
        infinite: false,
        prevArrow: '<button type="button" class="slick-btn slick__product-itemprev"><img src="images/arrow-left.svg" alt=""></button>',
        nextArrow: '<button type="button" class="slick-btn slick__product-itemnext"><img src="images/arrow-right.svg" alt=""></button>',
    });

    $('.product-card__slider-nav').slick({
        vertical: true,
        // verticalSwiping: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.product-card__slider',
        arrows: false,
        infinite: true,
        focusOnSelect: true
    });

    $('.product-card__slider').slick({
        arrows: false,
        fade: true,
        asNavFor: '.product-card__slider-nav',
        slidesToShow: 1,
        slidesToScroll: 1,
    });

    $('.product-item__slider').slick('setPosition');

    // favorite

    $('.product-item__box-favorite').on('click', function () {
        $(this).toggleClass('product-item__box-favorite--active');
    });

    $('.product-card__favorite').on('click', function () {
        $(this).toggleClass('product-card__favorite--active');
    });


    // filters

    $('.catalog__filter-btn--grid-3').on('click', function () {
        $(this).addClass('catalog__filter-button--active');
        $('.catalog__filter-btn--grid-2').removeClass('catalog__filter-button--active');
        $('.product-item__slider').removeClass('product-item__slider--grid-2')
    });


    $('.catalog__filter-btn--grid-2').on('click', function () {
        $(this).addClass('catalog__filter-button--active');
        $('.catalog__filter-btn--grid-3').removeClass('catalog__filter-button--active');
        $('.product-item__slider').addClass('product-item__slider--grid-2')
    });

    //remember scroll

    let $window = $(window)

    /* Restore scroll position */
    window.scroll(0, localStorage.getItem('scrollPosition')|0)

    /* Save scroll position */
    $window.scroll(function () {
        localStorage.setItem('scrollPosition', $window.scrollTop())
    })


    // checkbox

    $.each($('.product-item__hover-checkboxbtn'), function (index, val) {
        if ($(this).find('input').prop('checked') == true) {
            $(this).addClass('active');
        }
    });

    $(document).on('click', '.product-item__hover-checkboxbtn', function (event) {
        if ($(this).hasClass('active')) {
            $(this).find('input').prop('checked', false);
        } else {
            $(this).find('input').prop('checked', true);
        }
        $(this).toggleClass('active');

        return false;
    });

    $.each($('.aside-filter__content-label'), function (index, val) {
        if ($(this).find('input').prop('checked') == true) {
            $(this).addClass('active');
        }
    });

    $(document).on('click', '.aside-filter__content-label', function (event) {
        if ($(this).hasClass('active')) {
            $(this).find('input').prop('checked', false);
        } else {
            $(this).find('input').prop('checked', true);
        }
        $(this).toggleClass('active');

        return false;
    });

    // radio

    $.each($('.product-item__hover-radiobtn',), function (index, val) {
        if ($(this).find('input').prop('checked') == true) {
            $(this).addClass('active');
        }
    });

    $(document).on('click', '.product-item__hover-radiobtn', function (event) {
        $(this).parents('.product-item__hover-radiobtn').find('.product-item__hover-radiobtn').removeClass('active');
        $(this).parents('.product-item__hover-radiobtns').find('.product-item__hover-radiobtn input').prop('checked', false);
        $(this).toggleClass('active');
        $(this).find('input').prop('checked', true);

        return false;
    });

    $.each($('.product-card__radio'), function (index, val) {
        if ($(this).find('input').prop('checked') == true) {
            $(this).addClass('active');
        }
    });

    $(document).on('click', '.product-card__radio', function (event) {
        $(this).parents('.product-card__radio').find('.product-card__radio').removeClass('active');
        $(this).parents('.product-card__radio-btns').find('.product-card__radio input').prop('checked', false);
        $(this).toggleClass('active');
        $(this).find('input').prop('checked', true);

        return false;
    });


    $(".js-range-slider").ionRangeSlider();

});



// popup

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock()
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});


// function myFunction() {
//     var popup = document.getElementById("popup-mini");
//     popup.classList.toggle("show");
// }