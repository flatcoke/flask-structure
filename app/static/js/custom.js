'use strict';
(function ($, window, document) {
    var pluginName = "Aisconverse",
        defaults = {
            sliderFx: 'crossfade',		// Slider effect. Can be 'scroll',
            // 'fade', 'crossfade', 'directscroll',
            // 'uncover', 'uncover-fade'
            sliderInterval: 6000,		// Interval
            sliderAuto: false,        // Default auto sliding
            speedAnimation: 500,        // Default speed of the animation
            defFx: 'easeInSine',        // Default animate Fx
            scrollTopButtonOffset: 500, // when scrollTop Button will show
            successText: 'You have successfully subscribed', // text after successful subscribing
            errorText: 'Please, enter a valid email', // text, if email is invalid
            collapseMenuWidth: 991, // Browser width, when menu
            // will collapse
            flickrId: '36587311@N08', // Flickr Account ID
            instagrammId: 4717649, // Instagram Account ID
            markersColor: ['#DA3636', '#323232', '#7F7F7F'] // map markers color
        },
        $win = $(window),
        $htmlBody = $('html, body'),
        onMobile = false;

    // The plugin constructor
    function Plugin(element, options) {
        var that = this;
        that.element = $(element);
        that.options = $.extend({}, defaults, options);

        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            onMobile = true;
            $(document.body).addClass('is-mobile');
        } else {
            $(document.body).addClass('no-mobile');
        }

        that.init();
        $win.appear();

        $win.load(function () {
            that.preloader.delay(defaults.speedAnimation)
                .fadeOut(defaults.speedAnimation);

            that.activate();
            that.dropMenu();
            that.moveMenu();
            that.megaMenu();
            that.truncAny();
            that.fMiddle();
            that.scrll();
            that.countUp();
            that.instagramm();
            that.flickr();
            that.priceSlider();
            that.ratings();
            that.subscribeForm();
            that.contactForm();
            that.vCharts();
            that.pieCharts();
            that.faqNav();
            that.magnificPopup();
            that.masonryMix();
            that.contactMap();
            that.sliders('.slider .slider');
            that.sliders();
            that.sliderRevolution();

            setTimeout(function () {
                that.rez();
                that.isotopeMix();
            }, 350);

            $('.nav-nobg').on('show.bs.collapse', function(){
               $('header.header').removeClass('header-nobg');
            });

            $('.nav-nobg').on('hidden.bs.collapse', function(){
                $('header.header').addClass('header-nobg');
            });


            $('.slider-scroll').on('click', function() {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    }
                }
            });




            if($('#tweet-feed').size() > 0) {
                var tweetConfig = {
                    "id": '686883871074422784',
                    "domId": 'tweet-feed',
                    "maxTweets": 1,
                    "showUser": false,
                    "showImages": false,
                    "showRetweet": false,
                    "showInteraction": false,
                    "showTime": false,
                    "enableLinks": true
                };
                twitterFetcher.fetch(tweetConfig);
            }




        }).scroll(function () {
            that.scrll();
            that.countUp();
            that.parallaxBG();
        }).resize(function(){
            that.rez();
            that.fMiddle();
            that.megaMenu();

            if($win.width() > 995 && $('.nav-nobg').is(':visible')) {
                $('header.header').addClass('header-nobg');
            }

        });
    }

    Plugin.prototype = {
        init: function () {
            this.body = $(document.body);
            this.preloader = $('.preloader');
            this.wrapper = $('.wrapper');
            this.header = $('.header');
            this.headerSidebar = $('.header-sidebar');
            this.footer = $('.footer');
            this.slider = $('.slider');
            this.banner = $('.banner');
            this.fullscreen = $('.fullscreen');
            this.vmiddle = $('.middle');
            this.gallery = $('.gallery');
            this.internalLinks = $('.internal');
            this.expandLink = $('.expand-link');
            this.collapseLink = $('.collapse-link');
            this.audio = $('audio');
            this.chart = $('.chart');
            this.select = $('select');
            this.timer = $('.countdown');
            this.counting = $('.counting');
            this.map = $('.google-map');
            this.mapAbsolute = $('[class*=google-map-absolute]');
            this.modal = $('.modal');
            this.countup = $('.countup');
            this.quantity = $('.product-quantity');
            this.parallax = $('[data-type="parallax"]');
            this.dataToggle = $('[data-toggle]');

            this.mixWrap = $('.mix-wrap');

            this.magnific = $('.magnific');
            this.magnificWrap = $('.magnific-wrap');
            this.magnificGallery = $('.magnific-gallery');
            this.magnificVideo = $('.magnific-video');

            this.masonryWrap = $('.masonry-wrap');
            this.isotopeWrap = $('.isotope-wrap');

            this.cornerLink = $('.corner-link');

            this.card = $('.card');

            this.imgWrap = $('.img-wrap');

            this.animateBlock = $('[data-animate]');
            this.hoverBlock = $('[data-hover]');

            this.clients = $('.clients');

            this.rating = $('.raty');

            this.instafeed = $('#instafeed');
            this.flickrfeed = $('#flickrfeed');

            this.verticalChart = $('.vertical-chart');
            this.pieChart = $('.pie-chart');

            this.widgetSubscrire = $('.widget_subscrire');
            this.subscribe = this.widgetSubscrire.find('form');

            this.loadmore = $('.load-more');

            this.dropdownToggle = $('.dropdown-toggle');
            this.dropdown = $('.dropdown');
            this.navbar = $('.navbar');
            this.navbarCollapse = $('.navbar-collapse');
            this.navbarToggle = $('.navbar-toggle');
            this.navbarToggleModal = $('.navbar-toggle-modal');

            this.dataPopover = $('[data-toggle="popover"]');
            this.widgetbarToggle = $('.widgetbar-toggle');
        },
        activate: function () {
            var instance = this,
                spd = instance.options.speedAnimation;

            instance.internalLinks.on('click', function(e){
                e.preventDefault();
                var $this = $(this),
                    url = $this.attr('href').replace('#', ''),
                    $url = $('#' + url),
                    urlTop;

                if ($url.length){
                    urlTop = $url.offset().top;
                } else {
                    urlTop = $('[name="'+ url +'"]').offset().top;
                }

                $htmlBody.stop(true, true).animate({ scrollTop: urlTop }, spd, instance.options.defFx);
            });

            // Custom Select
            if (instance.select.length > 0){
                instance.select.chosen({
                    width: '100%'
                });
            }

            if (instance.audio.length > 0){
                instance.audio.mediaelementplayer();
            }

            if (instance.dataPopover.length > 0) {
                instance.dataPopover.popover({
                    trigger: 'hover focus'
                });

                instance.dataPopover.on('show.bs.popover', function () {
                    var self = $(this),
                        popoverColor = self.data('color');

                    if (popoverColor) {
                        setTimeout(function () {
                            self.parent().find('.popover').addClass('popover-color popover-' + popoverColor);
                        }, 0);
                    }
                })
            }

            instance.cornerLink.on('click', function (e) {
                e.preventDefault();

                var self = $(this),
                    p = self.parent(),
                    container = p.find('.container');

                self.toggleClass('vis');
                container.stop(true, true).slideToggle(spd);
            });

            // Product Incrementers
            instance.quantity.find('a').on('click', function(e) {
                e.preventDefault();

                var el = $(this),
                    inpt = el.parent().find('input'),
                    oldValue = inpt.val(),
                    newVal;

                if (el.hasClass('plus')) {
                    newVal = parseFloat(oldValue) + 1;
                } else if (el.hasClass('minus')) {
                    newVal = (oldValue > 1) ? parseFloat(oldValue) - 1 : 1;
                }

                inpt.val(newVal);
            });

            $('.single-product-page-cart-form select').on('change', function () {
                $('.collapse-group').slideDown(spd);
            });

            $('.collapse-group .reset').on('click', function (e) {
                e.preventDefault();

                $(this).parents('.collapse-group').slideUp(spd);
                $('.single-product-page-cart-form select').val('').trigger("chosen:updated");
            });

            $('.cart .remove').on('click', function (e) {
                e.preventDefault();
                var $this = $(this);

                $this.parents('tr').fadeOut(spd, function () {
                    $(this).remove();
                });
            });

            if (instance.header.hasClass('header-vertical') && !instance.header.hasClass('header-vertical-hover')){
                instance.body.addClass('is-header-vertical');
            }

            if (instance.header.hasClass('header-left')){
                instance.body.addClass('is-header-left');
            } else if (instance.header.hasClass('header-right')){
                instance.body.addClass('is-header-right');
            }

            instance.animateBlock.on('appear', function () {
                var t = $(this),
                    fx = t.data('animate');

                t.parent().css('position', 'relative');
                t.addClass('animated ' + fx);
            }).appear();

            instance.animateBlock.on('click', function(e){
                var self = $(this),
                    ani = self.data('animate');

                if (self.hasClass('animate-toggle')){
                    e.preventDefault();
                    self.removeClass('animated').removeClass(ani);
                }

                setTimeout(function () {
                    self.addClass('animated').addClass(ani);
                }, spd / 2);
            });

            instance.hoverBlock.on(
                {
                    'mouseenter': function () {
                        var self = $(this),
                            ani = self.data('hover');

                        self.addClass('animated').addClass(ani);
                    },
                    'mouseleave': function () {
                        var self = $(this),
                            ani = self.data('hover');

                        setTimeout(function () {
                            self.removeClass('animated').removeClass(ani);
                        }, spd);
                    }
                }
            );

            instance.card.hover(function () {
                var self = $(this),
                    hoverBl = self.find('[data-hover]'),
                    ani = hoverBl.data('hover');

                if (!self.hasClass('front')) {
                    self.toggleClass('hover');
                }

                if (hoverBl.length > 0) {
                    hoverBl.toggleClass('animated').toggleClass(ani);
                }
            });

            // Hide sidebar menu when click in outside
            $(document).mouseup(function (e){
                if (!instance.headerSidebar.is(e.target)
                    && instance.headerSidebar.has(e.target).length === 0
                    && instance.headerSidebar.hasClass('in')) {
                    instance.headerSidebar.collapse('hide');
                }
            });

            instance.loadmore.on('click', function(e) {
                e.preventDefault();
                var self = $(this),
                    path = self.attr('href'),
                    addmsnry;

                instance.masonryWrap.append('<div class="next-posts">');

                $('.next-posts:last').load(path, function() {

                    var that = $(this);

                    setTimeout(function() {
                        addmsnry = new Masonry(instance.masonryWrap[0], {
                            itemSelector: '.msnr'
                        });
                    }, 100);

                    self.attr('href', 'msnr-2.html');

                    if (path === 'msnr-2.html'){
                        self.parent().hide();
                    }

                    that.animate({'opacity': 1}, spd);

                    if (that.find('audio').length > 0) {
                        that.find('audio').mediaelementplayer({
                            audioWidth: '100%'
                        });
                    }

                    if (that.find('.slider').length > 0) {
                        setTimeout(function () {
                            instance.sliders();
                        }, spd / 2);
                    }

                });
            });

        },
        isotopeMix: function () {
            var instance = this;

            instance.mixWrap.each(function () {
                var that = $(this);

                var $iso = that.find(instance.isotopeWrap).isotope({
                    itemSelector: '.mix',
                    layoutMode: 'masonry',
                    transitionDuration: '0.3s',
                    transformsEnabled: false,
                    getSortData: {
                        category: '[data-category]',
                        name: '[data-name]',
                        date: function(itemElem) {
                            var dateNum = $(itemElem).data('date');
                            return Date.parse(dateNum);
                        }
                    }
                });

                instance.dataToggle.on('click', function () {
                    setTimeout(function () {
                        $iso.isotope();
                    }, 315);
                });

                that.find(instance.select).on('change', function () {
                    var self = $(this),
                        sortValue = self.val();

                    $iso.isotope({ sortBy: sortValue });
                }).change();

                that.find('.mix-category li a').on('click', function (e) {
                    var self = $(this),
                        fltr = self.data('filter');

                    e.preventDefault();

                    self.parent().addClass('active')
                        .siblings().removeClass('active');

                    if (self.parents('.mix-wrap').find(instance.isotopeWrap).length > 0){
                        $iso.isotope({ filter: fltr });
                    }

                });
            });
        },
        masonryMix: function () {
            var instance = this;

            if (instance.masonryWrap.length > 0){
                instance.masonryWrap.each(function () {
                    var posts = $(this)[0],
                        msnry;

                    setTimeout(function () {
                        msnry = new Masonry(posts, {
                            itemSelector: '.msnr'
                        });
                    }, instance.options.speedAnimation/2);
                });
            }
        },
        magnificPopup: function () {
            var instance = this;

            instance.magnificWrap.each(function() {
                var $this = $(this);

                $this.find(instance.magnific).magnificPopup({
                    type: 'image',
                    tLoading: '',
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true
                    },
                    image: {
                        titleSrc: function (item) {
                            return item.el.attr('title');
                        }
                    }
                });
            });

            instance.magnificVideo.on('click', function(e) {
                e.preventDefault();

                var $this = $(this),
                    url = $this.attr('href');

                $.magnificPopup.open({
                    items: {
                        src: url,
                        type: 'iframe',
                        fixedContentPos: true
                    }
                });
            });

            instance.magnificGallery.on('click', function(e) {
                e.preventDefault();

                var $this = $(this),
                    items = [],
                    im = $this.data('gallery'),
                    imA = im.split(','),
                    imL = imA.length,
                    titl = $this.attr('title');

                for (var i = 0; i < imL; i++){
                    items.push({
                        src: imA[i]
                    });
                }

                $.magnificPopup.open({
                    items: items,
                    type: 'image',
                    gallery: {
                        enabled: true
                    },
                    image: {
                        titleSrc: function () {
                            return titl;
                        }
                    }
                });
            });
        },
        ratings: function () {
            var instance = this;

            if (instance.rating.length > 0) {
                instance.rating.raty({
                    half: true,
                    starType: 'i',
                    readOnly: function () {
                        return $(this).data('readonly');
                    },
                    score: function () {
                        return $(this).data('score');
                    },
                    starOff: 'fa fa-star star-off',
                    starOn: 'fa fa-star',
                    starHalf: 'fa fa-star-half-o'
                });
            }
        },
        truncAny: function () {
            var truncateElArray = [/*{
                el : $('.figure-info h4'),
                height: 60
            }*/];

            for (var i = 0; i < truncateElArray.length; i++){
                truncateElArray[i].el.dotdotdot({
                    watch: "window",
                    wrap: 'word',
                    height: truncateElArray[i].height,
                    callback: function() {
                        $(this).addClass('truncated');
                    }
                });
            }
        },
        dropMenu: function () {
            var instance = this;

            instance.navbarToggleModal.on('click', function () {
                instance.body.toggleClass('overlaymenu');
                $('.navbar-modal').stop(true, true).fadeToggle(instance.options.speedAnimation / 2);
                $('.navbar-nav').toggleClass('in');
            });

            $('.navbar-modal .dropdown').on({
                'show.bs.dropdown': function () {
                    var self = $(this);
                    self.find('.dropdown-menu').first().stop(true, true).slideDown(instance.options.speedAnimation / 2);
                },
                'hide.bs.dropdown': function () {
                    var self = $(this);
                    self.find('.dropdown-menu').first().stop(true, true).slideUp(instance.options.speedAnimation / 2);
                }
            });

            $('.navbar-modal').find('.dropdown-menu:not(.sub-menu) a').on('click', function(){
                instance.preloader.show();
            });


            $('.dropdown-menu.sub-menu > li.dropdown > a').on('click', function (e) {
                var self = $(this),
                    current= self.next(),
                    grandparent= self.parent().parent();

                grandparent.find(".sub-menu:visible").not(current).stop(true, true).slideUp(instance.options.speedAnimation / 2);
                current.stop(true, true).slideToggle(instance.options.speedAnimation / 2);

                e.stopPropagation();
                e.preventDefault();
            });

            $('.dropdown-menu:not(.sub-menu) > li > a').on('click', function () {
                var root = $(this).closest('.dropdown');

                root.find('.sub-menu:visible').stop(true, true).slideUp(instance.options.speedAnimation / 2);
            });

            instance.navbar.find(instance.dropdownToggle).on('mousedown', function () {
                var self = $(this),
                    ww = $win.width(),
                    nxt = self.next(),
                    nw = nxt.outerWidth(true),
                    w = self.outerWidth(true),
                    lp = self.offset().left;

                if ((lp + w + nw) > ww){
                    nxt.addClass('reverse-list');
                }
            });

            instance.dropdown.on('hide.bs.dropdown', function () {
                $('.dropdown-menu').removeClass('reverse-list');
            });

            $('.pagetitle .dropdown').on('show.bs.dropdown', function () {
                var self = $(this),
                    ww = $win.width(),
                    dropd = self.find('.dropdown-menu'),
                    dw = dropd.outerWidth(true),
                    dleft = self.offset().left;

                if (ww < (dleft + dw)){
                    dropd.addClass('reverse-list');
                }
            })
        },
        moveMenu: function () {
            var instance = this,
                hw = instance.header.outerWidth(true);

            if (instance.header.hasClass('header-vertical-move')) {
                if (instance.body.hasClass('is-move-menu')) {
                    animateMenu('close');

                } else {
                    animateMenu('open');
                }
            }

            if (instance.header.hasClass('header-vertical-move')) {
                instance.navbarToggle.on('click', function () {
                    if (instance.body.hasClass('is-move-menu')) {
                        animateMenu('close');

                    } else {
                        animateMenu('open');
                    }
                });
            }

            function animateMenu(t) {
                if(t === 'open') {
                    instance.body.addClass('is-move-menu');
                    if (instance.header.hasClass('header-left')) {
                        instance.header.animate({left: 0}, instance.options.speedAnimation);
                        instance.body.animate({marginRight: -hw, marginLeft: hw}, instance.options.speedAnimation);
                    } else if (instance.header.hasClass('header-right')){
                        instance.header.animate({right: 0}, instance.options.speedAnimation);
                        instance.body.animate({marginLeft: -hw, marginRight: hw}, instance.options.speedAnimation);
                    }
                }

                if(t === 'close') {
                    instance.body.removeClass('is-move-menu');
                    instance.body.animate({marginRight: 0, marginLeft: 0}, instance.options.speedAnimation);
                    if (instance.header.hasClass('header-left')) {
                        instance.header.animate({left: -hw}, instance.options.speedAnimation);
                    } else if (instance.header.hasClass('header-right')){
                        instance.header.animate({right: -hw}, instance.options.speedAnimation);
                    }
                }
            }
        },
        sliders: function(sliderContent){
            var instance = this;

            if (sliderContent === '' || sliderContent === null || sliderContent === undefined){
                sliderContent = '.slider';
            }

            sliderContent = $(sliderContent);

            if (instance.slider.length > 0){
                sliderContent.each(function(e) {
                    var $this = $(this),
                        slidewrap = $this.find('ul:first'),
                        sliderFx = slidewrap.data('fx'),
                        sliderAuto = slidewrap.data('auto'),
                        sliderTimeout = slidewrap.data('timeout'),
                        sliderSpeedAnimation = slidewrap.data('speed-animation'),
                        sliderCircular = slidewrap.data('circular'),
                        sliderOrient = ($this.hasClass('vertical') && instance.body.hasClass('fullpage')) ? true : false,
                        sliderScrollItems = slidewrap.data('scroll-items'),
                        sliderMaxItems = slidewrap.data('max-items'),
                        sliderPrefix = '#slider-',
                        sliderDirection = ($this.hasClass('vertical')) ? 'up' : 'left',
                        sliderItems = (!$this.hasClass('oneslider')) ?
                        {
                            height: 'variable',
                            visible: {
                                min: 1,
                                max: sliderMaxItems ? sliderMaxItems : 6
                            }
                        } :
                        {
                            visible: {
                                min: 1,
                                max: 1
                            },
                            width  : 870
                        };

                    $this.attr('id', 'slider-' + e);

                    slidewrap.carouFredSel({
                        direction : sliderDirection,
                        responsive: true,
                        width: 'variable',
                        infinite  : (typeof sliderCircular) ? sliderCircular : true,
                        circular  : (typeof sliderCircular) ? sliderCircular : true,
                        auto      : sliderAuto ? sliderAuto : instance.options.sliderAuto,
                        scroll    : {
                            fx             : sliderFx ? sliderFx : instance.options.sliderFx,
                            easing            : "linear",
                            duration       : sliderSpeedAnimation ? sliderSpeedAnimation : instance.options.speedAnimation,
                            timeoutDuration: sliderTimeout ? sliderTimeout : instance.options.sliderInterval,
                            items          : sliderScrollItems ? sliderScrollItems : 'page',
                            onBefore       : function (data) {
                                var that = $(this),
                                    thatClass = that.find('li:first').attr('class') ? that.find('li:first').attr('class') : '',
                                    oldItems = $(data.items.old),
                                    visItems = $(data.items.visible),
                                    oldAnimated = oldItems.find('[data-animate]');

                                if (!onMobile) {
                                    if (visItems.find('video').length > 0) {
                                        visItems.find('video').get(0).play();
                                    }
                                }

                                if (oldAnimated.length > 0){
                                    that.parent().removeClass().addClass('carousel-wrap ' + thatClass);

                                    that.parent().find('ul:last [data-animate]').removeClass('animated');

                                    setTimeout(function () {
                                        oldAnimated.each(function () {
                                            var eachThis = $(this),
                                                animateFx = eachThis.data('animate');
                                            eachThis.removeClass(animateFx).removeClass('animated');
                                        });
                                    }, instance.options.speedAnimation);
                                }

                                that.find('.no-before').removeClass('no-before');
                            },
                            onAfter        : function (data) {
                                var that = $(this),
                                    par = that.parents('.slider'),
                                    visItem = $(data.items.visible),
                                    visItemLength = visItem.length,
                                    visAnimated = visItem.find('[data-animate]');

                                if (par.hasClass('steps-1') || par.hasClass('steps-2') || par.hasClass('steps-4') || par.hasClass('steps-5') || par.hasClass('steps-6')) {
                                    that.find('li').filter(':nth-child('+ visItemLength +'n+'+ (visItemLength+1) +')').addClass('no-before');
                                    that.find('li:first-child').addClass('no-before');
                                }

                                if (visAnimated.length > 0){
                                    that.parent().removeClass().addClass('carousel-wrap');

                                    visAnimated.each(function () {
                                        var eachThis = $(this),
                                            animateFx = eachThis.data('animate');
                                        eachThis.addClass(animateFx).addClass('animated');
                                    });
                                }
                            }
                        },
                        onCreate  : function (data) {
                            var visItem = $(data.items),
                                visItemLength = visItem.length;

                            $('[class*=steps].slider li:first-child').addClass('step-1');

                            if ($this.hasClass('steps-1') || $this.hasClass('steps-2') || $this.hasClass('steps-4') || $this.hasClass('steps-5') || $this.hasClass('steps-6')) {
                                $this.find('li').filter(':nth-child('+ visItemLength +'n+'+ (visItemLength+1) +')').addClass('no-before');
                                $this.find('li:first-child').addClass('no-before');
                            }

                            if (!onMobile) {
                                if (visItem.find('video').length > 0) {
                                    visItem.find('video').get(0).play();
                                }
                            }
                        },
                        items     : sliderItems,
                        swipe     : {
                            onTouch: true,
                            onMouse: false
                        },
                        prev      : $(sliderPrefix + e + ' .slider-arrow-prev'),
                        next      : $(sliderPrefix + e + ' .slider-arrow-next'),
                        pagination: {
                            container    : $(sliderPrefix + e + ' > .slider-pagination')
                        },
                        mousewheel: sliderOrient
                    },{
                        onWindowResize: 'throttle',
                        wrapper: {
                            classname: 'carousel-wrap'
                        }
                    }).parent().css('margin', 'auto');
                });
            }
        },
        sliderRevolution: function(){
            var instance = this,
                revolutionTabs = $('.banner-tabs');

            if (instance.banner.length > 0) {

                instance.banner.each(function () {
                    var $this = $(this);

                    $this.revolution({
                        autoplay: ($this.data('auto')) ? $this.data('auto') : false,
                        delay         : ($this.data('timeout')) ? $this.data('timeout') : "9000",
                        startwidth    : 1110,
                        startheight   : ($this.data('startheight')) ? $this.data('startheight') : 550,
                        startWithSlide: 0,

                        fullScreenAlignForce: "off",
                        autoHeight          : "off",
                        minHeight           : "off",

                        shuffle: "off",

                        onHoverStop: "on",

                        stopAtSlide: ($this.data('stopatslide')) ? $this.data('stopatslide') : -1,
                        stopAfterLoops: ($this.data('stopafterloops')) ? $this.data('stopafterloops') : -1,

                        thumbWidth : ($this.data('thumbwidth')) ? $this.data('thumbwidth') : 90,
                        thumbHeight: ($this.data('thumbheight')) ? $this.data('thumbheight') : 60,
                        thumbAmount: ($this.data('thumbamount')) ? $this.data('thumbamount') : 3,

                        hideThumbsOnMobile        : "off",
                        hideNavDelayOnMobile      : 1500,
                        hideBulletsOnMobile       : "off",
                        hideArrowsOnMobile        : "off",
                        hideThumbsUnderResoluition: 0,

                        hideThumbs  : 0,
                        hideTimerBar: ($this.data('hidetimerbar')) ? $this.data('hidetimerbar') : "on",

                        keyboardNavigation: "on",

                        navigationType  : ($this.data('navigationtype')) ? $this.data('navigationtype') : "bullet",
                        navigationArrows: ($this.data('navigationarrows')) ? $this.data('navigationarrows') : "solo",
                        navigationStyle : ($this.data('navigationstyle')) ? $this.data('navigationstyle') : "round",

                        navigationHAlign : ($this.data('navigationhalign')) ? $this.data('navigationhalign') : "center",
                        navigationVAlign : ($this.data('navigationvalign')) ? $this.data('navigationvalign') : "bottom",
                        navigationHOffset: ($this.data('navigationhoffset')) ? $this.data('navigationhoffset') : 0,
                        navigationVOffset: ($this.data('navigationvoffset')) ? $this.data('navigationvoffset') : 35,

                        soloArrowLeftHalign : ($this.data('soloarrowlefthalign')) ? $this.data('soloarrowlefthalign') : "left",
                        soloArrowLeftValign : ($this.data('soloarrowleftvalign')) ? $this.data('soloarrowleftvalign') : "center",
                        soloArrowLeftHOffset: ($this.data('soloarrowlefthoffset')) ? $this.data('soloarrowlefthoffset') : -2,
                        soloArrowLeftVOffset: ($this.data('soloarrowleftvoffset')) ? $this.data('soloarrowleftvoffset') : 0,

                        soloArrowRightHalign : ($this.data('soloarrowrighthalign')) ? $this.data('soloarrowrighthalign') : "right",
                        soloArrowRightValign : ($this.data('soloarrowrightvalign')) ? $this.data('soloarrowrightvalign') : "center",
                        soloArrowRightHOffset: ($this.data('soloarrowrighthoffset')) ? $this.data('soloarrowrighthoffset') : -2,
                        soloArrowRightVOffset: ($this.data('soloarrowrightvoffset')) ? $this.data('soloarrowrightvoffset') : 0,

                        //drag_block_vert: false,

                        //touchenabled       : "on",
                        //swipe_velocity     : "0.7",
                        //swipe_max_touches  : "1",
                        //swipe_min_touches  : "1",
                        //drag_block_vertical: "false",

                        parallax           :   ($this.data('parallax')) ? $this.data('parallax') : "mouse",
                        parallaxBgFreeze     :  ($this.data('parallaxbgfreeze')) ? $this.data('parallaxbgfreeze') : "on",
                        parallaxLevels       :   ($this.data('parallaxlevels')) ? $this.data('parallaxlevels') : [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],

                        dottedOverlay: ($this.data('dottedoverlay')) ? $this.data('dottedoverlay') : "none",
                        spinned: "spinner0",

                        fullWidth                : ($this.data('fullwidth')) ? $this.data('fullwidth') : "off",
                        forceFullWidth           : ($this.data('forcefullwidth')) ? $this.data('forcefullwidth') : "off",
                        fullScreen               : ($this.data('fullscreen')) ? $this.data('fullscreen') : "off",
                        fullScreenOffsetContainer: ($this.data('fullscreenoffsetcontainer')) ? $this.data('fullscreenoffsetcontainer') : "",

                        shadow: 0
                    });

                    revolutionTabs.on('click', 'a', function (e) {
                        e.preventDefault();

                        var self = $(this),
                            indx = self.parent().index() + 1;

                        $this.revshowslide(indx);
                        self.parent().addClass('selected').siblings().removeClass('selected');
                    });

                    $this.bind("revolution.slide.onchange",function (e,data) {
                        var slideIndx = data.slideIndex - 1;

                        revolutionTabs.find('li').eq(slideIndx).addClass('selected').siblings().removeClass('selected');
                    });
                });
            }
        },
        pieCharts: function () {
            var instance = this;

            if (instance.pieChart.length > 0){
                instance.pieChart.each(function () {
                    var $this = $(this),
                        barColor = $this.data('bar-color') ? $this.data('bar-color') : false,
                        trackColor = $this.data('track-color'),
                        lineWidth = $this.data('line-width') ? $this.data('line-width') : 6;

                    $this.on('appear', function () {
                        $this.animate({'opacity': 1}, instance.options.speedAnimation);
                        $this.easyPieChart({
                            barColor: barColor,
                            trackColor: trackColor,
                            lineWidth: lineWidth,
                            animate: instance.options.speedAnimation * 4,
                            onStep: function (from, to, percent) {
                                if (!$(this.el).hasClass('pie-icon')) {
                                    $(this.el).find('.pie-percent').text(Math.round(percent));
                                }
                            }
                        });
                    }).appear();


                });
            }
        },
        vCharts: function () {
            var instance = this;

            if (instance.verticalChart.length > 0) {
                instance.verticalChart.each(function (e) {
                    var $this = $(this),
                        pColors = $this.data('colors'),
                        pPostfix = $this.data('postfix'),
                        pData = $this.data('value');

                    $this.attr('id', 'bar-' + e);

                    $this.on('appear', function () {
                        if ($this.children().length === 0) {
                            $this.jqBarGraph({
                                data: [
                                    [pData]
                                ],
                                colors: [pColors],
                                postfix: pPostfix,
                                height: 240
                            });
                        }
                    }).appear();
                });
            }
        },
        countUp: function () {
            var instance = this,
                obj = {
                    delay: 40,
                    signPosition: 'after',
                    orderSeparator: ' ',
                    decimalSeparator: ','
                };

            if (instance.countup.length > 0) {
                instance.countup.each(function () {
                    var self = $(this);

                    if (!self.hasClass('countup-fix')){
                        self.hsCounter(obj);
                    }
                });
            }
        },
        fMiddle: function () {
            var instance = this;

            instance.vmiddle.each(function () {
                var $this = $(this);
                if ( !$this.prev().length ){
                    $this.css({
                        'marginTop' : ($this.parent().outerHeight() - $this.outerHeight())/2
                    });
                } else{
                    $this.css({
                        'marginTop' : ($this.parent().height() - $this.height())/2 - $this.prev().css('paddingTop').replace('px','')
                    });
                }

            });
        },
        parallaxBG: function () {
            var instance = this;

            instance.parallax.each(function(){
                var self = $(this),
                    yPos = -($win.scrollTop() * self.data('speed')),
                    coords = '50% '+ yPos + 'px';

                if ($win.width() >= 768) {
                    self.css({backgroundPosition: coords});
                } else {
                    self.css({backgroundPosition: '50% 50%'});
                }
            });

        },
        instagramm: function () {
            var instance = this;

            if (instance.instafeed.length){
                var linkTemplate = "{{link}}",
                    imgTemplate = "{{image}}",
                    userFeed = new Instafeed({
                    get: 'user',
                    userId: instance.options.instagrammId,
                    limit: 6,
                    accessToken: '339241463.5d9f31c.49c117cfe2e54c3a98e2a26be5050401',
                    template: '<a href='+ linkTemplate +' target="_blank"><img alt="" src='+ imgTemplate +' /></a>'
                });
                userFeed.run();
            }
        },
        flickr: function () {
            var instance = this;

            if (instance.flickrfeed.length){
                var imgBTemplate = "{{image_b}}",
                    imgSTemplate = "{{image_s}}";

                instance.flickrfeed.jflickrfeed({
                    limit: 6,
                    qstrings: {
                        id: instance.options.flickrId
                    },
                    itemTemplate: '<a href='+ imgBTemplate +' target="_blank"><img alt="{{title}}" src='+ imgSTemplate +' /></a>'
                });
            }
        },
        faqNav: function () {
            var instance = this,
                faq = $('.faq'),
                faqBody = faq.find('.panel-body');

            if (faqBody.length > 0) {
                faqBody.collapse({toggle: false});
            }

            instance.expandLink.on('click', function(e){
                e.preventDefault();
                faqBody.collapse('show');
                faq.find('[data-toggle]').removeClass('collapsed');
            });

            instance.collapseLink.on('click', function(e){
                e.preventDefault();
                faqBody.collapse({toggle: false});
                faqBody.collapse('hide');
                faq.find('[data-toggle]').addClass('collapsed');
            });
        },
        priceSlider: function () {
            var slider = $('.price_slider'),
                label = $('.price_label'),
                from = label.find('.from'),
                to = label.find('.to');

            slider.slider({
                range: true,
                min: 0,
                max: 1000,
                values: [10, 590],
                slide: function( event, ui ) {
                    from.html('$' + ui.values[0]);
                    to.html('$' + ui.values[1]);
                }
            });
            from.val('$' + slider.slider( 'values', 0));
            to.val('$' + slider.slider( 'values', 1));
        },
        scrll: function () {
            var instance = this,
                wh = $win.height(),
                scrTop = $win.scrollTop(),
                hh = instance.header.outerHeight(true),
                toggleTop = instance.widgetbarToggle.data('top-position');

            if ($win.scrollTop() > 130){
                instance.widgetbarToggle.css('top', 50);
                $('.is-header-vertical').find(instance.widgetbarToggle).css('top', 50);
            } else{
                instance.widgetbarToggle.css('top', toggleTop);
            }

            // Header Bottom Sticky
            if (instance.header.hasClass('header-sticky')){
                if (instance.header.hasClass('navbar-fixed-bottom')) {
                    if (instance.header.hasClass('header-sticky-hidden')){
                        instance.header.css('bottom', scrTop);
                    } else {
                        if (scrTop >= (wh - hh)) {
                            instance.header
                                .addClass('navbar-fixed-top')
                                .removeAttr('style');
                        } else {
                            instance.header
                                .removeClass('navbar-fixed-top')
                                .css('bottom', scrTop);
                        }
                    }
                }
            }

            // Header Bottom Hidden
            if (instance.header.hasClass('header-bottom-hidden')) {
                if (instance.header.hasClass('navbar-fixed-bottom')) {
                    instance.header.css('bottom', -hh);

                    if (scrTop >= 0 && scrTop < hh) {
                        instance.header.css('bottom', (scrTop - hh));
                    } else {
                        if (instance.header.hasClass('header-sticky-hidden')) {
                            instance.header.css('bottom', (scrTop - hh));

                            if (instance.header.hasClass('header-sticky')) {
                                if (scrTop >= wh) {
                                    instance.header
                                        .addClass('navbar-fixed-top')
                                        .removeAttr('style');
                                } else {
                                    instance.header
                                        .removeClass('navbar-fixed-top')
                                        .css('bottom', (scrTop - hh));
                                }
                            }
                        } else {
                            instance.header.css('bottom', 0);
                        }
                    }
                }
            }
        },
        megaMenu: function () {
            var instance = this,
                ww = $win.width();

            if (!instance.header.hasClass('header-vertical')) {
                if (ww <= instance.options.collapseMenuWidth) {
                    if (instance.navbar.length > 0) {
                        instance.navbar.superfish('destroy');
                    }
                } else {
                    instance.navbarCollapse.removeClass('in');
                    if (instance.navbar.length > 0 && $('body').hasClass('no-mobile')) {
                        instance.navbar.superfish({
                            delay:         100,
                            animation:     {
                                opacity:'show',
                                marginTop: 0,
                                marginBottom: 0
                            },
                            animationOut:  {
                                opacity:'hide',
                                marginTop: '15px',
                                marginBottom: '15px'
                            },
                            speed:         'fast',
                            speedOut:      'fast',
                            onBeforeShow: function () {
                                var self = this,
                                    pr = self.prev(),
                                    winW = $win.width(),
                                    pw = pr.outerWidth(),
                                    w = self.outerWidth(),
                                    lp = (self.prev().length > 0) ? self.prev().offset().left : 0;

                                if ((lp + w + pw) > winW){
                                    //console.log(lp, w, pw)
                                    //console.log(winW)
                                    self.parent().find('.dropdown-menu').addClass('reverse-list');
                                }
                            },
                            onHide: function () {
                                //console.log(this)
                                this.removeClass('reverse-list');
                            }
                        });
                    }
                }
            }
        },
        contactMap: function () {
            var instance = this,
                marker,
                modalMapLink = $('.a-map'),
                modalMapClose = $('.map-close'),
                infowindow = null;

            if (instance.map.length > 0) {
                $.each(instance.map, function (index, map) {
                    var mapContainer = $(map).find('.google-map-container'),
                        mapDataCenter = mapContainer.data('center').split(','),
                        mapDataMarkers = mapContainer.data('markers').split('; '),
                        mapOptions = {
                            zoom: mapContainer.data('zoom'),
                            scrollwheel: false,
                            panControl: mapContainer.data('pan-control') ? mapContainer.data('pan-control') : false,
                            navigationControl: mapContainer.data('navigation-control') ? mapContainer.data('navigation-control') : false,
                            mapTypeControl: mapContainer.data('map-type-control') ? mapContainer.data('map-type-control') : false,
                            scaleControl: mapContainer.data('scale-control') ? mapContainer.data('scale-control') : false,
                            draggable: true,
                            zoomControl: true,
                            zoomControlOptions: {
                                style: google.maps.ZoomControlStyle.SMALL,
                                position: google.maps.ControlPosition.LEFT_CENTER
                            },
                            center: new google.maps.LatLng(mapDataCenter[0], mapDataCenter[1]),
                            styles: mapContainer.data('style') ? mapContainer.data('style') : []
                        },
                        googleMap = new google.maps.Map(mapContainer.get(0), mapOptions),
                        i = 0,
                        markerLength = mapContainer.data('markers').split('; ').length,
                        markerColor = instance.options.markersColor ? instance.options.markersColor : instance.options.markersColor[0];

                    infowindow = new google.maps.InfoWindow();

                    for (i; i < markerLength; i++) {
                        marker = new google.maps.Marker({
                            map: googleMap,
                            position: new google.maps.LatLng(mapDataMarkers[i].split(',')[0], mapDataMarkers[i].split(',')[1]),
                            icon: {
                                path: fontawesome.markers.MAP_MARKER,
                                scale: 0.65,
                                fillColor: markerColor[i],
                                fillOpacity: 1,
                                strokeColor: markerColor[i],
                                anchor: new google.maps.Point(15, -5)
                            }
                        });

                        google.maps.event.addListener(marker, 'click', function () {
                            infowindow.setContent('<p>' + this.position.A + ', ' + this.position.F + '</p>');
                            infowindow.open(googleMap, this);
                        });
                    }

                    mapContainer.parents('.map-wrap').find(modalMapLink).on('click', function () {

                        var self = $(this),
                            popupContainer = $(self.attr('href')),
                            mapPopup = popupContainer.find('.google-map-popup');

                        setTimeout(function () {
                            var googlePopup = new google.maps.Map(mapPopup.get(0), mapOptions);
                            for (i = 0; i < markerLength; i++) {
                                marker = new google.maps.Marker({
                                    map: googlePopup,
                                    position: new google.maps.LatLng(mapDataMarkers[i].split(',')[0], mapDataMarkers[i].split(',')[1]),
                                    icon: {
                                        path: fontawesome.markers.MAP_MARKER,
                                        scale: 0.65,
                                        fillColor: markerColor[i],
                                        fillOpacity: 1,
                                        strokeColor: markerColor[i],
                                        anchor: new google.maps.Point(15, -5)
                                    }
                                });

                                google.maps.event.addListener(marker, 'click', function () {
                                    infowindow.setContent('<p>' + this.position.A + ', ' + this.position.F + '</p>');
                                    infowindow.open(googlePopup, this);
                                });
                            }
                        }, 150);
                    });
                });
            }

            modalMapClose.on('click', function () {
                $('.google-map-popup').removeAttr('style').children().remove();
            });
        },
        rez: function () {
            var instance = this,
                ww = $win.width(),
                wh = $win.height(),
                hh = instance.header.outerHeight(),
                $container = $('.container'),
                containerWidth = $container.outerWidth(),
                sliderArrow = $('.slider-arrow'),
                mVis = function () {
                    instance.body.removeClass('no-menu').addClass('is-menu');
                    $('.navbar-collapse').removeClass('collapse');
                },
                mHid = function () {
                    instance.body.removeClass('is-menu').addClass('no-menu');
                    $('.navbar-collapse').addClass('collapse');
                };

            if (ww > instance.options.collapseMenuWidth) {
                mVis();
            } else {
                mHid();
            }

            if (instance.body.hasClass('is-header-vertical') && !instance.header.hasClass('header-vertical-move')){
                if (ww < 1200){
                    $('.header-vertical').removeClass('in');
                    instance.wrapper.removeClass('wrapper-margin');
                    instance.footer.removeClass('footer-margin');
                    instance.header.find(instance.navbarToggle).addClass('visible');
                } else{
                    $('.header-vertical').addClass('in');
                    instance.wrapper.addClass('wrapper-margin');
                    instance.footer.addClass('footer-margin');
                    instance.header.find(instance.navbarToggle).removeClass('visible');
                }
            }

            instance.imgWrap.each(function () {
                var self = $(this),
                    pa = self.parent(),
                    pH = pa.outerHeight(true);

                if ($win.width() > 767) {
                    self.removeAttr('style');
                    self.height(pH);
                } else {
                    self.removeAttr('style');
                }
            });

            instance.mapAbsolute.each(function () {
                var $this = $(this),
                    $c = $this.parents('.container'),
                    cW = $c.outerWidth(),
                    cwCol = $this.parents('[class*=col-]'),
                    cwWidth = cwCol.outerWidth();

                $this.width((ww - cW) / 2 + cW * cwWidth / cW);
                instance.contactMap();
            });

            sliderArrow.each(function () {
                var that = $(this),
                    sliderArrowWidth = that.width(),
                    marginOffset = (ww - containerWidth) / 4 - sliderArrowWidth / 2;

                if(marginOffset < 0) {
                    marginOffset = 15;
                }

                if (that.hasClass('slider-arrow-prev') && that.hasClass('arrow-margin')){
                    that.css('marginLeft', marginOffset);
                } else if (that.hasClass('slider-arrow-next') && that.hasClass('arrow-margin')) {
                    that.css('marginRight', marginOffset);
                }
            });

            instance.slider.each(function () {
                var that = $(this),
                    list = that.find('ul'),
                    maxItems = list.data('max-items') ? list.data('max-items') : 1;

                if (ww > 768 && ww <= 992) {
                    list.trigger('configuration', [
                        'items', {
                            visible: {
                                max: (maxItems < 3) ? maxItems : 3
                            }
                        }], true);
                } else if (ww > 639 && ww <= 767) {
                    list.trigger('configuration', [
                        'items', {
                            visible: {
                                max: (maxItems < 2) ? maxItems : 2
                            }
                        }], true);
                } else if (ww <= 639) {
                    list.trigger('configuration', [
                        'items', {
                            visible: {
                                max: 1
                            }
                        }], true);
                } else {
                    list.trigger('configuration', [
                        'items', {
                            visible: {
                                max: maxItems
                            }
                        }], true);
                }

                if (that.hasClass('oneslider')){
                    list.trigger('configuration', [
                        'items', {
                            visible: {
                                max: 1
                            }
                        }], true);
                }
            });

            instance.wrapper.css('minHeight', wh - hh - (instance.footer.outerHeight(true) || 0));
        },
        subscribeForm: function () {
            var instance = this;

            if (instance.subscribe.length === 1) {
                instance.subscribe.find('input[type=email]').on('keyup', function () {
                    var sucBlock = $('.success-block');
                    if (sucBlock.is(':visible')) sucBlock.css('display', 'none');
                });

                instance.subscribe.validatr({
                    showall: true,
                    location: 'top',
                    template: '<div class="error-email">' + instance.options.errorText + '</div>',
                    valid: function () {
                        var form = instance.subscribe,
                            msgwrap = $('.feedback-success'),
                            url = form.attr('action'),
                            email = form.find('input[type=email]');

                        url = url.replace('/post?', '/post-json?').concat('&c=?');

                        var data = {};
                        var dataArray = form.serializeArray();

                        $.each(dataArray, function (index, item) {
                            data[item.name] = item.value;
                        });

                        $.ajax({
                            url: url,
                            data: data,
                            success: function (resp) {
                                var successText = instance.options.successText;

                                function notHide() {
                                    form.attr('style', ' ');
                                }

                                if (resp.result === 'success') {
                                    msgwrap.show().addClass('scale').find('span').html(successText);
                                    instance.notyOut();
                                    setTimeout(notHide, 0);
                                } else {
                                    setTimeout(notHide, 0);
                                    var msg;
                                    try {
                                        var parts = resp.msg.split(' - ', 2);
                                        if (parts[1] === undefined) {
                                            msg = resp.msg;
                                        } else {
                                            var i = parseInt(parts[0], 10);
                                            if (i.toString() === parts[0]) {
                                                msg = parts[1];
                                            } else {
                                                msg = resp.msg;
                                            }
                                        }
                                    } catch (e) {
                                        msg = resp.msg;
                                    }
                                    msgwrap.show().addClass('scale has-error').find('span').html(msg);
                                    instance.notyOut();
                                }
                                form.slideUp(0, function () {
                                    msgwrap.slideDown();
                                });
                            },
                            dataType: 'jsonp',
                            error: function (resp, text) {
                                alert('Oops! AJAX error: ' + text);
                            }
                        });
                        return false;
                    }
                });
            }
        },
        contactForm: function () {
            var forms = $('.contact-form'),
                emailValidationRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (forms.length) {
                $.each(forms, function (form_index, form) {
                    form = $(form);
                    form.find('input, textarea').not('[type="radio"]').focusout(function () {
                        var self = $(this),
                            required = self.attr('required') ? true : false;

                        if (self.attr('type') == 'email') {
                            if ((required && self.val() === '') || (self.val() && !emailValidationRegex.test(self.val()))) {
                                self.parent().addClass('has-error');
                            }
                        } else {

                            if (required && self.val() === '') {
                                self.parent().addClass('has-error');
                            }
                        }
                    }).focusin(function () {
                        $(this).parent().removeClass('has-error');
                    });

                    form.find('input[type="radio"]').on('change', function () {
                        var self = $(this),
                            required = self.attr('required') ? true : false;

                        if (required && self.val() === '') {
                            self.parent().addClass('has-error');
                        }
                    });

                    form.find('select').on('change', function () {
                        var self = $(this),
                            required = self.attr('required') ? true : false;

                        self.parent().removeClass('has-error');

                        if (required && self.val() === '') {
                            self.parent().addClass('has-error');
                        }
                    });

                    form.on('submit', function () {
                        var hasErrors = false,
                            form = $(this);

                        $.each(form.find('input, textarea').not('[type="radio"]'), function (index, input) {
                            var self = $(input),
                                required = self.attr('required') ? true : false;

                            if (self.attr('type') == 'email') {
                                if ((required && self.val() === '') || (self.val() && !emailValidationRegex.test(self.val()))) {
                                    hasErrors = true;
                                    self.parent().addClass('has-error');
                                }
                            } else {
                                if (required && self.val() === '') {
                                    hasErrors = true;
                                    self.parent().addClass('has-error');
                                }
                            }
                        });

                        $.each(form.find('select'), function (index, input) {
                            var self = $(input),
                                required = self.attr('required') ? true : false;

                            if (required && self.val() === '') {
                                hasErrors = true;
                                self.parent().addClass('has-error');
                            }
                        });

                        $.each(form.find('input[type="radio"]'), function (index, input) {
                            var self = $(input),
                                required = self.attr('required') ? true : false;

                            if (required && self.val() === '') {
                                hasErrors = true;
                                self.parent().addClass('has-error');
                            }
                        });

                        var inputs_data = {};

                        $.each(form.find('input, textarea, select'), function (index, input) {
                            input = $(input);

                            if (input.attr('name')) {
                                inputs_data[input.attr('name')] = {
                                    required: input.attr('required'),
                                    value: input.val(),
                                    type: input.attr('type')
                                };
                            }
                        });

                        if (!hasErrors) {
                            $.ajax({
                                type: 'POST',
                                url: form.attr('action'),
                                data: inputs_data,
                                dataType: 'json'
                            }).done(function (answer) {
                                if ((typeof answer.status != 'undefined') && (answer.status == 'ok')) {
                                    form[0].reset();
                                    $('.succs-msg').fadeIn().css("display", "inline-block");
                                } else {
                                    alert('Message was not sent. Server-side error!');
                                }
                            }).fail(function () {
                                alert('Message was not sent. Client error or Internet connection problems.');
                            });
                        }
                        return false;
                    });
                });
            }
        },
        scrollbarWidth: function () {
            var a,
                b,
                c;

            if (c === undefined) {
                a = $('<div style="width:50px; height:50px; overflow:auto;"><div/>').appendTo('body');
                b = a.children();
                c = b.innerWidth() - b.height(99).innerWidth();
                a.remove();
            }
            return c;
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                    new Plugin(this, options));
            }
        });
    };
})(jQuery, window, document);

(function ($) {
    $(document.body).Aisconverse();

    // *** IE9 placeholder *** //
    if (document.all && !window.atob) {
        $('[placeholder]').focus(function () {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function () {
            var input = $(this);
            if (input.val() === '' || input.val() === input.attr('placeholder')) {
                input.addClass('placeholder');
                input.val(input.attr('placeholder'));
            }
        }).blur().parents('form').submit(function () {
            $(this).find('[placeholder]').each(function () {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            });
        });
    }
})(jQuery);