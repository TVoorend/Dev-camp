(function(){
	var scrollTop 	= (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop,
  		el 			= document.body,
  		els 		= document.querySelectorAll('.meta'),
  		position 	= el.scrollTop,
  		oHeight 	= el.offsetHeight,
  		wHeight		= window.innerHeight,
  		$, $$;

  	var app = {
  		init: function() {
  			var self = this;

  			utils.init();
  			this.router();
            drag.init();
            drag.overlay();

  			document.addEventListener('gesturechange', self.scroll, false);
			document.addEventListener('scroll', self.scroll, false);
  		},

  		router: function() {
  			routie({
			    '/some-section': function() {
			    	section.toggle('some-section');
                    section.active('someSection');
				},
			    '/some-other-section': function(route) {
			    	section.toggle('some-other-section');
                    section.active('otherSection');
				}
			});
  		},

  		scroll: function() {
  			var scroll = el.scrollTop,
				i = 0,
				l = els.length;

			if (scroll > position && (scroll + wHeight) < oHeight && position > 0) {
				// scrolling Down
				for (;i < l;i++) {
				    els[i].classList.add('shrink');
				};
			} else {
				// scrolling Up
				for (;i < l;i++) {
				    els[i].classList.remove('shrink');
				};
			}
			position = scroll;
  		}
  	};

  	var section = {
  		toggle: function(section) {
  			console.log(section);

  		},
        active: function(section) {
            console.log(section);

            if (section == 'someSection') {
                jQuery(".page").removeClass("active");
                jQuery(".front-panel").addClass("active");
            }
            else if (section == "otherSection") {
                jQuery(".page").removeClass("active");
                jQuery(".back-panel").addClass("active");
            }
        }
  	};

  	// utilities object for common thingies
	var utils = {
		init: function() {
			// Shorthand selectors
			$  = this.selectElement,
			$$ = this.selectElements;
		},
		selectElement: function(el) {
			return document.querySelector(el);
		},
		selectElements: function(el) {
			return document.querySelectorAll(el);
		}
	};

    var drag = {
        init: function() {
            jQuery('.circle').draggable({ drag:function() {
                jQuery(".overlay").show().addClass("fadein");

            } });

            drag.overlay();
            jQuery( ".droppable" ).droppable({
                drop: function() {

                window.location = "" + jQuery(this).attr('id');
                jQuery(".overlay").hide().removeClass("fadein");

                //Add class instead
                jQuery('.circle').addClass('topLeftEmpty');
                
            }
            });
        },
	
	//Empty function	

    };

    app.init();

})();


