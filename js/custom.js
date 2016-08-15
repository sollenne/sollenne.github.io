$(document).ready(function() {
    new Clipboard('.clip');

    $('.fc__thumb').duotone();
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
        $('#searchModal').appendTo("body");
    });

    $('#searchModal').on('shown.bs.modal', function () {
        $('#searchModal').find('input').focus();
    });

    var equalheight;
    equalheight = function(container){

        var currentTallest = 0,
            currentRowStart = 0,
            rowDivs = new Array(),
            $el,
            topPosition = 0;
        $(container).each(function() {

            $el = $(this);
            $($el).height('auto')
            topPostion = $el.position().top;

            if (currentRowStart != topPostion) {
                for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }
                rowDivs.length = 0; // empty the array
                currentRowStart = topPostion;
                currentTallest = $el.height();
                rowDivs.push($el);
            } else {
                rowDivs.push($el);
                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
            }
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
        });
    }

    $(window).load(function() {
        equalheight('.search-result');
    });

    $(window).resize(function(){
        equalheight('.search-result');
    });

    $(document).keyup(function() {
        equalheight('.search-result');
    });

    $('#search-input').on('keyup', function() {
        if ($(this).val() == '') {
            $('.search-result').each(function() {
               $(this).remove();
            });
            $('.clear-search a').addClass('disabled');
        } else {
            $('.clear-search a').removeClass('disabled');
        }
    });

    $('.clear-search a').click(function() {
        $('#search-input').val('').focus();
        $('.search-result').each(function() {
            $(this).remove();
        });
        $('.no-results').remove();
        $(this).addClass('disabled');
    });

    $('button.close').click(function() {
        $('#search-input').val('');
        $('.search-result').each(function() {
            $(this).remove();
        });
        $('.no-results').remove();
        $('.clear-search a').addClass('disabled');
    });

    $('.okshadow').okshadow({
        color: 'rgba(108, 77, 14, 0.8)',
        textShadow: true,
        xMax: 5,
        yMax: 5,
        yOffset: 3,
        fuzzMin: 4,
        fuzzFactor: 60,
        fuzzMax: 9,
    });

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