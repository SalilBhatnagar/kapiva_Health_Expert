(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./assets/js/theme/common/utils/safe-string.js":
/*!*****************************************************!*\
  !*** ./assets/js/theme/common/utils/safe-string.js ***!
  \*****************************************************/
/*! exports provided: safeString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "safeString", function() { return safeString; });
/**
 * This function parses HTML entities in strings
 * @param str: String
 * @returns String
*/
var safeString = function safeString(str) {
  var d = new DOMParser();
  return d.parseFromString(str, 'text/html').body.textContent;
};

/***/ }),

/***/ "./assets/js/theme/product.js":
/*!************************************!*\
  !*** ./assets/js/theme/product.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Product; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _product_reviews__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product/reviews */ "./assets/js/theme/product/reviews.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_product_details__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/product-details */ "./assets/js/theme/common/product-details.js");
/* harmony import */ var _product_video_gallery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./product/video-gallery */ "./assets/js/theme/product/video-gallery.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var owl_carousel_dist_assets_owl_carousel_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! owl.carousel/dist/assets/owl.carousel.css */ "./node_modules/owl.carousel/dist/assets/owl.carousel.css");
/* harmony import */ var owl_carousel_dist_assets_owl_theme_default_min_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! owl.carousel/dist/assets/owl.theme.default.min.css */ "./node_modules/owl.carousel/dist/assets/owl.theme.default.min.css");
/* harmony import */ var owl_carousel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! owl.carousel */ "./node_modules/owl.carousel/dist/owl.carousel.js");
/* harmony import */ var owl_carousel__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(owl_carousel__WEBPACK_IMPORTED_MODULE_9__);
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
/*
 Import all product specific js
 */










var BearerToken = '';
var Product = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Product, _PageManager);
  function Product(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.url = window.location.href;
    _this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    _this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
    _this.reviewModal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_6__["default"])('#modal-review-form')[0];
    BearerToken = context.bearerToken;
    return _this;
  }
  var _proto = Product.prototype;
  _proto.onReady = function onReady() {
    var _this2 = this;
    var pId = document.querySelectorAll(".product_id")[0].value;
    //set count of addtocart
    CountAddToCart();
    function CountAddToCart() {
      var setinterval = setInterval(function () {
        var len = document.getElementsByClassName("add_to_cart_product").length;
        if (len > 0) {
          clearInterval(setinterval);
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
                  if (pId == pid) {
                    var qty = value.quantity;
                    document.querySelectorAll("#countinnermain")[0].textContent = qty;
                    document.querySelectorAll("#countinnermain")[0].classList.add("fillPDPCount");
                    document.querySelectorAll("#countinnermain")[0].parentElement.classList.add("fill-Prod-add-to-cart");
                  }
                });
              }
            });
          });
        }
      }, 200);
    }

    // //pincode
    // var x = document.getElementsByClassName("submit");
    // x[0].addEventListener('click', function(e){     
    //     document.getElementsByClassName('loader-img')[0].style.display ='inline-block';
    //     var code = document.getElementsByClassName('input')[0].value;
    //     axios.get('https://bg-sync-api-prod.kapiva.in/api/index.php', {
    //         params: {
    //             pincode: code
    //         }
    //     })
    //     .then(function (response) {
    //         var data = response;

    //         var errMessage = data.data.edd_stamp;
    //         console.log(errMessage)
    //         if (errMessage != null && errMessage != undefined) {

    //         let x =document.getElementsByClassName('result-wrap');
    //         x[0].innerHTML = 'Get it by ' + '<div id="dilvery-date">' + data['data']['edd_stamp'] + '</div>';

    //         } else {
    //         let x =document.getElementsByClassName('result-wrap');
    //         x[0].innerHTML = '<div id="dilvery-date">Incorrect Pincode</div>';

    //         }
    //         document.getElementsByClassName('loader-img')[0].style.display ='none';
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    //     .then(function () {
    //         // always executed
    //     }); 

    // });

    (function () {
      var youtube = document.querySelectorAll(".slider-video .hiddengallery");
      var fancyopen = document.querySelectorAll(".productView-thumbnail");
      for (var i = 0; i < youtube.length; i++) {
        var id = youtube[i].getAttribute("data-video-id");
        var source = "https://img.youtube.com/vi/" + id + "/sddefault.jpg";
        youtube[i].style.backgroundImage = "url(" + source + ")";
        youtube[i].addEventListener("click", function () {
          this.setAttribute("href", "https://www.youtube.com/embed/" + id + "?origin=https://www.kapiva.in");
          var iframe = document.createElement("iframe");
          iframe.setAttribute("width", "100%");
          iframe.setAttribute("loading", "lazy");
          iframe.setAttribute("title", "YouTube video player");
          iframe.setAttribute("frameborder", "0");
          iframe.setAttribute("allow", "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
          iframe.setAttribute("allowfullscreen", "");
          iframe.setAttribute("class", "kapiva-curve big");
          iframe.setAttribute("src", "https://www.youtube.com/embed/" + id + "?rel=0&showinfo=0&autoplay=1");
          this.innerHTML = "";
          this.appendChild(iframe);
        });
        fancyopen[i].addEventListener("click", function () {
          document.querySelectorAll(".hiddengallery")[0].style.backgroundImage = "url(" + source + ")";
          document.querySelectorAll(".hiddengallery")[0].setAttribute("href", "https://www.youtube.com/embed/" + id + "?origin=https://www.kapiva.in");
        });
      }
      ;
    })();
    //end sticky add-to-cart

    //pageview event
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'page-type': 'pdp'
    });
    var u_id = document.getElementsByClassName("customer_id")[0].value;
    var pro_id = document.querySelector('.stickey_data').getAttribute("sku");

    // Listen for foundation modal close events to sanitize URL after review.
    $(document).on('close.fndtn.reveal', function () {
      if (_this2.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
        window.history.replaceState(null, document.title, window.location.pathname);
      }
    });

    //webengage for product view
    var solution = [];
    var solution = [].slice.call(document.getElementsByClassName('solution'), 0);
    solution.forEach(function (el) {
      var sol = this.value;
      solution.push(sol);
    });
    var ingredient = [];
    var ingredients = '';
    var ingredientstab = document.querySelectorAll(".ingredients-tab-header li");
    for (var i = 0; i < ingredientstab.length; i++) {
      var ing = ingredientstab[i].textContent;
      ingredient.push(ing);
      if (ingredients == '') {
        ingredients = ing;
      } else {
        ingredients = ingredients + ',' + ing;
      }
    }
    ;
    var pro_id = document.getElementsByClassName("stickey_data")[0].getAttribute('id');
    var discount = '';
    if (document.querySelectorAll(".productView-image-main .productView-image .saleSavingTag").length > 0) {
      var dis = document.querySelectorAll(".productView-image-main .productView-image .saleSavingTag")[0].textContent;
      discount = dis.trim();
    }
    var p_name = '';
    var mrp = '';
    var discounted_price = '';
    var similar_product = '';
    var image = '';
    var url = '';
    var Product_image_URL = '';
    var query = "query productById{\n          site {\n          product(entityId: " + pro_id + ") {\n          entityId\n          name\n          path\n          inventory{\n              isInStock\n              aggregated{\n              availableToSell\n              warningLevel\n              }\n          }\n          categories\n          {\n              edges\n              {\n              node\n              {\n                  id\n                  name\n                  \n              }\n              } \n          }\n          relatedProducts\n          {\n              edges{\n              node{\n                  entityId\n                  name\n              }\n              }\n          }\n          reviews{\n              edges{\n              node{\n                  title\n                  text\n                  rating\n              }\n              }\n          }\n          plainTextDescription\n          defaultImage {\n              ...ImageFields\n          }\n          images {\n              edges {\n              node {\n                  ...ImageFields\n              }\n              }\n          }\n          reviewSummary {\n              summationOfRatings\n              numberOfReviews\n          }\n          prices (includeTax:true){\n              price {\n              ...MoneyFields\n              }\n              salePrice {\n              ...MoneyFields\n              }\n              retailPrice {\n              ...MoneyFields\n              }\n              basePrice {\n                ...MoneyFields\n                }\n          }\n          }\n          }\n          }\n          fragment ImageFields on Image {\n\n          url640wide: url(width: 640)\n\n          }\n\n          fragment MoneyFields on Money {\n          value\n          currencyCode\n          }";
    axios({
      url: '/graphql',
      method: 'post',
      contentType: "application/json",
      headers: {
        'Authorization': 'Bearer ' + BearerToken
      },
      data: {
        query: query
      }
    }).then(function (result) {
      var alldata = result.data.data.site.product;
      if (alldata != null) {
        image = alldata.defaultImage.url640wide;
        url = alldata.path;
        p_name = alldata.name;
        if (alldata.inventory.aggregated != null) var quantity = alldata.inventory.aggregated.availableToSell;
        var product_details = document.getElementsByClassName("product_details")[0];
        product_details.setAttribute("quantity", quantity);
        if (alldata.prices.retailPrice != null) {
          mrp = alldata.prices.retailPrice.value;
          product_details.setAttribute("price", mrp);
        } else {
          mrp = alldata.prices.basePrice.value;
          product_details.setAttribute("price", mrp);
        }
        if (alldata.prices.salePrice != null) {
          discounted_price = alldata.prices.salePrice.value;
          product_details.setAttribute("sale_price", discounted_price);
        }
        Product_image_URL = alldata.defaultImage.url640wide;
        var data = alldata.relatedProducts.edges;
        var related_id = [];
        data.forEach(function (value, index) {
          related_id.push(value.node.entityId);
        });
        similar_product = related_id;
        var review = alldata.reviews.edges;
        var reviews = [];
        if (review.length != 0) {
          var num = 0;
          for (var i = 0; i < 3; i++) {
            if (review.length > i) reviews.push(review[i].node);
          }
        }
        var category = alldata.categories.edges;
        var category_id = '';
        var category_name = '';
        category.forEach(function (value, index) {
          if (category_id == '' && category_name == '') {
            var cat_id = value.node.id;
            var splited_url = atob(cat_id);
            var categoryid = splited_url.split("Category:");
            category_id = categoryid[1];
            category_name = value.node.name;
          } else {
            var splited_url = atob(value.node.id);
            var categoryid = splited_url.split("Category:");
            var catid = categoryid[1];
            category_id = category_id + ',' + catid;
            category_name = category_name + ',' + value.node.name;
          }
        });
        var Category_id = [];
        var Category_name = [];
        category.forEach(function (value, index) {
          var c_id = value.node.id;
          var splited_url = atob(c_id);
          var catid = splited_url.split("Category:");
          var Cat_id = catid[1];
          var cat_name = value.node.name;
          Category_id.push(Cat_id);
          Category_name.push(cat_name);
        });
        var categories = {
          Category_id: Category_id,
          Category_name: Category_name
        };
        product_details.setAttribute("category_id", category_id);
        product_details.setAttribute("category_name", category_name);
        setTimeout(function () {
          var benefit = [];
          var OverviewSlide = document.querySelectorAll(".OverviewSlide.slick-active .content ul li");
          for (var _i = 0; _i < OverviewSlide.length; _i++) {
            benefit.push(OverviewSlide[_i].textContent);
          }
          ;
          var products = [];
          var productArray = [];
          var obj = {
            "Product_id": alldata.entityId,
            "Product_name": p_name,
            "Category_id": category_id,
            "Category_name": category_name,
            "MRP": mrp,
            "Discount": discount,
            "Discount_Price": discounted_price,
            "Product_url": url,
            "Image_url": image,
            "Product_Ingredient": ingredients
          };
          var product_array = {
            "Product_id": alldata.entityId,
            "Product_name": p_name,
            "categories": categories,
            "MRP": mrp,
            "Discount": discount,
            "Discount_Price": discounted_price,
            "Product_url": url,
            "Image_url": image,
            "Product_reviews(Top 3)": reviews,
            "Product_Ingredient": ingredient
          };
          productArray.push(product_array);
          products.push(obj);
          var p_array = JSON.stringify(productArray);
          var finaldata = JSON.stringify(products);
          webengage.track("Product Viewed", {
            "Products": products,
            "ProductArray": productArray,
            "Product_Name": p_name,
            "Category_ID": category_id,
            "Category_Name": category_name,
            "Product_ID": alldata.entityId,
            "MRP": Number(mrp),
            "Discount": discount,
            "Discount_Price": Number(discounted_price),
            "Product reviews (Top 3)": reviews,
            "Product_Ingredient": ingredient,
            "Product_Benefit": benefit,
            "Similar_products": similar_product,
            "Product_image_URL": Product_image_URL
          });
        }, 2000);
      }
    });
    var pid = document.getElementsByClassName("stickey_data")[0].getAttribute("id");
    var pname = document.getElementsByClassName("stickey_data")[0].getAttribute("title");
    var price = document.getElementsByClassName("stickey_data")[0].getAttribute("actual_price");
    var salePrice = document.getElementsByClassName("stickey_data")[0].getAttribute("sale_price");
    var productObject = {
      productId: pid,
      productName: pname,
      productPrice: price,
      productSalePrice: salePrice
    };
    var products = [];
    var related_products = document.getElementsByClassName("related_products");
    if (related_products.length > 0) {
      related_products[0].forEach(function (value, index) {
        var price_actual = value.getElementsByClassName('price--non-sale')[0].textContent;
        var sale_price_data = value.getElementsByClassName('price--actual')[0].textContent;
        if (price_actual != '') {
          var price_data = price_actual.split("₹");
          var price = price_data[1].replace(",", "");
        }
        var sale_data = sale_price_data.split("₹");
        var salePrice = sale_data[1].replace(",", "");
        var obj = {
          "product_id": value.getElementsByClassName('price--actual')[0].getAttribute("data-product-id"),
          "name": value.querySelectorAll(".card .card-body .card-title a")[0].textContent,
          "price": price,
          "salePrice": salePrice
        };
        products.push(obj);
      });
    }

    //end webengage for product view

    //add rating
    var element = document.getElementById("rating-rate");
    if (element != null) {
      element.addEventListener('change', function () {
        var selector = document.querySelector('.stickey_data');
        var Product_Id = document.querySelector(".Product_Id");
        var Product_details = document.querySelector(".product_details");
        var name = selector.getAttribute('title');
        var pid = Product_Id.value;
        var quantity = Product_details.getAttribute("quantity");
        var price = Product_details.getAttribute("price");
        var sale_price = Product_details.getAttribute("sale_price");
        var category_name = Product_details.getAttribute("category_name");
        var categoryName = [category_name];
        var category_id = Product_details.getAttribute("category_id");
        var categoryId = [category_id];
        var categories = {
          categoryId: categoryId,
          categoryName: categoryName
        };
        var data = {
          'Name': name,
          'product_id': pid,
          'price': price,
          'sale_price': sale_price,
          'quantity': quantity,
          'categories': categories
        };
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          reviewRating: data
        });
      });
    }
    //end add rating

    //submit review
    var x = document.getElementsByClassName("submit--review");
    if (x.length != 0) {
      x[0].addEventListener('click', function (e) {
        var selector = document.querySelector('.stickey_data');
        var Product_Id = document.querySelector(".Product_Id");
        var Product_details = document.querySelector(".product_details");
        var name = selector.getAttribute('title');
        var pid = Product_Id.value;
        var quantity = Product_details.getAttribute("quantity");
        var price = Product_details.getAttribute("price");
        var sale_price = Product_details.getAttribute("sale_price");
        var category_name = Product_details.getAttribute("category_name");
        var categoryName = [category_name];
        var category_id = Product_details.getAttribute("category_id");
        var categoryId = [category_id];
        var categories = {
          categoryId: categoryId,
          categoryName: categoryName
        };
        var data = {
          'Name': name,
          'product_id': pid,
          'price': price,
          'sale_price': sale_price,
          'quantity': quantity,
          'categories': categories
        };
        setTimeout(function () {
          var len = document.querySelectorAll(".form-field--error").length;
          if (len == 0) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              reviewComment: data
            });
          }
        }, 1000);
      });
    }
    //end submit review

    //add to cart  and buynow webengage
    function addtocartwebengage(pid) {
      var totalcount = document.getElementsByClassName("form-input--incrementTotal")[0].value;
      var count = document.getElementsByClassName("cart-quantity")[0].textContent;
      var pro_sale_price = document.querySelector(".stickey_data").getAttribute("sale_price").replace(/\D+/g, '');
      var pro_actual_price = document.querySelector(".stickey_data").getAttribute("actual_price").replace(/\D+/g, '');
      var ga_discount = 100 * (pro_actual_price - pro_sale_price) / pro_actual_price;
      var p_id = '';
      var p_name = '';
      var category_id = '';
      var category_name = '';
      var mrp = '';
      var discounted_price = '';
      var Quantity = '';
      var total_item_in_cart = '';
      var cart_value = '';
      var discount = '';
      var pro_sku = '';
      if (document.querySelectorAll(".productView-image-main .productView-image .saleSavingTag").length != 0) {
        var dis = document.querySelectorAll(".productView-image-main .productView-image .saleSavingTag")[0].textContent;
        var discount = dis.trim();
      }
      fetch('/api/storefront/carts?productId=' + pid, {
        'credentials': 'include',
        'headers': {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        response.json().then(function (data) {
          if (data) {
            cart_value = data[0].cartAmount;
            total_item_in_cart = data[0].lineItems.physicalItems.length;
            var getquantity = data[0]['lineItems']['physicalItems'];
            var totalitems = '';
            getquantity.forEach(function (value, index) {
              if (value.productId == pid) {
                Quantity = value.quantity;
                pro_sku = value.sku;
                document.getElementsByClassName("pdpCount")[0].textContent = Quantity;
                document.getElementsByClassName("pdpCount")[0].classList.add("fillPDPCount");
              }
              if (totalitems == '') {
                totalitems = value.quantity;
              } else {
                totalitems += value.quantity;
              }
            });
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              'numberOfItemsInCart': totalitems
            });
          }
          var query = "query productById{\n                site {\n                product(entityId: " + pid + ") {\n                  id\n                  entityId\n                  name\n                  inventory{\n                   isInStock\n                   aggregated{\n                     availableToSell\n                     warningLevel\n                   }\n                 }\n                  categories\n                  {\n                   edges\n                    {\n                      node\n                      {\n                        id\n                        name\n                        \n                      }\n                    } \n                  }\n                  prices (includeTax:true){\n                    price {\n                      ...MoneyFields\n                    }\n                    salePrice {\n                      ...MoneyFields\n                    }\n                    retailPrice {\n                      ...MoneyFields\n                    }\n                    basePrice {\n                        ...MoneyFields\n                        }\n                  }\n                 \n                }\n                }\n                }\n                \n                fragment MoneyFields on Money {\n                value\n                currencyCode\n                }";
          axios({
            url: '/graphql',
            method: 'post',
            contentType: "application/json",
            headers: {
              'Authorization': 'Bearer ' + BearerToken
            },
            data: {
              query: query
            }
          }).then(function (result) {
            var alldata = result.data.data.site.product;
            if (alldata != null) {
              var _webengage$track;
              p_id = alldata.entityId;
              p_name = alldata.name;
              if (alldata.prices.retailPrice != null) {
                mrp = alldata.prices.retailPrice.value;
              } else {
                mrp = alldata.prices.basePrice.value;
              }
              if (alldata.prices.salePrice != null) {
                discounted_price = alldata.prices.salePrice.value;
              } else {
                discounted_price = 0;
              }
              var category = alldata.categories.edges;
              var category_ID = [];
              var category_NAME = [];
              category.forEach(function (value, index) {
                category_ID.push(value.node.id);
                category_NAME.push(value.node.name);
              });
              var categories = {
                category_ID: category_ID,
                category_NAME: category_NAME
              };
              var category_id = '';
              var category_name = '';
              category.forEach(function (value, index) {
                if (category_id == '' && category_name == '') {
                  var cat_id = value.node.id;
                  var splited_url = atob(cat_id);
                  var categoryid = splited_url.split("Category:");
                  category_id = categoryid[1];
                  category_name = value.node.name;
                } else {
                  var splited_url = atob(value.node.id);
                  var categoryid = splited_url.split("Category:");
                  var catid = categoryid[1];
                  category_id = category_id + ',' + catid;
                  category_name = category_name + ',' + value.node.name;
                }
              });
              var products = [];
              var obj = {
                "Product_ID": p_id,
                "Product_Name": p_name,
                "categories": categories,
                "MRP": mrp,
                "Discount": discount,
                "Discount_Price": discounted_price,
                "Quantity": Quantity
              };
              products.push(obj);
              dataLayer.push({
                ecommerce: null
              }); // Clear the previous ecommerce object.
              dataLayer.push({
                'event': 'addToCart',
                'ecommerce': {
                  'currencyCode': 'INR',
                  'add': {
                    // 'add' actionFieldObject measures.
                    'products': [{
                      //  adding a product to a shopping cart.
                      'name': p_name,
                      'id': p_id,
                      'price': discounted_price,
                      'brand': 'Kapiva',
                      'quantity': Quantity
                    }]
                  }
                }
              });

              //////////////////////////////////////////Updated:Code Start GTM Code////////////////////////////////////////////////
              dataLayer.push({
                ecommerce: null
              }); // Clear the previous ecommerce object.
              dataLayer.push({
                'event': 'add_to_cart',
                'ecommerce': {
                  'items': {
                    // 'add' actionFieldObject measures.
                    'products': [{
                      //  adding a product to a shopping cart.
                      'item_name': p_name,
                      'item_id': pro_sku,
                      'currency': 'INR',
                      'price': discounted_price,
                      'item_brand': 'Kapiva',
                      'discount': pro_actual_price - pro_sale_price,
                      'item_category': document.getElementsByClassName("breadcrumb")[1].textContent.replace(/[\n\r\s\t]+/g, ''),
                      'item_category2': document.getElementsByClassName("breadcrumb")[2].textContent.replace(/[\n\r\s\t]+/g, ''),
                      'quantity': Quantity
                    }]
                  }
                }
              });
              ///////////////////////////////////////Updated:Code End GTM Code//////////////////////////////////////////////////

              fbq('track', 'AddToCart', {
                content_ids: p_id,
                content_type: 'product',
                value: discounted_price,
                currency: 'INR',
                quantity: Quantity
              });
              webengage.track("add to cart", (_webengage$track = {
                "Product_ID": p_id,
                "Product_Name": p_name,
                "Category_ID": category_id,
                "Category_Name": category_name,
                "MRP": Number(mrp),
                "Discount": discount,
                "Discount_Price": discounted_price,
                "Quantity": Quantity,
                "Total_Item_in_cart": total_item_in_cart,
                "Cart_value": cart_value
              }, _webengage$track["Total_Item_in_cart"] = total_item_in_cart, _webengage$track["Cart_value"] = cart_value, _webengage$track));
              var productObject = {
                "Product_ID": p_id,
                "Product_Name": p_name,
                "categories": categories,
                "price": mrp,
                "salePrice": discounted_price,
                "Quantity": Quantity
              };
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                addToCartProduct: productObject
              });
            }
          });
        });
      });
    }
    //end add to cart  and buynow webengage

    //add to cart product
    var x = document.getElementById("form-action-addToCart");
    x.addEventListener('click', function (e) {
      var totalcount = document.getElementsByClassName("form-input--incrementTotal")[0].value;
      if (totalcount > 0) {
        var Data = this;
        this.classList.add("sendloadingaddtocartpdp");
        var count = document.getElementsByClassName("cart-quantity")[0].textContent;
        //  document.getElementsByClassName("addTocartText")[0].textContent = "Added to cart";
        var pid = document.getElementsByClassName("product_id")[0].value;
        var dataid = document.getElementsByClassName("dataid")[0].value;
        e.preventDefault();
        var form = document.querySelector('[data-cart-item-add]');
        var formData = new FormData(form);
        axios({
          url: '/remote/v1/cart/add',
          method: 'post',
          dataType: 'json',
          data: formData
        }).then(function (result) {
          if (result.data.data.cart_item) {
            Data.classList.remove("sendloadingaddtocartpdp");
            if (count == 0) {
              document.getElementsByClassName("cart-icon")[0].click();
            }
            document.getElementsByClassName("cart-quantity")[0].textContent = parseInt(count) + parseInt(totalcount);
            document.getElementsByClassName("addTocartText")[0].textContent = "Add to cart";
            addtocartwebengage(pid);
          }
        });
      }
    });
    //end add to cart product

    var validator;

    // Init collapsible
    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_2__["default"])();
    this.productDetails = new _common_product_details__WEBPACK_IMPORTED_MODULE_3__["default"]($('.productView'), this.context, window.BCData.product_attributes);
    this.productDetails.setProductVariant();
    Object(_product_video_gallery__WEBPACK_IMPORTED_MODULE_4__["default"])();
    this.bulkPricingHandler();
    var $reviewForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["classifyForm"])('.writeReview-form');
    if ($reviewForm.length === 0) return;
    var review = new _product_reviews__WEBPACK_IMPORTED_MODULE_1__["default"]($reviewForm);
    $('body').on('click', '[data-reveal-id="modal-review-form"]', function () {
      validator = review.registerValidation(_this2.context);
      _this2.ariaDescribeReviewInputs($reviewForm);
    });
    $reviewForm.on('submit', function () {
      if (validator) {
        validator.performCheck();
        return validator.areAll('valid');
      }
      return false;
    });
    this.productReviewHandler();

    //Mobile search icon click

    var $containerHeight = screen.width;
    if ($containerHeight <= 800) {
      var MobileSearchIcon = document.getElementById("MobileSearchIcon");
      MobileSearchIcon.addEventListener('click', function (e) {
        document.getElementsByClassName("HeaderSearch")[0].toggle();
        document.querySelectorAll(".HeaderWrap .RighrtHeader-Wrap .HeaderSearch").toggle();
      });
    }
    //end Mobile search icon click
  };
  _proto.ariaDescribeReviewInputs = function ariaDescribeReviewInputs($form) {
    $form.find('[data-input]').each(function (_, input) {
      var $input = $(input);
      var msgSpanId = $input.attr('name') + "-msg";
      $input.siblings('span').attr('id', msgSpanId);
      $input.attr('aria-describedby', msgSpanId);
    });
  };
  _proto.productReviewHandler = function productReviewHandler() {
    if (this.url.indexOf('#write_review') !== -1) {
      this.$reviewLink.trigger('click');
    }
  };
  _proto.bulkPricingHandler = function bulkPricingHandler() {
    if (this.url.indexOf('#bulk_pricing') !== -1) {
      this.$bulkPricingLink.trigger('click');
    }
  };
  return Product;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product/reviews.js":
