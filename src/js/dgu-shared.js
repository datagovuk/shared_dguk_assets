$(function() {
  initNav();
});

function initNav() {
  var triggers = $('.trigger-subnav');
  var chevron = $('.chevron');
  var greenbar = $('#greenbar');
  window.navOpen = false;
  $('body').addClass('navClosed');
  triggers.click(function(e) {
    var target = $(e.delegateTarget);
    var subnav, chevronClass, propagateEvent;
    if (target.hasClass('nav-home')) {
      subnav = $();
      chevronClass = 'position1';
      propagateEvent = true;
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
    var greenbar = $('#greenbar');
    //--  The navOpen behaviour is only visible on mobile.
    if (chevron.hasClass(chevronClass)) {
      window.navOpen = !window.navOpen;
    } 
    else {
      window.navOpen = true
    }
    // --
    var old_height = greenbar.height();
    $('body').toggleClass('navOpen',window.navOpen);
    $('body').toggleClass('navClosed',!window.navOpen);
    // Update subnav
    $('.subnav').removeClass('active');
    subnav.addClass('active');
    var new_height = greenbar.outerHeight();
    greenbar.height(old_height);
    greenbar.stop().animate({height:new_height},300,'swing',function() { greenbar.css('height','auto'); });
    // Update chevron
    chevron.attr('class','chevron '+chevronClass);

    // Finally, work out if event should be propagated
    // back to the browser
    if (!propagateEvent) {
      e.preventDefault();
      // This isn't necessary but is someone else's code
      return false;
    }
  });
}
/*
 * New plugin: Equal height boxes.
 * When the parent container is resized (eg. browser resizes,
 * hitting a breakpoint) each "foo" is set to equal height.
 * eg.
 * <div class="dgu-equal-height" data-selector="foo">
 *   <div class="foo"> ... </div>
 *   <div class="foo"> ... </div>
 * </div>
 */
$(function() {
  var w = $(window);
  $('.dgu-equal-height').each(function(i,target) {
    target = $(target);
    var selector = target.attr('data-selector');
    var children = target.find(selector);
    var cachedWidth = -1;
    function resizeChildren() {
      var newWidth = target.width();
      if (newWidth==cachedWidth) { return; }
      cachedWidth = newWidth;
      children.height('auto');
      // Affect only browser windows
      if (w.width()>=992) {
	var maxHeight = 0;
        children.each(function(i,x){ maxHeight=Math.max(maxHeight,$(x).height())});
        children.height(maxHeight);
      }
    }
    if (children.length>1) {
      w.resize( resizeChildren );
      resizeChildren();
    }
  });
});

/* 
 * New plugin: Hashtab
 */
$(function() {
  var hashtabs = $('a[data-hash]');
  if (hashtabs.length==0) { return; }
  var wHash = (window.location.hash || '#').substring(1);
  var initially_open = hashtabs.filter('[data-hash="'+wHash+'"]');
  if (initially_open.length == 1) {
    $(initially_open).tab('show');
  }
  hashtabs.on('shown.bs.tab',function(e) {
    var target = $(e.delegateTarget);
    window.location.hash = target.attr('data-hash');
  });
});
