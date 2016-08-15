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

(function () {
    var $animate, $container, $message, $paragraph, MESSAGES, animate, initialise, scramble;
    MESSAGES = [];
    MESSAGES.push({
        delay: 0,
        text: '/sollenne$:'
    });
    MESSAGES.push({
        delay: 2200,
        text: '/sollenne$: What is it you are looking for?'
    });
    MESSAGES.push({
        delay: 3200,
        text: '/sollenne$: <a href="#blog">blog</a> | <a href="#services">services</a> | <a href="#portfolio">portfolio</a> | <a href="#contact">contact</a>'
    });
    MESSAGES.push({
        delay: 7200,
        text: '/sollenne$: ...'
    });
    MESSAGES.push({
        delay: 9200,
        text: '/sollenne$: <a target="_blank" href="https://www.linkedin.com/in/sollenne"><i class="ion-social-linkedin-outline"></i></a> | <a target="_blank" href="https://github.com/sollenne"><i class="ion-social-github"></i></a> | <a target="_blank" href="http://codepen.io/sollenne/"><i class="ion-social-codepen"></i></a>'
    });
    $container = $('#container');
    $message = $('#message');
    $animate = $('#animate');
    $paragraph = null;
    scramble = function (element, text, options) {
        var $element, addGlitch, character, defaults, ghostCharacter, ghostCharacters, ghostLength, ghostText, ghosts, glitchCharacter, glitchCharacters, glitchIndex, glitchLength, glitchProbability, glitchText, glitches, i, j, k, letter, object, order, output, parameters, ref, results, settings, shuffle, target, textCharacters, textLength, wrap;
        defaults = {
            probability: 0.2,
            glitches: '-|/\\',
            blank: '',
            duration: text.length * 40,
            ease: 'easeInOutQuad',
            delay: 0
        };
        $element = $(element);
        settings = $.extend(defaults, options);
        shuffle = function () {
            if (Math.random() < 0.5) {
                return 1;
            } else {
                return -1;
            }
        };
        wrap = function (text, classes) {
            return '<span class="' + classes + '">' + text + '</span>';
        };
        glitchText = settings.glitches;
        glitchCharacters = glitchText.split('');
        glitchLength = glitchCharacters.length;
        glitchProbability = settings.probability;
        glitches = function () {
            var j, len, results;
            results = [];
            for (j = 0, len = glitchCharacters.length; j < len; j++) {

                letter = glitchCharacters[j];
                results.push(wrap(letter, 'glitch'));
            }

            return results;
        }();
        ghostText = $element.text();
        ghostCharacters = ghostText.split('');
        ghostLength = ghostCharacters.length;
        ghosts = function () {
            var j, len, results;
            results = [];
            for (j = 0, len = ghostCharacters.length; j < len; j++) {

                letter = ghostCharacters[j];
                results.push(wrap(letter, 'ghost'));
            }

            return results;
        }();
        textCharacters = text.split('');
        textLength = textCharacters.length;
        order = function () {
            results = [];
            for (var j = 0; 0 <= textLength ? j < textLength : j > textLength; 0 <= textLength ? j++ : j--) {

                results.push(j);
            }

            return results;
        }.apply(this).sort(this.shuffle);
        output = [];
        for (i = k = 0, ref = textLength; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {

            glitchIndex = Math.floor(Math.random() * (glitchLength - 1));
            glitchCharacter = glitches[glitchIndex];
            ghostCharacter = ghosts[i] || settings.blank;
            addGlitch = Math.random() < glitchProbability;
            character = addGlitch ? glitchCharacter : ghostCharacter;
            output.push(character);
        }

        object = { value: 0 };
        target = { value: 1 };
        parameters = {
            duration: settings.duration,
            ease: settings.ease,
            step: function () {
                var index, l, progress, ref1;
                progress = Math.floor(object.value * (textLength - 1));
                for (i = l = 0, ref1 = progress; 0 <= ref1 ? l <= ref1 : l >= ref1; i = 0 <= ref1 ? ++l : --l) {

                    index = order[i];
                    output[index] = textCharacters[index];
                }

                return $element.html(output.join(''));
            },
            complete: function () {
                return $element.html(text);
            }
        };
        return $(object).delay(settings.delay).animate(target, parameters);
    };
    animate = function () {
        var data, element, index, j, len, options;
        for (index = j = 0, len = MESSAGES.length; j < len; index = ++j) {

            data = MESSAGES[index];
            element = $paragraph.get(index);
            element.innerText = '';
            options = { delay: data.delay };
            scramble(element, data.text, options);
        }

    };
    initialise = function () {
        var index, j, len, text;
        $animate.click(animate);
        for (index = j = 0, len = MESSAGES.length; j < len; index = ++j) {

            text = MESSAGES[index];
            $message.append('<p>');
        }

        $paragraph = $container.find('p');
        animate();
    };
    initialise();
}.call(this));