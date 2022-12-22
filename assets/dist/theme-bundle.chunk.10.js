(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./assets/js/theme/cart.js":
/*!*********************************!*\
  !*** ./assets/js/theme/cart.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Cart; });
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/bind */ "./node_modules/lodash/bind.js");
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_bind__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cart/shipping-estimator */ "./assets/js/theme/cart/shipping-estimator.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");
/* harmony import */ var _common_cart_item_details__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./common/cart-item-details */ "./assets/js/theme/common/cart-item-details.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var owl_carousel_dist_assets_owl_carousel_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! owl.carousel/dist/assets/owl.carousel.css */ "./node_modules/owl.carousel/dist/assets/owl.carousel.css");
/* harmony import */ var owl_carousel_dist_assets_owl_theme_default_min_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! owl.carousel/dist/assets/owl.theme.default.min.css */ "./node_modules/owl.carousel/dist/assets/owl.theme.default.min.css");
/* harmony import */ var owl_carousel__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! owl.carousel */ "./node_modules/owl.carousel/dist/owl.carousel.js");
/* harmony import */ var owl_carousel__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(owl_carousel__WEBPACK_IMPORTED_MODULE_13__);


function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }












var Cart = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Cart, _PageManager);
  function Cart() {
    return _PageManager.apply(this, arguments) || this;
  }
  var _proto = Cart.prototype;
  _proto.onReady = function onReady() {
    this.$modal = null;
    this.$cartPageContent = jquery__WEBPACK_IMPORTED_MODULE_10___default()('[data-cart]');
    this.$cartContent = jquery__WEBPACK_IMPORTED_MODULE_10___default()('[data-cart-content]');
    this.$cartMessages = jquery__WEBPACK_IMPORTED_MODULE_10___default()('[data-cart-status]');
    this.$cartTotals = jquery__WEBPACK_IMPORTED_MODULE_10___default()('[data-cart-totals]');
    this.$overlay = jquery__WEBPACK_IMPORTED_MODULE_10___default()('[data-cart] .loadingOverlay').hide(); // TODO: temporary until roper pulls in his cart components
    this.$activeCartItemId = null;
    this.$activeCartItemBtnAction = null;
    this.setApplePaySupport();
    this.bindEvents();

    //pageview event
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'page-type': 'cart'
    });

    //Bought History and Browsing History section
    var u_id = document.getElementsByClassName("customer_id")[0].value;
  };
  _proto.setApplePaySupport = function setApplePaySupport() {
    if (window.ApplePaySession) {
      this.$cartPageContent.addClass('apple-pay-supported');
    }
  };
  _proto.cartUpdate = function cartUpdate($target) {
    var _this = this;
    var itemId = $target.data('cartItemid');
    this.$activeCartItemId = itemId;
    this.$activeCartItemBtnAction = $target.data('action');
    var $el = jquery__WEBPACK_IMPORTED_MODULE_10___default()("#qty-" + itemId);
    var oldQty = parseInt($el.val(), 10);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1;
    if (newQty == 0) {
      var name = jquery__WEBPACK_IMPORTED_MODULE_10___default()("input[data-cart-itemid='" + itemId + "']").attr("aria-label");
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'itemRemovedFromCartComplete',
        'removedFromCartProductName': name
      });
    }
    //////////////////////////////Updated:Code Start GTM Code////////////////////////////////////
    if (oldQty > newQty || newQty == 0) {
      var _name = document.querySelector("input[data-cart-itemid='" + itemId + "']").getAttribute("aria-label");
      var product_sku = document.querySelector("input[data-cart-itemid='" + itemId + "']").getAttribute("data-product-sku");
      var product_price = document.querySelector("input[data-cart-itemid='" + itemId + "']").getAttribute("data-product-price");
      var product_quantity = document.querySelector("input[data-cart-itemid='" + itemId + "']").getAttribute("value");
      dataLayer.push({
        ecommerce: null
      }); // Clear the previous ecommerce object.
      dataLayer.push({
        event: "remove_from_cart",
        ecommerce: {
          items: [{
            item_id: product_sku,
            item_name: _name,
            currency: "INR",
            item_brand: "Kapiva",
            price: product_price.replace(/\D+/g, ''),
            quantity: 1
          }]
        }
      });
    } else if (oldQty < newQty) {
      var _name2 = document.querySelector("input[data-cart-itemid='" + itemId + "']").getAttribute("aria-label");
      var _product_sku = document.querySelector("input[data-cart-itemid='" + itemId + "']").getAttribute("data-product-sku");
      var _product_price = document.querySelector("input[data-cart-itemid='" + itemId + "']").getAttribute("data-product-price");
      var _product_quantity = document.querySelector("input[data-cart-itemid='" + itemId + "']").getAttribute("value");
      dataLayer.push({
        ecommerce: null
      }); // Clear the previous ecommerce object.
      dataLayer.push({
        event: "add_to_cart",
        ecommerce: {
          items: [{
            item_id: _product_sku,
            item_name: _name2,
            currency: "INR",
            item_brand: "Kapiva",
            price: _product_price.replace(/\D+/g, ''),
            quantity: 1
          }]
        }
      });
    }

    //////////////////////////////Updated:Code End GTM Code////////////////////////////////////

    // Does not quality for min/max quantity
    if (newQty < minQty) {
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: minError,
        icon: 'error'
      });
    } else if (maxQty > 0 && newQty > maxQty) {
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: maxError,
        icon: 'error'
      });
    }
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this.$overlay.hide();
      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;
        _this.refreshContent(remove);
      } else {
        $el.val(oldQty);
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };
  _proto.cartUpdateQtyTextChange = function cartUpdateQtyTextChange($target, preVal) {
    var _this2 = this;
    if (preVal === void 0) {
      preVal = null;
    }
    var itemId = $target.data('cartItemid');
    var $el = jquery__WEBPACK_IMPORTED_MODULE_10___default()("#qty-" + itemId);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var oldQty = preVal !== null ? preVal : minQty;
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = parseInt(Number($el.val()), 10);
    var invalidEntry;

    // Does not quality for min/max quantity
    if (!newQty) {
      invalidEntry = $el.val();
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: this.context.invalidEntryMessage.replace('[ENTRY]', invalidEntry),
        icon: 'error'
      });
    } else if (newQty < minQty) {
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: minError,
        icon: 'error'
      });
    } else if (maxQty > 0 && newQty > maxQty) {
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: maxError,
        icon: 'error'
      });
    }
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this2.$overlay.hide();
      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;
        _this2.refreshContent(remove);
      } else {
        $el.val(oldQty);
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };
  _proto.cartRemoveItem = function cartRemoveItem(itemId) {
    var _this3 = this;
    //code show remove sample

    var name = document.querySelector("input[data-cart-itemid='" + itemId + "']").getAttribute("aria-label");
    var product_sku = document.querySelector("input[data-cart-itemid='" + itemId + "']").getAttribute("data-product-sku");
    var product_price = document.querySelector("input[data-cart-itemid='" + itemId + "']").getAttribute("data-product-price");
    var product_quantity = document.querySelector("input[data-cart-itemid='" + itemId + "']").getAttribute("value");
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'itemRemovedFromCartComplete',
      'removedFromCartProductName': name
    });

    //////////////////////////////Updated:Code Start GTM Code////////////////////////////////////
    dataLayer.push({
      ecommerce: null
    }); // Clear the previous ecommerce object.
    dataLayer.push({
      event: "remove_from_cart",
      ecommerce: {
        items: [{
          item_id: product_sku,
          item_name: name,
          currency: "INR",
          item_brand: "Kapiva",
          price: product_price.replace(/\D+/g, ''),
          quantity: product_quantity
        }]
      }
    });
    //////////////////////////////Updated:Code End GTM Code////////////////////////////////////

    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemRemove(itemId, function (err, response) {
      if (response.data.status === 'succeed') {
        _this3.refreshContent(true);
      } else {
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };
  _proto.cartEditOptions = function cartEditOptions(itemId, productId) {
    var _this4 = this;
    var context = Object.assign({
      productForChangeId: productId
    }, this.context);
    var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["defaultModal"])();
    if (this.$modal === null) {
      this.$modal = jquery__WEBPACK_IMPORTED_MODULE_10___default()('#modal');
    }
    var options = {
      template: 'cart/modals/configure-product'
    };
    modal.open();
    this.$modal.find('.modal-content').addClass('hide-content');
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.productAttributes.configureInCart(itemId, options, function (err, response) {
      modal.updateContent(response.content);
      var optionChangeHandler = function optionChangeHandler() {
        var $productOptionsContainer = jquery__WEBPACK_IMPORTED_MODULE_10___default()('[data-product-attributes-wrapper]', _this4.$modal);
        var modalBodyReservedHeight = $productOptionsContainer.outerHeight();
        if ($productOptionsContainer.length && modalBodyReservedHeight) {
          $productOptionsContainer.css('height', modalBodyReservedHeight);
        }
      };
      if (_this4.$modal.hasClass('open')) {
        optionChangeHandler();
      } else {
        _this4.$modal.one(_global_modal__WEBPACK_IMPORTED_MODULE_7__["ModalEvents"].opened, optionChangeHandler);
      }
      _this4.productDetails = new _common_cart_item_details__WEBPACK_IMPORTED_MODULE_9__["default"](_this4.$modal, context);
      _this4.bindGiftWrappingForm();
    });
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].hooks.on('product-option-change', function (event, currentTarget) {
      var $form = jquery__WEBPACK_IMPORTED_MODULE_10___default()(currentTarget).find('form');
      var $submit = jquery__WEBPACK_IMPORTED_MODULE_10___default()('input.button', $form);
      var $messageBox = jquery__WEBPACK_IMPORTED_MODULE_10___default()('.alertMessageBox');
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.productAttributes.optionChange(productId, $form.serialize(), function (err, result) {
        var data = result.data || {};
        if (err) {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
            text: err,
            icon: 'error'
          });
          return false;
        }
        if (data.purchasing_message) {
          jquery__WEBPACK_IMPORTED_MODULE_10___default()('p.alertBox-message', $messageBox).text(data.purchasing_message);
          $submit.prop('disabled', true);
          $messageBox.show();
        } else {
          $submit.prop('disabled', false);
          $messageBox.hide();
        }
        if (!data.purchasable || !data.instock) {
          $submit.prop('disabled', true);
        } else {
          $submit.prop('disabled', false);
        }
      });
    });
  };
  _proto.refreshContent = function refreshContent(remove) {
    var _this5 = this;
    var $cartItemsRows = jquery__WEBPACK_IMPORTED_MODULE_10___default()('[data-item-row]', this.$cartContent);
    var $cartPageTitle = jquery__WEBPACK_IMPORTED_MODULE_10___default()('[data-cart-page-title]');
    var options = {
      template: {
        content: 'cart/content',
        totals: 'cart/totals',
        pageTitle: 'cart/page-title',
        statusMessages: 'cart/status-messages'
      }
    };
    this.$overlay.show();

    // Remove last item from cart? Reload
    if (remove && $cartItemsRows.length === 1) {
      return window.location.reload();
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getContent(options, function (err, response) {
      _this5.$cartContent.html(response.content);
      _this5.$cartTotals.html(response.totals);
      _this5.$cartMessages.html(response.statusMessages);
      $cartPageTitle.replaceWith(response.pageTitle);
      _this5.bindEvents();
      _this5.$overlay.hide();
      var quantity = jquery__WEBPACK_IMPORTED_MODULE_10___default()('[data-cart-quantity]', _this5.$cartContent).data('cartQuantity') || 0;
      jquery__WEBPACK_IMPORTED_MODULE_10___default()('body').trigger('cart-quantity-update', quantity);
      jquery__WEBPACK_IMPORTED_MODULE_10___default()("[data-cart-itemid='" + _this5.$activeCartItemId + "']", _this5.$cartContent).filter("[data-action='" + _this5.$activeCartItemBtnAction + "']").trigger('focus');
    });
  };
  _proto.bindCartEvents = function bindCartEvents() {
    var _this6 = this;
    var debounceTimeout = 400;
    var cartUpdate = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdate, debounceTimeout), this);
    var cartUpdateQtyTextChange = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdateQtyTextChange, debounceTimeout), this);
    var cartRemoveItem = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartRemoveItem, debounceTimeout), this);
    var preVal;

    // cart update
    jquery__WEBPACK_IMPORTED_MODULE_10___default()('[data-cart-update]', this.$cartContent).on('click', function (event) {
      var $target = jquery__WEBPACK_IMPORTED_MODULE_10___default()(event.currentTarget);
      event.preventDefault();

      // update cart quantity
      cartUpdate($target);
    });

    // cart qty manually updates
    jquery__WEBPACK_IMPORTED_MODULE_10___default()('.cart-item-qty-input', this.$cartContent).on('focus', function onQtyFocus() {
      preVal = this.value;
    }).change(function (event) {
      var $target = jquery__WEBPACK_IMPORTED_MODULE_10___default()(event.currentTarget);
      event.preventDefault();

      // update cart quantity
      cartUpdateQtyTextChange($target, preVal);
    });
    jquery__WEBPACK_IMPORTED_MODULE_10___default()('.cart-remove', this.$cartContent).on('click', function (event) {
      var itemId = jquery__WEBPACK_IMPORTED_MODULE_10___default()(event.currentTarget).data('cartItemid');
      var string = jquery__WEBPACK_IMPORTED_MODULE_10___default()(event.currentTarget).data('confirmDelete');
      _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: string,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: _this6.context.cancelButtonText
      }).then(function (result) {
        if (result.value) {
          // remove item from cart
          cartRemoveItem(itemId);
        }
      });
      event.preventDefault();
    });
    jquery__WEBPACK_IMPORTED_MODULE_10___default()('[data-item-edit]', this.$cartContent).on('click', function (event) {
      var itemId = jquery__WEBPACK_IMPORTED_MODULE_10___default()(event.currentTarget).data('itemEdit');
      var productId = jquery__WEBPACK_IMPORTED_MODULE_10___default()(event.currentTarget).data('productId');
      event.preventDefault();
      // edit item in cart
      _this6.cartEditOptions(itemId, productId);
    });
  };
  _proto.bindPromoCodeEvents = function bindPromoCodeEvents() {
    var _this7 = this;
    var $couponContainer = jquery__WEBPACK_IMPORTED_MODULE_10___default()('.coupon-code');
    var $couponForm = jquery__WEBPACK_IMPORTED_MODULE_10___default()('.coupon-form');
    var $codeInput = jquery__WEBPACK_IMPORTED_MODULE_10___default()('[name="couponcode"]', $couponForm);
    jquery__WEBPACK_IMPORTED_MODULE_10___default()('.coupon-code-add').on('click', function (event) {
      event.preventDefault();
      jquery__WEBPACK_IMPORTED_MODULE_10___default()(event.currentTarget).hide();
      $couponContainer.show();
      jquery__WEBPACK_IMPORTED_MODULE_10___default()('.coupon-code-cancel').show();
      $codeInput.trigger('focus');
    });
    jquery__WEBPACK_IMPORTED_MODULE_10___default()('.coupon-code-cancel').on('click', function (event) {
      event.preventDefault();
      $couponContainer.hide();
      jquery__WEBPACK_IMPORTED_MODULE_10___default()('.coupon-code-cancel').hide();
      jquery__WEBPACK_IMPORTED_MODULE_10___default()('.coupon-code-add').show();
    });
    $couponForm.on('submit', function (event) {
      var code = $codeInput.val();
      event.preventDefault();

      // Empty code
      if (!code) {
        return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
          text: $codeInput.data('error'),
          icon: 'error'
        });
      }
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.applyCode(code, function (err, response) {
        if (response.data.status === 'success') {
          _this7.refreshContent();
        } else {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
            html: response.data.errors.join('\n'),
            icon: 'error'
          });
        }
      });
    });
  };
  _proto.bindGiftCertificateEvents = function bindGiftCertificateEvents() {
    var _this8 = this;
    var $certContainer = jquery__WEBPACK_IMPORTED_MODULE_10___default()('.gift-certificate-code');
    var $certForm = jquery__WEBPACK_IMPORTED_MODULE_10___default()('.cart-gift-certificate-form');
    var $certInput = jquery__WEBPACK_IMPORTED_MODULE_10___default()('[name="certcode"]', $certForm);
    jquery__WEBPACK_IMPORTED_MODULE_10___default()('.gift-certificate-add').on('click', function (event) {
      event.preventDefault();
      jquery__WEBPACK_IMPORTED_MODULE_10___default()(event.currentTarget).toggle();
      $certContainer.toggle();
      jquery__WEBPACK_IMPORTED_MODULE_10___default()('.gift-certificate-cancel').toggle();
    });
    jquery__WEBPACK_IMPORTED_MODULE_10___default()('.gift-certificate-cancel').on('click', function (event) {
      event.preventDefault();
      $certContainer.toggle();
      jquery__WEBPACK_IMPORTED_MODULE_10___default()('.gift-certificate-add').toggle();
      jquery__WEBPACK_IMPORTED_MODULE_10___default()('.gift-certificate-cancel').toggle();
    });
    $certForm.on('submit', function (event) {
      var code = $certInput.val();
      event.preventDefault();
      if (!Object(_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__["default"])(code)) {
        var validationDictionary = Object(_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__["createTranslationDictionary"])(_this8.context);
        return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
          text: validationDictionary.invalid_gift_certificate,
          icon: 'error'
        });
      }
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.applyGiftCertificate(code, function (err, resp) {
        if (resp.data.status === 'success') {
          _this8.refreshContent();
        } else {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
            html: resp.data.errors.join('\n'),
            icon: 'error'
          });
        }
      });
    });
  };
  _proto.bindGiftWrappingEvents = function bindGiftWrappingEvents() {
    var _this9 = this;
    var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["defaultModal"])();
    jquery__WEBPACK_IMPORTED_MODULE_10___default()('[data-item-giftwrap]').on('click', function (event) {
      var itemId = jquery__WEBPACK_IMPORTED_MODULE_10___default()(event.currentTarget).data('itemGiftwrap');
      var options = {
        template: 'cart/modals/gift-wrapping-form'
      };
      event.preventDefault();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getItemGiftWrappingOptions(itemId, options, function (err, response) {
        modal.updateContent(response.content);
        _this9.bindGiftWrappingForm();
      });
    });
  };
  _proto.bindGiftWrappingForm = function bindGiftWrappingForm() {
    jquery__WEBPACK_IMPORTED_MODULE_10___default()('.giftWrapping-select').on('change', function (event) {
      var $select = jquery__WEBPACK_IMPORTED_MODULE_10___default()(event.currentTarget);
      var id = $select.val();
      var index = $select.data('index');
      if (!id) {
        return;
      }
      var allowMessage = $select.find("option[value=" + id + "]").data('allowMessage');
      jquery__WEBPACK_IMPORTED_MODULE_10___default()(".giftWrapping-image-" + index).hide();
      jquery__WEBPACK_IMPORTED_MODULE_10___default()("#giftWrapping-image-" + index + "-" + id).show();
      if (allowMessage) {
        jquery__WEBPACK_IMPORTED_MODULE_10___default()("#giftWrapping-message-" + index).show();
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_10___default()("#giftWrapping-message-" + index).hide();
      }
    });
    jquery__WEBPACK_IMPORTED_MODULE_10___default()('.giftWrapping-select').trigger('change');
    function toggleViews() {
      var value = jquery__WEBPACK_IMPORTED_MODULE_10___default()('input:radio[name ="giftwraptype"]:checked').val();
      var $singleForm = jquery__WEBPACK_IMPORTED_MODULE_10___default()('.giftWrapping-single');
      var $multiForm = jquery__WEBPACK_IMPORTED_MODULE_10___default()('.giftWrapping-multiple');
      if (value === 'same') {
        $singleForm.show();
        $multiForm.hide();
      } else {
        $singleForm.hide();
        $multiForm.show();
      }
    }
    jquery__WEBPACK_IMPORTED_MODULE_10___default()('[name="giftwraptype"]').on('click', toggleViews);
    toggleViews();
  };
  _proto.bindEvents = function bindEvents() {
    this.bindCartEvents();
    this.bindPromoCodeEvents();
    this.bindGiftWrappingEvents();
    this.bindGiftCertificateEvents();

    // initiate shipping estimator module
    var shippingErrorMessages = {
      country: this.context.shippingCountryErrorMessage,
      province: this.context.shippingProvinceErrorMessage
    };
    this.shippingEstimator = new _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_6__["default"](jquery__WEBPACK_IMPORTED_MODULE_10___default()('[data-shipping-estimator]'), shippingErrorMessages);
  };
  return Cart;
}(_page_manager__WEBPACK_IMPORTED_MODULE_2__["default"]);


