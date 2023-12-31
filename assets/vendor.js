function replaceUrlParam(e, t, n) {
    var i = new RegExp("(" + t + "=).*?(&|$)"),
      r = e;
    return e.search(i) >= 0
      ? e.replace(i, "$1" + n + "$2")
      : r + (r.indexOf("?") > 0 ? "&" : "?") + t + "=" + n;
  }
  !(function (e) {
    e.fn.prepareTransition = function () {
      return this.each(function () {
        var t = e(this);
        t.one(
          "TransitionEnd webkitTransitionEnd transitionend oTransitionEnd",
          function () {
            t.removeClass("is-transitioning");
          }
        );
        var n = 0;
        e.each(
          [
            "transition-duration",
            "-moz-transition-duration",
            "-webkit-transition-duration",
            "-o-transition-duration",
          ],
          function (e, i) {
            n = parseFloat(t.css(i)) || n;
          }
        ),
          0 != n && (t.addClass("is-transitioning"), t[0].offsetWidth);
      });
    };
  })(jQuery),
    (function (e, t) {
      var n,
        i = e.jQuery || e.Cowboy || (e.Cowboy = {});
      (i.throttle = n = function (e, n, r, o) {
        function a() {
          function i() {
            (c = +new Date()), r.apply(a, u);
          }
          var a = this,
            l = +new Date() - c,
            u = arguments;
          o && !s && i(),
            s && clearTimeout(s),
            o === t && l > e
              ? i()
              : !0 !== n &&
                (s = setTimeout(
                  o
                    ? function () {
                        s = t;
                      }
                    : i,
                  o === t ? e - l : e
                ));
        }
        var s,
          c = 0;
        return (
          "boolean" != typeof n && ((o = r), (r = n), (n = t)),
          i.guid && (a.guid = r.guid = r.guid || i.guid++),
          a
        );
      }),
        (i.debounce = function (e, i, r) {
          return r === t ? n(e, i, !1) : n(e, r, !1 !== i);
        });
    })(this),
    function () {
      "use strict";
      function e() {}
      function t(e, t) {
        for (var n = e.length; n--; ) if (e[n].listener === t) return n;
        return -1;
      }
      function n(e) {
        return function () {
          return this[e].apply(this, arguments);
        };
      }
      var i = e.prototype,
        r = this,
        o = r.EventEmitter;
      (i.getListeners = function (e) {
        var t,
          n,
          i = this._getEvents();
        if ("object" == typeof e)
          for (n in ((t = {}), i))
            i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n]);
        else t = i[e] || (i[e] = []);
        return t;
      }),
        (i.flattenListeners = function (e) {
          var t,
            n = [];
          for (t = 0; t < e.length; t += 1) n.push(e[t].listener);
          return n;
        }),
        (i.getListenersAsObject = function (e) {
          var t,
            n = this.getListeners(e);
          return n instanceof Array && ((t = {})[e] = n), t || n;
        }),
        (i.addListener = function (e, n) {
          var i,
            r = this.getListenersAsObject(e),
            o = "object" == typeof n;
          for (i in r)
            r.hasOwnProperty(i) &&
              -1 === t(r[i], n) &&
              r[i].push(o ? n : { listener: n, once: !1 });
          return this;
        }),
        (i.on = n("addListener")),
        (i.addOnceListener = function (e, t) {
          return this.addListener(e, { listener: t, once: !0 });
        }),
        (i.once = n("addOnceListener")),
        (i.defineEvent = function (e) {
          return this.getListeners(e), this;
        }),
        (i.defineEvents = function (e) {
          for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]);
          return this;
        }),
        (i.removeListener = function (e, n) {
          var i,
            r,
            o = this.getListenersAsObject(e);
          for (r in o)
            o.hasOwnProperty(r) && -1 !== (i = t(o[r], n)) && o[r].splice(i, 1);
          return this;
        }),
        (i.off = n("removeListener")),
        (i.addListeners = function (e, t) {
          return this.manipulateListeners(!1, e, t);
        }),
        (i.removeListeners = function (e, t) {
          return this.manipulateListeners(!0, e, t);
        }),
        (i.manipulateListeners = function (e, t, n) {
          var i,
            r,
            o = e ? this.removeListener : this.addListener,
            a = e ? this.removeListeners : this.addListeners;
          if ("object" != typeof t || t instanceof RegExp)
            for (i = n.length; i--; ) o.call(this, t, n[i]);
          else
            for (i in t)
              t.hasOwnProperty(i) &&
                (r = t[i]) &&
                ("function" == typeof r
                  ? o.call(this, i, r)
                  : a.call(this, i, r));
          return this;
        }),
        (i.removeEvent = function (e) {
          var t,
            n = typeof e,
            i = this._getEvents();
          if ("string" === n) delete i[e];
          else if ("object" === n)
            for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
          else delete this._events;
          return this;
        }),
        (i.removeAllListeners = n("removeEvent")),
        (i.emitEvent = function (e, t) {
          var n,
            i,
            r,
            o = this.getListenersAsObject(e);
          for (r in o)
            if (o.hasOwnProperty(r))
              for (i = o[r].length; i--; )
                !0 === (n = o[r][i]).once && this.removeListener(e, n.listener),
                  n.listener.apply(this, t || []) ===
                    this._getOnceReturnValue() &&
                    this.removeListener(e, n.listener);
          return this;
        }),
        (i.trigger = n("emitEvent")),
        (i.emit = function (e) {
          var t = Array.prototype.slice.call(arguments, 1);
          return this.emitEvent(e, t);
        }),
        (i.setOnceReturnValue = function (e) {
          return (this._onceReturnValue = e), this;
        }),
        (i._getOnceReturnValue = function () {
          return (
            !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
          );
        }),
        (i._getEvents = function () {
          return this._events || (this._events = {});
        }),
        (e.noConflict = function () {
          return (r.EventEmitter = o), e;
        }),
        "function" == typeof define && define.amd
          ? define("eventEmitter/EventEmitter", [], function () {
              return e;
            })
          : "object" == typeof module && module.exports
          ? (module.exports = e)
          : (this.EventEmitter = e);
    }.call(this),
    (function (e) {
      function t(t) {
        var n = e.event;
        return (n.target = n.target || n.srcElement || t), n;
      }
      var n = document.documentElement,
        i = function () {};
      n.addEventListener
        ? (i = function (e, t, n) {
            e.addEventListener(t, n, !1);
          })
        : n.attachEvent &&
          (i = function (e, n, i) {
            (e[n + i] = i.handleEvent
              ? function () {
                  var n = t(e);
                  i.handleEvent.call(i, n);
                }
              : function () {
                  var n = t(e);
                  i.call(e, n);
                }),
              e.attachEvent("on" + n, e[n + i]);
          });
      var r = function () {};
      n.removeEventListener
        ? (r = function (e, t, n) {
            e.removeEventListener(t, n, !1);
          })
        : n.detachEvent &&
          (r = function (e, t, n) {
            e.detachEvent("on" + t, e[t + n]);
            try {
              delete e[t + n];
            } catch (i) {
              e[t + n] = void 0;
            }
          });
      var o = { bind: i, unbind: r };
      "function" == typeof define && define.amd
        ? define("eventie/eventie", o)
        : (e.eventie = o);
    })(this),
    (function (e, t) {
      "use strict";
      "function" == typeof define && define.amd
        ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function (
            n,
            i
          ) {
            return t(e, n, i);
          })
        : "object" == typeof module && module.exports
        ? (module.exports = t(
            e,
            require("wolfy87-eventemitter"),
            require("eventie")
          ))
        : (e.imagesLoaded = t(e, e.EventEmitter, e.eventie));
    })(window, function (e, t, n) {
      function i(e, t) {
        for (var n in t) e[n] = t[n];
        return e;
      }
      function r(e) {
        var t = [];
        if (
          (function (e) {
            return "[object Array]" == u.call(e);
          })(e)
        )
          t = e;
        else if ("number" == typeof e.length)
          for (var n = 0; n < e.length; n++) t.push(e[n]);
        else t.push(e);
        return t;
      }
      function o(e, t, n) {
        if (!(this instanceof o)) return new o(e, t, n);
        "string" == typeof e && (e = document.querySelectorAll(e)),
          (this.elements = r(e)),
          (this.options = i({}, this.options)),
          "function" == typeof t ? (n = t) : i(this.options, t),
          n && this.on("always", n),
          this.getImages(),
          c && (this.jqDeferred = new c.Deferred());
        var a = this;
        setTimeout(function () {
          a.check();
        });
      }
      function a(e) {
        this.img = e;
      }
      function s(e, t) {
        (this.url = e), (this.element = t), (this.img = new Image());
      }
      var c = e.jQuery,
        l = e.console,
        u = Object.prototype.toString;
      (o.prototype = new t()),
        (o.prototype.options = {}),
        (o.prototype.getImages = function () {
          this.images = [];
          for (var e = 0; e < this.elements.length; e++) {
            var t = this.elements[e];
            this.addElementImages(t);
          }
        }),
        (o.prototype.addElementImages = function (e) {
          "IMG" == e.nodeName && this.addImage(e),
            !0 === this.options.background && this.addElementBackgroundImages(e);
          var t = e.nodeType;
          if (t && d[t]) {
            for (var n = e.querySelectorAll("img"), i = 0; i < n.length; i++) {
              var r = n[i];
              this.addImage(r);
            }
            if ("string" == typeof this.options.background) {
              var o = e.querySelectorAll(this.options.background);
              for (i = 0; i < o.length; i++) {
                var a = o[i];
                this.addElementBackgroundImages(a);
              }
            }
          }
        });
      var d = { 1: !0, 9: !0, 11: !0 };
      o.prototype.addElementBackgroundImages = function (e) {
        for (
          var t = p(e),
            n = /url\(['"]*([^'"\)]+)['"]*\)/gi,
            i = n.exec(t.backgroundImage);
          null !== i;
  
        ) {
          var r = i && i[1];
          r && this.addBackground(r, e), (i = n.exec(t.backgroundImage));
        }
      };
      var p =
        e.getComputedStyle ||
        function (e) {
          return e.currentStyle;
        };
      return (
        (o.prototype.addImage = function (e) {
          var t = new a(e);
          this.images.push(t);
        }),
        (o.prototype.addBackground = function (e, t) {
          var n = new s(e, t);
          this.images.push(n);
        }),
        (o.prototype.check = function () {
          function e(e, n, i) {
            setTimeout(function () {
              t.progress(e, n, i);
            });
          }
          var t = this;
          if (
            ((this.progressedCount = 0),
            (this.hasAnyBroken = !1),
            this.images.length)
          )
            for (var n = 0; n < this.images.length; n++) {
              var i = this.images[n];
              i.once("progress", e), i.check();
            }
          else this.complete();
        }),
        (o.prototype.progress = function (e, t, n) {
          this.progressedCount++,
            (this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded),
            this.emit("progress", this, e, t),
            this.jqDeferred &&
              this.jqDeferred.notify &&
              this.jqDeferred.notify(this, e),
            this.progressedCount == this.images.length && this.complete(),
            this.options.debug && l && l.log("progress: " + n, e, t);
        }),
        (o.prototype.complete = function () {
          var e = this.hasAnyBroken ? "fail" : "done";
          if (
            ((this.isComplete = !0),
            this.emit(e, this),
            this.emit("always", this),
            this.jqDeferred)
          ) {
            var t = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[t](this);
          }
        }),
        (a.prototype = new t()),
        (a.prototype.check = function () {
          return this.getIsImageComplete()
            ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
            : ((this.proxyImage = new Image()),
              n.bind(this.proxyImage, "load", this),
              n.bind(this.proxyImage, "error", this),
              n.bind(this.img, "load", this),
              n.bind(this.img, "error", this),
              void (this.proxyImage.src = this.img.src));
        }),
        (a.prototype.getIsImageComplete = function () {
          return this.img.complete && void 0 !== this.img.naturalWidth;
        }),
        (a.prototype.confirm = function (e, t) {
          (this.isLoaded = e), this.emit("progress", this, this.img, t);
        }),
        (a.prototype.handleEvent = function (e) {
          var t = "on" + e.type;
          this[t] && this[t](e);
        }),
        (a.prototype.onload = function () {
          this.confirm(!0, "onload"), this.unbindEvents();
        }),
        (a.prototype.onerror = function () {
          this.confirm(!1, "onerror"), this.unbindEvents();
        }),
        (a.prototype.unbindEvents = function () {
          n.unbind(this.proxyImage, "load", this),
            n.unbind(this.proxyImage, "error", this),
            n.unbind(this.img, "load", this),
            n.unbind(this.img, "error", this);
        }),
        (s.prototype = new a()),
        (s.prototype.check = function () {
          n.bind(this.img, "load", this),
            n.bind(this.img, "error", this),
            (this.img.src = this.url),
            this.getIsImageComplete() &&
              (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
              this.unbindEvents());
        }),
        (s.prototype.unbindEvents = function () {
          n.unbind(this.img, "load", this), n.unbind(this.img, "error", this);
        }),
        (s.prototype.confirm = function (e, t) {
          (this.isLoaded = e), this.emit("progress", this, this.element, t);
        }),
        (o.makeJQueryPlugin = function (t) {
          (t = t || e.jQuery) &&
            ((c = t).fn.imagesLoaded = function (e, t) {
              return new o(this, e, t).jqDeferred.promise(c(this));
            });
        }),
        o.makeJQueryPlugin(),
        o
      );
    }),
    (function (e) {
      e.fn.fitVids = function (t) {
        var n = { customSelector: null, ignore: null };
        if (!document.getElementById("fit-vids-style")) {
          var i = document.head || document.getElementsByTagName("head")[0],
            r = document.createElement("div");
          (r.innerHTML =
            '<p>x</p><style id="fit-vids-style">.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>'),
            i.appendChild(r.childNodes[1]);
        }
        return (
          t && e.extend(n, t),
          this.each(function () {
            var t = 'iframe[src*="player.vimeo.com"] iframe[src*="youtube.com"] iframe[src*="youtube-nocookie.com"] iframe[src*="kickstarter.com"][src*="video.html"] object embed'.split(
              " "
            );
            n.customSelector && t.push(n.customSelector);
            var i = ".fitvidsignore";
            n.ignore && (i = i + ", " + n.ignore),
              (t = (t = (t = e(this).find(t.join(","))).not("object object")).not(
                i
              )).each(function (t) {
                var n = e(this);
                if (
                  !(
                    0 < n.parents(i).length ||
                    ("embed" === this.tagName.toLowerCase() &&
                      n.parent("object").length) ||
                    n.parent(".fluid-width-video-wrapper").length
                  )
                ) {
                  n.css("height") ||
                    n.css("width") ||
                    (!isNaN(n.attr("height")) && !isNaN(n.attr("width"))) ||
                    (n.attr("height", 9), n.attr("width", 16));
                  var r =
                    (r =
                      "object" === this.tagName.toLowerCase() ||
                      (n.attr("height") && !isNaN(parseInt(n.attr("height"), 10)))
                        ? parseInt(n.attr("height"), 10)
                        : n.height()) /
                    (isNaN(parseInt(n.attr("width"), 10))
                      ? n.width()
                      : parseInt(n.attr("width"), 10));
                  n.attr("id") || n.attr("id", "fitvid" + t),
                    n
                      .wrap('<div class="fluid-width-video-wrapper"></div>')
                      .parent(".fluid-width-video-wrapper")
                      .css("padding-top", 100 * r + "%"),
                    n.removeAttr("height").removeAttr("width");
                }
              });
          })
        );
      };
    })(window.jQuery || window.Zepto),
    (function (e) {
      var t = !0;
      (e.flexslider = function (n, i) {
        var r = e(n);
        r.vars = e.extend({}, e.flexslider.defaults, i);
        var o,
          a = r.vars.namespace,
          s =
            window.navigator &&
            window.navigator.msPointerEnabled &&
            window.MSGesture,
          c =
            ("ontouchstart" in window ||
              s ||
              (window.DocumentTouch && document instanceof DocumentTouch)) &&
            r.vars.touch,
          l = "click touchend MSPointerUp keyup",
          u = "",
          d = "vertical" === r.vars.direction,
          p = r.vars.reverse,
          f = r.vars.itemWidth > 0,
          m = "fade" === r.vars.animation,
          h = "" !== r.vars.asNavFor,
          v = {};
        e.data(n, "flexslider", r),
          (v = {
            init: function () {
              (r.animating = !1),
                (r.currentSlide = parseInt(
                  r.vars.startAt ? r.vars.startAt : 0,
                  10
                )),
                isNaN(r.currentSlide) && (r.currentSlide = 0),
                (r.animatingTo = r.currentSlide),
                (r.atEnd = 0 === r.currentSlide || r.currentSlide === r.last),
                (r.containerSelector = r.vars.selector.substr(
                  0,
                  r.vars.selector.search(" ")
                )),
                (r.slides = e(r.vars.selector, r)),
                (r.container = e(r.containerSelector, r)),
                (r.count = r.slides.length),
                (r.syncExists = e(r.vars.sync).length > 0),
                "slide" === r.vars.animation && (r.vars.animation = "swing"),
                (r.prop = d ? "top" : "marginLeft"),
                (r.args = {}),
                (r.manualPause = !1),
                (r.stopped = !1),
                (r.started = !1),
                (r.startTimeout = null),
                (r.transitions =
                  !r.vars.video &&
                  !m &&
                  r.vars.useCSS &&
                  (function () {
                    var e = document.createElement("div"),
                      t = [
                        "perspectiveProperty",
                        "WebkitPerspective",
                        "MozPerspective",
                        "OPerspective",
                        "msPerspective",
                      ];
                    for (var n in t)
                      if (void 0 !== e.style[t[n]])
                        return (
                          (r.pfx = t[n].replace("Perspective", "").toLowerCase()),
                          (r.prop = "-" + r.pfx + "-transform"),
                          !0
                        );
                    return !1;
                  })()),
                (r.ensureAnimationEnd = ""),
                "" !== r.vars.controlsContainer &&
                  (r.controlsContainer =
                    e(r.vars.controlsContainer).length > 0 &&
                    e(r.vars.controlsContainer)),
                "" !== r.vars.manualControls &&
                  (r.manualControls =
                    e(r.vars.manualControls).length > 0 &&
                    e(r.vars.manualControls)),
                "" !== r.vars.customDirectionNav &&
                  (r.customDirectionNav =
                    2 === e(r.vars.customDirectionNav).length &&
                    e(r.vars.customDirectionNav)),
                r.vars.randomize &&
                  (r.slides.sort(function () {
                    return Math.round(Math.random()) - 0.5;
                  }),
                  r.container.empty().append(r.slides)),
                r.doMath(),
                r.setup("init"),
                r.vars.controlNav && v.controlNav.setup(),
                r.vars.directionNav && v.directionNav.setup(),
                r.vars.keyboard &&
                  (1 === e(r.containerSelector).length ||
                    r.vars.multipleKeyboard) &&
                  e(document).bind("keyup", function (e) {
                    var t = e.keyCode;
                    if (!r.animating && (39 === t || 37 === t)) {
                      var n =
                        39 === t
                          ? r.getTarget("next")
                          : 37 === t && r.getTarget("prev");
                      r.flexAnimate(n, r.vars.pauseOnAction);
                    }
                  }),
                r.vars.mousewheel &&
                  r.bind("mousewheel", function (e, t, n, i) {
                    e.preventDefault();
                    var o = 0 > t ? r.getTarget("next") : r.getTarget("prev");
                    r.flexAnimate(o, r.vars.pauseOnAction);
                  }),
                r.vars.pausePlay && v.pausePlay.setup(),
                r.vars.slideshow &&
                  r.vars.pauseInvisible &&
                  v.pauseInvisible.init(),
                r.vars.slideshow &&
                  (r.vars.pauseOnHover &&
                    r.hover(
                      function () {
                        r.manualPlay || r.manualPause || r.pause();
                      },
                      function () {
                        r.manualPause || r.manualPlay || r.stopped || r.play();
                      }
                    ),
                  (r.vars.pauseInvisible && v.pauseInvisible.isHidden()) ||
                    (r.vars.initDelay > 0
                      ? (r.startTimeout = setTimeout(r.play, r.vars.initDelay))
                      : r.play())),
                h && v.asNav.setup(),
                c && r.vars.touch && v.touch(),
                (!m || (m && r.vars.smoothHeight)) &&
                  e(window).bind("resize orientationchange focus", v.resize),
                r.find("img").attr("draggable", "false"),
                setTimeout(function () {
                  r.vars.start(r);
                }, 200);
            },
            asNav: {
              setup: function () {
                (r.asNav = !0),
                  (r.animatingTo = Math.floor(r.currentSlide / r.move)),
                  (r.currentItem = r.currentSlide),
                  r.slides
                    .removeClass(a + "active-slide")
                    .eq(r.currentItem)
                    .addClass(a + "active-slide"),
                  s
                    ? ((n._slider = r),
                      r.slides.each(function () {
                        var t = this;
                        (t._gesture = new MSGesture()),
                          (t._gesture.target = t),
                          t.addEventListener(
                            "MSPointerDown",
                            function (e) {
                              e.preventDefault(),
                                e.currentTarget._gesture &&
                                  e.currentTarget._gesture.addPointer(
                                    e.pointerId
                                  );
                            },
                            !1
                          ),
                          t.addEventListener("MSGestureTap", function (t) {
                            t.preventDefault();
                            var n = e(this),
                              i = n.index();
                            e(r.vars.asNavFor).data("flexslider").animating ||
                              n.hasClass("active") ||
                              ((r.direction =
                                r.currentItem < i ? "next" : "prev"),
                              r.flexAnimate(i, r.vars.pauseOnAction, !1, !0, !0));
                          });
                      }))
                    : r.slides.on(l, function (t) {
                        t.preventDefault();
                        var n = e(this),
                          i = n.index();
                        0 >= n.offset().left - e(r).scrollLeft() &&
                        n.hasClass(a + "active-slide")
                          ? r.flexAnimate(r.getTarget("prev"), !0)
                          : e(r.vars.asNavFor).data("flexslider").animating ||
                            n.hasClass(a + "active-slide") ||
                            ((r.direction = r.currentItem < i ? "next" : "prev"),
                            r.flexAnimate(i, r.vars.pauseOnAction, !1, !0, !0));
                      });
              },
            },
            controlNav: {
              setup: function () {
                r.manualControls
                  ? v.controlNav.setupManual()
                  : v.controlNav.setupPaging();
              },
              setupPaging: function () {
                var t,
                  n,
                  i =
                    "thumbnails" === r.vars.controlNav
                      ? "control-thumbs"
                      : "control-paging",
                  o = 1;
                if (
                  ((r.controlNavScaffold = e(
                    '<ol class="' + a + "control-nav " + a + i + '"></ol>'
                  )),
                  r.pagingCount > 1)
                )
                  for (var s = 0; s < r.pagingCount; s++) {
                    void 0 === (n = r.slides.eq(s)).attr("data-thumb-alt") &&
                      n.attr("data-thumb-alt", "");
                    var c =
                      "" !== n.attr("data-thumb-alt")
                        ? (c = ' alt="' + n.attr("data-thumb-alt") + '"')
                        : "";
                    if (
                      ((t =
                        "thumbnails" === r.vars.controlNav
                          ? '<img src="' + n.attr("data-thumb") + '"' + c + "/>"
                          : '<a href="#">' + o + "</a>"),
                      "thumbnails" === r.vars.controlNav &&
                        !0 === r.vars.thumbCaptions)
                    ) {
                      var d = n.attr("data-thumbcaption");
                      "" !== d &&
                        void 0 !== d &&
                        (t += '<span class="' + a + 'caption">' + d + "</span>");
                    }
                    r.controlNavScaffold.append("<li>" + t + "</li>"), o++;
                  }
                r.controlsContainer
                  ? e(r.controlsContainer).append(r.controlNavScaffold)
                  : r.append(r.controlNavScaffold),
                  v.controlNav.set(),
                  v.controlNav.active(),
                  r.controlNavScaffold.delegate("a, img", l, function (t) {
                    if ((t.preventDefault(), "" === u || u === t.type)) {
                      var n = e(this),
                        i = r.controlNav.index(n);
                      n.hasClass(a + "active") ||
                        ((r.direction = i > r.currentSlide ? "next" : "prev"),
                        r.flexAnimate(i, r.vars.pauseOnAction));
                    }
                    "" === u && (u = t.type), v.setToClearWatchedEvent();
                  });
              },
              setupManual: function () {
                (r.controlNav = r.manualControls),
                  v.controlNav.active(),
                  r.controlNav.bind(l, function (t) {
                    if ((t.preventDefault(), "" === u || u === t.type)) {
                      var n = e(this),
                        i = r.controlNav.index(n);
                      n.hasClass(a + "active") ||
                        (i > r.currentSlide
                          ? (r.direction = "next")
                          : (r.direction = "prev"),
                        r.flexAnimate(i, r.vars.pauseOnAction));
                    }
                    "" === u && (u = t.type), v.setToClearWatchedEvent();
                  });
              },
              set: function () {
                var t = "thumbnails" === r.vars.controlNav ? "img" : "a";
                r.controlNav = e(
                  "." + a + "control-nav li " + t,
                  r.controlsContainer ? r.controlsContainer : r
                );
              },
              active: function () {
                r.controlNav
                  .removeClass(a + "active")
                  .eq(r.animatingTo)
                  .addClass(a + "active");
              },
              update: function (t, n) {
                r.pagingCount > 1 && "add" === t
                  ? r.controlNavScaffold.append(
                      e('<li><a href="#">' + r.count + "</a></li>")
                    )
                  : 1 === r.pagingCount
                  ? r.controlNavScaffold.find("li").remove()
                  : r.controlNav.eq(n).closest("li").remove(),
                  v.controlNav.set(),
                  r.pagingCount > 1 && r.pagingCount !== r.controlNav.length
                    ? r.update(n, t)
                    : v.controlNav.active();
              },
            },
            directionNav: {
              setup: function () {
                var t = e(
                  '<ul class="' +
                    a +
                    'direction-nav"><li class="' +
                    a +
                    'nav-prev"><a class="' +
                    a +
                    'prev" href="#">' +
                    r.vars.prevText +
                    '</a></li><li class="' +
                    a +
                    'nav-next"><a class="' +
                    a +
                    'next" href="#">' +
                    r.vars.nextText +
                    "</a></li></ul>"
                );
                r.customDirectionNav
                  ? (r.directionNav = r.customDirectionNav)
                  : r.controlsContainer
                  ? (e(r.controlsContainer).append(t),
                    (r.directionNav = e(
                      "." + a + "direction-nav li a",
                      r.controlsContainer
                    )))
                  : (r.append(t),
                    (r.directionNav = e("." + a + "direction-nav li a", r))),
                  v.directionNav.update(),
                  r.directionNav.bind(l, function (t) {
                    var n;
                    t.preventDefault(),
                      ("" !== u && u !== t.type) ||
                        ((n = e(this).hasClass(a + "next")
                          ? r.getTarget("next")
                          : r.getTarget("prev")),
                        r.flexAnimate(n, r.vars.pauseOnAction)),
                      "" === u && (u = t.type),
                      v.setToClearWatchedEvent();
                  });
              },
              update: function () {
                var e = a + "disabled";
                1 === r.pagingCount
                  ? r.directionNav.addClass(e).attr("tabindex", "-1")
                  : r.vars.animationLoop
                  ? r.directionNav.removeClass(e).removeAttr("tabindex")
                  : 0 === r.animatingTo
                  ? r.directionNav
                      .removeClass(e)
                      .filter("." + a + "prev")
                      .addClass(e)
                      .attr("tabindex", "-1")
                  : r.animatingTo === r.last
                  ? r.directionNav
                      .removeClass(e)
                      .filter("." + a + "next")
                      .addClass(e)
                      .attr("tabindex", "-1")
                  : r.directionNav.removeClass(e).removeAttr("tabindex");
              },
            },
            pausePlay: {
              setup: function () {
                var t = e(
                  '<div class="' + a + 'pauseplay"><a href="#"></a></div>'
                );
                r.controlsContainer
                  ? (r.controlsContainer.append(t),
                    (r.pausePlay = e(
                      "." + a + "pauseplay a",
                      r.controlsContainer
                    )))
                  : (r.append(t), (r.pausePlay = e("." + a + "pauseplay a", r))),
                  v.pausePlay.update(r.vars.slideshow ? a + "pause" : a + "play"),
                  r.pausePlay.bind(l, function (t) {
                    t.preventDefault(),
                      ("" !== u && u !== t.type) ||
                        (e(this).hasClass(a + "pause")
                          ? ((r.manualPause = !0), (r.manualPlay = !1), r.pause())
                          : ((r.manualPause = !1),
                            (r.manualPlay = !0),
                            r.play())),
                      "" === u && (u = t.type),
                      v.setToClearWatchedEvent();
                  });
              },
              update: function (e) {
                "play" === e
                  ? r.pausePlay
                      .removeClass(a + "pause")
                      .addClass(a + "play")
                      .html(r.vars.playText)
                  : r.pausePlay
                      .removeClass(a + "play")
                      .addClass(a + "pause")
                      .html(r.vars.pauseText);
              },
            },
            touch: function () {
              var e,
                t,
                i,
                o,
                a,
                c,
                l,
                u,
                h,
                v = !1,
                g = 0,
                y = 0,
                b = 0;
              s
                ? ((n.style.msTouchAction = "none"),
                  (n._gesture = new MSGesture()),
                  (n._gesture.target = n),
                  n.addEventListener(
                    "MSPointerDown",
                    function (e) {
                      e.stopPropagation(),
                        r.animating
                          ? e.preventDefault()
                          : (r.pause(),
                            n._gesture.addPointer(e.pointerId),
                            (b = 0),
                            (o = d ? r.h : r.w),
                            (c = Number(new Date())),
                            (i =
                              f && p && r.animatingTo === r.last
                                ? 0
                                : f && p
                                ? r.limit -
                                  (r.itemW + r.vars.itemMargin) *
                                    r.move *
                                    r.animatingTo
                                : f && r.currentSlide === r.last
                                ? r.limit
                                : f
                                ? (r.itemW + r.vars.itemMargin) *
                                  r.move *
                                  r.currentSlide
                                : p
                                ? (r.last - r.currentSlide + r.cloneOffset) * o
                                : (r.currentSlide + r.cloneOffset) * o));
                    },
                    !1
                  ),
                  (n._slider = r),
                  n.addEventListener(
                    "MSGestureChange",
                    function (e) {
                      e.stopPropagation();
                      var t = e.target._slider;
                      if (t) {
                        var r = -e.translationX,
                          s = -e.translationY;
                        return (
                          (a = b += d ? s : r),
                          (v = d
                            ? Math.abs(b) < Math.abs(-r)
                            : Math.abs(b) < Math.abs(-s)),
                          e.detail === e.MSGESTURE_FLAG_INERTIA
                            ? void setImmediate(function () {
                                n._gesture.stop();
                              })
                            : void (
                                (!v || Number(new Date()) - c > 500) &&
                                (e.preventDefault(),
                                !m &&
                                  t.transitions &&
                                  (t.vars.animationLoop ||
                                    (a =
                                      b /
                                      ((0 === t.currentSlide && 0 > b) ||
                                      (t.currentSlide === t.last && b > 0)
                                        ? Math.abs(b) / o + 2
                                        : 1)),
                                  t.setProps(i + a, "setTouch")))
                              )
                        );
                      }
                    },
                    !1
                  ),
                  n.addEventListener(
                    "MSGestureEnd",
                    function (n) {
                      n.stopPropagation();
                      var r = n.target._slider;
                      if (r) {
                        if (
                          r.animatingTo === r.currentSlide &&
                          !v &&
                          null !== a
                        ) {
                          var s = p ? -a : a,
                            l = s > 0 ? r.getTarget("next") : r.getTarget("prev");
                          r.canAdvance(l) &&
                          ((Number(new Date()) - c < 550 && Math.abs(s) > 50) ||
                            Math.abs(s) > o / 2)
                            ? r.flexAnimate(l, r.vars.pauseOnAction)
                            : m ||
                              r.flexAnimate(
                                r.currentSlide,
                                r.vars.pauseOnAction,
                                !0
                              );
                        }
                        (e = null), (t = null), (a = null), (i = null), (b = 0);
                      }
                    },
                    !1
                  ))
                : ((l = function (a) {
                    r.animating
                      ? a.preventDefault()
                      : (window.navigator.msPointerEnabled ||
                          1 === a.touches.length) &&
                        (r.pause(),
                        (o = d ? r.h : r.w),
                        (c = Number(new Date())),
                        (g = a.touches[0].pageX),
                        (y = a.touches[0].pageY),
                        (i =
                          f && p && r.animatingTo === r.last
                            ? 0
                            : f && p
                            ? r.limit -
                              (r.itemW + r.vars.itemMargin) *
                                r.move *
                                r.animatingTo
                            : f && r.currentSlide === r.last
                            ? r.limit
                            : f
                            ? (r.itemW + r.vars.itemMargin) *
                              r.move *
                              r.currentSlide
                            : p
                            ? (r.last - r.currentSlide + r.cloneOffset) * o
                            : (r.currentSlide + r.cloneOffset) * o),
                        (e = d ? y : g),
                        (t = d ? g : y),
                        n.addEventListener("touchmove", u, !1),
                        n.addEventListener("touchend", h, !1));
                  }),
                  (u = function (n) {
                    (g = n.touches[0].pageX),
                      (y = n.touches[0].pageY),
                      (a = d ? e - y : e - g);
                    (!(v = d
                      ? Math.abs(a) < Math.abs(g - t)
                      : Math.abs(a) < Math.abs(y - t)) ||
                      Number(new Date()) - c > 500) &&
                      (n.preventDefault(),
                      !m &&
                        r.transitions &&
                        (r.vars.animationLoop ||
                          (a /=
                            (0 === r.currentSlide && 0 > a) ||
                            (r.currentSlide === r.last && a > 0)
                              ? Math.abs(a) / o + 2
                              : 1),
                        r.setProps(i + a, "setTouch")));
                  }),
                  (h = function (s) {
                    if (
                      (n.removeEventListener("touchmove", u, !1),
                      r.animatingTo === r.currentSlide && !v && null !== a)
                    ) {
                      var l = p ? -a : a,
                        d = l > 0 ? r.getTarget("next") : r.getTarget("prev");
                      r.canAdvance(d) &&
                      ((Number(new Date()) - c < 550 && Math.abs(l) > 50) ||
                        Math.abs(l) > o / 2)
                        ? r.flexAnimate(d, r.vars.pauseOnAction)
                        : m ||
                          r.flexAnimate(r.currentSlide, r.vars.pauseOnAction, !0);
                    }
                    n.removeEventListener("touchend", h, !1),
                      (e = null),
                      (t = null),
                      (a = null),
                      (i = null);
                  }),
                  n.addEventListener("touchstart", l, !1));
            },
            resize: function () {
              !r.animating &&
                r.is(":visible") &&
                (f || r.doMath(),
                m
                  ? v.smoothHeight()
                  : f
                  ? (r.slides.width(r.computedW),
                    r.update(r.pagingCount),
                    r.setProps())
                  : d
                  ? (r.viewport.height(r.h), r.setProps(r.h, "setTotal"))
                  : (r.vars.smoothHeight && v.smoothHeight(),
                    r.newSlides.width(r.computedW),
                    r.setProps(r.computedW, "setTotal")));
            },
            smoothHeight: function (e) {
              if (!d || m) {
                var t = m ? r : r.viewport;
                e
                  ? t.animate(
                      { height: r.slides.eq(r.animatingTo).innerHeight() },
                      e
                    )
                  : t.innerHeight(r.slides.eq(r.animatingTo).innerHeight());
              }
            },
            sync: function (t) {
              var n = e(r.vars.sync).data("flexslider"),
                i = r.animatingTo;
              switch (t) {
                case "animate":
                  n.flexAnimate(i, r.vars.pauseOnAction, !1, !0);
                  break;
                case "play":
                  n.playing || n.asNav || n.play();
                  break;
                case "pause":
                  n.pause();
              }
            },
            uniqueID: function (t) {
              return (
                t
                  .filter("[id]")
                  .add(t.find("[id]"))
                  .each(function () {
                    var t = e(this);
                    t.attr("id", t.attr("id") + "_clone");
                  }),
                t
              );
            },
            pauseInvisible: {
              visProp: null,
              init: function () {
                var e = v.pauseInvisible.getHiddenProp();
                if (e) {
                  var t = e.replace(/[H|h]idden/, "") + "visibilitychange";
                  document.addEventListener(t, function () {
                    v.pauseInvisible.isHidden()
                      ? r.startTimeout
                        ? clearTimeout(r.startTimeout)
                        : r.pause()
                      : r.started
                      ? r.play()
                      : r.vars.initDelay > 0
                      ? setTimeout(r.play, r.vars.initDelay)
                      : r.play();
                  });
                }
              },
              isHidden: function () {
                var e = v.pauseInvisible.getHiddenProp();
                return !!e && document[e];
              },
              getHiddenProp: function () {
                var e = ["webkit", "moz", "ms", "o"];
                if ("hidden" in document) return "hidden";
                for (var t = 0; t < e.length; t++)
                  if (e[t] + "Hidden" in document) return e[t] + "Hidden";
                return null;
              },
            },
            setToClearWatchedEvent: function () {
              clearTimeout(o),
                (o = setTimeout(function () {
                  u = "";
                }, 3e3));
            },
          }),
          (r.flexAnimate = function (t, n, i, o, s) {
            if (
              (r.vars.animationLoop ||
                t === r.currentSlide ||
                (r.direction = t > r.currentSlide ? "next" : "prev"),
              h &&
                1 === r.pagingCount &&
                (r.direction = r.currentItem < t ? "next" : "prev"),
              !r.animating && (r.canAdvance(t, s) || i) && r.is(":visible"))
            ) {
              if (h && o) {
                var l = e(r.vars.asNavFor).data("flexslider");
                if (
                  ((r.atEnd = 0 === t || t === r.count - 1),
                  l.flexAnimate(t, !0, !1, !0, s),
                  (r.direction = r.currentItem < t ? "next" : "prev"),
                  (l.direction = r.direction),
                  Math.ceil((t + 1) / r.visible) - 1 === r.currentSlide ||
                    0 === t)
                )
                  return (
                    (r.currentItem = t),
                    r.slides
                      .removeClass(a + "active-slide")
                      .eq(t)
                      .addClass(a + "active-slide"),
                    !1
                  );
                (r.currentItem = t),
                  r.slides
                    .removeClass(a + "active-slide")
                    .eq(t)
                    .addClass(a + "active-slide"),
                  (t = Math.floor(t / r.visible));
              }
              if (
                ((r.animating = !0),
                (r.animatingTo = t),
                n && r.pause(),
                r.vars.before(r),
                r.syncExists && !s && v.sync("animate"),
                r.vars.controlNav && v.controlNav.active(),
                f ||
                  r.slides
                    .removeClass(a + "active-slide")
                    .eq(t)
                    .addClass(a + "active-slide"),
                (r.atEnd = 0 === t || t === r.last),
                r.vars.directionNav && v.directionNav.update(),
                t === r.last &&
                  (r.vars.end(r), r.vars.animationLoop || r.pause()),
                m)
              )
                c
                  ? (r.slides.eq(r.currentSlide).css({ opacity: 0, zIndex: 1 }),
                    r.slides.eq(t).css({ opacity: 1, zIndex: 2 }),
                    r.wrapup(b))
                  : (r.slides
                      .eq(r.currentSlide)
                      .css({ zIndex: 1 })
                      .animate(
                        { opacity: 0 },
                        r.vars.animationSpeed,
                        r.vars.easing
                      ),
                    r.slides
                      .eq(t)
                      .css({ zIndex: 2 })
                      .animate(
                        { opacity: 1 },
                        r.vars.animationSpeed,
                        r.vars.easing,
                        r.wrapup
                      ));
              else {
                var u,
                  g,
                  y,
                  b = d ? r.slides.filter(":first").height() : r.computedW;
                f
                  ? ((u = r.vars.itemMargin),
                    (g =
                      (y = (r.itemW + u) * r.move * r.animatingTo) > r.limit &&
                      1 !== r.visible
                        ? r.limit
                        : y))
                  : (g =
                      0 === r.currentSlide &&
                      t === r.count - 1 &&
                      r.vars.animationLoop &&
                      "next" !== r.direction
                        ? p
                          ? (r.count + r.cloneOffset) * b
                          : 0
                        : r.currentSlide === r.last &&
                          0 === t &&
                          r.vars.animationLoop &&
                          "prev" !== r.direction
                        ? p
                          ? 0
                          : (r.count + 1) * b
                        : p
                        ? (r.count - 1 - t + r.cloneOffset) * b
                        : (t + r.cloneOffset) * b),
                  r.setProps(g, "", r.vars.animationSpeed),
                  r.transitions
                    ? ((r.vars.animationLoop && r.atEnd) ||
                        ((r.animating = !1), (r.currentSlide = r.animatingTo)),
                      r.container.unbind("webkitTransitionEnd transitionend"),
                      r.container.bind(
                        "webkitTransitionEnd transitionend",
                        function () {
                          clearTimeout(r.ensureAnimationEnd), r.wrapup(b);
                        }
                      ),
                      clearTimeout(r.ensureAnimationEnd),
                      (r.ensureAnimationEnd = setTimeout(function () {
                        r.wrapup(b);
                      }, r.vars.animationSpeed + 100)))
                    : r.container.animate(
                        r.args,
                        r.vars.animationSpeed,
                        r.vars.easing,
                        function () {
                          r.wrapup(b);
                        }
                      );
              }
              r.vars.smoothHeight && v.smoothHeight(r.vars.animationSpeed);
            }
          }),
          (r.wrapup = function (e) {
            m ||
              f ||
              (0 === r.currentSlide &&
              r.animatingTo === r.last &&
              r.vars.animationLoop
                ? r.setProps(e, "jumpEnd")
                : r.currentSlide === r.last &&
                  0 === r.animatingTo &&
                  r.vars.animationLoop &&
                  r.setProps(e, "jumpStart")),
              (r.animating = !1),
              (r.currentSlide = r.animatingTo),
              r.vars.after(r);
          }),
          (r.animateSlides = function () {
            !r.animating && t && r.flexAnimate(r.getTarget("next"));
          }),
          (r.pause = function () {
            clearInterval(r.animatedSlides),
              (r.animatedSlides = null),
              (r.playing = !1),
              r.vars.pausePlay && v.pausePlay.update("play"),
              r.syncExists && v.sync("pause");
          }),
          (r.play = function () {
            r.playing && clearInterval(r.animatedSlides),
              (r.animatedSlides =
                r.animatedSlides ||
                setInterval(r.animateSlides, r.vars.slideshowSpeed)),
              (r.started = r.playing = !0),
              r.vars.pausePlay && v.pausePlay.update("pause"),
              r.syncExists && v.sync("play");
          }),
          (r.stop = function () {
            r.pause(), (r.stopped = !0);
          }),
          (r.canAdvance = function (e, t) {
            var n = h ? r.pagingCount - 1 : r.last;
            return !(
              !t &&
              (!h ||
                r.currentItem !== r.count - 1 ||
                0 !== e ||
                "prev" !== r.direction) &&
              ((h &&
                0 === r.currentItem &&
                e === r.pagingCount - 1 &&
                "next" !== r.direction) ||
                (e === r.currentSlide && !h) ||
                (!r.vars.animationLoop &&
                  ((r.atEnd &&
                    0 === r.currentSlide &&
                    e === n &&
                    "next" !== r.direction) ||
                    (r.atEnd &&
                      r.currentSlide === n &&
                      0 === e &&
                      "next" === r.direction))))
            );
          }),
          (r.getTarget = function (e) {
            return (
              (r.direction = e),
              "next" === e
                ? r.currentSlide === r.last
                  ? 0
                  : r.currentSlide + 1
                : 0 === r.currentSlide
                ? r.last
                : r.currentSlide - 1
            );
          }),
          (r.setProps = function (e, t, n) {
            var i = (function () {
              var n = e || (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo;
              return (
                -1 *
                  (function () {
                    if (f)
                      return "setTouch" === t
                        ? e
                        : p && r.animatingTo === r.last
                        ? 0
                        : p
                        ? r.limit -
                          (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo
                        : r.animatingTo === r.last
                        ? r.limit
                        : n;
                    switch (t) {
                      case "setTotal":
                        return p
                          ? (r.count - 1 - r.currentSlide + r.cloneOffset) * e
                          : (r.currentSlide + r.cloneOffset) * e;
                      case "setTouch":
                        return e;
                      case "jumpEnd":
                        return p ? e : r.count * e;
                      case "jumpStart":
                        return p ? r.count * e : e;
                      default:
                        return e;
                    }
                  })() +
                "px"
              );
            })();
            r.transitions &&
              ((i = d
                ? "translate3d(0," + i + ",0)"
                : "translate3d(" + i + ",0,0)"),
              (n = void 0 !== n ? n / 1e3 + "s" : "0s"),
              r.container.css("-" + r.pfx + "-transition-duration", n),
              r.container.css("transition-duration", n)),
              (r.args[r.prop] = i),
              (r.transitions || void 0 === n) && r.container.css(r.args),
              r.container.css("transform", i);
          }),
          (r.setup = function (t) {
            var n, i;
            m
              ? (r.slides.css({
                  width: "100%",
                  float: "left",
                  marginRight: "-100%",
                  position: "relative",
                }),
                "init" === t &&
                  (c
                    ? r.slides
                        .css({
                          opacity: 0,
                          display: "block",
                          webkitTransition:
                            "opacity " + r.vars.animationSpeed / 1e3 + "s ease",
                          zIndex: 1,
                        })
                        .eq(r.currentSlide)
                        .css({ opacity: 1, zIndex: 2 })
                    : 0 == r.vars.fadeFirstSlide
                    ? r.slides
                        .css({ opacity: 0, display: "block", zIndex: 1 })
                        .eq(r.currentSlide)
                        .css({ zIndex: 2 })
                        .css({ opacity: 1 })
                    : r.slides
                        .css({ opacity: 0, display: "block", zIndex: 1 })
                        .eq(r.currentSlide)
                        .css({ zIndex: 2 })
                        .animate(
                          { opacity: 1 },
                          r.vars.animationSpeed,
                          r.vars.easing
                        )),
                r.vars.smoothHeight && v.smoothHeight())
              : ("init" === t &&
                  ((r.viewport = e('<div class="' + a + 'viewport"></div>')
                    .css({ overflow: "hidden", position: "relative" })
                    .appendTo(r)
                    .append(r.container)),
                  (r.cloneCount = 0),
                  (r.cloneOffset = 0),
                  p &&
                    ((i = e.makeArray(r.slides).reverse()),
                    (r.slides = e(i)),
                    r.container.empty().append(r.slides))),
                r.vars.animationLoop &&
                  !f &&
                  ((r.cloneCount = 2),
                  (r.cloneOffset = 1),
                  "init" !== t && r.container.find(".clone").remove(),
                  r.container
                    .append(
                      v
                        .uniqueID(r.slides.first().clone().addClass("clone"))
                        .attr("aria-hidden", "true")
                    )
                    .prepend(
                      v
                        .uniqueID(r.slides.last().clone().addClass("clone"))
                        .attr("aria-hidden", "true")
                    )),
                (r.newSlides = e(r.vars.selector, r)),
                (n = p
                  ? r.count - 1 - r.currentSlide + r.cloneOffset
                  : r.currentSlide + r.cloneOffset),
                d && !f
                  ? (r.container
                      .height(200 * (r.count + r.cloneCount) + "%")
                      .css("position", "absolute")
                      .width("100%"),
                    setTimeout(
                      function () {
                        r.newSlides.css({ display: "block" }),
                          r.doMath(),
                          r.viewport.height(r.h),
                          r.setProps(n * r.h, "init");
                      },
                      "init" === t ? 100 : 0
                    ))
                  : (r.container.width(200 * (r.count + r.cloneCount) + "%"),
                    r.setProps(n * r.computedW, "init"),
                    setTimeout(
                      function () {
                        r.doMath(),
                          r.newSlides.css({
                            width: r.computedW,
                            marginRight: r.computedM,
                            float: "left",
                            display: "block",
                          }),
                          r.vars.smoothHeight && v.smoothHeight();
                      },
                      "init" === t ? 100 : 0
                    )));
            f ||
              r.slides
                .removeClass(a + "active-slide")
                .eq(r.currentSlide)
                .addClass(a + "active-slide"),
              r.vars.init(r);
          }),
          (r.doMath = function () {
            var e = r.slides.first(),
              t = r.vars.itemMargin,
              n = r.vars.minItems,
              i = r.vars.maxItems;
            (r.w = void 0 === r.viewport ? r.width() : r.viewport.width()),
              (r.h = e.height()),
              (r.boxPadding = e.outerWidth() - e.width()),
              f
                ? ((r.itemT = r.vars.itemWidth + t),
                  (r.itemM = t),
                  (r.minW = n ? n * r.itemT : r.w),
                  (r.maxW = i ? i * r.itemT - t : r.w),
                  (r.itemW =
                    r.minW > r.w
                      ? (r.w - t * (n - 1)) / n
                      : r.maxW < r.w
                      ? (r.w - t * (i - 1)) / i
                      : r.vars.itemWidth > r.w
                      ? r.w
                      : r.vars.itemWidth),
                  (r.visible = Math.floor(r.w / r.itemW)),
                  (r.move =
                    r.vars.move > 0 && r.vars.move < r.visible
                      ? r.vars.move
                      : r.visible),
                  (r.pagingCount = Math.ceil((r.count - r.visible) / r.move + 1)),
                  (r.last = r.pagingCount - 1),
                  (r.limit =
                    1 === r.pagingCount
                      ? 0
                      : r.vars.itemWidth > r.w
                      ? r.itemW * (r.count - 1) + t * (r.count - 1)
                      : (r.itemW + t) * r.count - r.w - t))
                : ((r.itemW = r.w),
                  (r.itemM = t),
                  (r.pagingCount = r.count),
                  (r.last = r.count - 1)),
              (r.computedW = r.itemW - r.boxPadding),
              (r.computedM = r.itemM);
          }),
          (r.update = function (e, t) {
            r.doMath(),
              f ||
                (e < r.currentSlide
                  ? (r.currentSlide += 1)
                  : e <= r.currentSlide && 0 !== e && (r.currentSlide -= 1),
                (r.animatingTo = r.currentSlide)),
              r.vars.controlNav &&
                !r.manualControls &&
                (("add" === t && !f) || r.pagingCount > r.controlNav.length
                  ? v.controlNav.update("add")
                  : (("remove" === t && !f) ||
                      r.pagingCount < r.controlNav.length) &&
                    (f &&
                      r.currentSlide > r.last &&
                      ((r.currentSlide -= 1), (r.animatingTo -= 1)),
                    v.controlNav.update("remove", r.last))),
              r.vars.directionNav && v.directionNav.update();
          }),
          (r.addSlide = function (t, n) {
            var i = e(t);
            (r.count += 1),
              (r.last = r.count - 1),
              d && p
                ? void 0 !== n
                  ? r.slides.eq(r.count - n).after(i)
                  : r.container.prepend(i)
                : void 0 !== n
                ? r.slides.eq(n).before(i)
                : r.container.append(i),
              r.update(n, "add"),
              (r.slides = e(r.vars.selector + ":not(.clone)", r)),
              r.setup(),
              r.vars.added(r);
          }),
          (r.removeSlide = function (t) {
            var n = isNaN(t) ? r.slides.index(e(t)) : t;
            (r.count -= 1),
              (r.last = r.count - 1),
              isNaN(t)
                ? e(t, r.slides).remove()
                : d && p
                ? r.slides.eq(r.last).remove()
                : r.slides.eq(t).remove(),
              r.doMath(),
              r.update(n, "remove"),
              (r.slides = e(r.vars.selector + ":not(.clone)", r)),
              r.setup(),
              r.vars.removed(r);
          }),
          v.init();
      }),
        e(window)
          .blur(function (e) {
            t = !1;
          })
          .focus(function (e) {
            t = !0;
          }),
        (e.flexslider.defaults = {
          namespace: "flex-",
          selector: ".slides > li",
          animation: "fade",
          easing: "swing",
          direction: "horizontal",
          reverse: !1,
          animationLoop: !0,
          smoothHeight: !1,
          startAt: 0,
          slideshow: !0,
          slideshowSpeed: 7e3,
          animationSpeed: 600,
          initDelay: 0,
          randomize: !1,
          fadeFirstSlide: !0,
          thumbCaptions: !1,
          pauseOnAction: !0,
          pauseOnHover: !1,
          pauseInvisible: !0,
          useCSS: !0,
          touch: !0,
          video: !1,
          controlNav: !0,
          directionNav: !0,
          prevText: "Previous",
          nextText: "Next",
          keyboard: !0,
          multipleKeyboard: !1,
          mousewheel: !1,
          pausePlay: !1,
          pauseText: "Pause",
          playText: "Play",
          controlsContainer: "",
          manualControls: "",
          customDirectionNav: "",
          sync: "",
          asNavFor: "",
          itemWidth: 0,
          itemMargin: 0,
          minItems: 1,
          maxItems: 0,
          move: 0,
          allowOneSlide: !0,
          start: function () {},
          before: function () {},
          after: function () {},
          end: function () {},
          added: function () {},
          removed: function () {},
          init: function () {},
        }),
        (e.fn.flexslider = function (t) {
          if ((void 0 === t && (t = {}), "object" == typeof t))
            return this.each(function () {
              var n = e(this),
                i = t.selector ? t.selector : ".slides > li",
                r = n.find(i);
              (1 === r.length && !1 === t.allowOneSlide) || 0 === r.length
                ? (r.fadeIn(400), t.start && t.start(n))
                : void 0 === n.data("flexslider") && new e.flexslider(this, t);
            });
          var n = e(this).data("flexslider");
          switch (t) {
            case "play":
              n.play();
              break;
            case "pause":
              n.pause();
              break;
            case "stop":
              n.stop();
              break;
            case "next":
              n.flexAnimate(n.getTarget("next"), !0);
              break;
            case "prev":
            case "previous":
              n.flexAnimate(n.getTarget("prev"), !0);
              break;
            default:
              "number" == typeof t && n.flexAnimate(t, !0);
          }
        });
    })(jQuery),
    (function (e) {
      "function" == typeof define && define.amd
        ? define(["jquery"], e)
        : e(
            "object" == typeof exports
              ? require("jquery")
              : window.jQuery || window.Zepto
          );
    })(function (e) {
      var t,
        n,
        i,
        r,
        o,
        a,
        s = "Close",
        c = "BeforeClose",
        l = "MarkupParse",
        u = "Open",
        d = "Change",
        p = "mfp",
        f = "." + p,
        m = "mfp-ready",
        h = "mfp-removing",
        v = "mfp-prevent-close",
        g = function () {},
        y = !!window.jQuery,
        b = e(window),
        S = function (e, n) {
          t.ev.on(p + e + f, n);
        },
        w = function (t, n, i, r) {
          var o = document.createElement("div");
          return (
            (o.className = "mfp-" + t),
            i && (o.innerHTML = i),
            r ? n && n.appendChild(o) : ((o = e(o)), n && o.appendTo(n)),
            o
          );
        },
        C = function (n, i) {
          t.ev.triggerHandler(p + n, i),
            t.st.callbacks &&
              ((n = n.charAt(0).toLowerCase() + n.slice(1)),
              t.st.callbacks[n] &&
                t.st.callbacks[n].apply(t, e.isArray(i) ? i : [i]));
        },
        x = function (n) {
          return (
            (n === a && t.currTemplate.closeBtn) ||
              ((t.currTemplate.closeBtn = e(
                t.st.closeMarkup.replace("%title%", t.st.tClose)
              )),
              (a = n)),
            t.currTemplate.closeBtn
          );
        },
        I = function () {
          e.magnificPopup.instance ||
            ((t = new g()).init(), (e.magnificPopup.instance = t));
        };
      (g.prototype = {
        constructor: g,
        init: function () {
          var n = navigator.appVersion;
          (t.isLowIE = t.isIE8 = document.all && !document.addEventListener),
            (t.isAndroid = /android/gi.test(n)),
            (t.isIOS = /iphone|ipad|ipod/gi.test(n)),
            (t.supportsTransition = (function () {
              var e = document.createElement("p").style,
                t = ["ms", "O", "Moz", "Webkit"];
              if (void 0 !== e.transition) return !0;
              for (; t.length; ) if (t.pop() + "Transition" in e) return !0;
              return !1;
            })()),
            (t.probablyMobile =
              t.isAndroid ||
              t.isIOS ||
              /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
                navigator.userAgent
              )),
            (i = e(document)),
            (t.popupsCache = {});
        },
        open: function (n) {
          var r;
          if (!1 === n.isObj) {
            (t.items = n.items.toArray()), (t.index = 0);
            var a,
              s = n.items;
            for (r = 0; r < s.length; r++)
              if (((a = s[r]).parsed && (a = a.el[0]), a === n.el[0])) {
                t.index = r;
                break;
              }
          } else
            (t.items = e.isArray(n.items) ? n.items : [n.items]),
              (t.index = n.index || 0);
          if (!t.isOpen) {
            (t.types = []),
              (o = ""),
              n.mainEl && n.mainEl.length ? (t.ev = n.mainEl.eq(0)) : (t.ev = i),
              n.key
                ? (t.popupsCache[n.key] || (t.popupsCache[n.key] = {}),
                  (t.currTemplate = t.popupsCache[n.key]))
                : (t.currTemplate = {}),
              (t.st = e.extend(!0, {}, e.magnificPopup.defaults, n)),
              (t.fixedContentPos =
                "auto" === t.st.fixedContentPos
                  ? !t.probablyMobile
                  : t.st.fixedContentPos),
              t.st.modal &&
                ((t.st.closeOnContentClick = !1),
                (t.st.closeOnBgClick = !1),
                (t.st.showCloseBtn = !1),
                (t.st.enableEscapeKey = !1)),
              t.bgOverlay ||
                ((t.bgOverlay = w("bg").on("click" + f, function () {
                  t.close();
                })),
                (t.wrap = w("wrap")
                  .attr("tabindex", -1)
                  .on("click" + f, function (e) {
                    t._checkIfClose(e.target) && t.close();
                  })),
                (t.container = w("container", t.wrap))),
              (t.contentContainer = w("content")),
              t.st.preloader &&
                (t.preloader = w("preloader", t.container, t.st.tLoading));
            var c = e.magnificPopup.modules;
            for (r = 0; r < c.length; r++) {
              var d = c[r];
              (d = d.charAt(0).toUpperCase() + d.slice(1)), t["init" + d].call(t);
            }
            C("BeforeOpen"),
              t.st.showCloseBtn &&
                (t.st.closeBtnInside
                  ? (S(l, function (e, t, n, i) {
                      n.close_replaceWith = x(i.type);
                    }),
                    (o += " mfp-close-btn-in"))
                  : t.wrap.append(x())),
              t.st.alignTop && (o += " mfp-align-top"),
              t.fixedContentPos
                ? t.wrap.css({
                    overflow: t.st.overflowY,
                    overflowX: "hidden",
                    overflowY: t.st.overflowY,
                  })
                : t.wrap.css({ top: b.scrollTop(), position: "absolute" }),
              (!1 === t.st.fixedBgPos ||
                ("auto" === t.st.fixedBgPos && !t.fixedContentPos)) &&
                t.bgOverlay.css({ height: i.height(), position: "absolute" }),
              t.st.enableEscapeKey &&
                i.on("keyup" + f, function (e) {
                  27 === e.keyCode && t.close();
                }),
              b.on("resize" + f, function () {
                t.updateSize();
              }),
              t.st.closeOnContentClick || (o += " mfp-auto-cursor"),
              o && t.wrap.addClass(o);
            var p = (t.wH = b.height()),
              h = {};
            if (t.fixedContentPos && t._hasScrollBar(p)) {
              var v = t._getScrollbarSize();
              v && (h.marginRight = v);
            }
            t.fixedContentPos &&
              (t.isIE7
                ? e("body, html").css("overflow", "hidden")
                : (h.overflow = "hidden"));
            var g = t.st.mainClass;
            return (
              t.isIE7 && (g += " mfp-ie7"),
              g && t._addClassToMFP(g),
              t.updateItemHTML(),
              C("BuildControls"),
              e("html").css(h),
              t.bgOverlay
                .add(t.wrap)
                .prependTo(t.st.prependTo || e(document.body)),
              (t._lastFocusedEl = document.activeElement),
              setTimeout(function () {
                t.content
                  ? (t._addClassToMFP(m), t._setFocus())
                  : t.bgOverlay.addClass(m),
                  i.on("focusin" + f, t._onFocusIn);
              }, 16),
              (t.isOpen = !0),
              t.updateSize(p),
              C(u),
              n
            );
          }
          t.updateItemHTML();
        },
        close: function () {
          t.isOpen &&
            (C(c),
            (t.isOpen = !1),
            t.st.removalDelay && !t.isLowIE && t.supportsTransition
              ? (t._addClassToMFP(h),
                setTimeout(function () {
                  t._close();
                }, t.st.removalDelay))
              : t._close());
        },
        _close: function () {
          C(s);
          var n = h + " " + m + " ";
          if (
            (t.bgOverlay.detach(),
            t.wrap.detach(),
            t.container.empty(),
            t.st.mainClass && (n += t.st.mainClass + " "),
            t._removeClassFromMFP(n),
            t.fixedContentPos)
          ) {
            var r = { marginRight: "" };
            t.isIE7 ? e("body, html").css("overflow", "") : (r.overflow = ""),
              e("html").css(r);
          }
          i.off("keyup.mfp focusin" + f),
            t.ev.off(f),
            t.wrap.attr("class", "mfp-wrap").removeAttr("style"),
            t.bgOverlay.attr("class", "mfp-bg"),
            t.container.attr("class", "mfp-container"),
            !t.st.showCloseBtn ||
              (t.st.closeBtnInside && !0 !== t.currTemplate[t.currItem.type]) ||
              (t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach()),
            t.st.autoFocusLast && t._lastFocusedEl && e(t._lastFocusedEl).focus(),
            (t.currItem = null),
            (t.content = null),
            (t.currTemplate = null),
            (t.prevHeight = 0),
            C("AfterClose");
        },
        updateSize: function (e) {
          if (t.isIOS) {
            var n = document.documentElement.clientWidth / window.innerWidth,
              i = window.innerHeight * n;
            t.wrap.css("height", i), (t.wH = i);
          } else t.wH = e || b.height();
          t.fixedContentPos || t.wrap.css("height", t.wH), C("Resize");
        },
        updateItemHTML: function () {
          var n = t.items[t.index];
          t.contentContainer.detach(),
            t.content && t.content.detach(),
            n.parsed || (n = t.parseEl(t.index));
          var i = n.type;
          if (
            (C("BeforeChange", [t.currItem ? t.currItem.type : "", i]),
            (t.currItem = n),
            !t.currTemplate[i])
          ) {
            var o = !!t.st[i] && t.st[i].markup;
            C("FirstMarkupParse", o), (t.currTemplate[i] = !o || e(o));
          }
          r && r !== n.type && t.container.removeClass("mfp-" + r + "-holder");
          var a = t["get" + i.charAt(0).toUpperCase() + i.slice(1)](
            n,
            t.currTemplate[i]
          );
          t.appendContent(a, i),
            (n.preloaded = !0),
            C(d, n),
            (r = n.type),
            t.container.prepend(t.contentContainer),
            C("AfterChange");
        },
        appendContent: function (e, n) {
          (t.content = e),
            e
              ? t.st.showCloseBtn &&
                t.st.closeBtnInside &&
                !0 === t.currTemplate[n]
                ? t.content.find(".mfp-close").length || t.content.append(x())
                : (t.content = e)
              : (t.content = ""),
            C("BeforeAppend"),
            t.container.addClass("mfp-" + n + "-holder"),
            t.contentContainer.append(t.content);
        },
        parseEl: function (n) {
          var i,
            r = t.items[n];
          if (
            (r.tagName
              ? (r = { el: e(r) })
              : ((i = r.type), (r = { data: r, src: r.src })),
            r.el)
          ) {
            for (var o = t.types, a = 0; a < o.length; a++)
              if (r.el.hasClass("mfp-" + o[a])) {
                i = o[a];
                break;
              }
            (r.src = r.el.attr("data-mfp-src")),
              r.src || (r.src = r.el.attr("href"));
          }
          return (
            (r.type = i || t.st.type || "inline"),
            (r.index = n),
            (r.parsed = !0),
            (t.items[n] = r),
            C("ElementParse", r),
            t.items[n]
          );
        },
        addGroup: function (e, n) {
          var i = function (i) {
            (i.mfpEl = this), t._openClick(i, e, n);
          };
          n || (n = {});
          var r = "click.magnificPopup";
          (n.mainEl = e),
            n.items
              ? ((n.isObj = !0), e.off(r).on(r, i))
              : ((n.isObj = !1),
                n.delegate
                  ? e.off(r).on(r, n.delegate, i)
                  : ((n.items = e), e.off(r).on(r, i)));
        },
        _openClick: function (n, i, r) {
          if (
            (void 0 !== r.midClick
              ? r.midClick
              : e.magnificPopup.defaults.midClick) ||
            !(2 === n.which || n.ctrlKey || n.metaKey || n.altKey || n.shiftKey)
          ) {
            var o =
              void 0 !== r.disableOn
                ? r.disableOn
                : e.magnificPopup.defaults.disableOn;
            if (o)
              if (e.isFunction(o)) {
                if (!o.call(t)) return !0;
              } else if (b.width() < o) return !0;
            n.type && (n.preventDefault(), t.isOpen && n.stopPropagation()),
              (r.el = e(n.mfpEl)),
              r.delegate && (r.items = i.find(r.delegate)),
              t.open(r);
          }
        },
        updateStatus: function (e, i) {
          if (t.preloader) {
            n !== e && t.container.removeClass("mfp-s-" + n),
              i || "loading" !== e || (i = t.st.tLoading);
            var r = { status: e, text: i };
            C("UpdateStatus", r),
              (e = r.status),
              (i = r.text),
              t.preloader.html(i),
              t.preloader.find("a").on("click", function (e) {
                e.stopImmediatePropagation();
              }),
              t.container.addClass("mfp-s-" + e),
              (n = e);
          }
        },
        _checkIfClose: function (n) {
          if (!e(n).hasClass(v)) {
            var i = t.st.closeOnContentClick,
              r = t.st.closeOnBgClick;
            if (i && r) return !0;
            if (
              !t.content ||
              e(n).hasClass("mfp-close") ||
              (t.preloader && n === t.preloader[0])
            )
              return !0;
            if (n === t.content[0] || e.contains(t.content[0], n)) {
              if (i) return !0;
            } else if (r && e.contains(document, n)) return !0;
            return !1;
          }
        },
        _addClassToMFP: function (e) {
          t.bgOverlay.addClass(e), t.wrap.addClass(e);
        },
        _removeClassFromMFP: function (e) {
          this.bgOverlay.removeClass(e), t.wrap.removeClass(e);
        },
        _hasScrollBar: function (e) {
          return (
            (t.isIE7 ? i.height() : document.body.scrollHeight) >
            (e || b.height())
          );
        },
        _setFocus: function () {
          (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus();
        },
        _onFocusIn: function (n) {
          if (n.target !== t.wrap[0] && !e.contains(t.wrap[0], n.target))
            return t._setFocus(), !1;
        },
        _parseMarkup: function (t, n, i) {
          var r;
          i.data && (n = e.extend(i.data, n)),
            C(l, [t, n, i]),
            e.each(n, function (n, i) {
              if (void 0 === i || !1 === i) return !0;
              if ((r = n.split("_")).length > 1) {
                var o = t.find(f + "-" + r[0]);
                if (o.length > 0) {
                  var a = r[1];
                  "replaceWith" === a
                    ? o[0] !== i[0] && o.replaceWith(i)
                    : "img" === a
                    ? o.is("img")
                      ? o.attr("src", i)
                      : o.replaceWith(
                          e("<img>").attr("src", i).attr("class", o.attr("class"))
                        )
                    : o.attr(r[1], i);
                }
              } else t.find(f + "-" + n).html(i);
            });
        },
        _getScrollbarSize: function () {
          if (void 0 === t.scrollbarSize) {
            var e = document.createElement("div");
            (e.style.cssText =
              "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"),
              document.body.appendChild(e),
              (t.scrollbarSize = e.offsetWidth - e.clientWidth),
              document.body.removeChild(e);
          }
          return t.scrollbarSize;
        },
      }),
        (e.magnificPopup = {
          instance: null,
          proto: g.prototype,
          modules: [],
          open: function (t, n) {
            return (
              I(),
              ((t = t ? e.extend(!0, {}, t) : {}).isObj = !0),
              (t.index = n || 0),
              this.instance.open(t)
            );
          },
          close: function () {
            return e.magnificPopup.instance && e.magnificPopup.instance.close();
          },
          registerModule: function (t, n) {
            n.options && (e.magnificPopup.defaults[t] = n.options),
              e.extend(this.proto, n.proto),
              this.modules.push(t);
          },
          defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup:
              '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0,
          },
        }),
        (e.fn.magnificPopup = function (n) {
          I();
          var i = e(this);
          if ("string" == typeof n)
            if ("open" === n) {
              var r,
                o = y ? i.data("magnificPopup") : i[0].magnificPopup,
                a = parseInt(arguments[1], 10) || 0;
              o.items
                ? (r = o.items[a])
                : ((r = i),
                  o.delegate && (r = r.find(o.delegate)),
                  (r = r.eq(a))),
                t._openClick({ mfpEl: r }, i, o);
            } else
              t.isOpen && t[n].apply(t, Array.prototype.slice.call(arguments, 1));
          else
            (n = e.extend(!0, {}, n)),
              y ? i.data("magnificPopup", n) : (i[0].magnificPopup = n),
              t.addGroup(i, n);
          return i;
        });
      var _,
        E,
        T,
        P = "inline",
        O = function () {
          T && (E.after(T.addClass(_)).detach(), (T = null));
        };
      e.magnificPopup.registerModule(P, {
        options: {
          hiddenClass: "hide",
          markup: "",
          tNotFound: "Content not found",
        },
        proto: {
          initInline: function () {
            t.types.push(P),
              S(s + "." + P, function () {
                O();
              });
          },
          getInline: function (n, i) {
            if ((O(), n.src)) {
              var r = t.st.inline,
                o = e(n.src);
              if (o.length) {
                var a = o[0].parentNode;
                a &&
                  a.tagName &&
                  (E || ((_ = r.hiddenClass), (E = w(_)), (_ = "mfp-" + _)),
                  (T = o.after(E).detach().removeClass(_))),
                  t.updateStatus("ready");
              } else t.updateStatus("error", r.tNotFound), (o = e("<div>"));
              return (n.inlineElement = o), o;
            }
            return t.updateStatus("ready"), t._parseMarkup(i, {}, n), i;
          },
        },
      });
      var k,
        N = "ajax",
        A = function () {
          k && e(document.body).removeClass(k);
        },
        j = function () {
          A(), t.req && t.req.abort();
        };
      e.magnificPopup.registerModule(N, {
        options: {
          settings: null,
          cursor: "mfp-ajax-cur",
          tError: '<a href="%url%">The content</a> could not be loaded.',
        },
        proto: {
          initAjax: function () {
            t.types.push(N),
              (k = t.st.ajax.cursor),
              S(s + "." + N, j),
              S("BeforeChange." + N, j);
          },
          getAjax: function (n) {
            k && e(document.body).addClass(k), t.updateStatus("loading");
            var i = e.extend(
              {
                url: n.src,
                success: function (i, r, o) {
                  var a = { data: i, xhr: o };
                  C("ParseAjax", a),
                    t.appendContent(e(a.data), N),
                    (n.finished = !0),
                    A(),
                    t._setFocus(),
                    setTimeout(function () {
                      t.wrap.addClass(m);
                    }, 16),
                    t.updateStatus("ready"),
                    C("AjaxContentAdded");
                },
                error: function () {
                  A(),
                    (n.finished = n.loadError = !0),
                    t.updateStatus(
                      "error",
                      t.st.ajax.tError.replace("%url%", n.src)
                    );
                },
              },
              t.st.ajax.settings
            );
            return (t.req = e.ajax(i)), "";
          },
        },
      });
      var M,
        L = function (n) {
          if (n.data && void 0 !== n.data.title) return n.data.title;
          var i = t.st.image.titleSrc;
          if (i) {
            if (e.isFunction(i)) return i.call(t, n);
            if (n.el) return n.el.attr(i) || "";
          }
          return "";
        };
      e.magnificPopup.registerModule("image", {
        options: {
          markup:
            '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
          cursor: "mfp-zoom-out-cur",
          titleSrc: "title",
          verticalFit: !0,
          tError: '<a href="%url%">The image</a> could not be loaded.',
        },
        proto: {
          initImage: function () {
            var n = t.st.image,
              i = ".image";
            t.types.push("image"),
              S(u + i, function () {
                "image" === t.currItem.type &&
                  n.cursor &&
                  e(document.body).addClass(n.cursor);
              }),
              S(s + i, function () {
                n.cursor && e(document.body).removeClass(n.cursor),
                  b.off("resize" + f);
              }),
              S("Resize" + i, t.resizeImage),
              t.isLowIE && S("AfterChange", t.resizeImage);
          },
          resizeImage: function () {
            var e = t.currItem;
            if (e && e.img && t.st.image.verticalFit) {
              var n = 0;
              t.isLowIE &&
                (n =
                  parseInt(e.img.css("padding-top"), 10) +
                  parseInt(e.img.css("padding-bottom"), 10)),
                e.img.css("max-height", t.wH - n);
            }
          },
          _onImageHasSize: function (e) {
            e.img &&
              ((e.hasSize = !0),
              M && clearInterval(M),
              (e.isCheckingImgSize = !1),
              C("ImageHasSize", e),
              e.imgHidden &&
                (t.content && t.content.removeClass("mfp-loading"),
                (e.imgHidden = !1)));
          },
          findImageSize: function (e) {
            var n = 0,
              i = e.img[0],
              r = function (o) {
                M && clearInterval(M),
                  (M = setInterval(function () {
                    return i.naturalWidth > 0
                      ? void t._onImageHasSize(e)
                      : (n > 200 && clearInterval(M),
                        void (3 === ++n
                          ? r(10)
                          : 40 === n
                          ? r(50)
                          : 100 === n && r(500)));
                  }, o));
              };
            r(1);
          },
          getImage: function (n, i) {
            var r = 0,
              o = function () {
                n &&
                  (n.img[0].complete
                    ? (n.img.off(".mfploader"),
                      n === t.currItem &&
                        (t._onImageHasSize(n), t.updateStatus("ready")),
                      (n.hasSize = !0),
                      (n.loaded = !0),
                      C("ImageLoadComplete"))
                    : ++r < 200
                    ? setTimeout(o, 100)
                    : a());
              },
              a = function () {
                n &&
                  (n.img.off(".mfploader"),
                  n === t.currItem &&
                    (t._onImageHasSize(n),
                    t.updateStatus("error", s.tError.replace("%url%", n.src))),
                  (n.hasSize = !0),
                  (n.loaded = !0),
                  (n.loadError = !0));
              },
              s = t.st.image,
              c = i.find(".mfp-img");
            if (c.length) {
              var l = document.createElement("img");
              (l.className = "mfp-img"),
                n.el &&
                  n.el.find("img").length &&
                  ((l.alt = n.el.find("img").attr("alt")),
                  (l.srcset = n.el.find("img").attr("srcset"))),
                (n.img = e(l).on("load.mfploader", o).on("error.mfploader", a)),
                (l.src = n.src),
                c.is("img") && (n.img = n.img.clone()),
                (l = n.img[0]).naturalWidth > 0
                  ? (n.hasSize = !0)
                  : l.width || (n.hasSize = !1);
            }
            return (
              t._parseMarkup(i, { title: L(n), img_replaceWith: n.img }, n),
              t.resizeImage(),
              n.hasSize
                ? (M && clearInterval(M),
                  n.loadError
                    ? (i.addClass("mfp-loading"),
                      t.updateStatus("error", s.tError.replace("%url%", n.src)))
                    : (i.removeClass("mfp-loading"), t.updateStatus("ready")),
                  i)
                : (t.updateStatus("loading"),
                  (n.loading = !0),
                  n.hasSize ||
                    ((n.imgHidden = !0),
                    i.addClass("mfp-loading"),
                    t.findImageSize(n)),
                  i)
            );
          },
        },
      });
      var D;
      e.magnificPopup.registerModule("zoom", {
        options: {
          enabled: !1,
          easing: "ease-in-out",
          duration: 300,
          opener: function (e) {
            return e.is("img") ? e : e.find("img");
          },
        },
        proto: {
          initZoom: function () {
            var e,
              n = t.st.zoom,
              i = ".zoom";
            if (n.enabled && t.supportsTransition) {
              var r,
                o,
                a = n.duration,
                l = function (e) {
                  var t = e
                      .clone()
                      .removeAttr("style")
                      .removeAttr("class")
                      .addClass("mfp-animated-image"),
                    i = "all " + n.duration / 1e3 + "s " + n.easing,
                    r = {
                      position: "fixed",
                      zIndex: 9999,
                      left: 0,
                      top: 0,
                      "-webkit-backface-visibility": "hidden",
                    },
                    o = "transition";
                  return (
                    (r["-webkit-" + o] = r["-moz-" + o] = r["-o-" + o] = r[
                      o
                    ] = i),
                    t.css(r),
                    t
                  );
                },
                u = function () {
                  t.content.css("visibility", "visible");
                };
              S("BuildControls" + i, function () {
                if (t._allowZoom()) {
                  if (
                    (clearTimeout(r),
                    t.content.css("visibility", "hidden"),
                    !(e = t._getItemToZoom()))
                  )
                    return void u();
                  (o = l(e)).css(t._getOffset()),
                    t.wrap.append(o),
                    (r = setTimeout(function () {
                      o.css(t._getOffset(!0)),
                        (r = setTimeout(function () {
                          u(),
                            setTimeout(function () {
                              o.remove(), (e = o = null), C("ZoomAnimationEnded");
                            }, 16);
                        }, a));
                    }, 16));
                }
              }),
                S(c + i, function () {
                  if (t._allowZoom()) {
                    if ((clearTimeout(r), (t.st.removalDelay = a), !e)) {
                      if (!(e = t._getItemToZoom())) return;
                      o = l(e);
                    }
                    o.css(t._getOffset(!0)),
                      t.wrap.append(o),
                      t.content.css("visibility", "hidden"),
                      setTimeout(function () {
                        o.css(t._getOffset());
                      }, 16);
                  }
                }),
                S(s + i, function () {
                  t._allowZoom() && (u(), o && o.remove(), (e = null));
                });
            }
          },
          _allowZoom: function () {
            return "image" === t.currItem.type;
          },
          _getItemToZoom: function () {
            return !!t.currItem.hasSize && t.currItem.img;
          },
          _getOffset: function (n) {
            var i,
              r = (i = n
                ? t.currItem.img
                : t.st.zoom.opener(t.currItem.el || t.currItem)).offset(),
              o = parseInt(i.css("padding-top"), 10),
              a = parseInt(i.css("padding-bottom"), 10);
            r.top -= e(window).scrollTop() - o;
            var s = {
              width: i.width(),
              height: (y ? i.innerHeight() : i[0].offsetHeight) - a - o,
            };
            return (
              void 0 === D &&
                (D = void 0 !== document.createElement("p").style.MozTransform),
              D
                ? (s["-moz-transform"] = s.transform =
                    "translate(" + r.left + "px," + r.top + "px)")
                : ((s.left = r.left), (s.top = r.top)),
              s
            );
          },
        },
      });
      var z = "iframe",
        F = function (e) {
          if (t.currTemplate[z]) {
            var n = t.currTemplate[z].find("iframe");
            n.length &&
              (e || (n[0].src = "//about:blank"),
              t.isIE8 && n.css("display", e ? "block" : "none"));
          }
        };
      e.magnificPopup.registerModule(z, {
        options: {
          markup:
            '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
          srcAction: "iframe_src",
          patterns: {
            youtube: {
              index: "youtube.com",
              id: "v=",
              src: "//www.youtube.com/embed/%id%?autoplay=1",
            },
            vimeo: {
              index: "vimeo.com/",
              id: "/",
              src: "//player.vimeo.com/video/%id%?autoplay=1",
            },
            gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
          },
        },
        proto: {
          initIframe: function () {
            t.types.push(z),
              S("BeforeChange", function (e, t, n) {
                t !== n && (t === z ? F() : n === z && F(!0));
              }),
              S(s + "." + z, function () {
                F();
              });
          },
          getIframe: function (n, i) {
            var r = n.src,
              o = t.st.iframe;
            e.each(o.patterns, function () {
              if (r.indexOf(this.index) > -1)
                return (
                  this.id &&
                    (r =
                      "string" == typeof this.id
                        ? r.substr(
                            r.lastIndexOf(this.id) + this.id.length,
                            r.length
                          )
                        : this.id.call(this, r)),
                  (r = this.src.replace("%id%", r)),
                  !1
                );
            });
            var a = {};
            return (
              o.srcAction && (a[o.srcAction] = r),
              t._parseMarkup(i, a, n),
              t.updateStatus("ready"),
              i
            );
          },
        },
      });
      var H = function (e) {
          var n = t.items.length;
          return e > n - 1 ? e - n : e < 0 ? n + e : e;
        },
        B = function (e, t, n) {
          return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n);
        };
      e.magnificPopup.registerModule("gallery", {
        options: {
          enabled: !1,
          arrowMarkup:
            '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
          preload: [0, 2],
          navigateByImgClick: !0,
          arrows: !0,
          tPrev: "Previous (Left arrow key)",
          tNext: "Next (Right arrow key)",
          tCounter: "%curr% of %total%",
        },
        proto: {
          initGallery: function () {
            var n = t.st.gallery,
              r = ".mfp-gallery";
            return (
              (t.direction = !0),
              !(!n || !n.enabled) &&
                ((o += " mfp-gallery"),
                S(u + r, function () {
                  n.navigateByImgClick &&
                    t.wrap.on("click" + r, ".mfp-img", function () {
                      if (t.items.length > 1) return t.next(), !1;
                    }),
                    i.on("keydown" + r, function (e) {
                      37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next();
                    });
                }),
                S("UpdateStatus" + r, function (e, n) {
                  n.text &&
                    (n.text = B(n.text, t.currItem.index, t.items.length));
                }),
                S(l + r, function (e, i, r, o) {
                  var a = t.items.length;
                  r.counter = a > 1 ? B(n.tCounter, o.index, a) : "";
                }),
                S("BuildControls" + r, function () {
                  if (t.items.length > 1 && n.arrows && !t.arrowLeft) {
                    var i = n.arrowMarkup,
                      r = (t.arrowLeft = e(
                        i.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")
                      ).addClass(v)),
                      o = (t.arrowRight = e(
                        i
                          .replace(/%title%/gi, n.tNext)
                          .replace(/%dir%/gi, "right")
                      ).addClass(v));
                    r.click(function () {
                      t.prev();
                    }),
                      o.click(function () {
                        t.next();
                      }),
                      t.container.append(r.add(o));
                  }
                }),
                S(d + r, function () {
                  t._preloadTimeout && clearTimeout(t._preloadTimeout),
                    (t._preloadTimeout = setTimeout(function () {
                      t.preloadNearbyImages(), (t._preloadTimeout = null);
                    }, 16));
                }),
                void S(s + r, function () {
                  i.off(r),
                    t.wrap.off("click" + r),
                    (t.arrowRight = t.arrowLeft = null);
                }))
            );
          },
          next: function () {
            (t.direction = !0), (t.index = H(t.index + 1)), t.updateItemHTML();
          },
          prev: function () {
            (t.direction = !1), (t.index = H(t.index - 1)), t.updateItemHTML();
          },
          goTo: function (e) {
            (t.direction = e >= t.index), (t.index = e), t.updateItemHTML();
          },
          preloadNearbyImages: function () {
            var e,
              n = t.st.gallery.preload,
              i = Math.min(n[0], t.items.length),
              r = Math.min(n[1], t.items.length);
            for (e = 1; e <= (t.direction ? r : i); e++)
              t._preloadItem(t.index + e);
            for (e = 1; e <= (t.direction ? i : r); e++)
              t._preloadItem(t.index - e);
          },
          _preloadItem: function (n) {
            if (((n = H(n)), !t.items[n].preloaded)) {
              var i = t.items[n];
              i.parsed || (i = t.parseEl(n)),
                C("LazyLoad", i),
                "image" === i.type &&
                  (i.img = e('<img class="mfp-img" />')
                    .on("load.mfploader", function () {
                      i.hasSize = !0;
                    })
                    .on("error.mfploader", function () {
                      (i.hasSize = !0), (i.loadError = !0), C("LazyLoadError", i);
                    })
                    .attr("src", i.src)),
                (i.preloaded = !0);
            }
          },
        },
      });
      var W = "retina";
      e.magnificPopup.registerModule(W, {
        options: {
          replaceSrc: function (e) {
            return e.src.replace(/\.\w+$/, function (e) {
              return "@2x" + e;
            });
          },
          ratio: 1,
        },
        proto: {
          initRetina: function () {
            if (window.devicePixelRatio > 1) {
              var e = t.st.retina,
                n = e.ratio;
              (n = isNaN(n) ? n() : n) > 1 &&
                (S("ImageHasSize." + W, function (e, t) {
                  t.img.css({
                    "max-width": t.img[0].naturalWidth / n,
                    width: "100%",
                  });
                }),
                S("ElementParse." + W, function (t, i) {
                  i.src = e.replaceSrc(i, n);
                }));
            }
          },
        },
      }),
        I();
    }),
    function () {
      function e(e, t) {
        for (var n = -1, i = t.length, r = e.length; ++n < i; ) e[r + n] = t[n];
        return e;
      }
      function t(e, t, n) {
        for (var i = -1, r = e.length; ++i < r; ) {
          var o = e[i],
            a = t(o);
          if (null != a && (s === Y ? a == a : n(a, s)))
            var s = a,
              c = o;
        }
        return c;
      }
      function n(e) {
        return e && e.Object === Object ? e : null;
      }
      function i(e) {
        return te[e];
      }
      function r(e) {
        var t = !1;
        if (null != e && "function" != typeof e.toString)
          try {
            t = !!(e + "");
          } catch (e) {}
        return t;
      }
      function o(e, t) {
        return (
          (e = "number" == typeof e || ee.test(e) ? +e : -1) > -1 &&
          0 == e % 1 &&
          (null == t ? 9007199254740991 : t) > e
        );
      }
      function a(e) {
        if (W(e) && !ke(e)) {
          if (e instanceof s) return e;
          if (pe.call(e, "__wrapped__")) {
            var t = new s(e.__wrapped__, e.__chain__);
            return (t.__actions__ = C(e.__actions__)), t;
          }
        }
        return new s(e);
      }
      function s(e, t) {
        (this.__wrapped__ = e), (this.__actions__ = []), (this.__chain__ = !!t);
      }
      function c(e, t, n, i) {
        var r;
        return (
          (r = e === Y) ||
            (r = (e === (r = de[n]) || (e != e && r != r)) && !pe.call(i, n)),
          r ? t : e
        );
      }
      function l(e) {
        return B(e) ? ye(e) : {};
      }
      function u(e, t, n) {
        if ("function" != typeof e) throw new TypeError("Expected a function");
        return setTimeout(function () {
          e.apply(Y, n);
        }, t);
      }
      function d(e, t) {
        var n = [];
        return (
          xe(e, function (e, i, r) {
            t(e, i, r) && n.push(e);
          }),
          n
        );
      }
      function p(t, n, i, r) {
        r || (r = []);
        for (var o = -1, a = t.length; ++o < a; ) {
          var s = t[o];
          n > 0 && W(s) && z(s) && (i || ke(s) || D(s))
            ? n > 1
              ? p(s, n - 1, i, r)
              : e(r, s)
            : i || (r[r.length] = s);
        }
        return r;
      }
      function f(e, t) {
        return e && Ie(e, t, Q);
      }
      function m(e, t) {
        return d(t, function (t) {
          return F(e[t]);
        });
      }
      function h(e, t, n, i, o) {
        return (
          e === t ||
          (null == e || null == t || (!B(e) && !W(t))
            ? e != e && t != t
            : (function (e, t, n, i, o, a) {
                var s = ke(e),
                  c = ke(t),
                  l = "[object Array]",
                  u = "[object Array]";
                s ||
                  ("[object Arguments]" == (l = me.call(e)) &&
                    (l = "[object Object]")),
                  c ||
                    ("[object Arguments]" == (u = me.call(t)) &&
                      (u = "[object Object]"));
                var d = "[object Object]" == l && !r(e),
                  c = "[object Object]" == u && !r(t);
                return !(u = l == u) || s || d
                  ? 2 & o ||
                    ((l = d && pe.call(e, "__wrapped__")),
                    (c = c && pe.call(t, "__wrapped__")),
                    !l && !c)
                    ? !!u &&
                      (a || (a = []),
                      (l = k(a, function (t) {
                        return t[0] === e;
                      })) && l[1]
                        ? l[1] == t
                        : (a.push([e, t]),
                          (t = (s
                            ? function (e, t, n, i, r, o) {
                                var a = -1,
                                  s = 1 & r,
                                  c = e.length,
                                  l = t.length;
                                if (c != l && !(2 & r && l > c)) return !1;
                                for (l = !0; ++a < c; ) {
                                  var u = e[a],
                                    d = t[a];
                                  if (void 0 !== Y) {
                                    l = !1;
                                    break;
                                  }
                                  if (s) {
                                    if (
                                      !x(t, function (e) {
                                        return u === e || n(u, e, i, r, o);
                                      })
                                    ) {
                                      l = !1;
                                      break;
                                    }
                                  } else if (u !== d && !n(u, d, i, r, o)) {
                                    l = !1;
                                    break;
                                  }
                                }
                                return l;
                              }
                            : function (e, t, n, i, r, o) {
                                var a = 2 & r,
                                  s = Q(e),
                                  c = s.length,
                                  l = Q(t).length;
                                if (c != l && !a) return !1;
                                for (var u = c; u--; ) {
                                  var d = s[u];
                                  if (!(a ? d in t : pe.call(t, d))) return !1;
                                }
                                for (l = !0; ++u < c; ) {
                                  var d = s[u],
                                    p = e[d],
                                    f = t[d];
                                  if (
                                    void 0 !== Y ||
                                    (p !== f && !n(p, f, i, r, o))
                                  ) {
                                    l = !1;
                                    break;
                                  }
                                  a || (a = "constructor" == d);
                                }
                                return (
                                  l &&
                                    !a &&
                                    ((n = e.constructor),
                                    (i = t.constructor),
                                    n != i &&
                                      "constructor" in e &&
                                      "constructor" in t &&
                                      !(
                                        "function" == typeof n &&
                                        n instanceof n &&
                                        "function" == typeof i &&
                                        i instanceof i
                                      ) &&
                                      (l = !1)),
                                  l
                                );
                              })(e, t, n, i, o, a)),
                          a.pop(),
                          t))
                    : n(l ? e.value() : e, c ? t.value() : t, i, o, a)
                  : (function (e, t, n) {
                      switch (n) {
                        case "[object Boolean]":
                        case "[object Date]":
                          return +e == +t;
                        case "[object Error]":
                          return e.name == t.name && e.message == t.message;
                        case "[object Number]":
                          return e != +e ? t != +t : e == +t;
                        case "[object RegExp]":
                        case "[object String]":
                          return e == t + "";
                      }
                      return !1;
                    })(e, t, l);
              })(e, t, h, n, i, o))
        );
      }
      function v(e) {
        var t = typeof e;
        return "function" == t ? e : null == e ? Z : ("object" == t ? b : S)(e);
      }
      function g(e) {
        e = null == e ? e : Object(e);
        var t,
          n = [];
        for (t in e) n.push(t);
        return n;
      }
      function y(e, t) {
        var n = -1,
          i = z(e) ? Array(e.length) : [];
        return (
          xe(e, function (e, r, o) {
            i[++n] = t(e, r, o);
          }),
          i
        );
      }
      function b(e) {
        var t = Q(e);
        return function (n) {
          var i = t.length;
          if (null == n) return !i;
          for (n = Object(n); i--; ) {
            var r = t[i];
            if (!(r in n && h(e[r], n[r], Y, 3))) return !1;
          }
          return !0;
        };
      }
      function S(e) {
        return function (t) {
          return null == t ? Y : t[e];
        };
      }
      function w(e, t, n) {
        var i = -1,
          r = e.length;
        for (
          0 > t && (t = -t > r ? 0 : r + t),
            0 > (n = n > r ? r : n) && (n += r),
            r = t > n ? 0 : (n - t) >>> 0,
            t >>>= 0,
            n = Array(r);
          ++i < r;
  
        )
          n[i] = e[i + t];
        return n;
      }
      function C(e) {
        return w(e, 0, e.length);
      }
      function x(e, t) {
        var n;
        return (
          xe(e, function (e, i, r) {
            return !(n = t(e, i, r));
          }),
          !!n
        );
      }
      function I(e, t, n, i) {
        n || (n = {});
        for (var r = -1, o = t.length; ++r < o; ) {
          var a = t[r],
            s = i ? i(n[a], e[a], a, n, e) : e[a],
            c = n,
            l = c[a];
          (pe.call(c, a) &&
            (l === s || (l != l && s != s)) &&
            (s !== Y || a in c)) ||
            (c[a] = s);
        }
        return n;
      }
      function _(e) {
        return M(function (t, n) {
          var i = -1,
            r = n.length,
            o = "function" == typeof (o = r > 1 ? n[r - 1] : Y) ? (r--, o) : Y;
          for (t = Object(t); ++i < r; ) {
            var a = n[i];
            a && e(t, a, i, o);
          }
          return t;
        });
      }
      function E(e, t, n) {
        if ("function" != typeof e) throw new TypeError("Expected a function");
        var i = (function (e) {
          return function () {
            var t = arguments,
              n = l(e.prototype);
            return B((t = e.apply(n, t))) ? t : n;
          };
        })(e);
        return function r() {
          for (
            var o = -1,
              a = arguments.length,
              s = -1,
              c = n.length,
              l = Array(c + a),
              u = this && this !== le && this instanceof r ? i : e;
            ++s < c;
  
          )
            l[s] = n[s];
          for (; a--; ) l[s++] = arguments[++o];
          return u.apply(t, l);
        };
      }
      function T(e) {
        var t = e ? e.length : Y;
        if (H(t) && (ke(e) || V(e) || D(e))) {
          e = String;
          for (var n = -1, i = Array(t); ++n < t; ) i[n] = e(n);
          t = i;
        } else t = null;
        return t;
      }
      function P(e) {
        var t;
        return e === (t = (F((t = e && e.constructor)) && t.prototype) || de);
      }
      function O(e) {
        return e ? e[0] : Y;
      }
      function k(e, t) {
        return (function (e, t, n) {
          var i;
          return (
            n(e, function (e, n, r) {
              return t(e, n, r) ? ((i = e), !1) : void 0;
            }),
            i
          );
        })(e, v(t), xe);
      }
      function N(e, t) {
        return xe(e, "function" == typeof t ? t : Z);
      }
      function A(e, t, n) {
        return (function (e, t, n, i, r) {
          return (
            r(e, function (e, r, o) {
              n = i ? ((i = !1), e) : t(n, e, r, o);
            }),
            n
          );
        })(e, v(t), n, 3 > arguments.length, xe);
      }
      function j(e, t) {
        var n;
        if ("function" != typeof t) throw new TypeError("Expected a function");
        return (
          (e = Ne(e)),
          function () {
            return (
              0 < --e && (n = t.apply(this, arguments)), 1 >= e && (t = Y), n
            );
          }
        );
      }
      function M(e) {
        var t;
        if ("function" != typeof e) throw new TypeError("Expected a function");
        return (
          (t = Ce(t === Y ? e.length - 1 : Ne(t), 0)),
          function () {
            for (
              var n = arguments, i = -1, r = Ce(n.length - t, 0), o = Array(r);
              ++i < r;
  
            )
              o[i] = n[t + i];
            for (r = Array(t + 1), i = -1; ++i < t; ) r[i] = n[i];
            return (r[t] = o), e.apply(this, r);
          }
        );
      }
      function L(e, t) {
        return e > t;
      }
      function D(e) {
        return (
          W(e) &&
          z(e) &&
          pe.call(e, "callee") &&
          (!be.call(e, "callee") || "[object Arguments]" == me.call(e))
        );
      }
      function z(e) {
        return null != e && !("function" == typeof e && F(e)) && H(_e(e));
      }
      function F(e) {
        return (
          "[object Function]" == (e = B(e) ? me.call(e) : "") ||
          "[object GeneratorFunction]" == e
        );
      }
      function H(e) {
        return (
          "number" == typeof e && e > -1 && 0 == e % 1 && 9007199254740991 >= e
        );
      }
      function B(e) {
        var t = typeof e;
        return !!e && ("object" == t || "function" == t);
      }
      function W(e) {
        return !!e && "object" == typeof e;
      }
      function q(e) {
        return "number" == typeof e || (W(e) && "[object Number]" == me.call(e));
      }
      function V(e) {
        return (
          "string" == typeof e ||
          (!ke(e) && W(e) && "[object String]" == me.call(e))
        );
      }
      function R(e, t) {
        return t > e;
      }
      function G(e) {
        return "string" == typeof e ? e : null == e ? "" : e + "";
      }
      function Q(e) {
        var t = P(e);
        if (!t && !z(e)) return we(Object(e));
        var n,
          i,
          r = !!(i = T(e)),
          a = (i = i || []).length;
        for (n in e)
          !pe.call(e, n) ||
            (r && ("length" == n || o(n, a))) ||
            (t && "constructor" == n) ||
            i.push(n);
        return i;
      }
      function U(e) {
        for (
          var t,
            n = -1,
            i = P(e),
            r = g(e),
            a = r.length,
            s = !!(t = T(e)),
            c = (t = t || []).length;
          ++n < a;
  
        ) {
          var l = r[n];
          (s && ("length" == l || o(l, c))) ||
            ("constructor" == l && (i || !pe.call(e, l))) ||
            t.push(l);
        }
        return t;
      }
      function $(e) {
        return e
          ? (function (e, t) {
              return y(t, function (t) {
                return e[t];
              });
            })(e, Q(e))
          : [];
      }
      function Z(e) {
        return e;
      }
      function K(t, n, i) {
        var r = Q(n),
          o = m(n, r);
        null != i ||
          (B(n) && (o.length || !r.length)) ||
          ((i = n), (n = t), (t = this), (o = m(n, Q(n))));
        var a = !(B(i) && "chain" in i) || i.chain,
          s = F(t);
        return (
          xe(o, function (i) {
            var r = n[i];
            (t[i] = r),
              s &&
                (t.prototype[i] = function () {
                  var n = this.__chain__;
                  if (a || n) {
                    var i = t(this.__wrapped__);
                    return (
                      (i.__actions__ = C(this.__actions__)).push({
                        func: r,
                        args: arguments,
                        thisArg: t,
                      }),
                      (i.__chain__ = n),
                      i
                    );
                  }
                  return r.apply(t, e([this.value()], arguments));
                });
          }),
          t
        );
      }
      var Y,
        X = /[&<>"'`]/g,
        J = RegExp(X.source),
        ee = /^(?:0|[1-9]\d*)$/,
        te = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
          "`": "&#96;",
        },
        ne = { function: !0, object: !0 },
        ie = ne[typeof exports] && exports && !exports.nodeType ? exports : Y,
        re = ne[typeof module] && module && !module.nodeType ? module : Y,
        oe = re && re.exports === ie ? ie : Y,
        ae = n(ne[typeof self] && self),
        se = n(ne[typeof window] && window),
        ce = n(ne[typeof this] && this),
        le =
          n(ie && re && "object" == typeof global && global) ||
          (se !== (ce && ce.window) && se) ||
          ae ||
          ce ||
          Function("return this")(),
        ue = Array.prototype,
        de = Object.prototype,
        pe = de.hasOwnProperty,
        fe = 0,
        me = de.toString,
        he = le._,
        ve = le.Reflect,
        ge = ve ? ve.f : Y,
        ye = Object.create,
        be = de.propertyIsEnumerable,
        Se = le.isFinite,
        we = Object.keys,
        Ce = Math.max,
        xe = (function (e, t) {
          return function (t, n) {
            if (null == t) return t;
            if (!z(t)) return e(t, n);
            for (
              var i = t.length, r = -1, o = Object(t);
              ++r < i && !1 !== n(o[r], r, o);
  
            );
            return t;
          };
        })(f),
        Ie = function (e, t, n) {
          for (var i = -1, r = Object(e), o = (n = n(e)).length; o--; ) {
            var a = n[++i];
            if (!1 === t(r[a], a, r)) break;
          }
          return e;
        };
      ge &&
        !be.call({ valueOf: 1 }, "valueOf") &&
        (g = function (e) {
          e = ge(e);
          for (var t, n = []; !(t = e.next()).done; ) n.push(t.value);
          return n;
        });
      var _e = S("length"),
        Ee = M(function (t, n) {
          return ke(t) || (t = null == t ? [] : [Object(t)]), p(n, 1), e(C(t), $);
        }),
        Te = M(function (e, t, n) {
          return E(e, t, n);
        }),
        Pe = M(function (e, t) {
          return u(e, 1, t);
        }),
        Oe = M(function (e, t, n) {
          return u(e, Ae(t) || 0, n);
        }),
        ke = Array.isArray,
        Ne = Number,
        Ae = Number,
        je = _(function (e, t) {
          I(t, Q(t), e);
        }),
        Me = _(function (e, t) {
          I(t, U(t), e);
        }),
        Le = _(function (e, t, n, i) {
          I(t, U(t), e, i);
        }),
        De = M(function (e) {
          return e.push(Y, c), Le.apply(Y, e);
        }),
        ze = M(function (e, t) {
          return null == e
            ? {}
            : (function (e, t) {
                return (
                  (e = Object(e)),
                  A(
                    t,
                    function (t, n) {
                      return n in e && (t[n] = e[n]), t;
                    },
                    {}
                  )
                );
              })(e, p(t, 1));
        }),
        Fe = v;
      (s.prototype = l(a.prototype)),
        (s.prototype.constructor = s),
        (a.assignIn = Me),
        (a.before = j),
        (a.bind = Te),
        (a.chain = function (e) {
          return ((e = a(e)).__chain__ = !0), e;
        }),
        (a.compact = function (e) {
          return d(e, Boolean);
        }),
        (a.concat = Ee),
        (a.create = function (e, t) {
          var n = l(e);
          return t ? je(n, t) : n;
        }),
        (a.defaults = De),
        (a.defer = Pe),
        (a.delay = Oe),
        (a.filter = function (e, t) {
          return d(e, v(t));
        }),
        (a.flatten = function (e) {
          return e && e.length ? p(e, 1) : [];
        }),
        (a.flattenDeep = function (e) {
          return e && e.length ? p(e, 1 / 0) : [];
        }),
        (a.iteratee = Fe),
        (a.keys = Q),
        (a.map = function (e, t) {
          return y(e, v(t));
        }),
        (a.matches = function (e) {
          return b(je({}, e));
        }),
        (a.mixin = K),
        (a.negate = function (e) {
          if ("function" != typeof e) throw new TypeError("Expected a function");
          return function () {
            return !e.apply(this, arguments);
          };
        }),
        (a.once = function (e) {
          return j(2, e);
        }),
        (a.pick = ze),
        (a.slice = function (e, t, n) {
          var i = e ? e.length : 0;
          return (n = n === Y ? i : +n), i ? w(e, null == t ? 0 : +t, n) : [];
        }),
        (a.sortBy = function (e, t) {
          var n = 0;
          return (
            (t = v(t)),
            y(
              y(e, function (e, i, r) {
                return { c: e, b: n++, a: t(e, i, r) };
              }).sort(function (e, t) {
                var n;
                e: {
                  n = e.a;
                  var i = t.a;
                  if (n !== i) {
                    var r = null === n,
                      o = n === Y,
                      a = n == n,
                      s = null === i,
                      c = i === Y,
                      l = i == i;
                    if ((n > i && !s) || !a || (r && !c && l) || (o && l)) {
                      n = 1;
                      break e;
                    }
                    if ((i > n && !r) || !l || (s && !o && a) || (c && a)) {
                      n = -1;
                      break e;
                    }
                  }
                  n = 0;
                }
                return n || e.b - t.b;
              }),
              S("c")
            )
          );
        }),
        (a.tap = function (e, t) {
          return t(e), e;
        }),
        (a.thru = function (e, t) {
          return t(e);
        }),
        (a.toArray = function (e) {
          return z(e) ? (e.length ? C(e) : []) : $(e);
        }),
        (a.values = $),
        (a.extend = Me),
        K(a, a),
        (a.clone = function (e) {
          return B(e) ? (ke(e) ? C(e) : I(e, Q(e))) : e;
        }),
        (a.escape = function (e) {
          return (e = G(e)) && J.test(e) ? e.replace(X, i) : e;
        }),
        (a.every = function (e, t, n) {
          return (function (e, t) {
            var n = !0;
            return (
              xe(e, function (e, i, r) {
                return (n = !!t(e, i, r));
              }),
              n
            );
          })(e, v((t = n ? Y : t)));
        }),
        (a.find = k),
        (a.forEach = N),
        (a.has = function (e, t) {
          return null != e && pe.call(e, t);
        }),
        (a.head = O),
        (a.identity = Z),
        (a.indexOf = function (e, t, n) {
          var i = e ? e.length : 0;
          n =
            ((n = "number" == typeof n ? (0 > n ? Ce(i + n, 0) : n) : 0) || 0) -
            1;
          for (var r = t == t; ++n < i; ) {
            var o = e[n];
            if (r ? o === t : o != o) return n;
          }
          return -1;
        }),
        (a.isArguments = D),
        (a.isArray = ke),
        (a.isBoolean = function (e) {
          return (
            !0 === e || !1 === e || (W(e) && "[object Boolean]" == me.call(e))
          );
        }),
        (a.isDate = function (e) {
          return W(e) && "[object Date]" == me.call(e);
        }),
        (a.isEmpty = function (e) {
          if (z(e) && (ke(e) || V(e) || F(e.splice) || D(e))) return !e.length;
          for (var t in e) if (pe.call(e, t)) return !1;
          return !0;
        }),
        (a.isEqual = function (e, t) {
          return h(e, t);
        }),
        (a.isFinite = function (e) {
          return "number" == typeof e && Se(e);
        }),
        (a.isFunction = F),
        (a.isNaN = function (e) {
          return q(e) && e != +e;
        }),
        (a.isNull = function (e) {
          return null === e;
        }),
        (a.isNumber = q),
        (a.isObject = B),
        (a.isRegExp = function (e) {
          return B(e) && "[object RegExp]" == me.call(e);
        }),
        (a.isString = V),
        (a.isUndefined = function (e) {
          return e === Y;
        }),
        (a.last = function (e) {
          var t = e ? e.length : 0;
          return t ? e[t - 1] : Y;
        }),
        (a.max = function (e) {
          return e && e.length ? t(e, Z, L) : Y;
        }),
        (a.min = function (e) {
          return e && e.length ? t(e, Z, R) : Y;
        }),
        (a.noConflict = function () {
          return le._ === this && (le._ = he), this;
        }),
        (a.noop = function () {}),
        (a.reduce = A),
        (a.result = function (e, t, n) {
          return (
            (t = null == e ? Y : e[t]) === Y && (t = n), F(t) ? t.call(e) : t
          );
        }),
        (a.size = function (e) {
          return null == e ? 0 : (e = z(e) ? e : Q(e)).length;
        }),
        (a.some = function (e, t, n) {
          return x(e, v((t = n ? Y : t)));
        }),
        (a.uniqueId = function (e) {
          var t = ++fe;
          return G(e) + t;
        }),
        (a.each = N),
        (a.first = O),
        K(
          a,
          (function () {
            var e = {};
            return (
              f(a, function (t, n) {
                pe.call(a.prototype, n) || (e[n] = t);
              }),
              e
            );
          })(),
          { chain: !1 }
        ),
        (a.VERSION = "4.5.1"),
        xe(
          "pop join replace reverse split push shift sort splice unshift".split(
            " "
          ),
          function (e) {
            var t = (/^(?:replace|split)$/.test(e) ? String.prototype : ue)[e],
              n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru",
              i = /^(?:pop|join|replace|shift)$/.test(e);
            a.prototype[e] = function () {
              var e = arguments;
              return i && !this.__chain__
                ? t.apply(this.value(), e)
                : this[n](function (n) {
                    return t.apply(n, e);
                  });
            };
          }
        ),
        (a.prototype.toJSON = a.prototype.valueOf = a.prototype.value = function () {
          return (
            (t = this.__wrapped__),
            A(
              this.__actions__,
              function (t, n) {
                return n.func.apply(n.thisArg, e([t], n.args));
              },
              t
            )
          );
          var t;
        }),
        ((se || ae || {})._ = a),
        "function" == typeof define && "object" == typeof define.amd && define.amd
          ? define(function () {
              return a;
            })
          : ie && re
          ? (oe && ((re.exports = a)._ = a), (ie._ = a))
          : (le._ = a);
    }.call(this),
    void 0 === window.Shopify && (window.Shopify = {}),
    (Shopify.each = function (e, t) {
      for (var n = 0; n < e.length; n++) t(e[n], n);
    }),
    (Shopify.map = function (e, t) {
      for (var n = [], i = 0; i < e.length; i++) n.push(t(e[i], i));
      return n;
    }),
    (Shopify.arrayIncludes = function (e, t) {
      for (var n = 0; n < e.length; n++) if (e[n] == t) return !0;
      return !1;
    }),
    (Shopify.uniq = function (e) {
      for (var t = [], n = 0; n < e.length; n++)
        Shopify.arrayIncludes(t, e[n]) || t.push(e[n]);
      return t;
    }),
    (Shopify.isDefined = function (e) {
      return void 0 !== e;
    }),
    (Shopify.getClass = function (e) {
      return Object.prototype.toString.call(e).slice(8, -1);
    }),
    (Shopify.extend = function (e, t) {
      function n() {}
      (n.prototype = t.prototype),
        (e.prototype = new n()),
        (e.prototype.constructor = e),
        (e.baseConstructor = t),
        (e.superClass = t.prototype);
    }),
    (Shopify.locationSearch = function () {
      return window.location.search;
    }),
    (Shopify.locationHash = function () {
      return window.location.hash;
    }),
    (Shopify.replaceState = function (e) {
      window.history.replaceState({}, document.title, e);
    }),
    (Shopify.urlParam = function (e) {
      var t = RegExp("[?&]" + e + "=([^&#]*)").exec(Shopify.locationSearch());
      return t && decodeURIComponent(t[1].replace(/\+/g, " "));
    }),
    (Shopify.newState = function (e, t) {
      return (
        (Shopify.urlParam(e)
          ? Shopify.locationSearch().replace(
              RegExp("(" + e + "=)[^&#]+"),
              "$1" + t
            )
          : "" === Shopify.locationSearch()
          ? "?" + e + "=" + t
          : Shopify.locationSearch() + "&" + e + "=" + t) + Shopify.locationHash()
      );
    }),
    (Shopify.setParam = function (e, t) {
      Shopify.replaceState(Shopify.newState(e, t));
    }),
    (Shopify.Product = function (e) {
      Shopify.isDefined(e) && this.update(e);
    }),
    (Shopify.Product.prototype.update = function (e) {
      for (property in e) this[property] = e[property];
    }),
    (Shopify.Product.prototype.optionNames = function () {
      return "Array" == Shopify.getClass(this.options) ? this.options : [];
    }),
    (Shopify.Product.prototype.optionValues = function (e) {
      if (!Shopify.isDefined(this.variants)) return null;
      var t = Shopify.map(this.variants, function (t) {
        var n = "option" + (e + 1);
        return null == t[n] ? null : t[n];
      });
      return null == t[0] ? null : Shopify.uniq(t);
    }),
    (Shopify.Product.prototype.getVariant = function (e) {
      var t = null;
      return e.length != this.options.length
        ? t
        : (Shopify.each(this.variants, function (n) {
            for (var i = !0, r = 0; r < e.length; r++)
              n["option" + (r + 1)] != e[r] && (i = !1);
            1 != i || (t = n);
          }),
          t);
    }),
    (Shopify.Product.prototype.getVariantById = function (e) {
      for (var t = 0; t < this.variants.length; t++) {
        var n = this.variants[t];
        if (e == n.id) return n;
      }
      return null;
    }),
    (Shopify.money_format = "${{amount}}"),
    (Shopify.formatMoney = function (e, t) {
      function n(e, t) {
        return void 0 === e ? t : e;
      }
      function i(e, t, i, r) {
        if (
          ((t = n(t, 2)), (i = n(i, ",")), (r = n(r, ".")), isNaN(e) || null == e)
        )
          return 0;
        var o = (e = (e / 100).toFixed(t)).split(".");
        return (
          o[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + i) +
          (o[1] ? r + o[1] : "")
        );
      }
      "string" == typeof e && (e = e.replace(".", ""));
      var r = "",
        o = /\{\{\s*(\w+)\s*\}\}/,
        a = t || this.money_format;
      switch (a.match(o)[1]) {
        case "amount":
          r = i(e, 2);
          break;
        case "amount_no_decimals":
          r = i(e, 0);
          break;
        case "amount_with_comma_separator":
          r = i(e, 2, ".", ",");
          break;
        case "amount_no_decimals_with_comma_separator":
          r = i(e, 0, ".", ",");
          break;
        case "amount_no_decimals_with_space_separator":
          r = i(e, 0, " ");
          break;
        case "amount_with_apostrophe_separator":
          r = i(e, 2, "'");
      }
      return a.replace(o, r);
    }),
    (Shopify.OptionSelectors = function (e, t) {
      return (
        (this.selectorDivClass = "selector-wrapper"),
        (this.selectorClass = "single-option-selector"),
        (this.variantIdFieldIdSuffix = "-variant-id"),
        (this.variantIdField = null),
        (this.historyState = null),
        (this.selectors = []),
        (this.domIdPrefix = e),
        (this.product = new Shopify.Product(t.product)),
        (this.onVariantSelected = Shopify.isDefined(t.onVariantSelected)
          ? t.onVariantSelected
          : function () {}),
        (this.setActiveThumbnail = t.setActiveThumbnail),
        (this.switchProductImage = t.switchProductImage),
        (this.settings = t.settings),
        this.replaceSelector(e),
        this.initDropdown(),
        t.enableHistoryState &&
          (this.historyState = new Shopify.OptionSelectors.HistoryState(this)),
        !0
      );
    }),
    (Shopify.OptionSelectors.prototype.initDropdown = function () {
      var e = { initialLoad: !0 };
      if (!this.selectVariantFromDropdown(e)) {
        var t = this;
        setTimeout(function () {
          t.selectVariantFromParams(e) ||
            t.fireOnChangeForFirstDropdown.call(t, e);
        });
      }
    }),
    (Shopify.OptionSelectors.prototype.fireOnChangeForFirstDropdown = function (
      e
    ) {
      this.selectors[0].element.onchange(e);
    }),
    (Shopify.OptionSelectors.prototype.selectVariantFromParamsOrDropdown = function (
      e
    ) {
      this.selectVariantFromParams(e) || this.selectVariantFromDropdown(e);
    }),
    (Shopify.OptionSelectors.prototype.replaceSelector = function (e) {
      var t = document.getElementById(e),
        n = t.parentNode;
      Shopify.each(this.buildSelectors(), function (e) {
        n.insertBefore(e, t);
      }),
        (t.style.display = "none"),
        (this.variantIdField = t);
    }),
    (Shopify.OptionSelectors.prototype.selectVariantFromDropdown = function (e) {
      var t = document
        .getElementById(this.domIdPrefix)
        .querySelector("[selected]");
      if (
        (t ||
          (t = document
            .getElementById(this.domIdPrefix)
            .querySelector('[selected="selected"]')),
        !t)
      )
        return !1;
      var n = t.value;
      return this.selectVariant(n, e);
    }),
    (Shopify.OptionSelectors.prototype.selectVariantFromParams = function (e) {
      var t = Shopify.urlParam("variant");
      return this.selectVariant(t, e);
    }),
    (Shopify.OptionSelectors.prototype.selectVariant = function (e, t) {
      var n = this.product.getVariantById(e);
      if (null == n) return !1;
      for (var i = 0; i < this.selectors.length; i++) {
        var r = this.selectors[i].element,
          o = n[r.getAttribute("data-option")];
        null != o && this.optionExistInSelect(r, o) && (r.value = o);
      }
      return (
        "undefined" != typeof jQuery
          ? jQuery(this.selectors[0].element).trigger("change", t)
          : this.selectors[0].element.onchange(t),
        !0
      );
    }),
    (Shopify.OptionSelectors.prototype.optionExistInSelect = function (e, t) {
      for (var n = 0; n < e.options.length; n++)
        if (e.options[n].value == t) return !0;
    }),
    (Shopify.OptionSelectors.prototype.insertSelectors = function (e, t) {
      Shopify.isDefined(t) && this.setMessageElement(t),
        (this.domIdPrefix = "product-" + this.product.id + "-variant-selector");
      var n = document.getElementById(e);
      Shopify.each(this.buildSelectors(), function (e) {
        n.appendChild(e);
      });
    }),
    (Shopify.OptionSelectors.prototype.buildSelectors = function () {
      for (var e = 0; e < this.product.optionNames().length; e++) {
        var t = new Shopify.SingleOptionSelector(
          this,
          e,
          this.product.optionNames()[e],
          this.product.optionValues(e)
        );
        (t.element.disabled = !1), this.selectors.push(t);
      }
      var n = this.selectorDivClass,
        i = this.product.optionNames();
      return Shopify.map(this.selectors, function (e) {
        var t = document.createElement("div");
        if ((t.setAttribute("class", n), i.length >= 1 && "Title" !== i[0])) {
          var r = document.createElement("label");
          (r.htmlFor = e.element.id), (r.innerHTML = e.name), t.appendChild(r);
        }
        return t.appendChild(e.element), t;
      });
    }),
    (Shopify.OptionSelectors.prototype.selectedValues = function () {
      for (var e = [], t = 0; t < this.selectors.length; t++) {
        var n = this.selectors[t].element.value;
        e.push(n);
      }
      return e;
    }),
    (Shopify.OptionSelectors.prototype.updateSelectors = function (e, t) {
      var n = this.selectedValues(),
        i = this.product.getVariant(n);
      i
        ? ((this.variantIdField.disabled = !1),
          (this.variantIdField.value = i.id))
        : (this.variantIdField.disabled = !0),
        this.onVariantSelected(i, this, t),
        null != this.historyState &&
          this.historyState.onVariantChange(i, this, t);
    }),
    (Shopify.OptionSelectorsFromDOM = function (e, t) {
      var n = t.optionNames || [],
        i = t.priceFieldExists || !0,
        r = t.delimiter || "/",
        o = this.createProductFromSelector(e, n, i, r);
      (t.product = o),
        Shopify.OptionSelectorsFromDOM.baseConstructor.call(this, e, t);
    }),
    Shopify.extend(Shopify.OptionSelectorsFromDOM, Shopify.OptionSelectors),
    (Shopify.OptionSelectorsFromDOM.prototype.createProductFromSelector = function (
      e,
      t,
      n,
      i
    ) {
      Shopify.isDefined(n) || (n = !0), Shopify.isDefined(i) || (i = "/");
      var r = document.getElementById(e),
        o = r.childNodes,
        a = (r.parentNode, t.length),
        s = [];
      Shopify.each(o, function (e, r) {
        if (1 == e.nodeType && "option" == e.tagName.toLowerCase()) {
          var o = e.innerHTML.split(new RegExp("\\s*\\" + i + "\\s*"));
          0 == t.length && (a = o.length - (n ? 1 : 0));
          var c = o.slice(0, a),
            l = n ? o[a] : "",
            u =
              (e.getAttribute("value"),
              {
                available: !e.disabled,
                id: parseFloat(e.value),
                price: l,
                option1: c[0],
                option2: c[1],
                option3: c[2],
              });
          s.push(u);
        }
      });
      var c = { variants: s };
      if (0 == t.length) {
        c.options = [];
        for (var l = 0; l < a; l++) c.options[l] = "option " + (l + 1);
      } else c.options = t;
      return c;
    }),
    (Shopify.SingleOptionSelector = function (e, t, n, i) {
      (this.multiSelector = e),
        (this.values = i),
        (this.index = t),
        (this.name = n),
        (this.element = document.createElement("select"));
      for (var r = 0; r < i.length; r++) {
        var o = document.createElement("option");
        (o.value = i[r]), (o.innerHTML = i[r]), this.element.appendChild(o);
      }
      return (
        this.element.setAttribute("class", this.multiSelector.selectorClass),
        this.element.setAttribute("data-option", "option" + (t + 1)),
        (this.element.id = e.domIdPrefix + "-option-" + t),
        (this.element.onchange = function (n, i) {
          (i = i || {}), e.updateSelectors(t, i);
        }),
        !0
      );
    }),
    (Shopify.Image = {
      preload: function (e, t) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          this.loadImage(this.getSizedImageUrl(i, t));
        }
      },
      loadImage: function (e) {
        new Image().src = e;
      },
      switchImage: function (e, t, n) {
        if (e && t) {
          var i = this.imageSize(t.src),
            r = this.getSizedImageUrl(e.src, i);
          n ? n(r, e, t) : (t.src = r);
        }
      },
      imageSize: function (e) {
        var t = e.match(
          /.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/
        );
        return null !== t ? t[1] : null;
      },
      getSizedImageUrl: function (e, t) {
        if (null == t) return e;
        if ("master" == t) return this.removeProtocol(e);
        var n = e.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
        if (null != n) {
          var i = e.split(n[0]),
            r = n[0];
          return this.removeProtocol(i[0] + "_" + t + r);
        }
        return null;
      },
      removeProtocol: function (e) {
        return e.replace(/http(s)?:/, "");
      },
    }),
    (Shopify.OptionSelectors.HistoryState = function (e) {
      this.browserSupports() && this.register(e);
    }),
    (Shopify.OptionSelectors.HistoryState.prototype.register = function (e) {
      window.addEventListener("popstate", function (t) {
        e.selectVariantFromParamsOrDropdown({ popStateCall: !0 });
      });
    }),
    (Shopify.OptionSelectors.HistoryState.prototype.onVariantChange = function (
      e,
      t,
      n
    ) {
      this.browserSupports() &&
        (!e ||
          n.initialLoad ||
          n.popStateCall ||
          Shopify.setParam("variant", e.id));
    }),
    (Shopify.OptionSelectors.HistoryState.prototype.browserSupports = function () {
      return window.history && window.history.replaceState;
    });
  