/*!********************************************!*\
  !*** ./assets/js/theme/product/reviews.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/models/forms */ "./assets/js/theme/common/models/forms.js");
/* harmony import */ var _common_utils_safe_string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils/safe-string */ "./assets/js/theme/common/utils/safe-string.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");





var _default = /*#__PURE__*/function () {
  function _default($reviewForm) {
    this.validator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_0__["default"])({
      submit: $reviewForm.find('input[type="submit"]'),
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_4__["announceInputErrorMessage"]
    });
    this.$reviewsContent = $('#product-reviews');
    this.$collapsible = $('[data-collapsible]', this.$reviewsContent);
    this.initLinkBind();
    this.injectPaginationLink();
    this.collapseReviews();
  }

  /**
   * On initial page load, the user clicks on "(12 Reviews)" link
   * The browser jumps to the review page and should expand the reviews section
   */
  var _proto = _default.prototype;
  _proto.initLinkBind = function initLinkBind() {
    var _this = this;
    var $content = $('#productReviews-content', this.$reviewsContent);
    $('#productReview_link').on('click', function () {
      $('.productView-reviewTabLink').trigger('click');
      if (!$content.hasClass('is-open')) {
        _this.$collapsible.trigger(_common_collapsible__WEBPACK_IMPORTED_MODULE_1__["CollapsibleEvents"].click);
      }
    });
  };
  _proto.collapseReviews = function collapseReviews() {
    // We're in paginating state, do not collapse
    if (window.location.hash && window.location.hash.indexOf('#product-reviews') === 0) {
      return;
    }

    // force collapse on page load
    this.$collapsible.trigger(_common_collapsible__WEBPACK_IMPORTED_MODULE_1__["CollapsibleEvents"].click);
  }

  /**
   * Inject ID into the pagination link
   */;
  _proto.injectPaginationLink = function injectPaginationLink() {
    var $nextLink = $('.pagination-item--next .pagination-link', this.$reviewsContent);
    var $prevLink = $('.pagination-item--previous .pagination-link', this.$reviewsContent);
    if ($nextLink.length) {
      $nextLink.attr('href', $nextLink.attr('href') + " #product-reviews");
    }
    if ($prevLink.length) {
      $prevLink.attr('href', $prevLink.attr('href') + " #product-reviews");
    }
  };
  _proto.registerValidation = function registerValidation(context) {
    this.context = context;
    this.validator.add([{
      selector: '[name="revrating"]',
      validate: 'presence',
      errorMessage: Object(_common_utils_safe_string__WEBPACK_IMPORTED_MODULE_3__["safeString"])(this.context.reviewRating)
    }, {
      selector: '[name="revtitle"]',
      validate: 'presence',
      errorMessage: Object(_common_utils_safe_string__WEBPACK_IMPORTED_MODULE_3__["safeString"])(this.context.reviewSubject)
    }, {
      selector: '[name="revtext"]',
      validate: 'presence',
      errorMessage: Object(_common_utils_safe_string__WEBPACK_IMPORTED_MODULE_3__["safeString"])(this.context.reviewComment)
    }, {
      selector: '.writeReview-form [name="email"]',
      validate: function validate(cb, val) {
        var result = _common_models_forms__WEBPACK_IMPORTED_MODULE_2__["default"].email(val);
        cb(result);
      },
      errorMessage: this.context.reviewEmail
    }]);
    return this.validator;
  };
  _proto.validate = function validate() {
    return this.validator.performCheck();
  };
  return _default;
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product/video-gallery.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/product/video-gallery.js ***!
  \**************************************************/
