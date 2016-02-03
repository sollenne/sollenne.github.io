// fitText
$(".fittext").fitText(1.2, { minFontSize: '20px', maxFontSize: '65px' });


$(document).ready(function() {

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
        var _navClicked = $("a[href*='#']:not([href='#'])");
        _navClicked.click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $(this).addClass('almost-active');
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 750, function() {
                        _navClicked.removeClass('almost-active');
                    });
                    return false;
                }
            }
        });
    });

    // Active Nav on Scroll
    var _sections = $('section')
        , _header_height = _header.outerHeight();
    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();
        _sections.each(function() {
            var top = $(this).offset().top - _header_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                _header.find('a').removeClass('active');
                _sections.removeClass('active');

                $(this).addClass('active');
                _header.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
            }
        });
    });



    // Parallax on Home Page
    skrollr.init({
        forceHeight: false
    });

});