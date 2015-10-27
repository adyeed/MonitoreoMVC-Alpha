// bootstrap v3.3.5 (http://getbootstrap.com)
// affix, collapse, dropdown, modal, tab,  transition
if ( "undefined" == typeof jQuery )throw new Error ( "Bootstrap's JavaScript requires jQuery" );
+ function ( t ) {
	"use strict";
	var e = t.fn.jquery.split ( " " )[ 0 ].split ( "." );
	if ( e[ 0 ] < 2 && e[ 1 ] < 9 || 1 == e[ 0 ] && 9 == e[ 1 ] && e[ 2 ] < 1 )throw new Error ( "Bootstrap's JavaScript requires jQuery version 1.9.1 or higher" )
} ( jQuery ), + function ( t ) {
	"use strict";
	function e ( e ) {
		var i = e.attr ( "data-target" );
		i || (i = e.attr ( "href" ), i = i && /#[A-Za-z]/.test ( i ) && i.replace ( /.*(?=#[^\s]*$)/ , "" ));
		var n = i && t ( i );
		return n && n.length ? n : e.parent ()
	}
	
	function i ( i ) {
		i && 3 === i.which || (t ( o ).remove (), t ( s ).each ( function () {
			var n = t ( this ) , o = e ( n ) , s = { relatedTarget : this };
			o.hasClass ( "open" ) && (i && "click" == i.type && /input|textarea/i.test ( i.target.tagName ) && t.contains ( o[ 0 ] , i.target ) || (o.trigger ( i = t.Event ( "hide.bs.dropdown" , s ) ), i.isDefaultPrevented () || (n.attr ( "aria-expanded" , "false" ), o.removeClass ( "open" ).trigger ( "hidden.bs.dropdown" , s ))))
		} ))
	}
	
	function n ( e ) {
		return this.each ( function () {
			var i = t ( this ) , n = i.data ( "bs.dropdown" );
			n || i.data ( "bs.dropdown" , n = new a ( this ) ), "string" == typeof e && n[ e ].call ( i )
		} )
	}
	
	var o = ".dropdown-backdrop" , s = '[data-toggle="dropdown"]' , a = function ( e ) {t ( e ).on ( "click.bs.dropdown" , this.toggle )};
	a.VERSION = "3.3.5", a.prototype.toggle = function ( n ) {
		var o = t ( this );
		if ( ! o.is ( ".disabled, :disabled" ) ) {
			var s = e ( o ) , a = s.hasClass ( "open" );
			if ( i (), ! a ) {
				"ontouchstart"in document.documentElement && ! s.closest ( ".navbar-nav" ).length && t ( document.createElement ( "div" ) ).addClass ( "dropdown-backdrop" ).insertAfter ( t ( this ) ).on ( "click" , i );
				var r = { relatedTarget : this };
				if ( s.trigger ( n = t.Event ( "show.bs.dropdown" , r ) ), n.isDefaultPrevented () )return;
				o.trigger ( "focus" ).attr ( "aria-expanded" , "true" ), s.toggleClass ( "open" ).trigger ( "shown.bs.dropdown" , r )
			}
			return ! 1
		}
	}, a.prototype.keydown = function ( i ) {
		if ( /(38|40|27|32)/.test ( i.which ) && ! /input|textarea/i.test ( i.target.tagName ) ) {
			var n = t ( this );
			if ( i.preventDefault (), i.stopPropagation (), ! n.is ( ".disabled, :disabled" ) ) {
				var o = e ( n ) , a = o.hasClass ( "open" );
				if ( ! a && 27 != i.which || a && 27 == i.which )return 27 == i.which && o.find ( s ).trigger ( "focus" ), n.trigger ( "click" );
				var r = " li:not(.disabled):visible a" , d = o.find ( ".dropdown-menu" + r );
				if ( d.length ) {
					var l = d.index ( i.target );
					38 == i.which && l > 0 && l --, 40 == i.which && l < d.length - 1 && l ++, ~ l || (l = 0), d.eq ( l ).trigger ( "focus" )
				}
			}
		}
	};
	var r = t.fn.dropdown;
	t.fn.dropdown = n, t.fn.dropdown.Constructor = a, t.fn.dropdown.noConflict = function () {return t.fn.dropdown = r, this}, t ( document ).on ( "click.bs.dropdown.data-api" , i ).on ( "click.bs.dropdown.data-api" , ".dropdown form" , function ( t ) {t.stopPropagation ()} ).on ( "click.bs.dropdown.data-api" , s , a.prototype.toggle ).on ( "keydown.bs.dropdown.data-api" , s , a.prototype.keydown ).on ( "keydown.bs.dropdown.data-api" , ".dropdown-menu" , a.prototype.keydown )
} ( jQuery ), + function ( t ) {
	"use strict";
	function e ( e , n ) {
		return this.each ( function () {
			var o = t ( this ) , s = o.data ( "bs.modal" ) , a = t.extend ( {} , i.DEFAULTS , o.data () , "object" == typeof e && e );
			s || o.data ( "bs.modal" , s = new i ( this , a ) ), "string" == typeof e ? s[ e ] ( n ) : a.show && s.show ( n )
		} )
	}
	
	var i = function ( e , i ) {this.options = i, this.$body = t ( document.body ), this.$element = t ( e ), this.$dialog = this.$element.find ( ".modal-dialog" ), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = ! 1, this.options.remote && this.$element.find ( ".modal-content" ).load ( this.options.remote , t.proxy ( function () {this.$element.trigger ( "loaded.bs.modal" )} , this ) )};
	i.VERSION = "3.3.5", i.TRANSITION_DURATION = 300, i.BACKDROP_TRANSITION_DURATION = 150, i.DEFAULTS = {
		backdrop : ! 0 ,
		keyboard : ! 0 ,
		show     : ! 0
	}, i.prototype.toggle = function ( t ) {return this.isShown ? this.hide () : this.show ( t )}, i.prototype.show = function ( e ) {
		var n = this , o = t.Event ( "show.bs.modal" , { relatedTarget : e } );
		this.$element.trigger ( o ), this.isShown || o.isDefaultPrevented () || (this.isShown = ! 0, this.checkScrollbar (), this.setScrollbar (), this.$body.addClass ( "modal-open" ), this.escape (), this.resize (), this.$element.on ( "click.dismiss.bs.modal" , '[data-dismiss="modal"]' , t.proxy ( this.hide , this ) ), this.$dialog.on ( "mousedown.dismiss.bs.modal" , function () {n.$element.one ( "mouseup.dismiss.bs.modal" , function ( e ) {t ( e.target ).is ( n.$element ) && (n.ignoreBackdropClick = ! 0)} )} ), this.backdrop ( function () {
			var o = t.support.transition && n.$element.hasClass ( "fade" );
			n.$element.parent ().length || n.$element.appendTo ( n.$body ), n.$element.show ().scrollTop ( 0 ), n.adjustDialog (), o && n.$element[ 0 ].offsetWidth, n.$element.addClass ( "in" ), n.enforceFocus ();
			var s = t.Event ( "shown.bs.modal" , { relatedTarget : e } );
			o ? n.$dialog.one ( "bsTransitionEnd" , function () {n.$element.trigger ( "focus" ).trigger ( s )} ).emulateTransitionEnd ( i.TRANSITION_DURATION ) : n.$element.trigger ( "focus" ).trigger ( s )
		} ))
	}, i.prototype.hide = function ( e ) {e && e.preventDefault (), e = t.Event ( "hide.bs.modal" ), this.$element.trigger ( e ), this.isShown && ! e.isDefaultPrevented () && (this.isShown = ! 1, this.escape (), this.resize (), t ( document ).off ( "focusin.bs.modal" ), this.$element.removeClass ( "in" ).off ( "click.dismiss.bs.modal" ).off ( "mouseup.dismiss.bs.modal" ), this.$dialog.off ( "mousedown.dismiss.bs.modal" ), t.support.transition && this.$element.hasClass ( "fade" ) ? this.$element.one ( "bsTransitionEnd" , t.proxy ( this.hideModal , this ) ).emulateTransitionEnd ( i.TRANSITION_DURATION ) : this.hideModal ())}, i.prototype.enforceFocus = function () {t ( document ).off ( "focusin.bs.modal" ).on ( "focusin.bs.modal" , t.proxy ( function ( t ) {this.$element[ 0 ] === t.target || this.$element.has ( t.target ).length || this.$element.trigger ( "focus" )} , this ) )}, i.prototype.escape = function () {this.isShown && this.options.keyboard ? this.$element.on ( "keydown.dismiss.bs.modal" , t.proxy ( function ( t ) {27 == t.which && this.hide ()} , this ) ) : this.isShown || this.$element.off ( "keydown.dismiss.bs.modal" )}, i.prototype.resize = function () {this.isShown ? t ( window ).on ( "resize.bs.modal" , t.proxy ( this.handleUpdate , this ) ) : t ( window ).off ( "resize.bs.modal" )}, i.prototype.hideModal = function () {
		var t = this;
		this.$element.hide (), this.backdrop ( function () {t.$body.removeClass ( "modal-open" ), t.resetAdjustments (), t.resetScrollbar (), t.$element.trigger ( "hidden.bs.modal" )} )
	}, i.prototype.removeBackdrop = function () {this.$backdrop && this.$backdrop.remove (), this.$backdrop = null}, i.prototype.backdrop = function ( e ) {
		var n = this , o = this.$element.hasClass ( "fade" ) ? "fade" : "";
		if ( this.isShown && this.options.backdrop ) {
			var s = t.support.transition && o;
			if ( this.$backdrop = t ( document.createElement ( "div" ) ).addClass ( "modal-backdrop " + o ).appendTo ( this.$body ), this.$element.on ( "click.dismiss.bs.modal" , t.proxy ( function ( t ) {return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = ! 1) : void(t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[ 0 ].focus () : this.hide ()))} , this ) ), s && this.$backdrop[ 0 ].offsetWidth, this.$backdrop.addClass ( "in" ), ! e )return;
			s ? this.$backdrop.one ( "bsTransitionEnd" , e ).emulateTransitionEnd ( i.BACKDROP_TRANSITION_DURATION ) : e ()
		} else if ( ! this.isShown && this.$backdrop ) {
			this.$backdrop.removeClass ( "in" );
			var a = function () {n.removeBackdrop (), e && e ()};
			t.support.transition && this.$element.hasClass ( "fade" ) ? this.$backdrop.one ( "bsTransitionEnd" , a ).emulateTransitionEnd ( i.BACKDROP_TRANSITION_DURATION ) : a ()
		} else e && e ()
	}, i.prototype.handleUpdate = function () {this.adjustDialog ()}, i.prototype.adjustDialog = function () {
		var t = this.$element[ 0 ].scrollHeight > document.documentElement.clientHeight;
		this.$element.css ( {
			paddingLeft  : ! this.bodyIsOverflowing && t ? this.scrollbarWidth : "" ,
			paddingRight : this.bodyIsOverflowing && ! t ? this.scrollbarWidth : ""
		} )
	}, i.prototype.resetAdjustments = function () {
		this.$element.css ( {
			paddingLeft  : "" ,
			paddingRight : ""
		} )
	}, i.prototype.checkScrollbar = function () {
		var t = window.innerWidth;
		if ( ! t ) {
			var e = document.documentElement.getBoundingClientRect ();
			t = e.right - Math.abs ( e.left )
		}
		this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar ()
	}, i.prototype.setScrollbar = function () {
		var t = parseInt ( this.$body.css ( "padding-right" ) || 0 , 10 );
		this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css ( "padding-right" , t + this.scrollbarWidth )
	}, i.prototype.resetScrollbar = function () {this.$body.css ( "padding-right" , this.originalBodyPad )}, i.prototype.measureScrollbar = function () {
		var t = document.createElement ( "div" );
		t.className = "modal-scrollbar-measure", this.$body.append ( t );
		var e = t.offsetWidth - t.clientWidth;
		return this.$body[ 0 ].removeChild ( t ), e
	};
	var n = t.fn.modal;
	t.fn.modal = e, t.fn.modal.Constructor = i, t.fn.modal.noConflict = function () {return t.fn.modal = n, this}, t ( document ).on ( "click.bs.modal.data-api" , '[data-toggle="modal"]' , function ( i ) {
		var n = t ( this ) , o = n.attr ( "href" ) , s = t ( n.attr ( "data-target" ) || o && o.replace ( /.*(?=#[^\s]+$)/ , "" ) ) , a = s.data ( "bs.modal" ) ? "toggle" : t.extend ( { remote : ! /#/.test ( o ) && o } , s.data () , n.data () );
		n.is ( "a" ) && i.preventDefault (), s.one ( "show.bs.modal" , function ( t ) {t.isDefaultPrevented () || s.one ( "hidden.bs.modal" , function () {n.is ( ":visible" ) && n.trigger ( "focus" )} )} ), e.call ( s , a , this )
	} )
} ( jQuery ), + function ( t ) {
	"use strict";
	function e ( e ) {
		return this.each ( function () {
			var n = t ( this ) , o = n.data ( "bs.tab" );
			o || n.data ( "bs.tab" , o = new i ( this ) ), "string" == typeof e && o[ e ] ()
		} )
	}
	
	var i = function ( e ) {this.element = t ( e )};
	i.VERSION = "3.3.5", i.TRANSITION_DURATION = 150, i.prototype.show = function () {
		var e = this.element , i = e.closest ( "ul:not(.dropdown-menu)" ) , n = e.data ( "target" );
		if ( n || (n = e.attr ( "href" ), n = n && n.replace ( /.*(?=#[^\s]*$)/ , "" )), ! e.parent ( "li" ).hasClass ( "active" ) ) {
			var o = i.find ( ".active:last a" ) , s = t.Event ( "hide.bs.tab" , { relatedTarget : e[ 0 ] } ) , a = t.Event ( "show.bs.tab" , { relatedTarget : o[ 0 ] } );
			if ( o.trigger ( s ), e.trigger ( a ), ! a.isDefaultPrevented () && ! s.isDefaultPrevented () ) {
				var r = t ( n );
				this.activate ( e.closest ( "li" ) , i ), this.activate ( r , r.parent () , function () {
					o.trigger ( {
						type          : "hidden.bs.tab" ,
						relatedTarget : e[ 0 ]
					} ), e.trigger ( { type : "shown.bs.tab" , relatedTarget : o[ 0 ] } )
				} )
			}
		}
	}, i.prototype.activate = function ( e , n , o ) {
		function s () {a.removeClass ( "active" ).find ( "> .dropdown-menu > .active" ).removeClass ( "active" ).end ().find ( '[data-toggle="tab"]' ).attr ( "aria-expanded" , ! 1 ), e.addClass ( "active" ).find ( '[data-toggle="tab"]' ).attr ( "aria-expanded" , ! 0 ), r ? (e[ 0 ].offsetWidth, e.addClass ( "in" )) : e.removeClass ( "fade" ), e.parent ( ".dropdown-menu" ).length && e.closest ( "li.dropdown" ).addClass ( "active" ).end ().find ( '[data-toggle="tab"]' ).attr ( "aria-expanded" , ! 0 ), o && o ()}
		
		var a = n.find ( "> .active" ) , r = o && t.support.transition && (a.length && a.hasClass ( "fade" ) || ! ! n.find ( "> .fade" ).length);
		a.length && r ? a.one ( "bsTransitionEnd" , s ).emulateTransitionEnd ( i.TRANSITION_DURATION ) : s (), a.removeClass ( "in" )
	};
	var n = t.fn.tab;
	t.fn.tab = e, t.fn.tab.Constructor = i, t.fn.tab.noConflict = function () {return t.fn.tab = n, this};
	var o = function ( i ) {i.preventDefault (), e.call ( t ( this ) , "show" )};
	t ( document ).on ( "click.bs.tab.data-api" , '[data-toggle="tab"]' , o ).on ( "click.bs.tab.data-api" , '[data-toggle="pill"]' , o )
} ( jQuery ), + function ( t ) {
	"use strict";
	function e ( e ) {
		return this.each ( function () {
			var n = t ( this ) , o = n.data ( "bs.affix" ) , s = "object" == typeof e && e;
			o || n.data ( "bs.affix" , o = new i ( this , s ) ), "string" == typeof e && o[ e ] ()
		} )
	}
	
	var i = function ( e , n ) {this.options = t.extend ( {} , i.DEFAULTS , n ), this.$target = t ( this.options.target ).on ( "scroll.bs.affix.data-api" , t.proxy ( this.checkPosition , this ) ).on ( "click.bs.affix.data-api" , t.proxy ( this.checkPositionWithEventLoop , this ) ), this.$element = t ( e ), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition ()};
	i.VERSION = "3.3.5", i.RESET = "affix affix-top affix-bottom", i.DEFAULTS = {
		offset : 0 ,
		target : window
	}, i.prototype.getState = function ( t , e , i , n ) {
		var o = this.$target.scrollTop () , s = this.$element.offset () , a = this.$target.height ();
		if ( null != i && "top" == this.affixed )return i > o ? "top" : ! 1;
		if ( "bottom" == this.affixed )return null != i ? o + this.unpin <= s.top ? ! 1 : "bottom" : t - n >= o + a ? ! 1 : "bottom";
		var r = null == this.affixed , d = r ? o : s.top , l = r ? a : e;
		return null != i && i >= o ? "top" : null != n && d + l >= t - n ? "bottom" : ! 1
	}, i.prototype.getPinnedOffset = function () {
		if ( this.pinnedOffset )return this.pinnedOffset;
		this.$element.removeClass ( i.RESET ).addClass ( "affix" );
		var t = this.$target.scrollTop () , e = this.$element.offset ();
		return this.pinnedOffset = e.top - t
	}, i.prototype.checkPositionWithEventLoop = function () {setTimeout ( t.proxy ( this.checkPosition , this ) , 1 )}, i.prototype.checkPosition = function () {
		if ( this.$element.is ( ":visible" ) ) {
			var e = this.$element.height () , n = this.options.offset , o = n.top , s = n.bottom , a = Math.max ( t ( document ).height () , t ( document.body ).height () );
			"object" != typeof n && (s = o = n), "function" == typeof o && (o = n.top ( this.$element )), "function" == typeof s && (s = n.bottom ( this.$element ));
			var r = this.getState ( a , e , o , s );
			if ( this.affixed != r ) {
				null != this.unpin && this.$element.css ( "top" , "" );
				var d = "affix" + (r ? "-" + r : "") , l = t.Event ( d + ".bs.affix" );
				if ( this.$element.trigger ( l ), l.isDefaultPrevented () )return;
				this.affixed = r, this.unpin = "bottom" == r ? this.getPinnedOffset () : null, this.$element.removeClass ( i.RESET ).addClass ( d ).trigger ( d.replace ( "affix" , "affixed" ) + ".bs.affix" )
			}
			"bottom" == r && this.$element.offset ( { top : a - e - s } )
		}
	};
	var n = t.fn.affix;
	t.fn.affix = e, t.fn.affix.Constructor = i, t.fn.affix.noConflict = function () {return t.fn.affix = n, this}, t ( window ).on ( "load" , function () {
		t ( '[data-spy="affix"]' ).each ( function () {
			var i = t ( this ) , n = i.data ();
			n.offset = n.offset || {}, null != n.offsetBottom && (n.offset.bottom = n.offsetBottom), null != n.offsetTop && (n.offset.top = n.offsetTop), e.call ( i , n )
		} )
	} )
} ( jQuery ), + function ( t ) {
	"use strict";
	function e ( e ) {
		var i , n = e.attr ( "data-target" ) || (i = e.attr ( "href" )) && i.replace ( /.*(?=#[^\s]+$)/ , "" );
		return t ( n )
	}
	
	function i ( e ) {
		return this.each ( function () {
			var i = t ( this ) , o = i.data ( "bs.collapse" ) , s = t.extend ( {} , n.DEFAULTS , i.data () , "object" == typeof e && e );
			! o && s.toggle && /show|hide/.test ( e ) && (s.toggle = ! 1), o || i.data ( "bs.collapse" , o = new n ( this , s ) ), "string" == typeof e && o[ e ] ()
		} )
	}
	
	var n = function ( e , i ) {this.$element = t ( e ), this.options = t.extend ( {} , n.DEFAULTS , i ), this.$trigger = t ( '[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]' ), this.transitioning = null, this.options.parent ? this.$parent = this.getParent () : this.addAriaAndCollapsedClass ( this.$element , this.$trigger ), this.options.toggle && this.toggle ()};
	n.VERSION = "3.3.5", n.TRANSITION_DURATION = 350, n.DEFAULTS = { toggle : ! 0 }, n.prototype.dimension = function () {
		var t = this.$element.hasClass ( "width" );
		return t ? "width" : "height"
	}, n.prototype.show = function () {
		if ( ! this.transitioning && ! this.$element.hasClass ( "in" ) ) {
			var e , o = this.$parent && this.$parent.children ( ".panel" ).children ( ".in, .collapsing" );
			if ( ! (o && o.length && (e = o.data ( "bs.collapse" ), e && e.transitioning)) ) {
				var s = t.Event ( "show.bs.collapse" );
				if ( this.$element.trigger ( s ), ! s.isDefaultPrevented () ) {
					o && o.length && (i.call ( o , "hide" ), e || o.data ( "bs.collapse" , null ));
					var a = this.dimension ();
					this.$element.removeClass ( "collapse" ).addClass ( "collapsing" )[ a ] ( 0 ).attr ( "aria-expanded" , ! 0 ), this.$trigger.removeClass ( "collapsed" ).attr ( "aria-expanded" , ! 0 ), this.transitioning = 1;
					var r = function () {this.$element.removeClass ( "collapsing" ).addClass ( "collapse in" )[ a ] ( "" ), this.transitioning = 0, this.$element.trigger ( "shown.bs.collapse" )};
					if ( ! t.support.transition )return r.call ( this );
					var d = t.camelCase ( [ "scroll" , a ].join ( "-" ) );
					this.$element.one ( "bsTransitionEnd" , t.proxy ( r , this ) ).emulateTransitionEnd ( n.TRANSITION_DURATION )[ a ] ( this.$element[ 0 ][ d ] )
				}
			}
		}
	}, n.prototype.hide = function () {
		if ( ! this.transitioning && this.$element.hasClass ( "in" ) ) {
			var e = t.Event ( "hide.bs.collapse" );
			if ( this.$element.trigger ( e ), ! e.isDefaultPrevented () ) {
				var i = this.dimension ();
				this.$element[ i ] ( this.$element[ i ] () )[ 0 ].offsetHeight, this.$element.addClass ( "collapsing" ).removeClass ( "collapse in" ).attr ( "aria-expanded" , ! 1 ), this.$trigger.addClass ( "collapsed" ).attr ( "aria-expanded" , ! 1 ), this.transitioning = 1;
				var o = function () {this.transitioning = 0, this.$element.removeClass ( "collapsing" ).addClass ( "collapse" ).trigger ( "hidden.bs.collapse" )};
				return t.support.transition ? void this.$element[ i ] ( 0 ).one ( "bsTransitionEnd" , t.proxy ( o , this ) ).emulateTransitionEnd ( n.TRANSITION_DURATION ) : o.call ( this )
			}
		}
	}, n.prototype.toggle = function () {this[ this.$element.hasClass ( "in" ) ? "hide" : "show" ] ()}, n.prototype.getParent = function () {
		return t ( this.options.parent ).find ( '[data-toggle="collapse"][data-parent="' + this.options.parent + '"]' ).each ( t.proxy ( function ( i , n ) {
			var o = t ( n );
			this.addAriaAndCollapsedClass ( e ( o ) , o )
		} , this ) ).end ()
	}, n.prototype.addAriaAndCollapsedClass = function ( t , e ) {
		var i = t.hasClass ( "in" );
		t.attr ( "aria-expanded" , i ), e.toggleClass ( "collapsed" , ! i ).attr ( "aria-expanded" , i )
	};
	var o = t.fn.collapse;
	t.fn.collapse = i, t.fn.collapse.Constructor = n, t.fn.collapse.noConflict = function () {return t.fn.collapse = o, this}, t ( document ).on ( "click.bs.collapse.data-api" , '[data-toggle="collapse"]' , function ( n ) {
		var o = t ( this );
		o.attr ( "data-target" ) || n.preventDefault ();
		var s = e ( o ) , a = s.data ( "bs.collapse" ) , r = a ? "toggle" : o.data ();
		i.call ( s , r )
	} )
} ( jQuery ), + function ( t ) {
	"use strict";
	function e () {
		var t = document.createElement ( "bootstrap" ) , e = {
			WebkitTransition : "webkitTransitionEnd" ,
			MozTransition    : "transitionend" ,
			OTransition      : "oTransitionEnd otransitionend" ,
			transition       : "transitionend"
		};
		for ( var i in e )if ( void 0 !== t.style[ i ] )return { end : e[ i ] };
		return ! 1
	}
	
	t.fn.emulateTransitionEnd = function ( e ) {
		var i = ! 1 , n = this;
		t ( this ).one ( "bsTransitionEnd" , function () {i = ! 0} );
		var o = function () {i || t ( n ).trigger ( t.support.transition.end )};
		return setTimeout ( o , e ), this
	}, t ( function () {
		t.support.transition = e (), t.support.transition && (t.event.special.bsTransitionEnd = {
			bindType     : t.support.transition.end ,
			delegateType : t.support.transition.end ,
			handle       : function ( e ) {return t ( e.target ).is ( this ) ? e.handleObj.handler.apply ( this , arguments ) : void 0}
		})
	} )
} ( jQuery );