/*! exports provided: VideoGallery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoGallery", function() { return VideoGallery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return videoGallery; });
var VideoGallery = /*#__PURE__*/function () {
  function VideoGallery($element) {
    this.$player = $element.find('[data-video-player]');
    this.$videos = $element.find('[data-video-item]');
    this.currentVideo = {};
    this.bindEvents();
  }
  var _proto = VideoGallery.prototype;
  _proto.selectNewVideo = function selectNewVideo(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    this.currentVideo = {
      id: $target.data('videoId'),
      $selectedThumb: $target
    };
    this.setMainVideo();
    this.setActiveThumb();
  };
  _proto.setMainVideo = function setMainVideo() {
    this.$player.attr('src', "//www.youtube.com/embed/" + this.currentVideo.id);
  };
  _proto.setActiveThumb = function setActiveThumb() {
    this.$videos.removeClass('is-active');
    this.currentVideo.$selectedThumb.addClass('is-active');
  };
  _proto.bindEvents = function bindEvents() {
    this.$videos.on('click', this.selectNewVideo.bind(this));
  };
  return VideoGallery;
}();
function videoGallery() {
  var pluginKey = 'video-gallery';
  var $videoGallery = $("[data-" + pluginKey + "]");
  $videoGallery.each(function (index, element) {
    var $el = $(element);
    var isInitialized = $el.data(pluginKey) instanceof VideoGallery;
    if (isInitialized) {
      return;
    }
    $el.data(pluginKey, new VideoGallery($el));
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL3NhZmUtc3RyaW5nLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9wcm9kdWN0LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9wcm9kdWN0L3Jldmlld3MuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL3Byb2R1Y3QvdmlkZW8tZ2FsbGVyeS5qcyJdLCJuYW1lcyI6WyJzYWZlU3RyaW5nIiwic3RyIiwiZCIsIkRPTVBhcnNlciIsInBhcnNlRnJvbVN0cmluZyIsImJvZHkiLCJ0ZXh0Q29udGVudCIsIkJlYXJlclRva2VuIiwiUHJvZHVjdCIsImNvbnRleHQiLCJ1cmwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCIkcmV2aWV3TGluayIsIiQiLCIkYnVsa1ByaWNpbmdMaW5rIiwicmV2aWV3TW9kYWwiLCJtb2RhbEZhY3RvcnkiLCJiZWFyZXJUb2tlbiIsIm9uUmVhZHkiLCJwSWQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ2YWx1ZSIsIkNvdW50QWRkVG9DYXJ0Iiwic2V0aW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImxlbiIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJsZW5ndGgiLCJjbGVhckludGVydmFsIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiZGF0YSIsImdldGlkIiwiZm9yRWFjaCIsImtleSIsInBpZCIsInByb2R1Y3RJZCIsInF0eSIsInF1YW50aXR5IiwiY2xhc3NMaXN0IiwiYWRkIiwicGFyZW50RWxlbWVudCIsInlvdXR1YmUiLCJmYW5jeW9wZW4iLCJpIiwiaWQiLCJnZXRBdHRyaWJ1dGUiLCJzb3VyY2UiLCJzdHlsZSIsImJhY2tncm91bmRJbWFnZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXRBdHRyaWJ1dGUiLCJpZnJhbWUiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCJkYXRhTGF5ZXIiLCJwdXNoIiwidV9pZCIsInByb19pZCIsInF1ZXJ5U2VsZWN0b3IiLCJvbiIsImluZGV4T2YiLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwidGl0bGUiLCJwYXRobmFtZSIsInNvbHV0aW9uIiwic2xpY2UiLCJjYWxsIiwiZWwiLCJzb2wiLCJpbmdyZWRpZW50IiwiaW5ncmVkaWVudHMiLCJpbmdyZWRpZW50c3RhYiIsImluZyIsImRpc2NvdW50IiwiZGlzIiwidHJpbSIsInBfbmFtZSIsIm1ycCIsImRpc2NvdW50ZWRfcHJpY2UiLCJzaW1pbGFyX3Byb2R1Y3QiLCJpbWFnZSIsIlByb2R1Y3RfaW1hZ2VfVVJMIiwicXVlcnkiLCJheGlvcyIsIm1ldGhvZCIsImNvbnRlbnRUeXBlIiwiaGVhZGVycyIsInJlc3VsdCIsImFsbGRhdGEiLCJzaXRlIiwicHJvZHVjdCIsImRlZmF1bHRJbWFnZSIsInVybDY0MHdpZGUiLCJwYXRoIiwibmFtZSIsImludmVudG9yeSIsImFnZ3JlZ2F0ZWQiLCJhdmFpbGFibGVUb1NlbGwiLCJwcm9kdWN0X2RldGFpbHMiLCJwcmljZXMiLCJyZXRhaWxQcmljZSIsImJhc2VQcmljZSIsInNhbGVQcmljZSIsInJlbGF0ZWRQcm9kdWN0cyIsImVkZ2VzIiwicmVsYXRlZF9pZCIsImluZGV4Iiwibm9kZSIsImVudGl0eUlkIiwicmV2aWV3IiwicmV2aWV3cyIsIm51bSIsImNhdGVnb3J5IiwiY2F0ZWdvcmllcyIsImNhdGVnb3J5X2lkIiwiY2F0ZWdvcnlfbmFtZSIsImNhdF9pZCIsInNwbGl0ZWRfdXJsIiwiYXRvYiIsImNhdGVnb3J5aWQiLCJzcGxpdCIsImNhdGlkIiwiQ2F0ZWdvcnlfaWQiLCJDYXRlZ29yeV9uYW1lIiwiY19pZCIsIkNhdF9pZCIsImNhdF9uYW1lIiwic2V0VGltZW91dCIsImJlbmVmaXQiLCJPdmVydmlld1NsaWRlIiwicHJvZHVjdHMiLCJwcm9kdWN0QXJyYXkiLCJvYmoiLCJwcm9kdWN0X2FycmF5IiwicF9hcnJheSIsIkpTT04iLCJzdHJpbmdpZnkiLCJmaW5hbGRhdGEiLCJ3ZWJlbmdhZ2UiLCJ0cmFjayIsIk51bWJlciIsInBuYW1lIiwicHJpY2UiLCJwcm9kdWN0T2JqZWN0IiwicHJvZHVjdE5hbWUiLCJwcm9kdWN0UHJpY2UiLCJwcm9kdWN0U2FsZVByaWNlIiwicmVsYXRlZF9wcm9kdWN0cyIsInByaWNlX2FjdHVhbCIsInNhbGVfcHJpY2VfZGF0YSIsInByaWNlX2RhdGEiLCJyZXBsYWNlIiwic2FsZV9kYXRhIiwiZWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwic2VsZWN0b3IiLCJQcm9kdWN0X0lkIiwiUHJvZHVjdF9kZXRhaWxzIiwic2FsZV9wcmljZSIsImNhdGVnb3J5TmFtZSIsImNhdGVnb3J5SWQiLCJyZXZpZXdSYXRpbmciLCJ4IiwiZSIsInJldmlld0NvbW1lbnQiLCJhZGR0b2NhcnR3ZWJlbmdhZ2UiLCJ0b3RhbGNvdW50IiwiY291bnQiLCJwcm9fc2FsZV9wcmljZSIsInByb19hY3R1YWxfcHJpY2UiLCJnYV9kaXNjb3VudCIsInBfaWQiLCJRdWFudGl0eSIsInRvdGFsX2l0ZW1faW5fY2FydCIsImNhcnRfdmFsdWUiLCJwcm9fc2t1IiwiY2FydEFtb3VudCIsImxpbmVJdGVtcyIsInBoeXNpY2FsSXRlbXMiLCJnZXRxdWFudGl0eSIsInRvdGFsaXRlbXMiLCJza3UiLCJjYXRlZ29yeV9JRCIsImNhdGVnb3J5X05BTUUiLCJlY29tbWVyY2UiLCJmYnEiLCJjb250ZW50X2lkcyIsImNvbnRlbnRfdHlwZSIsImN1cnJlbmN5IiwiYWRkVG9DYXJ0UHJvZHVjdCIsIkRhdGEiLCJkYXRhaWQiLCJwcmV2ZW50RGVmYXVsdCIsImZvcm0iLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiZGF0YVR5cGUiLCJjYXJ0X2l0ZW0iLCJyZW1vdmUiLCJjbGljayIsInBhcnNlSW50IiwidmFsaWRhdG9yIiwiY29sbGFwc2libGVGYWN0b3J5IiwicHJvZHVjdERldGFpbHMiLCJQcm9kdWN0RGV0YWlscyIsIkJDRGF0YSIsInByb2R1Y3RfYXR0cmlidXRlcyIsInNldFByb2R1Y3RWYXJpYW50IiwidmlkZW9HYWxsZXJ5IiwiYnVsa1ByaWNpbmdIYW5kbGVyIiwiJHJldmlld0Zvcm0iLCJjbGFzc2lmeUZvcm0iLCJSZXZpZXciLCJyZWdpc3RlclZhbGlkYXRpb24iLCJhcmlhRGVzY3JpYmVSZXZpZXdJbnB1dHMiLCJwZXJmb3JtQ2hlY2siLCJhcmVBbGwiLCJwcm9kdWN0UmV2aWV3SGFuZGxlciIsIiRjb250YWluZXJIZWlnaHQiLCJzY3JlZW4iLCJ3aWR0aCIsIk1vYmlsZVNlYXJjaEljb24iLCJ0b2dnbGUiLCIkZm9ybSIsImZpbmQiLCJlYWNoIiwiXyIsImlucHV0IiwiJGlucHV0IiwibXNnU3BhbklkIiwiYXR0ciIsInNpYmxpbmdzIiwidHJpZ2dlciIsIlBhZ2VNYW5hZ2VyIiwibm9kIiwic3VibWl0IiwidGFwIiwiYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSIsIiRyZXZpZXdzQ29udGVudCIsIiRjb2xsYXBzaWJsZSIsImluaXRMaW5rQmluZCIsImluamVjdFBhZ2luYXRpb25MaW5rIiwiY29sbGFwc2VSZXZpZXdzIiwiJGNvbnRlbnQiLCJoYXNDbGFzcyIsIkNvbGxhcHNpYmxlRXZlbnRzIiwiaGFzaCIsIiRuZXh0TGluayIsIiRwcmV2TGluayIsInZhbGlkYXRlIiwiZXJyb3JNZXNzYWdlIiwicmV2aWV3U3ViamVjdCIsImNiIiwidmFsIiwiZm9ybXMiLCJlbWFpbCIsInJldmlld0VtYWlsIiwiVmlkZW9HYWxsZXJ5IiwiJGVsZW1lbnQiLCIkcGxheWVyIiwiJHZpZGVvcyIsImN1cnJlbnRWaWRlbyIsImJpbmRFdmVudHMiLCJzZWxlY3ROZXdWaWRlbyIsIiR0YXJnZXQiLCJjdXJyZW50VGFyZ2V0IiwiJHNlbGVjdGVkVGh1bWIiLCJzZXRNYWluVmlkZW8iLCJzZXRBY3RpdmVUaHVtYiIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJiaW5kIiwicGx1Z2luS2V5IiwiJHZpZGVvR2FsbGVyeSIs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QUFDMU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM2TSxjQUFjLENBQUNRLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUM1RCxDQUFDO0VBQUE7QUFBQTtBQUdVLFNBQVMvRCxZQUFZLEdBQUc7RUFDbkMsSUFBTWdFLFNBQVMsR0FBRyxlQUFlO0VBQ2pDLElBQU1DLGFBQWEsR0FBRzFRLENBQUMsWUFBVXlRLFNBQVMsT0FBSTtFQUU5Q0MsYUFBYSxDQUFDaEQsSUFBSSxDQUFDLFVBQUN2SCxLQUFLLEVBQUUrQyxPQUFPLEVBQUs7SUFDbkMsSUFBTXlILEdBQUcsR0FBRzNRLENBQUMsQ0FBQ2tKLE9BQU8sQ0FBQztJQUN0QixJQUFNMEgsYUFBYSxHQUFHRCxHQUFHLENBQUN0UCxJQUFJLENBQUNvUCxTQUFTLENBQUMsWUFBWWYsWUFBWTtJQUVqRSxJQUFJa0IsYUFBYSxFQUFFO01BQ2Y7SUFDSjtJQUVBRCxHQUFHLENBQUN0UCxJQUFJLENBQUNvUCxTQUFTLEVBQUUsSUFBSWYsWUFBWSxDQUFDaUIsR0FBRyxDQUFDLENBQUM7RUFDOUMsQ0FBQyxDQUFDO0FBQ04sQyIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuNC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBUaGlzIGZ1bmN0aW9uIHBhcnNlcyBIVE1MIGVudGl0aWVzIGluIHN0cmluZ3NcclxuICogQHBhcmFtIHN0cjogU3RyaW5nXHJcbiAqIEByZXR1cm5zIFN0cmluZ1xyXG4qL1xyXG5leHBvcnQgY29uc3Qgc2FmZVN0cmluZyA9IChzdHIpID0+IHtcclxuICAgIGNvbnN0IGQgPSBuZXcgRE9NUGFyc2VyKCk7XHJcbiAgICByZXR1cm4gZC5wYXJzZUZyb21TdHJpbmcoc3RyLCAndGV4dC9odG1sJykuYm9keS50ZXh0Q29udGVudDtcclxufTtcclxuIiwiLypcclxuIEltcG9ydCBhbGwgcHJvZHVjdCBzcGVjaWZpYyBqc1xyXG4gKi9cclxuaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4vcGFnZS1tYW5hZ2VyJztcclxuaW1wb3J0IFJldmlldyBmcm9tICcuL3Byb2R1Y3QvcmV2aWV3cyc7XHJcbmltcG9ydCBjb2xsYXBzaWJsZUZhY3RvcnkgZnJvbSAnLi9jb21tb24vY29sbGFwc2libGUnO1xyXG5pbXBvcnQgUHJvZHVjdERldGFpbHMgZnJvbSAnLi9jb21tb24vcHJvZHVjdC1kZXRhaWxzJztcclxuaW1wb3J0IHZpZGVvR2FsbGVyeSBmcm9tICcuL3Byb2R1Y3QvdmlkZW8tZ2FsbGVyeSc7XHJcbmltcG9ydCB7IGNsYXNzaWZ5Rm9ybSB9IGZyb20gJy4vY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMnO1xyXG5pbXBvcnQgbW9kYWxGYWN0b3J5IGZyb20gJy4vZ2xvYmFsL21vZGFsJztcclxuaW1wb3J0ICdvd2wuY2Fyb3VzZWwvZGlzdC9hc3NldHMvb3dsLmNhcm91c2VsLmNzcyc7XHJcbmltcG9ydCAnb3dsLmNhcm91c2VsL2Rpc3QvYXNzZXRzL293bC50aGVtZS5kZWZhdWx0Lm1pbi5jc3MnO1xyXG5pbXBvcnQgJ293bC5jYXJvdXNlbCc7XHJcblxyXG52YXIgQmVhcmVyVG9rZW4gPSAnJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZHVjdCBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcclxuICAgICAgICBzdXBlcihjb250ZXh0KTtcclxuICAgICAgICB0aGlzLnVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG4gICAgICAgIHRoaXMuJHJldmlld0xpbmsgPSAkKCdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1yZXZpZXctZm9ybVwiXScpO1xyXG4gICAgICAgIHRoaXMuJGJ1bGtQcmljaW5nTGluayA9ICQoJ1tkYXRhLXJldmVhbC1pZD1cIm1vZGFsLWJ1bGstcHJpY2luZ1wiXScpO1xyXG4gICAgICAgIHRoaXMucmV2aWV3TW9kYWwgPSBtb2RhbEZhY3RvcnkoJyNtb2RhbC1yZXZpZXctZm9ybScpWzBdO1xyXG4gICAgICAgIEJlYXJlclRva2VuID0gY29udGV4dC5iZWFyZXJUb2tlbjtcclxuICAgIH1cclxuXHJcbiAgICBvblJlYWR5KCkge1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICBcclxuICAgICAgICBsZXQgcElkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9kdWN0X2lkXCIpWzBdLnZhbHVlO1xyXG4gICAgICAgIC8vc2V0IGNvdW50IG9mIGFkZHRvY2FydFxyXG4gICAgICAgIENvdW50QWRkVG9DYXJ0KClcclxuICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIENvdW50QWRkVG9DYXJ0KCkge1xyXG4gICAgICAgICAgdmFyIHNldGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgbGVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImFkZF90b19jYXJ0X3Byb2R1Y3RcIikubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZiAobGVuID4gMCkge1xyXG4gICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoc2V0aW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAgIGZldGNoKCcvYXBpL3N0b3JlZnJvbnQvY2FydHM/aW5jbHVkZT0nLCB7XHJcbiAgICAgICAgICAgICAgICAnY3JlZGVudGlhbHMnOiAnaW5jbHVkZScsXHJcbiAgICAgICAgICAgICAgICAnaGVhZGVycyc6IHtcclxuICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5qc29uKCkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBnZXRpZCA9IGRhdGFbMF1bJ2xpbmVJdGVtcyddWydwaHlzaWNhbEl0ZW1zJ107XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICBnZXRpZC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgcGlkID0gdmFsdWUucHJvZHVjdElkO1xyXG4gICAgICAgICAgICAgICAgICAgICBpZihwSWQgPT0gcGlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgIHZhciBxdHkgPSB2YWx1ZS5xdWFudGl0eTtcclxuICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjY291bnRpbm5lcm1haW5cIilbMF0udGV4dENvbnRlbnQgPSBxdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2NvdW50aW5uZXJtYWluXCIpWzBdLmNsYXNzTGlzdC5hZGQoXCJmaWxsUERQQ291bnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2NvdW50aW5uZXJtYWluXCIpWzBdLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImZpbGwtUHJvZC1hZGQtdG8tY2FydFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSwgMjAwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgLy8gLy9waW5jb2RlXHJcbiAgICAgICAgICAgIC8vIHZhciB4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInN1Ym1pdFwiKTtcclxuICAgICAgICAgICAgLy8geFswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpeyAgICAgXHJcbiAgICAgICAgICAgIC8vICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsb2FkZXItaW1nJylbMF0uc3R5bGUuZGlzcGxheSA9J2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgICAgIC8vICAgICB2YXIgY29kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2lucHV0JylbMF0udmFsdWU7XHJcbiAgICAgICAgICAgIC8vICAgICBheGlvcy5nZXQoJ2h0dHBzOi8vYmctc3luYy1hcGktcHJvZC5rYXBpdmEuaW4vYXBpL2luZGV4LnBocCcsIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgcGluY29kZTogY29kZVxyXG4gICAgICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgIH0pXHJcbiAgICAgICAgICAgIC8vICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICB2YXIgZGF0YSA9IHJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHZhciBlcnJNZXNzYWdlID0gZGF0YS5kYXRhLmVkZF9zdGFtcDtcclxuICAgICAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhlcnJNZXNzYWdlKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGlmIChlcnJNZXNzYWdlICE9IG51bGwgJiYgZXJyTWVzc2FnZSAhPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgbGV0IHggPWRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Jlc3VsdC13cmFwJyk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgeFswXS5pbm5lckhUTUwgPSAnR2V0IGl0IGJ5ICcgKyAnPGRpdiBpZD1cImRpbHZlcnktZGF0ZVwiPicgKyBkYXRhWydkYXRhJ11bJ2VkZF9zdGFtcCddICsgJzwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBsZXQgeCA9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncmVzdWx0LXdyYXAnKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICB4WzBdLmlubmVySFRNTCA9ICc8ZGl2IGlkPVwiZGlsdmVyeS1kYXRlXCI+SW5jb3JyZWN0IFBpbmNvZGU8L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbG9hZGVyLWltZycpWzBdLnN0eWxlLmRpc3BsYXkgPSdub25lJztcclxuICAgICAgICAgICAgLy8gICAgIH0pXHJcbiAgICAgICAgICAgIC8vICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAvLyAgICAgfSlcclxuICAgICAgICAgICAgLy8gICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAvLyBhbHdheXMgZXhlY3V0ZWRcclxuICAgICAgICAgICAgLy8gICAgIH0pOyBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgeW91dHViZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2xpZGVyLXZpZGVvIC5oaWRkZW5nYWxsZXJ5XCIpO1xyXG4gICAgICAgICAgICB2YXIgZmFuY3lvcGVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9kdWN0Vmlldy10aHVtYm5haWxcIik7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeW91dHViZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlkID0geW91dHViZVtpXS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXZpZGVvLWlkXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNvdXJjZSA9IFwiaHR0cHM6Ly9pbWcueW91dHViZS5jb20vdmkvXCIgKyBpZCArIFwiL3NkZGVmYXVsdC5qcGdcIjtcclxuICAgICAgICAgICAgICAgICAgICB5b3V0dWJlW2ldLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKFwiK3NvdXJjZStcIilcIjsgXHJcbiAgICAgICAgICAgICAgICAgICAgeW91dHViZVtpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwiaHJlZlwiLFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvXCIraWQrXCI/b3JpZ2luPWh0dHBzOi8vd3d3LmthcGl2YS5pblwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCBcIjEwMCVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZShcImxvYWRpbmdcIiwgXCJsYXp5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBcIllvdVR1YmUgdmlkZW8gcGxheWVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoXCJmcmFtZWJvcmRlclwiLCBcIjBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZShcImFsbG93XCIsIFwiYWNjZWxlcm9tZXRlcjsgY2xpcGJvYXJkLXdyaXRlOyBlbmNyeXB0ZWQtbWVkaWE7IGd5cm9zY29wZTsgcGljdHVyZS1pbi1waWN0dXJlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoXCJhbGxvd2Z1bGxzY3JlZW5cIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwia2FwaXZhLWN1cnZlIGJpZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvXCIgK2lkKyBcIj9yZWw9MCZzaG93aW5mbz0wJmF1dG9wbGF5PTFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZmFuY3lvcGVuW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5oaWRkZW5nYWxsZXJ5XCIpWzBdLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKFwiK3NvdXJjZStcIilcIjsgXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5oaWRkZW5nYWxsZXJ5XCIpWzBdLnNldEF0dHJpYnV0ZShcImhyZWZcIixcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkL1wiK2lkK1wiP29yaWdpbj1odHRwczovL3d3dy5rYXBpdmEuaW5cIilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgICAgICAvL2VuZCBzdGlja3kgYWRkLXRvLWNhcnRcclxuXHJcbiAgICAgICAgLy9wYWdldmlldyBldmVudFxyXG4gICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIgPSB3aW5kb3cuZGF0YUxheWVyIHx8IFtdO1xyXG4gICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7XHJcbiAgICAgICAgJ3BhZ2UtdHlwZSc6ICdwZHAnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IHVfaWQ9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImN1c3RvbWVyX2lkXCIpWzBdLnZhbHVlO1xyXG4gICAgICAgIHZhciBwcm9faWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RpY2tleV9kYXRhJykuZ2V0QXR0cmlidXRlKFwic2t1XCIpO1xyXG4gICAgICAgICBcclxuICAgICAgICAvLyBMaXN0ZW4gZm9yIGZvdW5kYXRpb24gbW9kYWwgY2xvc2UgZXZlbnRzIHRvIHNhbml0aXplIFVSTCBhZnRlciByZXZpZXcuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2Nsb3NlLmZuZHRuLnJldmVhbCcsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudXJsLmluZGV4T2YoJyN3cml0ZV9yZXZpZXcnKSAhPT0gLTEgJiYgdHlwZW9mIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIGRvY3VtZW50LnRpdGxlLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgIFxyXG4gICAgICAgICBcclxuICAgICAgICAgIC8vd2ViZW5nYWdlIGZvciBwcm9kdWN0IHZpZXdcclxuICAgICAgICAgIHZhciBzb2x1dGlvbiA9IFtdO1xyXG4gICAgICAgICAgdmFyIHNvbHV0aW9uID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzb2x1dGlvbicpLCAwKTtcclxuICAgICAgICAgIHNvbHV0aW9uLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcblxyXG4gICAgICAgICAgdmFyIHNvbCA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgICBzb2x1dGlvbi5wdXNoKHNvbCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgdmFyIGluZ3JlZGllbnQgPSBbXTtcclxuICAgICAgICAgIHZhciBpbmdyZWRpZW50cyA9ICcnO1xyXG4gICAgICAgICAgbGV0IGluZ3JlZGllbnRzdGFiID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbmdyZWRpZW50cy10YWItaGVhZGVyIGxpXCIpO1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmdyZWRpZW50c3RhYi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgdmFyIGluZyA9IGluZ3JlZGllbnRzdGFiW2ldLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgaW5ncmVkaWVudC5wdXNoKGluZyk7XHJcbiAgICAgICAgICBpZihpbmdyZWRpZW50cyA9PSAnJyl7XHJcbiAgICAgICAgICAgICAgaW5ncmVkaWVudHMgPSBpbmc7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICBpbmdyZWRpZW50cyA9IGluZ3JlZGllbnRzKycsJytpbmc7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgdmFyIHByb19pZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzdGlja2V5X2RhdGFcIilbMF0uZ2V0QXR0cmlidXRlKCdpZCcpO1xyXG4gICAgICAgICAgdmFyIGRpc2NvdW50ID0gJyc7XHJcbiAgICAgICAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2R1Y3RWaWV3LWltYWdlLW1haW4gLnByb2R1Y3RWaWV3LWltYWdlIC5zYWxlU2F2aW5nVGFnXCIpLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgdmFyIGRpcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvZHVjdFZpZXctaW1hZ2UtbWFpbiAucHJvZHVjdFZpZXctaW1hZ2UgLnNhbGVTYXZpbmdUYWdcIilbMF0udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICBkaXNjb3VudCA9IGRpcy50cmltKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgcF9uYW1lID0gJyc7XHJcbiAgICAgICAgICB2YXIgbXJwID0gJyc7XHJcbiAgICAgICAgICB2YXIgZGlzY291bnRlZF9wcmljZSA9ICcnO1xyXG4gICAgICAgICAgdmFyIHNpbWlsYXJfcHJvZHVjdCA9ICcnO1xyXG4gICAgICAgICAgdmFyIGltYWdlID0gJyc7XHJcbiAgICAgICAgICB2YXIgdXJsID0gJyc7XHJcbiAgICAgICAgICB2YXIgUHJvZHVjdF9pbWFnZV9VUkwgPSAnJztcclxuICAgICAgICAgIHZhciBxdWVyeSA9IGBxdWVyeSBwcm9kdWN0QnlJZHtcclxuICAgICAgICAgIHNpdGUge1xyXG4gICAgICAgICAgcHJvZHVjdChlbnRpdHlJZDogYCsgcHJvX2lkICsgYCkge1xyXG4gICAgICAgICAgZW50aXR5SWRcclxuICAgICAgICAgIG5hbWVcclxuICAgICAgICAgIHBhdGhcclxuICAgICAgICAgIGludmVudG9yeXtcclxuICAgICAgICAgICAgICBpc0luU3RvY2tcclxuICAgICAgICAgICAgICBhZ2dyZWdhdGVke1xyXG4gICAgICAgICAgICAgIGF2YWlsYWJsZVRvU2VsbFxyXG4gICAgICAgICAgICAgIHdhcm5pbmdMZXZlbFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNhdGVnb3JpZXNcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBlZGdlc1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBub2RlXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBpZFxyXG4gICAgICAgICAgICAgICAgICBuYW1lXHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmVsYXRlZFByb2R1Y3RzXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgZWRnZXN7XHJcbiAgICAgICAgICAgICAgbm9kZXtcclxuICAgICAgICAgICAgICAgICAgZW50aXR5SWRcclxuICAgICAgICAgICAgICAgICAgbmFtZVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXZpZXdze1xyXG4gICAgICAgICAgICAgIGVkZ2Vze1xyXG4gICAgICAgICAgICAgIG5vZGV7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlXHJcbiAgICAgICAgICAgICAgICAgIHRleHRcclxuICAgICAgICAgICAgICAgICAgcmF0aW5nXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHBsYWluVGV4dERlc2NyaXB0aW9uXHJcbiAgICAgICAgICBkZWZhdWx0SW1hZ2Uge1xyXG4gICAgICAgICAgICAgIC4uLkltYWdlRmllbGRzXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpbWFnZXMge1xyXG4gICAgICAgICAgICAgIGVkZ2VzIHtcclxuICAgICAgICAgICAgICBub2RlIHtcclxuICAgICAgICAgICAgICAgICAgLi4uSW1hZ2VGaWVsZHNcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV2aWV3U3VtbWFyeSB7XHJcbiAgICAgICAgICAgICAgc3VtbWF0aW9uT2ZSYXRpbmdzXHJcbiAgICAgICAgICAgICAgbnVtYmVyT2ZSZXZpZXdzXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBwcmljZXMgKGluY2x1ZGVUYXg6dHJ1ZSl7XHJcbiAgICAgICAgICAgICAgcHJpY2Uge1xyXG4gICAgICAgICAgICAgIC4uLk1vbmV5RmllbGRzXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHNhbGVQcmljZSB7XHJcbiAgICAgICAgICAgICAgLi4uTW9uZXlGaWVsZHNcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgcmV0YWlsUHJpY2Uge1xyXG4gICAgICAgICAgICAgIC4uLk1vbmV5RmllbGRzXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJhc2VQcmljZSB7XHJcbiAgICAgICAgICAgICAgICAuLi5Nb25leUZpZWxkc1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZnJhZ21lbnQgSW1hZ2VGaWVsZHMgb24gSW1hZ2Uge1xyXG5cclxuICAgICAgICAgIHVybDY0MHdpZGU6IHVybCh3aWR0aDogNjQwKVxyXG5cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBmcmFnbWVudCBNb25leUZpZWxkcyBvbiBNb25leSB7XHJcbiAgICAgICAgICB2YWx1ZVxyXG4gICAgICAgICAgY3VycmVuY3lDb2RlXHJcbiAgICAgICAgICB9YDtcclxuXHJcbiAgICAgICAgICBheGlvcyh7XHJcbiAgICAgICAgICAgICAgdXJsOiAnL2dyYXBocWwnLFxyXG4gICAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIEJlYXJlclRva2VuXHJcbiAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIHF1ZXJ5OnF1ZXJ5XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS50aGVuKChyZXN1bHQpID0+IHsgICAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIGFsbGRhdGEgPSByZXN1bHQuZGF0YS5kYXRhLnNpdGUucHJvZHVjdDtcclxuICAgICAgICAgICAgICBpZiAoYWxsZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgaW1hZ2UgPSBhbGxkYXRhLmRlZmF1bHRJbWFnZS51cmw2NDB3aWRlO1xyXG4gICAgICAgICAgICAgIHVybCA9IGFsbGRhdGEucGF0aDtcclxuICAgICAgICAgICAgICBwX25hbWUgPSBhbGxkYXRhLm5hbWU7XHJcbiAgICAgICAgICAgICAgaWYoYWxsZGF0YS5pbnZlbnRvcnkuYWdncmVnYXRlZCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgIHZhciBxdWFudGl0eSA9IGFsbGRhdGEuaW52ZW50b3J5LmFnZ3JlZ2F0ZWQuYXZhaWxhYmxlVG9TZWxsO1xyXG4gICAgICAgICAgICAgIHZhciBwcm9kdWN0X2RldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicHJvZHVjdF9kZXRhaWxzXCIpWzBdO1xyXG4gICAgICAgICAgICAgICAgICBwcm9kdWN0X2RldGFpbHMuc2V0QXR0cmlidXRlKFwicXVhbnRpdHlcIixxdWFudGl0eSk7XHJcbiAgICAgICAgICAgICAgaWYgKGFsbGRhdGEucHJpY2VzLnJldGFpbFByaWNlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgbXJwID0gYWxsZGF0YS5wcmljZXMucmV0YWlsUHJpY2UudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgIHByb2R1Y3RfZGV0YWlscy5zZXRBdHRyaWJ1dGUoXCJwcmljZVwiLG1ycCk7XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbXJwID0gYWxsZGF0YS5wcmljZXMuYmFzZVByaWNlLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgcHJvZHVjdF9kZXRhaWxzLnNldEF0dHJpYnV0ZShcInByaWNlXCIsbXJwKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYgKGFsbGRhdGEucHJpY2VzLnNhbGVQcmljZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgIGRpc2NvdW50ZWRfcHJpY2UgPSBhbGxkYXRhLnByaWNlcy5zYWxlUHJpY2UudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICBwcm9kdWN0X2RldGFpbHMuc2V0QXR0cmlidXRlKFwic2FsZV9wcmljZVwiLGRpc2NvdW50ZWRfcHJpY2UpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBQcm9kdWN0X2ltYWdlX1VSTCA9IGFsbGRhdGEuZGVmYXVsdEltYWdlLnVybDY0MHdpZGU7XHJcblxyXG5cclxuICAgICAgICAgICAgICB2YXIgZGF0YSA9IGFsbGRhdGEucmVsYXRlZFByb2R1Y3RzLmVkZ2VzO1xyXG4gICAgICAgICAgICAgIHZhciByZWxhdGVkX2lkID0gW107XHJcbiAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIHJlbGF0ZWRfaWQucHVzaCh2YWx1ZS5ub2RlLmVudGl0eUlkKTtcclxuXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICBzaW1pbGFyX3Byb2R1Y3QgPSByZWxhdGVkX2lkO1xyXG4gICAgICAgICAgICAgIHZhciByZXZpZXcgPSBhbGxkYXRhLnJldmlld3MuZWRnZXM7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgdmFyIHJldmlld3MgPSBbXTtcclxuICAgICAgICAgICAgICBpZiAocmV2aWV3Lmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBudW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICBpZiAocmV2aWV3Lmxlbmd0aCA+IGkpXHJcbiAgICAgICAgICAgICAgICAgICAgICByZXZpZXdzLnB1c2gocmV2aWV3W2ldLm5vZGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB2YXIgY2F0ZWdvcnkgPSBhbGxkYXRhLmNhdGVnb3JpZXMuZWRnZXM7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgdmFyIGNhdGVnb3J5X2lkID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2F0ZWdvcnlfbmFtZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnkuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2F0ZWdvcnlfaWQgPT0gJycgJiYgY2F0ZWdvcnlfbmFtZSA9PSAnJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYXRfaWQgPSB2YWx1ZS5ub2RlLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3BsaXRlZF91cmwgPSBhdG9iKGNhdF9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYXRlZ29yeWlkID0gc3BsaXRlZF91cmwuc3BsaXQoXCJDYXRlZ29yeTpcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5X2lkID0gY2F0ZWdvcnlpZFsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnlfbmFtZSA9IHZhbHVlLm5vZGUubmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3BsaXRlZF91cmwgPSBhdG9iKHZhbHVlLm5vZGUuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2F0ZWdvcnlpZD0gc3BsaXRlZF91cmwuc3BsaXQoXCJDYXRlZ29yeTpcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYXRpZCA9IGNhdGVnb3J5aWRbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5X2lkID0gY2F0ZWdvcnlfaWQrJywnK2NhdGlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeV9uYW1lID0gY2F0ZWdvcnlfbmFtZSsnLCcrdmFsdWUubm9kZS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIHZhciBDYXRlZ29yeV9pZCA9IFtdO1xyXG4gICAgICAgICAgICAgIHZhciBDYXRlZ29yeV9uYW1lID0gW107XHJcbiAgICAgICAgICAgICAgY2F0ZWdvcnkuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBjX2lkID0gdmFsdWUubm9kZS5pZDtcclxuICAgICAgICAgICAgICAgICAgdmFyIHNwbGl0ZWRfdXJsID0gYXRvYihjX2lkKTtcclxuICAgICAgICAgICAgICAgICAgdmFyIGNhdGlkID0gc3BsaXRlZF91cmwuc3BsaXQoXCJDYXRlZ29yeTpcIik7ICBcclxuICAgICAgICAgICAgICAgICAgdmFyIENhdF9pZCA9IGNhdGlkWzFdO1xyXG4gICAgICAgICAgICAgICAgICB2YXIgY2F0X25hbWUgPSB2YWx1ZS5ub2RlLm5hbWVcclxuICAgICAgICAgICAgICAgICAgQ2F0ZWdvcnlfaWQucHVzaChDYXRfaWQpO1xyXG4gICAgICAgICAgICAgICAgICBDYXRlZ29yeV9uYW1lLnB1c2goY2F0X25hbWUpO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgdmFyIGNhdGVnb3JpZXMgPSB7IENhdGVnb3J5X2lkLCBDYXRlZ29yeV9uYW1lIH07XHJcbiAgICAgICAgICAgICAgcHJvZHVjdF9kZXRhaWxzLnNldEF0dHJpYnV0ZShcImNhdGVnb3J5X2lkXCIsY2F0ZWdvcnlfaWQpO1xyXG4gICAgICAgICAgICAgIHByb2R1Y3RfZGV0YWlscy5zZXRBdHRyaWJ1dGUoXCJjYXRlZ29yeV9uYW1lXCIsY2F0ZWdvcnlfbmFtZSk7XHJcbiAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IFxyXG4gICAgICAgICAgICAgICAgICB2YXIgYmVuZWZpdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICBsZXQgT3ZlcnZpZXdTbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuT3ZlcnZpZXdTbGlkZS5zbGljay1hY3RpdmUgLmNvbnRlbnQgdWwgbGlcIik7XHJcbiAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgT3ZlcnZpZXdTbGlkZS5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgYmVuZWZpdC5wdXNoKE92ZXJ2aWV3U2xpZGVbaV0udGV4dENvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgIHZhciBwcm9kdWN0cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICB2YXIgcHJvZHVjdEFycmF5ID0gW107XHJcbiAgICAgICAgICAgICAgICAgIHZhciBvYmogPSB7XHJcbiAgICAgICAgICAgICAgICAgIFwiUHJvZHVjdF9pZFwiOiBhbGxkYXRhLmVudGl0eUlkLFxyXG4gICAgICAgICAgICAgICAgICBcIlByb2R1Y3RfbmFtZVwiOiBwX25hbWUsXHJcbiAgICAgICAgICAgICAgICAgIFwiQ2F0ZWdvcnlfaWRcIjogY2F0ZWdvcnlfaWQsXHJcbiAgICAgICAgICAgICAgICAgIFwiQ2F0ZWdvcnlfbmFtZVwiOiBjYXRlZ29yeV9uYW1lLFxyXG4gICAgICAgICAgICAgICAgICBcIk1SUFwiOiBtcnAsXHJcbiAgICAgICAgICAgICAgICAgIFwiRGlzY291bnRcIjogZGlzY291bnQsXHJcbiAgICAgICAgICAgICAgICAgIFwiRGlzY291bnRfUHJpY2VcIjogZGlzY291bnRlZF9wcmljZSxcclxuICAgICAgICAgICAgICAgICAgXCJQcm9kdWN0X3VybFwiOiB1cmwsXHJcbiAgICAgICAgICAgICAgICAgIFwiSW1hZ2VfdXJsXCI6IGltYWdlLFxyXG4gICAgICAgICAgICAgICAgICBcIlByb2R1Y3RfSW5ncmVkaWVudFwiOiBpbmdyZWRpZW50c1xyXG4gICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICB2YXIgcHJvZHVjdF9hcnJheSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQcm9kdWN0X2lkXCI6IGFsbGRhdGEuZW50aXR5SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUHJvZHVjdF9uYW1lXCI6IHBfbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjYXRlZ29yaWVzXCI6IGNhdGVnb3JpZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTVJQXCI6IG1ycCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJEaXNjb3VudFwiOiBkaXNjb3VudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJEaXNjb3VudF9QcmljZVwiOiBkaXNjb3VudGVkX3ByaWNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlByb2R1Y3RfdXJsXCI6IHVybCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJJbWFnZV91cmxcIjogaW1hZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUHJvZHVjdF9yZXZpZXdzKFRvcCAzKVwiOiByZXZpZXdzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlByb2R1Y3RfSW5ncmVkaWVudFwiOiBpbmdyZWRpZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdEFycmF5LnB1c2gocHJvZHVjdF9hcnJheSk7XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICBwcm9kdWN0cy5wdXNoKG9iaik7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBwX2FycmF5ID0gSlNPTi5zdHJpbmdpZnkocHJvZHVjdEFycmF5KTtcclxuICAgICAgICAgICAgICAgICAgdmFyIGZpbmFsZGF0YSA9IEpTT04uc3RyaW5naWZ5KHByb2R1Y3RzKTtcclxuICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIHdlYmVuZ2FnZS50cmFjayhcIlByb2R1Y3QgVmlld2VkXCIsIHtcclxuICAgICAgICAgICAgICAgICAgXCJQcm9kdWN0c1wiOiBwcm9kdWN0cyxcclxuICAgICAgICAgICAgICAgICAgXCJQcm9kdWN0QXJyYXlcIjogcHJvZHVjdEFycmF5LFxyXG4gICAgICAgICAgICAgICAgICBcIlByb2R1Y3RfTmFtZVwiOiBwX25hbWUsXHJcbiAgICAgICAgICAgICAgICAgIFwiQ2F0ZWdvcnlfSURcIjogY2F0ZWdvcnlfaWQsXHJcbiAgICAgICAgICAgICAgICAgIFwiQ2F0ZWdvcnlfTmFtZVwiOiBjYXRlZ29yeV9uYW1lLFxyXG4gICAgICAgICAgICAgICAgICBcIlByb2R1Y3RfSURcIjogYWxsZGF0YS5lbnRpdHlJZCxcclxuICAgICAgICAgICAgICAgICAgXCJNUlBcIjogTnVtYmVyKG1ycCksXHJcbiAgICAgICAgICAgICAgICAgIFwiRGlzY291bnRcIjogZGlzY291bnQsXHJcbiAgICAgICAgICAgICAgICAgIFwiRGlzY291bnRfUHJpY2VcIjogTnVtYmVyKGRpc2NvdW50ZWRfcHJpY2UpLFxyXG4gICAgICAgICAgICAgICAgICBcIlByb2R1Y3QgcmV2aWV3cyAoVG9wIDMpXCI6IHJldmlld3MsXHJcbiAgICAgICAgICAgICAgICAgIFwiUHJvZHVjdF9JbmdyZWRpZW50XCI6IGluZ3JlZGllbnQsXHJcbiAgICAgICAgICAgICAgICAgIFwiUHJvZHVjdF9CZW5lZml0XCI6IGJlbmVmaXQsXHJcbiAgICAgICAgICAgICAgICAgIFwiU2ltaWxhcl9wcm9kdWN0c1wiOiBzaW1pbGFyX3Byb2R1Y3QsXHJcbiAgICAgICAgICAgICAgICAgIFwiUHJvZHVjdF9pbWFnZV9VUkxcIjogUHJvZHVjdF9pbWFnZV9VUkxcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfSwgMjAwMCk7XHJcblxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgdmFyIHBpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzdGlja2V5X2RhdGFcIilbMF0uZ2V0QXR0cmlidXRlKFwiaWRcIik7XHJcbiAgICAgICAgICB2YXIgcG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic3RpY2tleV9kYXRhXCIpWzBdLmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xyXG4gICAgICAgICAgdmFyIHByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInN0aWNrZXlfZGF0YVwiKVswXS5nZXRBdHRyaWJ1dGUoXCJhY3R1YWxfcHJpY2VcIik7XHJcbiAgICAgICAgICB2YXIgc2FsZVByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInN0aWNrZXlfZGF0YVwiKVswXS5nZXRBdHRyaWJ1dGUoXCJzYWxlX3ByaWNlXCIpO1xyXG4gICAgICAgICAgdmFyIHByb2R1Y3RPYmplY3QgPXtcclxuICAgICAgICAgICAgICBwcm9kdWN0SWQgOiBwaWQsXHJcbiAgICAgICAgICAgICAgcHJvZHVjdE5hbWUgOiBwbmFtZSxcclxuICAgICAgICAgICAgICBwcm9kdWN0UHJpY2UgOiBwcmljZSxcclxuICAgICAgICAgICAgICBwcm9kdWN0U2FsZVByaWNlIDogc2FsZVByaWNlLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHZhciBwcm9kdWN0cyA9IFtdO1xyXG4gICAgICAgICAgbGV0IHJlbGF0ZWRfcHJvZHVjdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicmVsYXRlZF9wcm9kdWN0c1wiKTtcclxuICAgICAgICAgIGlmKHJlbGF0ZWRfcHJvZHVjdHMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICByZWxhdGVkX3Byb2R1Y3RzWzBdLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBpbmRleCkge1xyXG4gIFxyXG4gICAgICAgICAgdmFyIHByaWNlX2FjdHVhbCA9IHZhbHVlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3ByaWNlLS1ub24tc2FsZScpWzBdLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgdmFyIHNhbGVfcHJpY2VfZGF0YSA9IHZhbHVlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3ByaWNlLS1hY3R1YWwnKVswXS50ZXh0Q29udGVudDtcclxuICAgICAgICAgIGlmKHByaWNlX2FjdHVhbCAhPSAnJyl7XHJcbiAgICAgICAgICB2YXIgcHJpY2VfZGF0YSA9IHByaWNlX2FjdHVhbC5zcGxpdChcIuKCuVwiKTtcclxuICAgICAgICAgIHZhciBwcmljZSA9IHByaWNlX2RhdGFbMV0ucmVwbGFjZShcIixcIixcIlwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZhciBzYWxlX2RhdGEgPSBzYWxlX3ByaWNlX2RhdGEuc3BsaXQoXCLigrlcIik7XHJcbiAgICAgICAgICB2YXIgc2FsZVByaWNlID0gc2FsZV9kYXRhWzFdLnJlcGxhY2UoXCIsXCIsXCJcIik7XHJcbiAgICAgICAgICB2YXIgb2JqID0ge1xyXG4gICAgICAgICAgXCJwcm9kdWN0X2lkXCIgOiB2YWx1ZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwcmljZS0tYWN0dWFsJylbMF0uZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9kdWN0LWlkXCIpLFxyXG4gICAgICAgICAgXCJuYW1lXCIgOiB2YWx1ZS5xdWVyeVNlbGVjdG9yQWxsKFwiLmNhcmQgLmNhcmQtYm9keSAuY2FyZC10aXRsZSBhXCIpWzBdLnRleHRDb250ZW50LFxyXG4gICAgICAgICAgXCJwcmljZVwiIDogcHJpY2UsXHJcbiAgICAgICAgICBcInNhbGVQcmljZVwiIDogc2FsZVByaWNlXHJcbiAgICAgICAgICBcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBwcm9kdWN0cy5wdXNoKG9iaik7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvL2VuZCB3ZWJlbmdhZ2UgZm9yIHByb2R1Y3Qgdmlld1xyXG5cclxuICAgICAgXHJcbiAgICAgICAgLy9hZGQgcmF0aW5nXHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhdGluZy1yYXRlXCIpO1xyXG4gICAgICAgaWYoZWxlbWVudCAhPSBudWxsKXtcclxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxldCBzZWxlY3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGlja2V5X2RhdGEnKTtcclxuICAgICAgICAgICAgbGV0IFByb2R1Y3RfSWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLlByb2R1Y3RfSWRcIik7XHJcbiAgICAgICAgICAgIGxldCBQcm9kdWN0X2RldGFpbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2R1Y3RfZGV0YWlsc1wiKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gc2VsZWN0b3IuZ2V0QXR0cmlidXRlKCd0aXRsZScpOyAgXHJcbiAgICAgICAgICAgIGxldCBwaWQgPSBQcm9kdWN0X0lkLnZhbHVlO1xyXG4gICAgICAgICAgICBsZXQgcXVhbnRpdHkgPSBQcm9kdWN0X2RldGFpbHMuZ2V0QXR0cmlidXRlKFwicXVhbnRpdHlcIik7XHJcbiAgICAgICAgICAgIGxldCBwcmljZSA9IFByb2R1Y3RfZGV0YWlscy5nZXRBdHRyaWJ1dGUoXCJwcmljZVwiKTtcclxuICAgICAgICAgICAgbGV0IHNhbGVfcHJpY2UgPSBQcm9kdWN0X2RldGFpbHMuZ2V0QXR0cmlidXRlKFwic2FsZV9wcmljZVwiKTtcclxuICAgICAgICAgICAgbGV0IGNhdGVnb3J5X25hbWUgPSBQcm9kdWN0X2RldGFpbHMuZ2V0QXR0cmlidXRlKFwiY2F0ZWdvcnlfbmFtZVwiKTtcclxuICAgICAgICAgICAgbGV0IGNhdGVnb3J5TmFtZSA9IFtjYXRlZ29yeV9uYW1lXTtcclxuICAgICAgICAgICAgbGV0IGNhdGVnb3J5X2lkID0gUHJvZHVjdF9kZXRhaWxzLmdldEF0dHJpYnV0ZShcImNhdGVnb3J5X2lkXCIpO1xyXG4gICAgICAgICAgICBsZXQgY2F0ZWdvcnlJZCA9IFtjYXRlZ29yeV9pZF07XHJcbiAgICAgICAgICAgIGxldCBjYXRlZ29yaWVzID0ge2NhdGVnb3J5SWQsY2F0ZWdvcnlOYW1lfTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHsgJ05hbWUnOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3Byb2R1Y3RfaWQnIDogcGlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdwcmljZScgOiBwcmljZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAnc2FsZV9wcmljZScgOiBzYWxlX3ByaWNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdxdWFudGl0eScgOiBxdWFudGl0eSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAnY2F0ZWdvcmllcycgOiBjYXRlZ29yaWVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICB3aW5kb3cuZGF0YUxheWVyID0gd2luZG93LmRhdGFMYXllciB8fCBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe3Jldmlld1JhdGluZyA6IGRhdGF9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgICAgICAgLy9lbmQgYWRkIHJhdGluZ1xyXG5cclxuICAgICAgICAvL3N1Ym1pdCByZXZpZXdcclxuICAgICAgICB2YXIgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzdWJtaXQtLXJldmlld1wiKTtcclxuICAgICAgICBpZih4Lmxlbmd0aCAhPSAwKXtcclxuICAgICAgICB4WzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHNlbGVjdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0aWNrZXlfZGF0YScpO1xyXG4gICAgICAgICAgICBsZXQgUHJvZHVjdF9JZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuUHJvZHVjdF9JZFwiKTtcclxuICAgICAgICAgICAgbGV0IFByb2R1Y3RfZGV0YWlscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZHVjdF9kZXRhaWxzXCIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IG5hbWUgPSBzZWxlY3Rvci5nZXRBdHRyaWJ1dGUoJ3RpdGxlJyk7ICBcclxuICAgICAgICAgICAgbGV0IHBpZCA9IFByb2R1Y3RfSWQudmFsdWU7XHJcbiAgICAgICAgICAgIGxldCBxdWFudGl0eSA9IFByb2R1Y3RfZGV0YWlscy5nZXRBdHRyaWJ1dGUoXCJxdWFudGl0eVwiKTtcclxuICAgICAgICAgICAgbGV0IHByaWNlID0gUHJvZHVjdF9kZXRhaWxzLmdldEF0dHJpYnV0ZShcInByaWNlXCIpO1xyXG4gICAgICAgICAgICBsZXQgc2FsZV9wcmljZSA9IFByb2R1Y3RfZGV0YWlscy5nZXRBdHRyaWJ1dGUoXCJzYWxlX3ByaWNlXCIpO1xyXG4gICAgICAgICAgICBsZXQgY2F0ZWdvcnlfbmFtZSA9IFByb2R1Y3RfZGV0YWlscy5nZXRBdHRyaWJ1dGUoXCJjYXRlZ29yeV9uYW1lXCIpO1xyXG4gICAgICAgICAgICBsZXQgY2F0ZWdvcnlOYW1lID0gW2NhdGVnb3J5X25hbWVdO1xyXG4gICAgICAgICAgICBsZXQgY2F0ZWdvcnlfaWQgPSBQcm9kdWN0X2RldGFpbHMuZ2V0QXR0cmlidXRlKFwiY2F0ZWdvcnlfaWRcIik7XHJcbiAgICAgICAgICAgIGxldCBjYXRlZ29yeUlkID0gW2NhdGVnb3J5X2lkXTtcclxuICAgICAgICAgICAgbGV0IGNhdGVnb3JpZXMgPSB7Y2F0ZWdvcnlJZCxjYXRlZ29yeU5hbWV9O1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgbGV0IGRhdGEgPSB7ICdOYW1lJzogbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3Byb2R1Y3RfaWQnIDogcGlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3ByaWNlJyA6IHByaWNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3NhbGVfcHJpY2UnIDogc2FsZV9wcmljZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICdxdWFudGl0eScgOiBxdWFudGl0eSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICdjYXRlZ29yaWVzJyA6IGNhdGVnb3JpZXNcclxuICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgIHZhciBsZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZvcm0tZmllbGQtLWVycm9yXCIpLmxlbmd0aDtcclxuICAgICAgICAgICBpZihsZW4gPT0gMCl7XHJcbiAgICAgICAgICB3aW5kb3cuZGF0YUxheWVyID0gd2luZG93LmRhdGFMYXllciB8fCBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7cmV2aWV3Q29tbWVudCA6IGRhdGF9KTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgICAgfSwxMDAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgICAgICAvL2VuZCBzdWJtaXQgcmV2aWV3XHJcbiAgICAgICBcclxuICAgICAgICAgLy9hZGQgdG8gY2FydCAgYW5kIGJ1eW5vdyB3ZWJlbmdhZ2VcclxuICAgICBmdW5jdGlvbiBhZGR0b2NhcnR3ZWJlbmdhZ2UocGlkKSB7XHJcbiAgICAgICAgdmFyIHRvdGFsY291bnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZm9ybS1pbnB1dC0taW5jcmVtZW50VG90YWxcIilbMF0udmFsdWU7XHJcbiAgICAgICAgdmFyIGNvdW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNhcnQtcXVhbnRpdHlcIilbMF0udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgdmFyIHByb19zYWxlX3ByaWNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGlja2V5X2RhdGFcIikuZ2V0QXR0cmlidXRlKFwic2FsZV9wcmljZVwiKS5yZXBsYWNlKC9cXEQrL2csICcnKTtcclxuICB2YXIgcHJvX2FjdHVhbF9wcmljZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RpY2tleV9kYXRhXCIpLmdldEF0dHJpYnV0ZShcImFjdHVhbF9wcmljZVwiKS5yZXBsYWNlKC9cXEQrL2csICcnKTtcclxuICB2YXIgZ2FfZGlzY291bnQgPSAxMDAqKHByb19hY3R1YWxfcHJpY2UtcHJvX3NhbGVfcHJpY2UpL3Byb19hY3R1YWxfcHJpY2U7XHJcbiAgICAgICBcclxuICAgICAgICB2YXIgcF9pZCA9ICcnO1xyXG4gICAgICAgIHZhciBwX25hbWUgPSAnJztcclxuICAgICAgICB2YXIgY2F0ZWdvcnlfaWQgPSAnJztcclxuICAgICAgICB2YXIgY2F0ZWdvcnlfbmFtZSA9ICcnO1xyXG4gICAgICAgIHZhciBtcnAgPSAnJztcclxuICAgICAgICB2YXIgZGlzY291bnRlZF9wcmljZSA9ICcnO1xyXG4gICAgICAgIHZhciBRdWFudGl0eSA9ICcnO1xyXG4gICAgICAgIHZhciB0b3RhbF9pdGVtX2luX2NhcnQgPSAnJztcclxuICAgICAgICB2YXIgY2FydF92YWx1ZSA9ICcnO1xyXG4gICAgICAgIHZhciBkaXNjb3VudCA9ICcnO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICB2YXIgcHJvX3NrdSA9ICcnO1xyXG5cclxuICAgICAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2R1Y3RWaWV3LWltYWdlLW1haW4gLnByb2R1Y3RWaWV3LWltYWdlIC5zYWxlU2F2aW5nVGFnXCIpLmxlbmd0aCAhPSAwKXtcclxuICAgICAgICB2YXIgZGlzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9kdWN0Vmlldy1pbWFnZS1tYWluIC5wcm9kdWN0Vmlldy1pbWFnZSAuc2FsZVNhdmluZ1RhZ1wiKVswXS50ZXh0Q29udGVudDtcclxuICAgICAgICB2YXIgZGlzY291bnQgPSBkaXMudHJpbSgpO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgZmV0Y2goJy9hcGkvc3RvcmVmcm9udC9jYXJ0cz9wcm9kdWN0SWQ9JyArIHBpZCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgJ2NyZWRlbnRpYWxzJzogJ2luY2x1ZGUnLFxyXG4gICAgICAgICAgICAnaGVhZGVycyc6IHtcclxuICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY2FydF92YWx1ZSA9IGRhdGFbMF0uY2FydEFtb3VudDtcclxuICAgICAgICAgICAgICAgIHRvdGFsX2l0ZW1faW5fY2FydCA9IGRhdGFbMF0ubGluZUl0ZW1zLnBoeXNpY2FsSXRlbXMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgdmFyIGdldHF1YW50aXR5ID0gZGF0YVswXVsnbGluZUl0ZW1zJ11bJ3BoeXNpY2FsSXRlbXMnXTtcclxuICAgICAgICAgICAgICAgICAgIHZhciB0b3RhbGl0ZW1zID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBnZXRxdWFudGl0eS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih2YWx1ZS5wcm9kdWN0SWQgPT0gcGlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFF1YW50aXR5ID0gdmFsdWUucXVhbnRpdHk7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvX3NrdSA9IHZhbHVlLnNrdTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicGRwQ291bnRcIilbMF0udGV4dENvbnRlbnQgPSBRdWFudGl0eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwZHBDb3VudFwiKVswXS5jbGFzc0xpc3QuYWRkKFwiZmlsbFBEUENvdW50XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0b3RhbGl0ZW1zID09ICcnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxpdGVtcyA9IHZhbHVlLnF1YW50aXR5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3RhbGl0ZW1zICs9IHZhbHVlLnF1YW50aXR5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZGF0YUxheWVyID0gd2luZG93LmRhdGFMYXllciB8fCBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdudW1iZXJPZkl0ZW1zSW5DYXJ0JzogdG90YWxpdGVtc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICB2YXIgcXVlcnkgPSBgcXVlcnkgcHJvZHVjdEJ5SWR7XHJcbiAgICAgICAgICAgICAgICBzaXRlIHtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3QoZW50aXR5SWQ6IGArIHBpZCArIGApIHtcclxuICAgICAgICAgICAgICAgICAgaWRcclxuICAgICAgICAgICAgICAgICAgZW50aXR5SWRcclxuICAgICAgICAgICAgICAgICAgbmFtZVxyXG4gICAgICAgICAgICAgICAgICBpbnZlbnRvcnl7XHJcbiAgICAgICAgICAgICAgICAgICBpc0luU3RvY2tcclxuICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZWR7XHJcbiAgICAgICAgICAgICAgICAgICAgIGF2YWlsYWJsZVRvU2VsbFxyXG4gICAgICAgICAgICAgICAgICAgICB3YXJuaW5nTGV2ZWxcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIGNhdGVnb3JpZXNcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgZWRnZXNcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBub2RlXHJcbiAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBwcmljZXMgKGluY2x1ZGVUYXg6dHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpY2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgLi4uTW9uZXlGaWVsZHNcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2FsZVByaWNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgIC4uLk1vbmV5RmllbGRzXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldGFpbFByaWNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgIC4uLk1vbmV5RmllbGRzXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VQcmljZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLk1vbmV5RmllbGRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBmcmFnbWVudCBNb25leUZpZWxkcyBvbiBNb25leSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgY3VycmVuY3lDb2RlXHJcbiAgICAgICAgICAgICAgICB9YDtcclxuICAgICAgICAgICAgICAgIGF4aW9zKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvZ3JhcGhxbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgQmVhcmVyVG9rZW5cclxuICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcXVlcnk6cXVlcnlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4geyAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgYWxsZGF0YSA9IHJlc3VsdC5kYXRhLmRhdGEuc2l0ZS5wcm9kdWN0O1xyXG4gICAgICAgICAgICAgICAgICAgaWYoYWxsZGF0YSAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgcF9pZCA9IGFsbGRhdGEuZW50aXR5SWQ7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgcF9uYW1lID0gYWxsZGF0YS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICBpZiAoYWxsZGF0YS5wcmljZXMucmV0YWlsUHJpY2UgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ycCA9IGFsbGRhdGEucHJpY2VzLnJldGFpbFByaWNlLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBtcnAgPSBhbGxkYXRhLnByaWNlcy5iYXNlUHJpY2UudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgaWYgKGFsbGRhdGEucHJpY2VzLnNhbGVQcmljZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzY291bnRlZF9wcmljZSA9IGFsbGRhdGEucHJpY2VzLnNhbGVQcmljZS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICBkaXNjb3VudGVkX3ByaWNlID0gMDtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgIHZhciBjYXRlZ29yeSA9IGFsbGRhdGEuY2F0ZWdvcmllcy5lZGdlcztcclxuICAgIFxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgIHZhciBjYXRlZ29yeV9JRCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICB2YXIgY2F0ZWdvcnlfTkFNRSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICBjYXRlZ29yeS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgpIHtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5X0lELnB1c2godmFsdWUubm9kZS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnlfTkFNRS5wdXNoKHZhbHVlLm5vZGUubmFtZSk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgdmFyIGNhdGVnb3JpZXMgPSB7IGNhdGVnb3J5X0lELCBjYXRlZ29yeV9OQU1FIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhdGVnb3J5X2lkID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhdGVnb3J5X25hbWUgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjYXRlZ29yeV9pZCA9PSAnJyAmJiBjYXRlZ29yeV9uYW1lID09ICcnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhdF9pZCA9IHZhbHVlLm5vZGUuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzcGxpdGVkX3VybCA9IGF0b2IoY2F0X2lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhdGVnb3J5aWQgPSBzcGxpdGVkX3VybC5zcGxpdChcIkNhdGVnb3J5OlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5X2lkID0gY2F0ZWdvcnlpZFsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnlfbmFtZSA9IHZhbHVlLm5vZGUubmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3BsaXRlZF91cmwgPSBhdG9iKHZhbHVlLm5vZGUuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhdGVnb3J5aWQ9IHNwbGl0ZWRfdXJsLnNwbGl0KFwiQ2F0ZWdvcnk6XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYXRpZCA9IGNhdGVnb3J5aWRbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5X2lkID0gY2F0ZWdvcnlfaWQrJywnK2NhdGlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeV9uYW1lID0gY2F0ZWdvcnlfbmFtZSsnLCcrdmFsdWUubm9kZS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgIHZhciBwcm9kdWN0cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICB2YXIgb2JqID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiUHJvZHVjdF9JRFwiOiBwX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiUHJvZHVjdF9OYW1lXCI6IHBfbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBcImNhdGVnb3JpZXNcIjogY2F0ZWdvcmllcyxcclxuICAgICAgICAgICAgICAgICAgICBcIk1SUFwiOiBtcnAsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJEaXNjb3VudFwiOiBkaXNjb3VudCxcclxuICAgICAgICAgICAgICAgICAgICBcIkRpc2NvdW50X1ByaWNlXCI6IGRpc2NvdW50ZWRfcHJpY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJRdWFudGl0eVwiOiBRdWFudGl0eVxyXG4gICAgICAgICAgICAgICAgICB9O1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgIHByb2R1Y3RzLnB1c2gob2JqKTtcclxuICAgICAgICAgICAgICAgICAgZGF0YUxheWVyLnB1c2goeyBlY29tbWVyY2U6IG51bGwgfSk7ICAvLyBDbGVhciB0aGUgcHJldmlvdXMgZWNvbW1lcmNlIG9iamVjdC5cclxuICAgICAgICAgICAgICAgICAgZGF0YUxheWVyLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgJ2V2ZW50JzogJ2FkZFRvQ2FydCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAnZWNvbW1lcmNlJzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnY3VycmVuY3lDb2RlJzogJ0lOUicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdhZGQnOiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAnYWRkJyBhY3Rpb25GaWVsZE9iamVjdCBtZWFzdXJlcy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAncHJvZHVjdHMnOiBbeyAgICAgICAgICAgICAgICAgICAgICAgIC8vICBhZGRpbmcgYSBwcm9kdWN0IHRvIGEgc2hvcHBpbmcgY2FydC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICduYW1lJzogcF9uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lkJzogcF9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwcmljZSc6IGRpc2NvdW50ZWRfcHJpY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYnJhbmQnOiAnS2FwaXZhJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdxdWFudGl0eSc6IFF1YW50aXR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vVXBkYXRlZDpDb2RlIFN0YXJ0IEdUTSBDb2RlLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgICAgICAgICAgIGRhdGFMYXllci5wdXNoKHsgZWNvbW1lcmNlOiBudWxsIH0pOyAgLy8gQ2xlYXIgdGhlIHByZXZpb3VzIGVjb21tZXJjZSBvYmplY3QuXHJcbiAgICAgICAgICAgICAgICAgICAgIGRhdGFMYXllci5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICdldmVudCc6ICdhZGRfdG9fY2FydCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAnZWNvbW1lcmNlJzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAnaXRlbXMnOiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAnYWRkJyBhY3Rpb25GaWVsZE9iamVjdCBtZWFzdXJlcy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncHJvZHVjdHMnOiBbeyAgICAgICAgICAgICAgICAgICAgICAgIC8vICBhZGRpbmcgYSBwcm9kdWN0IHRvIGEgc2hvcHBpbmcgY2FydC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpdGVtX25hbWUnOiBwX25hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaXRlbV9pZCc6IHByb19za3UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY3VycmVuY3knOiAnSU5SJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwcmljZSc6IGRpc2NvdW50ZWRfcHJpY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaXRlbV9icmFuZCc6ICdLYXBpdmEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2Rpc2NvdW50Jzpwcm9fYWN0dWFsX3ByaWNlLXByb19zYWxlX3ByaWNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2l0ZW1fY2F0ZWdvcnknOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYnJlYWRjcnVtYlwiKVsxXS50ZXh0Q29udGVudC5yZXBsYWNlKC9bXFxuXFxyXFxzXFx0XSsvZywgJycpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2l0ZW1fY2F0ZWdvcnkyJzogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImJyZWFkY3J1bWJcIilbMl0udGV4dENvbnRlbnQucmVwbGFjZSgvW1xcblxcclxcc1xcdF0rL2csICcnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdxdWFudGl0eSc6IFF1YW50aXR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9VcGRhdGVkOkNvZGUgRW5kIEdUTSBDb2RlLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIGZicSgndHJhY2snLCAnQWRkVG9DYXJ0Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRfaWRzOiBwX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRfdHlwZTogJ3Byb2R1Y3QnLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkaXNjb3VudGVkX3ByaWNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbmN5OiAnSU5SJyxcclxuICAgICAgICAgICAgICAgICAgICAgcXVhbnRpdHk6IFF1YW50aXR5XHJcbiAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgd2ViZW5nYWdlLnRyYWNrKFwiYWRkIHRvIGNhcnRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiUHJvZHVjdF9JRFwiOiBwX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiUHJvZHVjdF9OYW1lXCI6IHBfbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBcIkNhdGVnb3J5X0lEXCI6IGNhdGVnb3J5X2lkLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiQ2F0ZWdvcnlfTmFtZVwiOiBjYXRlZ29yeV9uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiTVJQXCI6IE51bWJlcihtcnApLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiRGlzY291bnRcIjogZGlzY291bnQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJEaXNjb3VudF9QcmljZVwiOiBkaXNjb3VudGVkX3ByaWNlLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiUXVhbnRpdHlcIjogUXVhbnRpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJUb3RhbF9JdGVtX2luX2NhcnRcIjogdG90YWxfaXRlbV9pbl9jYXJ0LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiQ2FydF92YWx1ZVwiOiBjYXJ0X3ZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiVG90YWxfSXRlbV9pbl9jYXJ0XCI6IHRvdGFsX2l0ZW1faW5fY2FydCxcclxuICAgICAgICAgICAgICAgICAgICBcIkNhcnRfdmFsdWVcIjogY2FydF92YWx1ZVxyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIHZhciBwcm9kdWN0T2JqZWN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiUHJvZHVjdF9JRFwiOiBwX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiUHJvZHVjdF9OYW1lXCI6IHBfbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBcImNhdGVnb3JpZXNcIjogY2F0ZWdvcmllcyxcclxuICAgICAgICAgICAgICAgICAgICBcInByaWNlXCI6IG1ycCxcclxuICAgICAgICAgICAgICAgICAgICBcInNhbGVQcmljZVwiOiBkaXNjb3VudGVkX3ByaWNlLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiUXVhbnRpdHlcIjogUXVhbnRpdHlcclxuICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIgPSB3aW5kb3cuZGF0YUxheWVyIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7YWRkVG9DYXJ0UHJvZHVjdCA6IHByb2R1Y3RPYmplY3R9KTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgLy9lbmQgYWRkIHRvIGNhcnQgIGFuZCBidXlub3cgd2ViZW5nYWdlXHJcblxyXG4gICAgICAgIC8vYWRkIHRvIGNhcnQgcHJvZHVjdFxyXG4gICAgICAgIHZhciB4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtLWFjdGlvbi1hZGRUb0NhcnRcIik7XHJcbiAgICAgICAgeC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgIHZhciB0b3RhbGNvdW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImZvcm0taW5wdXQtLWluY3JlbWVudFRvdGFsXCIpWzBdLnZhbHVlO1xyXG4gICAgIGlmKHRvdGFsY291bnQgPiAwKXtcclxuICAgICAgICAgICAgdmFyIERhdGEgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZChcInNlbmRsb2FkaW5nYWRkdG9jYXJ0cGRwXCIpXHJcbiAgICAgICBcclxuICAgICAgICB2YXIgY291bnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY2FydC1xdWFudGl0eVwiKVswXS50ZXh0Q29udGVudDtcclxuICAgICAgLy8gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJhZGRUb2NhcnRUZXh0XCIpWzBdLnRleHRDb250ZW50ID0gXCJBZGRlZCB0byBjYXJ0XCI7XHJcbiAgICAgICAgdmFyIHBpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwcm9kdWN0X2lkXCIpWzBdLnZhbHVlO1xyXG4gICAgICAgIHZhciBkYXRhaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZGF0YWlkXCIpWzBdLnZhbHVlO1xyXG4gICAgICAgXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgXHJcbiAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNhcnQtaXRlbS1hZGRdJyk7XHJcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBheGlvcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9yZW1vdGUvdjEvY2FydC9hZGQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZm9ybURhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzdWx0KSA9PiB7ICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQuZGF0YS5kYXRhLmNhcnRfaXRlbSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhLmNsYXNzTGlzdC5yZW1vdmUoXCJzZW5kbG9hZGluZ2FkZHRvY2FydHBkcFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY2FydC1pY29uXCIpWzBdLmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY2FydC1xdWFudGl0eVwiKVswXS50ZXh0Q29udGVudCA9IHBhcnNlSW50KGNvdW50KSArIHBhcnNlSW50KHRvdGFsY291bnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImFkZFRvY2FydFRleHRcIilbMF0udGV4dENvbnRlbnQgPSBcIkFkZCB0byBjYXJ0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZHRvY2FydHdlYmVuZ2FnZShwaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgfSlcclxuICAgLy9lbmQgYWRkIHRvIGNhcnQgcHJvZHVjdFxyXG5cclxuICAgICAgICBsZXQgdmFsaWRhdG9yO1xyXG5cclxuICAgICAgICAvLyBJbml0IGNvbGxhcHNpYmxlXHJcbiAgICAgICAgY29sbGFwc2libGVGYWN0b3J5KCk7XHJcblxyXG4gICAgICAgIHRoaXMucHJvZHVjdERldGFpbHMgPSBuZXcgUHJvZHVjdERldGFpbHMoJCgnLnByb2R1Y3RWaWV3JyksIHRoaXMuY29udGV4dCwgd2luZG93LkJDRGF0YS5wcm9kdWN0X2F0dHJpYnV0ZXMpO1xyXG4gICAgICAgIHRoaXMucHJvZHVjdERldGFpbHMuc2V0UHJvZHVjdFZhcmlhbnQoKTtcclxuXHJcbiAgICAgICAgdmlkZW9HYWxsZXJ5KCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnVsa1ByaWNpbmdIYW5kbGVyKCk7XHJcblxyXG4gICAgICAgIGNvbnN0ICRyZXZpZXdGb3JtID0gY2xhc3NpZnlGb3JtKCcud3JpdGVSZXZpZXctZm9ybScpO1xyXG5cclxuICAgICAgICBpZiAoJHJldmlld0Zvcm0ubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHJldmlldyA9IG5ldyBSZXZpZXcoJHJldmlld0Zvcm0pO1xyXG5cclxuICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJ1tkYXRhLXJldmVhbC1pZD1cIm1vZGFsLXJldmlldy1mb3JtXCJdJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB2YWxpZGF0b3IgPSByZXZpZXcucmVnaXN0ZXJWYWxpZGF0aW9uKHRoaXMuY29udGV4dCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXJpYURlc2NyaWJlUmV2aWV3SW5wdXRzKCRyZXZpZXdGb3JtKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHJldmlld0Zvcm0ub24oJ3N1Ym1pdCcsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHZhbGlkYXRvcikge1xyXG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9kdWN0UmV2aWV3SGFuZGxlcigpO1xyXG5cclxuICAgICAgICAgLy9Nb2JpbGUgc2VhcmNoIGljb24gY2xpY2tcclxuXHJcbiAgICAgICAgIHZhciAkY29udGFpbmVySGVpZ2h0ID0gc2NyZWVuLndpZHRoO1xyXG4gICAgICAgICBpZiAoJGNvbnRhaW5lckhlaWdodCA8PSA4MDApIHtcclxuICAgICAgICAgICAgdmFyIE1vYmlsZVNlYXJjaEljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIk1vYmlsZVNlYXJjaEljb25cIik7XHJcbiAgICAgICAgICAgIE1vYmlsZVNlYXJjaEljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJIZWFkZXJTZWFyY2hcIilbMF0udG9nZ2xlKCk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLkhlYWRlcldyYXAgLlJpZ2hydEhlYWRlci1XcmFwIC5IZWFkZXJTZWFyY2hcIikudG9nZ2xlKCk7XHJcbiAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgfVxyXG4gICAgICAgIC8vZW5kIE1vYmlsZSBzZWFyY2ggaWNvbiBjbGlja1xyXG4gICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBhcmlhRGVzY3JpYmVSZXZpZXdJbnB1dHMoJGZvcm0pIHtcclxuICAgICAgICAkZm9ybS5maW5kKCdbZGF0YS1pbnB1dF0nKS5lYWNoKChfLCBpbnB1dCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCAkaW5wdXQgPSAkKGlucHV0KTtcclxuICAgICAgICAgICAgY29uc3QgbXNnU3BhbklkID0gYCR7JGlucHV0LmF0dHIoJ25hbWUnKX0tbXNnYDtcclxuXHJcbiAgICAgICAgICAgICRpbnB1dC5zaWJsaW5ncygnc3BhbicpLmF0dHIoJ2lkJywgbXNnU3BhbklkKTtcclxuICAgICAgICAgICAgJGlucHV0LmF0dHIoJ2FyaWEtZGVzY3JpYmVkYnknLCBtc2dTcGFuSWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByb2R1Y3RSZXZpZXdIYW5kbGVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnVybC5pbmRleE9mKCcjd3JpdGVfcmV2aWV3JykgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJldmlld0xpbmsudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYnVsa1ByaWNpbmdIYW5kbGVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnVybC5pbmRleE9mKCcjYnVsa19wcmljaW5nJykgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGJ1bGtQcmljaW5nTGluay50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgbm9kIGZyb20gJy4uL2NvbW1vbi9ub2QnO1xyXG5pbXBvcnQgeyBDb2xsYXBzaWJsZUV2ZW50cyB9IGZyb20gJy4uL2NvbW1vbi9jb2xsYXBzaWJsZSc7XHJcbmltcG9ydCBmb3JtcyBmcm9tICcuLi9jb21tb24vbW9kZWxzL2Zvcm1zJztcclxuaW1wb3J0IHsgc2FmZVN0cmluZyB9IGZyb20gJy4uL2NvbW1vbi91dGlscy9zYWZlLXN0cmluZyc7XHJcbmltcG9ydCB7IGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UgfSBmcm9tICcuLi9jb21tb24vdXRpbHMvZm9ybS11dGlscyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XHJcbiAgICBjb25zdHJ1Y3RvcigkcmV2aWV3Rm9ybSkge1xyXG4gICAgICAgIHRoaXMudmFsaWRhdG9yID0gbm9kKHtcclxuICAgICAgICAgICAgc3VibWl0OiAkcmV2aWV3Rm9ybS5maW5kKCdpbnB1dFt0eXBlPVwic3VibWl0XCJdJyksXHJcbiAgICAgICAgICAgIHRhcDogYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy4kcmV2aWV3c0NvbnRlbnQgPSAkKCcjcHJvZHVjdC1yZXZpZXdzJyk7XHJcbiAgICAgICAgdGhpcy4kY29sbGFwc2libGUgPSAkKCdbZGF0YS1jb2xsYXBzaWJsZV0nLCB0aGlzLiRyZXZpZXdzQ29udGVudCk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdExpbmtCaW5kKCk7XHJcbiAgICAgICAgdGhpcy5pbmplY3RQYWdpbmF0aW9uTGluaygpO1xyXG4gICAgICAgIHRoaXMuY29sbGFwc2VSZXZpZXdzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPbiBpbml0aWFsIHBhZ2UgbG9hZCwgdGhlIHVzZXIgY2xpY2tzIG9uIFwiKDEyIFJldmlld3MpXCIgbGlua1xyXG4gICAgICogVGhlIGJyb3dzZXIganVtcHMgdG8gdGhlIHJldmlldyBwYWdlIGFuZCBzaG91bGQgZXhwYW5kIHRoZSByZXZpZXdzIHNlY3Rpb25cclxuICAgICAqL1xyXG4gICAgaW5pdExpbmtCaW5kKCkge1xyXG4gICAgICAgIGNvbnN0ICRjb250ZW50ID0gJCgnI3Byb2R1Y3RSZXZpZXdzLWNvbnRlbnQnLCB0aGlzLiRyZXZpZXdzQ29udGVudCk7XHJcblxyXG4gICAgICAgICQoJyNwcm9kdWN0UmV2aWV3X2xpbmsnKS5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICQoJy5wcm9kdWN0Vmlldy1yZXZpZXdUYWJMaW5rJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICAgICAgaWYgKCEkY29udGVudC5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRjb2xsYXBzaWJsZS50cmlnZ2VyKENvbGxhcHNpYmxlRXZlbnRzLmNsaWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbGxhcHNlUmV2aWV3cygpIHtcclxuICAgICAgICAvLyBXZSdyZSBpbiBwYWdpbmF0aW5nIHN0YXRlLCBkbyBub3QgY29sbGFwc2VcclxuICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2ggJiYgd2luZG93LmxvY2F0aW9uLmhhc2guaW5kZXhPZignI3Byb2R1Y3QtcmV2aWV3cycpID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGZvcmNlIGNvbGxhcHNlIG9uIHBhZ2UgbG9hZFxyXG4gICAgICAgIHRoaXMuJGNvbGxhcHNpYmxlLnRyaWdnZXIoQ29sbGFwc2libGVFdmVudHMuY2xpY2spO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5qZWN0IElEIGludG8gdGhlIHBhZ2luYXRpb24gbGlua1xyXG4gICAgICovXHJcbiAgICBpbmplY3RQYWdpbmF0aW9uTGluaygpIHtcclxuICAgICAgICBjb25zdCAkbmV4dExpbmsgPSAkKCcucGFnaW5hdGlvbi1pdGVtLS1uZXh0IC5wYWdpbmF0aW9uLWxpbmsnLCB0aGlzLiRyZXZpZXdzQ29udGVudCk7XHJcbiAgICAgICAgY29uc3QgJHByZXZMaW5rID0gJCgnLnBhZ2luYXRpb24taXRlbS0tcHJldmlvdXMgLnBhZ2luYXRpb24tbGluaycsIHRoaXMuJHJldmlld3NDb250ZW50KTtcclxuXHJcbiAgICAgICAgaWYgKCRuZXh0TGluay5sZW5ndGgpIHtcclxuICAgICAgICAgICAgJG5leHRMaW5rLmF0dHIoJ2hyZWYnLCBgJHskbmV4dExpbmsuYXR0cignaHJlZicpfSAjcHJvZHVjdC1yZXZpZXdzYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoJHByZXZMaW5rLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkcHJldkxpbmsuYXR0cignaHJlZicsIGAkeyRwcmV2TGluay5hdHRyKCdocmVmJyl9ICNwcm9kdWN0LXJldmlld3NgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJWYWxpZGF0aW9uKGNvbnRleHQpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgICAgIHRoaXMudmFsaWRhdG9yLmFkZChbe1xyXG4gICAgICAgICAgICBzZWxlY3RvcjogJ1tuYW1lPVwicmV2cmF0aW5nXCJdJyxcclxuICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogc2FmZVN0cmluZyh0aGlzLmNvbnRleHQucmV2aWV3UmF0aW5nKSxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnW25hbWU9XCJyZXZ0aXRsZVwiXScsXHJcbiAgICAgICAgICAgIHZhbGlkYXRlOiAncHJlc2VuY2UnLFxyXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHNhZmVTdHJpbmcodGhpcy5jb250ZXh0LnJldmlld1N1YmplY3QpLFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgc2VsZWN0b3I6ICdbbmFtZT1cInJldnRleHRcIl0nLFxyXG4gICAgICAgICAgICB2YWxpZGF0ZTogJ3ByZXNlbmNlJyxcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBzYWZlU3RyaW5nKHRoaXMuY29udGV4dC5yZXZpZXdDb21tZW50KSxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnLndyaXRlUmV2aWV3LWZvcm0gW25hbWU9XCJlbWFpbFwiXScsXHJcbiAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gZm9ybXMuZW1haWwodmFsKTtcclxuICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LnJldmlld0VtYWlsLFxyXG4gICAgICAgIH1dKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIHZhbGlkYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgVmlkZW9HYWxsZXJ5IHtcclxuICAgIGNvbnN0cnVjdG9yKCRlbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy4kcGxheWVyID0gJGVsZW1lbnQuZmluZCgnW2RhdGEtdmlkZW8tcGxheWVyXScpO1xyXG4gICAgICAgIHRoaXMuJHZpZGVvcyA9ICRlbGVtZW50LmZpbmQoJ1tkYXRhLXZpZGVvLWl0ZW1dJyk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VmlkZW8gPSB7fTtcclxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3ROZXdWaWRlbyhlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBjb25zdCAkdGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG5cclxuICAgICAgICB0aGlzLmN1cnJlbnRWaWRlbyA9IHtcclxuICAgICAgICAgICAgaWQ6ICR0YXJnZXQuZGF0YSgndmlkZW9JZCcpLFxyXG4gICAgICAgICAgICAkc2VsZWN0ZWRUaHVtYjogJHRhcmdldCxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnNldE1haW5WaWRlbygpO1xyXG4gICAgICAgIHRoaXMuc2V0QWN0aXZlVGh1bWIoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNYWluVmlkZW8oKSB7XHJcbiAgICAgICAgdGhpcy4kcGxheWVyLmF0dHIoJ3NyYycsIGAvL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke3RoaXMuY3VycmVudFZpZGVvLmlkfWApO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEFjdGl2ZVRodW1iKCkge1xyXG4gICAgICAgIHRoaXMuJHZpZGVvcy5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VmlkZW8uJHNlbGVjdGVkVGh1bWIuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRFdmVudHMoKSB7XHJcbiAgICAgICAgdGhpcy4kdmlkZW9zLm9uKCdjbGljaycsIHRoaXMuc2VsZWN0TmV3VmlkZW8uYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZpZGVvR2FsbGVyeSgpIHtcclxuICAgIGNvbnN0IHBsdWdpbktleSA9ICd2aWRlby1nYWxsZXJ5JztcclxuICAgIGNvbnN0ICR2aWRlb0dhbGxlcnkgPSAkKGBbZGF0YS0ke3BsdWdpbktleX1dYCk7XHJcblxyXG4gICAgJHZpZGVvR2FsbGVyeS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0ICRlbCA9ICQoZWxlbWVudCk7XHJcbiAgICAgICAgY29uc3QgaXNJbml0aWFsaXplZCA9ICRlbC5kYXRhKHBsdWdpbktleSkgaW5zdGFuY2VvZiBWaWRlb0dhbGxlcnk7XHJcblxyXG4gICAgICAgIGlmIChpc0luaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRlbC5kYXRhKHBsdWdpbktleSwgbmV3IFZpZGVvR2FsbGVyeSgkZWwpKTtcclxuICAgIH0pO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=