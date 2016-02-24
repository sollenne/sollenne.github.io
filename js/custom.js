$(document).ready(function() {
    $("#my-menu").mmenu({
        "navbars": [
            {
                "position": "bottom",
                "content": [
                    "<a class='fa fa-envelope' href='#/'></a>",
                    "<a class='fa fa-twitter' href='#/'></a>",
                    "<a class='fa fa-facebook' href='#/'></a>"
                ]
            }
        ]
    });


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

    $(".post-title").slabText({
        // Don't slabtext the headers if the viewport is under 380px
        "viewportBreakpoint":380
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


    var editable = true; // set a flag
    setInterval(function() {
        var disqusHeight = $('#dsq-app2').height();
        if ( disqusHeight > 0 ) {
            if (editable) {
                editable = false;
                s.refresh();
            }
        }
    }, 100);

    SimpleJekyllSearch({
        searchInput: document.getElementById('search-input'),
        resultsContainer: document.getElementById('results-container'),
        json: '/search.json',
    })

    $('#my-menu').css({'display':''});

});

var fc = document.getElementById("fc");
var wrapper = fc.getElementsByClassName("fc__wrapper")[0];
var light = fc.getElementsByClassName("fc__light")[0];

var fcHalfHeight = 205;
var fcHalfWidth = 135;

var defaultLightWidth = 40;
var defaultLightAngle = 45;

var maxRotateX = 6;
var maxRotateY = 6;
var maxLightWidth = 25;
var maxLightAngle = 20;

var lightValue = {
    width: defaultLightWidth,
    angle: defaultLightAngle
};

wrapper.addEventListener("mousemove", function(event) {
    // Get mouse position
    var fcRect = fc.getBoundingClientRect();
    var fcOffset = {
        top: fcRect.top + document.body.scrollTop,
        left: fcRect.left + document.body.scrollLeft
    };
    var mouseX = (event.pageX - fcOffset.left) | 0;
    var mouseY = (event.pageY - fcOffset.top) | 0;

    // Move the floating card
    var diffX = -1 * (fcHalfWidth - mouseX);
    var diffY = fcHalfHeight - mouseY;
    var rotateX = diffY / fcHalfHeight * maxRotateX;
    var rotateY = diffX / fcHalfWidth * maxRotateY;

    dynamics.stop(wrapper);
    wrapper.style.transform = "rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";

    // Move the light
    lightValue.width = defaultLightWidth - (diffY / fcHalfHeight * maxLightWidth);
    lightValue.angle = defaultLightAngle + (diffX / fcHalfWidth * maxLightAngle);

    dynamics.stop(lightValue);
    light.style.backgroundImage = "linear-gradient(" + lightValue.angle + "deg, black, transparent " + lightValue.width + "%)";
});

wrapper.addEventListener("mouseleave", function() {
    // Move the floating card to its initial position
    dynamics.animate(wrapper, {
        rotateX: 0,
        rotateY: 0
    }, {
        type: dynamics.spring,
        duration: 1500
    });

    // Move the light to its initial position
    dynamics.animate(lightValue, {
        width: defaultLightWidth,
        angle: defaultLightAngle
    }, {
        type: dynamics.spring,
        duration: 1500,
        change: function(obj) {
            light.style.backgroundImage = "linear-gradient(" + obj.angle + "deg, black, transparent " + obj.width + "%)";
        }
    });
});