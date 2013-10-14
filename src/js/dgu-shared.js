$(function() {
  initNav();
});

function initNav() {
  var triggers = $('.trigger-subnav');
  var chevron = $('.chevron');
  triggers.click(function(e) {
    e.preventDefault();
    var target = $(e.delegateTarget);
    var subnav, chevronClass;
    if (target.hasClass('nav-home')) {
      subnav = $();
      chevronClass = 'position1';
    }
    else if (target.hasClass('nav-data')) {
      subnav = $('.subnav-data');
      chevronClass = 'position2';
    }
    else if (target.hasClass('nav-apps')) {
      subnav = $('.subnav-apps');
      chevronClass = 'position3';
    }
    else if (target.hasClass('nav-interact')) {
      subnav = $('.subnav-interact');
      //subnav = $();
      chevronClass = 'position4';
    }
    else {
      throw 'Unrecognised subnav trigger',target;
    }
    // Update subnav
    $('.subnav').removeClass('active');
    subnav.addClass('active');
    // Update chevron
    chevron.attr('class','chevron '+chevronClass);
    return false;
  });
}
