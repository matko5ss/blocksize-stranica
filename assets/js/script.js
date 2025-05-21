/* -----------------------------------------------------------------------------



File:           JS Core
Version:        1.0
Last change:    00/00/00 
-------------------------------------------------------------------------------- */
(function() {

	"use strict";

	var Haptic = {
		init: function() {
			this.Basic.init();  
		},

		Basic: {
			init: function() {

				this.preloader();
				this.BackgroundImage();
				this.Animation();
				this.StickyHeader();
				this.MobileMenu();
				this.scrollTop();
				this.counterUp();
				this.HapticAnimation();
				this.TitleAnimation();
				this.TwinMax();
				this.HomeThreeSliderSwiper();
				this.CircleProgress();
				this.TeamSlider();
				this.TestimonialSlider();
				this.SponsorSlider1();
				this.HomeOneSliderSwiper();
				this.TestimonialSliderTwo();
				this.textanimation();
				this.TeamSliderThree();
				this.TestimonialSliderThree();
				this.SponsorSlider3();
				this.PortfolioFilterImage();
				this.BlogSliderThree();




			},
			preloader: function (){
				jQuery(window).on('load', function(){
					jQuery('#preloader').fadeOut('slow',function(){jQuery(this).remove();});
				})
			},
			BackgroundImage: function (){
				$('[data-background]').each(function() {
					$(this).css('background-image', 'url('+ $(this).attr('data-background') + ')');
				});
				if ($('.scene').length > 0 ) {
					$('.scene').parallax({
						scalarX: 10.0,
						scalarY: 10.0,
					}); 
				};
			},
			Animation: function (){
				if($('.wow').length){
					var wow = new WOW(
					{
						boxClass:     'wow',
						animateClass: 'animated',
						offset:       0,
						mobile:       true,
						live:         true
					}
					);
					wow.init();
				};
				$(window).on('load', function(){
					const boxes = gsap.utils.toArray('.tx-animation-style1,.hap-img-animation');
					boxes.forEach(img => {
						gsap.to(img, {
							scrollTrigger: {
								trigger: img,
								start: "top 70%",
								end: "bottom bottom",
								toggleClass: "active",
								once: true,
							}
						});
					});
				});
			},
			counterUp: function (){
				$('.counter').counterUp({
					delay: 15,
					time: 1500,
				});
				if ($(".progress-bar").length) {
					var $progress_bar = $('.progress-bar');
					$progress_bar.appear();
					$(document.body).on('appear', '.progress-bar', function() {
						var current_item = $(this);
						if (!current_item.hasClass('appeared')) {
							var percent = current_item.data('percent');
							current_item.css('width', percent + '%').addClass('appeared').parent().append('<span>' + percent + '%' + '</span>');
						}

					});
				};
			},
			StickyHeader: function (){
				jQuery(window).on('scroll', function() {
					if (jQuery(window).scrollTop() > 250) {
						jQuery('.bi-header-section').addClass('sticky-on')
					} else {
						jQuery('.bi-header-section').removeClass('sticky-on')
					}
				});
				jQuery(document).ready(function (o) {
					0 < o(".navSidebar-button").length &&
					o(".navSidebar-button").on("click", function (e) {
						e.preventDefault(), e.stopPropagation(), o(".info-group").addClass("isActive");
					}),
					0 < o(".close-side-widget").length &&
					o(".close-side-widget").on("click", function (e) {
						e.preventDefault(), o(".info-group").removeClass("isActive");
					}),
					o(".xs-sidebar-widget").on("click", function (e) {
						e.stopPropagation();
					})
				});
				$('.search-btn').on('click', function() {
					$('.search-body').toggleClass('search-open');
				});
				$(document).ready(function () {
					$('.cart_close_btn, .body-overlay').on('click', function () {
						$('.cart_sidebar').removeClass('active');
						$('.body-overlay').removeClass('active');
					});

					$('.header-cart-btn').on('click', function () {
						$('.cart_sidebar').addClass('active');
						$('.body-overlay').addClass('active');
					});
				});
				jQuery(window).on('scroll', function() {
					if (jQuery(window).scrollTop() > 250) {
						jQuery('.hap-header-section').addClass('sticky-on')
					} else {
						jQuery('.hap-header-section').removeClass('sticky-on')
					}
				});
			},
			MobileMenu: function (){
				$('.open_mobile_menu').on("click", function() {
					$('.mobile_menu_wrap').toggleClass("mobile_menu_on");
				});
				$('.open_mobile_menu').on('click', function () {
					$('body').toggleClass('mobile_menu_overlay_on');
				});
				if($('.mobile_menu li.dropdown ul').length){
					$('.mobile_menu li.dropdown').append('<div class="dropdown-btn"><span class="fas fa-caret-right"></span></div>');
					$('.mobile_menu li.dropdown .dropdown-btn').on('click', function() {
						$(this).prev('ul').slideToggle(500);
					});
				}
				$(".dropdown-btn").on("click", function () {
					$(this).toggleClass("toggle-open");
				});
			},
			TwinMax: function (){
				var $circleCursor = $(".cursor");

				function moveCursor(e) {
					var t = e.clientX + "px",
					a = e.clientY + "px";
					TweenMax.to($circleCursor, .2, {
						left: t,
						top: a,
						ease: "Power1.easeOut"
					})
				}

				function zoomCursor(e) {
					TweenMax.to($circleCursor, .1, {
						scale: 3,
						ease: "Power1.easeOut"
					}), $($circleCursor).removeClass("cursor-close")
				}

				function closeCursor(e) {
					TweenMax.to($circleCursor, .1, {
						scale: 3,
						ease: "Power1.easeOut"
					}), $($circleCursor).addClass("cursor-close")
				}

				function defaultCursor(e) {
					TweenLite.to($circleCursor, .1, {
						scale: 1,
						ease: "Power1.easeOut"
					}), $($circleCursor).removeClass("cursor-close")
				}
				$(window).on("mousemove", moveCursor),
				$("a, button, .zoom-cursor").on("mouseenter", zoomCursor),
				$(".trigger-close").on("mouseenter", closeCursor),
				$("a, button, .zoom-cursor, .trigger-close, .trigger-plus").on("mouseleave", defaultCursor);
			},
			scrollTop: function (){
				$(window).on("scroll", function() {
					if ($(this).scrollTop() > 200) {
						$('.scrollup').fadeIn();
					} else {
						$('.scrollup').fadeOut();
					}
				});

				$('.scrollup').on("click", function()  {
					$("html, body").animate({
						scrollTop: 0
					}, 800);
					return false;
				});
				var ltn__active_item = $('.bi-storyboard-item')
				ltn__active_item.mouseover(function() {
					ltn__active_item.removeClass('active');
					$(this).addClass('active');
				});
				jQuery('.video_box').magnificPopup({
					disableOn: 200,
					type: 'iframe',
					mainClass: 'mfp-fade',
					removalDelay: 160,
					preloader: false,
					fixedContentPos: false,
				});
				$('.zoom-gallery').magnificPopup({
					delegate: 'a',
					type: 'image',
					closeOnContentClick: false,
					closeBtnInside: false,
					mainClass: 'mfp-with-zoom mfp-img-mobile',
					gallery: {
						enabled: true
					},
					zoom: {
						enabled: true,
						duration: 300, 
						opener: function(element) {
							return element.find('img');
						}
					}
				});
			},
			HapticAnimation: function (){
				gsap.registerPlugin(ScrollTrigger, ScrollSmoother, TweenMax, ScrollToPlugin);
				gsap.config({
					nullTargetWarn: false,
				});

				let splitTitleLines = gsap.utils.toArray(".headline-title");
				splitTitleLines.forEach(splitTextLine => {
					const tl = gsap.timeline({
						scrollTrigger: {
							trigger: splitTextLine,
							start: 'top 90%',
							end: 'bottom 60%',
							scrub: false,
							markers: false,
							toggleActions: 'play none none none'
						}
					});
					const itemSplitted = new SplitText(splitTextLine, { type: "words, lines" });
					gsap.set(splitTextLine, { perspective: 400 });
					itemSplitted.split({ type: "lines" })
					tl.from(itemSplitted.lines, { duration: 1, delay: 0.3, opacity: 0, rotationX: -80, force3D: true, transformOrigin: "top center -50", stagger: 0.1 });
				});
				$('.bi-btn-hover').on('mouseenter', function (e) {
					var x = e.pageX - $(this).offset().left;
					var y = e.pageY - $(this).offset().top;

					$(this).find('span').css({
						top: y,
						left: x
					});
				});
				$('.bi-btn-hover').on('mouseout', function (e) {
					var x = e.pageX - $(this).offset().left;
					var y = e.pageY - $(this).offset().top;

					$(this).find('span').css({
						top: y,
						left: x
					});
				});
				const all_btns = gsap.utils.toArray(".bi-btn-area");
				if (all_btns.length > 0) {
					var all_btn = gsap.utils.toArray(".bi-btn-area");


					const all_btn_cirlce = gsap.utils.toArray(".bi-btn-item");
					all_btn.forEach((btn, i) => {

						$(btn).mouseleave(function (e) {
							gsap.to(all_btn_cirlce[i], 0.5, {
								x: 0,
								y: 0,
								ease: Power2.easeOut,
							});
						});
					});
					let arr2 = gsap.utils.toArray(".bi-btn-area");
				};
			},
			TitleAnimation: function (){
				$(document).ready(function() {
					var st = $(".tx-split-text");
					if(st.length == 0) return;
					gsap.registerPlugin(SplitText);
					st.each(function(index, el) {
						el.split = new SplitText(el, { 
							type: "lines,words,chars",
							linesClass: "split-line"
						});
						gsap.set(el, { perspective: 400 });

						if( $(el).hasClass('split-in-fade') ){
							gsap.set(el.split.chars, {
								opacity: 0,
								ease: "Back.easeOut",
							});
						}
						if( $(el).hasClass('split-in-right') ){
							gsap.set(el.split.chars, {
								opacity: 0,
								x: "50",
								ease: "Back.easeOut",
							});
						}
						if( $(el).hasClass('split-in-left') ){
							gsap.set(el.split.chars, {
								opacity: 0,
								x: "-50",
								ease: "circ.out",
							});
						}
						if( $(el).hasClass('split-in-up') ){
							gsap.set(el.split.chars, {
								opacity: 0,
								y: "80",
								ease: "circ.out",
							});
						}
						if( $(el).hasClass('split-in-down') ){
							gsap.set(el.split.chars, {
								opacity: 0,
								y: "-80",
								ease: "circ.out",
							});
						}
						if( $(el).hasClass('split-in-rotate') ){
							gsap.set(el.split.chars, {
								opacity: 0,
								rotateX: "50deg",
								ease: "circ.out",
							});
						}
						if( $(el).hasClass('split-in-scale') ){
							gsap.set(el.split.chars, {
								opacity: 0,
								scale: "0.5",
								ease: "circ.out",
							});
						}
						el.anim = gsap.to(el.split.chars, {
							scrollTrigger: {
								trigger: el,
								start: "top 90%",
							},
							x: "0",
							y: "0",
							rotateX: "0",
							scale: 1,
							opacity: 1,
							duration: 0.8, 
							stagger: 0.02,
						});
					});
				});
				let splitTextLines = gsap.utils.toArray(".bins-text p");

				splitTextLines.forEach(splitTextLine => {
					const tl = gsap.timeline({
						scrollTrigger: {
							trigger: splitTextLine,
							start: 'top 90%',
							duration: 2,
							end: 'bottom 60%',
							scrub: false,
							markers: false,
							toggleActions: 'play none none none'
						}
					});

					const itemSplitted = new SplitText(splitTextLine, { type: "lines" });
					gsap.set(splitTextLine, { perspective: 400 });
					itemSplitted.split({ type: "lines" })
					tl.from(itemSplitted.lines, { duration: 1, delay: 0.5, opacity: 0, rotationX: -80, force3D: true, transformOrigin: "top center -50", stagger: 0.1 });
				});
				
				$(window).on('load', function(){
					const boxes = gsap.utils.toArray('.tx-animation-style1,.bi-img-animation');
					boxes.forEach(img => {
						gsap.to(img, {
							scrollTrigger: {
								trigger: img,
								start: "top 70%",
								end: "bottom bottom",
								toggleClass: "active",
								once: true,
							}
						});
					});
				});
			},
			HomeOneSliderSwiper: function (){
				var slider = new Swiper('.bi-main-slider', {
					spaceBetween: 30,
					slidesPerView: 1,
					effect: 'fade',
					loop: true,
					navigation: {
						nextEl: ".bi-main-button-next",
						prevEl: ".bi-main-button-prev",
					},
				});
				var slider = new Swiper('.bi-main-slider-4', {
					spaceBetween: 30,
					slidesPerView: 1,
					effect: 'fade',
					spaceBetween: 10,
					loop:true,
					loopedSlides: 50,
					navigation: {
						nextEl: ".bi-main-button-next-4",
						prevEl: ".bi-main-button-prev-4",
					},
				});

			},
			HomeThreeSliderSwiper: function (){
				var slider = new Swiper('.bi-slider-wrapper-3', {
					spaceBetween: 30,
					slidesPerView: 1,
					effect: 'fade',
					loop: true,
					navigation: {
						nextEl: ".bi-main-button-next_3",
						prevEl: ".bi-main-button-prev_3",
					},
					pagination: {
						el: ".swiper-paginations",
						clickable: true,
					},
				});

			},
			CircleProgress: function (){
				if($('.count-box').length){
					$('.count-box').appear_c(function(){
						var $t = $(this),
						n = $t.find(".count-text").attr("data-stop"),
						r = parseInt($t.find(".count-text").attr("data-speed"), 10);
						if (!$t.hasClass("counted")) {
							$t.addClass("counted");
							$({
								countNum: $t.find(".count-text").text()
							}).animate({
								countNum: n
							}, {
								duration: r,
								easing: "linear",
								step: function() {
									$t.find(".count-text").text(Math.floor(this.countNum));
								},
								complete: function() {
									$t.find(".count-text").text(this.countNum);
								}
							});
						}
					},{accY: 0});
				};
				if($('.dial').length){
					$('.dial').appear_c(function(){
						var elm = $(this);
						var color = elm.attr('data-fgColor');  
						var perc = elm.attr('value'); 
						var thickness = elm.attr('thickness');  
						elm.knob({ 
							'value': 0, 
							'min':0,
							'max':100,
							'skin':'tron',
							'readOnly':true,
							'thickness':.2,
							'dynamicDraw': true,
							'displayInput':false
						});
						$({value: 0}).animate({ value: perc }, {
							duration: 3500,
							easing: 'swing',
							progress: function () { elm.val(Math.ceil(this.value)).trigger('change');
						}
					});
					},{accY: 0});
				}
			},
			TeamSlider: function (){
				var slider = new Swiper('.bi-team-slider11', {
					spaceBetween: 50,
					slidesPerView: 2,
					roundLengths: true,
					loop: true,
					loopAdditionalSlides: 30,
					speed: 1000,
					navigation: {
						nextEl: ".price-button-next",
						prevEl: ".price-button-prev",
					},
					breakpoints: {
						'1600': {
							slidesPerView: 2,
						},
						'1200': {
							slidesPerView: 2,
						},
						'992': {
							slidesPerView: 2,
						},
						'768': {
							slidesPerView: 1,
						},
						'576': {
							slidesPerView: 1,
						},
						'0': {
							slidesPerView: 1,
						},
					},
				});
			},
			TestimonialSlider: function (){
				var slider = new Swiper('.bi-testimonial-slider', {
					spaceBetween: 30,
					slidesPerView: 1,
					effect: 'fade',
					navigation: {
						nextEl: ".testimoinal-button-next",
						prevEl: ".testimoinal-button-prev",
					},
				});
			},
			SponsorSlider1: function (){
				var slider = new Swiper('.bi-sponsor-slider', {
					spaceBetween: 105,
					slidesPerView: 5,
					roundLengths: true,
					loop: true,
					loopAdditionalSlides: 30,
					autoplay: {
						enabled: true,
						delay: 6000
					},
					speed: 400,
					breakpoints: {
						'1600': {
							slidesPerView: 5,
						},
						'1200': {
							slidesPerView: 4,
						},
						'992': {
							slidesPerView: 4,
						},
						'768': {
							slidesPerView: 4,
						},
						'576': {
							slidesPerView: 3,
						},
						'0': {
							slidesPerView: 2,
						},
					},
				});
			},
			TestimonialSliderTwo: function (){
				var Testimonial_nav = new Swiper(".bi-testimonial-nav", {
					loop: true,
					spaceBetween: 18,
					slidesPerView: 3,
					slidesPerView: 1,
					centeredSlides: true,
					direction: "vertical",
					breakpoints: {  
						'1400': {
							slidesPerView: 3,
						},
						'1200': {
							slidesPerView: 3,
						},
						'1024': {
							slidesPerView: 3,
							direction: "horizontal",
						},
						'991': {
							slidesPerView: 3,
							direction: "horizontal",
						},
						'768': {
							slidesPerView: 3,
							direction: "horizontal",
						},
						'577': {
							slidesPerView: 3,
							direction: "horizontal",
						},
						'0': {
							slidesPerView: 3,
							direction: "horizontal",
						},
					},
				});
				var swiper2 = new Swiper(".bi-testimonial-slider-for", {
					loop: true,
					spaceBetween: 0,
					effect: 'fade',
					slidesPerView: 1,
					fadeEffect: {
						crossFade: true
					},
					thumbs: {
						swiper: Testimonial_nav,
					},
				});
			},
			TeamSliderThree: function (){
				var slider = new Swiper('.bi-team-slider-3', {
					spaceBetween: 30,
					slidesPerView: 4,
					roundLengths: true,
					loop: true,
					loopAdditionalSlides: 30,
					speed: 1000,
					navigation: {
						nextEl: ".bi-team-button-next_3",
						prevEl: ".bi-team-button-prev_3",
					},
					pagination: {
						el: ".swiper-team-paginations",
						clickable: true,
					},
					breakpoints: {
						'1600': {
							slidesPerView: 4,
						},
						'1500': {
							slidesPerView: 4,
						},
						'1400': {
							slidesPerView: 3,
						},
						'1300': {
							slidesPerView: 3,
						},
						'992': {
							slidesPerView: 2,
						},
						'768': {
							slidesPerView: 1,
						},
						'576': {
							slidesPerView: 1,
						},
						'0': {
							slidesPerView: 1,
						},
					},
				});
			},
			TestimonialSliderThree: function (){
				var slider = new Swiper('.bi-testimonial-slider-3', {
					spaceBetween: 30,
					slidesPerView: 3,
					roundLengths: true,
					loop: true,
					loopAdditionalSlides: 30,
					speed: 1000,
					pagination: {
						el: ".swiper-testi-paginations",
						clickable: true,
					},
					breakpoints: {
						'1600': {
							slidesPerView: 3,
						},
						'1500': {
							slidesPerView: 3,
						},
						'1400': {
							slidesPerView: 2,
						},
						'1300': {
							slidesPerView: 2,
						},
						'992': {
							slidesPerView: 1,
						},
						'768': {
							slidesPerView: 1,
						},
						'576': {
							slidesPerView: 1,
						},
						'0': {
							slidesPerView: 1,
						},
					},
				});
				var swiper = new Swiper(".bi-testimonial-slider-nav-4", {
					loop: true,
					spaceBetween: 0,
					speed: 500,
					slidesPerView: 5,
					centeredSlides: true,
					navigation: {
						nextEl: ".testimonial-next_4",
						prevEl: ".testimonial-prev_4",
					},
					breakpoints: {  
						'1400': {
							slidesPerView: 5,
						},
						'1200': {
							slidesPerView: 5,
						},
						'992': {
							slidesPerView: 3,
						},
						'768': {
							slidesPerView: 3,
						},
						'576': {
							slidesPerView: 3,
							spaceBetween: 20,
						},
						'0': {
							slidesPerView: 1,
						},
					},
				});
				var swiper2 = new Swiper(".bi-testimonial-slider-for-4", {
					loop: true,
					spaceBetween: 10,
					effect: 'fade',
					navigation: {
						nextEl: ".testimonial-next_4",
						prevEl: ".testimonial-prev_4",
					},
					thumbs: {
						swiper: swiper,
					},
				});
				var slider = new Swiper('.hap-testimonial-slider', {
					spaceBetween: 50,
					slidesPerView: 1,
					roundLengths: true,
					loop: true,
					loopAdditionalSlides: 30,
					speed: 1000,
					navigation: {
						nextEl: ".hap-testimonial-button-next",
						prevEl: ".hap-testimonial-button-prev",
					},
					breakpoints: {
						'1600': {
							slidesPerView: 1,
						},
						'1200': {
							slidesPerView: 1,
						},
						'992': {
							slidesPerView: 1,
						},
						'768': {
							slidesPerView: 1,
						},
						'576': {
							slidesPerView: 1,
						},
						'0': {
							slidesPerView: 1,
						},
					},
				});
			},
			SponsorSlider3: function (){
				var slider = new Swiper('.bi-sponsor-slider-3', {
					spaceBetween: 135,
					slidesPerView: 7,
					roundLengths: true,
					loop: true,
					loopAdditionalSlides: 30,
					autoplay: {
						enabled: true,
						delay: 6000
					},
					speed: 400,
					breakpoints: {
						'1600': {
							slidesPerView: 6,
						},
						'1200': {
							slidesPerView: 5,
						},
						'992': {
							slidesPerView: 4,
						},
						'768': {
							slidesPerView: 4,
						},
						'576': {
							slidesPerView: 3,
						},
						'0': {
							slidesPerView: 2,
						},
					},
				});
				var slider = new Swiper('.hap-gallery-slide', {
					slidesPerView: 7,
					spaceBetween: 0,
					loop: true,
					autoplay: {
						enabled: true,
						delay: 6000
					},
					speed: 500,

					breakpoints: {
						'1600': {
							slidesPerView: 7,
						},
						'1200': {
							slidesPerView: 5,
						},
						'992': {
							slidesPerView: 4,
						},
						'768': {
							slidesPerView: 3,
						},
						'576': {
							slidesPerView: 2,
						},
						'0': {
							slidesPerView: 2,
						},
					},
				});
			},
			PortfolioFilterImage: function (){
				jQuery(window).on('load', function(){
					$('.filtr-container').imagesLoaded ( function(){});
					var filterizd = $('.filtr-container');

					if(filterizd.length) {
						filterizd.filterizr({
							layout: 'sameWidth',
						});
						$('.filtr-button').on('click', function() {

							$('.filtr-button.filtr-active').removeClass('filtr-active');
							$(this).addClass('filtr-active');
						});
					}
				});
				let imageBins = gsap.timeline({
					scrollTrigger: {
						trigger: ".portfolio-img",
						start: "top bottom",
						markers: false,
						scrub: 1,
						end: "bottom center"
					}
				})
				imageBins.to(".portfolio-img img", {
					scale: 1.15,
					duration: 1,
				});
				$('[data-countdown]').each(function () {
					var $this = $(this),
					finalDate = $(this).data('countdown');
					if (!$this.hasClass('countdown-full-format')) {
						$this.countdown(finalDate, function (event) {
							$this.html(event.strftime('<div class="single"><h1>%D</h1><p>Days</p></div> <div class="single"><h1>%H</h1><p>Hours</p></div> <div class="single"><h1>%M</h1><p>Minutes</p></div> <div class="single"><h1>%S</h1><p>Second</p></div>'));
						});
					} else {
						$this.countdown(finalDate, function (event) {
							$this.html(event.strftime('<div class="single"><h1>%Y</h1><p>Years</p></div> <div class="single"><h1>%m</h1><p>Months</p></div> <div class="single"><h1>%W</h1><p>Weeks</p></div> <div class="single"><h1>%d</h1><p>Days</p></div> <div class="single"><h1>%H</h1><p>Hours</p></div> <div class="single"><h1>%M</h1><p>Minutes</p></div> <div class="single"><h1>%S</h1><p>Second</p></div>'));
						});
					}
				});

				$('.bi-text-scroll-item-1').marquee({
					speed: 50,
					gap: 20,
					delayBeforeStart: 0,
					direction: 'right',
					duplicated: true,
					pauseOnHover: true,
					startVisible:true,
				});
				$('.bi-text-scroll-item-2').marquee({
					speed: 50,
					gap: 20,
					delayBeforeStart: 0,
					direction: 'left',
					duplicated: true,
					pauseOnHover: true,
					startVisible:true,
				});
				$('.bi-service-scroll-area').marquee({
					speed: 10,
					gap: 0,
					delayBeforeStart: 0,
					direction: 'left',
					duplicated: true,
					pauseOnHover: true,
					startVisible:true,
				});
				$('.text_scroller_1').marquee({
					speed: 50,
					gap: 20,
					delayBeforeStart: 0,
					direction: 'right',
					duplicated: true,
					pauseOnHover: true,
					startVisible:true,
				});
				$('.text_scroller_2').marquee({
					speed: 50,
					gap: 20,
					delayBeforeStart: 0,
					direction: 'left',
					duplicated: true,
					pauseOnHover: true,
					startVisible:true,
				});
				$('.text_scroller_3').marquee({
					speed: 50,
					gap: 20,
					delayBeforeStart: 0,
					direction: 'left',
					duplicated: true,
					pauseOnHover: true,
					startVisible:true,
				});
				$(document).on('click', '.bi-why-choose-text_3 .accordion-item', function(){
					$(this).addClass('faq_bg').siblings().removeClass('faq_bg')
				})
				$(".price-first-item").hover(function(){

					$(".bi-pricing-plan-content-4").addClass("is-active");  
				}, function () {
					$(".bi-pricing-plan-content-4").removeClass("is-active");
				});
				$(".price-last-item").hover(function(){

					$(".bi-pricing-plan-content-4").addClass("is-last-active");  
				}, function () {
					$(".bi-pricing-plan-content-4").removeClass("is-last-active");
				});
			},
			BlogSliderThree: function (){
				var slider = new Swiper('.bi-blog-slider-3', {
					spaceBetween: 30,
					slidesPerView: 3,
					roundLengths: true,
					loop: true,
					loopAdditionalSlides: 30,
					speed: 1000,
					pagination: {
						el: ".swiper-blog-paginations",
						clickable: true,
					},
					breakpoints: {
						'1600': {
							slidesPerView: 3,
						},
						'1500': {
							slidesPerView: 3,
						},
						'1400': {
							slidesPerView: 3,
						},
						'1300': {
							slidesPerView: 3,
						},
						'1200': {
							slidesPerView: 2,
						},
						'992': {
							slidesPerView: 2,
						},
						'768': {
							slidesPerView: 1,
						},
						'576': {
							slidesPerView: 1,
						},
						'0': {
							slidesPerView: 1,
						},
					},
				});
				var slider = new Swiper('.hap-team-slider', {
					spaceBetween: 30,
					slidesPerView: 3,
					roundLengths: true,
					loop: true,
					loopAdditionalSlides: 30,
					speed: 1000,
					navigation: {
						nextEl: ".hap-team-button-next",
						prevEl: ".hap-team-button-prev",
					},
					breakpoints: {
						'1600': {
							slidesPerView: 3,
						},
						'1500': {
							slidesPerView: 3,
						},
						'1400': {
							slidesPerView: 3,
						},
						'1300': {
							slidesPerView: 3,
						},
						'992': {
							slidesPerView: 2,
						},
						'768': {
							slidesPerView: 1,
						},
						'576': {
							slidesPerView: 1,
						},
						'0': {
							slidesPerView: 1,
						},
					},
				});
			},
			textanimation: function (){
				if (window.innerWidth > 768) {
					const Engine = Matter.Engine;
					const Render = Matter.Render;
					const World = Matter.World;
					const Bodies = Matter.Bodies;
					const Mouse = Matter.Mouse;
					const MouseConstraint = Matter.MouseConstraint;
					const engine = Engine.create();
					const render = Render.create({
						element: document.querySelector('.service-matter'),
						engine: engine,
						options: {
							width: window.innerWidth,
							height: window.innerWidth <= 768 ? 300 : 360,
							background: 'transparent',
							wireframes: false,
							pixelRatio: window.devicePixelRatio, 
						},
					});
					const canvas = render.canvas;
					Engine.run(engine);
					Render.run(render);
					const ground = Bodies.rectangle(render.options.width / 2, render.options.height, render.options.width, 30, {
						isStatic: true,
						render: {
							fillStyle: 'transparent',
							strokeStyle: 'transparent',
						},
					});
					const leftWall = Bodies.rectangle(0, render.options.height / 2, 30, render.options.height, {
						isStatic: true,
						render: {
							fillStyle: 'transparent',
							strokeStyle: 'transparent',
						},
					});
					const rightWall = Bodies.rectangle(render.options.width, render.options.height / 2, 30, render.options.height, {
						isStatic: true,
						render: {
							fillStyle: 'transparent',
							strokeStyle: 'transparent',
						},
					});
					World.add(engine.world, [ground, leftWall, rightWall]);
					const pastelColors = ['#ffd1dc', '#d1ffd1', '#d1d1ff', '#ffecd1', '#ffd1ec'];
					function createRoundedStarPath(size) {
						const points = [];
						const innerRadius = size * 0.4;
						const outerRadius = size;
						const angle = Math.PI / 4;
						for (let i = 0; i < 8; i++) {
							const currentAngle = angle * i;
							const radius = i % 2 === 0 ? outerRadius : innerRadius;
							const x = Math.cos(currentAngle) * radius;
							const y = Math.sin(currentAngle) * radius;
							points.push({ x, y });
						}
						return points;
					}
					function updateSizes() {
						if (window.innerWidth <= 768) {
							return {
								fontSize: 12,
								padding: 15,
								width: 200,
								height: 30,
								chamferRadius: 15,
							};
						} else {
							return {
								fontSize: 18,
								padding: 30,
								width: 350,
								height: 50,
								chamferRadius: 25,
							};
						}
					}
					function createBricks() {
						const sizes = updateSizes();
						const { fontSize, padding, width, height, chamferRadius } = sizes;
						const bricks = texts.map((text, index) => {
							const randomX = render.options.width / 2 + (Math.random() - 0.5) * 500;
							const y = -index * 100;
							render.context.font = `${fontSize}px Inter, sans-serif`;
							const brickWidth = width || 350;
							const brickHeight = height || 50;
							const pastelColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
							const randomVelocityX = (Math.random() - 0.5) * 4;
							const randomVelocityY = Math.random() * 4;
							return Bodies.rectangle(randomX, y, brickWidth, brickHeight, {
								chamfer: { radius: chamferRadius },
								render: {
									fillStyle: 'transparent',
									strokeStyle: '#9D83B4',
									lineWidth: 1,
									text: {
										content: text,
										size: fontSize,
										color: '#E8D9F5',
									},
								},
								velocity: {
									x: randomVelocityX,
									y: randomVelocityY,
								},
							});
						});
						window.addEventListener('resize', () => {
							World.clear(engine.world, true); 
							createBricks(); 
						});
						World.add(engine.world, [...bricks]);
						render.context.font = '18px Inter, sans-serif';
						render.context.textAlign = 'center';
						render.context.textBaseline = 'middle';
						Matter.Events.on(render, 'afterRender', () => {
							bricks.forEach((brick) => {
								const { x, y } = brick.position;
								const angle = brick.angle;
								const { content, size, color } = brick.render.text;

								render.context.font = `${size}px Inter, sans-serif`;

								render.context.save();
								render.context.translate(x, y);
								render.context.rotate(angle);
								render.context.fillStyle = color;
								render.context.fillText(content, 0, 0);
								render.context.restore();
							});
						});
					}
					const mouse = Mouse.create(render.canvas);
					const mouseConstraint = MouseConstraint.create(engine, {
						mouse: mouse,
						constraint: {
							render: {
								visible: false,
							},
						},
					});
					World.add(engine.world, mouseConstraint);
					render.mouse = mouse;

					const observer = new IntersectionObserver(
						(entries) => {
							entries.forEach((entry) => {
								if (entry.isIntersecting) {
									createBricks();
									observer.unobserve(entry.target);
								}
							});
						},
						{
							threshold: 0.1, 
						}
						);

					observer.observe(canvas);
					mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
					mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);
				}
				const texts = [
					"User Interface Design",
					"Digital Marketing",
					"Lack of Brand Differentiation",
					"Application Development",
					"Application Development",
					"Scaling Difficulties",
					"Application Development",
					"Outdated Designs",
					"Products Designs",
					"Branding Designs",
					"3D Animations",
					"3D Illustration Design",
					"Web Application Development",
					"User Interface Design",
					];
			},
		}
	}
	jQuery(document).ready(function (){
		Haptic.init();
	});

})();