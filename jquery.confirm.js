(function($){

	"use strict";

	var pluginName = 'confirm';

	/* Enter PluginOptions */
	$[pluginName+'Default'] = {
		debug: true,
		enabled: true,
		reload: false,
		container: window,
		template: null,
		title: 'Sind Sie sicher?',
		content: 'Bitte bestätigen Sie ihre Aktion mit OK, oder brechen Sie die Aktion ab mit Abbrechen.',
		button_accept: 'OK',
		button_abort: 'Abbrechen',
		on: 'click',
		input: false,
		keys: {
			// ok: 13,
			abort: 27
		},
    url: null,
    ajaxOptions: {
    	method: 'POST'
    },
    lazyLoad: false,
    removeOnClose: false,

		modalClass: 'modal',

		keep_modal: false,
		custom_buttons: null,
		open: function(){},
		button_pressed: function(){},
		close: function(){},
		defaultAction: function(){},
		accept: function(){},
		abort: function(){},
		createForm: false
	};

	var PluginClass = function() {

		var selfObj = this,
				img = null;
		this.item = false;
		this.modal = null;
		this.isHTML = false;

		this.global = {};

		this.initOptions = new Object($.confirmDefault);

		this.init = function(elem) {
			var reload = arguments[1]||false;
			selfObj = this;

			if(selfObj.reload && selfObj.modal !== null && selfObj.modal.length) {
				selfObj.modal.remove();
				selfObj.template = null;
			}

			if(!this.container)
				this.container = window;
			this.container = $(this.container);

			this.elem = elem;
			this.item = $(this.elem);
			this.isHTML = selfObj.item[0].tagName.toLowerCase() === 'html';

			if(!selfObj.enabled)
				return;

			if(selfObj.url === null && !selfObj.lazyLoad) {
				selfObj.createTemplate();
				selfObj.addModal();
			} else if(selfObj.lazyLoad) {
				selfObj.loaded();
			} else {
				$.ajax($.extend(selfObj.ajaxOptions,{
					url: selfObj.url,
					success: function(content) {
						selfObj.createTemplate(content);
						selfObj.addModal();
					}
				}));
			}
		};

		this.addModal = function() {
			selfObj.modal = $(selfObj.template).appendTo('body');
			selfObj.modal.unbind('click').click(function(e){
				e.preventDefault();
				e.stopPropagation();
			}).children().unbind('click').click(function(e){
				e.stopPropagation();
			});

			selfObj.modal.find('a').unbind('click').click(function(e){
				var $el = $(this),
						customData = $el.data('custom');
				e.stopPropagation();

				if(
					selfObj.custom_buttons !== undefined &&
					customData !== undefined &&
					selfObj.custom_buttons[customData] !== undefined
				) {
					if(typeof selfObj.custom_buttons[customData].callback === 'function')
						selfObj.custom_buttons[customData].callback($el,selfObj.custom_buttons[customData],selfObj);
					if(selfObj.custom_buttons[customData].keep_modal === undefined)
						selfObj.modal.removeClass('open');
				}
			});

			selfObj.modal.find('.ui-modal-button').click(function(e){
				var $el = $(this);

				selfObj.button_pressed($el,selfObj);

				if($el.is('.ui-modal-ok')) {
					selfObj.inner_accept();
				}

				if($el.is('.ui-modal-abort')) {
					selfObj.inner_abort();
				}
			});

			selfObj.modal.find('.ui-modal-close').click(function(){
				selfObj.button_pressed($(this),selfObj);
				selfObj.inner_abort();
			});

			this.loaded();
		}

		this.createTemplate = function() {
			var extraContent = arguments[0]||'';
			if(!selfObj.template) {
				selfObj.template = '<div class="ui-modal '+selfObj.modalClass+'" tabindex="1">';
					selfObj.template += '<div tabindex="3" class="ui-modal-close"></div>';
					selfObj.template += '<div class="ui-modal-inner inner">';
						selfObj.template += '<div class="ui-modal-header">';
							selfObj.template += '<h2>'+selfObj.title+'</h2>';
							selfObj.template += '<p>'+selfObj.content+'</p>';
						selfObj.template += '</div>';
							if(selfObj.input && typeof selfObj.createForm === 'function') {
								extraContent += selfObj.createForm(selfObj);
							} else if(selfObj.input) {
								extraContent += '<input type="text" name="confirm_input">';
							}

							if(extraContent) {
								selfObj.template += '<div class="ui-modal-content">';
									selfObj.template += extraContent;
								selfObj.template += '</div>';
							}

							selfObj.template += '<div class="ui-modal-buttons">'
								if(selfObj.button_accept) selfObj.template += '<div class="ui-modal-button ui-modal-ok">'+selfObj.button_accept+'</div>'
								if(selfObj.button_abort) selfObj.template += '<div class="ui-modal-button ui-modal-abort">'+selfObj.button_abort+'</div>'
								if(selfObj.custom_buttons)
									for(var button in selfObj.custom_buttons) {
										selfObj.template += '<div class="ui-modal-button-custom ui-modal-custom-'+button+'">';
											if(selfObj.custom_buttons[button].link !== undefined) selfObj.template += '<a data-custom="'+button+'" href="'+selfObj.custom_buttons[button].link+'"'+(selfObj.custom_buttons[button].target?' target="'+selfObj.custom_buttons[button].target+'"':'')+'>';
											selfObj.template += selfObj.custom_buttons[button].title;
											if(selfObj.custom_buttons[button].link !== undefined) selfObj.template += '</a>';
										selfObj.template += '</div>'
									}
						selfObj.template += '</div>';
					selfObj.template += '</div>';
				selfObj.template += '</div>';
			}
		};

		this.inner_accept = function() {
			selfObj.accept(selfObj);
			if(!selfObj.keep_modal) {
				selfObj.modal.removeClass('open');
				if(selfObj.item.prop('tagName').toLowerCase() === 'html' || selfObj.removeOnClose) {
					setTimeout(function() {
						selfObj.template = '';
						selfObj.modal.remove();
					},500);
				}
			}
		};

		this.inner_abort = function() {
			$('body').unbind('confirm.keyup');
			selfObj.abort(selfObj);
			selfObj.modal.removeClass('open');
			if(selfObj.item.prop('tagName').toLowerCase() === 'html' || selfObj.removeOnClose) {
				setTimeout(function() {
					selfObj.template = '';
					selfObj.modal.remove();
				},500);
			}
		}

		this.inner_open = function() {
			$('body').on('confirm.keyup',function(e,keyupEvent) {
				switch(parseInt(keyupEvent.which,10)) {
					case selfObj.keys.ok:
						selfObj.inner_accept();
					break;
					case selfObj.keys.abort:
						selfObj.inner_abort();
					break;
				}
			}).keyup(function(e){
				$(this).trigger('confirm.keyup',e);
			});
			selfObj.open(selfObj);
			selfObj.modal.addClass('open');
		}

		this.disable = function() {
			clearTimeout(selfObj.scrollTimeOut);
			selfObj.enabled = false;
		};

		this.enable = function() {
			selfObj.enabled = true;
		};

		this.loaded = function() {
			if(!selfObj.enabled)
				return;

			if(selfObj.lazyLoad && selfObj.url !== null) {
				selfObj.item.unbind(selfObj.on).bind(selfObj.on,function(e){
					$.ajax($.extend(selfObj.ajaxOptions,{
						url: selfObj.url,
						success: function(content) {
							selfObj.createTemplate(content);
							selfObj.addModal();
							$('.ui-modal').removeClass('open');
							selfObj.inner_open();
						}
					}));
				});
			} else if(selfObj.lazyLoad && selfObj.url === null && !this.isHTML) {
				selfObj.item.unbind(selfObj.on).bind(selfObj.on,function(e){
					selfObj.createTemplate();
					selfObj.addModal();
					$('.ui-modal').removeClass('open');
					selfObj.inner_open();
				});
			} else {
				selfObj.modalHandlers();
			}
		};

		this.modalHandlers = function() {
			if(!this.isHTML) {
				selfObj.item.unbind(selfObj.on).bind(selfObj.on,function(e){
					e.preventDefault();
					selfObj.defaultAction(e,this,selfObj);

					$('.ui-modal').removeClass('open');
					selfObj.inner_open();
				});
			} else {
				$('.ui-modal').removeClass('open');
				selfObj.inner_open();
			}
		};


	};

	$[pluginName] = $.fn[pluginName] = function(settings) {
		var element = typeof this === 'function'?$('html'):this,
				newData = arguments[1]||{},
				returnElement = [];

		returnElement[0] = element.each(function(k,i) {
			var pluginClass = $.data(this, pluginName);

			if(!settings || typeof settings === 'object' || settings === 'init') {

				if(!pluginClass) {
					if(settings === 'init')
						settings = arguments[1] || {};
					pluginClass = new PluginClass();

					var newOptions = new Object(pluginClass.initOptions);

					if(settings)
						newOptions = $.extend(true,{},newOptions,settings);
					pluginClass = $.extend(newOptions,pluginClass);

					/** Initialisieren. */
					pluginClass.init(this);
					if(element.prop('tagName').toLowerCase() !== 'html')
						$.data(this, pluginName, pluginClass);
				} else {
					pluginClass.init(this,1);
					if(element.prop('tagName').toLowerCase() !== 'html')
						$.data(this, pluginName, pluginClass);
				}
			} else if(!pluginClass) {
				return;
			} else if(pluginClass[settings]) {
				var method = settings;
				returnElement[1] = pluginClass[method](newData);
			} else {
				return;
			}
		});

		if(returnElement[1] !== undefined) return returnElement[1];
		return returnElement[0];
	};
})(jQuery);
