// pullDownMenu
  $('.pullDownSelector>.item').on('click', function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $(this).siblings().removeClass('hidden');
    } else {
      $(this).addClass('active');
      $(this).siblings().addClass('hidden');
    }
  });

function changeLang(lang) {
  if (lang == 'cn') {
    $('.en').each(function () {
      $(this).css('display', 'none');
      $(this).prev($(this).prop('tagName')).fadeIn();
      langEng = false;
    });
  } else if (lang == 'us') {
    $('.en').each(function () {
      $(this).prev($(this).prop('tagName')).css('display', 'none');
      $(this).fadeIn();
      langEng = true;
    });
  }
}
