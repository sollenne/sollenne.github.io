$(document).ready(function() {

    $('img').duotone();
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
        _sections.each(function () {
            var top = $(this).offset().top - _header_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                _header.find('a').removeClass('active');
                _sections.removeClass('active');

                $(this).addClass('active');
                _header.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    }, function () {

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
    });

    $('#my-menu').css({'display':''});

    $(document).on('click', '.search-modal-btn', function() {
        $('#myModal').appendTo("body");
    });

    $('#myModal').on('shown.bs.modal', function () {
        $('#myModal').find('input').focus();
    })

});


//var i, fc, _fc, wrapper, light, fcHalfHeight, fcHalfWidth, defaultLightWidth, defaultLightAngle, maxRotateX, maxRotateY, maxLightWidth, maxLightAngle, lightValue, fcRect, fcOffset;
fc = document.getElementsByClassName("fc");
for  (i = 0; i < fc.length; i++) {
    (function (i) {
        var vars = {
            _fc : document.getElementsByClassName("fc")[i],
            wrapper : fc[i].getElementsByClassName("fc__wrapper")[0],
            light : fc[i].getElementsByClassName("fc__light")[0],
            fcHalfHeight : 205,
            fcHalfWidth : 135,
            defaultLightWidth : 40,
            defaultLightAngle : 45,
            maxRotateX : 6,
            maxRotateY : 6,
            maxLightWidth : 25,
            maxLightAngle : 20,
            lightValue : {
                width: 40,
                angle: 45
            }
        };

        vars.wrapper.addEventListener("mousemove", function(event) {

            var fcRect = vars._fc.getBoundingClientRect();
            var top = fcRect.top + document.body.scrollTop;

            var mouseX = (event.pageX - fcRect.left) | 0;
            var mouseY = (event.pageY - top) | 0;

            // Move the floating card
            var diffX = -1 * (vars.fcHalfWidth - mouseX);
            var diffY = vars.fcHalfHeight - mouseY;
            var rotateX = diffY / vars.fcHalfHeight * vars.maxRotateX;
            var rotateY = diffX / vars.fcHalfWidth * vars.maxRotateY;

            dynamics.stop(vars.wrapper);
            vars.wrapper.style.transform = "rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";

            // Move the light
            vars.lightValue.width = vars.defaultLightWidth - (diffY / vars.fcHalfHeight * vars.maxLightWidth);
            vars.lightValue.angle = vars.defaultLightAngle + (diffX / vars.fcHalfWidth * vars.maxLightAngle);

            dynamics.stop(vars.lightValue);
            vars.light.style.backgroundImage = "linear-gradient(" + vars.lightValue.angle + "deg, black, transparent " + vars.lightValue.width + "%)";
        });

        vars.wrapper.addEventListener("mouseleave", function () {
            // Move the floating card to its initial position
            dynamics.animate(vars.wrapper, {
                rotateX: 0,
                rotateY: 0
            }, {
                type: dynamics.spring,
                duration: 1500
            });

            // Move the light to its initial position
            dynamics.animate(vars.lightValue, {
                width: vars.defaultLightWidth,
                angle: vars.defaultLightAngle
            }, {
                type: dynamics.spring,
                duration: 1500,
                change: function (obj) {
                    vars.light.style.backgroundImage = "linear-gradient(" + obj.angle + "deg, black, transparent " + obj.width + "%)";
                }
            });
        });
    })(i);
}