/*
*   Author: beshleyua
*   Author URL: http://themeforest.net/user/beshleyua
*/


/*
	Preloader
*/

$(window).on("load", function() {
	var preload = $('.preloader');
	preload.find('.spinner').fadeOut(function(){
		preload.fadeOut();
	});
});

$(function () {
	'use strict';
	
	
	/*
		Vars
	*/
	
	var width = $(window).width();
	var height = $(window).height();


	/*
		Typed
	*/

	$('.subtitle.subtitle-typed').each(function(){
		var subtitleContainer = $(this);

		subtitleContainer.typed({
			stringsElement: subtitleContainer.find('.typing-title'),
			backDelay: 3500, /* Delay in text change */
			typeSpeed: 0, /* Typing speed */
			loop: true
		});
	});


	/*
		Sidebar Show/Hide
	*/

	$('header, .profile').on('click', '.menu-btn', function(){
		$('.s_overlay').fadeIn();
		$('.content-sidebar').addClass('active');
		$('body,html').addClass('sidebar-open');
		return false;
	});
	$('.content-sidebar, .container').on('click', '.close, .s_overlay', function(){
		$('.s_overlay').fadeOut();
		$('.content-sidebar').removeClass('active');
		$('body,html').removeClass('sidebar-open');
	});


	/*
		Popup Menu Navigation
	*/
	
	$('.main-menu li.page_item_has_children').each(function(){
		$(this).find('> a').after('<span class="children_toggle"></span>');
	});
	$('.main-menu').on('click', '.children_toggle', function(){
		var main_menu_item = $(this).closest('.page_item_has_children');
		if(main_menu_item.hasClass('open')) {
			main_menu_item.removeClass('open');
			main_menu_item.find('> ul').slideUp(250);
		} else {
			main_menu_item.addClass('open');
			main_menu_item.find('> ul').slideDown(250);
		}
	});


	/*
		Default Menu
	*/

	$('.lnk-view-menu').on('click', function(){
		var btn_text1 = $(this).find('.text').text();
		var btn_text2 = $(this).find('.text').data('text-open');
		if($('.profile').hasClass('default-menu-open')){
			$('.profile').removeClass('default-menu-open');
			$(this).find('.text').data('text-open', btn_text1);
			$(this).find('.text').text(btn_text2);
		} else {
			$('.profile').addClass('default-menu-open');
			$(this).find('.text').data('text-open', btn_text1);
			$(this).find('.text').text(btn_text2);
		}

		return false;
	});
	
	
	/*
		Header Menu Desktop
	*/
	
	var container = $('.container');
	var card_items = $('.card-inner');
	var animation_in = container.data('animation-in');
	var animation_out = container.data('animation-out');
	
	$('.top-menu').on('click', 'a', function(){

		/* vars */
		var width = $(window).width();
		var id = $(this).attr('href');
		var h = parseFloat($(id).offset().top);
		var card_item = $(id);
		var menu_items = $('.top-menu li');
		var menu_item = $(this).closest('li');
		var d_lnk = $('.lnks .lnk.discover');

		if((width >= 1024)) {
			
			/* if desktop */
			if(!menu_item.hasClass('active') & (width > 1023) & $('#home-card').length) {

				/* close card items */
				menu_items.removeClass('active');
				container.find(card_items).removeClass('animated '+animation_in);

				if($(container).hasClass('opened')) {
					container.find(card_items).addClass('animated '+animation_out);
				}

				/* open card item */
				menu_item.addClass('active');
				container.addClass('opened');
				container.find(card_item).removeClass('animated '+animation_out);
				container.find(card_item).addClass('animated '+animation_in);
				
				$(card_items).addClass('hidden');
				
				$(card_item).removeClass('hidden');
				$(card_item).addClass('active');
			}
		}
		/* if mobile */
		if((width < 1024) & $('#home-card').length) {

			/* scroll to section */
			$('body,html').animate({
				scrollTop: h - 76
			}, 800);
		}
		return false;
	});

	$(window).on('resize', function(){
		var width = $(window).width();
		var height = $(window).height();

		if((width < 1024)) {
			$('.card-inner').removeClass('hidden');
			$('.card-inner').removeClass('fadeOutLeft');
			$('.card-inner').removeClass('rotateOutUpLeft');
			$('.card-inner').removeClass('rollOut');
			$('.card-inner').removeClass('jackOutTheBox');
			$('.card-inner').removeClass('fadeOut');
			$('.card-inner').removeClass('fadeOutUp');
			$('.card-inner').removeClass('animated');

			$(window).on('scroll', function(){
				var scrollPos = $(window).scrollTop();
				$('.top-menu ul li a').each(function () {
					var currLink = $(this);
					var refElement = $(currLink.attr("href"));
					if (refElement.offset().top - 76 <= scrollPos) {
						$('.top-menu ul li').removeClass("active");
						currLink.closest('li').addClass("active");
					}
				});
			});

			$('.card-inner .card-wrap').slimScroll({destroy: true});
			$('.card-inner .card-wrap').attr('style', '');
		}
		else {
			$($('.top-menu li.active a').attr('href')).addClass('active');
			if((!$('.page').hasClass('new-skin')) && (width > 1024)) {
				$('.card-inner .card-wrap').slimScroll({
					height: '570px'
				});
			}
		}
	});
	
	
	/*
		Smoothscroll
	*/
	
	if((width < 1024) & $('#home-card').length) { 
		$(window).on('scroll', function(){
			var scrollPos = $(window).scrollTop();
			$('.top-menu ul li a').each(function () {
				var currLink = $(this);
				var refElement = $(currLink.attr("href"));
				if (refElement.offset().top - 76 <= scrollPos) {
					$('.top-menu ul li').removeClass("active");
					currLink.closest('li').addClass("active");
				}
			});
		});
	}
	
	
	/*
		slimScroll
	*/
	
	if((!$('.page').hasClass('new-skin')) && (width > 1024)) {
		$('.card-inner .card-wrap').slimScroll({
			height: '570px'
		});
	}
	
	
	/*
		Filter items on button click
	*/
	$('.filter-button-group').on( 'click', '.f_btn', function() {
		var filterValue = $(this).find('input').val();
		$container.isotope({ filter: '.'+filterValue });
		$('.filter-button-group .f_btn').removeClass('active');
		$(this).addClass('active');
	});

	/*
		New JS
	*/

	$(window).on('resize', function(){
		/*
			Dotted Skills Line On Resize Window
		*/

		var skills_dotted = $('.skills-list.dotted .progress');
		var skills_dotted_w = skills_dotted.width();
		if(skills_dotted.length){
			skills_dotted.find('.percentage .da').css({'width':skills_dotted_w+1});
		}

		/*
			Testimonials Carousel On Resize Window
		*/

		var revs_slider = $(".revs-carousel .owl-carousel");
		revs_slider.find('.revs-item').css({'max-width':revs_slider.width()});
	});

	/*
		Dotted Skills Line
	*/

	function skills(){
		var skills_dotted = $('.skills-list.dotted .progress');
		var skills_dotted_w = skills_dotted.width();
		if(skills_dotted.length){
			skills_dotted.append('<span class="dg"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span>');
			skills_dotted.find('.percentage').append('<span class="da"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span>');
			skills_dotted.find('.percentage .da').css({'width':skills_dotted_w});
		}
	}
	setTimeout(skills, 1000);

	/*
		Circle Skills Line
	*/

	var skills_circles = $('.skills-list.circles .progress');
	if(skills_circles.length){
		skills_circles.append('<div class="slice"><div class="bar"></div><div class="fill"></div></div>');
	}

	/*
		Wrap First Title Word
	*/

	$('.content .title').each(function(index) {
	    var title = $(this).text().split(' ');
	    if(title.length>1){
		    var firstWord = title[0];
		    var replaceWord = '<span class="first-word">' + firstWord + '</span>';
		    var newString = $(this).html().replace(firstWord, replaceWord);
		    $(this).html(newString);
		} else {
			$(this).html('<div class="first-letter">'+ $(this).html() + '</div>');
		}
	});

});
