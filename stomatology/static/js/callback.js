$(function(){
$('.imgvk').hover(function(){
     $(this).children('img').stop().animate({width:"240px",height:"400px"}, 500);
    }, function(){      $(this).children('img').stop().animate({width:"120px",height:"240px"}, 500); });
  });

/* обратный звонок */
/*!Помогаем юзать IE8+ @source https://purl.eligrey.com/github/classList.js/blob/master/classList.js */

var callBackWidjet = function(callbackBtn, form) {
  if (!form)
    form = document.querySelector('[data-id="'+callbackBtn.getAttribute("data-depend-form")+'"]');

  var btnFormClose = form.querySelector('.callback-form__close');
  // скрытие формы
  var hideForm = function() {
    var showing = '',
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
    var btn = this;
    var callbackAttr = this.getAttribute('data-callback');

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
};

var callbackBtn = document.getElementById('callbackBtn');
var form = document.querySelector('[data-id="form-callback"]');

callBackWidjet(callbackBtn);