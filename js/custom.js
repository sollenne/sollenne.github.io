$(document).ready(function() {

	// fitText
	$(".fittext").fitText();

    // animate header
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

});