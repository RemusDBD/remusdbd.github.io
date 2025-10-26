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
  
  // Dynamic content update based on language selection
  if (lang === 'cn') {
    console.log('Switching to Chinese'); // Log specific action
    $('#title').text('「尋根，讓財富像流水一樣」');
    $('#subtitle1').text('你關心人類嗎?');
    $('#subtitle2').text('你要改革金融?');
    $('#contactus-link').text('聯絡我');
    
    // Hide English content and show Chinese content
    $('.en').each(function () {
      $(this).css('display', 'none');
      $(this).prev($(this).prop('tagName')).fadeIn();
      langEng = false; // Assuming this is used for some logic later
    });
  } else if (lang === 'us') {
    console.log('Switching to English'); // Log specific action
    $('#title').text('"Turning source into wealth — so it flows"');
    $('#subtitle1').text('You do care about people?');
    $('#subtitle2').text('You do want to revolutionise finance?');
    $('#contactus-link').text(' Contact Us');
    
    // Hide Chinese content and show English content
    $('.en').each(function () {
      $(this).prev($(this).prop('tagName')).css('display', 'none');
      $(this).fadeIn();
      langEng = true; // Assuming this is used for some logic later
    });
  }
}
