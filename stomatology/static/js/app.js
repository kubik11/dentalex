let api_mmenu;
//Hide preloader
$(document).ready(() => {
    $('#preloader').fadeOut(400);
    let lang = document.querySelector('#l_ang').textContent;
    chouse_lang( lang );
    //initialization slick gallery
    const gallery = $('.swiper-gallary');
    let swiper;
    $('.gallery-id').click((e) => {
        e.preventDefault();
        api_mmenu.close(); // In order to shift out menu in mobile 
        gallery.css('display', 'flex');
        swiper = new Swiper('.swiper-gallary', {
          loop: true,
          slidesPerView: "auto",
          centeredSlides: true,
          spaceBetween: 30,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          }
        });
    });
    $('#close-swiper').click(() => {
        swiper.destroy();
        gallery.css('display',  'none');
    });
    //Initialization of reviews
    let reviews;
    reviews = new Swiper('.swiper-reviews', {
        direction: 'vertical',
        pagination: {
            el: ".reviews-pagination",
            clickable: true,
        },
    }); 
    //Initialization of reviews end
    //To embed a csrf token i each AJAX request
    $(() => {
        $.ajaxSetup({
            headers: {"X-CSRFToken": getCookie("csrftoken")}
        });
    });
    let getCookie = (c_name) => {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(';', c_start);
                if (c_end == -1) c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    }
    // End of embeding csrf token
    //Add reviews
    let _word_review = $('#add-review').text();
    let _click_clock = (elem) => {
        let add_btn = elem;
        if (add_btn.hasClass('btn-animation')) {
            add_btn.removeClass('btn-animation');
            add_btn.text('X');
            add_btn.css('background-color', '#000');
        }else{
            add_btn.addClass('btn-animation');
            add_btn.css('background-color', '#65ab36');
            add_btn.text(_word_review);
        } 
        $('.wrap-form-reviews').toggle('slow');
    }
    $('#add-review').click((e) => {
        let add_btn = $(e.target); 
       _click_clock(add_btn);
    });
    $('#send-review').click((e) => {
        e.preventDefault();
        let customer_name = $('#review-name').val();
        let customer_body = $('#review-body').val();
        if (customer_name && customer_body) {
            let review_obj = {
                name: customer_name,
                body: customer_body
            }
            $.ajax({
                url: '',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(review_obj),
                headers: {'X-Requested-With': 'XMLHttpRequest'},
                success: (data) => {
                   let data_obj = JSON.parse(data);
                   let container = $('<div class="swiper-slide reviews-item"><span class="reviews-name"> <span>:</span></span><article class="reviews-body"></article><span class="date"></span></div>');
                   
                   container.find('.reviews-name').text(data_obj[0]['fields']['name']);
                   container.find('.reviews-body').text(data_obj[0]['fields']['body']);
                   container.find('.date').text(convert(data_obj[0]['fields']['created']));
                   $(reviews.wrapperEl).prepend(container);
                   reviews.update()
                },
                error: (error) => {
                    console.log(error);
                }
            });
            _click_clock($('#add-review'));
        }
        let convert = (str_date) => {
            let month = {
                01: 'Jan',
                02: 'Feb',
                03: 'Mar',
                04: 'Apr',
                06: 'June',
                07: 'July',
                08: 'Aug',
                09: 'Sep',
                10: 'Oct',
                11: 'Nov',
                12: 'Dec'
            }
            let date = str_date.substring(0, 10);
            let date_split = date.split('-');
            let date_out = `${date_split[2]} ${month[Number(date_split[1])]} ${date_split[0]}`
            return date_out;
        }
    });
    //Add reviews end 
    //Initialization masonry
    (() => {
        let grid_list = document.querySelectorAll('.grid-item');
        for (let i = 0; i < grid_list.length; i++) {
           if( i == 1){
               grid_list[i].classList.add('grid-item-width2');
            }
            if( i == 5){
               grid_list[i].classList.add('grid-item-width2');
            }
        }
    })();
    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-item',
        percentPosition: true
    });
});

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

