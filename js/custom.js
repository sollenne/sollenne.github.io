$(document).ready(function() {

    // Make Intro Height of viewport
    var _height = $(window).height();
    $('.hero').height(_height);

     //Active Nav on Scroll
    var _sections = $('section')
        , _header = $('header')
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
    var s = skrollr.init({
        forceHeight: false
    });
    skrollr.menu.init(s, {
        animate: true,
        easing: 'swing',
        scale: 2,
        duration: function(currentTop, targetTop) {
            return Math.abs(currentTop - targetTop) / 1.5;
        },
        //handleLink: function(link) {
        //    return 400;//Hardcoding 400 doesn't make much sense.
        //},
        complexLinks: false,
        change: function(newHash, newTopPosition) {
            //Do stuff
        },
        //Add hash link (e.g. `#foo`) to URL or not.
        updateUrl: false //defaults to `true`.
    });

    var _footer = $('footer');
    $('#skrollr-body').css({'margin-bottom': - _footer.outerHeight()});
    $('<style>#skrollr-body:after{height:' + _footer.outerHeight() +'px}</style>').appendTo('head');

    $(".post-title").slabText({
        // Don't slabtext the headers if the viewport is under 380px
        "viewportBreakpoint":380
    });
});