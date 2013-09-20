
jQuery(function() {
  window.$ = jQuery;

  $.each($('.field-name-field-screen-shots'), useFancyboxForScreenshots);
});


/* Drupal dumps giant images into the page, we turn them into nice screenshots */
function useFancyboxForScreenshots(i,screenshotContainer) {
  screenshotContainer = $(screenshotContainer);
  screenshotContainer.hide();

  var drupal_screenshots = $.map( screenshotContainer.find('img'), function(x,i) { return $(x).attr('src'); });
  if (drupal_screenshots.length==0) { return; }

  // Create fancyBox container
  $('<div class="fancybox"/>').insertBefore(screenshotContainer);
  var f = $('.fancybox');

  // Generate screenshot thumbnails
  $.each(drupal_screenshots, function(i,x) { 
    var html = ('\
      <a class="screenshot thumbnail" rel="group" href="'+x+'">\
        <img src="'+x+'" alt="" />\
      </a>\
    '); 
    $(html).appendTo(f); 
  })
  // Clearfix floating screenshots
  $('<div class="clearfix"/>').appendTo(f);

  // Apply jQuery library
  $('.fancybox .screenshot').fancybox()
};


