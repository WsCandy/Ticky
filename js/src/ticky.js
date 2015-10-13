;(function() {

	'use strict';

	var version = '1.0a',
		name = 'Ticky';

	$.fn.ticky = function(settings, params) {
		
		var results = [],
			ins;

		for(var i = 0; i < this.length; i++) {

			var self = $(this[i]);

			if(!self.data('ins')) {

				if(typeof settings === 'string' && console) {

					console.error('['+ name +' '+ version +'] - not running, try firing methods after initialisation'); 
					continue;

				}

				ins = new TickyCore(self, settings);
				ins.init();

				self.data('ins', ins);

			} else {

				ins = self.data('ins');

				if(ins.publicF[settings]) {

					if(this.length > 1) {

						results.push(ins.publicF[settings](params));

					} else {

						return ins.publicF[settings](params);
						
					}

				} else {

					if(console) {
					
						console.error('['+ name +' '+ version +'] - "'+ settings +'" is not a public method here\'s a nice list:');
						return ins.publicF;

					}

				}

			}

		}

		if(results.length >= 1) {
		
			return results;

		}

	};

	var TickyCore = function(self, settings) {

		var ins = this,
			mod = {},
			defaults = {
			    
                
                
			},
		options = $.extend(defaults, settings);
		
		var setUp = {

			init: function() {

				setUp.defineModules();

				if(!setUp.checks()) {

					return;
					
				}

				mod.elements.construct();
                
				setUp.bindings();

			},

			bindings: function() {

				

			},

			defineModules: function() {

				var modules = ['misc', 'dates', 'elements'];

				for(var module in modules) {

					if(modules.hasOwnProperty(module)) {

						mod[modules[module]] = new ins[modules[module]]();						

					}

				}

			},

			checks: function() {

				if(!self.is('input[type="text"]')) {

					mod.misc.report('warn', 'Please fire the plugin on an input[type="text"] element! - Shutting down... :(');
					return false;
					
				}

				return true;

			}

		};

		ins.publicF = {

            

		};

		ins.misc = function() {

			this.report = function(type, message) {

				if(console) {

					console[type]('['+ name +' '+ version +'] - ' + message);

				}

			};

		};

		ins.elements = function() {

			this.construct = function() {

				self.attr('readonly', true);

			};

		};

		ins.init = function() {

			setUp.init();

		};

	};

})();