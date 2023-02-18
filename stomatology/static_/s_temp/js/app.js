//Hide preloader
$(document).ready(() => {
    $('#preloader').fadeOut(400);
    let lang = document.querySelector('#l_ang').textContent;
    chouse_lang( lang );
    //initialization slick gallery
    $('.slick-gallery').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      dots: true,
      centerMode: true,
      focusOnSelect: true
    });
});

let api_mmenu;
document.addEventListener(
    "DOMContentLoaded", () => {
        const menu = new Mmenu( "#menu", {
           "offCanvas": {
                "title": "DENTALEX",
                "position": "left-front"
           },
           "theme": "dark",
        });
        api_mmenu = menu.API;
    }
);

document.addEventListener("click", function (evnt) {
  var anchor = evnt.target.closest('a[href="#/"]');
});

$(".owl-carousel").owlCarousel({
    autoPlay: 9000,
    slideSpeed : 1000,
    //items : 1,
    itemsScaleUp: true,
    singleItem:true,
    //navigation : true
});

$(window).scroll(function(){
    let element_height = $('#header').height();	
    let element = $('.wrap-social-widget');
    let trigger = true;
    //window.screen.width < 769
    if( trigger && $(this).scrollTop()>=element_height){
        element.addClass('fixed');
        trigger = false;
        // instead of alert you can use to show your ad
        // something like $('#footAd').slideup();
    }
    if($(this).scrollTop() <= element_height){
    	console.log($(this).scrollTop());
    	element.removeClass('fixed');
    	trigger = true;
    }
});

let ua_lang = ['Головна', 'Команда', 'Послуги', 'Галерея', 'Контакти', 'UA'];
let ru_lang = ['Главная', 'Команда', 'Услуги', 'Галерея', 'Контакты', 'RU'];
let en_lang = ['Main', 'Team', 'Services', 'Gallery', 'Contacts', 'EN'];

const languges = document.querySelectorAll('.chouse');
const lang_array = [].slice.call(languges);

const get_nav_items = () => {
    let nav_items = document.querySelectorAll('.nav-item');
    //let nav_items_array = [].slice.call(nav_items);
    return nav_items;
}
const change_lang_nav = (lang_list, nav_items_array) => {
    for (let i = 0; i < nav_items_array.length; i++) {
        nav_items_array[i].textContent = lang_list[i%6]; 
    }
}
const chouse_lang = (data_attribute) => {
    let nav_items_array = get_nav_items(); // get navigation list

     if (data_attribute == 'EN') {
        change_lang_nav(en_lang, nav_items_array);
    }
    if (data_attribute == 'RU') {
        change_lang_nav(ru_lang, nav_items_array);
    }
    if (data_attribute == 'UA') {
        change_lang_nav(ua_lang, nav_items_array);
    }
}
const lang_click_handler = (elem) => {
    elem.preventDefault(); 
    let data_attribute = elem.srcElement.dataset.lang;
    $.get(
     'lang', {data : data_attribute},
    );

    chouse_lang( data_attribute );
}

lang_array.forEach((elem) => {
    elem.addEventListener('click', lang_click_handler);
});

//Geolocation pop-up
(() => {
const geo_map = $('.geo-map');
const geo_close = $('.close-map');
geo_map.click((e) => {
    e.preventDefault();
    api_mmenu.close();
    let pop_up = $('.geolocation-popup');
    pop_up.fadeIn();
});
geo_close.click(() => {
    let pop_up = $('.geolocation-popup');
    pop_up.fadeOut();
});})();

//Smooth scroll

(() => {
    $('#contacts').click((e)=>{
        e.preventDefault();
       
        let id = $(e.target).attr('href');
        let top = $(id).offset().top;
        $('html, body').stop().animate({
            scrollTop: top
        }, 800);
    });
})();

// Typing advertisment
(() => {
    let ad = document.querySelector('#a_d_v');
    let ads = document.querySelectorAll('.adv');
    let ads_length = [].slice.call(ads).length;
    let ad_list = [].slice.call(ad.textContent);
    let iter = 0;
    let type = ( ad_list ) => {
        if (iter == ad_list.length) {
            iter = 0;
        }
        iter += 1;
        let word = ad_list.slice(0, iter).join('');
        for (var i = 0; i < ads_length; i++) {
            ads[i].textContent = word;
        }
    }
    let timer = setInterval( type, 300, ad_list);
})();

//Initialization masonry
$('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true
});

// Slick Sliders