/***/ }),

/***/ "./assets/js/theme/cart/shipping-estimator.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/cart/shipping-estimator.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShippingEstimator; });
/* harmony import */ var _common_state_country__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/state-country */ "./assets/js/theme/common/state-country.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");






var ShippingEstimator = /*#__PURE__*/function () {
  function ShippingEstimator($element, shippingErrorMessages) {
    this.$element = $element;
    this.$state = $('[data-field-type="State"]', this.$element);
    this.isEstimatorFormOpened = false;
    this.shippingErrorMessages = shippingErrorMessages;
    this.initFormValidation();
    this.bindStateCountryChange();
    this.bindEstimatorEvents();
  }
  var _proto = ShippingEstimator.prototype;
  _proto.initFormValidation = function initFormValidation() {
    var _this = this;
    var shippingEstimatorAlert = $('.shipping-quotes');
    this.shippingEstimator = 'form[data-shipping-estimator]';
    this.shippingValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: this.shippingEstimator + " .shipping-estimate-submit",
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__["announceInputErrorMessage"]
    });
    $('.shipping-estimate-submit', this.$element).on('click', function (event) {
      // estimator error messages are being injected in html as a result
      // of user submit; clearing and adding role on submit provides
      // regular announcement of these error messages
      if (shippingEstimatorAlert.attr('role')) {
        shippingEstimatorAlert.removeAttr('role');
      }
      shippingEstimatorAlert.attr('role', 'alert');
      // When switching between countries, the state/region is dynamic
      // Only perform a check for all fields when country has a value
      // Otherwise areAll('valid') will check country for validity
      if ($(_this.shippingEstimator + " select[name=\"shipping-country\"]").val()) {
        _this.shippingValidator.performCheck();
      }
      if (_this.shippingValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
    this.bindValidation();
    this.bindStateValidation();
    this.bindUPSRates();
  };
  _proto.bindValidation = function bindValidation() {
    this.shippingValidator.add([{
      selector: this.shippingEstimator + " select[name=\"shipping-country\"]",
      validate: function validate(cb, val) {
        var countryId = Number(val);
        var result = countryId !== 0 && !Number.isNaN(countryId);
        cb(result);
      },
      errorMessage: this.shippingErrorMessages.country
    }]);
  };
  _proto.bindStateValidation = function bindStateValidation() {
    var _this2 = this;
    this.shippingValidator.add([{
      selector: $(this.shippingEstimator + " select[name=\"shipping-state\"]"),
      validate: function validate(cb) {
        var result;
        var $ele = $(_this2.shippingEstimator + " select[name=\"shipping-state\"]");
        if ($ele.length) {
          var eleVal = $ele.val();
          result = eleVal && eleVal.length && eleVal !== 'State/province';
        }
        cb(result);
      },
      errorMessage: this.shippingErrorMessages.province
    }]);
  }

  /**
   * Toggle between default shipping and ups shipping rates
   */;
  _proto.bindUPSRates = function bindUPSRates() {
    var UPSRateToggle = '.estimator-form-toggleUPSRate';
    $('body').on('click', UPSRateToggle, function (event) {
      var $estimatorFormUps = $('.estimator-form--ups');
      var $estimatorFormDefault = $('.estimator-form--default');
      event.preventDefault();
      $estimatorFormUps.toggleClass('u-hiddenVisually');
      $estimatorFormDefault.toggleClass('u-hiddenVisually');
    });
  };
  _proto.bindStateCountryChange = function bindStateCountryChange() {
    var _this3 = this;
    var $last;

    // Requests the states for a country with AJAX
    Object(_common_state_country__WEBPACK_IMPORTED_MODULE_0__["default"])(this.$state, this.context, {
      useIdForStates: true
    }, function (err, field) {
      if (err) {
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_5__["default"].fire({
          text: err,
          icon: 'error'
        });
        throw new Error(err);
      }
      var $field = $(field);
      if (_this3.shippingValidator.getStatus(_this3.$state) !== 'undefined') {
        _this3.shippingValidator.remove(_this3.$state);
      }
      if ($last) {
        _this3.shippingValidator.remove($last);
      }
      if ($field.is('select')) {
        $last = field;
        _this3.bindStateValidation();
      } else {
        $field.attr('placeholder', 'State/province');
        _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__["Validators"].cleanUpStateValidation(field);
      }

      // When you change a country, you swap the state/province between an input and a select dropdown
      // Not all countries require the province to be filled
      // We have to remove this class when we swap since nod validation doesn't cleanup for us
      $(_this3.shippingEstimator).find('.form-field--success').removeClass('form-field--success');
    });
  };
  _proto.toggleEstimatorFormState = function toggleEstimatorFormState(toggleButton, buttonSelector, $toggleContainer) {
    var changeAttributesOnToggle = function changeAttributesOnToggle(selectorToActivate) {
      $(toggleButton).attr('aria-labelledby', selectorToActivate);
      $(buttonSelector).text($("#" + selectorToActivate).text());
    };
    if (!this.isEstimatorFormOpened) {
      changeAttributesOnToggle('estimator-close');
      $toggleContainer.removeClass('u-hidden');
    } else {
      changeAttributesOnToggle('estimator-add');
      $toggleContainer.addClass('u-hidden');
    }
    this.isEstimatorFormOpened = !this.isEstimatorFormOpened;
  };
  _proto.bindEstimatorEvents = function bindEstimatorEvents() {
    var _this4 = this;
    var $estimatorContainer = $('.shipping-estimator');
    var $estimatorForm = $('.estimator-form');
    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_4__["default"])();
    $estimatorForm.on('submit', function (event) {
      var params = {
        country_id: $('[name="shipping-country"]', $estimatorForm).val(),
        state_id: $('[name="shipping-state"]', $estimatorForm).val(),
        city: $('[name="shipping-city"]', $estimatorForm).val(),
        zip_code: $('[name="shipping-zip"]', $estimatorForm).val()
      };
      event.preventDefault();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.getShippingQuotes(params, 'cart/shipping-quotes', function (err, response) {
        $('.shipping-quotes').html(response.content);

        // bind the select button
        $('.select-shipping-quote').on('click', function (clickEvent) {
          var quoteId = $('.shipping-quote:checked').val();
          clickEvent.preventDefault();
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.submitShippingQuote(quoteId, function () {
            window.location.reload();
          });
        });
      });
    });
    $('.shipping-estimate-show').on('click', function (event) {
      event.preventDefault();
      _this4.toggleEstimatorFormState(event.currentTarget, '.shipping-estimate-show__btn-name', $estimatorContainer);
    });
  };
  return ShippingEstimator;
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/cart-item-details.js":
/*!*****************************************************!*\
  !*** ./assets/js/theme/common/cart-item-details.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CartItemDetails; });
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _product_details_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product-details-base */ "./assets/js/theme/common/product-details-base.js");
/* harmony import */ var _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/ie-helpers */ "./assets/js/theme/common/utils/ie-helpers.js");

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var CartItemDetails = /*#__PURE__*/function (_ProductDetailsBase) {
  _inheritsLoose(CartItemDetails, _ProductDetailsBase);
  function CartItemDetails($scope, context, productAttributesData) {
    var _this;
    if (productAttributesData === void 0) {
      productAttributesData = {};
    }
    _this = _ProductDetailsBase.call(this, $scope, context) || this;
    var $form = $('#CartEditProductFieldsForm', _this.$scope);
    var $productOptionsElement = $('[data-product-attributes-wrapper]', $form);
    var hasOptions = $productOptionsElement.html().trim().length;
    var hasDefaultOptions = $productOptionsElement.find('[data-default]').length;
    $productOptionsElement.on('change', function () {
      _this.setProductVariant();
    });
    var optionChangeCallback = _product_details_base__WEBPACK_IMPORTED_MODULE_2__["optionChangeDecorator"].call(_assertThisInitialized(_this), hasDefaultOptions);

    // Update product attributes. Also update the initial view in case items are oos
    // or have default variant properties that change the view
    if ((lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(productAttributesData) || hasDefaultOptions) && hasOptions) {
      var productId = _this.context.productForChangeId;
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.productAttributes.optionChange(productId, $form.serialize(), 'products/bulk-discount-rates', optionChangeCallback);
    } else {
      _this.updateProductAttributes(productAttributesData);
    }
    return _this;
  }
  var _proto = CartItemDetails.prototype;
  _proto.setProductVariant = function setProductVariant() {
    var unsatisfiedRequiredFields = [];
    var options = [];
    $.each($('[data-product-attribute]'), function (index, value) {
      var optionLabel = value.children[0].innerText;
      var optionTitle = optionLabel.split(':')[0].trim();
      var required = optionLabel.toLowerCase().includes('required');
      var type = value.getAttribute('data-product-attribute');
      if ((type === 'input-file' || type === 'input-text' || type === 'input-number') && value.querySelector('input').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }
      if (type === 'textarea' && value.querySelector('textarea').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }
      if (type === 'date') {
        var isSatisfied = Array.from(value.querySelectorAll('select')).every(function (select) {
          return select.selectedIndex !== 0;
        });
        if (isSatisfied) {
          var dateString = Array.from(value.querySelectorAll('select')).map(function (x) {
            return x.value;
          }).join('-');
          options.push(optionTitle + ":" + dateString);
          return;
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
      if (type === 'set-select') {
        var select = value.querySelector('select');
        var selectedIndex = select.selectedIndex;
        if (selectedIndex !== 0) {
          options.push(optionTitle + ":" + select.options[selectedIndex].innerText);
          return;
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
      if (type === 'set-rectangle' || type === 'set-radio' || type === 'swatch' || type === 'input-checkbox' || type === 'product-list') {
        var checked = value.querySelector(':checked');
        if (checked) {
          var getSelectedOptionLabel = function getSelectedOptionLabel() {
            var productVariantslist = Object(_utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__["convertIntoArray"])(value.children);
            var matchLabelForCheckedInput = function matchLabelForCheckedInput(inpt) {
              return inpt.dataset.productAttributeValue === checked.value;
            };
            return productVariantslist.filter(matchLabelForCheckedInput)[0];
          };
          if (type === 'set-rectangle' || type === 'set-radio' || type === 'product-list') {
            var label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__["isBrowserIE"] ? getSelectedOptionLabel().innerText.trim() : checked.labels[0].innerText;
            if (label) {
              options.push(optionTitle + ":" + label);
            }
          }
          if (type === 'swatch') {
            var _label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__["isBrowserIE"] ? getSelectedOptionLabel().children[0] : checked.labels[0].children[0];
            if (_label) {
              options.push(optionTitle + ":" + _label.title);
            }
          }
          if (type === 'input-checkbox') {
            options.push(optionTitle + ":Yes");
          }
          return;
        }
        if (type === 'input-checkbox') {
          options.push(optionTitle + ":No");
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
    });
    var productVariant = unsatisfiedRequiredFields.length === 0 ? options.sort().join(', ') : 'unsatisfied';
    var view = $('.modal-header-title');
    if (productVariant) {
      productVariant = productVariant === 'unsatisfied' ? '' : productVariant;
      if (view.attr('data-event-type')) {
        view.attr('data-product-variant', productVariant);
      } else {
        var productName = view.html().match(/'(.*?)'/)[1];
        var card = $("[data-name=\"" + productName + "\"]");
        card.attr('data-product-variant', productVariant);
      }
    }
  }

  /**
   * Hide or mark as unavailable out of stock attributes if enabled
   * @param  {Object} data Product attribute data
   */;
  _proto.updateProductAttributes = function updateProductAttributes(data) {
    _ProductDetailsBase.prototype.updateProductAttributes.call(this, data);
    this.$scope.find('.modal-content').removeClass('hide-content');
  };
  return CartItemDetails;
}(_product_details_base__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/gift-certificate-validator.js":
/*!**************************************************************!*\
  !*** ./assets/js/theme/common/gift-certificate-validator.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (cert) {
  if (typeof cert !== 'string' || cert.length === 0) {
    return false;
  }

  // Add any custom gift certificate validation logic here
  return true;
});

/***/ }),

/***/ "./assets/js/theme/common/state-country.js":
/*!*************************************************!*\
  !*** ./assets/js/theme/common/state-country.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/each */ "./node_modules/lodash/each.js");
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/transform */ "./node_modules/lodash/transform.js");
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_transform__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _utils_form_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");







/**
 * If there are no options from bcapp, a text field will be sent. This will create a select element to hold options after the remote request.
 * @returns {jQuery|HTMLElement}
 */
function makeStateRequired(stateElement, context) {
  var attrs = lodash_transform__WEBPACK_IMPORTED_MODULE_2___default()(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });
  var replacementAttributes = {
    id: attrs.id,
    'data-label': attrs['data-label'],
    "class": 'form-select',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<select></select>', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  var $hiddenInput = $('[name*="FormFieldIsText"]');
  if ($hiddenInput.length !== 0) {
    $hiddenInput.remove();
  }
  if ($newElement.prev().find('small').length === 0) {
    // String is injected from localizer
    $newElement.prev().append("<small>" + context.required + "</small>");
  } else {
    $newElement.prev().find('small').show();
  }
  return $newElement;
}

/**
 * If a country with states is the default, a select will be sent,
 * In this case we need to be able to switch to an input field and hide the required field
 */
function makeStateOptional(stateElement) {
  var attrs = lodash_transform__WEBPACK_IMPORTED_MODULE_2___default()(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });
  var replacementAttributes = {
    type: 'text',
    id: attrs.id,
    'data-label': attrs['data-label'],
    "class": 'form-input',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<input />', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  if ($newElement.length !== 0) {
    Object(_utils_form_utils__WEBPACK_IMPORTED_MODULE_4__["insertStateHiddenField"])($newElement);
    $newElement.prev().find('small').hide();
  }
  return $newElement;
}

/**
 * Adds the array of options from the remote request to the newly created select box.
 * @param {Object} statesArray
 * @param {jQuery} $selectElement
 * @param {Object} options
 */
function addOptions(statesArray, $selectElement, options) {
  var container = [];
  container.push("<option value=\"\">" + statesArray.prefix + "</option>");
  if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default()($selectElement)) {
    lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(statesArray.states, function (stateObj) {
      if (options.useIdForStates) {
        container.push("<option value=\"" + stateObj.id + "\">" + stateObj.name + "</option>");
      } else {
        container.push("<option value=\"" + stateObj.name + "\">" + stateObj.name + "</option>");
      }
    });
    $selectElement.html(container.join(' '));
  }
}

/**
 *
 * @param {jQuery} stateElement
 * @param {Object} context
 * @param {Object} options
 * @param {Function} callback
 */
/* harmony default export */ __webpack_exports__["default"] = (function (stateElement, context, options, callback) {
  if (context === void 0) {
    context = {};
  }
  /**
   * Backwards compatible for three parameters instead of four
   *
   * Available options:
   *
   * useIdForStates {Bool} - Generates states dropdown using id for values instead of strings
   */
  if (typeof options === 'function') {
    /* eslint-disable no-param-reassign */
    callback = options;
    options = {};
    /* eslint-enable no-param-reassign */
  }

  $('select[data-field-type="Country"]').on('change', function (event) {
    var countryName = $(event.currentTarget).val();
    if (countryName === '') {
      return;
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["default"].api.country.getByName(countryName, function (err, response) {
      if (err) {
        Object(_global_modal__WEBPACK_IMPORTED_MODULE_5__["showAlertModal"])(context.state_error);
        return callback(err);
      }
      var $currentInput = $('[data-field-type="State"]');
      if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default()(response.data.states)) {
        // The element may have been replaced with a select, reselect it
        var $selectElement = makeStateRequired($currentInput, context);
        addOptions(response.data, $selectElement, options);
        callback(null, $selectElement);
      } else {
        var newElement = makeStateOptional($currentInput, context);
        callback(null, newElement);
      }
    });
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC9zaGlwcGluZy1lc3RpbWF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9jYXJ0LWl0ZW0tZGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vc3RhdGUtY291bnRyeS5qcyJdLCJuYW1lcyI6WyJDYXJ0Iiwib25SZWFkeSIsIiRtb2RhbCIsIiRjYXJ0UGFnZUNvbnRlbnQiLCIkIiwiJGNhcnRDb250ZW50IiwiJGNhcnRNZXNzYWdlcyIsIiRjYXJ0VG90YWxzIiwiJG92ZXJsYXkiLCJoaWRlIiwiJGFjdGl2ZUNhcnRJdGVtSWQiLCIkYWN0aXZlQ2FydEl0ZW1CdG5BY3Rpb24iLCJzZXRBcHBsZVBheVN1cHBvcnQiLCJiaW5kRXZlbnRzIiwid2luZG93IiwiZGF0YUxheWVyIiwicHVzaCIsInVfaWQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJ2YWx1ZSIsIkFwcGxlUGF5U2Vzc2lvbiIsImFkZENsYXNzIiwiY2FydFVwZGF0ZSIsIiR0YXJnZXQiLCJpdGVtSWQiLCJkYXRhIiwiJGVsIiwib2xkUXR5IiwicGFyc2VJbnQiLCJ2YWwiLCJtYXhRdHkiLCJtaW5RdHkiLCJtaW5FcnJvciIsIm1heEVycm9yIiwibmV3UXR5IiwibmFtZSIsImF0dHIiLCJxdWVyeVNlbGVjdG9yIiwiZ2V0QXR0cmlidXRlIiwicHJvZHVjdF9za3UiLCJwcm9kdWN0X3ByaWNlIiwicHJvZHVjdF9xdWFudGl0eSIsImVjb21tZXJjZSIsImV2ZW50IiwiaXRlbXMiLCJpdGVtX2lkIiwiaXRlbV9uYW1lIiwiY3VycmVuY3kiLCJpdGVtX2JyYW5kIiwicHJpY2UiLCJyZXBsYWNlIiwicXVhbnRpdHkiLCJzd2FsIiwiZmlyZSIsInRleHQiLCJpY29uIiwic2hvdyIsInV0aWxzIiwiYXBpIiwiY2FydCIsIml0ZW1VcGRhdGUiLCJlcnIiLCJyZXNwb25zZSIsInN0YXR1cyIsInJlbW92ZSIsInJlZnJlc2hDb250ZW50IiwiZXJyb3JzIiwiam9pbiIsImNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlIiwicHJlVmFsIiwiTnVtYmVyIiwiaW52YWxpZEVudHJ5IiwiY29udGV4dCIsImludmFsaWRFbnRyeU1lc3NhZ2UiLCJjYXJ0UmVtb3ZlSXRlbSIsIml0ZW1SZW1vdmUiLCJjYXJ0RWRpdE9wdGlvbnMiLCJwcm9kdWN0SWQiLCJwcm9kdWN0Rm9yQ2hhbmdlSWQiLCJtb2RhbCIsImRlZmF1bHRNb2RhbCIsIm9wdGlvbnMiLCJ0ZW1wbGF0ZSIsIm9wZW4iLCJmaW5kIiwicHJvZHVjdEF0dHJpYnV0ZXMiLCJjb25maWd1cmVJbkNhcnQiLCJ1cGRhdGVDb250ZW50IiwiY29udGVudCIsIm9wdGlvbkNoYW5nZUhhbmRsZXIiLCIkcHJvZHVjdE9wdGlvbnNDb250YWluZXIiLCJtb2RhbEJvZHlSZXNlcnZlZEhlaWdodCIsIm91dGVySGVpZ2h0IiwibGVuZ3RoIiwiY3NzIiwiaGFzQ2xhc3MiLCJvbmUiLCJNb2RhbEV2ZW50cyIsIm9wZW5lZCIsInByb2R1Y3REZXRhaWxzIiwiQ2FydEl0ZW1EZXRhaWxzIiwiYmluZEdpZnRXcmFwcGluZ0Zvcm0iLCJob29rcyIsIm9uIiwiY3VycmVudFRhcmdldCIsIiRmb3JtIiwiJHN1Ym1pdCIsIiRtZXNzYWdlQm94Iiwib3B0aW9uQ2hhbmdlIiwic2VyaWFsaXplIiwicmVzdWx0IiwicHVyY2hhc2luZ19tZXNzYWdlIiwicHJvcCIsInB1cmNoYXNhYmxlIiwiaW5zdG9jayIsIiRjYXJ0SXRlbXNSb3dzIiwiJGNhcnRQYWdlVGl0bGUiLCJ0b3RhbHMiLCJwYWdlVGl0bGUiLCJzdGF0dXNNZXNzYWdlcyIsImxvY2F0aW9uIiwicmVsb2FkIiwiZ2V0Q29udGVudCIsImh0bWwiLCJyZXBsYWNlV2l0aCIsInRyaWdnZXIiLCJmaWx0ZXIiLCJiaW5kQ2FydEV2ZW50cyIsImRlYm91bmNlVGltZW91dCIsInByZXZlbnREZWZhdWx0Iiwib25RdHlGb2N1cyIsImNoYW5nZSIsInN0cmluZyIsInNob3dDYW5jZWxCdXR0b24iLCJjYW5jZWxCdXR0b25UZXh0IiwidGhlbiIsImJpbmRQcm9tb0NvZGVFdmVudHMiLCIkY291cG9uQ29udGFpbmVyIiwiJGNvdXBvbkZvcm0iLCIkY29kZUlucHV0IiwiY29kZSIsImFwcGx5Q29kZSIsImJpbmRHaWZ0Q2VydGlmaWNhdGVFdmVudHMiLCIkY2VydENvbnRhaW5lciIsIiRjZXJ0Rm9ybSIsIiRjZXJ0SW5wdXQiLCJ0b2dnbGUiLCJjaGVja0lzR2lmdENlcnRWYWxpZCIsInZhbGlkYXRpb25EaWN0aW9uYXJ5IiwiY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IiwiaW52YWxpZF9naWZ0X2NlcnRpZmljYXRlIiwiYXBwbHlHaWZ0Q2VydGlmaWNhdGUiLCJyZXNwIiwiYmluZEdpZnRXcmFwcGluZ0V2ZW50cyIsImdldEl0ZW1HaWZ0V3JhcHBpbmdPcHRpb25zIiwiJHNlbGVjdCIsImlkIiwiaW5kZXgiLCJhbGxvd01lc3NhZ2UiLCJ0b2dnbGVWaWV3cyIsIiRzaW5nbGVGb3JtIiwiJG11bHRpRm9ybSIsInNoaXBwaW5nRXJyb3JNZXNzYWdlcyIsImNvdW50cnkiLCJzaGlwcGluZ0NvdW50cnlFcnJvck1lc3NhZ2UiLCJwcm92aW5jZSIsInNoaXBwaW5nUHJvdmluY2VFcnJvck1lc3NhZ2UiLCJzaGlwcGluZ0VzdGltYXRvciIsIlNoaXBwaW5nRXN0aW1hdG9yIiwiUGFnZU1hbmFnZXIiLCIkZWxlbWVudCIsIiRzdGF0ZSIsImlzRXN0aW1hdG9yRm9ybU9wZW5lZCIsImluaXRGb3JtVmFsaWRhdGlvbiIsImJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UiLCJiaW5kRXN0aW1hdG9yRXZlbnRzIiwic2hpcHBpbmdFc3RpbWF0b3JBbGVydCIsInNoaXBwaW5nVmFsaWRhdG9yIiwibm9kIiwic3VibWl0IiwidGFwIiwiYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSIsInJlbW92ZUF0dHIiLCJwZXJmb3JtQ2hlY2siLCJhcmVBbGwiLCJiaW5kVmFsaWRhdGlvbiIsImJpbmRTdGF0ZVZhbGlkYXRpb24iLCJiaW5kVVBTUmF0ZXMiLCJhZGQiLCJzZWxlY3RvciIsInZhbGlkYXRlIiwiY2IiLCJjb3VudHJ5SWQiLCJpc05hTiIsImVycm9yTWVzc2FnZSIsIiRlbGUiLCJlbGVWYWwiLCJVUFNSYXRlVG9nZ2xlIiwiJGVzdGltYXRvckZvcm1VcHMiLCIkZXN0aW1hdG9yRm9ybURlZmF1bHQiLCJ0b2dnbGVDbGFzcyIsIiRsYXN0Iiwic3RhdGVDb3VudHJ5IiwidXNlSWRGb3JTdGF0ZXMiLCJmaWVsZCIsIkVycm9yIiwiJGZpZWxkIiwiZ2V0U3RhdHVzIiwiaXMiLCJWYWxpZGF0b3JzIiwiY2xlYW5VcFN0YXRlVmFsaWRhdGlvbiIsInJlbW92ZUNsYXNzIiwidG9nZ2xlRXN0aW1hdG9yRm9ybVN0YXRlIiwidG9nZ2xlQnV0dG9uIiwiYnV0dG9uU2VsZWN0b3IiLCIkdG9nZ2xlQ29udGFpbmVyIiwiY2hhbmdlQXR0cmlidXRlc09uVG9nZ2xlIiwic2VsZWN0b3JUb0FjdGl2YXRlIiwiJGVzdGltYXRvckNvbnRhaW5lciIsIiRlc3RpbWF0b3JGb3JtIiwiY29sbGFwc2libGVGYWN0b3J5IiwicGFyYW1zIiwiY291bnRyeV9pZCIsInN0YXRlX2lkIiwiY2l0eSIsInppcF9jb2RlIiwiZ2V0U2hpcHBpbmdRdW90ZXMiLCJjbGlja0V2ZW50IiwicXVvdGVJZCIsInN1Ym1pdFNoaXBwaW5nUXVvdGUiLCIkc2NvcGUiLCJwcm9kdWN0QXR0cmlidXRlc0RhdGEiLCIkcHJvZHVjdE9wdGlvbnNFbGVtZW50IiwiaGFzT3B0aW9ucyIsInRyaW0iLCJoYXNEZWZhdWx0T3B0aW9ucyIsInNldFByb2R1Y3RWYXJpYW50Iiwib3B0aW9uQ2hhbmdlQ2FsbGJhY2siLCJvcHRpb25DaGFuZ2VEZWNvcmF0b3IiLCJjYWxsIiwidXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMiLCJ1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzIiwiZWFjaCIsIm9wdGlvbkxhYmVsIiwiY2hpbGRyZW4iLCJpbm5lclRleHQiLCJvcHRpb25UaXRsZSIsInNwbGl0IiwicmVxdWlyZWQiLCJ0b0xvd2VyQ2FzZSIsImluY2x1ZGVzIiwidHlwZSIsImlzU2F0aXNmaWVkIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImV2ZXJ5Iiwic2VsZWN0Iiwic2VsZWN0ZWRJbmRleCIsImRhdGVTdHJpbmciLCJtYXAiLCJ4IiwiY2hlY2tlZCIsImdldFNlbGVjdGVkT3B0aW9uTGFiZWwiLCJwcm9kdWN0VmFyaWFudHNsaXN0IiwiY29udmVydEludG9BcnJheSIsIm1hdGNoTGFiZWxGb3JDaGVja2VkSW5wdXQiLCJpbnB0IiwiZGF0YXNldCIsInByb2R1Y3RBdHRyaWJ1dGVWYWx1ZSIsImxhYmVsIiwiaXNCcm93c2VySUUiLCJsYWJlbHMiLCJ0aXRsZSIsInByb2R1Y3RWYXJpYW50Iiwic29ydCIsInZpZXciLCJwcm9kdWN0TmFtZSIsIm1hdGNoIiwiY2FyZCIsIlByb2R1Y3REZXRhaWxzQmFzZSIsImNlcnQiLCJtYWtlU3RhdGVSZXF1aXJlZCIsInN0YXRlRWxlbWVudCIsImF0dHJzIiwiaXRlbSIsInJldCIsInJlcGxhY2VtZW50QXR0cmlidXRlcyIsIiRuZXdFbGVtZW50IiwiJGhpZGRlbklucHV0IiwicHJldiIsImFwcGVuZCIsIm1ha2VTdGF0ZU9wdGlvbmFsIiwiaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCIsImFkZE9wdGlvbnMiLCJzdGF0ZXNBcnJheSIsIiRzZWxlY3RFbGVtZW50IiwiY29udGFpbmVyIiwicHJlZml4Iiwic3RhdGVzIiwic3RhdGVPYmoiLCJjYWxsYmFjayIsImNvdW50cnlOYW1lIiwiZ2V0QnlOYW1lIiwic2hvd0FsZXJ0TW9kYWwiLCJzdGF0ZV9lcnJv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TixVQUFVLENBQUN4TyxRQUFRLENBQUNyQyxJQUFJLEVBQUUrUSxjQUFjLEVBQUV2TixPQUFPLENBQUM7UUFDbEQ0TixRQUFRLENBQUMsSUFBSSxFQUFFTCxjQUFjLENBQUM7TUFDbEMsQ0FBQyxNQUFNO1FBQ0gsSUFBTVcsVUFBVSxHQUFHZixpQkFBaUIsQ0FBQ2MsYUFBYSxFQUFFMU8sT0FBTyxDQUFDO1FBRTVEcU8sUUFBUSxDQUFDLElBQUksRUFBRU0sVUFBVSxDQUFDO01BQzlCO0lBQ0osQ0FBQyxDQUFDO0VBQ04sQ0FBQyxDQUFDO0FBQ04sQyIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMTAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBiaW5kLCBkZWJvdW5jZSB9IGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCBjaGVja0lzR2lmdENlcnRWYWxpZCBmcm9tICcuL2NvbW1vbi9naWZ0LWNlcnRpZmljYXRlLXZhbGlkYXRvcic7XHJcbmltcG9ydCB7IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSB9IGZyb20gJy4vY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscyc7XHJcbmltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XHJcbmltcG9ydCBTaGlwcGluZ0VzdGltYXRvciBmcm9tICcuL2NhcnQvc2hpcHBpbmctZXN0aW1hdG9yJztcclxuaW1wb3J0IHsgZGVmYXVsdE1vZGFsLCBNb2RhbEV2ZW50cyB9IGZyb20gJy4vZ2xvYmFsL21vZGFsJztcclxuaW1wb3J0IHN3YWwgZnJvbSAnLi9nbG9iYWwvc3dlZXQtYWxlcnQnO1xyXG5pbXBvcnQgQ2FydEl0ZW1EZXRhaWxzIGZyb20gJy4vY29tbW9uL2NhcnQtaXRlbS1kZXRhaWxzJztcclxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuaW1wb3J0ICdvd2wuY2Fyb3VzZWwvZGlzdC9hc3NldHMvb3dsLmNhcm91c2VsLmNzcyc7XHJcbmltcG9ydCAnb3dsLmNhcm91c2VsL2Rpc3QvYXNzZXRzL293bC50aGVtZS5kZWZhdWx0Lm1pbi5jc3MnO1xyXG5pbXBvcnQgJ293bC5jYXJvdXNlbCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0IGV4dGVuZHMgUGFnZU1hbmFnZXIge1xyXG4gICAgb25SZWFkeSgpIHtcclxuXHJcbiAgICAgICAgdGhpcy4kbW9kYWwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuJGNhcnRQYWdlQ29udGVudCA9ICQoJ1tkYXRhLWNhcnRdJyk7XHJcbiAgICAgICAgdGhpcy4kY2FydENvbnRlbnQgPSAkKCdbZGF0YS1jYXJ0LWNvbnRlbnRdJyk7XHJcbiAgICAgICAgdGhpcy4kY2FydE1lc3NhZ2VzID0gJCgnW2RhdGEtY2FydC1zdGF0dXNdJyk7XHJcbiAgICAgICAgdGhpcy4kY2FydFRvdGFscyA9ICQoJ1tkYXRhLWNhcnQtdG90YWxzXScpO1xyXG4gICAgICAgIHRoaXMuJG92ZXJsYXkgPSAkKCdbZGF0YS1jYXJ0XSAubG9hZGluZ092ZXJsYXknKVxyXG4gICAgICAgICAgICAuaGlkZSgpOyAvLyBUT0RPOiB0ZW1wb3JhcnkgdW50aWwgcm9wZXIgcHVsbHMgaW4gaGlzIGNhcnQgY29tcG9uZW50c1xyXG4gICAgICAgIHRoaXMuJGFjdGl2ZUNhcnRJdGVtSWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuJGFjdGl2ZUNhcnRJdGVtQnRuQWN0aW9uID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRBcHBsZVBheVN1cHBvcnQoKTtcclxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuXHJcbiAgICAgICAgLy9wYWdldmlldyBldmVudFxyXG4gICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIgPSB3aW5kb3cuZGF0YUxheWVyIHx8IFtdO1xyXG4gICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7XHJcbiAgICAgICAgJ3BhZ2UtdHlwZSc6ICdjYXJ0J1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgXHJcbiAgICAgICAvL0JvdWdodCBIaXN0b3J5IGFuZCBCcm93c2luZyBIaXN0b3J5IHNlY3Rpb25cclxuICAgICAgIGxldCB1X2lkPWRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjdXN0b21lcl9pZFwiKVswXS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHNldEFwcGxlUGF5U3VwcG9ydCgpIHtcclxuICAgICAgICBpZiAod2luZG93LkFwcGxlUGF5U2Vzc2lvbikge1xyXG4gICAgICAgICAgICB0aGlzLiRjYXJ0UGFnZUNvbnRlbnQuYWRkQ2xhc3MoJ2FwcGxlLXBheS1zdXBwb3J0ZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2FydFVwZGF0ZSgkdGFyZ2V0KSB7XHJcbiAgICAgICAgY29uc3QgaXRlbUlkID0gJHRhcmdldC5kYXRhKCdjYXJ0SXRlbWlkJyk7XHJcblxyXG4gICAgICAgIHRoaXMuJGFjdGl2ZUNhcnRJdGVtSWQgPSBpdGVtSWQ7XHJcbiAgICAgICAgdGhpcy4kYWN0aXZlQ2FydEl0ZW1CdG5BY3Rpb24gPSAkdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cclxuICAgICAgICBjb25zdCAkZWwgPSAkKGAjcXR5LSR7aXRlbUlkfWApO1xyXG4gICAgICAgIGNvbnN0IG9sZFF0eSA9IHBhcnNlSW50KCRlbC52YWwoKSwgMTApO1xyXG4gICAgICAgIGNvbnN0IG1heFF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1heCcpLCAxMCk7XHJcbiAgICAgICAgY29uc3QgbWluUXR5ID0gcGFyc2VJbnQoJGVsLmRhdGEoJ3F1YW50aXR5TWluJyksIDEwKTtcclxuICAgICAgICBjb25zdCBtaW5FcnJvciA9ICRlbC5kYXRhKCdxdWFudGl0eU1pbkVycm9yJyk7XHJcbiAgICAgICAgY29uc3QgbWF4RXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHlNYXhFcnJvcicpO1xyXG4gICAgICAgIGNvbnN0IG5ld1F0eSA9ICR0YXJnZXQuZGF0YSgnYWN0aW9uJykgPT09ICdpbmMnID8gb2xkUXR5ICsgMSA6IG9sZFF0eSAtIDE7XHJcbiAgICAgICAgaWYgKG5ld1F0eSA9PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSAkKFwiaW5wdXRbZGF0YS1jYXJ0LWl0ZW1pZD0nXCIgKyBpdGVtSWQgKyBcIiddXCIpLmF0dHIoXCJhcmlhLWxhYmVsXCIpO1xyXG4gICAgICAgICAgICB3aW5kb3cuZGF0YUxheWVyID0gd2luZG93LmRhdGFMYXllciB8fCBbXTtcclxuICAgICAgICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKHtcclxuICAgICAgICAgICAgICAgICdldmVudCc6ICdpdGVtUmVtb3ZlZEZyb21DYXJ0Q29tcGxldGUnLFxyXG4gICAgICAgICAgICAgICAgJ3JlbW92ZWRGcm9tQ2FydFByb2R1Y3ROYW1lJzogbmFtZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1VwZGF0ZWQ6Q29kZSBTdGFydCBHVE0gQ29kZS8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgaWYob2xkUXR5Pm5ld1F0eXx8bmV3UXR5ID09IDApIHsgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbZGF0YS1jYXJ0LWl0ZW1pZD0nXCIgKyBpdGVtSWQgKyBcIiddXCIpLmdldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIik7XHJcblxyXG4gICAgICAgICAgY29uc3QgcHJvZHVjdF9za3UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbZGF0YS1jYXJ0LWl0ZW1pZD0nXCIgKyBpdGVtSWQgKyBcIiddXCIpLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvZHVjdC1za3VcIik7XHJcbiAgICAgICAgICBjb25zdCBwcm9kdWN0X3ByaWNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0W2RhdGEtY2FydC1pdGVtaWQ9J1wiICsgaXRlbUlkICsgXCInXVwiKS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2R1Y3QtcHJpY2VcIik7XHJcbiAgICAgICAgICBjb25zdCBwcm9kdWN0X3F1YW50aXR5ID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtkYXRhLWNhcnQtaXRlbWlkPSdcIiArIGl0ZW1JZCArIFwiJ11cIikuZ2V0QXR0cmlidXRlKFwidmFsdWVcIik7XHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgZGF0YUxheWVyLnB1c2goeyBlY29tbWVyY2U6IG51bGwgfSk7ICAvLyBDbGVhciB0aGUgcHJldmlvdXMgZWNvbW1lcmNlIG9iamVjdC5cclxuICAgICAgICAgIGRhdGFMYXllci5wdXNoKHtcclxuICAgICAgICAgICAgICBldmVudDogXCJyZW1vdmVfZnJvbV9jYXJ0XCIsXHJcbiAgICAgICAgICAgICAgZWNvbW1lcmNlOiB7XHJcbiAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbV9pZDogcHJvZHVjdF9za3UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbV9uYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbmN5OiBcIklOUlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1fYnJhbmQ6IFwiS2FwaXZhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IHByb2R1Y3RfcHJpY2UucmVwbGFjZSgvXFxEKy9nLCAnJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcXVhbnRpdHk6IDFcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO31cclxuICAgICAgICAgIGVsc2UgaWYob2xkUXR5PG5ld1F0eSkgeyAgY29uc3QgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtkYXRhLWNhcnQtaXRlbWlkPSdcIiArIGl0ZW1JZCArIFwiJ11cIikuZ2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiKTtcclxuXHJcbiAgICAgICAgICBjb25zdCBwcm9kdWN0X3NrdSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtkYXRhLWNhcnQtaXRlbWlkPSdcIiArIGl0ZW1JZCArIFwiJ11cIikuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9kdWN0LXNrdVwiKTtcclxuICAgICAgICAgIGNvbnN0IHByb2R1Y3RfcHJpY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbZGF0YS1jYXJ0LWl0ZW1pZD0nXCIgKyBpdGVtSWQgKyBcIiddXCIpLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvZHVjdC1wcmljZVwiKTtcclxuICAgICAgICAgIGNvbnN0IHByb2R1Y3RfcXVhbnRpdHkgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0W2RhdGEtY2FydC1pdGVtaWQ9J1wiICsgaXRlbUlkICsgXCInXVwiKS5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKTtcclxuICAgICAgICAgXHJcbiAgICAgICAgICBkYXRhTGF5ZXIucHVzaCh7IGVjb21tZXJjZTogbnVsbCB9KTsgIC8vIENsZWFyIHRoZSBwcmV2aW91cyBlY29tbWVyY2Ugb2JqZWN0LlxyXG4gICAgICAgICAgZGF0YUxheWVyLnB1c2goe1xyXG4gICAgICAgICAgICAgIGV2ZW50OiBcImFkZF90b19jYXJ0XCIsXHJcbiAgICAgICAgICAgICAgZWNvbW1lcmNlOiB7XHJcbiAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbV9pZDogcHJvZHVjdF9za3UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbV9uYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbmN5OiBcIklOUlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1fYnJhbmQ6IFwiS2FwaXZhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IHByb2R1Y3RfcHJpY2UucmVwbGFjZSgvXFxEKy9nLCAnJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcXVhbnRpdHk6ICAxXHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTt9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9VcGRhdGVkOkNvZGUgRW5kIEdUTSBDb2RlLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgXHJcbiAgICAgXHJcbiAgICAgICAgLy8gRG9lcyBub3QgcXVhbGl0eSBmb3IgbWluL21heCBxdWFudGl0eVxyXG4gICAgICAgIGlmIChuZXdRdHkgPCBtaW5RdHkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBtaW5FcnJvcixcclxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobWF4UXR5ID4gMCAmJiBuZXdRdHkgPiBtYXhRdHkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBtYXhFcnJvcixcclxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XHJcblxyXG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0Lml0ZW1VcGRhdGUoaXRlbUlkLCBuZXdRdHksIChlcnIsIHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09PSAnc3VjY2VlZCcpIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBxdWFudGl0eSBpcyBjaGFuZ2VkIFwiMVwiIGZyb20gXCIwXCIsIHdlIGhhdmUgdG8gcmVtb3ZlIHRoZSByb3cuXHJcbiAgICAgICAgICAgICAgICBjb25zdCByZW1vdmUgPSAobmV3UXR5ID09PSAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KHJlbW92ZSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xyXG4gICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiByZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlKCR0YXJnZXQsIHByZVZhbCA9IG51bGwpIHtcclxuICAgICAgICBjb25zdCBpdGVtSWQgPSAkdGFyZ2V0LmRhdGEoJ2NhcnRJdGVtaWQnKTtcclxuICAgICAgICBjb25zdCAkZWwgPSAkKGAjcXR5LSR7aXRlbUlkfWApO1xyXG4gICAgICAgIGNvbnN0IG1heFF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1heCcpLCAxMCk7XHJcbiAgICAgICAgY29uc3QgbWluUXR5ID0gcGFyc2VJbnQoJGVsLmRhdGEoJ3F1YW50aXR5TWluJyksIDEwKTtcclxuICAgICAgICBjb25zdCBvbGRRdHkgPSBwcmVWYWwgIT09IG51bGwgPyBwcmVWYWwgOiBtaW5RdHk7XHJcbiAgICAgICAgY29uc3QgbWluRXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHlNaW5FcnJvcicpO1xyXG4gICAgICAgIGNvbnN0IG1heEVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWF4RXJyb3InKTtcclxuICAgICAgICBjb25zdCBuZXdRdHkgPSBwYXJzZUludChOdW1iZXIoJGVsLnZhbCgpKSwgMTApO1xyXG4gICAgICAgIGxldCBpbnZhbGlkRW50cnk7XHJcblxyXG4gICAgICAgIC8vIERvZXMgbm90IHF1YWxpdHkgZm9yIG1pbi9tYXggcXVhbnRpdHlcclxuICAgICAgICBpZiAoIW5ld1F0eSkge1xyXG4gICAgICAgICAgICBpbnZhbGlkRW50cnkgPSAkZWwudmFsKCk7XHJcbiAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcclxuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLmNvbnRleHQuaW52YWxpZEVudHJ5TWVzc2FnZS5yZXBsYWNlKCdbRU5UUlldJywgaW52YWxpZEVudHJ5KSxcclxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobmV3UXR5IDwgbWluUXR5KSB7XHJcbiAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcclxuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBtaW5FcnJvcixcclxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobWF4UXR5ID4gMCAmJiBuZXdRdHkgPiBtYXhRdHkpIHtcclxuICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xyXG4gICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IG1heEVycm9yLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcclxuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtVXBkYXRlKGl0ZW1JZCwgbmV3UXR5LCAoZXJyLCByZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRvdmVybGF5LmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2NlZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcXVhbnRpdHkgaXMgY2hhbmdlZCBcIjFcIiBmcm9tIFwiMFwiLCB3ZSBoYXZlIHRvIHJlbW92ZSB0aGUgcm93LlxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gKG5ld1F0eSA9PT0gMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudChyZW1vdmUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xyXG4gICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiByZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY2FydFJlbW92ZUl0ZW0oaXRlbUlkKSB7XHJcbiAgICAgICAgLy9jb2RlIHNob3cgcmVtb3ZlIHNhbXBsZVxyXG4gICAgICAgXHJcbiAgICAgICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtkYXRhLWNhcnQtaXRlbWlkPSdcIiArIGl0ZW1JZCArIFwiJ11cIikuZ2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiKTtcclxuXHJcbiAgICAgICAgY29uc3QgcHJvZHVjdF9za3UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbZGF0YS1jYXJ0LWl0ZW1pZD0nXCIgKyBpdGVtSWQgKyBcIiddXCIpLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvZHVjdC1za3VcIik7XHJcbiAgICAgICAgY29uc3QgcHJvZHVjdF9wcmljZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtkYXRhLWNhcnQtaXRlbWlkPSdcIiArIGl0ZW1JZCArIFwiJ11cIikuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9kdWN0LXByaWNlXCIpO1xyXG4gICAgICAgIGNvbnN0IHByb2R1Y3RfcXVhbnRpdHkgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0W2RhdGEtY2FydC1pdGVtaWQ9J1wiICsgaXRlbUlkICsgXCInXVwiKS5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKTtcclxuICAgICAgICB3aW5kb3cuZGF0YUxheWVyID0gd2luZG93LmRhdGFMYXllciB8fCBbXTtcclxuICAgICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe1xyXG4gICAgICAgICAgICAnZXZlbnQnOiAnaXRlbVJlbW92ZWRGcm9tQ2FydENvbXBsZXRlJyxcclxuICAgICAgICAgICAgJ3JlbW92ZWRGcm9tQ2FydFByb2R1Y3ROYW1lJzogbmFtZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vVXBkYXRlZDpDb2RlIFN0YXJ0IEdUTSBDb2RlLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgIGRhdGFMYXllci5wdXNoKHsgZWNvbW1lcmNlOiBudWxsIH0pOyAgLy8gQ2xlYXIgdGhlIHByZXZpb3VzIGVjb21tZXJjZSBvYmplY3QuXHJcbiAgICAgICAgIGRhdGFMYXllci5wdXNoKHtcclxuICAgICAgICAgICAgIGV2ZW50OiBcInJlbW92ZV9mcm9tX2NhcnRcIixcclxuICAgICAgICAgICAgIGVjb21tZXJjZToge1xyXG4gICAgICAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1faWQ6IHByb2R1Y3Rfc2t1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgaXRlbV9uYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVuY3k6IFwiSU5SXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtX2JyYW5kOiBcIkthcGl2YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IHByb2R1Y3RfcHJpY2UucmVwbGFjZSgvXFxEKy9nLCAnJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBxdWFudGl0eTogcHJvZHVjdF9xdWFudGl0eVxyXG4gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICB9KTtcclxuICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vVXBkYXRlZDpDb2RlIEVuZCBHVE0gQ29kZS8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgXHJcbiAgICBcclxuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcclxuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtUmVtb3ZlKGl0ZW1JZCwgKGVyciwgcmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZWVkJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudCh0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogcmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJyksXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FydEVkaXRPcHRpb25zKGl0ZW1JZCwgcHJvZHVjdElkKSB7XHJcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHsgcHJvZHVjdEZvckNoYW5nZUlkOiBwcm9kdWN0SWQsIC4uLnRoaXMuY29udGV4dCB9O1xyXG4gICAgICAgIGNvbnN0IG1vZGFsID0gZGVmYXVsdE1vZGFsKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLiRtb2RhbCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLiRtb2RhbCA9ICQoJyNtb2RhbCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgdGVtcGxhdGU6ICdjYXJ0L21vZGFscy9jb25maWd1cmUtcHJvZHVjdCcsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbW9kYWwub3BlbigpO1xyXG4gICAgICAgIHRoaXMuJG1vZGFsLmZpbmQoJy5tb2RhbC1jb250ZW50JykuYWRkQ2xhc3MoJ2hpZGUtY29udGVudCcpO1xyXG5cclxuICAgICAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMuY29uZmlndXJlSW5DYXJ0KGl0ZW1JZCwgb3B0aW9ucywgKGVyciwgcmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgbW9kYWwudXBkYXRlQ29udGVudChyZXNwb25zZS5jb250ZW50KTtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uQ2hhbmdlSGFuZGxlciA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0ICRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lciA9ICQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlcy13cmFwcGVyXScsIHRoaXMuJG1vZGFsKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGFsQm9keVJlc2VydmVkSGVpZ2h0ID0gJHByb2R1Y3RPcHRpb25zQ29udGFpbmVyLm91dGVySGVpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lci5sZW5ndGggJiYgbW9kYWxCb2R5UmVzZXJ2ZWRIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAkcHJvZHVjdE9wdGlvbnNDb250YWluZXIuY3NzKCdoZWlnaHQnLCBtb2RhbEJvZHlSZXNlcnZlZEhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy4kbW9kYWwuaGFzQ2xhc3MoJ29wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uQ2hhbmdlSGFuZGxlcigpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kbW9kYWwub25lKE1vZGFsRXZlbnRzLm9wZW5lZCwgb3B0aW9uQ2hhbmdlSGFuZGxlcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdERldGFpbHMgPSBuZXcgQ2FydEl0ZW1EZXRhaWxzKHRoaXMuJG1vZGFsLCBjb250ZXh0KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYmluZEdpZnRXcmFwcGluZ0Zvcm0oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdXRpbHMuaG9va3Mub24oJ3Byb2R1Y3Qtb3B0aW9uLWNoYW5nZScsIChldmVudCwgY3VycmVudFRhcmdldCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCAkZm9ybSA9ICQoY3VycmVudFRhcmdldCkuZmluZCgnZm9ybScpO1xyXG4gICAgICAgICAgICBjb25zdCAkc3VibWl0ID0gJCgnaW5wdXQuYnV0dG9uJywgJGZvcm0pO1xyXG4gICAgICAgICAgICBjb25zdCAkbWVzc2FnZUJveCA9ICQoJy5hbGVydE1lc3NhZ2VCb3gnKTtcclxuXHJcbiAgICAgICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UocHJvZHVjdElkLCAkZm9ybS5zZXJpYWxpemUoKSwgKGVyciwgcmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gcmVzdWx0LmRhdGEgfHwge307XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGVycixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucHVyY2hhc2luZ19tZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgncC5hbGVydEJveC1tZXNzYWdlJywgJG1lc3NhZ2VCb3gpLnRleHQoZGF0YS5wdXJjaGFzaW5nX21lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAkbWVzc2FnZUJveC5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJG1lc3NhZ2VCb3guaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5wdXJjaGFzYWJsZSB8fCAhZGF0YS5pbnN0b2NrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaENvbnRlbnQocmVtb3ZlKSB7XHJcblxyXG4gICAgICAgIGNvbnN0ICRjYXJ0SXRlbXNSb3dzID0gJCgnW2RhdGEtaXRlbS1yb3ddJywgdGhpcy4kY2FydENvbnRlbnQpO1xyXG4gICAgICAgIGNvbnN0ICRjYXJ0UGFnZVRpdGxlID0gJCgnW2RhdGEtY2FydC1wYWdlLXRpdGxlXScpO1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiAnY2FydC9jb250ZW50JyxcclxuICAgICAgICAgICAgICAgIHRvdGFsczogJ2NhcnQvdG90YWxzJyxcclxuICAgICAgICAgICAgICAgIHBhZ2VUaXRsZTogJ2NhcnQvcGFnZS10aXRsZScsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXNNZXNzYWdlczogJ2NhcnQvc3RhdHVzLW1lc3NhZ2VzJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGxhc3QgaXRlbSBmcm9tIGNhcnQ/IFJlbG9hZFxyXG4gICAgICAgIGlmIChyZW1vdmUgJiYgJGNhcnRJdGVtc1Jvd3MubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRDb250ZW50KG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJGNhcnRDb250ZW50Lmh0bWwocmVzcG9uc2UuY29udGVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuJGNhcnRUb3RhbHMuaHRtbChyZXNwb25zZS50b3RhbHMpO1xyXG4gICAgICAgICAgICB0aGlzLiRjYXJ0TWVzc2FnZXMuaHRtbChyZXNwb25zZS5zdGF0dXNNZXNzYWdlcyk7XHJcblxyXG4gICAgICAgICAgICAkY2FydFBhZ2VUaXRsZS5yZXBsYWNlV2l0aChyZXNwb25zZS5wYWdlVGl0bGUpO1xyXG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBxdWFudGl0eSA9ICQoJ1tkYXRhLWNhcnQtcXVhbnRpdHldJywgdGhpcy4kY2FydENvbnRlbnQpLmRhdGEoJ2NhcnRRdWFudGl0eScpIHx8IDA7XHJcblxyXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlcignY2FydC1xdWFudGl0eS11cGRhdGUnLCBxdWFudGl0eSk7XHJcblxyXG4gICAgICAgICAgICAkKGBbZGF0YS1jYXJ0LWl0ZW1pZD0nJHt0aGlzLiRhY3RpdmVDYXJ0SXRlbUlkfSddYCwgdGhpcy4kY2FydENvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGBbZGF0YS1hY3Rpb249JyR7dGhpcy4kYWN0aXZlQ2FydEl0ZW1CdG5BY3Rpb259J11gKVxyXG4gICAgICAgICAgICAgICAgLnRyaWdnZXIoJ2ZvY3VzJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGJpbmRDYXJ0RXZlbnRzKCkge1xyXG4gICAgICAgIGNvbnN0IGRlYm91bmNlVGltZW91dCA9IDQwMDtcclxuICAgICAgICBjb25zdCBjYXJ0VXBkYXRlID0gYmluZChkZWJvdW5jZSh0aGlzLmNhcnRVcGRhdGUsIGRlYm91bmNlVGltZW91dCksIHRoaXMpO1xyXG4gICAgICAgIGNvbnN0IGNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlID0gYmluZChkZWJvdW5jZSh0aGlzLmNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlLCBkZWJvdW5jZVRpbWVvdXQpLCB0aGlzKTtcclxuICAgICAgICBjb25zdCBjYXJ0UmVtb3ZlSXRlbSA9IGJpbmQoZGVib3VuY2UodGhpcy5jYXJ0UmVtb3ZlSXRlbSwgZGVib3VuY2VUaW1lb3V0KSwgdGhpcyk7XHJcbiAgICAgICAgbGV0IHByZVZhbDtcclxuXHJcbiAgICAgICAgLy8gY2FydCB1cGRhdGVcclxuICAgICAgICAkKCdbZGF0YS1jYXJ0LXVwZGF0ZV0nLCB0aGlzLiRjYXJ0Q29udGVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCAkdGFyZ2V0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAvLyB1cGRhdGUgY2FydCBxdWFudGl0eVxyXG4gICAgICAgICAgICBjYXJ0VXBkYXRlKCR0YXJnZXQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBjYXJ0IHF0eSBtYW51YWxseSB1cGRhdGVzXHJcbiAgICAgICAgJCgnLmNhcnQtaXRlbS1xdHktaW5wdXQnLCB0aGlzLiRjYXJ0Q29udGVudCkub24oJ2ZvY3VzJywgZnVuY3Rpb24gb25RdHlGb2N1cygpIHtcclxuICAgICAgICAgICAgcHJlVmFsID0gdGhpcy52YWx1ZTtcclxuICAgICAgICB9KS5jaGFuZ2UoZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCAkdGFyZ2V0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBjYXJ0IHF1YW50aXR5XHJcbiAgICAgICAgICAgIGNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlKCR0YXJnZXQsIHByZVZhbCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuY2FydC1yZW1vdmUnLCB0aGlzLiRjYXJ0Q29udGVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2NhcnRJdGVtaWQnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHN0cmluZyA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnY29uZmlybURlbGV0ZScpO1xyXG4gICAgICAgICAgICBzd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICAgICAgdGV4dDogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IHRoaXMuY29udGV4dC5jYW5jZWxCdXR0b25UZXh0LFxyXG4gICAgICAgICAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgaXRlbSBmcm9tIGNhcnRcclxuICAgICAgICAgICAgICAgICAgICBjYXJ0UmVtb3ZlSXRlbShpdGVtSWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnW2RhdGEtaXRlbS1lZGl0XScsIHRoaXMuJGNhcnRDb250ZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnaXRlbUVkaXQnKTtcclxuICAgICAgICAgICAgY29uc3QgcHJvZHVjdElkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdwcm9kdWN0SWQnKTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgLy8gZWRpdCBpdGVtIGluIGNhcnRcclxuICAgICAgICAgICAgdGhpcy5jYXJ0RWRpdE9wdGlvbnMoaXRlbUlkLCBwcm9kdWN0SWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRQcm9tb0NvZGVFdmVudHMoKSB7XHJcbiAgICAgICAgY29uc3QgJGNvdXBvbkNvbnRhaW5lciA9ICQoJy5jb3Vwb24tY29kZScpO1xyXG4gICAgICAgIGNvbnN0ICRjb3Vwb25Gb3JtID0gJCgnLmNvdXBvbi1mb3JtJyk7XHJcbiAgICAgICAgY29uc3QgJGNvZGVJbnB1dCA9ICQoJ1tuYW1lPVwiY291cG9uY29kZVwiXScsICRjb3Vwb25Gb3JtKTtcclxuXHJcbiAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWFkZCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldCkuaGlkZSgpO1xyXG4gICAgICAgICAgICAkY291cG9uQ29udGFpbmVyLnNob3coKTtcclxuICAgICAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWNhbmNlbCcpLnNob3coKTtcclxuICAgICAgICAgICAgJGNvZGVJbnB1dC50cmlnZ2VyKCdmb2N1cycpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuY291cG9uLWNvZGUtY2FuY2VsJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgJGNvdXBvbkNvbnRhaW5lci5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1hZGQnKS5zaG93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRjb3Vwb25Gb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvZGUgPSAkY29kZUlucHV0LnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEVtcHR5IGNvZGVcclxuICAgICAgICAgICAgaWYgKCFjb2RlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAkY29kZUlucHV0LmRhdGEoJ2Vycm9yJyksXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5hcHBseUNvZGUoY29kZSwgKGVyciwgcmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiByZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZEdpZnRDZXJ0aWZpY2F0ZUV2ZW50cygpIHtcclxuICAgICAgICBjb25zdCAkY2VydENvbnRhaW5lciA9ICQoJy5naWZ0LWNlcnRpZmljYXRlLWNvZGUnKTtcclxuICAgICAgICBjb25zdCAkY2VydEZvcm0gPSAkKCcuY2FydC1naWZ0LWNlcnRpZmljYXRlLWZvcm0nKTtcclxuICAgICAgICBjb25zdCAkY2VydElucHV0ID0gJCgnW25hbWU9XCJjZXJ0Y29kZVwiXScsICRjZXJ0Rm9ybSk7XHJcblxyXG4gICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWFkZCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KS50b2dnbGUoKTtcclxuICAgICAgICAgICAgJGNlcnRDb250YWluZXIudG9nZ2xlKCk7XHJcbiAgICAgICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWNhbmNlbCcpLnRvZ2dsZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jYW5jZWwnKS5vbignY2xpY2snLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICRjZXJ0Q29udGFpbmVyLnRvZ2dsZSgpO1xyXG4gICAgICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1hZGQnKS50b2dnbGUoKTtcclxuICAgICAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtY2FuY2VsJykudG9nZ2xlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRjZXJ0Rm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjb2RlID0gJGNlcnRJbnB1dC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNoZWNrSXNHaWZ0Q2VydFZhbGlkKGNvZGUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uRGljdGlvbmFyeSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSh0aGlzLmNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogdmFsaWRhdGlvbkRpY3Rpb25hcnkuaW52YWxpZF9naWZ0X2NlcnRpZmljYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuYXBwbHlHaWZ0Q2VydGlmaWNhdGUoY29kZSwgKGVyciwgcmVzcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3AuZGF0YS5zdGF0dXMgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogcmVzcC5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZEdpZnRXcmFwcGluZ0V2ZW50cygpIHtcclxuICAgICAgICBjb25zdCBtb2RhbCA9IGRlZmF1bHRNb2RhbCgpO1xyXG5cclxuICAgICAgICAkKCdbZGF0YS1pdGVtLWdpZnR3cmFwXScpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbUlkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdpdGVtR2lmdHdyYXAnKTtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAnY2FydC9tb2RhbHMvZ2lmdC13cmFwcGluZy1mb3JtJyxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBtb2RhbC5vcGVuKCk7XHJcblxyXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRJdGVtR2lmdFdyYXBwaW5nT3B0aW9ucyhpdGVtSWQsIG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtb2RhbC51cGRhdGVDb250ZW50KHJlc3BvbnNlLmNvbnRlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYmluZEdpZnRXcmFwcGluZ0Zvcm0oKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZEdpZnRXcmFwcGluZ0Zvcm0oKSB7XHJcbiAgICAgICAgJCgnLmdpZnRXcmFwcGluZy1zZWxlY3QnKS5vbignY2hhbmdlJywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCAkc2VsZWN0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICAgICAgY29uc3QgaWQgPSAkc2VsZWN0LnZhbCgpO1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9ICRzZWxlY3QuZGF0YSgnaW5kZXgnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghaWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgYWxsb3dNZXNzYWdlID0gJHNlbGVjdC5maW5kKGBvcHRpb25bdmFsdWU9JHtpZH1dYCkuZGF0YSgnYWxsb3dNZXNzYWdlJyk7XHJcblxyXG4gICAgICAgICAgICAkKGAuZ2lmdFdyYXBwaW5nLWltYWdlLSR7aW5kZXh9YCkuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKGAjZ2lmdFdyYXBwaW5nLWltYWdlLSR7aW5kZXh9LSR7aWR9YCkuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGFsbG93TWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1tZXNzYWdlLSR7aW5kZXh9YCkuc2hvdygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1tZXNzYWdlLSR7aW5kZXh9YCkuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJy5naWZ0V3JhcHBpbmctc2VsZWN0JykudHJpZ2dlcignY2hhbmdlJyk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZVZpZXdzKCkge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9ICQoJ2lucHV0OnJhZGlvW25hbWUgPVwiZ2lmdHdyYXB0eXBlXCJdOmNoZWNrZWQnKS52YWwoKTtcclxuICAgICAgICAgICAgY29uc3QgJHNpbmdsZUZvcm0gPSAkKCcuZ2lmdFdyYXBwaW5nLXNpbmdsZScpO1xyXG4gICAgICAgICAgICBjb25zdCAkbXVsdGlGb3JtID0gJCgnLmdpZnRXcmFwcGluZy1tdWx0aXBsZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSAnc2FtZScpIHtcclxuICAgICAgICAgICAgICAgICRzaW5nbGVGb3JtLnNob3coKTtcclxuICAgICAgICAgICAgICAgICRtdWx0aUZvcm0uaGlkZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHNpbmdsZUZvcm0uaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgJG11bHRpRm9ybS5zaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJ1tuYW1lPVwiZ2lmdHdyYXB0eXBlXCJdJykub24oJ2NsaWNrJywgdG9nZ2xlVmlld3MpO1xyXG5cclxuICAgICAgICB0b2dnbGVWaWV3cygpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRFdmVudHMoKSB7XHJcbiAgICAgICAgdGhpcy5iaW5kQ2FydEV2ZW50cygpO1xyXG4gICAgICAgIHRoaXMuYmluZFByb21vQ29kZUV2ZW50cygpO1xyXG4gICAgICAgIHRoaXMuYmluZEdpZnRXcmFwcGluZ0V2ZW50cygpO1xyXG4gICAgICAgIHRoaXMuYmluZEdpZnRDZXJ0aWZpY2F0ZUV2ZW50cygpO1xyXG5cclxuICAgICAgICAvLyBpbml0aWF0ZSBzaGlwcGluZyBlc3RpbWF0b3IgbW9kdWxlXHJcbiAgICAgICAgY29uc3Qgc2hpcHBpbmdFcnJvck1lc3NhZ2VzID0ge1xyXG4gICAgICAgICAgICBjb3VudHJ5OiB0aGlzLmNvbnRleHQuc2hpcHBpbmdDb3VudHJ5RXJyb3JNZXNzYWdlLFxyXG4gICAgICAgICAgICBwcm92aW5jZTogdGhpcy5jb250ZXh0LnNoaXBwaW5nUHJvdmluY2VFcnJvck1lc3NhZ2UsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNoaXBwaW5nRXN0aW1hdG9yID0gbmV3IFNoaXBwaW5nRXN0aW1hdG9yKCQoJ1tkYXRhLXNoaXBwaW5nLWVzdGltYXRvcl0nKSwgc2hpcHBpbmdFcnJvck1lc3NhZ2VzKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgc3RhdGVDb3VudHJ5IGZyb20gJy4uL2NvbW1vbi9zdGF0ZS1jb3VudHJ5JztcclxuaW1wb3J0IG5vZCBmcm9tICcuLi9jb21tb24vbm9kJztcclxuaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcclxuaW1wb3J0IHsgVmFsaWRhdG9ycywgYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSB9IGZyb20gJy4uL2NvbW1vbi91dGlscy9mb3JtLXV0aWxzJztcclxuaW1wb3J0IGNvbGxhcHNpYmxlRmFjdG9yeSBmcm9tICcuLi9jb21tb24vY29sbGFwc2libGUnO1xyXG5pbXBvcnQgc3dhbCBmcm9tICcuLi9nbG9iYWwvc3dlZXQtYWxlcnQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcHBpbmdFc3RpbWF0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoJGVsZW1lbnQsIHNoaXBwaW5nRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcclxuXHJcbiAgICAgICAgdGhpcy4kc3RhdGUgPSAkKCdbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl0nLCB0aGlzLiRlbGVtZW50KTtcclxuICAgICAgICB0aGlzLmlzRXN0aW1hdG9yRm9ybU9wZW5lZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hpcHBpbmdFcnJvck1lc3NhZ2VzID0gc2hpcHBpbmdFcnJvck1lc3NhZ2VzO1xyXG4gICAgICAgIHRoaXMuaW5pdEZvcm1WYWxpZGF0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5iaW5kU3RhdGVDb3VudHJ5Q2hhbmdlKCk7XHJcbiAgICAgICAgdGhpcy5iaW5kRXN0aW1hdG9yRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEZvcm1WYWxpZGF0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IHNoaXBwaW5nRXN0aW1hdG9yQWxlcnQgPSAkKCcuc2hpcHBpbmctcXVvdGVzJyk7XHJcblxyXG4gICAgICAgIHRoaXMuc2hpcHBpbmdFc3RpbWF0b3IgPSAnZm9ybVtkYXRhLXNoaXBwaW5nLWVzdGltYXRvcl0nO1xyXG4gICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IgPSBub2Qoe1xyXG4gICAgICAgICAgICBzdWJtaXQ6IGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IC5zaGlwcGluZy1lc3RpbWF0ZS1zdWJtaXRgLFxyXG4gICAgICAgICAgICB0YXA6IGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJy5zaGlwcGluZy1lc3RpbWF0ZS1zdWJtaXQnLCB0aGlzLiRlbGVtZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIC8vIGVzdGltYXRvciBlcnJvciBtZXNzYWdlcyBhcmUgYmVpbmcgaW5qZWN0ZWQgaW4gaHRtbCBhcyBhIHJlc3VsdFxyXG4gICAgICAgICAgICAvLyBvZiB1c2VyIHN1Ym1pdDsgY2xlYXJpbmcgYW5kIGFkZGluZyByb2xlIG9uIHN1Ym1pdCBwcm92aWRlc1xyXG4gICAgICAgICAgICAvLyByZWd1bGFyIGFubm91bmNlbWVudCBvZiB0aGVzZSBlcnJvciBtZXNzYWdlc1xyXG4gICAgICAgICAgICBpZiAoc2hpcHBpbmdFc3RpbWF0b3JBbGVydC5hdHRyKCdyb2xlJykpIHtcclxuICAgICAgICAgICAgICAgIHNoaXBwaW5nRXN0aW1hdG9yQWxlcnQucmVtb3ZlQXR0cigncm9sZScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzaGlwcGluZ0VzdGltYXRvckFsZXJ0LmF0dHIoJ3JvbGUnLCAnYWxlcnQnKTtcclxuICAgICAgICAgICAgLy8gV2hlbiBzd2l0Y2hpbmcgYmV0d2VlbiBjb3VudHJpZXMsIHRoZSBzdGF0ZS9yZWdpb24gaXMgZHluYW1pY1xyXG4gICAgICAgICAgICAvLyBPbmx5IHBlcmZvcm0gYSBjaGVjayBmb3IgYWxsIGZpZWxkcyB3aGVuIGNvdW50cnkgaGFzIGEgdmFsdWVcclxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGFyZUFsbCgndmFsaWQnKSB3aWxsIGNoZWNrIGNvdW50cnkgZm9yIHZhbGlkaXR5XHJcbiAgICAgICAgICAgIGlmICgkKGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXWApLnZhbCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5iaW5kVmFsaWRhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYmluZFN0YXRlVmFsaWRhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYmluZFVQU1JhdGVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZFZhbGlkYXRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5hZGQoW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gc2VsZWN0W25hbWU9XCJzaGlwcGluZy1jb3VudHJ5XCJdYCxcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50cnlJZCA9IE51bWJlcih2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGNvdW50cnlJZCAhPT0gMCAmJiAhTnVtYmVyLmlzTmFOKGNvdW50cnlJZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLnNoaXBwaW5nRXJyb3JNZXNzYWdlcy5jb3VudHJ5LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRTdGF0ZVZhbGlkYXRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5hZGQoW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJChgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLXN0YXRlXCJdYCksXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgJGVsZSA9ICQoYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gc2VsZWN0W25hbWU9XCJzaGlwcGluZy1zdGF0ZVwiXWApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJGVsZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlVmFsID0gJGVsZS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGVsZVZhbCAmJiBlbGVWYWwubGVuZ3RoICYmIGVsZVZhbCAhPT0gJ1N0YXRlL3Byb3ZpbmNlJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLnNoaXBwaW5nRXJyb3JNZXNzYWdlcy5wcm92aW5jZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRvZ2dsZSBiZXR3ZWVuIGRlZmF1bHQgc2hpcHBpbmcgYW5kIHVwcyBzaGlwcGluZyByYXRlc1xyXG4gICAgICovXHJcbiAgICBiaW5kVVBTUmF0ZXMoKSB7XHJcbiAgICAgICAgY29uc3QgVVBTUmF0ZVRvZ2dsZSA9ICcuZXN0aW1hdG9yLWZvcm0tdG9nZ2xlVVBTUmF0ZSc7XHJcblxyXG4gICAgICAgICQoJ2JvZHknKS5vbignY2xpY2snLCBVUFNSYXRlVG9nZ2xlLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgJGVzdGltYXRvckZvcm1VcHMgPSAkKCcuZXN0aW1hdG9yLWZvcm0tLXVwcycpO1xyXG4gICAgICAgICAgICBjb25zdCAkZXN0aW1hdG9yRm9ybURlZmF1bHQgPSAkKCcuZXN0aW1hdG9yLWZvcm0tLWRlZmF1bHQnKTtcclxuXHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAkZXN0aW1hdG9yRm9ybVVwcy50b2dnbGVDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xyXG4gICAgICAgICAgICAkZXN0aW1hdG9yRm9ybURlZmF1bHQudG9nZ2xlQ2xhc3MoJ3UtaGlkZGVuVmlzdWFsbHknKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kU3RhdGVDb3VudHJ5Q2hhbmdlKCkge1xyXG4gICAgICAgIGxldCAkbGFzdDtcclxuXHJcbiAgICAgICAgLy8gUmVxdWVzdHMgdGhlIHN0YXRlcyBmb3IgYSBjb3VudHJ5IHdpdGggQUpBWFxyXG4gICAgICAgIHN0YXRlQ291bnRyeSh0aGlzLiRzdGF0ZSwgdGhpcy5jb250ZXh0LCB7IHVzZUlkRm9yU3RhdGVzOiB0cnVlIH0sIChlcnIsIGZpZWxkKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIHN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogZXJyLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgJGZpZWxkID0gJChmaWVsZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5nZXRTdGF0dXModGhpcy4kc3RhdGUpICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5yZW1vdmUodGhpcy4kc3RhdGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJGxhc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IucmVtb3ZlKCRsYXN0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCRmaWVsZC5pcygnc2VsZWN0JykpIHtcclxuICAgICAgICAgICAgICAgICRsYXN0ID0gZmllbGQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRTdGF0ZVZhbGlkYXRpb24oKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRmaWVsZC5hdHRyKCdwbGFjZWhvbGRlcicsICdTdGF0ZS9wcm92aW5jZScpO1xyXG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5jbGVhblVwU3RhdGVWYWxpZGF0aW9uKGZpZWxkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gV2hlbiB5b3UgY2hhbmdlIGEgY291bnRyeSwgeW91IHN3YXAgdGhlIHN0YXRlL3Byb3ZpbmNlIGJldHdlZW4gYW4gaW5wdXQgYW5kIGEgc2VsZWN0IGRyb3Bkb3duXHJcbiAgICAgICAgICAgIC8vIE5vdCBhbGwgY291bnRyaWVzIHJlcXVpcmUgdGhlIHByb3ZpbmNlIHRvIGJlIGZpbGxlZFxyXG4gICAgICAgICAgICAvLyBXZSBoYXZlIHRvIHJlbW92ZSB0aGlzIGNsYXNzIHdoZW4gd2Ugc3dhcCBzaW5jZSBub2QgdmFsaWRhdGlvbiBkb2Vzbid0IGNsZWFudXAgZm9yIHVzXHJcbiAgICAgICAgICAgICQodGhpcy5zaGlwcGluZ0VzdGltYXRvcikuZmluZCgnLmZvcm0tZmllbGQtLXN1Y2Nlc3MnKS5yZW1vdmVDbGFzcygnZm9ybS1maWVsZC0tc3VjY2VzcycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZUVzdGltYXRvckZvcm1TdGF0ZSh0b2dnbGVCdXR0b24sIGJ1dHRvblNlbGVjdG9yLCAkdG9nZ2xlQ29udGFpbmVyKSB7XHJcbiAgICAgICAgY29uc3QgY2hhbmdlQXR0cmlidXRlc09uVG9nZ2xlID0gKHNlbGVjdG9yVG9BY3RpdmF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAkKHRvZ2dsZUJ1dHRvbikuYXR0cignYXJpYS1sYWJlbGxlZGJ5Jywgc2VsZWN0b3JUb0FjdGl2YXRlKTtcclxuICAgICAgICAgICAgJChidXR0b25TZWxlY3RvcikudGV4dCgkKGAjJHtzZWxlY3RvclRvQWN0aXZhdGV9YCkudGV4dCgpKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaXNFc3RpbWF0b3JGb3JtT3BlbmVkKSB7XHJcbiAgICAgICAgICAgIGNoYW5nZUF0dHJpYnV0ZXNPblRvZ2dsZSgnZXN0aW1hdG9yLWNsb3NlJyk7XHJcbiAgICAgICAgICAgICR0b2dnbGVDb250YWluZXIucmVtb3ZlQ2xhc3MoJ3UtaGlkZGVuJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2hhbmdlQXR0cmlidXRlc09uVG9nZ2xlKCdlc3RpbWF0b3ItYWRkJyk7XHJcbiAgICAgICAgICAgICR0b2dnbGVDb250YWluZXIuYWRkQ2xhc3MoJ3UtaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNFc3RpbWF0b3JGb3JtT3BlbmVkID0gIXRoaXMuaXNFc3RpbWF0b3JGb3JtT3BlbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRFc3RpbWF0b3JFdmVudHMoKSB7XHJcbiAgICAgICAgY29uc3QgJGVzdGltYXRvckNvbnRhaW5lciA9ICQoJy5zaGlwcGluZy1lc3RpbWF0b3InKTtcclxuICAgICAgICBjb25zdCAkZXN0aW1hdG9yRm9ybSA9ICQoJy5lc3RpbWF0b3ItZm9ybScpO1xyXG4gICAgICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xyXG4gICAgICAgICRlc3RpbWF0b3JGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgIGNvdW50cnlfaWQ6ICQoJ1tuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcclxuICAgICAgICAgICAgICAgIHN0YXRlX2lkOiAkKCdbbmFtZT1cInNoaXBwaW5nLXN0YXRlXCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgY2l0eTogJCgnW25hbWU9XCJzaGlwcGluZy1jaXR5XCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgemlwX2NvZGU6ICQoJ1tuYW1lPVwic2hpcHBpbmctemlwXCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmdldFNoaXBwaW5nUXVvdGVzKHBhcmFtcywgJ2NhcnQvc2hpcHBpbmctcXVvdGVzJywgKGVyciwgcmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICQoJy5zaGlwcGluZy1xdW90ZXMnKS5odG1sKHJlc3BvbnNlLmNvbnRlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGJpbmQgdGhlIHNlbGVjdCBidXR0b25cclxuICAgICAgICAgICAgICAgICQoJy5zZWxlY3Qtc2hpcHBpbmctcXVvdGUnKS5vbignY2xpY2snLCBjbGlja0V2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBxdW90ZUlkID0gJCgnLnNoaXBwaW5nLXF1b3RlOmNoZWNrZWQnKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5hcGkuY2FydC5zdWJtaXRTaGlwcGluZ1F1b3RlKHF1b3RlSWQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuc2hpcHBpbmctZXN0aW1hdGUtc2hvdycpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVFc3RpbWF0b3JGb3JtU3RhdGUoZXZlbnQuY3VycmVudFRhcmdldCwgJy5zaGlwcGluZy1lc3RpbWF0ZS1zaG93X19idG4tbmFtZScsICRlc3RpbWF0b3JDb250YWluZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XHJcbmltcG9ydCBQcm9kdWN0RGV0YWlsc0Jhc2UsIHsgb3B0aW9uQ2hhbmdlRGVjb3JhdG9yIH0gZnJvbSAnLi9wcm9kdWN0LWRldGFpbHMtYmFzZSc7XHJcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBpc0Jyb3dzZXJJRSwgY29udmVydEludG9BcnJheSB9IGZyb20gJy4vdXRpbHMvaWUtaGVscGVycyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0SXRlbURldGFpbHMgZXh0ZW5kcyBQcm9kdWN0RGV0YWlsc0Jhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlLCBjb250ZXh0LCBwcm9kdWN0QXR0cmlidXRlc0RhdGEgPSB7fSkge1xyXG4gICAgICAgIHN1cGVyKCRzY29wZSwgY29udGV4dCk7XHJcblxyXG4gICAgICAgIGNvbnN0ICRmb3JtID0gJCgnI0NhcnRFZGl0UHJvZHVjdEZpZWxkc0Zvcm0nLCB0aGlzLiRzY29wZSk7XHJcbiAgICAgICAgY29uc3QgJHByb2R1Y3RPcHRpb25zRWxlbWVudCA9ICQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlcy13cmFwcGVyXScsICRmb3JtKTtcclxuICAgICAgICBjb25zdCBoYXNPcHRpb25zID0gJHByb2R1Y3RPcHRpb25zRWxlbWVudC5odG1sKCkudHJpbSgpLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBoYXNEZWZhdWx0T3B0aW9ucyA9ICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuZmluZCgnW2RhdGEtZGVmYXVsdF0nKS5sZW5ndGg7XHJcblxyXG4gICAgICAgICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQub24oJ2NoYW5nZScsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRQcm9kdWN0VmFyaWFudCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBvcHRpb25DaGFuZ2VDYWxsYmFjayA9IG9wdGlvbkNoYW5nZURlY29yYXRvci5jYWxsKHRoaXMsIGhhc0RlZmF1bHRPcHRpb25zKTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHByb2R1Y3QgYXR0cmlidXRlcy4gQWxzbyB1cGRhdGUgdGhlIGluaXRpYWwgdmlldyBpbiBjYXNlIGl0ZW1zIGFyZSBvb3NcclxuICAgICAgICAvLyBvciBoYXZlIGRlZmF1bHQgdmFyaWFudCBwcm9wZXJ0aWVzIHRoYXQgY2hhbmdlIHRoZSB2aWV3XHJcbiAgICAgICAgaWYgKChpc0VtcHR5KHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSkgfHwgaGFzRGVmYXVsdE9wdGlvbnMpICYmIGhhc09wdGlvbnMpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvZHVjdElkID0gdGhpcy5jb250ZXh0LnByb2R1Y3RGb3JDaGFuZ2VJZDtcclxuXHJcbiAgICAgICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UocHJvZHVjdElkLCAkZm9ybS5zZXJpYWxpemUoKSwgJ3Byb2R1Y3RzL2J1bGstZGlzY291bnQtcmF0ZXMnLCBvcHRpb25DaGFuZ2VDYWxsYmFjayk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQcm9kdWN0QXR0cmlidXRlcyhwcm9kdWN0QXR0cmlidXRlc0RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRQcm9kdWN0VmFyaWFudCgpIHtcclxuICAgICAgICBjb25zdCB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzID0gW107XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xyXG5cclxuICAgICAgICAkLmVhY2goJCgnW2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGVdJyksIChpbmRleCwgdmFsdWUpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uTGFiZWwgPSB2YWx1ZS5jaGlsZHJlblswXS5pbm5lclRleHQ7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvblRpdGxlID0gb3B0aW9uTGFiZWwuc3BsaXQoJzonKVswXS50cmltKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcXVpcmVkID0gb3B0aW9uTGFiZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygncmVxdWlyZWQnKTtcclxuICAgICAgICAgICAgY29uc3QgdHlwZSA9IHZhbHVlLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCh0eXBlID09PSAnaW5wdXQtZmlsZScgfHwgdHlwZSA9PT0gJ2lucHV0LXRleHQnIHx8IHR5cGUgPT09ICdpbnB1dC1udW1iZXInKSAmJiB2YWx1ZS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlID09PSAnJyAmJiByZXF1aXJlZCkge1xyXG4gICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICd0ZXh0YXJlYScgJiYgdmFsdWUucXVlcnlTZWxlY3RvcigndGV4dGFyZWEnKS52YWx1ZSA9PT0gJycgJiYgcmVxdWlyZWQpIHtcclxuICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnZGF0ZScpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzU2F0aXNmaWVkID0gQXJyYXkuZnJvbSh2YWx1ZS5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QnKSkuZXZlcnkoKHNlbGVjdCkgPT4gc2VsZWN0LnNlbGVjdGVkSW5kZXggIT09IDApO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc1NhdGlzZmllZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBBcnJheS5mcm9tKHZhbHVlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlbGVjdCcpKS5tYXAoKHgpID0+IHgudmFsdWUpLmpvaW4oJy0nKTtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9OiR7ZGF0ZVN0cmluZ31gKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2V0LXNlbGVjdCcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdCA9IHZhbHVlLnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdCcpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IHNlbGVjdC5zZWxlY3RlZEluZGV4O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEluZGV4ICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfToke3NlbGVjdC5vcHRpb25zW3NlbGVjdGVkSW5kZXhdLmlubmVyVGV4dH1gKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2V0LXJlY3RhbmdsZScgfHwgdHlwZSA9PT0gJ3NldC1yYWRpbycgfHwgdHlwZSA9PT0gJ3N3YXRjaCcgfHwgdHlwZSA9PT0gJ2lucHV0LWNoZWNrYm94JyB8fCB0eXBlID09PSAncHJvZHVjdC1saXN0Jykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hlY2tlZCA9IHZhbHVlLnF1ZXJ5U2VsZWN0b3IoJzpjaGVja2VkJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdldFNlbGVjdGVkT3B0aW9uTGFiZWwgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RWYXJpYW50c2xpc3QgPSBjb252ZXJ0SW50b0FycmF5KHZhbHVlLmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hMYWJlbEZvckNoZWNrZWRJbnB1dCA9IGlucHQgPT4gaW5wdC5kYXRhc2V0LnByb2R1Y3RBdHRyaWJ1dGVWYWx1ZSA9PT0gY2hlY2tlZC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2R1Y3RWYXJpYW50c2xpc3QuZmlsdGVyKG1hdGNoTGFiZWxGb3JDaGVja2VkSW5wdXQpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdzZXQtcmVjdGFuZ2xlJyB8fCB0eXBlID09PSAnc2V0LXJhZGlvJyB8fCB0eXBlID09PSAncHJvZHVjdC1saXN0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IGlzQnJvd3NlcklFID8gZ2V0U2VsZWN0ZWRPcHRpb25MYWJlbCgpLmlubmVyVGV4dC50cmltKCkgOiBjaGVja2VkLmxhYmVsc1swXS5pbm5lclRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfToke2xhYmVsfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3N3YXRjaCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBpc0Jyb3dzZXJJRSA/IGdldFNlbGVjdGVkT3B0aW9uTGFiZWwoKS5jaGlsZHJlblswXSA6IGNoZWNrZWQubGFiZWxzWzBdLmNoaWxkcmVuWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtsYWJlbC50aXRsZX1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdpbnB1dC1jaGVja2JveCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfTpZZXNgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2lucHV0LWNoZWNrYm94Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06Tm9gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBwcm9kdWN0VmFyaWFudCA9IHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMubGVuZ3RoID09PSAwID8gb3B0aW9ucy5zb3J0KCkuam9pbignLCAnKSA6ICd1bnNhdGlzZmllZCc7XHJcbiAgICAgICAgY29uc3QgdmlldyA9ICQoJy5tb2RhbC1oZWFkZXItdGl0bGUnKTtcclxuXHJcbiAgICAgICAgaWYgKHByb2R1Y3RWYXJpYW50KSB7XHJcbiAgICAgICAgICAgIHByb2R1Y3RWYXJpYW50ID0gcHJvZHVjdFZhcmlhbnQgPT09ICd1bnNhdGlzZmllZCcgPyAnJyA6IHByb2R1Y3RWYXJpYW50O1xyXG4gICAgICAgICAgICBpZiAodmlldy5hdHRyKCdkYXRhLWV2ZW50LXR5cGUnKSkge1xyXG4gICAgICAgICAgICAgICAgdmlldy5hdHRyKCdkYXRhLXByb2R1Y3QtdmFyaWFudCcsIHByb2R1Y3RWYXJpYW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByb2R1Y3ROYW1lID0gdmlldy5odG1sKCkubWF0Y2goLycoLio/KScvKVsxXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhcmQgPSAkKGBbZGF0YS1uYW1lPVwiJHtwcm9kdWN0TmFtZX1cIl1gKTtcclxuICAgICAgICAgICAgICAgIGNhcmQuYXR0cignZGF0YS1wcm9kdWN0LXZhcmlhbnQnLCBwcm9kdWN0VmFyaWFudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWRlIG9yIG1hcmsgYXMgdW5hdmFpbGFibGUgb3V0IG9mIHN0b2NrIGF0dHJpYnV0ZXMgaWYgZW5hYmxlZFxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBkYXRhIFByb2R1Y3QgYXR0cmlidXRlIGRhdGFcclxuICAgICAqL1xyXG4gICAgdXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMoZGF0YSkge1xyXG4gICAgICAgIHN1cGVyLnVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKGRhdGEpO1xyXG5cclxuICAgICAgICB0aGlzLiRzY29wZS5maW5kKCcubW9kYWwtY29udGVudCcpLnJlbW92ZUNsYXNzKCdoaWRlLWNvbnRlbnQnKTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoY2VydCkge1xyXG4gICAgaWYgKHR5cGVvZiBjZXJ0ICE9PSAnc3RyaW5nJyB8fCBjZXJ0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBZGQgYW55IGN1c3RvbSBnaWZ0IGNlcnRpZmljYXRlIHZhbGlkYXRpb24gbG9naWMgaGVyZVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuIiwiaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCB9IGZyb20gJy4vdXRpbHMvZm9ybS11dGlscyc7XHJcbmltcG9ydCB7IHNob3dBbGVydE1vZGFsIH0gZnJvbSAnLi4vZ2xvYmFsL21vZGFsJztcclxuXHJcbi8qKlxyXG4gKiBJZiB0aGVyZSBhcmUgbm8gb3B0aW9ucyBmcm9tIGJjYXBwLCBhIHRleHQgZmllbGQgd2lsbCBiZSBzZW50LiBUaGlzIHdpbGwgY3JlYXRlIGEgc2VsZWN0IGVsZW1lbnQgdG8gaG9sZCBvcHRpb25zIGFmdGVyIHRoZSByZW1vdGUgcmVxdWVzdC5cclxuICogQHJldHVybnMge2pRdWVyeXxIVE1MRWxlbWVudH1cclxuICovXHJcbmZ1bmN0aW9uIG1ha2VTdGF0ZVJlcXVpcmVkKHN0YXRlRWxlbWVudCwgY29udGV4dCkge1xyXG4gICAgY29uc3QgYXR0cnMgPSBfLnRyYW5zZm9ybShzdGF0ZUVsZW1lbnQucHJvcCgnYXR0cmlidXRlcycpLCAocmVzdWx0LCBpdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gcmVzdWx0O1xyXG4gICAgICAgIHJldFtpdGVtLm5hbWVdID0gaXRlbS52YWx1ZTtcclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgcmVwbGFjZW1lbnRBdHRyaWJ1dGVzID0ge1xyXG4gICAgICAgIGlkOiBhdHRycy5pZCxcclxuICAgICAgICAnZGF0YS1sYWJlbCc6IGF0dHJzWydkYXRhLWxhYmVsJ10sXHJcbiAgICAgICAgY2xhc3M6ICdmb3JtLXNlbGVjdCcsXHJcbiAgICAgICAgbmFtZTogYXR0cnMubmFtZSxcclxuICAgICAgICAnZGF0YS1maWVsZC10eXBlJzogYXR0cnNbJ2RhdGEtZmllbGQtdHlwZSddLFxyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0ZUVsZW1lbnQucmVwbGFjZVdpdGgoJCgnPHNlbGVjdD48L3NlbGVjdD4nLCByZXBsYWNlbWVudEF0dHJpYnV0ZXMpKTtcclxuXHJcbiAgICBjb25zdCAkbmV3RWxlbWVudCA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScpO1xyXG4gICAgY29uc3QgJGhpZGRlbklucHV0ID0gJCgnW25hbWUqPVwiRm9ybUZpZWxkSXNUZXh0XCJdJyk7XHJcblxyXG4gICAgaWYgKCRoaWRkZW5JbnB1dC5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAkaGlkZGVuSW5wdXQucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCRuZXdFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIC8vIFN0cmluZyBpcyBpbmplY3RlZCBmcm9tIGxvY2FsaXplclxyXG4gICAgICAgICRuZXdFbGVtZW50LnByZXYoKS5hcHBlbmQoYDxzbWFsbD4ke2NvbnRleHQucmVxdWlyZWR9PC9zbWFsbD5gKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJG5ld0VsZW1lbnQucHJldigpLmZpbmQoJ3NtYWxsJykuc2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAkbmV3RWxlbWVudDtcclxufVxyXG5cclxuLyoqXHJcbiAqIElmIGEgY291bnRyeSB3aXRoIHN0YXRlcyBpcyB0aGUgZGVmYXVsdCwgYSBzZWxlY3Qgd2lsbCBiZSBzZW50LFxyXG4gKiBJbiB0aGlzIGNhc2Ugd2UgbmVlZCB0byBiZSBhYmxlIHRvIHN3aXRjaCB0byBhbiBpbnB1dCBmaWVsZCBhbmQgaGlkZSB0aGUgcmVxdWlyZWQgZmllbGRcclxuICovXHJcbmZ1bmN0aW9uIG1ha2VTdGF0ZU9wdGlvbmFsKHN0YXRlRWxlbWVudCkge1xyXG4gICAgY29uc3QgYXR0cnMgPSBfLnRyYW5zZm9ybShzdGF0ZUVsZW1lbnQucHJvcCgnYXR0cmlidXRlcycpLCAocmVzdWx0LCBpdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gcmVzdWx0O1xyXG4gICAgICAgIHJldFtpdGVtLm5hbWVdID0gaXRlbS52YWx1ZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHJlcGxhY2VtZW50QXR0cmlidXRlcyA9IHtcclxuICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgaWQ6IGF0dHJzLmlkLFxyXG4gICAgICAgICdkYXRhLWxhYmVsJzogYXR0cnNbJ2RhdGEtbGFiZWwnXSxcclxuICAgICAgICBjbGFzczogJ2Zvcm0taW5wdXQnLFxyXG4gICAgICAgIG5hbWU6IGF0dHJzLm5hbWUsXHJcbiAgICAgICAgJ2RhdGEtZmllbGQtdHlwZSc6IGF0dHJzWydkYXRhLWZpZWxkLXR5cGUnXSxcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGVFbGVtZW50LnJlcGxhY2VXaXRoKCQoJzxpbnB1dCAvPicsIHJlcGxhY2VtZW50QXR0cmlidXRlcykpO1xyXG5cclxuICAgIGNvbnN0ICRuZXdFbGVtZW50ID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJyk7XHJcblxyXG4gICAgaWYgKCRuZXdFbGVtZW50Lmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgIGluc2VydFN0YXRlSGlkZGVuRmllbGQoJG5ld0VsZW1lbnQpO1xyXG4gICAgICAgICRuZXdFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gJG5ld0VsZW1lbnQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBZGRzIHRoZSBhcnJheSBvZiBvcHRpb25zIGZyb20gdGhlIHJlbW90ZSByZXF1ZXN0IHRvIHRoZSBuZXdseSBjcmVhdGVkIHNlbGVjdCBib3guXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZXNBcnJheVxyXG4gKiBAcGFyYW0ge2pRdWVyeX0gJHNlbGVjdEVsZW1lbnRcclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICovXHJcbmZ1bmN0aW9uIGFkZE9wdGlvbnMoc3RhdGVzQXJyYXksICRzZWxlY3RFbGVtZW50LCBvcHRpb25zKSB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBbXTtcclxuXHJcbiAgICBjb250YWluZXIucHVzaChgPG9wdGlvbiB2YWx1ZT1cIlwiPiR7c3RhdGVzQXJyYXkucHJlZml4fTwvb3B0aW9uPmApO1xyXG5cclxuICAgIGlmICghXy5pc0VtcHR5KCRzZWxlY3RFbGVtZW50KSkge1xyXG4gICAgICAgIF8uZWFjaChzdGF0ZXNBcnJheS5zdGF0ZXMsIChzdGF0ZU9iaikgPT4ge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy51c2VJZEZvclN0YXRlcykge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnB1c2goYDxvcHRpb24gdmFsdWU9XCIke3N0YXRlT2JqLmlkfVwiPiR7c3RhdGVPYmoubmFtZX08L29wdGlvbj5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5wdXNoKGA8b3B0aW9uIHZhbHVlPVwiJHtzdGF0ZU9iai5uYW1lfVwiPiR7c3RhdGVPYmoubmFtZX08L29wdGlvbj5gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkc2VsZWN0RWxlbWVudC5odG1sKGNvbnRhaW5lci5qb2luKCcgJykpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIHtqUXVlcnl9IHN0YXRlRWxlbWVudFxyXG4gKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlRWxlbWVudCwgY29udGV4dCA9IHt9LCBvcHRpb25zLCBjYWxsYmFjaykge1xyXG4gICAgLyoqXHJcbiAgICAgKiBCYWNrd2FyZHMgY29tcGF0aWJsZSBmb3IgdGhyZWUgcGFyYW1ldGVycyBpbnN0ZWFkIG9mIGZvdXJcclxuICAgICAqXHJcbiAgICAgKiBBdmFpbGFibGUgb3B0aW9uczpcclxuICAgICAqXHJcbiAgICAgKiB1c2VJZEZvclN0YXRlcyB7Qm9vbH0gLSBHZW5lcmF0ZXMgc3RhdGVzIGRyb3Bkb3duIHVzaW5nIGlkIGZvciB2YWx1ZXMgaW5zdGVhZCBvZiBzdHJpbmdzXHJcbiAgICAgKi9cclxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXHJcbiAgICAgICAgY2FsbGJhY2sgPSBvcHRpb25zO1xyXG4gICAgICAgIG9wdGlvbnMgPSB7fTtcclxuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXHJcbiAgICB9XHJcblxyXG4gICAgJCgnc2VsZWN0W2RhdGEtZmllbGQtdHlwZT1cIkNvdW50cnlcIl0nKS5vbignY2hhbmdlJywgZXZlbnQgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvdW50cnlOYW1lID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS52YWwoKTtcclxuXHJcbiAgICAgICAgaWYgKGNvdW50cnlOYW1lID09PSAnJykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1dGlscy5hcGkuY291bnRyeS5nZXRCeU5hbWUoY291bnRyeU5hbWUsIChlcnIsIHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKGNvbnRleHQuc3RhdGVfZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0ICRjdXJyZW50SW5wdXQgPSAkKCdbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl0nKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghXy5pc0VtcHR5KHJlc3BvbnNlLmRhdGEuc3RhdGVzKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVGhlIGVsZW1lbnQgbWF5IGhhdmUgYmVlbiByZXBsYWNlZCB3aXRoIGEgc2VsZWN0LCByZXNlbGVjdCBpdFxyXG4gICAgICAgICAgICAgICAgY29uc3QgJHNlbGVjdEVsZW1lbnQgPSBtYWtlU3RhdGVSZXF1aXJlZCgkY3VycmVudElucHV0LCBjb250ZXh0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBhZGRPcHRpb25zKHJlc3BvbnNlLmRhdGEsICRzZWxlY3RFbGVtZW50LCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsICRzZWxlY3RFbGVtZW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBtYWtlU3RhdGVPcHRpb25hbCgkY3VycmVudElucHV0LCBjb250ZXh0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCBuZXdFbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==