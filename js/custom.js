$(document).ready(function() {

	// fitText
	$(".fittext").fitText();

    // Animate Header
    var _header = $('header');
    $(function(){
        $(window).scroll(function() {
            var scroll = getCurrentScroll();
            if (scroll >= _header.height()) {
                _header.addClass('shrink');
            }
            else {
                _header.removeClass('shrink');
            }
        });
        function getCurrentScroll() {
            return window.pageYOffset || document.documentElement.scrollTop;
        }
    });

    var _height = $(window).height();
    $('.hero').height(_height);

});