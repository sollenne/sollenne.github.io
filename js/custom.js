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

    // Make Intro Height of viewport
    var _height = $(window).height();
    $('.hero').height(_height);


    // Custom Scroll to div on Home Page
    $(function() {
        $("a[href*='#']:not([href='#'])").click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 750);
                    return false;
                }
            }
        });
    });

    // Parallax on Home Page
    skrollr.init({
        forceHeight: false
    });

});