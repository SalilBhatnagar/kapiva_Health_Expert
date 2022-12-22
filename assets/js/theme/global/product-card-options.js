import $ from 'jquery';
import utils from '@bigcommerce/stencil-utils';
import _ from 'lodash';
import Pace from 'pace-js';
import inView from 'in-view';


let context;
let len;
let id_array = new Array();
let ids = new Array();
const elem = $('[data-product-card-options]');
var cnt = 0;
var response = new Array();
export class ProductCardColorSwatches {
    constructor($scope) {
        //super($scope);
        var jsContext = this.$scope;
        this.$scope = $scope;
        this.productId = $scope.data('product-id');
        this.$content = $scope.find('[data-product-card-options-content]');
        this.$cardImg = $scope.find('.card-body .option-list');
        this.$cardFigure = $scope.find('.figure-content');
        var $swatch_html = '';
        var swatch_cnt = false;
        this.pro_inventory = 0;
        this.proPrice = $scope.find('.price.price--withTax').text();
        this.actualPrice = $scope.find('.price.price--non-sale').text();
        this.$cardImg.on('load', () => {
            this.$cardFigure.removeClass('loading');
        });

        for (let index1 = 0; index1 <= cnt; index1++) {

            if (response[index1] != response[index1]) {
                var res = response[index1]['data'];

                var products_len = res.length;
                for (let index2 = 0; index2 < products_len; index2++) {
                    var attributesData = res[index2];

                    if (attributesData['id'] == this.productId) {
                        this.pro_inventory = attributesData['inventory_level'];
                        // Request in-stock attributes
                        Pace.ignore(() => {
                            var array = [];
                            if (attributesData['variants'].length > 0) {
                                for (let index3 = 0; index3 < attributesData['variants'].length; index3++) {

                                    if (attributesData['variants'][index3]['option_values'].length > 0) {

                                        for (let index4 = 0; index4 < attributesData['variants'][index3]['option_values'].length; index4++) {
                                            var option = attributesData['variants'][index3]['option_values'];
                                            var variants = [];

                                            for (let index5 = 0; index5 < option.length; index5++) {

                                                if (option[index5]['option_display_name'] == 'Size') {
                                                    if (array.includes(option[index5]['label']) == false) {
                                                        array.push(option[index5]['label']);
                                                        $swatch_html += "<li class='options_slide' style='display:block' ><span class='productCard-sizeSwatch'  data-product-option-price='" + attributesData['variants'][index3]['calculated_price'] + "' data-product-option-actual-price='" + attributesData['variants'][index3]['price'] + "' data-product-swatch-id='" + option[index5]['option_id'] + "'  data-product-option-label='" + option[index5]['label'] + "' data-product-option-id='" + attributesData['variants'][index3]['sku'] + "'><input  type='radio' class='radio-btn' id='attribute_variant" + attributesData['variants'][index3]['sku'] + "' name='variantattribute' value='" + attributesData['variants'][index3]['sku'] + "' ><label for='attribute_variant" + attributesData['variants'][index3]['sku'] + "' data-product-attribute-value=" + attributesData['variants'][index3]['sku'] + ">" + option[index5]['label'] + "</span></li>";
                                                        swatch_cnt = true;
                                                    }
                                                }

                                            }
                                        }
                                    }
                                }
                                this.$cardImg.append($swatch_html);

                                $swatch_html = '';
                                if (swatch_cnt == true) {
                                    $($scope).find('.Prod-AddToCart a').addClass("disabled");
                                }
                            }

                        });
                    }

                }
            }
        }

        $scope.on('click', '.Prod-AddToCart .buy-now.event_buy_now_add_to_cart', (event) => {

            event.preventDefault();
            if ($($scope).find(".Prod-AddToCart a").hasClass('disabled') == false) {
                var cart_quantity = localStorage.getItem('cart-quantity');
                var count = $(".cart-quantity").text();

               // $($scope).find('.Prod-AddToCart a').text("Added to cart");
                var url = $($scope).find('.Prod-AddToCart a').attr("href");
                var id = $(this).attr("data-product-id");
                if (url.search("sku") > 0) {
                    $.ajax({
                        type: 'POST',
                        url: '/remote/v1/cart/add',
                        dataType: 'json',
                        data: { action: 'add', "product_id": id, "qty[]": 1 },
                        success: function (data) {
                            if(data.data.cart_item){
                          //  $($scope).find('.Prod-AddToCart a').text("Add to Cart");
                            $($scope).find('.Prod-AddToCart a').addClass("disabled");
                            $scope.find('.productCard-sizeSwatch.active').removeClass("active");
                           window.location.href = '/checkout';
                        }else{

                        }
                        },
                    });
                   

                    $scope.find('.price.price--withTax').text(this.proPrice);
                    $scope.find('.price.price--non-sale').text(this.actualPrice);
                    $scope.find('.price-section.price-section--withTax.non-sale-price--withTax').css("display", "none");
                    var actualPrice = parseInt($scope.find('.price.price--non-sale').text().replace(/[^0-9\.]+/g, ""));
                    var salePrice = parseInt($scope.find('.price.price--withTax').text().replace(/[^0-9\.]+/g, ""));

                    var discount_price = actualPrice - salePrice;
                    var discount = (discount_price * 100) / actualPrice;
                    var discount_round = discount.toPrecision(2);
                    if (salePrice == 0 || actualPrice == 0) { }
                    else { $scope.find(".saleSavingTag").html(discount_round + "% OFF"); }
                }
                else {

                    $.ajax({
                        type: 'POST',
                        url: '/remote/v1/cart/add',
                        dataType: 'json',
                        data: { action: 'add', "product_id": this.productId, "qty[]": 1 },
                        success: function (data) {
                            if(data.data.cart_item){
                            window.location.href = '/checkout';
                            }
                        },
                    });
                }

                $scope.find('.price.price--withTax').text(this.proPrice);
                $scope.find('.price.price--non-sale').text(this.actualPrice);
            }


        });
$scope.on('click', '.Prod-AddToCart .Prod-AddToCart-add a', (event) => {

    event.preventDefault();
    if ($($scope).find(".Prod-AddToCart .Prod-AddToCart-add a").hasClass('disabled') == false) {
        var cart_quantity = localStorage.getItem('cart-quantity');
        var count = $(".cart-quantity").text();

       
        var url = $($scope).find('.Prod-AddToCart .Prod-AddToCart-add a').attr("href");
        var id = $(this).attr("data-product-id");
        if (url.search("sku") > 0) {
           
            $.ajax({
                type: 'POST',
                url: '/remote/v1/cart/add',
                dataType: 'json',
                data: { action: 'add', "product_id": id, "qty[]": 1 },
                success: function (data) {
                    if(data.data.cart_item){
                  //  $($scope).find('.Prod-AddToCart a').text("Add to Cart");
                    $($scope).find('.Prod-AddToCart a').addClass("disabled");
                    $scope.find('.productCard-sizeSwatch.active').removeClass("active");
                }else{

                }
                },
            });

            $scope.find('.price.price--withTax').text(this.proPrice);
            $scope.find('.price.price--non-sale').text(this.actualPrice);
            $scope.find('.price-section.price-section--withTax.non-sale-price--withTax').css("display", "none");
            var actualPrice = parseInt($scope.find('.price.price--non-sale').text().replace(/[^0-9\.]+/g, ""));
            var salePrice = parseInt($scope.find('.price.price--withTax').text().replace(/[^0-9\.]+/g, ""));

            var discount_price = actualPrice - salePrice;
            var discount = (discount_price * 100) / actualPrice;
            var discount_round = discount.toPrecision(2);
            if (salePrice == 0 || actualPrice == 0) { }
            else { $scope.find(".saleSavingTag").html(discount_round + "% OFF"); }
        }
        else {
            $.ajax({
                type: 'POST',
                url: '/remote/v1/cart/add',
                dataType: 'json',
                data: { action: 'add', "product_id": this.productId, "qty[]": 1 },
                success: function (data) {
                    if(data.data.cart_item){
                            
                    }
                },
            });
          
            var p_id = this.productId;
            setTimeout(function(){
            fetch('/api/storefront/carts?include=',
            {
                'credentials': 'include',
                'headers': {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                response.json().then(function (data) {
                  if (data.length != 0) {
                        var getid = data[0]['lineItems']['physicalItems'];
                        $.each(getid, function (key, value) {
                            var pid = value.productId;
                           
                             var qty = value.quantity;
                             
                            if (p_id != undefined && p_id == pid){
                              $($scope).find('.Prod-AddToCart .Prod-AddToCart-add .form .button .heart-icon a #pro-count').text(qty);
                              $($scope).find('.Prod-AddToCart .Prod-AddToCart-add').addClass("fill-Prod-add-to-cart");
                              $($scope).find('.Prod-AddToCart .Prod-AddToCart-add .form .button .heart-icon a #pro-count').addClass("fill-count");
                            }
                          });
                      }
                      });
                      $(".cart-quantity").text(parseInt(count) + 1);
                      if (count == 0) {
                          $(".cart-icon").trigger("click");
                      }
                  });
                },500);
        }

        $scope.find('.price.price--withTax').text(this.proPrice);
        $scope.find('.price.price--non-sale').text(this.actualPrice);
    }


});
$scope.on('click', '[data-product-option-id]', (event) => {
    event.preventDefault();



    const $a = $(event.currentTarget);
    const sku = $a.data('product-option-id');
    var salePrice = $a.data('product-option-price');

    var actualPrice = $a.data('product-option-actual-price');
    const lab = $a.data('product-option-label');
    $scope.find('.productCard-sizeSwatch.active').removeClass("active");
    $a.addClass("active");
    $scope.find('.price.price--withoutTax').text('₹' + salePrice);
    if (actualPrice == null) {
        actualPrice = this.actualPrice;
        $scope.find('.price.price--non-sale').text(actualPrice);
    }
    else
        $scope.find('.price.price--non-sale').text('₹' + actualPrice + ".00");
    $scope.find('.price-section.price-section--withoutTax.non-sale-price--withoutTax').css("display", "block");
    actualPrice = parseInt($scope.find('.price.price--non-sale').text().replace(/[^0-9\.]+/g, ""));
    salePrice = parseInt($scope.find('.price.price--withoutTax').text().replace(/[^0-9\.]+/g, ""));


    var discount_price = actualPrice - salePrice;
    var discount = (discount_price * 100) / actualPrice;
    var discount_round = discount.toPrecision(2);

    if (salePrice == 0 || actualPrice == 0) { }
    else { $scope.find(".saleSavingTag").html(discount_round + "% OFF"); }
    if (this.pro_inventory > 0) {
        $($scope).find('.Prod-AddToCart .Prod-AddToCart-add a').text("Add to cart");

        $($scope).find('.Prod-AddToCart .Prod-AddToCart-add a').removeClass("disabled");
        $scope.find('.button.button--small.card-figcaption-button').attr("href", "/cart.php?action=add&sku=" + sku);
    }


});


}
}
function check() {

    len = $('[data-product-card-options]').length;

    var t = 0;
    var n = 0;
    $('[data-product-card-options]').each((i, el) => {
        id_array[n] = $(el).data('product-id');

        if (n >= 49) {
            t++;
            if (n == 49)
                cnt++;
            if (t == 49) {
                t = 0;
                cnt++;
            }
        }
        if (n == 0 || t + 1 == 49 || t == 1)
            ids[cnt] = $(el).data('product-id') + ',';
        else if (n + 1 == len)
            ids[cnt] += $(el).data('product-id');
        else
            ids[cnt] += $(el).data('product-id') + ',';
        n++;
    });


    for (let index = 0; index <= cnt; index++) {
        response[index] = graphqlquery(ids[index]);
    }

    $('[data-product-card-options]').each((i, el) => {
        if (!$(el).data('product-card-colorswatches-instance') && inView.is(el)) {
            $(el).data('product-card-colorswatches-instance', new ProductCardColorSwatches($(el)));
        }
    });

}

export function inViewCheck(localContext, eventEl = window) {

    if (localContext) {
        context = localContext;
    }

    if (!context) {
        return;
    }

    const $eventEl = $(eventEl);

    inView.offset(-200);

    if ($eventEl.data('productCardColorswatchesInViewCheckEvent')) {
        return;
    }
    check();
    const callback = _.debounce(check, 250);
    $eventEl.on('scroll resize load', callback);
    $eventEl.data('productCardColorswatchesInViewCheckEvent', callback);
}
var p_ids = [];
export function graphqlquery(prod_ids) {

    if (p_ids.includes(prod_ids) == false) {
        p_ids.push(prod_ids);
        if (prod_ids) {
            var response;
            $.ajax
                ({
                    type: "GET",
                    async: false,
                    url: "https://bg-sync-api-dev.kapiva.in/api/product_list_variants.php",
                    data: { pro_ids: prod_ids },
                    success: function (html) {
                        response = html;
                    }
                });
            return jQuery.parseJSON(response);
        }
    }
}
