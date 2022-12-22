(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./assets/js/theme/catalog.js":
/*!************************************!*\
  !*** ./assets/js/theme/catalog.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CatalogPage; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_2__);
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var CatalogPage = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(CatalogPage, _PageManager);
  function CatalogPage(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    window.addEventListener('beforeunload', function () {
      if (document.activeElement.id === 'sort') {
        window.localStorage.setItem('sortByStatus', 'selected');
      }
    });
    return _this;
  }
  var _proto = CatalogPage.prototype;
  _proto.arrangeFocusOnSortBy = function arrangeFocusOnSortBy() {
    var $sortBySelector = $('[data-sort-by="product"] #sort');
    if (window.localStorage.getItem('sortByStatus')) {
      $sortBySelector.focus();
      window.localStorage.removeItem('sortByStatus');
    }
  };
  _proto.onSortBySubmit = function onSortBySubmit(event, currentTarget) {
    var url = url__WEBPACK_IMPORTED_MODULE_2___default.a.parse(window.location.href, true);
    var queryParams = $(currentTarget).serialize().split('=');
    url.query[queryParams[0]] = queryParams[1];
    delete url.query.page;
    event.preventDefault();
    window.location = url__WEBPACK_IMPORTED_MODULE_2___default.a.format({
      pathname: url.pathname,
      search: _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__["default"].buildQueryString(url.query)
    });
  };
  return CatalogPage;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/faceted-search.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/common/faceted-search.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/includes */ "./node_modules/lodash/includes.js");
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_includes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_union__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/union */ "./node_modules/lodash/union.js");
/* harmony import */ var lodash_union__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_union__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_without__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/without */ "./node_modules/lodash/without.js");
/* harmony import */ var lodash_without__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_without__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/extend */ "./node_modules/lodash/extend.js");
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _collapsible__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _utils_form_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _nod__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./nod */ "./assets/js/theme/common/nod.js");











//import { inViewCheck } from '../global/product-card-options'; // Color options on product card

var defaultOptions = {
  accordionToggleSelector: '#facetedSearch .accordion-navigation, #facetedSearch .facetedSearch-toggle',
  blockerSelector: '#facetedSearch .blocker',
  clearFacetSelector: '#facetedSearch .facetedSearch-clearLink',
  componentSelector: '#facetedSearch-navList',
  facetNavListSelector: '#facetedSearch .navList',
  priceRangeErrorSelector: '#facet-range-form .form-inlineMessage',
  priceRangeFieldsetSelector: '#facet-range-form .form-fieldset',
  priceRangeFormSelector: '#facet-range-form',
  priceRangeMaxPriceSelector: '#facet-range-form [name=max_price]',
  priceRangeMinPriceSelector: '#facet-range-form [name=min_price]',
  showMoreToggleSelector: '#facetedSearch .accordion-content .toggleLink',
  facetedSearchFilterItems: '#facetedSearch-filterItems .form-input',
  modal: Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["default"])('#modal')[0],
  modalOpen: false
};

/**
 * Faceted search view component
 */
