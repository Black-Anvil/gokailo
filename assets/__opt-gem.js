console.log('gem-dev-1.03')



jQuery(function() {
	var $hero = jQuery('#m-1606328470873');
	var $module = jQuery('#m-1606328470873').children('.module');

	var mode = jQuery('.gryffeditor').hasClass('editing') ? 'dev' : 'production';
	var $heroLink = $hero.children('.hero-link');
	if (mode == 'dev' && $heroLink.length > 0) {
			$hero.children('.hero-link').hide();
	}
	if (mode == 'production' && $heroLink.length > 0) {
			$module.off('click.openLink').on('click.openLink', function(e) {
					var $target = jQuery(e.target);
					if ($target.length > 0) {
							var linkTarget = typeof $target.attr('href') !== "undefined" ? $target.attr('href') : "";
							if (linkTarget == "") {
									var link = typeof $heroLink.attr('href') !== "undefined" ? $heroLink.attr('href') : "";
									var newTab = typeof $heroLink.attr('target') !== "undefined" ? $heroLink.attr('target') : "";
									if (link != "") {
											if (newTab == "") {
													window.location.href = link;
											} else {
													window.open(link, newTab);
											}
									}
							}
					};
			})
	}

	var height = jQuery.trim($module.attr("data-height"));
	if (height == undefined || height == "") {
			$hero.css("height", "auto!important");
	} else {
			$hero.css("height", "inherit");
	}


	var effect = $module.attr('data-effect');
	var transition = $module.attr('data-transition');

	if (effect == 'effect-zoom') {
			$module.parent().addClass(effect);

			setTimeout(function() {
					var backgroundImage = $module.parent().css('background-image');
					var backgroundSize = $module.parent().css('background-size');
					var backgroundPosition = $module.parent().css('background-position');
					$module.siblings('.gf_hero-bg-wrap').css({
							'background-image': 'inherit',
							'background-size': 'inherit',
							'background-position': 'inherit',
							'-webkit-transition': 'transform ' + transition + 's ease-in-out',
							'-moz-transition': 'transform ' + transition + 's ease-in-out',
							'-ms-transition': 'transform ' + transition + 's ease-in-out',
							'-o-transition': 'transform ' + transition + 's ease-in-out',
							'transition': 'transform ' + transition + 's ease-in-out'
					})
					$module.siblings('.gf_hero-bg-wrap').children('.gf_hero-bg').css({
							'background-image': 'inherit',
							'background-size': 'inherit',
							'background-position': 'inherit',
							'-webkit-transition': 'transform ' + transition + 's ease-in-out',
							'-moz-transition': 'transform ' + transition + 's ease-in-out',
							'-ms-transition': 'transform ' + transition + 's ease-in-out',
							'-o-transition': 'transform ' + transition + 's ease-in-out',
							'transition': 'transform ' + transition + 's ease-in-out'
					});
			}, 300);
	} else {
			$module.parent().removeClass("effect-zoom");
	}

	if ($module.attr('data-fixedMode') == '1') {
			function changeImage() {
					var backgroundImage = $module.parent().css('background-image');
					if (backgroundImage) {
							backgroundImage = backgroundImage.replace('url(', '').replace(')', '').replace(/\"/gi, "");
							$module.find('.gf_hero-fixed').attr('src', backgroundImage);
							$module.parent().addClass('gf_hero-fixed-mode');
					}
			}
			changeImage();
			let windowWidth = jQuery(window).width();
			let timeoutResize = 0;
			jQuery(window).resize(function() {
					if (jQuery(window).width() == windowWidth) {
							return;
					}
					windowWidth = jQuery(window).width();

					if (timeoutResize) {
							clearTimeout(timeoutResize);
							timeoutResize = 0;
					}

					timeoutResize = window.setTimeout(function() {
							changeImage();
					}, 16);
			});
	} else {
			$module.parent().removeClass('gf_hero-fixed-mode');
	}
});




jQuery(function() {
	var $hero = jQuery('#m-1606327079173');
	var $module = jQuery('#m-1606327079173').children('.module');

	var mode = jQuery('.gryffeditor').hasClass('editing') ? 'dev' : 'production';
	var $heroLink = $hero.children('.hero-link');
	if (mode == 'dev' && $heroLink.length > 0) {
			$hero.children('.hero-link').hide();
	}
	if (mode == 'production' && $heroLink.length > 0) {
			$module.off('click.openLink').on('click.openLink', function(e) {
					var $target = jQuery(e.target);
					if ($target.length > 0) {
							var linkTarget = typeof $target.attr('href') !== "undefined" ? $target.attr('href') : "";
							if (linkTarget == "") {
									var link = typeof $heroLink.attr('href') !== "undefined" ? $heroLink.attr('href') : "";
									var newTab = typeof $heroLink.attr('target') !== "undefined" ? $heroLink.attr('target') : "";
									if (link != "") {
											if (newTab == "") {
													window.location.href = link;
											} else {
													window.open(link, newTab);
											}
									}
							}
					};
			})
	}

	var height = jQuery.trim($module.attr("data-height"));
	if (height == undefined || height == "") {
			$hero.css("height", "auto!important");
	} else {
			$hero.css("height", "inherit");
	}


	var effect = $module.attr('data-effect');
	var transition = $module.attr('data-transition');

	if (effect == 'effect-zoom') {
			$module.parent().addClass(effect);

			setTimeout(function() {
					var backgroundImage = $module.parent().css('background-image');
					var backgroundSize = $module.parent().css('background-size');
					var backgroundPosition = $module.parent().css('background-position');
					$module.siblings('.gf_hero-bg-wrap').css({
							'background-image': 'inherit',
							'background-size': 'inherit',
							'background-position': 'inherit',
							'-webkit-transition': 'transform ' + transition + 's ease-in-out',
							'-moz-transition': 'transform ' + transition + 's ease-in-out',
							'-ms-transition': 'transform ' + transition + 's ease-in-out',
							'-o-transition': 'transform ' + transition + 's ease-in-out',
							'transition': 'transform ' + transition + 's ease-in-out'
					})
					$module.siblings('.gf_hero-bg-wrap').children('.gf_hero-bg').css({
							'background-image': 'inherit',
							'background-size': 'inherit',
							'background-position': 'inherit',
							'-webkit-transition': 'transform ' + transition + 's ease-in-out',
							'-moz-transition': 'transform ' + transition + 's ease-in-out',
							'-ms-transition': 'transform ' + transition + 's ease-in-out',
							'-o-transition': 'transform ' + transition + 's ease-in-out',
							'transition': 'transform ' + transition + 's ease-in-out'
					});
			}, 300);
	} else {
			$module.parent().removeClass("effect-zoom");
	}

	if ($module.attr('data-fixedMode') == '1') {
			function changeImage() {
					var backgroundImage = $module.parent().css('background-image');
					if (backgroundImage) {
							backgroundImage = backgroundImage.replace('url(', '').replace(')', '').replace(/\"/gi, "");
							$module.find('.gf_hero-fixed').attr('src', backgroundImage);
							$module.parent().addClass('gf_hero-fixed-mode');
					}
			}
			changeImage();
			let windowWidth = jQuery(window).width();
			let timeoutResize = 0;
			jQuery(window).resize(function() {
					if (jQuery(window).width() == windowWidth) {
							return;
					}
					windowWidth = jQuery(window).width();

					if (timeoutResize) {
							clearTimeout(timeoutResize);
							timeoutResize = 0;
					}

					timeoutResize = window.setTimeout(function() {
							changeImage();
					}, 16);
			});
	} else {
			$module.parent().removeClass('gf_hero-fixed-mode');
	}
});


jQuery(function() {
	var $module = jQuery('#m-1606327079317').children('.module');
	$module.find('.video-popup').magnificPopup({
			type: 'iframe',
			iframe: {
					patterns: {
							youtube: {
									index: 'youtube.com/',
									id: function(url) {
											var id;
											if (url.indexOf('youtu.be/') != -1) {
													id = url.split('youtu.be/');
											} else {
													id = url.split(/watch\?v=/);
											}
											if (id && id[1] != undefined) {
													id = id[1].split(/&/)[0];
											}
											return id;
									},
									src: '//www.youtube.com/embed/%id%?autoplay=1'
							},
							youtu: {
									index: 'youtu.be/',
									id: function(url) {
											var id;
											if (url.indexOf('youtu.be/') != -1) {
													id = url.split('youtu.be/');
											} else {
													id = url.split(/watch\?v=/);
											}
											if (id && id[1] != undefined) {
													id = id[1].split(/&/)[0];
											}
											return id;
									},
									src: '//www.youtube.com/embed/%id%?autoplay=1'
							},
							vimeo: {
									index: 'vimeo.com/',
									id: function(url) {
											var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
											if (!m || !m[5]) return null;
											return m[5];
									},
									src: '//player.vimeo.com/video/%id%?autoplay=1'
							}
					}
			}
	});
});


jQuery(function() {
	var $hero = jQuery('#m-1602261875907');
	var $module = jQuery('#m-1602261875907').children('.module');

	var mode = jQuery('.gryffeditor').hasClass('editing') ? 'dev' : 'production';
	var $heroLink = $hero.children('.hero-link');
	if (mode == 'dev' && $heroLink.length > 0) {
			$hero.children('.hero-link').hide();
	}
	if (mode == 'production' && $heroLink.length > 0) {
			$module.off('click.openLink').on('click.openLink', function(e) {
					var $target = jQuery(e.target);
					if ($target.length > 0) {
							var linkTarget = typeof $target.attr('href') !== "undefined" ? $target.attr('href') : "";
							if (linkTarget == "") {
									var link = typeof $heroLink.attr('href') !== "undefined" ? $heroLink.attr('href') : "";
									var newTab = typeof $heroLink.attr('target') !== "undefined" ? $heroLink.attr('target') : "";
									if (link != "") {
											if (newTab == "") {
													window.location.href = link;
											} else {
													window.open(link, newTab);
											}
									}
							}
					};
			})
	}

	var height = jQuery.trim($module.attr("data-height"));
	if (height == undefined || height == "") {
			$hero.css("height", "auto!important");
	} else {
			$hero.css("height", "inherit");
	}


	var effect = $module.attr('data-effect');
	var transition = $module.attr('data-transition');

	if (effect == 'effect-zoom') {
			$module.parent().addClass(effect);

			setTimeout(function() {
					var backgroundImage = $module.parent().css('background-image');
					var backgroundSize = $module.parent().css('background-size');
					var backgroundPosition = $module.parent().css('background-position');
					$module.siblings('.gf_hero-bg-wrap').css({
							'background-image': 'inherit',
							'background-size': 'inherit',
							'background-position': 'inherit',
							'-webkit-transition': 'transform ' + transition + 's ease-in-out',
							'-moz-transition': 'transform ' + transition + 's ease-in-out',
							'-ms-transition': 'transform ' + transition + 's ease-in-out',
							'-o-transition': 'transform ' + transition + 's ease-in-out',
							'transition': 'transform ' + transition + 's ease-in-out'
					})
					$module.siblings('.gf_hero-bg-wrap').children('.gf_hero-bg').css({
							'background-image': 'inherit',
							'background-size': 'inherit',
							'background-position': 'inherit',
							'-webkit-transition': 'transform ' + transition + 's ease-in-out',
							'-moz-transition': 'transform ' + transition + 's ease-in-out',
							'-ms-transition': 'transform ' + transition + 's ease-in-out',
							'-o-transition': 'transform ' + transition + 's ease-in-out',
							'transition': 'transform ' + transition + 's ease-in-out'
					});
			}, 300);
	} else {
			$module.parent().removeClass("effect-zoom");
	}

	if ($module.attr('data-fixedMode') == '1') {
			function changeImage() {
					var backgroundImage = $module.parent().css('background-image');
					if (backgroundImage) {
							backgroundImage = backgroundImage.replace('url(', '').replace(')', '').replace(/\"/gi, "");
							$module.find('.gf_hero-fixed').attr('src', backgroundImage);
							$module.parent().addClass('gf_hero-fixed-mode');
					}
			}
			changeImage();
			let windowWidth = jQuery(window).width();
			let timeoutResize = 0;
			jQuery(window).resize(function() {
					if (jQuery(window).width() == windowWidth) {
							return;
					}
					windowWidth = jQuery(window).width();

					if (timeoutResize) {
							clearTimeout(timeoutResize);
							timeoutResize = 0;
					}

					timeoutResize = window.setTimeout(function() {
							changeImage();
					}, 16);
			});
	} else {
			$module.parent().removeClass('gf_hero-fixed-mode');
	}
});




jQuery(function() {
	var $hero = jQuery('#m-1601827465556');
	var $module = jQuery('#m-1601827465556').children('.module');

	var mode = jQuery('.gryffeditor').hasClass('editing') ? 'dev' : 'production';
	var $heroLink = $hero.children('.hero-link');
	if (mode == 'dev' && $heroLink.length > 0) {
			$hero.children('.hero-link').hide();
	}
	if (mode == 'production' && $heroLink.length > 0) {
			$module.off('click.openLink').on('click.openLink', function(e) {
					var $target = jQuery(e.target);
					if ($target.length > 0) {
							var linkTarget = typeof $target.attr('href') !== "undefined" ? $target.attr('href') : "";
							if (linkTarget == "") {
									var link = typeof $heroLink.attr('href') !== "undefined" ? $heroLink.attr('href') : "";
									var newTab = typeof $heroLink.attr('target') !== "undefined" ? $heroLink.attr('target') : "";
									if (link != "") {
											if (newTab == "") {
													window.location.href = link;
											} else {
													window.open(link, newTab);
											}
									}
							}
					};
			})
	}

	var height = jQuery.trim($module.attr("data-height"));
	if (height == undefined || height == "") {
			$hero.css("height", "auto!important");
	} else {
			$hero.css("height", "inherit");
	}


	var effect = $module.attr('data-effect');
	var transition = $module.attr('data-transition');

	if (effect == 'effect-zoom') {
			$module.parent().addClass(effect);

			setTimeout(function() {
					var backgroundImage = $module.parent().css('background-image');
					var backgroundSize = $module.parent().css('background-size');
					var backgroundPosition = $module.parent().css('background-position');
					$module.siblings('.gf_hero-bg-wrap').css({
							'background-image': 'inherit',
							'background-size': 'inherit',
							'background-position': 'inherit',
							'-webkit-transition': 'transform ' + transition + 's ease-in-out',
							'-moz-transition': 'transform ' + transition + 's ease-in-out',
							'-ms-transition': 'transform ' + transition + 's ease-in-out',
							'-o-transition': 'transform ' + transition + 's ease-in-out',
							'transition': 'transform ' + transition + 's ease-in-out'
					})
					$module.siblings('.gf_hero-bg-wrap').children('.gf_hero-bg').css({
							'background-image': 'inherit',
							'background-size': 'inherit',
							'background-position': 'inherit',
							'-webkit-transition': 'transform ' + transition + 's ease-in-out',
							'-moz-transition': 'transform ' + transition + 's ease-in-out',
							'-ms-transition': 'transform ' + transition + 's ease-in-out',
							'-o-transition': 'transform ' + transition + 's ease-in-out',
							'transition': 'transform ' + transition + 's ease-in-out'
					});
			}, 300);
	} else {
			$module.parent().removeClass("effect-zoom");
	}

	if ($module.attr('data-fixedMode') == '1') {
			function changeImage() {
					var backgroundImage = $module.parent().css('background-image');
					if (backgroundImage) {
							backgroundImage = backgroundImage.replace('url(', '').replace(')', '').replace(/\"/gi, "");
							$module.find('.gf_hero-fixed').attr('src', backgroundImage);
							$module.parent().addClass('gf_hero-fixed-mode');
					}
			}
			changeImage();
			let windowWidth = jQuery(window).width();
			let timeoutResize = 0;
			jQuery(window).resize(function() {
					if (jQuery(window).width() == windowWidth) {
							return;
					}
					windowWidth = jQuery(window).width();

					if (timeoutResize) {
							clearTimeout(timeoutResize);
							timeoutResize = 0;
					}

					timeoutResize = window.setTimeout(function() {
							changeImage();
					}, 16);
			});
	} else {
			$module.parent().removeClass('gf_hero-fixed-mode');
	}
});



jQuery(function() {
	var $hero = jQuery('#m-1601826364534');
	var $module = jQuery('#m-1601826364534').children('.module');

	var mode = jQuery('.gryffeditor').hasClass('editing') ? 'dev' : 'production';
	var $heroLink = $hero.children('.hero-link');
	if (mode == 'dev' && $heroLink.length > 0) {
			$hero.children('.hero-link').hide();
	}
	if (mode == 'production' && $heroLink.length > 0) {
			$module.off('click.openLink').on('click.openLink', function(e) {
					var $target = jQuery(e.target);
					if ($target.length > 0) {
							var linkTarget = typeof $target.attr('href') !== "undefined" ? $target.attr('href') : "";
							if (linkTarget == "") {
									var link = typeof $heroLink.attr('href') !== "undefined" ? $heroLink.attr('href') : "";
									var newTab = typeof $heroLink.attr('target') !== "undefined" ? $heroLink.attr('target') : "";
									if (link != "") {
											if (newTab == "") {
													window.location.href = link;
											} else {
													window.open(link, newTab);
											}
									}
							}
					};
			})
	}

	var height = jQuery.trim($module.attr("data-height"));
	if (height == undefined || height == "") {
			$hero.css("height", "auto!important");
	} else {
			$hero.css("height", "inherit");
	}


	var effect = $module.attr('data-effect');
	var transition = $module.attr('data-transition');

	if (effect == 'effect-zoom') {
			$module.parent().addClass(effect);

			setTimeout(function() {
					var backgroundImage = $module.parent().css('background-image');
					var backgroundSize = $module.parent().css('background-size');
					var backgroundPosition = $module.parent().css('background-position');
					$module.siblings('.gf_hero-bg-wrap').css({
							'background-image': 'inherit',
							'background-size': 'inherit',
							'background-position': 'inherit',
							'-webkit-transition': 'transform ' + transition + 's ease-in-out',
							'-moz-transition': 'transform ' + transition + 's ease-in-out',
							'-ms-transition': 'transform ' + transition + 's ease-in-out',
							'-o-transition': 'transform ' + transition + 's ease-in-out',
							'transition': 'transform ' + transition + 's ease-in-out'
					})
					$module.siblings('.gf_hero-bg-wrap').children('.gf_hero-bg').css({
							'background-image': 'inherit',
							'background-size': 'inherit',
							'background-position': 'inherit',
							'-webkit-transition': 'transform ' + transition + 's ease-in-out',
							'-moz-transition': 'transform ' + transition + 's ease-in-out',
							'-ms-transition': 'transform ' + transition + 's ease-in-out',
							'-o-transition': 'transform ' + transition + 's ease-in-out',
							'transition': 'transform ' + transition + 's ease-in-out'
					});
			}, 300);
	} else {
			$module.parent().removeClass("effect-zoom");
	}

	if ($module.attr('data-fixedMode') == '1') {
			function changeImage() {
					var backgroundImage = $module.parent().css('background-image');
					if (backgroundImage) {
							backgroundImage = backgroundImage.replace('url(', '').replace(')', '').replace(/\"/gi, "");
							$module.find('.gf_hero-fixed').attr('src', backgroundImage);
							$module.parent().addClass('gf_hero-fixed-mode');
					}
			}
			changeImage();
			let windowWidth = jQuery(window).width();
			let timeoutResize = 0;
			jQuery(window).resize(function() {
					if (jQuery(window).width() == windowWidth) {
							return;
					}
					windowWidth = jQuery(window).width();

					if (timeoutResize) {
							clearTimeout(timeoutResize);
							timeoutResize = 0;
					}

					timeoutResize = window.setTimeout(function() {
							changeImage();
					}, 16);
			});
	} else {
			$module.parent().removeClass('gf_hero-fixed-mode');
	}
});


jQuery(function() {
	var $module = jQuery('#m-1602262019387').children('.module');
	$module.find('.video-popup').magnificPopup({
			type: 'iframe',
			iframe: {
					patterns: {
							youtube: {
									index: 'youtube.com/',
									id: function(url) {
											var id;
											if (url.indexOf('youtu.be/') != -1) {
													id = url.split('youtu.be/');
											} else {
													id = url.split(/watch\?v=/);
											}
											if (id && id[1] != undefined) {
													id = id[1].split(/&/)[0];
											}
											return id;
									},
									src: '//www.youtube.com/embed/%id%?autoplay=1'
							},
							youtu: {
									index: 'youtu.be/',
									id: function(url) {
											var id;
											if (url.indexOf('youtu.be/') != -1) {
													id = url.split('youtu.be/');
											} else {
													id = url.split(/watch\?v=/);
											}
											if (id && id[1] != undefined) {
													id = id[1].split(/&/)[0];
											}
											return id;
									},
									src: '//www.youtube.com/embed/%id%?autoplay=1'
							},
							vimeo: {
									index: 'vimeo.com/',
									id: function(url) {
											var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
											if (!m || !m[5]) return null;
											return m[5];
									},
									src: '//player.vimeo.com/video/%id%?autoplay=1'
							}
					}
			}
	});
});



jQuery(function() {
	try {
			var $module = jQuery('#m-1601575922807').children('.module');
			var navspeed = $module.data('navspeed'),
					autoplaytimeout = $module.data('autoplaytimeout'),
					autoplayhoverpause = $module.data('autoplayhoverpause'),
					navlg = $module.data('navlg'),
					navmd = $module.data('navmd'),
					navsm = $module.data('navsm'),
					navxs = $module.data('navxs'),
					collg = $module.data('collg'),
					colmd = $module.data('colmd'),
					colsm = $module.data('colsm'),
					colxs = $module.data('colxs'),
					dotslg = $module.data('dotslg'),
					dotsmd = $module.data('dotsmd'),
					dotssm = $module.data('dotssm'),
					dotsxs = $module.data('dotsxs'),
					marginlg = parseInt($module.data('marginlg')),
					marginmd = parseInt($module.data('marginmd')),
					marginsm = parseInt($module.data('marginsm')),
					marginxs = parseInt($module.data('marginxs'));

			var mode = jQuery('.gryffeditor').hasClass('editing') ? 'dev' : 'production';
			if (mode == 'production') {
					var autoplay = $module.data('autoplay'),
							loop = $module.data('loop');
			} else {
					var autoplay = 0,
							loop = 0;
			}

			var initCarousel = function() {
					$module.owlCarousel({
							mouseDrag: false,
							autoplayHoverPause: autoplayhoverpause,
							autoplay: autoplay,
							autoplaySpeed: navspeed,
							autoplayTimeout: autoplaytimeout,
							loop: loop,
							navSpeed: navspeed,
							autoWidth: !1,
							responsiveClass: true,
							responsive: {
									0: {
											items: colxs,
											nav: navxs,
											dots: dotsxs,
											margin: marginxs
									},
									768: {
											items: colsm,
											nav: navsm,
											dots: dotssm,
											margin: marginsm
									},
									992: {
											items: colmd,
											nav: navmd,
											dots: dotsmd,
											margin: marginmd
									},
									1200: {
											items: collg,
											nav: navlg,
											dots: dotslg,
											margin: marginlg
									}
							},
							onInitialized: function() {
									$module.closest('.module-wrap[data-label="Carousel"]').addClass('gf-carousel-loaded');
							}
					});
			}

			// Fix nested carousel bug	
			if ($module.parent().parent().closest('.module-wrap[data-label="Carousel"]').length > 0) {
					setTimeout(function() {
							initCarousel();
					}, 300)
			} else {
					initCarousel();
			}
	} catch (err) {}
});




jQuery(function() {
	try {
			var $module = jQuery('#m-1602614640391').children('.module');
			var navspeed = $module.data('navspeed'),
					autoplaytimeout = $module.data('autoplaytimeout'),
					autoplayhoverpause = $module.data('autoplayhoverpause'),
					navlg = $module.data('navlg'),
					navmd = $module.data('navmd'),
					navsm = $module.data('navsm'),
					navxs = $module.data('navxs'),
					collg = $module.data('collg'),
					colmd = $module.data('colmd'),
					colsm = $module.data('colsm'),
					colxs = $module.data('colxs'),
					dotslg = $module.data('dotslg'),
					dotsmd = $module.data('dotsmd'),
					dotssm = $module.data('dotssm'),
					dotsxs = $module.data('dotsxs'),
					marginlg = parseInt($module.data('marginlg')),
					marginmd = parseInt($module.data('marginmd')),
					marginsm = parseInt($module.data('marginsm')),
					marginxs = parseInt($module.data('marginxs'));

			var mode = jQuery('.gryffeditor').hasClass('editing') ? 'dev' : 'production';
			if (mode == 'production') {
					var autoplay = $module.data('autoplay'),
							loop = $module.data('loop');
			} else {
					var autoplay = 0,
							loop = 0;
			}

			var initCarousel = function() {
					$module.owlCarousel({
							mouseDrag: false,
							autoplayHoverPause: autoplayhoverpause,
							autoplay: autoplay,
							autoplaySpeed: navspeed,
							autoplayTimeout: autoplaytimeout,
							loop: loop,
							navSpeed: navspeed,
							autoWidth: !1,
							responsiveClass: true,
							responsive: {
									0: {
											items: colxs,
											nav: navxs,
											dots: dotsxs,
											margin: marginxs
									},
									768: {
											items: colsm,
											nav: navsm,
											dots: dotssm,
											margin: marginsm
									},
									992: {
											items: colmd,
											nav: navmd,
											dots: dotsmd,
											margin: marginmd
									},
									1200: {
											items: collg,
											nav: navlg,
											dots: dotslg,
											margin: marginlg
									}
							},
							onInitialized: function() {
									$module.closest('.module-wrap[data-label="Carousel"]').addClass('gf-carousel-loaded');
							}
					});
			}

			// Fix nested carousel bug	
			if ($module.parent().parent().closest('.module-wrap[data-label="Carousel"]').length > 0) {
					setTimeout(function() {
							initCarousel();
					}, 300)
			} else {
					initCarousel();
			}
	} catch (err) {}
});




jQuery(function() {
	var $module = jQuery('#m-1601661075818');
	var mode = jQuery('.gryffeditor').hasClass('editing') ? 'dev' : 'production';
	$module.css({
			'height': 'auto'
	});
	jQuery(window).resize(function() {
			$module.css('height', 'auto');
	});
	$module.children('.module').removeClass('full-height');

	var image = $module.children('.module').data('image') || '';
	if ($module.children('.module').data('speed') || $module.children('.module').data('speed') == 0) {
			var speed = parseFloat($module.children('.module').data('speed'));
	} else {
			var speed = 0.2;
	}
	if ($module.data('gfv3parallax') != undefined) {
			$module.removeData('gfv3parallax');
	}
	$module.gfV3Parallax({
			'image': image,
			'speed': speed,
			'mode': mode
	});
	if (mode == 'dev') {
			var moduleId = "1601661075818";
			var moduleIdSlug = moduleId.toString().replace(/-/g, '');
			if (moduleIdSlug == "1601661075818") {
					window.getParallax1601661075818 = function() {
							return $module.data('gfv3parallax');
					}
			}
	}
});


jQuery(function() {
	var $module = jQuery('#m-1601661219783').children('.module');
	$module.find('.video-popup').magnificPopup({
			type: 'iframe',
			iframe: {
					patterns: {
							youtube: {
									index: 'youtube.com/',
									id: function(url) {
											var id;
											if (url.indexOf('youtu.be/') != -1) {
													id = url.split('youtu.be/');
											} else {
													id = url.split(/watch\?v=/);
											}
											if (id && id[1] != undefined) {
													id = id[1].split(/&/)[0];
											}
											return id;
									},
									src: '//www.youtube.com/embed/%id%?autoplay=1'
							},
							youtu: {
									index: 'youtu.be/',
									id: function(url) {
											var id;
											if (url.indexOf('youtu.be/') != -1) {
													id = url.split('youtu.be/');
											} else {
													id = url.split(/watch\?v=/);
											}
											if (id && id[1] != undefined) {
													id = id[1].split(/&/)[0];
											}
											return id;
									},
									src: '//www.youtube.com/embed/%id%?autoplay=1'
							},
							vimeo: {
									index: 'vimeo.com/',
									id: function(url) {
											var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
											if (!m || !m[5]) return null;
											return m[5];
									},
									src: '//player.vimeo.com/video/%id%?autoplay=1'
							}
					}
			}
	});
});




jQuery(function() {
	try {
			var $module = jQuery('#m-1602619874520').children('.module');
			var navspeed = $module.data('navspeed'),
					autoplaytimeout = $module.data('autoplaytimeout'),
					autoplayhoverpause = $module.data('autoplayhoverpause'),
					navlg = $module.data('navlg'),
					navmd = $module.data('navmd'),
					navsm = $module.data('navsm'),
					navxs = $module.data('navxs'),
					collg = $module.data('collg'),
					colmd = $module.data('colmd'),
					colsm = $module.data('colsm'),
					colxs = $module.data('colxs'),
					dotslg = $module.data('dotslg'),
					dotsmd = $module.data('dotsmd'),
					dotssm = $module.data('dotssm'),
					dotsxs = $module.data('dotsxs'),
					marginlg = parseInt($module.data('marginlg')),
					marginmd = parseInt($module.data('marginmd')),
					marginsm = parseInt($module.data('marginsm')),
					marginxs = parseInt($module.data('marginxs'));

			var mode = jQuery('.gryffeditor').hasClass('editing') ? 'dev' : 'production';
			if (mode == 'production') {
					var autoplay = $module.data('autoplay'),
							loop = $module.data('loop');
			} else {
					var autoplay = 0,
							loop = 0;
			}

			var initCarousel = function() {
					$module.owlCarousel({
							mouseDrag: false,
							autoplayHoverPause: autoplayhoverpause,
							autoplay: autoplay,
							autoplaySpeed: navspeed,
							autoplayTimeout: autoplaytimeout,
							loop: loop,
							navSpeed: navspeed,
							autoWidth: !1,
							responsiveClass: true,
							responsive: {
									0: {
											items: colxs,
											nav: navxs,
											dots: dotsxs,
											margin: marginxs
									},
									768: {
											items: colsm,
											nav: navsm,
											dots: dotssm,
											margin: marginsm
									},
									992: {
											items: colmd,
											nav: navmd,
											dots: dotsmd,
											margin: marginmd
									},
									1200: {
											items: collg,
											nav: navlg,
											dots: dotslg,
											margin: marginlg
									}
							},
							onInitialized: function() {
									$module.closest('.module-wrap[data-label="Carousel"]').addClass('gf-carousel-loaded');
							}
					});
			}

			// Fix nested carousel bug	
			if ($module.parent().parent().closest('.module-wrap[data-label="Carousel"]').length > 0) {
					setTimeout(function() {
							initCarousel();
					}, 300)
			} else {
					initCarousel();
			}
	} catch (err) {}
});



jQuery(function() {
	try {
			if (jQuery().gfV2Lazyload) {
					var $module = jQuery(window);
					$module.gfV2Lazyload({
							delay: 125
					})
			}
	} catch (err) {
			console.error(err)
	}
})

var gemFlag = !1;
for (var i = 0; i < pageLibs.length; i++) {
	if (pageLibs[i].indexOf('gfv3product.js') !== -1) {
			if (jQuery.gfV3Product == undefined) {
					gemFlag = !0;
					break
			}
	}
	if (pageLibs[i].indexOf('gfv3restabs.js') !== -1) {
			if (jQuery.gfV3ResTabs == undefined) {
					gemFlag = !0;
					break
			}
	}
	if (pageLibs[i].indexOf('gfaccordion.js') !== -1) {
			if (jQuery.gfAccordion == undefined) {
					gemFlag = !0;
					break
			}
	}
}
if (gemFlag) {
	console.log('aaaaqqqq7');
	var count = 0;
	for (var i = 0; i < pageLibs.length - 1; i++) {
			console.log('>>[1]>>' + pageLibs[pageLibs[i]]);
			jQuery.getScript(pageLibs[i], function() {
					count++;
					if (count == pageLibs.length - 1) {
							console.log('>>[2]>>' + pageLibs[pageLibs.length - 1]);
							jQuery.getScript(pageLibs[pageLibs.length - 1], function() {})
					}
			})
	}
}