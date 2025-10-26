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
    $('#title').text('Remus 雷姆');
    $('#subtitle1').text('你關心人類嗎?');
    $('#subtitle2').text('你要改革金融?');
    $('#subtitle3').text('加入我');
    $('#subtitle4').text('「尋根，讓財富像流水一樣」');
    //$('#aboutme-link').text('關於我');
    //$('#writeup-link').text('CTF解題報告');
    //$('#tools-link').text('工具');
    //$('#invest-link').text('投資專欄');
    //$('#services-link').text('服務');
    //$('#joinus-link').text('加入我們');
    $('#contactus-link').text('聯絡我們');
    
    // Hide English content and show Chinese content
    $('.en').each(function () {
      $(this).css('display', 'none');
      $(this).prev($(this).prop('tagName')).fadeIn();
      langEng = false; // Assuming this is used for some logic later
    });
  } else if (lang === 'us') {
    console.log('Switching to English'); // Log specific action
    $('#title').text('Remus');
    $('#subtitle1').text('You do care about people?');
    $('#subtitle2').text('You do want to revolutionise finance?');
    $('#subtitle3').text('Join me');
    $('#subtitle4').text('"Turning source into wealth — so it flows"');
    //$('#aboutme-link').text(' About Me');
    //$('#writeup-link').text(' Writeup');
    //$('#tools-link').text('Tools');
    //$('#invest-link').text(' Invest');
    //$('#services-link').text(' Services');
    //$('#joinus-link').text(' Join Us');
    $('#contactus-link').text(' Contact Us');
    
    // Hide Chinese content and show English content
    $('.en').each(function () {
      $(this).prev($(this).prop('tagName')).css('display', 'none');
      $(this).fadeIn();
      langEng = true; // Assuming this is used for some logic later
    });
  }
}
