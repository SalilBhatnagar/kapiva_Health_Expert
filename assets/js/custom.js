$(document).ready(function () {

    $('body').on('click', function (e) {
        var target = $(e.target);


        if (target.is('.navPages-action.has-subMenu.is-open') || target.is('#navPages-shopMenu') || target.is('#navPages-shopMenu *')) { } else {
            $('#navPages-shopMenu.is-open').removeClass('is-open').attr('aria-hidden', 'true');
            $('.mobile-hide .navPages-action.is-open').removeClass('is-open');
        }
    });
    $(document).on('click', '.shopMenu_a', function (e) {
        e.preventDefault();

        var hsCls = $(this).hasClass('is-open');
        if (!hsCls) {
            $('.shopMenu_a').addClass('is-open');
            $('#navPages-shopMenu').addClass('is-open').attr('aria-hidden', 'true');
        } else {
            $('.shopMenu_a').removeClass('is-open');
            $('#navPages-shopMenu.is-open').removeClass('is-open').attr('aria-hidden', 'true');
        }

    });

    $(document).on('click', '.MobileSearch-Icon > .navUser-action', function () {
        $('.HeaderSearch').toggleClass("Active");
    });

    $('.has-sub-nav a').on('click', function () {
        $(this).parent().find('>.nav-wrap-list').addClass('is-open');
    });
    $('.nav-wrap-list .sub-nav-header .back').on('click', function () {
        $(this).closest('.sub-nav-header').closest('.nav-wrap-list').removeClass('is-open');
    });

    var $containerHeight = $(window).width();
    if ($containerHeight <= 800) {
        $('#MobileSearchIcon').click(function () {
            $(".HeaderWrap .RighrtHeader-Wrap .HeaderSearch").toggle();
        });
    }

    //make header sticky
    $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();
        if (scroll > 50) {
            $('.main-header').addClass('sticky');
        } else {
            $('.main-header').removeClass('sticky');
        }
    });

    //accr script
    $(".accr-wrap .head").click(function () {
        $(this).next(".content").slideToggle().siblings(".content:visible").slideUp();
        $(this).toggleClass("active");
        $(this).siblings(".head").removeClass("active");
    });

    /*Load*/
    loadimage();

    if ($(".product-body").length !== 0) {
        // fancybox JS        

        if (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0)) {
            $('body').addClass('touch-device');
        }
        $(document).on('click', '.fancythumb-img', function (e) {
            e.preventDefault();
        });
        $('.productView-thumbnail-link').click(function () {
            const imgurl = $(this).data('link');
            $('.fancybox-hidden-img').removeClass('currentGalleryImage');
            $('.fancybox-hidden-img').each(function () {
                if ($(this).attr('href') == imgurl) {
                    $(this).addClass('currentGalleryImage');
                }
            });
        });
        $('.productView-image-main').click(function () {

            $('.triggerlist li .currentGalleryImage').trigger('click');
        });


        $(document).on('click', '#video-thumbnail', function (e) {
            var videoId = $(this).attr("data-video-id");
            $("#figure-image").css("display", "none");
            $("#figure-video").css("display", "block");
            $("#iframe-video").attr("src", "https://www.youtube.com/embed/" + videoId);
        });
        $(document).on('click', '#image-thumbnail', function (e) {

            $("#figure-image").css("display", "block");
            $("#figure-video").css("display", "none");
        });
        // fancybox JS end


        if ($(".ingredients-tab-content .tab-content-ingr").length < 1) {
            $(".product-ingredients").hide();
        }
        $(".ingredients-tab-header li").on('click', function () {
            var _currIndex = $(this).index();
            $(".ingredients-tab-header li").removeClass('active');
            $(this).addClass('active');
            $('.ingredients-tab-content .tab-content-ingr').addClass('d-none');
            $('.ingredients-tab-content .tab-content-ingr:eq(' + _currIndex + ')').removeClass('d-none');
        });
        $(".ingredients-tab-content .tab-content-ingr:not(:first-child)").addClass("d-none");
        $(".tabs-head .ingredients-tab-header li:first-child").addClass("active");


        $('.product-popup .modal-close').click(function () {
            $('.product-popup').addClass('removed');
        });
        $('.read_more_link .toggle-more').click(function () {
            $(this).parents(".DescriptionWrap").toggleClass('is-open');
        });

        $('#productReview_link').on("click", function () {
            $('html, body').animate({
                scrollTop: ($("#product-reviews").offset().top - 180)
            }, 1000);
        });
        $('.cust-add-review').on("click", function () {
            $('html, body').animate({
                scrollTop: ($(".add-review").offset().top - 180)
            }, 1000);
        });
        $('#no-review').on("click", function () {
            $('html, body').animate({
                scrollTop: ($(".add-review").offset().top - 180)
            }, 1000);
        });

        $(".product-how-to-use .productCarousel").slick({
            infinite: false,
            mobileFirst: false,
            dots: false,
            arrows: false,
            accessibility: false,
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        arrows: false,
                        dots: true,
                        autoplay: false,
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 550,
                    settings: {
                        arrows: false,
                        dots: true,
                        autoplay: true,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

        //Video Review
        (function () {
            var youtube = document.querySelectorAll(".video-wrap-box");
            for (var i = 0; i < youtube.length; i++) {
                var source = "https://img.youtube.com/vi/" + youtube[i].dataset.embed + "/sddefault.jpg";
                var image = new Image();
                image.src = source;
                image.addEventListener("load", function () {
                    youtube[i].appendChild(image);
                }(i));
                youtube[i].addEventListener("click", function () {
                    var iframe = document.createElement("iframe");
                    iframe.setAttribute("frameborder", "0");
                    iframe.setAttribute("allowfullscreen", "");
                    iframe.setAttribute("allow", "autoplay");
                    iframe.setAttribute("src", "https://www.youtube.com/embed/" + this.dataset.embed + "?rel=0&showinfo=0&autoplay=1");
                    this.innerHTML = "";
                    this.appendChild(iframe);
                });
            };
        })();

    }


    if ($(".HeaderWrap").length !== 0) {

        $(document).on("click", ".ProductWhislistWrap", function (event) {

            var customerId = $(".customer_id").val();
            if (customerId) {
                var pid = $(this).attr("data-product-id");
                event.preventDefault();
                if ($(this).hasClass("addedWishlist_" + pid) == false) {
                    $(this).addClass("addedWishlist_" + pid);
                    $(this).find(".ProductWhislist .button-wishlist").addClass("filled");
                    $(this).find(".form-wishlist .button-wishlist").addClass("filled");
                    $.ajax({
                        url: "/wishlist.php?action=add&product_id=" + pid,
                        contentType: "application/json",
                        type: "GET",
                        async: false,
                        success: function (Data) {
                            $("#wishlist-success").fadeIn();
                            setTimeout(function () {
                                $("#wishlist-success").fadeOut();
                            }, 2000);
                        },
                    });

                }
            } else {
                window.location.href = "/wishlist.php"
            }
        })

        var pid = [];
        $(".ProductWhislistWrap ").each(function () {
            pid.push($(this).attr("data-product-id"));
        })

    }
    if ($(".product-body").length !== 0) {
        $(document).on("click", "body .form-option", function () {

            $("#form-action-addToCart").addClass("form-action-addtocart");
            var id = $(this).attr("sku");
            $(".dataid").val(id);
            var stock = $(this).attr("inventory");


            setTimeout(function () {
                var aPrice = $('.productView-price').find('.price.price--non-sale').text();
                var sPrice = $('.productView-price').find('.price--actual').text();
                var actualPrice = parseInt($('.productView-price').find('.price.price--non-sale').text().replace(/[^0-9\.]+/g, ""));
                var salePrice = parseInt($('.productView-price').find('.price--actual').text().replace(/[^0-9\.]+/g, ""));
                var discount_price = actualPrice - salePrice;
                var discount = (discount_price * 100) / actualPrice;
                var discount_round = discount.toPrecision(2);
                if (salePrice == 0 || actualPrice == 0) { } else {
                    $(".saleSavingTag").html(discount_round + "% OFF");
                    $(".price_change").html(sPrice);
                    $(".sale_change").html(aPrice);
                }
                $("body input.add_to_cart_product").removeAttr('disabled');
                $("body .minus").removeAttr("disabled");
                $("body .plus").removeAttr("disabled");
                if (stock != 0) {
                    var html = '';
                    $(".pdp-outofstock").addClass("d-none");
                    $("#form-action-addToCart").removeClass("d-none");
                    $(".form-field--increments").removeClass("d-none");
                    html += '<input type="submit" id="product-cart-btn" class="button product-cart-btn stickey-add-cart" value="Add To Cart">'
                    $(".stickey-cart-div").append(html);
                } else {
                    $(".pdp-outofstock").removeClass("d-none");
                    $("#form-action-addToCart").addClass("d-none");
                    $(".form-field--increments").addClass("d-none");
                    $(".stickey-add-cart").remove();
                }
            }, 1500);
        });
        $(document).on("click", "#form-action-addToCart", function (event) {
            var totalcount = $(".form-input--incrementTotal").val();

            var count = $(".cart-quantity").text();
            $(".addTocartText").val("Added to cart");
            var pid = $(".product_id").val();
            var dataid = $(".dataid").val();

            event.preventDefault();
            if ($(this).hasClass("form-action-addtocart")) {
                $.get("/cart.php?action=add&sku=" + dataid + "&qty[]=" + totalcount, function (data) {
                    if (count == 0) {
                        $(".cart-icon").trigger("click");
                    }
                    $(".cart-quantity").text(parseInt(count) + parseInt(totalcount));
                    $(".addTocartText").val("Add to Cart");
                });
            } else {
                $.get("/cart.php?action=add&product_id=" + pid + "&qty[]=" + totalcount, function (data) {
                    if (count == 0) {
                        $(".cart-icon").trigger("click");
                    }
                    $(".cart-quantity").text(parseInt(count) + parseInt(totalcount));
                    $(".addTocartText").val("Add to Cart");

                });

            }

        })


        setTimeout(function () {
            var attrsku = [];
            $("body .form-option").each(function () {
                var skus = $(this).attr("sku");
                if (skus != "" || skus != undefined) {
                    $("#form-action-addToCart").addClass("form-action-addtocart");
                    $("body input.add_to_cart_product").removeAttr('disabled');
                    $("body .minus").removeAttr("disabled");
                    $("body .plus").removeAttr("disabled");
                }
                attrsku.push(skus);
            })
        }, 4000);


        if ($("#reviews .product-reviews-slider-wrap .product-reviews-slider").length < 1) {
            $("#reviews").hide();
            $('[data-anchor="reviews"]').hide();
        }
        if ($("#how-to-use").length == 0) {
            $('[data-anchor="how-to-use"]').hide();
        }


        //Animate to anchor
        $('.product-sub-section-nav .holder .wrap ul li').on('click', function (e) {
            e.preventDefault();
            $('.product-sub-section-nav .holder .wrap ul li').removeClass('active');
            $(this).addClass('active');
            var _section_Id = $(this).data('anchor');
            $('html,body').animate({
                scrollTop: $('#' + _section_Id).offset().top - $('.main-header').height() - $('.product-sub-section-nav .holder .wrap').height()
            }, 1000);
        });

        var saleendDate = $('#sale-date').text();
        var countDownDate = new Date($('#sale-date').text()).getTime();

        // Update the count down every 1 second
        var x = setInterval(function () {

            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (saleendDate.length > 0) {
                if (days == 0) {
                    $(".sale-start").css("display", "block");
                    $("#sale-countdown").css("display", "inline-block");
                    document.getElementById("sale-countdown").innerHTML = hours + "H : " + minutes + "M : " + seconds + "S";
                } else {
                    $(".sale-start").css("display", "none");
                    $("#sale-countdown").css("display", "inline-block");
                    document.getElementById("sale-countdown").innerHTML = saleendDate;
                }

                // If the count down is finished, write some text
                if (distance < 0) {
                    clearInterval(x);
                    $("#sale-countdown").css("display", "none");
                    $(".sale-start").css("display", "none");
                }
            }

        }, 1000);


        //scroll code

        var $containerHeight = $(window).width();
        if ($containerHeight <= 800) {
            $('#MobileSearchIcon').click(function () {
                $(".HeaderWrap .RighrtHeader-Wrap .HeaderSearch").toggle();
            });
        }

        // Scrolling to activate tabs
        $(window).scroll(function () {
            var scrollDistance = $(window).scrollTop();

            // Assign active class to nav links while scolling
            $('.ingredients-tab-section').each(function (i) {
                if ($(this).position().top - 400 <= scrollDistance) {
                    $('.product-sub-section-nav .holder .wrap ul li.active').removeClass('active');
                    $('.product-sub-section-nav .holder .wrap ul li').eq(i).addClass('active');
                }
            });
        }).scroll();

        var cardid = [];
        $(".cardwishlist").each(function () {
            var proid = $(this).attr("data-product-id");
            cardid.push(proid);
        });
        $(".cardproductid").val(cardid);


        var mainHEader = $(".main-header").innerHeight();
        var distance = $('.product-sub-section-nav').offset().top;
        var distanceofaddtocart = $('.productView-options').offset().top;
        var maindistance = distance - mainHEader;
        var addtocartdistance = distanceofaddtocart - mainHEader;
        $(window).scroll(function () {

            if ($(window).width() > 1024) {
                if ($(window).scrollTop() >= maindistance) {

                    $('.product-sub-section-nav .holder .wrap').addClass("affix").css("top", mainHEader);

                } else {
                    $('.product-sub-section-nav .holder .wrap').removeClass("affix").removeAttr('style');
                }

            } else {
                if ($(window).scrollTop() >= maindistance - 400) {

                    $('.product-sub-section-nav .holder .wrap').addClass("affix").css("top", mainHEader);

                } else {
                    $('.product-sub-section-nav .holder .wrap').removeClass("affix").removeAttr('style');
                }
            }
        });
        $(window).scroll(function () {

            if ($(window).scrollTop() >= addtocartdistance) {
                $('.product-popup').addClass('is-show');

            } else {
                $('.product-popup').removeClass('is-show');
            }
        });
        //pincode
        $(".submit").click(function () {
            $(".loader-img").show();
            var code = $('.input').val();
            $.ajax({
                type: "GET",
                url: "https://bg-sync-api-dev.kapiva.in/staging_api/index.php",
                data: {
                    pincode: code
                },
                success: function (html) {
                    var data = jQuery.parseJSON(html);
                    var errMessage = data.err;

                    if (errMessage == null) {

                        $('.result-wrap').html('Get it by ' + '<div id="dilvery-date">' + data['edd_stamp'] + '</div>');
                    } else {
                        $('.result-wrap').html('<div id="dilvery-date">' + errMessage + '</div>');
                    }
                    $(".loader-img").hide();
                }
            });
        });

        //sticky add-to-cart
        var pro_id = $('input[name="product_id"]').val();
        $.ajax({
            type: "GET",
            url: "https://bg-sync-api-dev.kapiva.in/staging_api/product_variants.php",
            async: false,
            data: {
                pro_id: pro_id
            },
            success: function (html) {
                var data = JSON.parse(html);

                var cnt = 0;
                var newhtml = '';
                //var pricehtml

                var actualPrice;
                var varientId = [];
                var skus = [];
                var skudata = [];
                var stock = [];
                for (var i = 0; i < data['data'].length; i++) {
                    skudata.push(data['data'][0]['sku']);
                    skus.push(data['data'][i]['sku']);
                    stock.push(data['data'][i]['inventory_level']);

                }

                if (stock[0] == 0) {
                    var html = '';
                    $(".pdp-outofstock").removeClass("d-none");
                    $("#form-action-addToCart").addClass("d-none");
                    $(".form-field--increments").addClass("d-none");
                    html += '<div class="cart-div"><a href="javascript:void(0);" class="button button--small pdp-outofstock disabled">Out of stock</a></div>';
                    $("#add-to-cart-wrapper").append(html);
                }
                var i = 0;
                $("body .form-option").each(function (index) {

                    $(this).attr("variant_id", varientId[i]);
                    $(this).attr("sku", skus[i]);
                    $(this).attr("inventory", stock[i]);
                    i++;
                });
            }
        });
        //wishlist
        var cus_id = $('input[name="customer_id"]').val();

        if (cus_id) {
            $.ajax({
                type: "GET",
                url: "https://bg-sync-api-dev.kapiva.in/staging_api/getwishlists.php",
                async: false,
                data: {
                    cus_id: cus_id
                },
                success: function (data) {

                    var val = JSON.parse(data);
                    var Data = val['data'][0]['items'];
                    for (var i = 0; i < Data.length; i++) {
                        for (var j = 0; j < pid.length; j++) {
                            if (Data[i]['product_id'] == pid[j]) {
                                $("body .productWhislist_" + Data[i]['product_id']).addClass("addedWishlist_" + Data[i]['product_id']);
                                $("body .productWhislist_" + Data[i]['product_id']).find(".ProductWhislist .button-wishlist").addClass("filled");
                                $("body .productWhislist_" + Data[i]['product_id']).find(".form-wishlist .button-wishlist").addClass("filled");
                            }
                        }
                    }
                },
            });
        }


    }
    if ($(".cart-body").length != 0) {

        $('.cart-item').each(function (index, value) {

            $(this).find(".cart-item-info.cart-item-quantity .form-increment.remove .arrowup").attr("disabled", "disabled");
        });

    }

    if ($(".default-body").length !== 0) {
        /*$(".tabs-list li.productCarousel-slide a").on('click', function () {
            var _currIndex = $(this).parent().index();
            $(".tabs-list li.productCarousel-slide a").removeClass('active');
            $(this).addClass('active');
            $('.tabs-content .tab-content-ingr').addClass('d-none');
            $('.tabs-content .tab-content-ingr:eq(' + _currIndex + ')').removeClass('d-none');
            $(".wrap").removeClass("active");
        });*/

        $(document).on("click", ".wrap", function () {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
            } else {
                $(this).addClass("active");
            }
        });

        $(document).on("click", ".ingredientfilterbutton", function () {
            var val = '';
            $(".wrap.active").each(function () {
                var url = $(this).attr("urlname");
                if (val == '') {
                    val = "&Ingredient=" + url;
                } else {
                    val += "&Ingredient=" + url;
                }
            });
            if (val.length > 0) {
                var finalurl = "/product/?_bc_fsnf=1" + val;
                $(".ingredientfilterbutton").attr("href", finalurl);
            }
        });
        //wishlist
        var cus_id = $('input[name="customer_id"]').val();

        if (cus_id) {
            $.ajax({
                type: "GET",
                url: "https://bg-sync-api-dev.kapiva.in/staging_api/getwishlists.php",
                async: false,
                data: {
                    cus_id: cus_id
                },
                success: function (data) {

                    var val = JSON.parse(data);
                    var Data = val['data'][0]['items'];
                    for (var i = 0; i < Data.length; i++) {
                        for (var j = 0; j < pid.length; j++) {
                            if (Data[i]['product_id'] == pid[j]) {
                                $("body .productWhislist_" + Data[i]['product_id']).addClass("addedWishlist_" + Data[i]['product_id']);
                                $("body .productWhislist_" + Data[i]['product_id']).find(".ProductWhislist .button-wishlist").addClass("filled");
                                $("body .productWhislist_" + Data[i]['product_id']).find(".form-wishlist .button-wishlist").addClass("filled");
                            }
                        }
                    }
                },
            });
        }
    }

    if ($(".account_orderstatus-body").length != 0) {
        // var o_id = '';
        $(".order").each(function () {
            var order_id = $(this).attr("number");
            // if(o_id == ''){
            //     o_id =order_id;
            //  }else{
            //     o_id = o_id+','+order_id;
            //  }
            $.ajax({
                type: "GET",
                url: "https://bg-sync-api-dev.kapiva.in/staging_api/getshippingdetails.php",
                async: false,
                data: { order_id: order_id },
                success: function (data) {
                    var html = '';
                    if (data != '') {
                        html += '<span><a href="https://www.pickrr.com/tracking/#/?tracking_id=' + data + '" target="_blank">Track Your Order</a></span>'

                    } else {
                        html += '<span style="text-align: center;">-</span>'
                    }
                    $(".track_" + order_id).append(html);
                },
            });
        });


    }
    if ($(".category-body").length !== 0) {

        var href = window.location.href;
        var ing = href.split("&Ingredient=");
        var url = href.split("/product");

        var html = '';

        for (var i = 0; i < ing.length; i++) {

            if (i != 0) {
                var data = "&Ingredient=" + ing[i] + "";
                var str = url[1].replace(data, '');

                var finalurl = str.replace("Ingredient", "Ingredient%5B%5D");
                html += '<li>'
                html += '<a href="/product' + str + '" class="facetLabel" rel="nofollow" data-faceted-search-facet="">' + ing[i] + ''
                html += '<svg class="icon">'
                html += '<use xlink:href="#icon-close"></use>'
                html += '</svg>'
                html += '</a>'
                html += '</li>'
            }


        }
        $(".inlineList.inlineList--labels").html(html);
        //wishlist
        var cus_id = $('input[name="customer_id"]').val();

        if (cus_id) {
            $.ajax({
                type: "GET",
                url: "https://bg-sync-api-dev.kapiva.in/staging_api/getwishlists.php",
                async: false,
                data: {
                    cus_id: cus_id
                },
                success: function (data) {

                    var val = JSON.parse(data);
                    var Data = val['data'][0]['items'];
                    for (var i = 0; i < Data.length; i++) {
                        for (var j = 0; j < pid.length; j++) {
                            if (Data[i]['product_id'] == pid[j]) {
                                $("body .productWhislist_" + Data[i]['product_id']).addClass("addedWishlist_" + Data[i]['product_id']);
                                $("body .productWhislist_" + Data[i]['product_id']).find(".ProductWhislist .button-wishlist").addClass("filled");
                                $("body .productWhislist_" + Data[i]['product_id']).find(".form-wishlist .button-wishlist").addClass("filled");
                            }
                        }
                    }
                },
            });
        }

    }


});

function loadimage() {
    const load = document.querySelector(".load");
    const content = document.querySelector(".loaded");
    $(".load").each(function () {
        $(this).addClass("hide");
        $(this).find(".loaded").addClass("shown");
    });
}