var FacetedSearch = /*#__PURE__*/function () {
  /**
   * @param {object} requestOptions - Object with options for the ajax requests
   * @param {function} callback - Function to execute after fetching templates
   * @param {object} options - Configurable options
   * @example
   *
   * let requestOptions = {
   *      templates: {
   *          productListing: 'category/product-listing',
   *          sidebar: 'category/sidebar'
   *     }
   * };
   *
   * let templatesDidLoad = function(content) {
   *     $productListingContainer.html(content.productListing);
   *     $facetedSearchContainer.html(content.sidebar);
   * };
   *
   * let facetedSearch = new FacetedSearch(requestOptions, templatesDidLoad);
   */
  function FacetedSearch(requestOptions, callback, options) {
    var _this = this;
    // Private properties
    this.requestOptions = requestOptions;
    this.callback = callback;
    this.options = lodash_extend__WEBPACK_IMPORTED_MODULE_3___default()({}, defaultOptions, options);
    this.collapsedFacets = [];
    this.collapsedFacetItems = [];

    // Init collapsibles
    Object(_collapsible__WEBPACK_IMPORTED_MODULE_8__["default"])();

    // Init price validator
    this.initPriceValidator();

    // Show limited items by default
    $(this.options.facetNavListSelector).each(function (index, navList) {
      _this.collapseFacetItems($(navList));
    });

    // Mark initially collapsed accordions
    $(this.options.accordionToggleSelector).each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      var collapsible = $accordionToggle.data('collapsibleInstance');
      if (collapsible.isCollapsed) {
        _this.collapsedFacets.push(collapsible.targetId);
      }
    });

    // Collapse all facets if initially hidden
    // NOTE: Need to execute after Collapsible gets bootstrapped
    setTimeout(function () {
      if ($(_this.options.componentSelector).is(':hidden')) {
        _this.collapseAllFacets();
      }
    });

    // Observe user events
    this.onStateChange = this.onStateChange.bind(this);
    this.onToggleClick = this.onToggleClick.bind(this);
    this.onAccordionToggle = this.onAccordionToggle.bind(this);
    this.onClearFacet = this.onClearFacet.bind(this);
    this.onFacetClick = this.onFacetClick.bind(this);
    this.onRangeSubmit = this.onRangeSubmit.bind(this);
    this.onSortBySubmit = this.onSortBySubmit.bind(this);
    this.filterFacetItems = this.filterFacetItems.bind(this);
    this.bindEvents();
  }

  // Public methods
  var _proto = FacetedSearch.prototype;
  _proto.refreshView = function refreshView(content) {
    if (content) {
      this.callback(content);
    }

    // Init collapsibles
    Object(_collapsible__WEBPACK_IMPORTED_MODULE_8__["default"])();

    // Init price validator
    this.initPriceValidator();

    // Restore view state
    this.restoreCollapsedFacets();
    this.restoreCollapsedFacetItems();

    // Bind events
    this.bindEvents();
  };
  _proto.updateView = function updateView() {
    var _this2 = this;
    $(this.options.blockerSelector).show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["api"].getPage(_utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].getUrl(), this.requestOptions, function (err, content) {
      $(_this2.options.blockerSelector).hide();
      if (err) {
        throw new Error(err);
      }

      // Refresh view with new content
      _this2.refreshView(content);
    });
  };
  _proto.expandFacetItems = function expandFacetItems($navList) {
    var id = $navList.attr('id');

    // Remove
    this.collapsedFacetItems = lodash_without__WEBPACK_IMPORTED_MODULE_2___default()(this.collapsedFacetItems, id);
  };
  _proto.collapseFacetItems = function collapseFacetItems($navList) {
    var id = $navList.attr('id');
    var hasMoreResults = $navList.data('hasMoreResults');
    if (hasMoreResults) {
      this.collapsedFacetItems = lodash_union__WEBPACK_IMPORTED_MODULE_1___default()(this.collapsedFacetItems, [id]);
    } else {
      this.collapsedFacetItems = lodash_without__WEBPACK_IMPORTED_MODULE_2___default()(this.collapsedFacetItems, id);
    }
  };
  _proto.toggleFacetItems = function toggleFacetItems($navList) {
    var id = $navList.attr('id');

    // Toggle depending on `collapsed` flag
    if (lodash_includes__WEBPACK_IMPORTED_MODULE_0___default()(this.collapsedFacetItems, id)) {
      this.getMoreFacetResults($navList);
      return true;
    }
    this.collapseFacetItems($navList);
    return false;
  };
  _proto.getMoreFacetResults = function getMoreFacetResults($navList) {
    var _this3 = this;
    var facet = $navList.data('facet');
    var facetUrl = _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].getUrl();
    if (this.requestOptions.showMore) {
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["api"].getPage(facetUrl, {
        template: this.requestOptions.showMore,
        params: {
          list_all: facet
        }
      }, function (err, response) {
        if (err) {
          throw new Error(err);
        }
        _this3.options.modal.open();
        _this3.options.modalOpen = true;
        _this3.options.modal.updateContent(response);
      });
    }
    this.collapseFacetItems($navList);
    return false;
  };
  _proto.filterFacetItems = function filterFacetItems(event) {
    var $items = $('.navList-item');
    var query = $(event.currentTarget).val().toLowerCase();
    $items.each(function (index, element) {
      var text = $(element).text().toLowerCase();
      if (text.indexOf(query) !== -1) {
        $(element).show();
      } else {
        $(element).hide();
      }
    });
  };
  _proto.expandFacet = function expandFacet($accordionToggle) {
    var collapsible = $accordionToggle.data('collapsibleInstance');
    collapsible.open();
  };
  _proto.collapseFacet = function collapseFacet($accordionToggle) {
    var collapsible = $accordionToggle.data('collapsibleInstance');
    collapsible.close();
  };
  _proto.collapseAllFacets = function collapseAllFacets() {
    var _this4 = this;
    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      _this4.collapseFacet($accordionToggle);
    });
  };
  _proto.expandAllFacets = function expandAllFacets() {
    var _this5 = this;
    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      _this5.expandFacet($accordionToggle);
    });
  }

  // Private methods
  ;
  _proto.initPriceValidator = function initPriceValidator() {
    if ($(this.options.priceRangeFormSelector).length === 0) {
      return;
    }
    var validator = Object(_nod__WEBPACK_IMPORTED_MODULE_10__["default"])();
    var selectors = {
      errorSelector: this.options.priceRangeErrorSelector,
      fieldsetSelector: this.options.priceRangeFieldsetSelector,
      formSelector: this.options.priceRangeFormSelector,
      maxPriceSelector: this.options.priceRangeMaxPriceSelector,
      minPriceSelector: this.options.priceRangeMinPriceSelector
    };
    _utils_form_utils__WEBPACK_IMPORTED_MODULE_9__["Validators"].setMinMaxPriceValidation(validator, selectors, this.options.validationErrorMessages);
    this.priceRangeValidator = validator;
  };
  _proto.restoreCollapsedFacetItems = function restoreCollapsedFacetItems() {
    var _this6 = this;
    var $navLists = $(this.options.facetNavListSelector);

    // Restore collapsed state for each facet
    $navLists.each(function (index, navList) {
      var $navList = $(navList);
      var id = $navList.attr('id');
      var shouldCollapse = lodash_includes__WEBPACK_IMPORTED_MODULE_0___default()(_this6.collapsedFacetItems, id);
      if (shouldCollapse) {
        _this6.collapseFacetItems($navList);
      } else {
        _this6.expandFacetItems($navList);
      }
    });
  };
  _proto.restoreCollapsedFacets = function restoreCollapsedFacets() {
    var _this7 = this;
    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      var collapsible = $accordionToggle.data('collapsibleInstance');
      var id = collapsible.targetId;
      var shouldCollapse = lodash_includes__WEBPACK_IMPORTED_MODULE_0___default()(_this7.collapsedFacets, id);
      if (shouldCollapse) {
        _this7.collapseFacet($accordionToggle);
      } else {
        _this7.expandFacet($accordionToggle);
      }
    });
  };
  _proto.bindEvents = function bindEvents() {
    // Clean-up
    this.unbindEvents();

    // DOM events
    $(window).on('statechange', this.onStateChange);
    $(window).on('popstate', this.onPopState);
    $(document).on('click', this.options.showMoreToggleSelector, this.onToggleClick);
    $(document).on('toggle.collapsible', this.options.accordionToggleSelector, this.onAccordionToggle);
    $(document).on('keyup', this.options.facetedSearchFilterItems, this.filterFacetItems);
    $(this.options.clearFacetSelector).on('click', this.onClearFacet);

    // Hooks
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].on('facetedSearch-facet-clicked', this.onFacetClick);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].on('facetedSearch-range-submitted', this.onRangeSubmit);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].on('sortBy-submitted', this.onSortBySubmit);
  };
  _proto.unbindEvents = function unbindEvents() {
    // DOM events
    $(window).off('statechange', this.onStateChange);
    $(window).off('popstate', this.onPopState);
    $(document).off('click', this.options.showMoreToggleSelector, this.onToggleClick);
    $(document).off('toggle.collapsible', this.options.accordionToggleSelector, this.onAccordionToggle);
    $(document).off('keyup', this.options.facetedSearchFilterItems, this.filterFacetItems);
    $(this.options.clearFacetSelector).off('click', this.onClearFacet);

    // Hooks
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].off('facetedSearch-facet-clicked', this.onFacetClick);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].off('facetedSearch-range-submitted', this.onRangeSubmit);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].off('sortBy-submitted', this.onSortBySubmit);
  };
  _proto.onClearFacet = function onClearFacet(event) {
    var $link = $(event.currentTarget);
    var url = $link.attr('href');
    event.preventDefault();
    event.stopPropagation();

    // Update URL
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].goToUrl(url);
  };
  _proto.onToggleClick = function onToggleClick(event) {
    var $toggle = $(event.currentTarget);
    var $navList = $($toggle.attr('href'));

    // Prevent default
    event.preventDefault();

    // Toggle visible items
    this.toggleFacetItems($navList);
  };
  _proto.onFacetClick = function onFacetClick(event, currentTarget) {
    //  inViewCheck(this.context); // swatches on product card

    setTimeout(function () {
      document.querySelectorAll('.Prod-AddToCart .Prod-AddToCart-add a').forEach(function (item) {
        item.addEventListener('click', function (event) {
          var Data = this;
          this.classList.add("sendloadingaddtocart");
          event.preventDefault();
          var count = document.getElementsByClassName("cart-quantity")[0].textContent;
          var pro_id = this.getAttribute("data-product-id");
          var discount_pr = '';
          if (this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelectorAll(".card-figure .card-figure__link .tag-section .groupBox .saleSavingTag").length > 0) {
            var discount = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelectorAll(".card-figure .card-figure__link .tag-section .groupBox .saleSavingTag")[0].textContent;
            discount_pr = discount.trim();
          }
          axios({
            url: '/remote/v1/cart/add',
            method: 'post',
            dataType: 'json',
            data: {
              action: 'add',
              "product_id": pro_id,
              "qty[]": 1
            }
          }).then(function (result) {
            if (result.data.data.cart_item) {
              document.querySelectorAll(".cart-quantity")[0].textContent = parseInt(count) + 1;
              if (count == 0) {
                document.querySelectorAll(".cart-icon")[0].click();
              }
            }
            setTimeout(function () {
              fetch('/api/storefront/carts?include=', {
                'credentials': 'include',
                'headers': {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              }).then(function (response) {
                response.json().then(function (data) {
                  if (data.length != 0) {
                    var getid = data[0]['lineItems']['physicalItems'];
                    getid.forEach(function (value, key) {
                      var pid = value.productId;
                      var qty = value.quantity;
                      if (pid != undefined && pid == pro_id) {
                        Data.querySelectorAll('.Prod-AddToCart .Prod-AddToCart-add .form .button .heart-icon a #pro-count')[0].textContent = qty;
                        Data.parentElement.parentElement.parentElement.parentElement.classList.add("fill-Prod-add-to-cart");
                        Data.parentElement.querySelectorAll('.Prod-AddToCart .Prod-AddToCart-add .form .button .heart-icon a #pro-count')[0].classList.add("fill-count");
                        Data.classList.remove("sendloadingaddtocart");
                        addToCart(pro_id, discount_pr);
                      }
                    });
                  }
                });
              });
            }, 500);
          });
        });
      });
      document.querySelectorAll('.Prod-AddToCart .buy-now.event_buy_now_add_to_cart').forEach(function (item) {
        item.addEventListener('click', function (event) {
          //   this.classList.add("buynowloading");
          this.classList.add("sendloadingbuynow");
          var pro_id = this.getAttribute("data-product-id");
          var discount_pr = '';
          if (this.parentElement.parentElement.parentElement.querySelectorAll(".card-figure .card-figure__link .tag-section .groupBox .saleSavingTag").length > 0) {
            var discount = this.parentElement.parentElement.parentElement.querySelectorAll(".card-figure .card-figure__link .tag-section .groupBox .saleSavingTag")[0].textContent;
            discount_pr = discount.trim();
          }
          axios({
            url: '/remote/v1/cart/add',
            method: 'post',
            dataType: 'json',
            data: {
              action: 'add',
              "product_id": pro_id,
              "qty[]": 1
            }
          }).then(function (result) {
            if (result.data.data.cart_item) {
              buyNow(pro_id, discount_pr);
            }
          });
        });
      });
      //end addtocart trending product
    }, 6000);
    var $link = $(currentTarget);
    var url = $link.attr('href');
    event.preventDefault();
    $link.toggleClass('is-selected');

    // Update URL
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].goToUrl(url);
    if (this.options.modalOpen) {
      this.options.modal.close();
    }
  };
  _proto.onSortBySubmit = function onSortBySubmit(event, currentTarget) {
    var url = url__WEBPACK_IMPORTED_MODULE_5___default.a.parse(window.location.href, true);
    var queryParams = $(currentTarget).serialize().split('=');
    url.query[queryParams[0]] = queryParams[1];
    delete url.query.page;

    // Url object `query` is not a traditional JavaScript Object on all systems, clone it instead
    var urlQueryParams = {};
    Object.assign(urlQueryParams, url.query);
    event.preventDefault();
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].goToUrl(url__WEBPACK_IMPORTED_MODULE_5___default.a.format({
      pathname: url.pathname,
      search: _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].buildQueryString(urlQueryParams)
    }));
  };
  _proto.onRangeSubmit = function onRangeSubmit(event, currentTarget) {
    event.preventDefault();
    if (!this.priceRangeValidator.areAll(_nod__WEBPACK_IMPORTED_MODULE_10__["default"].constants.VALID)) {
      return;
    }
    var url = url__WEBPACK_IMPORTED_MODULE_5___default.a.parse(window.location.href, true);
    var queryParams = decodeURI($(currentTarget).serialize()).split('&');
    queryParams = _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].parseQueryParams(queryParams);
    for (var key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        url.query[key] = queryParams[key];
      }
    }

    // Url object `query` is not a traditional JavaScript Object on all systems, clone it instead
    var urlQueryParams = {};
    Object.assign(urlQueryParams, url.query);
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].goToUrl(url__WEBPACK_IMPORTED_MODULE_5___default.a.format({
      pathname: url.pathname,
      search: _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].buildQueryString(urlQueryParams)
    }));
  };
  _proto.onStateChange = function onStateChange() {
    this.updateView();
  };
  _proto.onAccordionToggle = function onAccordionToggle(event) {
    var $accordionToggle = $(event.currentTarget);
    var collapsible = $accordionToggle.data('collapsibleInstance');
    var id = collapsible.targetId;
    if (collapsible.isCollapsed) {
      this.collapsedFacets = lodash_union__WEBPACK_IMPORTED_MODULE_1___default()(this.collapsedFacets, [id]);
    } else {
      this.collapsedFacets = lodash_without__WEBPACK_IMPORTED_MODULE_2___default()(this.collapsedFacets, id);
    }
  };
  _proto.onPopState = function onPopState() {
    var currentUrl = window.location.href;
    var searchParams = new URLSearchParams(currentUrl);
    // If searchParams does not contain a page value then modify url query string to have page=1
    if (!searchParams.has('page')) {
      var linkUrl = $('.pagination-link').attr('href');
      var re = /page=[0-9]+/i;
      var updatedLinkUrl = linkUrl.replace(re, 'page=1');
      window.history.replaceState({}, document.title, updatedLinkUrl);
    }
    $(window).trigger('statechange');
  };
  return FacetedSearch;
}();
/* harmony default export */ __webpack_exports__["default"] = (FacetedSearch);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/global/compare-products.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/global/compare-products.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./assets/js/theme/global/modal.js");

