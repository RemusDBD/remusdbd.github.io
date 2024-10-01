// pullDownMenu
  $('.pullDownSelector>.item').on('click', function () {
    console.log('Language item clicked'); // Log click event
    if ($(this).hasClass('active')) {
      console.log('Item is active, removing active class');
      $(this).removeClass('active');
      $(this).siblings().removeClass('hidden');
    } else {
      console.log('Item is not active, adding active class');
      $(this).addClass('active');
      $(this).siblings().addClass('hidden');
    }
  });

function changeLang(lang) {
  console.log('changeLang function called with lang:', lang);
  if (lang == 'cn') {
    console.log('Switching to Chinese'); // Log specific action
    $('.en').each(function () {
      $(this).css('display', 'none');
      $(this).prev($(this).prop('tagName')).fadeIn();
      langEng = false;
    });
  } else if (lang == 'us') {
    console.log('Switching to English'); // Log specific action
    $('.en').each(function () {
      $(this).prev($(this).prop('tagName')).css('display', 'none');
      $(this).fadeIn();
      langEng = true;
    });
  }
}
