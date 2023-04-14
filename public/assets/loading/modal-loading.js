/**
 * Modal Loading JavaScript Library
 * @author 						c
 * @date    					2017-11-06
 * @param  {window} 	global  
 * @param  {jQuery} 	$       
 * @param  {function} 	factory 
 * @return {void}         		
 * @version 1.0.0
 */
(function(window, $, factory) {

	window.Loading = factory(window, $);

})(window, jQuery, function(window, $) {

	var windowWidth;
	var windowHeight;

	/**
	 * æž„é€ Loading
	 * @author  				c
	 * @date 					2017-11-06
	 * @param {Object} options	æž„é€ Loadingçš„å…·ä½“å‚æ•°
	 * @return {Loading} 		Loadingå¯¹è±¡
	 */
	function Loading(options) {
		return new Loading.prototype._init($('body'), options);
	}

	/**
	 * åˆå§‹åŒ–å‡½æ•°
	 * @author  				c
	 * @date 					2017-11-06
	 * @param {Object} $this	jQueryå¯¹è±¡
	 * @param {Object} options	æž„é€ Loadingçš„å…·ä½“å‚æ•°
	 * @return {Loading} 		Loadingå¯¹è±¡
	 */
	const init = Loading.prototype._init = function($target, options) {
		
		this.version = '1.0.0';

		this.$target = $target;

		this.set = $.extend(true, {}, this.set, options);

		this._build();

		return this;

	};

	/**
	 * æž„å»ºLoading
	 * @return {void} 
	 */
	Loading.prototype._build = function() {

		this.$modalMask = $('<div class="modal-mask"></div>');

		this.$modalLoading = $('<div class="modal-loading"></div>');

		this.$loadingTitle = $('<p class="loading-title"></p>');

		this.$loadingAnimation = $('<div class="loading-animate"></div>');

		this.$animationOrigin = $('<div class="animate-origin"><span></span></div>');

		this.$animationImage = $('<img/>');

		this.$loadingDiscription = $('<p class="loading-discription"></p>');

		// zIndex
		if(this.set.zIndex <= 0) {
			this.set.zIndex = (this.$target.siblings().length-1 || this.$target.children().siblings().length) + 10001;
		}

		// var attr, value;
		// for(attr in this.set) {
		// 	if(attr !== 'zIndex' && attr !== 'animationDuration') {
		// 		value = this.set[attr];
		// 		if(typeof value === 'number') {
		// 			if(value <= 0) {
		// 				this.set[attr] = 'auto';
		// 			} else {
		// 				this.set[attr] = (value + this.set.unit);
		// 			}
		// 		}
		// 	}
		// }

		// æž„å»ºLoading
		this._buildMask();

		this._buildLoading();

		this._buildTitle();
		
		this._buildLoadingAnimation();
		
		this._buildDiscription();

		// æ˜¯å¦åˆå§‹åŒ–è¿‡
		this._init = false;

		if(this.set.defaultApply) {
			this.apply();
		}

	}

	/**
	 * æž„å»ºMask
	 * @return {void} 
	 */
	Loading.prototype._buildMask = function() {

		// å¦‚æžœä¸é€‚ç”¨é®ç½©å±‚
		if(!this.set.mask) {
			this.$modalMask.css({
				position: 	'absolute',
				top: 		'-200%',
			});
			return ;
		}

		// é®ç½©å±‚æ ·å¼
		this.$modalMask.css({
			backgroundColor: 	this.set.maskBgColor,
			zIndex: 			this.set.zIndex,
		});

		// æ·»åŠ é¢å¤–çš„class
		this.$modalMask.addClass(this.set.maskClassName);

	}

	/**
	 * æž„å»ºLoading
	 * @return {void} 
	 */
	Loading.prototype._buildLoading = function() {

		this.$modalLoading.css({
			width: 				this.set.loadingWidth,
			height: 			this.set.loadingHeight,
			padding: 			this.set.loadingPadding,
			backgroundColor: 	this.set.loadingBgColor,
			borderRadius: 		this.set.loadingBorderRadius,
		});

		// å¸ƒå±€æ–¹å¼
		if(this.set.direction === 'hor') {
			this.$modalLoading.addClass('modal-hor-layout');
		}

		// å°†loadingæ·»åŠ åˆ°maskä¸­
		this.$modalMask.append(this.$modalLoading);

	}

	/**
	 * æž„å»ºTitle
	 * @return {void} 
	 */
	Loading.prototype._buildTitle = function() {

		if(!this.set.title) {
			return ;
		}


		this.$loadingTitle.css({
			color: 		this.set.titleColor,
			fontSize: 	this.set.titleFontSize,
		});

		this.$loadingTitle.addClass(this.set.titleClassName);

		this.$loadingTitle.text(this.set.title);

		// å°†titleæ·»åŠ åˆ°loadingä¸­
		this.$modalLoading.append(this.$loadingTitle);

	}

	/**
	 * æž„å»ºLoadingAnimation
	 * @return {void} 
	 */
	Loading.prototype._buildLoadingAnimation = function() {

		// loadingAnimation
		this.$loadingAnimation.css({
			width: this.set.animationWidth,
			height: this.set.animationHeight,
		});

		if(this.set.loadingAnimation === 'origin') { // originåŠ¨ç”»
			this.$animationOrigin.children().css({
				width: this.set.animationOriginWidth,
				height: this.set.animationOriginHeight,
				backgroundColor: this.set.animationOriginColor,
			});
			for(var i = 0; i < 5; i++) {
				this.$loadingAnimation.append(this.$animationOrigin.clone());
			}
		} else if(this.set.loadingAnimation === 'image') { // å›¾ç‰‡åŠ è½½åŠ¨ç”»
			this.$animationImage.attr('src', this.set.animationSrc);
			this.$loadingAnimation.append(this.$animationImage);
		} //else {
		// 	throw new Error("[loadingAnimation] å‚æ•°é”™è¯¯. å‚æ•°å€¼åªèƒ½ä¸º['origin', 'image']");
		// }

		this.$loadingAnimation.addClass(this.set.animationClassName);

		// å°†loadingAnimationæ·»åŠ åˆ°loadingä¸­
		this.$modalLoading.append(this.$loadingAnimation);

	}

	/**
	 * æž„å»ºDiscription
	 * @return {void} 
	 */
	Loading.prototype._buildDiscription = function() {

		if(!this.set.discription) {
			return ;
		}

		this.$loadingDiscription.css({
			color: 		this.set.discriptionColor,
			fontSize: 	this.set.discriptionFontSize,
		});

		this.$loadingDiscription.addClass(this.set.discriptionClassName);

		this.$loadingDiscription.text(this.set.discription);

		// å°†titleæ·»åŠ åˆ°loadingä¸­
		this.$modalLoading.append(this.$loadingDiscription);

	}

	/**
	 * å®šä½
	 * @return {void} 
	 */
	Loading.prototype._position = function() {

		windowWidth = $(window).width();
		windowHeight = $(window).height(); 

		var loadingWidth = this.$modalLoading.outerWidth();
		var loadingHeight = this.$modalLoading.outerHeight();

		var x1 = windowWidth >>> 1;
		var x2 = loadingWidth >>> 1;
		var left = x1 - x2;

		var y1 = windowHeight >>> 1;
		var y2 = loadingHeight >>> 1;
		var top = y1 - y2;

		this.$modalLoading.css({ top, left });

	}

	/**
	 * å…¥å±è¿‡åº¦åŠ¨ç”»
	 * @return {void} 
	 */
	Loading.prototype._transitionAnimationIn = function() {

		if(!this.set.animationIn) {
			this.$modalMask.css({ display: 'block' });
		} else {
			// this.$modalMask.removeClass(this.set.animationOut).addClass(this.set.animationIn);
			this.$modalMask.addClass(this.set.animationIn);
		}
		
	}

	/**
	 * å‡ºå±è¿‡åº¦åŠ¨ç”»
	 * @return {void} 
	 */
	Loading.prototype._transitionAnimationOut = function() {

		
		if(!this.set.animationOut) {
			
			// this.$modalMask.css({ display: 'none' });
			this.$modalMask.remove();

		} else {
			
			this._timer && this._timer.clearTimeout(this._timer);

			this.$modalMask.removeClass(this.set.animationIn).addClass(this.set.animationOut);

			// this._timer = setTimeout(() => {
			// 	this.$modalMask.remove();
			// }, this.set.animationDuration);

			var self = this;

			this._timer = setTimeout(function() {
				self.$modalMask.remove();
			}, this.set.animationDuration);

		}
	}

	/**
	 * æ˜¾ç¤ºLoading
	 * @return {void} 
	 */
	Loading.prototype.apply = function() {
		this._transitionAnimationIn();

		// è¿™æ ·æŒ‰ç†è¯´å¯ä»¥å¢žåŠ æ€§èƒ½, å› ä¸ºä¸éœ€è¦ä»Žå†…å­˜ä¸­å¯»æ‰¾_initLoadingæ–¹æ³•.
		if(!this._init) {
			// åˆå§‹åŒ–Loading
			this._initLoading();
		}

	}

	/**
	 * éšè—Loading
	 * @return {void} 
	 */
	Loading.prototype.out = function() {
		this._transitionAnimationOut();
	}

	/**
	 * åˆå§‹åŒ–Loading
	 * @return {void} 
	 */
	Loading.prototype._initLoading = function() {

		// å·²ç»åˆå§‹è¿‡ æ— éœ€å†æ¬¡åˆå§‹åŒ–
		if(this._init) {
			return ;
		}

		// æ·»åŠ åˆ°é¡µé¢ä¸­
		this.$target.append(this.$modalMask);

		// å®šä½
		this._position();

		// $(window).resize(() => {
		// 	windowWidth = $(window).width();
		// 	windowHeight = $(window).height();
		// 	this._position();
		// });

		var self = this;
		
		$(window).resize(function() {
			windowWidth = $(window).width();
			windowHeight = $(window).height();
			self._position();
		});

		this._init = true;
	}

	/**
	 * Loadingå‚æ•°å±žæ€§
	 * å¯ä»¥ç®€å•çš„è®¾ç½®ä¸€äº›cssæ ·å¼, å¤æ‚çš„cssæ ·å¼å¯ä»¥é€šè¿‡å¢žåŠ classæ¥æ›´æ”¹æ ·å¼.
	 *
	 * åƒç´ å•ä½: å¦‚æžœæ˜¯å­—ç¬¦ä¸², åˆ™åŽŸæ–‡è®¾ç½®. å¦‚æžœæ˜¯æ•°å­—ç±»åž‹, é»˜è®¤å•ä½ä¸º{unit}. zIndexé™¤å¤–.
	 *
	 * å¦‚æžœå­—ä½“æ ·å¼ä¸ºundefined(ä¾‹å¦‚: titleFontFamily), é‚£ä¹ˆå°†ä¼šé€‚ç”¨å…¨å±€çš„å­—ä½“æ ·å¼(fontFamily)
	 * 
	 * @author  c
	 * @date 	2017-11-06
	 * @version 1.0.0
	 */
	Loading.prototype.set = {
		direction: 				'ver',	 					// æ–¹å‘. ver: åž‚ç›´, hor: æ°´å¹³.

		title: 					undefined, 					// æ ‡é¢˜å†…å®¹.
		titleColor: 			'#FFF', 					// æ ‡é¢˜æ–‡å­—é¢œè‰².
		titleFontSize: 			14, 						// æ ‡é¢˜æ–‡å­—å­—ä½“å¤§å°. 
		titleClassName: 		undefined,					// æ ‡é¢˜é¢å¤–çš„classå€¼.
		// titleFontFamily: 	undefined,					// æ ‡é¢˜å­—ä½“æ ·å¼
		
		discription: 			undefined, 					// æè¿°å†…å®¹.
		discriptionColor: 		'#FFF',						// æè¿°æ–‡å­—é¢œè‰².
		discriptionFontSize: 	14,							// æè¿°æ–‡å­—å­—ä½“å¤§å°. 
		discriptionClassName: 	undefined,					// æè¿°é¢å¤–çš„classå€¼.
		// directionFontFamily: undefined,					// æè¿°å­—ä½“æ ·å¼.

		loadingWidth: 			'auto',						// Loadingå®½åº¦.
		loadingHeight: 			'auto',						// Loadingé«˜åº¦.
		loadingPadding: 		20,							// Loadingå†…è¾¹è·.
		loadingBgColor: 		'#252525',					// LoadingèƒŒæ™¯é¢œè‰².
		loadingBorderRadius: 	12,							// Loadingçš„borderRadius.
		// loadingPosition: 		'fixed',					// Loadingçš„position

		mask: 					true, 						// é®ç½©å±‚. true: æ˜¾ç¤ºé®ç½©å±‚, false: ä¸æ˜¾ç¤º. 
		maskBgColor: 			'rgba(0, 0, 0, .6)',		// é®ç½©å±‚èƒŒæ™¯é¢œè‰².
		maskClassName: 			undefined,					// ä¸ºé®ç½©å±‚æ·»åŠ .
		// maskPosition: 			'fixed',					// é®ç½©å±‚position

		loadingAnimation: 		'origin',					// åŠ è½½åŠ¨ç”». origin: è¡¨ç¤ºä½¿ç”¨é»˜è®¤çš„åŽŸç‚¹åŠ¨ç”», image: è¡¨ç¤ºä½¿ç”¨è‡ªå®šä¹‰å›¾ç‰‡ä½œä¸ºåŠ è½½åŠ¨ç”».
		animationSrc: 			undefined,					// å›¾ç‰‡åŠ è½½åŠ¨ç”»çš„åœ°å€. (å‰æ: loadingAnimation=origin, ä»¥ä¸‹ç®€ç§°originæˆ–è€…image)
		animationWidth: 		40, 						// åŠ¨ç”»å®½åº¦. ä¸ºimageæ—¶è¡¨ç¤ºå›¾ç‰‡çš„å®½åº¦.
		animationHeight: 		40,							// åŠ¨ç”»é«˜åº¦. ä¸ºimageæ—¶è¡¨ç¤ºå›¾ç‰‡çš„é«˜åº¦.
		animationOriginWidth:   4,							// åŽŸç‚¹åŠ¨ç”»å®½åº¦.    (å‰æ: origin)
		animationOriginHeight:  4,							// åŽŸç‚¹åŠ¨ç”»é«˜åº¦.    (å‰æ: origin)
		animationOriginColor:   '#FFF',						// åŽŸç‚¹åŠ¨ç”»çš„é¢œè‰².  (å‰æ: origin)
		animationClassName: 	undefined,					// ä¸ºåŠ¨ç”»æ·»åŠ ä¸€ä¸ªé¢å¤–çš„classå€¼.
		
		defaultApply: 			true,						// é»˜è®¤è‡ªåŠ¨æ˜¾ç¤º.
		animationIn: 			'animated fadeIn', 			// å…¥å±åŠ¨ç”». 
		animationOut: 			'animated fadeOut',			// å‡ºå±åŠ¨ç”».
		animationDuration: 		1000,						// åŠ¨ç”»æŒç»­æ—¶é—´(å•ä½:ms)
		// fontFamily: 			'sans-serif',				// æ–‡å­—å­—ä½“æ ·å¼.
		// position: 				'fixed',				// å®šä½. maskå’Œloadingçš„å®šä½.
		// unit: 				'px', 						// è®¾ç½®é»˜è®¤å•ä½.
		zIndex: 				0,							// æœ€å¤–å›´å±‚çº§(mask). å¦‚æžœæ˜¯0æˆ–è€…è´Ÿæ•°, åˆ™ä¸º{$this.siblings() + 10001}.

	};

	init.prototype = Loading.prototype;

	return Loading;
});
