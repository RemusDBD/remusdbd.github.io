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
    $('#subtitle1').text('內容創作者 (知名於黎明死線DBD教學)');
    $('#subtitle2').text('獨立安全研究員/ 道德黑客 / CTF奪旗玩家');
    $('#subtitle3').text('投機者');
    $('#about-me-link').text(' 關於我');
    $('#writeup-link').text(' CTF解題報告');
    
    // Hide English content and show Chinese content
    $('.en').each(function () {
      $(this).css('display', 'none');
      $(this).prev($(this).prop('tagName')).fadeIn();
      langEng = false; // Assuming this is used for some logic later
    });
  } else if (lang === 'us') {
    console.log('Switching to English'); // Log specific action
    $('#title').text('Remus');
    $('#subtitle1').text('Content Creator');
    $('#subtitle2').text('Independent Security Researcher / Ethical Hacker / CTF Player');
    $('#subtitle3').text('Speculator');
    $('#aboutme-link').text(' About Me');
    $('#writeup-link').text(' Writeup');
    
    // Hide Chinese content and show English content
    $('.en').each(function () {
      $(this).prev($(this).prop('tagName')).css('display', 'none');
      $(this).fadeIn();
      langEng = true; // Assuming this is used for some logic later
    });
  }
}