function decrementCounter(counter, item) {
  var index = counter.indexOf(item);
  if (index > -1) {
    counter.splice(index, 1);
  }
}
function incrementCounter(counter, item) {
  counter.push(item);
}
function updateCounterNav(counter, $link, urls) {
  if (counter.length !== 0) {
    if (!$link.is('visible')) {
      $link.addClass('show');
    }
    $link.attr('href', urls.compare + "/" + counter.join('/'));
    $link.find('span.countPill').html(counter.length);
  } else {
    $link.removeClass('show');
  }
}
/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var noCompareMessage = _ref.noCompareMessage,
    urls = _ref.urls;
  var compareCounter = [];
  var $compareLink = $('a[data-compare-nav]');
  $('body').on('compareReset', function () {
    var $checked = $('body').find('input[name="products\[\]"]:checked');
    compareCounter = $checked.length ? $checked.map(function (index, element) {
      return element.value;
    }).get() : [];
    updateCounterNav(compareCounter, $compareLink, urls);
  });
  $('body').triggerHandler('compareReset');
  $('body').on('click', '[data-compare-id]', function (event) {
    var product = event.currentTarget.value;
    var $clickedCompareLink = $('a[data-compare-nav]');
    if (event.currentTarget.checked) {
      incrementCounter(compareCounter, product);
    } else {
      decrementCounter(compareCounter, product);
    }
    updateCounterNav(compareCounter, $clickedCompareLink, urls);
  });
  $('body').on('submit', '[data-product-compare]', function (event) {
    var $this = $(event.currentTarget);
    var productsToCompare = $this.find('input[name="products\[\]"]:checked');
    if (productsToCompare.length <= 1) {
      Object(_modal__WEBPACK_IMPORTED_MODULE_0__["showAlertModal"])(noCompareMessage);
      event.preventDefault();
    }
  });
  $('body').on('click', 'a[data-compare-nav]', function () {
    var $clickedCheckedInput = $('body').find('input[name="products\[\]"]:checked');
    if ($clickedCheckedInput.length <= 1) {
      Object(_modal__WEBPACK_IMPORTED_MODULE_0__["showAlertModal"])(noCompareMessage);
      return false;
    }
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0YWxvZy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2ZhY2V0ZWQtc2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9nbG9iYWwvY29tcGFyZS1wcm9kdWN0cy5qcyJdLCJuYW1lcyI6WyJDYXRhbG9nUGFnZSIsImNvbnRleHQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZG9jdW1lbnQiLCJhY3RpdmVFbGVtZW50IiwiaWQiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiYXJyYW5nZUZvY3VzT25Tb3J0QnkiLCIkc29ydEJ5U2VsZWN0b3IiLCIkIiwiZ2V0SXRlbSIsImZvY3VzIiwicmVtb3ZlSXRlbSIsIm9uU29ydEJ5U3VibWl0IiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwidXJsIiwiVXJsIiwicGFyc2UiLCJsb2NhdGlvbiIsImhyZWYiLCJxdWVyeVBhcmFtcyIsInNlcmlhbGl6ZSIsInNwbGl0IiwicXVlcnkiLCJwYWdlIiwicHJldmVudERlZmF1bHQiLCJmb3JtYXQiLCJwYXRobmFtZSIsInNlYXJjaCIsInVybFV0aWxzIiwiYnVpbGRRdWVyeVN0cmluZyIsIlBhZ2VNYW5hZ2VyIiwiZGVmYXVsdE9wdGlvbnMiLCJhY2NvcmRpb25Ub2dnbGVTZWxlY3RvciIsImJsb2NrZXJTZWxlY3RvciIsImNsZWFyRmFjZXRTZWxlY3RvciIsImNvbXBvbmVudFNlbGVjdG9yIiwiZmFjZXROYXZMaXN0U2VsZWN0b3IiLCJwcmljZVJhbmdlRXJyb3JTZWxlY3RvciIsInByaWNlUmFuZ2VGaWVsZHNldFNlbGVjdG9yIiwicHJpY2VSYW5nZUZvcm1TZWxlY3RvciIsInByaWNlUmFuZ2VNYXhQcmljZVNlbGVjdG9yIiwicHJpY2VSYW5nZU1pblByaWNlU2VsZWN0b3IiLCJzaG93TW9yZVRvZ2dsZVNlbGVjdG9yIiwiZmFjZXRlZFNlYXJjaEZpbHRlckl0ZW1zIiwibW9kYWwiLCJtb2RhbEZhY3RvcnkiLCJtb2RhbE9wZW4iLCJGYWNldGVkU2VhcmNoIiwicmVxdWVzdE9wdGlvbnMiLCJjYWxsYmFjayIsIm9wdGlvbnMiLCJjb2xsYXBzZWRGYWNldHMiLCJjb2xsYXBzZWRGYWNldEl0ZW1zIiwiY29sbGFwc2libGVGYWN0b3J5IiwiaW5pdFByaWNlVmFsaWRhdG9yIiwiZWFjaCIsImluZGV4IiwibmF2TGlzdCIsImNvbGxhcHNlRmFjZXRJdGVtcyIsImFjY29yZGlvblRvZ2dsZSIsIiRhY2NvcmRpb25Ub2dnbGUiLCJjb2xsYXBzaWJsZSIsImRhdGEiLCJpc0NvbGxhcHNlZCIsInB1c2giLCJ0YXJnZXRJZCIsInNldFRpbWVvdXQiLCJpcyIsImNvbGxhcHNlQWxsRmFjZXRzIiwib25TdGF0ZUNoYW5nZSIsImJpbmQiLCJvblRvZ2dsZUNsaWNrIiwib25BY2NvcmRpb25Ub2dnbGUiLCJvbkNsZWFyRmFjZXQiLCJvbkZhY2V0Q2xpY2siLCJvblJhbmdlU3VibWl0IiwiZmlsdGVyRmFjZXRJdGVtcyIsImJpbmRFdmVudHMiLCJyZWZyZXNoVmlldyIsImNvbnRlbnQiLCJyZXN0b3JlQ29sbGFwc2VkRmFjZXRzIiwicmVzdG9yZUNvbGxhcHNlZEZhY2V0SXRlbXMiLCJ1cGRhdGVWaWV3Iiwic2hvdyIsImFwaSIsImdldFBhZ2UiLCJnZXRVcmwiLCJlcnIiLCJoaWRlIiwiRXJyb3IiLCJleHBhbmRGYWNldEl0ZW1zIiwiJG5hdkxpc3QiLCJhdHRyIiwiaGFzTW9yZVJlc3VsdHMiLCJ0b2dnbGVGYWNldEl0ZW1zIiwiZ2V0TW9yZUZhY2V0UmVzdWx0cyIsImZhY2V0IiwiZmFjZXRVcmwiLCJzaG93TW9yZSIsInRlbXBsYXRlIiwicGFyYW1zIiwibGlzdF9hbGwiLCJyZXNwb25zZSIsIm9wZW4iLCJ1cGRhdGVDb250ZW50IiwiJGl0ZW1zIiwidmFsIiwidG9Mb3dlckNhc2UiLCJlbGVtZW50IiwidGV4dCIsImluZGV4T2YiLCJleHBhbmRGYWNldCIsImNvbGxhcHNlRmFjZXQiLCJjbG9zZSIsIiRhY2NvcmRpb25Ub2dnbGVzIiwiZXhwYW5kQWxsRmFjZXRzIiwibGVuZ3RoIiwidmFsaWRhdG9yIiwibm9kIiwic2VsZWN0b3JzIiwiZXJyb3JTZWxlY3RvciIsImZpZWxkc2V0U2VsZWN0b3IiLCJmb3JtU2VsZWN0b3IiLCJtYXhQcmljZVNlbGVjdG9yIiwibWluUHJpY2VTZWxlY3RvciIsIlZhbGlkYXRvcnMiLCJzZXRNaW5NYXhQcmljZVZhbGlkYXRpb24iLCJ2YWxpZGF0aW9uRXJyb3JNZXNzYWdlcyIsInByaWNlUmFuZ2VWYWxpZGF0b3IiLCIkbmF2TGlzdHMiLCJzaG91bGRDb2xsYXBzZSIsInVuYmluZEV2ZW50cyIsIm9uIiwib25Qb3BTdGF0ZSIsImhvb2tzIiwib2ZmIiwiJGxpbmsiLCJzdG9wUHJvcGFnYXRpb24iLCJnb1RvVXJsIiwiJHRvZ2dsZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiaXRlbSIsIkRhdGEiLCJjbGFzc0xpc3QiLCJhZGQiLCJjb3VudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJ0ZXh0Q29udGVudCIsInByb19pZCIsImdldEF0dHJpYnV0ZSIsImRpc2NvdW50X3ByIiwicGFyZW50RWxlbWVudCIsImRpc2NvdW50IiwidHJpbSIsImF4aW9zIiwibWV0aG9kIiwiZGF0YVR5cGUiLCJhY3Rpb24iLCJ0aGVuIiwicmVzdWx0IiwiY2FydF9pdGVtIiwicGFyc2VJbnQiLCJjbGljayIsImZldGNoIiwianNvbiIsImdldGlkIiwidmFsdWUiLCJrZXkiLCJwaWQiLCJwcm9kdWN0SWQiLCJxdHkiLCJxdWFudGl0eSIsInVuZGVmaW5lZCIsInJlbW92ZSIsImFkZFRvQ2FydCIsImJ1eU5vdyIsInRvZ2dsZUNsYXNzIiwidXJsUXVlcnlQYXJhbXMiLCJPYmplY3QiLCJhc3NpZ24iLCJhcmVBbGwiLCJjb25zdGFudHMiLCJWQUxJRCIsImRlY29kZVVSSSIsInBhcnNlUXVlcnlQYXJhbXMiLCJoYXNPd25Qcm9wZXJ0eSIsImN1cnJlbnRVcmwiLCJzZWFyY2hQYXJhbXMiLCJVUkxTZWFyY2hQYXJhbXMiLCJoYXMiLCJsaW5rVXJsIiwicmUiLCJ1cGRhdGVkTGlua1VybCIsInJlcGxhY2UiLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwidGl0bGUiLCJ0cmlnZ2VyIiwiZGVjcmVtZW50Q291bnRlciIsImNvdW50ZXIiLCJzcGxpY2UiLCJpbmNyZW1lbnRDb3VudGVyIiwidXBkYXRlQ291bnRlck5hdiIsInVybHMiLCJhZGRDbGFzcyIsImNvbXBhcmUiLCJqb2luIiwiZmluZCIsImh0bWwiLCJyZW1vdmVDbGFzcyIsIm5vQ29tcGFyZU1lc3NhZ2UiLCJjb21wYXJlQ291bnRlciIsIiRjb21wYXJlTGluayIsIiRjaGVja2VkIiwibWFwIiwiZ2V0IiwidHJpZ2dlckhhbmRsZXIiLCJwcm9kdWN0IiwiJGNsaWNrZWRDb21wYXJlTGluayIsImNoZWNrZWQiLCIkdGhpcyIsInByb2R1Y3RzVG9Db21wYXJlIiwic2hvd0FsZXJ0TW9kYWwiLCIkY2xpY2tlZENoZWNrZWRJbnB1dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXlDO0FBQ087QUFDMUI7QUFBQSxJQUVEQSxXQUFXO0VBQUE7RUFDNUIscUJBQVlDLE9BQU8sRUFBRTtJQUFBO0lBQ2pCLGdDQUFNQSxPQUFPLENBQUM7SUFFZEMsTUFBTSxDQUFDQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsWUFBTTtNQUMxQyxJQUFJQyxRQUFRLENBQUNDLGFBQWEsQ0FBQ0MsRUFBRSxLQUFLLE1BQU0sRUFBRTtRQUN0Q0osTUFBTSxDQUFDSyxZQUFZLENBQUNDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDO01BQzNEO0lBQ0osQ0FBQyxDQUFDO0lBQUM7RUFDUDtFQUFDO0VBQUEsT0FFREMsb0JBQW9CLEdBQXBCLGdDQUF1QjtJQUNuQixJQUFNQyxlQUFlLEdBQUdDLENBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQztJQUUzRCxJQUFJVCxNQUFNLENBQUNLLFlBQVksQ0FBQ0ssT0FB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ZXNDb250ZW50IjpbImltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XHJcbmltcG9ydCB1cmxVdGlscyBmcm9tICcuL2NvbW1vbi91dGlscy91cmwtdXRpbHMnO1xyXG5pbXBvcnQgVXJsIGZyb20gJ3VybCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRhbG9nUGFnZSBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcclxuICAgICAgICBzdXBlcihjb250ZXh0KTtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuaWQgPT09ICdzb3J0Jykge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzb3J0QnlTdGF0dXMnLCAnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFycmFuZ2VGb2N1c09uU29ydEJ5KCkge1xyXG4gICAgICAgIGNvbnN0ICRzb3J0QnlTZWxlY3RvciA9ICQoJ1tkYXRhLXNvcnQtYnk9XCJwcm9kdWN0XCJdICNzb3J0Jyk7XHJcblxyXG4gICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NvcnRCeVN0YXR1cycpKSB7XHJcbiAgICAgICAgICAgICRzb3J0QnlTZWxlY3Rvci5mb2N1cygpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3NvcnRCeVN0YXR1cycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblNvcnRCeVN1Ym1pdChldmVudCwgY3VycmVudFRhcmdldCkge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgdHJ1ZSk7XHJcbiAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSAkKGN1cnJlbnRUYXJnZXQpLnNlcmlhbGl6ZSgpLnNwbGl0KCc9Jyk7XHJcblxyXG4gICAgICAgIHVybC5xdWVyeVtxdWVyeVBhcmFtc1swXV0gPSBxdWVyeVBhcmFtc1sxXTtcclxuICAgICAgICBkZWxldGUgdXJsLnF1ZXJ5LnBhZ2U7XHJcblxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gVXJsLmZvcm1hdCh7IHBhdGhuYW1lOiB1cmwucGF0aG5hbWUsIHNlYXJjaDogdXJsVXRpbHMuYnVpbGRRdWVyeVN0cmluZyh1cmwucXVlcnkpIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IGhvb2tzLCBhcGkgfSBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCBVcmwgZnJvbSAndXJsJztcclxuaW1wb3J0IHVybFV0aWxzIGZyb20gJy4vdXRpbHMvdXJsLXV0aWxzJztcclxuaW1wb3J0IG1vZGFsRmFjdG9yeSBmcm9tICcuLi9nbG9iYWwvbW9kYWwnO1xyXG5pbXBvcnQgY29sbGFwc2libGVGYWN0b3J5IGZyb20gJy4vY29sbGFwc2libGUnO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3JzIH0gZnJvbSAnLi91dGlscy9mb3JtLXV0aWxzJztcclxuaW1wb3J0IG5vZCBmcm9tICcuL25vZCc7XHJcbi8vaW1wb3J0IHsgaW5WaWV3Q2hlY2sgfSBmcm9tICcuLi9nbG9iYWwvcHJvZHVjdC1jYXJkLW9wdGlvbnMnOyAvLyBDb2xvciBvcHRpb25zIG9uIHByb2R1Y3QgY2FyZFxyXG5cclxuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XHJcbiAgICBhY2NvcmRpb25Ub2dnbGVTZWxlY3RvcjogJyNmYWNldGVkU2VhcmNoIC5hY2NvcmRpb24tbmF2aWdhdGlvbiwgI2ZhY2V0ZWRTZWFyY2ggLmZhY2V0ZWRTZWFyY2gtdG9nZ2xlJyxcclxuICAgIGJsb2NrZXJTZWxlY3RvcjogJyNmYWNldGVkU2VhcmNoIC5ibG9ja2VyJyxcclxuICAgIGNsZWFyRmFjZXRTZWxlY3RvcjogJyNmYWNldGVkU2VhcmNoIC5mYWNldGVkU2VhcmNoLWNsZWFyTGluaycsXHJcbiAgICBjb21wb25lbnRTZWxlY3RvcjogJyNmYWNldGVkU2VhcmNoLW5hdkxpc3QnLFxyXG4gICAgZmFjZXROYXZMaXN0U2VsZWN0b3I6ICcjZmFjZXRlZFNlYXJjaCAubmF2TGlzdCcsXHJcbiAgICBwcmljZVJhbmdlRXJyb3JTZWxlY3RvcjogJyNmYWNldC1yYW5nZS1mb3JtIC5mb3JtLWlubGluZU1lc3NhZ2UnLFxyXG4gICAgcHJpY2VSYW5nZUZpZWxkc2V0U2VsZWN0b3I6ICcjZmFjZXQtcmFuZ2UtZm9ybSAuZm9ybS1maWVsZHNldCcsXHJcbiAgICBwcmljZVJhbmdlRm9ybVNlbGVjdG9yOiAnI2ZhY2V0LXJhbmdlLWZvcm0nLFxyXG4gICAgcHJpY2VSYW5nZU1heFByaWNlU2VsZWN0b3I6ICcjZmFjZXQtcmFuZ2UtZm9ybSBbbmFtZT1tYXhfcHJpY2VdJyxcclxuICAgIHByaWNlUmFuZ2VNaW5QcmljZVNlbGVjdG9yOiAnI2ZhY2V0LXJhbmdlLWZvcm0gW25hbWU9bWluX3ByaWNlXScsXHJcbiAgICBzaG93TW9yZVRvZ2dsZVNlbGVjdG9yOiAnI2ZhY2V0ZWRTZWFyY2ggLmFjY29yZGlvbi1jb250ZW50IC50b2dnbGVMaW5rJyxcclxuICAgIGZhY2V0ZWRTZWFyY2hGaWx0ZXJJdGVtczogJyNmYWNldGVkU2VhcmNoLWZpbHRlckl0ZW1zIC5mb3JtLWlucHV0JyxcclxuICAgIG1vZGFsOiBtb2RhbEZhY3RvcnkoJyNtb2RhbCcpWzBdLFxyXG4gICAgbW9kYWxPcGVuOiBmYWxzZSxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBGYWNldGVkIHNlYXJjaCB2aWV3IGNvbXBvbmVudFxyXG4gKi9cclxuY2xhc3MgRmFjZXRlZFNlYXJjaCB7XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXF1ZXN0T3B0aW9ucyAtIE9iamVjdCB3aXRoIG9wdGlvbnMgZm9yIHRoZSBhamF4IHJlcXVlc3RzXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIEZ1bmN0aW9uIHRvIGV4ZWN1dGUgYWZ0ZXIgZmV0Y2hpbmcgdGVtcGxhdGVzXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIENvbmZpZ3VyYWJsZSBvcHRpb25zXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICpcclxuICAgICAqIGxldCByZXF1ZXN0T3B0aW9ucyA9IHtcclxuICAgICAqICAgICAgdGVtcGxhdGVzOiB7XHJcbiAgICAgKiAgICAgICAgICBwcm9kdWN0TGlzdGluZzogJ2NhdGVnb3J5L3Byb2R1Y3QtbGlzdGluZycsXHJcbiAgICAgKiAgICAgICAgICBzaWRlYmFyOiAnY2F0ZWdvcnkvc2lkZWJhcidcclxuICAgICAqICAgICB9XHJcbiAgICAgKiB9O1xyXG4gICAgICpcclxuICAgICAqIGxldCB0ZW1wbGF0ZXNEaWRMb2FkID0gZnVuY3Rpb24oY29udGVudCkge1xyXG4gICAgICogICAgICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQucHJvZHVjdExpc3RpbmcpO1xyXG4gICAgICogICAgICRmYWNldGVkU2VhcmNoQ29udGFpbmVyLmh0bWwoY29udGVudC5zaWRlYmFyKTtcclxuICAgICAqIH07XHJcbiAgICAgKlxyXG4gICAgICogbGV0IGZhY2V0ZWRTZWFyY2ggPSBuZXcgRmFjZXRlZFNlYXJjaChyZXF1ZXN0T3B0aW9ucywgdGVtcGxhdGVzRGlkTG9hZCk7XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHJlcXVlc3RPcHRpb25zLCBjYWxsYmFjaywgb3B0aW9ucykge1xyXG4gICAgICAgIC8vIFByaXZhdGUgcHJvcGVydGllc1xyXG4gICAgICAgIHRoaXMucmVxdWVzdE9wdGlvbnMgPSByZXF1ZXN0T3B0aW9ucztcclxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gXy5leHRlbmQoe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuICAgICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcyA9IFtdO1xyXG5cclxuICAgICAgICAvLyBJbml0IGNvbGxhcHNpYmxlc1xyXG4gICAgICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xyXG5cclxuICAgICAgICAvLyBJbml0IHByaWNlIHZhbGlkYXRvclxyXG4gICAgICAgIHRoaXMuaW5pdFByaWNlVmFsaWRhdG9yKCk7XHJcblxyXG4gICAgICAgIC8vIFNob3cgbGltaXRlZCBpdGVtcyBieSBkZWZhdWx0XHJcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMuZmFjZXROYXZMaXN0U2VsZWN0b3IpLmVhY2goKGluZGV4LCBuYXZMaXN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2VGYWNldEl0ZW1zKCQobmF2TGlzdCkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBNYXJrIGluaXRpYWxseSBjb2xsYXBzZWQgYWNjb3JkaW9uc1xyXG4gICAgICAgICQodGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yKS5lYWNoKChpbmRleCwgYWNjb3JkaW9uVG9nZ2xlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0ICRhY2NvcmRpb25Ub2dnbGUgPSAkKGFjY29yZGlvblRvZ2dsZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbGxhcHNpYmxlID0gJGFjY29yZGlvblRvZ2dsZS5kYXRhKCdjb2xsYXBzaWJsZUluc3RhbmNlJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29sbGFwc2libGUuaXNDb2xsYXBzZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRzLnB1c2goY29sbGFwc2libGUudGFyZ2V0SWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIENvbGxhcHNlIGFsbCBmYWNldHMgaWYgaW5pdGlhbGx5IGhpZGRlblxyXG4gICAgICAgIC8vIE5PVEU6IE5lZWQgdG8gZXhlY3V0ZSBhZnRlciBDb2xsYXBzaWJsZSBnZXRzIGJvb3RzdHJhcHBlZFxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuY29tcG9uZW50U2VsZWN0b3IpLmlzKCc6aGlkZGVuJykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sbGFwc2VBbGxGYWNldHMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBPYnNlcnZlIHVzZXIgZXZlbnRzXHJcbiAgICAgICAgdGhpcy5vblN0YXRlQ2hhbmdlID0gdGhpcy5vblN0YXRlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5vblRvZ2dsZUNsaWNrID0gdGhpcy5vblRvZ2dsZUNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5vbkFjY29yZGlvblRvZ2dsZSA9IHRoaXMub25BY2NvcmRpb25Ub2dnbGUuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLm9uQ2xlYXJGYWNldCA9IHRoaXMub25DbGVhckZhY2V0LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5vbkZhY2V0Q2xpY2sgPSB0aGlzLm9uRmFjZXRDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25SYW5nZVN1Ym1pdCA9IHRoaXMub25SYW5nZVN1Ym1pdC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25Tb3J0QnlTdWJtaXQgPSB0aGlzLm9uU29ydEJ5U3VibWl0LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJGYWNldEl0ZW1zID0gdGhpcy5maWx0ZXJGYWNldEl0ZW1zLmJpbmQodGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFB1YmxpYyBtZXRob2RzXHJcbiAgICByZWZyZXNoVmlldyhjb250ZW50KSB7XHJcbiAgICAgICAgaWYgKGNvbnRlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhjb250ZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEluaXQgY29sbGFwc2libGVzXHJcbiAgICAgICAgY29sbGFwc2libGVGYWN0b3J5KCk7XHJcblxyXG4gICAgICAgIC8vIEluaXQgcHJpY2UgdmFsaWRhdG9yXHJcbiAgICAgICAgdGhpcy5pbml0UHJpY2VWYWxpZGF0b3IoKTtcclxuXHJcbiAgICAgICAgLy8gUmVzdG9yZSB2aWV3IHN0YXRlXHJcbiAgICAgICAgdGhpcy5yZXN0b3JlQ29sbGFwc2VkRmFjZXRzKCk7XHJcbiAgICAgICAgdGhpcy5yZXN0b3JlQ29sbGFwc2VkRmFjZXRJdGVtcygpO1xyXG5cclxuICAgICAgICAvLyBCaW5kIGV2ZW50c1xyXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVZpZXcoKSB7XHJcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMuYmxvY2tlclNlbGVjdG9yKS5zaG93KCk7XHJcblxyXG4gICAgICAgIGFwaS5nZXRQYWdlKHVybFV0aWxzLmdldFVybCgpLCB0aGlzLnJlcXVlc3RPcHRpb25zLCAoZXJyLCBjb250ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICQodGhpcy5vcHRpb25zLmJsb2NrZXJTZWxlY3RvcikuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJlZnJlc2ggdmlldyB3aXRoIG5ldyBjb250ZW50XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFZpZXcoY29udGVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwYW5kRmFjZXRJdGVtcygkbmF2TGlzdCkge1xyXG4gICAgICAgIGNvbnN0IGlkID0gJG5hdkxpc3QuYXR0cignaWQnKTtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlXHJcbiAgICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zID0gXy53aXRob3V0KHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcywgaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbGxhcHNlRmFjZXRJdGVtcygkbmF2TGlzdCkge1xyXG4gICAgICAgIGNvbnN0IGlkID0gJG5hdkxpc3QuYXR0cignaWQnKTtcclxuICAgICAgICBjb25zdCBoYXNNb3JlUmVzdWx0cyA9ICRuYXZMaXN0LmRhdGEoJ2hhc01vcmVSZXN1bHRzJyk7XHJcblxyXG4gICAgICAgIGlmIChoYXNNb3JlUmVzdWx0cykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMgPSBfLnVuaW9uKHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcywgW2lkXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zID0gXy53aXRob3V0KHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcywgaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVGYWNldEl0ZW1zKCRuYXZMaXN0KSB7XHJcbiAgICAgICAgY29uc3QgaWQgPSAkbmF2TGlzdC5hdHRyKCdpZCcpO1xyXG5cclxuICAgICAgICAvLyBUb2dnbGUgZGVwZW5kaW5nIG9uIGBjb2xsYXBzZWRgIGZsYWdcclxuICAgICAgICBpZiAoXy5pbmNsdWRlcyh0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMsIGlkKSkge1xyXG4gICAgICAgICAgICB0aGlzLmdldE1vcmVGYWNldFJlc3VsdHMoJG5hdkxpc3QpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbGxhcHNlRmFjZXRJdGVtcygkbmF2TGlzdCk7XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRNb3JlRmFjZXRSZXN1bHRzKCRuYXZMaXN0KSB7XHJcbiAgICAgICAgY29uc3QgZmFjZXQgPSAkbmF2TGlzdC5kYXRhKCdmYWNldCcpO1xyXG4gICAgICAgIGNvbnN0IGZhY2V0VXJsID0gdXJsVXRpbHMuZ2V0VXJsKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnJlcXVlc3RPcHRpb25zLnNob3dNb3JlKSB7XHJcbiAgICAgICAgICAgIGFwaS5nZXRQYWdlKGZhY2V0VXJsLCB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogdGhpcy5yZXF1ZXN0T3B0aW9ucy5zaG93TW9yZSxcclxuICAgICAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RfYWxsOiBmYWNldCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sIChlcnIsIHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLm1vZGFsLm9wZW4oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5tb2RhbE9wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLm1vZGFsLnVwZGF0ZUNvbnRlbnQocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29sbGFwc2VGYWNldEl0ZW1zKCRuYXZMaXN0KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbHRlckZhY2V0SXRlbXMoZXZlbnQpIHtcclxuICAgICAgICBjb25zdCAkaXRlbXMgPSAkKCcubmF2TGlzdC1pdGVtJyk7XHJcbiAgICAgICAgY29uc3QgcXVlcnkgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgICRpdGVtcy5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gJChlbGVtZW50KS50ZXh0KCkudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgaWYgKHRleHQuaW5kZXhPZihxdWVyeSkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLnNob3coKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoZWxlbWVudCkuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwYW5kRmFjZXQoJGFjY29yZGlvblRvZ2dsZSkge1xyXG4gICAgICAgIGNvbnN0IGNvbGxhcHNpYmxlID0gJGFjY29yZGlvblRvZ2dsZS5kYXRhKCdjb2xsYXBzaWJsZUluc3RhbmNlJyk7XHJcblxyXG4gICAgICAgIGNvbGxhcHNpYmxlLm9wZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBjb2xsYXBzZUZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpIHtcclxuICAgICAgICBjb25zdCBjb2xsYXBzaWJsZSA9ICRhY2NvcmRpb25Ub2dnbGUuZGF0YSgnY29sbGFwc2libGVJbnN0YW5jZScpO1xyXG5cclxuICAgICAgICBjb2xsYXBzaWJsZS5jbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbGxhcHNlQWxsRmFjZXRzKCkge1xyXG4gICAgICAgIGNvbnN0ICRhY2NvcmRpb25Ub2dnbGVzID0gJCh0aGlzLm9wdGlvbnMuYWNjb3JkaW9uVG9nZ2xlU2VsZWN0b3IpO1xyXG5cclxuICAgICAgICAkYWNjb3JkaW9uVG9nZ2xlcy5lYWNoKChpbmRleCwgYWNjb3JkaW9uVG9nZ2xlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0ICRhY2NvcmRpb25Ub2dnbGUgPSAkKGFjY29yZGlvblRvZ2dsZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlRmFjZXQoJGFjY29yZGlvblRvZ2dsZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwYW5kQWxsRmFjZXRzKCkge1xyXG4gICAgICAgIGNvbnN0ICRhY2NvcmRpb25Ub2dnbGVzID0gJCh0aGlzLm9wdGlvbnMuYWNjb3JkaW9uVG9nZ2xlU2VsZWN0b3IpO1xyXG5cclxuICAgICAgICAkYWNjb3JkaW9uVG9nZ2xlcy5lYWNoKChpbmRleCwgYWNjb3JkaW9uVG9nZ2xlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0ICRhY2NvcmRpb25Ub2dnbGUgPSAkKGFjY29yZGlvblRvZ2dsZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmV4cGFuZEZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFByaXZhdGUgbWV0aG9kc1xyXG4gICAgaW5pdFByaWNlVmFsaWRhdG9yKCkge1xyXG4gICAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5wcmljZVJhbmdlRm9ybVNlbGVjdG9yKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdmFsaWRhdG9yID0gbm9kKCk7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0b3JzID0ge1xyXG4gICAgICAgICAgICBlcnJvclNlbGVjdG9yOiB0aGlzLm9wdGlvbnMucHJpY2VSYW5nZUVycm9yU2VsZWN0b3IsXHJcbiAgICAgICAgICAgIGZpZWxkc2V0U2VsZWN0b3I6IHRoaXMub3B0aW9ucy5wcmljZVJhbmdlRmllbGRzZXRTZWxlY3RvcixcclxuICAgICAgICAgICAgZm9ybVNlbGVjdG9yOiB0aGlzLm9wdGlvbnMucHJpY2VSYW5nZUZvcm1TZWxlY3RvcixcclxuICAgICAgICAgICAgbWF4UHJpY2VTZWxlY3RvcjogdGhpcy5vcHRpb25zLnByaWNlUmFuZ2VNYXhQcmljZVNlbGVjdG9yLFxyXG4gICAgICAgICAgICBtaW5QcmljZVNlbGVjdG9yOiB0aGlzLm9wdGlvbnMucHJpY2VSYW5nZU1pblByaWNlU2VsZWN0b3IsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgVmFsaWRhdG9ycy5zZXRNaW5NYXhQcmljZVZhbGlkYXRpb24odmFsaWRhdG9yLCBzZWxlY3RvcnMsIHRoaXMub3B0aW9ucy52YWxpZGF0aW9uRXJyb3JNZXNzYWdlcyk7XHJcblxyXG4gICAgICAgIHRoaXMucHJpY2VSYW5nZVZhbGlkYXRvciA9IHZhbGlkYXRvcjtcclxuICAgIH1cclxuXHJcbiAgICByZXN0b3JlQ29sbGFwc2VkRmFjZXRJdGVtcygpIHtcclxuICAgICAgICBjb25zdCAkbmF2TGlzdHMgPSAkKHRoaXMub3B0aW9ucy5mYWNldE5hdkxpc3RTZWxlY3Rvcik7XHJcblxyXG4gICAgICAgIC8vIFJlc3RvcmUgY29sbGFwc2VkIHN0YXRlIGZvciBlYWNoIGZhY2V0XHJcbiAgICAgICAgJG5hdkxpc3RzLmVhY2goKGluZGV4LCBuYXZMaXN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0ICRuYXZMaXN0ID0gJChuYXZMaXN0KTtcclxuICAgICAgICAgICAgY29uc3QgaWQgPSAkbmF2TGlzdC5hdHRyKCdpZCcpO1xyXG4gICAgICAgICAgICBjb25zdCBzaG91bGRDb2xsYXBzZSA9IF8uaW5jbHVkZXModGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zLCBpZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2hvdWxkQ29sbGFwc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sbGFwc2VGYWNldEl0ZW1zKCRuYXZMaXN0KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kRmFjZXRJdGVtcygkbmF2TGlzdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXN0b3JlQ29sbGFwc2VkRmFjZXRzKCkge1xyXG4gICAgICAgIGNvbnN0ICRhY2NvcmRpb25Ub2dnbGVzID0gJCh0aGlzLm9wdGlvbnMuYWNjb3JkaW9uVG9nZ2xlU2VsZWN0b3IpO1xyXG5cclxuICAgICAgICAkYWNjb3JkaW9uVG9nZ2xlcy5lYWNoKChpbmRleCwgYWNjb3JkaW9uVG9nZ2xlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0ICRhY2NvcmRpb25Ub2dnbGUgPSAkKGFjY29yZGlvblRvZ2dsZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbGxhcHNpYmxlID0gJGFjY29yZGlvblRvZ2dsZS5kYXRhKCdjb2xsYXBzaWJsZUluc3RhbmNlJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gY29sbGFwc2libGUudGFyZ2V0SWQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHNob3VsZENvbGxhcHNlID0gXy5pbmNsdWRlcyh0aGlzLmNvbGxhcHNlZEZhY2V0cywgaWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNob3VsZENvbGxhcHNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxhcHNlRmFjZXQoJGFjY29yZGlvblRvZ2dsZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZEZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZEV2ZW50cygpIHtcclxuICAgICAgICAvLyBDbGVhbi11cFxyXG4gICAgICAgIHRoaXMudW5iaW5kRXZlbnRzKCk7XHJcblxyXG4gICAgICAgIC8vIERPTSBldmVudHNcclxuICAgICAgICAkKHdpbmRvdykub24oJ3N0YXRlY2hhbmdlJywgdGhpcy5vblN0YXRlQ2hhbmdlKTtcclxuICAgICAgICAkKHdpbmRvdykub24oJ3BvcHN0YXRlJywgdGhpcy5vblBvcFN0YXRlKTtcclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLm9wdGlvbnMuc2hvd01vcmVUb2dnbGVTZWxlY3RvciwgdGhpcy5vblRvZ2dsZUNsaWNrKTtcclxuICAgICAgICAkKGRvY3VtZW50KS5vbigndG9nZ2xlLmNvbGxhcHNpYmxlJywgdGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yLCB0aGlzLm9uQWNjb3JkaW9uVG9nZ2xlKTtcclxuICAgICAgICAkKGRvY3VtZW50KS5vbigna2V5dXAnLCB0aGlzLm9wdGlvbnMuZmFjZXRlZFNlYXJjaEZpbHRlckl0ZW1zLCB0aGlzLmZpbHRlckZhY2V0SXRlbXMpO1xyXG4gICAgICAgICQodGhpcy5vcHRpb25zLmNsZWFyRmFjZXRTZWxlY3Rvcikub24oJ2NsaWNrJywgdGhpcy5vbkNsZWFyRmFjZXQpO1xyXG5cclxuICAgICAgICAvLyBIb29rc1xyXG4gICAgICAgIGhvb2tzLm9uKCdmYWNldGVkU2VhcmNoLWZhY2V0LWNsaWNrZWQnLCB0aGlzLm9uRmFjZXRDbGljayk7XHJcbiAgICAgICAgaG9va3Mub24oJ2ZhY2V0ZWRTZWFyY2gtcmFuZ2Utc3VibWl0dGVkJywgdGhpcy5vblJhbmdlU3VibWl0KTtcclxuICAgICAgICBob29rcy5vbignc29ydEJ5LXN1Ym1pdHRlZCcsIHRoaXMub25Tb3J0QnlTdWJtaXQpO1xyXG4gICAgfVxyXG5cclxuICAgIHVuYmluZEV2ZW50cygpIHtcclxuICAgICAgICAvLyBET00gZXZlbnRzXHJcbiAgICAgICAgJCh3aW5kb3cpLm9mZignc3RhdGVjaGFuZ2UnLCB0aGlzLm9uU3RhdGVDaGFuZ2UpO1xyXG4gICAgICAgICQod2luZG93KS5vZmYoJ3BvcHN0YXRlJywgdGhpcy5vblBvcFN0YXRlKTtcclxuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2NsaWNrJywgdGhpcy5vcHRpb25zLnNob3dNb3JlVG9nZ2xlU2VsZWN0b3IsIHRoaXMub25Ub2dnbGVDbGljayk7XHJcbiAgICAgICAgJChkb2N1bWVudCkub2ZmKCd0b2dnbGUuY29sbGFwc2libGUnLCB0aGlzLm9wdGlvbnMuYWNjb3JkaW9uVG9nZ2xlU2VsZWN0b3IsIHRoaXMub25BY2NvcmRpb25Ub2dnbGUpO1xyXG4gICAgICAgICQoZG9jdW1lbnQpLm9mZigna2V5dXAnLCB0aGlzLm9wdGlvbnMuZmFjZXRlZFNlYXJjaEZpbHRlckl0ZW1zLCB0aGlzLmZpbHRlckZhY2V0SXRlbXMpO1xyXG4gICAgICAgICQodGhpcy5vcHRpb25zLmNsZWFyRmFjZXRTZWxlY3Rvcikub2ZmKCdjbGljaycsIHRoaXMub25DbGVhckZhY2V0KTtcclxuXHJcbiAgICAgICAgLy8gSG9va3NcclxuICAgICAgICBob29rcy5vZmYoJ2ZhY2V0ZWRTZWFyY2gtZmFjZXQtY2xpY2tlZCcsIHRoaXMub25GYWNldENsaWNrKTtcclxuICAgICAgICBob29rcy5vZmYoJ2ZhY2V0ZWRTZWFyY2gtcmFuZ2Utc3VibWl0dGVkJywgdGhpcy5vblJhbmdlU3VibWl0KTtcclxuICAgICAgICBob29rcy5vZmYoJ3NvcnRCeS1zdWJtaXR0ZWQnLCB0aGlzLm9uU29ydEJ5U3VibWl0KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsZWFyRmFjZXQoZXZlbnQpIHtcclxuICAgICAgICBjb25zdCAkbGluayA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgY29uc3QgdXJsID0gJGxpbmsuYXR0cignaHJlZicpO1xyXG5cclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgVVJMXHJcbiAgICAgICAgdXJsVXRpbHMuZ29Ub1VybCh1cmwpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVG9nZ2xlQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICBjb25zdCAkdG9nZ2xlID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICBjb25zdCAkbmF2TGlzdCA9ICQoJHRvZ2dsZS5hdHRyKCdocmVmJykpO1xyXG5cclxuICAgICAgICAvLyBQcmV2ZW50IGRlZmF1bHRcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAvLyBUb2dnbGUgdmlzaWJsZSBpdGVtc1xyXG4gICAgICAgIHRoaXMudG9nZ2xlRmFjZXRJdGVtcygkbmF2TGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25GYWNldENsaWNrKGV2ZW50LCBjdXJyZW50VGFyZ2V0KSB7XHJcbiAgICAgIC8vICBpblZpZXdDaGVjayh0aGlzLmNvbnRleHQpOyAvLyBzd2F0Y2hlcyBvbiBwcm9kdWN0IGNhcmRcclxuICAgICAgXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLlByb2QtQWRkVG9DYXJ0IC5Qcm9kLUFkZFRvQ2FydC1hZGQgYScpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgRGF0YSA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZChcInNlbmRsb2FkaW5nYWRkdG9jYXJ0XCIpXHJcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgdmFyIGNvdW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNhcnQtcXVhbnRpdHlcIilbMF0udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICB2YXIgcHJvX2lkID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2R1Y3QtaWRcIik7XHJcbiAgICAgICAgICB2YXIgZGlzY291bnRfcHIgPSAnJztcclxuICAgICAgICAgICAgICBpZih0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNhcmQtZmlndXJlIC5jYXJkLWZpZ3VyZV9fbGluayAudGFnLXNlY3Rpb24gLmdyb3VwQm94IC5zYWxlU2F2aW5nVGFnXCIpLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgIHZhciBkaXNjb3VudCA9IHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2FyZC1maWd1cmUgLmNhcmQtZmlndXJlX19saW5rIC50YWctc2VjdGlvbiAuZ3JvdXBCb3ggLnNhbGVTYXZpbmdUYWdcIilbMF0udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgZGlzY291bnRfcHIgPSBkaXNjb3VudC50cmltKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIGF4aW9zKHtcclxuICAgICAgICAgICAgdXJsOiAnL3JlbW90ZS92MS9jYXJ0L2FkZCcsXHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgYWN0aW9uOiAnYWRkJyxcclxuICAgICAgICAgICAgICBcInByb2R1Y3RfaWRcIjogcHJvX2lkLFxyXG4gICAgICAgICAgICAgIFwicXR5W11cIjogMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhLmRhdGEuY2FydF9pdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNhcnQtcXVhbnRpdHlcIilbMF0udGV4dENvbnRlbnQgPSBwYXJzZUludChjb3VudCkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNhcnQtaWNvblwiKVswXS5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgZmV0Y2goJy9hcGkvc3RvcmVmcm9udC9jYXJ0cz9pbmNsdWRlPScsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2NyZWRlbnRpYWxzJzogJ2luY2x1ZGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICdoZWFkZXJzJzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5qc29uKCkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBnZXRpZCA9IGRhdGFbMF1bJ2xpbmVJdGVtcyddWydwaHlzaWNhbEl0ZW1zJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRpZC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSxrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwaWQgPSB2YWx1ZS5wcm9kdWN0SWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBxdHkgPSB2YWx1ZS5xdWFudGl0eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGlkICE9IHVuZGVmaW5lZCAmJiBwaWQgPT0gcHJvX2lkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGEucXVlcnlTZWxlY3RvckFsbCgnLlByb2QtQWRkVG9DYXJ0IC5Qcm9kLUFkZFRvQ2FydC1hZGQgLmZvcm0gLmJ1dHRvbiAuaGVhcnQtaWNvbiBhICNwcm8tY291bnQnKVswXS50ZXh0Q29udGVudCA9IHF0eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGEucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZmlsbC1Qcm9kLWFkZC10by1jYXJ0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0YS5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5Qcm9kLUFkZFRvQ2FydCAuUHJvZC1BZGRUb0NhcnQtYWRkIC5mb3JtIC5idXR0b24gLmhlYXJ0LWljb24gYSAjcHJvLWNvdW50JylbMF0uY2xhc3NMaXN0LmFkZChcImZpbGwtY291bnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhLmNsYXNzTGlzdC5yZW1vdmUoXCJzZW5kbG9hZGluZ2FkZHRvY2FydFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkVG9DYXJ0KHByb19pZCwgZGlzY291bnRfcHIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSw1MDApO1xyXG4gICAgICBcclxuICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLlByb2QtQWRkVG9DYXJ0IC5idXktbm93LmV2ZW50X2J1eV9ub3dfYWRkX3RvX2NhcnQnKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgIC8vICAgdGhpcy5jbGFzc0xpc3QuYWRkKFwiYnV5bm93bG9hZGluZ1wiKTtcclxuICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZChcInNlbmRsb2FkaW5nYnV5bm93XCIpXHJcbiAgICAgICAgIHZhciBwcm9faWQgPSB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvZHVjdC1pZFwiKTtcclxuICAgICAgICAgdmFyIGRpc2NvdW50X3ByID0gJyc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgIGlmKHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jYXJkLWZpZ3VyZSAuY2FyZC1maWd1cmVfX2xpbmsgLnRhZy1zZWN0aW9uIC5ncm91cEJveCAuc2FsZVNhdmluZ1RhZ1wiKS5sZW5ndGggPiAwKXtcclxuICAgICAgICB2YXIgZGlzY291bnQgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2FyZC1maWd1cmUgLmNhcmQtZmlndXJlX19saW5rIC50YWctc2VjdGlvbiAuZ3JvdXBCb3ggLnNhbGVTYXZpbmdUYWdcIilbMF0udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgIGRpc2NvdW50X3ByID0gZGlzY291bnQudHJpbSgpO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIGF4aW9zKHtcclxuICAgICAgICAgICB1cmw6ICcvcmVtb3RlL3YxL2NhcnQvYWRkJyxcclxuICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgIGFjdGlvbjogJ2FkZCcsXHJcbiAgICAgICAgICAgICBcInByb2R1Y3RfaWRcIjogcHJvX2lkLFxyXG4gICAgICAgICAgICAgXCJxdHlbXVwiOiAxXHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgXHJcbiAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhLmRhdGEuY2FydF9pdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBidXlOb3cocHJvX2lkLCBkaXNjb3VudF9wcilcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgIH0pO1xyXG4gICAgICAgICBcclxuICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIC8vZW5kIGFkZHRvY2FydCB0cmVuZGluZyBwcm9kdWN0XHJcbiAgXHJcbiAgICB9LDYwMDApO1xyXG4gICAgICAgIGNvbnN0ICRsaW5rID0gJChjdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICBjb25zdCB1cmwgPSAkbGluay5hdHRyKCdocmVmJyk7XHJcblxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICRsaW5rLnRvZ2dsZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgVVJMXHJcbiAgICAgICAgdXJsVXRpbHMuZ29Ub1VybCh1cmwpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLm1vZGFsT3Blbikge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMubW9kYWwuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvblNvcnRCeVN1Ym1pdChldmVudCwgY3VycmVudFRhcmdldCkge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgdHJ1ZSk7XHJcbiAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSAkKGN1cnJlbnRUYXJnZXQpLnNlcmlhbGl6ZSgpLnNwbGl0KCc9Jyk7XHJcblxyXG4gICAgICAgIHVybC5xdWVyeVtxdWVyeVBhcmFtc1swXV0gPSBxdWVyeVBhcmFtc1sxXTtcclxuICAgICAgICBkZWxldGUgdXJsLnF1ZXJ5LnBhZ2U7XHJcblxyXG4gICAgICAgIC8vIFVybCBvYmplY3QgYHF1ZXJ5YCBpcyBub3QgYSB0cmFkaXRpb25hbCBKYXZhU2NyaXB0IE9iamVjdCBvbiBhbGwgc3lzdGVtcywgY2xvbmUgaXQgaW5zdGVhZFxyXG4gICAgICAgIGNvbnN0IHVybFF1ZXJ5UGFyYW1zID0ge307XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih1cmxRdWVyeVBhcmFtcywgdXJsLnF1ZXJ5KTtcclxuXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgdXJsVXRpbHMuZ29Ub1VybChVcmwuZm9ybWF0KHsgcGF0aG5hbWU6IHVybC5wYXRobmFtZSwgc2VhcmNoOiB1cmxVdGlscy5idWlsZFF1ZXJ5U3RyaW5nKHVybFF1ZXJ5UGFyYW1zKSB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25SYW5nZVN1Ym1pdChldmVudCwgY3VycmVudFRhcmdldCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5wcmljZVJhbmdlVmFsaWRhdG9yLmFyZUFsbChub2QuY29uc3RhbnRzLlZBTElEKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSBVcmwucGFyc2Uod2luZG93LmxvY2F0aW9uLmhyZWYsIHRydWUpO1xyXG4gICAgICAgIGxldCBxdWVyeVBhcmFtcyA9IGRlY29kZVVSSSgkKGN1cnJlbnRUYXJnZXQpLnNlcmlhbGl6ZSgpKS5zcGxpdCgnJicpO1xyXG4gICAgICAgIHF1ZXJ5UGFyYW1zID0gdXJsVXRpbHMucGFyc2VRdWVyeVBhcmFtcyhxdWVyeVBhcmFtcyk7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHF1ZXJ5UGFyYW1zKSB7XHJcbiAgICAgICAgICAgIGlmIChxdWVyeVBhcmFtcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICB1cmwucXVlcnlba2V5XSA9IHF1ZXJ5UGFyYW1zW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVybCBvYmplY3QgYHF1ZXJ5YCBpcyBub3QgYSB0cmFkaXRpb25hbCBKYXZhU2NyaXB0IE9iamVjdCBvbiBhbGwgc3lzdGVtcywgY2xvbmUgaXQgaW5zdGVhZFxyXG4gICAgICAgIGNvbnN0IHVybFF1ZXJ5UGFyYW1zID0ge307XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih1cmxRdWVyeVBhcmFtcywgdXJsLnF1ZXJ5KTtcclxuXHJcbiAgICAgICAgdXJsVXRpbHMuZ29Ub1VybChVcmwuZm9ybWF0KHsgcGF0aG5hbWU6IHVybC5wYXRobmFtZSwgc2VhcmNoOiB1cmxVdGlscy5idWlsZFF1ZXJ5U3RyaW5nKHVybFF1ZXJ5UGFyYW1zKSB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TdGF0ZUNoYW5nZSgpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkFjY29yZGlvblRvZ2dsZShldmVudCkge1xyXG4gICAgICAgIGNvbnN0ICRhY2NvcmRpb25Ub2dnbGUgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIGNvbnN0IGNvbGxhcHNpYmxlID0gJGFjY29yZGlvblRvZ2dsZS5kYXRhKCdjb2xsYXBzaWJsZUluc3RhbmNlJyk7XHJcbiAgICAgICAgY29uc3QgaWQgPSBjb2xsYXBzaWJsZS50YXJnZXRJZDtcclxuXHJcbiAgICAgICAgaWYgKGNvbGxhcHNpYmxlLmlzQ29sbGFwc2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRzID0gXy51bmlvbih0aGlzLmNvbGxhcHNlZEZhY2V0cywgW2lkXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldHMgPSBfLndpdGhvdXQodGhpcy5jb2xsYXBzZWRGYWNldHMsIGlkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Qb3BTdGF0ZSgpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50VXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbiAgICAgICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhjdXJyZW50VXJsKTtcclxuICAgICAgICAvLyBJZiBzZWFyY2hQYXJhbXMgZG9lcyBub3QgY29udGFpbiBhIHBhZ2UgdmFsdWUgdGhlbiBtb2RpZnkgdXJsIHF1ZXJ5IHN0cmluZyB0byBoYXZlIHBhZ2U9MVxyXG4gICAgICAgIGlmICghc2VhcmNoUGFyYW1zLmhhcygncGFnZScpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtVcmwgPSAkKCcucGFnaW5hdGlvbi1saW5rJykuYXR0cignaHJlZicpO1xyXG4gICAgICAgICAgICBjb25zdCByZSA9IC9wYWdlPVswLTldKy9pO1xyXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkTGlua1VybCA9IGxpbmtVcmwucmVwbGFjZShyZSwgJ3BhZ2U9MScpO1xyXG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sIGRvY3VtZW50LnRpdGxlLCB1cGRhdGVkTGlua1VybCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQod2luZG93KS50cmlnZ2VyKCdzdGF0ZWNoYW5nZScpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGYWNldGVkU2VhcmNoO1xyXG4iLCJpbXBvcnQgeyBzaG93QWxlcnRNb2RhbCB9IGZyb20gJy4vbW9kYWwnO1xyXG5cclxuZnVuY3Rpb24gZGVjcmVtZW50Q291bnRlcihjb3VudGVyLCBpdGVtKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IGNvdW50ZXIuaW5kZXhPZihpdGVtKTtcclxuXHJcbiAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgIGNvdW50ZXIuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5jcmVtZW50Q291bnRlcihjb3VudGVyLCBpdGVtKSB7XHJcbiAgICBjb3VudGVyLnB1c2goaXRlbSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUNvdW50ZXJOYXYoY291bnRlciwgJGxpbmssIHVybHMpIHtcclxuICAgIGlmIChjb3VudGVyLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgIGlmICghJGxpbmsuaXMoJ3Zpc2libGUnKSkge1xyXG4gICAgICAgICAgICAkbGluay5hZGRDbGFzcygnc2hvdycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkbGluay5hdHRyKCdocmVmJywgYCR7dXJscy5jb21wYXJlfS8ke2NvdW50ZXIuam9pbignLycpfWApO1xyXG4gICAgICAgICRsaW5rLmZpbmQoJ3NwYW4uY291bnRQaWxsJykuaHRtbChjb3VudGVyLmxlbmd0aCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICRsaW5rLnJlbW92ZUNsYXNzKCdzaG93Jyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7IG5vQ29tcGFyZU1lc3NhZ2UsIHVybHMgfSkge1xyXG4gICAgbGV0IGNvbXBhcmVDb3VudGVyID0gW107XHJcblxyXG4gICAgY29uc3QgJGNvbXBhcmVMaW5rID0gJCgnYVtkYXRhLWNvbXBhcmUtbmF2XScpO1xyXG5cclxuICAgICQoJ2JvZHknKS5vbignY29tcGFyZVJlc2V0JywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0ICRjaGVja2VkID0gJCgnYm9keScpLmZpbmQoJ2lucHV0W25hbWU9XCJwcm9kdWN0c1xcW1xcXVwiXTpjaGVja2VkJyk7XHJcblxyXG4gICAgICAgIGNvbXBhcmVDb3VudGVyID0gJGNoZWNrZWQubGVuZ3RoID8gJGNoZWNrZWQubWFwKChpbmRleCwgZWxlbWVudCkgPT4gZWxlbWVudC52YWx1ZSkuZ2V0KCkgOiBbXTtcclxuICAgICAgICB1cGRhdGVDb3VudGVyTmF2KGNvbXBhcmVDb3VudGVyLCAkY29tcGFyZUxpbmssIHVybHMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnYm9keScpLnRyaWdnZXJIYW5kbGVyKCdjb21wYXJlUmVzZXQnKTtcclxuXHJcbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJ1tkYXRhLWNvbXBhcmUtaWRdJywgZXZlbnQgPT4ge1xyXG4gICAgICAgIGNvbnN0IHByb2R1Y3QgPSBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIGNvbnN0ICRjbGlja2VkQ29tcGFyZUxpbmsgPSAkKCdhW2RhdGEtY29tcGFyZS1uYXZdJyk7XHJcblxyXG4gICAgICAgIGlmIChldmVudC5jdXJyZW50VGFyZ2V0LmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgaW5jcmVtZW50Q291bnRlcihjb21wYXJlQ291bnRlciwgcHJvZHVjdCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZGVjcmVtZW50Q291bnRlcihjb21wYXJlQ291bnRlciwgcHJvZHVjdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cGRhdGVDb3VudGVyTmF2KGNvbXBhcmVDb3VudGVyLCAkY2xpY2tlZENvbXBhcmVMaW5rLCB1cmxzKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJ2JvZHknKS5vbignc3VibWl0JywgJ1tkYXRhLXByb2R1Y3QtY29tcGFyZV0nLCBldmVudCA9PiB7XHJcbiAgICAgICAgY29uc3QgJHRoaXMgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIGNvbnN0IHByb2R1Y3RzVG9Db21wYXJlID0gJHRoaXMuZmluZCgnaW5wdXRbbmFtZT1cInByb2R1Y3RzXFxbXFxdXCJdOmNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgaWYgKHByb2R1Y3RzVG9Db21wYXJlLmxlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKG5vQ29tcGFyZU1lc3NhZ2UpO1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnYVtkYXRhLWNvbXBhcmUtbmF2XScsICgpID0+IHtcclxuICAgICAgICBjb25zdCAkY2xpY2tlZENoZWNrZWRJbnB1dCA9ICQoJ2JvZHknKS5maW5kKCdpbnB1dFtuYW1lPVwicHJvZHVjdHNcXFtcXF1cIl06Y2hlY2tlZCcpO1xyXG5cclxuICAgICAgICBpZiAoJGNsaWNrZWRDaGVja2VkSW5wdXQubGVuZ3RoIDw9IDEpIHtcclxuICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwobm9Db21wYXJlTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9