$("#owl_1").owlCarousel({
    autoPlay: 9000,
    slideSpeed : 1000,
    //items : 1,
    itemsScaleUp: true,
    singleItem:true,
    //navigation : true
});

let number_increment = (delay = 100) => {
    let elem = $('.dentalex-ad-body-quantity');
    let quantity = Number(elem.text());
    let delay_ = delay;
    if (quantity == 10000) {
        return;
    }
    quantity += 1;
    elem.text(quantity);
    setTimeout(number_increment, delay_, delay_- 10);
}
let increment_flag = false; // changed when scrolled to smile section
$(window).scroll(function(){
    let element_height = $('#header').height();	
    let element = $('.wrap-social-widget');
    let smiles = $('#smiles_section');
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
    if($(this).scrollTop() > smiles.position().top - 200) {
        if(!increment_flag){
            number_increment();
            increment_flag = true;
        }
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
    if (!ad ) {
        return;
    }
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

//Start callback
$(function(){
    $('.imgvk').hover(() => {
        $(this).children('img').stop().animate({width:"240px",height:"400px"}, 500);
    }, () => {
        $(this).children('img').stop().animate({width:"120px",height:"240px"}, 500);
    });
});

/* обратный звонок */
let callBackWidjet = function(callbackBtn, form) {
  if (!form)
    form = document.querySelector('[data-id="'+callbackBtn.getAttribute("data-depend-form")+'"]');

  let btnFormClose = form.querySelector('.callback-form__close');
  // скрытие формы
  let hideForm = function() {
    let showing = '',
        hiding = '';

    if (form.classList.contains('fadeInDown')) {
      showing = 'fadeInDown';
      hiding = 'fadeOutUp';
    }
    else if (form.classList.contains('fadeInRight')) {
      showing = 'fadeInRight';
      hiding = 'fadeOutRight';
    }
    else {
      showing = false;
      hiding = false;
    }

    if (showing && showing.length > 0) {
      form.classList.remove(showing);
      form.classList.add(hiding);

      setTimeout(function() {
        form.classList.remove(hiding,'animated');
        form.classList.add('-hidden');
        callbackBtn.removeAttribute('disabled');
      }, 1000);
    }


  };

  callbackBtn.addEventListener("click", function(e){
    let btn = this;
    let callbackAttr = this.getAttribute('data-callback');

    if (!btn.hasAttribute('disabled'))
      btn.setAttribute('disabled', '');

    form.classList.remove('callback-center-form');
    form.classList.remove('callback-right-form');
    form.classList.add('callback-' + callbackAttr + '-form');

    form.classList.remove('fadeInDown');
    form.classList.remove('fadeInRight');

    if (callbackAttr == 'center')
      form.classList.add('fadeInDown');
    else if (callbackAttr == 'right')
      form.classList.add('fadeInRight');

    if (form.classList.contains('-hidden')) {
      form.classList.remove('-hidden');
      form.classList.add('animated');
      btn.classList.add('-stop');
    }
  });

  btnFormClose.addEventListener("click", function(e){
    callbackBtn.classList.remove('-stop');
    hideForm();
  });
  window.addEventListener('keydown', function(e) {
    if (event.keyCode == 27) {
      callbackBtn.classList.remove('-stop');
      hideForm();
    };
  });

  $('.callback-form__submit').click((e) => {
    e.preventDefault();
    let callback = $('#js-callback-phone').val();
    let callback_data = {
        phone_number: callback,
    }
    $.ajax({
        url: 'mail',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(callback_data),
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        success: (data) => {
            callbackBtn.classList.remove('-stop');
            hideForm();
        },
        error: (error) => {

        }
    });
  });

};

let callbackBtn = document.getElementById('callbackBtn');
let form = document.querySelector('[data-id="form-callback"]');

callBackWidjet(callbackBtn);

//End callback


