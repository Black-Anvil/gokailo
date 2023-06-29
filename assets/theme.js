function gm_authFailure() {
  Shopify.designMode
    ? (theme.$currentMapContainer.addClass(
        "page-width map-section--load-error"
      ),
      theme.$currentMapContainer.find(".map-section__content-wrapper").remove(),
      theme.$currentMapContainer
        .find(".map-section__wrapper")
        .html(
          '<div class="errors text-center" style="width: 100%;">' +
            theme.strings.authError +
            "</div>"
        ))
    : theme.$currentMapContainer.removeClass("map-section--display-map");
}
(window.theme = window.theme || {}),
  (window.theme = window.theme || {}),
  (theme.Sections = function () {
    (this.constructors = {}),
      (this.instances = []),
      $(document)
        .on("shopify:section:load", this._onSectionLoad.bind(this))
        .on("shopify:section:unload", this._onSectionUnload.bind(this))
        .on("shopify:section:select", this._onSelect.bind(this))
        .on("shopify:section:deselect", this._onDeselect.bind(this))
        .on("shopify:block:select", this._onBlockSelect.bind(this))
        .on("shopify:block:deselect", this._onBlockDeselect.bind(this));
  }),
  (theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
    _createInstance: function (e, t) {
      var i = $(e),
        n = i.attr("data-section-id"),
        o = i.attr("data-section-type");
      if (((t = t || this.constructors[o]), !_.isUndefined(t))) {
        var a = _.assignIn(new t(e), { id: n, type: o, container: e });
        this.instances.push(a);
      }
    },
    _onSectionLoad: function (e) {
      var t = $("[data-section-id]", e.target)[0];
      t && this._createInstance(t);
    },
    _onSectionUnload: function (e) {
      this.instances = _.filter(this.instances, function (t) {
        var i = t.id === e.detail.sectionId;
        return i && _.isFunction(t.onUnload) && t.onUnload(e), !i;
      });
    },
    _onSelect: function (e) {
      var t = _.find(this.instances, function (t) {
        return t.id === e.detail.sectionId;
      });
      !_.isUndefined(t) && _.isFunction(t.onSelect) && t.onSelect(e);
    },
    _onDeselect: function (e) {
      var t = _.find(this.instances, function (t) {
        return t.id === e.detail.sectionId;
      });
      !_.isUndefined(t) && _.isFunction(t.onDeselect) && t.onDeselect(e);
    },
    _onBlockSelect: function (e) {
      var t = _.find(this.instances, function (t) {
        return t.id === e.detail.sectionId;
      });
      !_.isUndefined(t) && _.isFunction(t.onBlockSelect) && t.onBlockSelect(e);
    },
    _onBlockDeselect: function (e) {
      var t = _.find(this.instances, function (t) {
        return t.id === e.detail.sectionId;
      });
      !_.isUndefined(t) &&
        _.isFunction(t.onBlockDeselect) &&
        t.onBlockDeselect(e);
    },
    register: function (e, t) {
      (this.constructors[e] = t),
        $("[data-section-type=" + e + "]").each(
          function (e, i) {
            this._createInstance(i, t);
          }.bind(this)
        );
    },
  })),
  "undefined" == typeof Shopify && (Shopify = {}),
  Shopify.formatMoney ||
    (Shopify.formatMoney = function (e, t) {
      var i = "",
        n = /\{\{\s*(\w+)\s*\}\}/,
        o = t || this.money_format;
      function a(e, t) {
        return void 0 === e ? t : e;
      }
      function s(e, t, i, n) {
        if (
          ((t = a(t, 2)),
          (i = a(i, ",")),
          (n = a(n, ".")),
          isNaN(e) || null === e)
        )
          return 0;
        var o = (e = (e / 100).toFixed(t)).split(".");
        return (
          o[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + i) +
          (o[1] ? n + o[1] : "")
        );
      }
      switch (
        ("string" == typeof e && (e = e.replace(".", "")), o.match(n)[1])
      ) {
        case "amount":
          i = s(e, 2);
          break;
        case "amount_no_decimals":
          i = s(e, 0);
          break;
        case "amount_with_comma_separator":
          i = s(e, 2, ".", ",");
          break;
        case "amount_no_decimals_with_comma_separator":
          i = s(e, 0, ".", ",");
      }
      return o.replace(n, i);
    }),
  (window.timber = window.timber || {}),
  (timber.cacheSelectors = function () {
    timber.cache = {
      $window: $(window),
      $html: $("html"),
      $body: $("body"),
      $navigation: $("#AccessibleNav"),
      $navBar: $(".nav-bar"),
      $mobileSubNavToggle: $(".mobile-nav__toggle"),
      $header: $(".site-header"),
      $mobileMenuButton: $("#menu-opener"),
      $changeView: $(".change-view"),
      $productImage: $("#ProductPhotoImg"),
      $thumbImages: $("#ProductThumbs").find("a.product-single__thumbnail"),
      $cartSection: $("#CartSection"),
      cartNoCookies: "cart--no-cookies",
      $recoverPasswordLink: $("#RecoverPassword"),
      $hideRecoverPasswordLink: $("#HideRecoverPasswordLink"),
      $recoverPasswordForm: $("#RecoverPasswordForm"),
      $customerLoginForm: $("#CustomerLoginForm"),
      $passwordResetSuccess: $("#ResetSuccess"),
    };
  }),
  (timber.init = function () {
    timber.cacheSelectors(),
      timber.drawersInit(),
      timber.cartInit(),
      timber.mobileNavToggle(),
      timber.productImageSwitch(),
      timber.collectionViews(),
      timber.loginForms();
  }),
  (timber.openDrawerMenu = function () {
    var e = $("button, a", timber.cache.$navBar);
    timber.cache.$body.addClass("opened-drawer"),
      timber.cache.$navBar.addClass("opened").attr("aria-hidden", "false"),
      timber.cache.$mobileMenuButton
        .attr("aria-expanded", "true")
        .addClass("opened"),
      timber.trapFocus({
        $container: timber.cache.$navBar,
        namespace: "drawer_focus",
      }),
      e.attr("tabindex", ""),
      timber.cache.$html.on("keyup.drawerMenu", function (e) {
        27 === e.keyCode && timber.closeDrawerMenu();
      });
  }),
  (timber.closeDrawerMenu = function () {
    var e = $("button, a", timber.cache.$navBar);
    timber.cache.$body.removeClass("opened-drawer"),
      timber.cache.$navBar.removeClass("opened").attr("aria-hidden", "true"),
      timber.cache.$mobileMenuButton
        .attr("aria-expanded", "false")
        .removeClass("opened"),
      timber.removeTrapFocus({
        $container: timber.cache.$navBar,
        namespace: "drawer_focus",
      }),
      e.attr("tabindex", "-1"),
      timber.cache.$html.off("keyup.drawerMenu");
  }),
  (timber.drawersInit = function () {
    (timber.LeftDrawer = new timber.Drawers("NavDrawer", "left")),
      (timber.RightDrawer = new timber.Drawers("CartDrawer", "right", {
        onDrawerOpen: theme.settings.ajax_cart_enable,
      }));
  }),
  (timber.cartInit = function () {
    timber.cookiesEnabled() ||
      timber.cache.$cartSection.addClass(timber.cache.cartNoCookies);
  }),
  (timber.cookiesEnabled = function () {
    var e = navigator.cookieEnabled;
    return (
      e ||
        ((document.cookie = "testcookie"),
        (e = -1 !== document.cookie.indexOf("testcookie"))),
      e
    );
  }),
  (timber.mobileNavToggle = function () {
    timber.cache.$mobileSubNavToggle.on("click", function () {
      $(this).parent().toggleClass("mobile-nav--expanded");
    });
  }),
  (timber.trapFocus = function (e) {
    var t = e.namespace ? "focusin." + e.namespace : "focusin";
    e.$elementToFocus ||
      ((e.$elementToFocus = e.$container), e.$container.attr("tabindex", "-1")),
      e.$elementToFocus.focus(),
      $(document).on(t, function (t) {
        e.$container[0] === t.target ||
          e.$container.has(t.target).length ||
          e.$container.focus();
      });
  }),
  (timber.removeTrapFocus = function (e) {
    var t = e.namespace ? "focusin." + e.namespace : "focusin";
    e.$container && e.$container.length && e.$container.removeAttr("tabindex"),
      $(document).off(t);
  }),
  (timber.getHash = function () {
    return window.location.hash;
  }),
  (timber.updateHash = function (e) {
    (window.location.hash = "#" + e),
      $("#" + e)
        .attr("tabindex", -1)
        .focus();
  }),
  (timber.productPage = function (e) {
    var t = e.money_format,
      i = e.variant,
      n = $("#ProductPhotoImg"),
      o = $("#AddToCart"),
      a = $("#ProductPrice"),
      s = $("#ComparePrice"),
      r = $(".quantity-selector, label + .js-qty"),
      c = $("#AddToCartText");
    if (i) {
      if (i.featured_image) {
        var d = i.featured_image,
          l = n[0];
        Shopify.Image.switchImage(d, l, timber.switchImage);
      }
      i.available
        ? (o.removeClass("disabled").prop("disabled", !1),
          c.html(theme.strings.add_to_cart),
          r.show())
        : (o.addClass("disabled").prop("disabled", !0),
          c.html(theme.strings.sold_out),
          r.hide()),
        a.html(Shopify.formatMoney(i.price, t)),
        i.compare_at_price > i.price
          ? s.html(Shopify.formatMoney(i.compare_at_price, t)).show()
          : s.hide();
    } else
      o.addClass("disabled").prop("disabled", !0),
        c.html(theme.strings.unavailable),
        r.hide();
  }),
  (timber.productImageSwitch = function () {
    timber.cache.$thumbImages.length &&
      timber.cache.$thumbImages.on("click", function (e) {
        e.preventDefault();
        var t = $(this).attr("href");
        timber.switchImage(t, null, timber.cache.$productImage);
      });
  }),
  (timber.switchImage = function (e, t, i) {
    $(i).attr("src", e);
  }),
  (timber.collectionViews = function () {
    timber.cache.$changeView.length &&
      timber.cache.$changeView.on("click", function () {
        var e = $(this).data("view"),
          t = document.URL,
          i = t.indexOf("?") > -1;
        window.location = i ? replaceUrlParam(t, "view", e) : t + "?view=" + e;
      });
  }),
  (timber.loginForms = function () {
    function e() {
      timber.cache.$recoverPasswordForm.show(),
        timber.cache.$customerLoginForm.hide();
    }
    timber.cache.$recoverPasswordLink.on("click", function (t) {
      t.preventDefault(), e();
    }),
      timber.cache.$hideRecoverPasswordLink.on("click", function (e) {
        e.preventDefault(),
          timber.cache.$recoverPasswordForm.hide(),
          timber.cache.$customerLoginForm.show();
      }),
      "#recover" === timber.getHash() && e();
  }),
  (timber.resetPasswordSuccess = function () {
    timber.cache.$passwordResetSuccess.show();
  }),
  (timber.Drawers = (function () {
    var e = function (e, t, i) {
      var n = {
        close: ".js-drawer-close",
        open: ".js-drawer-open-" + t,
        openClass: "js-drawer-open",
        dirOpenClass: "js-drawer-open-" + t,
      };
      if (
        ((this.nodes = {
          $parent: $("body, html"),
          $page: $("#PageContainer"),
          $moved: $(".is-moved-by-drawer"),
        }),
        (this.config = $.extend(n, i)),
        (this.position = t),
        (this.$drawer = $("#" + e)),
        !this.$drawer.length)
      )
        return !1;
      (this.drawerIsOpen = !1), this.init();
    };
    return (
      (e.prototype.init = function () {
        $(this.config.open).on("click", $.proxy(this.open, this)),
          this.$drawer
            .find(this.config.close)
            .on("click", $.proxy(this.close, this));
      }),
      (e.prototype.open = function (e) {
        var t = !1;
        if (
          (e ? e.preventDefault() : (t = !0),
          e &&
            e.stopPropagation &&
            (e.stopPropagation(), (this.$activeSource = $(e.currentTarget))),
          this.drawerIsOpen && !t)
        )
          return this.close();
        this.nodes.$moved.addClass("is-transitioning"),
          this.$drawer.prepareTransition(),
          this.nodes.$parent.addClass(
            this.config.openClass + " " + this.config.dirOpenClass
          ),
          (this.drawerIsOpen = !0),
          this.trapFocus(this.$drawer, "drawer_focus"),
          this.config.onDrawerOpen &&
            "function" == typeof this.config.onDrawerOpen &&
            (t || this.config.onDrawerOpen()),
          this.$activeSource &&
            this.$activeSource.attr("aria-expanded") &&
            this.$activeSource.attr("aria-expanded", "true"),
          this.nodes.$page.on("touchmove.drawer", function () {
            return !1;
          }),
          this.nodes.$page.on(
            "click.drawer",
            $.proxy(function () {
              return this.close(), !1;
            }, this)
          );
      }),
      (e.prototype.close = function () {
        this.drawerIsOpen &&
          ($(document.activeElement).trigger("blur"),
          this.nodes.$moved.prepareTransition({ disableExisting: !0 }),
          this.$drawer.prepareTransition({ disableExisting: !0 }),
          this.nodes.$parent.removeClass(
            this.config.dirOpenClass + " " + this.config.openClass
          ),
          (this.drawerIsOpen = !1),
          this.removeTrapFocus(this.$drawer, "drawer_focus"),
          this.nodes.$page.off(".drawer"));
      }),
      (e.prototype.trapFocus = function (e, t) {
        var i = t ? "focusin." + t : "focusin";
        e.attr("tabindex", "-1"),
          e.focus(),
          $(document).on(i, function (t) {
            e[0] === t.target || e.has(t.target).length || e.focus();
          });
      }),
      (e.prototype.removeTrapFocus = function (e, t) {
        var i = t ? "focusin." + t : "focusin";
        e.removeAttr("tabindex"), $(document).off(i);
      }),
      e
    );
  })()),
  $(timber.init),
  (window.theme = window.theme || {}),
  (theme.Header = (function () {
    var e = {};
    function t() {
      var t = e.$wrapper.width() < e.navWidth + e.logoWidth;
      t && e.$siteHeader.hasClass("site-header--classic")
        ? (e.$mobileMenu.removeClass("animate"),
          e.$announcementBar.addClass("mobile"),
          e.$siteHeader
            .addClass("site-header--drawer mobile sticky")
            .removeClass("site-header--classic active")
            .find(".btn__buy a")
            .removeClass("btn--small btn--dark")
            .addClass("btn--regular btn--light"),
          timber.cache.$navBar.attr("aria-hidden", "true"),
          e.$allLinks.attr("tabindex", "-1"),
          i())
        : !t &&
          e.$siteHeader.hasClass("site-header--drawer") &&
          "drawer" !== e.menuStyle &&
          (timber.closeDrawerMenu(),
          e.$announcementBar.removeClass("mobile"),
          e.$siteHeader
            .addClass("site-header--classic active")
            .removeClass("site-header--drawer mobile sticky")
            .find(".btn__buy a")
            .addClass("btn--small btn--dark")
            .removeClass("btn--regular btn--light"),
          e.$mobileMenu.css("height", "100%"),
          timber.cache.$navBar.attr("aria-hidden", "false"),
          e.$allLinks.attr("tabindex", ""),
          n()),
        t && e.$mobileMenu.css("height", $(window).height()),
        e.$siteLogo.css("opacity", "1"),
        e.$nav.css("opacity", "1");
    }
    function i() {
      e.isindexTemplate &&
        e.$siteLogoLinkInverted.length &&
        (e.$siteLogoLink.removeClass("logo--hidden"),
        e.$siteLogoLinkInverted.addClass("logo--hidden"));
    }
    function n() {
      e.isindexTemplate &&
        e.$siteLogoLinkInverted.length &&
        (e.$siteLogoLink.addClass("logo--hidden"),
        e.$siteLogoLinkInverted.removeClass("logo--hidden"));
    }
    function o(t) {
      t.removeClass(e.navigation.activeClass),
        t.children(e.navigation.links).attr("aria-expanded", !1),
        t.children(e.navigation.dropdown).stop().slideUp(150);
    }
    function a(e) {
      $.each(e, function () {
        o($(this));
      }),
        timber.cache.$body.off("click.outsideMegaNav");
    }
    return {
      init: function () { 
        (e = {
          $html: $("html"),
          $body: $("body"),
          $wrapper: $(".wrapper"),
          $sidebar: $("#sidebar"),
          $logo: $("#logo"),
          $meta: $("#meta"),
          $announcementBar: $(".announcement-bar"),
          $siteHeader: $(".site-header"),
          $menu: $("#menu"),
          $nav: $(".site-nav"),
          $siteLogo: $(".site-header__logo"),
          $siteLogoLink: $(".site-header__logo-link") || null,
          $siteLogoLinkInverted: $(".site-header__logo-link--inverted") || null,
          $mobileMenu: $(".nav-bar"),
          $mobileMenuButton: $("#menu-opener"),
          $mobileCloseMenuButton: $("#menu-closer"),
          $pageContainer: $("#PageContainer"),
          $responsiveMenu: $("#meta").find(".responsive-menu"),
          $responsiveClose: $(".responsive-close"),
          $options: $("#options"),
          $footer: $("#footer"),
          $content: $("#content"),
          $allLinks: $("button, a", e.$mobileMenu),
          $siteNavs: $(".site-nav"),
          isindexTemplate: $("body").hasClass("template-index"),
          menuStyle: $(".site-header").data("menu-style"),
          touchM: "ontouchstart" in window,
          iOS: /(iPad|iPhone|iPod)/g.test(navigator.userAgent),
          navWidth: 0,
          logoWidth: 0,
          navigation: {
            activeClass: "opened",
            childClass: "site-nav__link--child",
            active: ".opened",
            parents: ".site-nav--has-dropdown",
            links: ".site-nav__link",
            dropdown: ".site-nav__dropdown",
          },
        }).touchM
          ? e.$body.addClass("touch")
          : e.$body.addClass("no-touch"),
          $("header").hasClass("is-dark")
            ? (e.$pageContainer.addClass("is-dark"),
              e.$pageContainer.removeClass("is-light"))
            : $("header").hasClass("is-light") &&
              (e.$pageContainer.addClass("is-light"),
              e.$pageContainer.removeClass("is-dark")),
          e.$footer.removeClass("loading"),
          $(
            'p[style="text-align: center;"] img, p[style="text-align: center;"] iframe'
          ).each(function () {
            $(this).parent().addClass("centered-media");
          }),
          $(".main-content").fitVids(),
            (e.logoWidth = e.$siteLogo.width() || 0),
              e.$nav.children("li").each(function () {
                e.navWidth += $(this).outerWidth(!0);
              }),
              timber.cache.$navBar.attr("aria-hidden", "false"),
              t(),
              $(window).on("resize", $.debounce(250, t)),
          "drawer" !== e.menuStyle &&
            (e.$siteHeader
              .attr("aria-hidden", !0)
              .find("a, button")
              .attr("tabIndex", -1),
            $(window).on("scroll", function () {
              if (
                !e.$siteHeader.hasClass("mobile") &&
                !e.$siteHeader.hasClass("site-header--drawer")
              )
                if ($(window).scrollTop() > 300)
                  e.$siteHeader.addClass("sticky"),
                    i(),
                    setTimeout(function () {
                      e.$siteHeader.addClass("active");
                    }, 500);
                else if ($(window).scrollTop() < 300) {
                  e.$siteHeader.removeClass("active sticky"), n();
                  var t = e.$siteNavs.find(e.navigation.active);
                  a(t);
                }
            })),
          $(".link-list").length > 0 &&
            $(".link-list")
              .clone()
              .appendTo($(".nav-bar"))
              .find("a")
              .attr("tabindex", "-1"),
          e.$mobileMenuButton.on("click", function (e) {
            timber.openDrawerMenu(), e.preventDefault();
          }),
          e.$mobileCloseMenuButton.on("click", function (e) {
            timber.closeDrawerMenu(), e.preventDefault();
          }),
          setTimeout(function () {
            e.$mobileMenu.addClass("animate");
          }, 500),
          $(e.navigation.parents)
            .children(e.navigation.links)
            .on("click", function () {
              var t,
                i = $(this),
                n = i.parent();
              n.hasClass(e.navigation.activeClass)
                ? o(n)
                : (a(
                    i.hasClass(e.navigation.childClass)
                      ? n.siblings()
                      : e.$siteNavs.find(e.navigation.active)
                  ),
                  (t = n).addClass(e.navigation.activeClass),
                  t.children(e.navigation.links).attr("aria-expanded", !0),
                  t.children(e.navigation.dropdown).stop().slideDown(200),
                  setTimeout(function () {
                    timber.cache.$body.on("click.outsideMegaNav", function (t) {
                      if (!$(t.target).is(e.navigation.links)) {
                        var i = e.$siteNavs.find(e.navigation.active);
                        a(i);
                      }
                    });
                  }, 250));
            });
      },
      unload: function () {
        e.$body.hasClass("opened-drawer") &&
          e.$body.removeClass("opened-drawer");
      },
      onSelect: function () {
        "drawer" !== e.menuStyle &&
          ((e.navWidth = 0),
          (e.logoWidth = e.$siteLogo.width() || 0),
          e.$nav.children("li").each(function () {
            e.navWidth += $(this).outerWidth(!0);
          }),
          timber.cache.$navBar.attr("aria-hidden", "false"),
          t(),
          timber.cache.$window.on("resize", $.debounce(250, t)));
      },
    };
  })()),
  (window.theme = window.theme || {}),
  (theme.Slideshow = function (e) {
    (this.cache = {
      $slider: $(e),
      sliderArgs: {
				animation: "fade",
				fadeFirstSlide: false,
        animationSpeed: 300,
        slideshow: !1,
        slideshowSpeed: 5e3,
        directionNav: !0,
        controlNav: !0,
        keyboard: !0,
        prevText: $.themeAssets.arrow_left,
        nextText: $.themeAssets.arrow_right,
        smoothHeight: !0,
        before: function (e) {
          $(e)
            .find(".slide")
            .not(".flex-active-slide")
            .removeClass("slide-hide");
        },
        after: function (e) {
          $(e).find(".slide").not(".flex-active-slide").addClass("slide-hide"),
            $(e).resize();
        },
        start: function (e) {
          $(e).find(".slide").not(".flex-active-slide").addClass("slide-hide"),
            1 === $(e).find(".slide").not(".clone").length &&
              $(e).find(".flex-direction-nav").remove(),
            $(e).addClass("loaded"),
            void 0 !== $("#slider").data("loaded-index") &&
              $("#slider").flexslider($("#slider").data("loaded-index"));
        },
      },
    }),
      1 === this.cache.$slider.find("li").length &&
        (this.cache.sliderArgs.touch = !1),
      this.cache.$slider.flexslider(this.cache.sliderArgs),
      $(e).attr("id").indexOf("flexslider--") >= 0 &&
        this.cache.$slider.flexslider("play");
  }),
  (window.theme = window.theme || {}),
  (theme.HeaderSection = (function () {
    return function () {
      timber.cacheSelectors(),
        timber.drawersInit(),
        timber.cartInit(),
        timber.mobileNavToggle(),
        theme.Header.init();
    };
  })()),
  (theme.HeaderSection.prototype = _.assignIn(
    {},
    theme.HeaderSection.prototype,
    {
      onUnload: function () {
        theme.Header.unload();
      },
      onSelect: function () {
        theme.Header.onSelect();
      },
    }
  )),
  (theme.Product = (function () {
    var e = {
      selectors: {
        addToCart: "#AddToCart",
        productPrice: "#ProductPrice",
        comparePrice: "#ComparePrice",
        addToCartText: "#AddToCartText",
        quantityElements: ".quantity-selector",
        optionSelector: "productSelect",
      },
    };
    function t(t) {
      var i = (this.$container = $(t)).attr("data-section-id");
      (this.settings = $.extend({}, e, {
        sectionId: i,
        enableHistoryState: !0,
        $container: this.$container,
        selectors: {
          originalSelectorId: "productSelect-" + i,
          productSection: "#ProductSection-" + i,
          productLink: ".product__content--link-" + i,
          addToCart: "#AddToCart-" + i,
          productPrice: "#ProductPrice-" + i,
          comparePrice: "#ComparePrice-" + i,
          addToCartText: "#AddToCartText-" + i,
          quantityElements: "#quantity-selector-" + i,
          slider: "#slider-" + i,
          selectorWrapper: ".selector-wrapper" + i,
          SKU: ".variant-sku",
          shopifyPaymentButton: ".shopify-payment-button",
        },
      })),
        $("body").hasClass("template-index") &&
          (this.settings.enableHistoryState = !1),
        $("#ProductJson-" + i).html()
          ? ((this.productSingleObject = JSON.parse(
              document.getElementById("ProductJson-" + i).innerHTML
            )),
            this.init())
          : this.addQuantityButtons();
    }
    return (
      (t.prototype = _.assignIn({}, t.prototype, {
        init: function () {
          this.stringOverrides(),
            this.initProductVariant(),
            this.initSliderImages(),
            this.addQuantityButtons(),
            theme.customSelectorArrow(this.$container),
            $(".image-popup", this.$container).magnificPopup({
              type: "image",
              gallery: { enabled: !0, tCounter: "" },
              mainClass: "mfp-fade",
            });
        },
        onUnload: function () {
          delete theme.slideshows[this.settings.selectors.slider];
        },
        stringOverrides: function () {
          (theme.productStrings = theme.productStrings || {}),
            $.extend(theme.strings, theme.productStrings);
        },
        addQuantityButtons: function () {
          $(this.settings.selectors.quantityElements).children("input#Quantity")
            .length > 0 &&
            $(this.settings.selectors.quantityElements)
              .children("input#Quantity")
              .after(
                '<div class="input-holder plus"><button type="button" value="" class="plus" aria-label="' +
                  theme.strings.increase_quantity +
                  '">' +
                  $.themeAssets.plus +
                  "</button></div>"
              )
              .before(
                '<div class="input-holder minus"><button type="button" value="" class="minus" aria-label="' +
                  theme.strings.reduce_quantity +
                  '">' +
                  $.themeAssets.minus +
                  "</button></div>"
              );
        },
        initProductVariant: function () {
          if (this.productSingleObject) {
            (this.optionSelector = new Shopify.OptionSelectors(
              this.settings.selectors.originalSelectorId,
              {
                selectorClass: this.settings.selectors.optionSelectorClass,
                product: this.productSingleObject,
                onVariantSelected: this.productVariantCallback,
                enableHistoryState: this.settings.enableHistoryState,
                settings: this.settings,
              }
            )),
              this.simplifyVariantLabels(this.productSingleObject);
          }
        },
        simplifyVariantLabels: function (e) {
          1 === e.variants.length &&
            1 === e.options.length &&
            e.options[0].toLowerCase().indexOf("title") >= 0 &&
            e.variants[0].title.toLowerCase().indexOf("default title") >= 0 &&
            $(
              this.settings.selectors.productSection + " .selector-wrapper"
            ).hide();
        },
        initSliderImages: function () {
          var e = this.settings.selectors.slider;
          $(this.slideshow).addClass(""),
            (theme.slideshows[e] = new theme.Slideshow(e));
        },
        productVariantCallback: function (e) {
          if (e) {
            if (e.featured_image) {
              var t = $(this.settings.selectors.slider),
                i = t.find(
                  '.slide[data-variant-img="' + e.featured_image.id + '"]'
                );
              i.length > 0 &&
                (t.hasClass("loaded")
                  ? t.flexslider(i.data("index"))
                  : t.data("loaded-index", i.data("index")));
            }
            var n = $(this.settings.selectors.productLink);
            n.length &&
              n.attr(
                "href",
                ((o = n.attr("href")),
                (a = "variant"),
                (s = e.id),
                (r = new RegExp("([?&])" + a + "=.*?(&|$)", "i")),
                (c = -1 === o.indexOf("?") ? "?" : "&"),
                o.match(r)
                  ? o.replace(r, "$1" + a + "=" + s + "$2")
                  : o + c + a + "=" + s)
              ),
              $(this.settings.selectors.productPrice).html(
                Shopify.formatMoney(e.price, theme.settings.moneyFormat)
              ),
              $(this.settings.selectors.SKU).html(e.sku),
              e.compare_at_price > e.price
                ? $(this.settings.selectors.comparePrice)
                    .html(
                      Shopify.formatMoney(
                        e.compare_at_price,
                        theme.settings.moneyFormat
                      )
                    )
                    .show()
                : $(this.settings.selectors.comparePrice).hide(),
              e.available
                ? ($(this.settings.selectors.addToCart)
                    .removeClass("btn--disabled")
                    .prop("disabled", !1),
                  $(this.settings.selectors.addToCartText).text(
                    theme.strings.add_to_cart
                  ),
                  $(this.settings.selectors.quantityElements).removeClass(
                    "hidden"
                  ),
                  $(
                    this.settings.selectors.shopifyPaymentButton,
                    this.settings.$container
                  ).show())
                : ($(this.settings.selectors.addToCart)
                    .addClass("btn--disabled")
                    .prop("disabled", !0),
                  $(this.settings.selectors.addToCartText).text(
                    theme.strings.sold_out
                  ),
                  $(this.settings.selectors.quantityElements).addClass(
                    "hidden"
                  ),
                  $(
                    this.settings.selectors.shopifyPaymentButton,
                    this.settings.$container
                  ).hide());
          } else
            $(this.settings.selectors.addToCart)
              .addClass("btn--disabled")
              .prop("disabled", !0),
              $(this.settings.selectors.addToCartText).text(
                theme.strings.unavailable
              ),
              $(this.settings.selectors.quantityElements).addClass("hidden"),
              $(
                this.settings.selectors.shopifyPaymentButton,
                this.settings.$container
              ).hide();
          var o, a, s, r, c;
        },
      })),
      t
    );
  })()),
  (theme.slideshows = {}),
  (theme.SlideshowSection = (function () {
    return function (e) {
      var t = (this.$container = $(e)).attr("data-section-id"),
        i = (this.slideshow = "#flexslider--" + t);
      theme.slideshows[i] = new theme.Slideshow(i);
    };
  })()),
  (theme.SlideshowSection.prototype = _.assignIn(
    {},
    theme.SlideshowSection.prototype,
    {
      onUnload: function () {
        delete theme.slideshows[this.slideshow];
      },
      onBlockSelect: function (e) {
        var t = $(this.slideshow),
          i = $("#slide-" + e.detail.blockId + ":not(.clone)"),
          n = i.data("flexslider-index"),
          o = i.find("img") || i.find("svg");
        i.imagesLoaded(o, function () {
          t.flexslider(n), t.resize(), t.flexslider("pause");
        });
      },
      onBlockDeselect: function () {
        $(this.slideshow).flexslider("play");
      },
    }
  )),
  (window.theme = window.theme || {}),
  (theme.Kickstarter = (function () {
    function e(e) {
      (this.$container = $(e)), theme.crowdCampaign(this.$container);
    }
    return (
      (e.prototype = _.assignIn({}, e.prototype, {
        init: function () {
          theme.crowdCampaign(this.$container);
        },
        onSelect: function () {
          theme.crowdCampaign(this.$container);
        },
      })),
      e
    );
  })()),
  (window.theme = window.theme || {}),
  (theme.FAQs = (function () {
    function e(e) {
      var t = (this.$container = $(e));
      (this.faqSelector = ".jumpstart-accordion-" + this.sectionId),
        theme.accordionFAQs(this.$container),
        (this.$blocks = $(".section", t)),
        (this.$opened = $(".opened", t));
    }
    return (
      (e.prototype = _.assignIn({}, e.prototype, {
        init: function () {
          this.$opened.find(".content").slidedown(0),
            this.$blocks
              .find(".title")
              .prepend($.themeAssets.plus + $.themeAssets.minus),
            this.$blocks.on("click", function (e) {
              var t = $(e.target).attr("data-block-id");
              this.focusFAQ(t);
            });
        },
        focusFAQ: function (e, t) {
          var i = $(".section-" + e);
          i.hasClass("opened") && !t
            ? (i.removeClass("opened"), i.children("div").stop().slideUp(300))
            : (i.addClass("opened"),
              i.children("div").stop().slideDown(300),
              this.$blocks
                .not(i)
                .removeClass("opened")
                .children("div")
                .stop()
                .slideUp(300));
        },
        onBlockSelect: function (e) {
          this.focusFAQ(e.detail.blockId, !0);
        },
        onload: function () {
          theme.accordionFAQs(this.$container);
        },
      })),
      e
    );
  })()),
  (theme.Maps = (function () {
    var e = { zoom: 14 },
      t = null,
      i = [];
    function n(e) {
      theme.$currentMapContainer = this.$container = $(e);
      var n = this.$container.data("api-key");
      if ("string" == typeof n && "" !== n)
        if ("loaded" === t) {
          var o = this;
          0 === $('script[src*="' + n + '&"]').length
            ? $.getScript(
                "https://maps.googleapis.com/maps/api/js?key=" + n
              ).then(function () {
                (t = "loaded"), o.createMap();
              })
            : this.createMap();
        } else
          i.push(this),
            "loading" !== t &&
              ((t = "loading"),
              void 0 === window.google &&
                $.getScript(
                  "https://maps.googleapis.com/maps/api/js?key=" + n
                ).then(function () {
                  (t = "loaded"),
                    $.each(i, function (e, t) {
                      t.createMap();
                    });
                }));
    }
    return (
      (n.prototype = _.assignIn({}, n.prototype, {
        createMap: function () {
          var t = this.$container.find(".map-section__container");
          return (function (e) {
            var t = $.Deferred(),
              i = new google.maps.Geocoder(),
              n = e.data("address-setting");
            return (
              i.geocode({ address: n }, function (e, i) {
                i !== google.maps.GeocoderStatus.OK && t.reject(i),
                  t.resolve(e);
              }),
              t
            );
          })(t)
            .then(
              function (i) {
                var n = {
                    zoom: e.zoom,
                    styles: e.styles,
                    center: i[0].geometry.location,
                    draggable: !1,
                    clickableIcons: !1,
                    scrollwheel: !1,
                    disableDoubleClickZoom: !0,
                    disableDefaultUI: !0,
                  },
                  o = (this.map = new google.maps.Map(t[0], n)),
                  a = (this.center = o.getCenter());
                new google.maps.Marker({ map: o, position: a });
                google.maps.event.addDomListener(
                  window,
                  "resize",
                  $.debounce(250, function () {
                    google.maps.event.trigger(o, "resize"), o.setCenter(a);
                  })
                );
              }.bind(this)
            )
            .fail(function () {
              var e;
              switch (status) {
                case "ZERO_RESULTS":
                  e = theme.strings.addressNoResults;
                  break;
                case "OVER_QUERY_LIMIT":
                  e = theme.strings.addressQueryLimit;
                  break;
                default:
                  e = theme.strings.addressError;
              }
              var i = t.parents(".map-section");
              Shopify.designMode
                ? (i.addClass("page-width map-section--load-error"),
                  i.find(".map-section__content-wrapper").remove(),
                  i
                    .find(".map-section__wrapper")
                    .html(
                      '<div class="errors text-center" style="width: 100%;">' +
                        e +
                        "</div>"
                    ))
                : i.removeClass("map-section--display-map");
            });
        },
        onUnload: function () {
          void 0 !== window.google &&
            google.maps.event.clearListeners(this.map, "resize");
        },
      })),
      n
    );
  })()),
  (window.theme = window.theme || {}),
  (theme.Collection = (function () {
    function e() {
      theme.collectionGridMasonry();
    }
    return (
      (e.prototype = _.assignIn({}, e.prototype, {
        init: function () {
          theme.collectionGridMasonry();
        },
        onSelect: function () {
          theme.collectionGridMasonry();
        },
      })),
      e
    );
  })()),
  (window.theme = window.theme || {}),
  (theme.Search = (function () {
    function e() {
      theme.collectionGridMasonry();
    }
    return (
      (e.prototype = _.assignIn({}, e.prototype, {
        init: function () {
          theme.collectionGridMasonry();
        },
        onSelect: function () {
          theme.collectionGridMasonry();
        },
      })),
      e
    );
  })()),
  (theme.cacheSelectors = function () {
    theme.cache = {
      $html: $("html"),
      $body: $("body"),
      $wrapper: $(".wrapper"),
      $sidebar: $("#sidebar"),
      $logo: $("#logo"),
      $meta: $("#meta"),
      $siteHeader: $(".site-header"),
      $menu: $("#menu"),
      $nav: $("#AccessibleNav"),
      $siteLogo: $(".site-header__logo"),
      $mobileMenu: $(".nav-bar"),
      $mobileMenuButton: $("#menu-opener"),
      $responsiveMenu: $("#meta").find(".responsive-menu"),
      $responsiveClose: $(".responsive-close"),
      $options: $("#options"),
      $footer: $("#footer"),
      $content: $("#content"),
      touchM: "ontouchstart" in window,
      iOS: /(iPad|iPhone|iPod)/g.test(navigator.userAgent),
      navWidth: 0,
      logoWidth: 0,
    };
  }),
  (theme.customSelectorArrow = function (e) {
    var t = e || document;
    $("select", $(t)).each(function () {
      $(this).wrap('<div class="jumpstart-selector"></div>'),
        $(this).parent().attr("style", $(this).attr("style")),
        $(this)
          .parent()
          .append(
            '<span class="arrow">' + $.themeAssets.arrow_down + "</span>"
          );
    });
  }),
  (theme.collectionGridMasonry = function () {
    void 0 !== $.fn.packery &&
      $(".collection-list").length > 0 &&
      $(".collection-list").imagesLoaded(function () {
        $(".collection-list").packery({
          itemSelector: ".product",
          transitionDuration: 0,
        });
      });
  }),
  (theme.parallaxBg = function () {
    var e, t;
    !$(".parallax-bg").length > 0 ||
      !$("#section-a").length > 0 ||
      ($("#section-a").length > 0
        ? ((e = $("#section-a span.prlx-bg")),
          (t = $("#section-a .wrapper").addClass("prlx-txt")),
          e.parent().addClass("parallax-bg"))
        : ((e = $(".prlx-bg")), (t = $(".prlx-txt"))),
      $(window).on("scroll", function () {
        !$(window).scrollTop() < e.height() ||
          (e.css(
            "transform",
            "translate3d(0px, " + $(window).scrollTop() / 4 + "px, 0px)"
          ),
          t.css(
            "transform",
            "translate3d(0px, " + $(window).scrollTop() / 8 + "px, 0px)"
          ));
      }));
  }),
  (theme.quantityButtons = function () {
    $("input#Quantity").length > 0 &&
      $(document).on("click", ".plus, .minus", function () {
        var e = $(this).siblings("#Quantity"),
          t = parseFloat(e.val()),
          i = parseFloat(e.attr("max")),
          n = parseFloat(e.attr("min")),
          o = e.attr("step");
        (t && "" !== t && "NaN" !== t) || (t = 0),
          ("" !== i && "NaN" !== i) || (i = ""),
          ("" !== n && "NaN" !== n) || (n = 0),
          ("any" !== o &&
            "" !== o &&
            void 0 !== o &&
            "NaN" !== parseFloat(o)) ||
            (o = 1),
          $(this).is(".plus")
            ? i && (i === t || t > i)
              ? e.val(i)
              : e.val(t + parseFloat(o))
            : n && (n === t || t < n)
            ? e.val(n)
            : t > 0 && e.val(t - parseFloat(o)),
          e.trigger("change");
      });
  }),
  (theme.passwordFooter = function () {
    if (!(!$(".template-password").length > 0)) {
      var e = $("#PageContainer"),
        t = $("#password-footer");
      $(window)
        .on("resize", function () {
          $(window).height() < e.height()
            ? t.removeClass("full")
            : t.addClass("full");
        })
        .trigger("resize");
    }
  }),
  (theme.infiniteBlog = function () {
    var e = $("#infinite-link"),
      t = e.children("a"),
      i = $(".blog-list");
    e.length > 0 &&
      t.on("click", function (e) {
        t.addClass("btn--disabled").text("Loading ...");
        var n = $(this).attr("href");
        $.ajax({
          url: n,
          dataType: "html",
          success: function (e) {
            var n = $(e),
              o = n.find("a.article"),
              a = n.find("#infinite-link");
            o.imagesLoaded(function () {
              o.css("display", "none"),
                i.append(o),
                o.slideDown(300),
                a.length > 0
                  ? t
                      .removeClass("btn--disabled")
                      .text("More posts")
                      .prop("href", a.children("a").prop("href"))
                  : t.text("All posts loaded");
            });
          },
        }),
          e.preventDefault();
      });
  }),
  (theme.homeGallery = function () {
    $(".home-gallery").length > 0 &&
      $(".home-gallery").imagesLoaded(function () {
        $(".home-gallery")
          .find(".item")
          .each(function () {
            var e = $(this).find("img");
            e[0].naturalWidth <= e[0].naturalHeight
              ? $(this).addClass("one-quarter medium-down--one-half")
              : $(this).addClass("one-half medium-down--one-whole");
          }),
          $(".home-gallery")
            .find(".packery-container")
            .packery({
              itemSelector: ".grid__item",
              gutter: 0,
              percentPosition: !0,
              transitionDuration: 0,
            }),
          $(".home-gallery").addClass("init"),
          $(".home-gallery").find(".packery-container").packery();
      });
  }),
  (theme.iframePopUp = function () {
    $(".video-overlay").magnificPopup({
      type: "iframe",
      mainClass: "mfp-fade",
    });
  }),
  (theme.accordionFAQs = function (e) {
    var t = e || document;
    $(".jumpstart-accordion", $(t)).length > 0 &&
      $(".jumpstart-accordion", $(t)).each(function () {
        var e = $(this).children("div");
        e.filter(".opened").children("div").slideDown(0),
          $(this)
            .children("div")
            .children("h3")
            .prepend($.themeAssets.plus + $.themeAssets.minus)
            .click(function () {
              var t = $(this).parent();
              t.hasClass("opened")
                ? (t.removeClass("opened"),
                  t.children("div").stop().slideUp(300))
                : (t.addClass("opened"),
                  t.children("div").stop().slideDown(300),
                  e
                    .not(t)
                    .removeClass("opened")
                    .children("div")
                    .stop()
                    .slideUp(300));
            });
      });
  }),
  (theme.crowdCampaign = function (e) {
    if (!(!$(".home-kickstarter").length > 0)) {
      var t = e.data("section-id");
      $(".kickstarter__graphic.pie", e).html(
        '<canvas id="kickstarter__pie--help--' +
          t +
          '" width="110" height="110"></canvas><canvas id="kickstarter__pie--' +
          t +
          '" width="110" height="110"></canvas>'
      );
      var i = 0,
        n = null,
        o = Math.min(
          parseInt($(".kickstarter__graphic", e).data("value")) / 100,
          1
        ),
        a = $(".kickstarter__graphic", e).data("color"),
        s = document.getElementById("kickstarter__pie--" + t),
        r = s.getContext("2d"),
        c = s.width / 2,
        d = s.height / 2;
      (r.lineWidth = 15),
        (r.strokeStyle = a),
        (r.lineCap = "round"),
        (n = setInterval(function () {
          (i += 0.0025),
            r.clearRect(0, 0, s.width, s.height),
            r.beginPath(),
            r.arc(c, d, 45, 0, 2 * i * Math.PI, !1),
            r.stroke(),
            i >= o && clearInterval(n);
        }, 5));
      var l = document.getElementById("kickstarter__pie--help--" + t),
        h = l.getContext("2d"),
        m = l.width / 2,
        u = l.height / 2;
      (h.lineWidth = 15),
        (h.strokeStyle = "#e9e9e9"),
        (h.lineCap = "round"),
        h.beginPath(),
        h.arc(m, u, 45, 0, 2 * Math.PI, !1),
        h.stroke();
      var p = Math.min(
        parseInt($(".kickstarter__graphic.bar", e).data("value")),
        100
      );
      $(".kickstarter__graphic.bar", e).append('<div class="value"></div>'),
        $(".kickstarter__graphic.bar .value", e).css("width", p + "%");
    }
  }),
  (theme.documentReady = function () { console.log('theme.documentReady');
    var e = new theme.Sections();
    e.register("header-section", theme.HeaderSection),
    e.register("slideshow-section", theme.SlideshowSection),
    e.register("product", theme.Product),
    e.register("home-product", theme.Product),
    e.register("collection-template", theme.Collection),
    e.register("list-collection-template", theme.Collection),
    e.register("home-kickstarter", theme.Kickstarter),
    e.register("home-faq", theme.FAQs),
    e.register("feature-collection", theme.Collection),
    e.register("map-section", theme.Maps),
    e.register("search", theme.Search);
  }),
  (theme.ready = function (e) { 
    "use strict";
    e("html"), e("body"), e(".wrapper"), e("#sidebar"), e("#logo");
    var t = e("#meta");
    e(".site-header"),
      e("#menu"),
      e("#AccessibleNav"),
      e(".site-header__logo"),
      e(".nav-bar"),
      e("#menu-opener"),
      t.find(".responsive-menu"),
      e(".responsive-close"),
      e("#options"),
      e("#footer"),
      e("#content"),
      window,
      /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
  }),
  (theme.init = function () { 
    theme.cacheSelectors(),
      theme.parallaxBg(),
      theme.customSelectorArrow(),
      theme.quantityButtons(),
      theme.passwordFooter(),
      theme.infiniteBlog(),
      theme.homeGallery(),
      theme.iframePopUp(),
      theme.cache.$body.hasClass("template-index") &&
        $(".main-content")
          .children(".index-sections")
          .children(".shopify-section").length %
          2 !=
          0 &&
        $(".social-footer").addClass("even");
  }),
  $(theme.documentReady),
  $(theme.ready),
  $(theme.init);