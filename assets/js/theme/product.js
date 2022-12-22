/*
 Import all product specific js
 */
import PageManager from './page-manager';
import Review from './product/reviews';
import collapsibleFactory from './common/collapsible';
import ProductDetails from './common/product-details';
import videoGallery from './product/video-gallery';
import { classifyForm } from './common/utils/form-utils';
import modalFactory from './global/modal';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import 'owl.carousel';

var BearerToken = '';
export default class Product extends PageManager {
    constructor(context) {
        super(context);
        this.url = window.location.href;
        this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
        this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
        this.reviewModal = modalFactory('#modal-review-form')[0];
        BearerToken = context.bearerToken;
    }

    onReady() {
             
          
        let pId = document.querySelectorAll(".product_id")[0].value;
        //set count of addtocart
        CountAddToCart()
       
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
                     if(pId == pid){
                      var qty = value.quantity;
                      document.querySelectorAll("#countinnermain")[0].textContent = qty;
                      document.querySelectorAll("#countinnermain")[0].classList.add("fillPDPCount");
                      document.querySelectorAll("#countinnermain")[0].parentElement.classList.add("fill-Prod-add-to-cart");
                    }
                    })
                  
                  }
                })
              })
            }
          }, 200)
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
                    youtube[i].style.backgroundImage = "url("+source+")"; 
                    youtube[i].addEventListener("click", function () {
                    
                    this.setAttribute("href","https://www.youtube.com/embed/"+id+"?origin=https://www.kapiva.in")
                    var iframe = document.createElement("iframe");
                    iframe.setAttribute("width", "100%");
                    iframe.setAttribute("loading", "lazy");
                    iframe.setAttribute("title", "YouTube video player");
                    iframe.setAttribute("frameborder", "0");
                    iframe.setAttribute("allow", "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
                    iframe.setAttribute("allowfullscreen", "");
                    iframe.setAttribute("class", "kapiva-curve big");
                    iframe.setAttribute("src", "https://www.youtube.com/embed/" +id+ "?rel=0&showinfo=0&autoplay=1");
                    this.innerHTML = "";
                    this.appendChild(iframe);
                });
                fancyopen[i].addEventListener("click", function () {
                    document.querySelectorAll(".hiddengallery")[0].style.backgroundImage = "url("+source+")"; 
                    document.querySelectorAll(".hiddengallery")[0].setAttribute("href","https://www.youtube.com/embed/"+id+"?origin=https://www.kapiva.in")
                });
            };
            })();
            //end sticky add-to-cart

        //pageview event
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
        'page-type': 'pdp'
        });
        let u_id=document.getElementsByClassName("customer_id")[0].value;
        var pro_id = document.querySelector('.stickey_data').getAttribute("sku");
         
        // Listen for foundation modal close events to sanitize URL after review.
        $(document).on('close.fndtn.reveal', () => {
            if (this.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
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
          let ingredientstab = document.querySelectorAll(".ingredients-tab-header li");
          for (let i = 0; i < ingredientstab.length; i++) {
          var ing = ingredientstab[i].textContent;
          ingredient.push(ing);
          if(ingredients == ''){
              ingredients = ing;
          }else{
              ingredients = ingredients+','+ing;
          }
          };
          var pro_id = document.getElementsByClassName("stickey_data")[0].getAttribute('id');
          var discount = '';
          if(document.querySelectorAll(".productView-image-main .productView-image .saleSavingTag").length > 0){
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
          var query = `query productById{
          site {
          product(entityId: `+ pro_id + `) {
          entityId
          name
          path
          inventory{
              isInStock
              aggregated{
              availableToSell
              warningLevel
              }
          }
          categories
          {
              edges
              {
              node
              {
                  id
                  name
                  
              }
              } 
          }
          relatedProducts
          {
              edges{
              node{
                  entityId
                  name
              }
              }
          }
          reviews{
              edges{
              node{
                  title
                  text
                  rating
              }
              }
          }
          plainTextDescription
          defaultImage {
              ...ImageFields
          }
          images {
              edges {
              node {
                  ...ImageFields
              }
              }
          }
          reviewSummary {
              summationOfRatings
              numberOfReviews
          }
          prices (includeTax:true){
              price {
              ...MoneyFields
              }
              salePrice {
              ...MoneyFields
              }
              retailPrice {
              ...MoneyFields
              }
              basePrice {
                ...MoneyFields
                }
          }
          }
          }
          }
          fragment ImageFields on Image {

          url640wide: url(width: 640)

          }

          fragment MoneyFields on Money {
          value
          currencyCode
          }`;

          axios({
              url: '/graphql',
              method: 'post',
              contentType: "application/json",
              headers: {
                'Authorization': 'Bearer ' + BearerToken
             },
              data: {
                query:query
              }
            }).then((result) => {     
                var alldata = result.data.data.site.product;
              if (alldata != null) {
              image = alldata.defaultImage.url640wide;
              url = alldata.path;
              p_name = alldata.name;
              if(alldata.inventory.aggregated != null)
              var quantity = alldata.inventory.aggregated.availableToSell;
              var product_details = document.getElementsByClassName("product_details")[0];
                  product_details.setAttribute("quantity",quantity);
              if (alldata.prices.retailPrice != null) {
                  mrp = alldata.prices.retailPrice.value;
                  product_details.setAttribute("price",mrp);
                  
              }else{
                mrp = alldata.prices.basePrice.value;
                product_details.setAttribute("price",mrp);
              }
              if (alldata.prices.salePrice != null) {
                  discounted_price = alldata.prices.salePrice.value;
                  
                  product_details.setAttribute("sale_price",discounted_price);
              }
              Product_image_URL = alldata.defaultImage.url640wide;


              var data = alldata.relatedProducts.edges;
              var related_id = [];
              data.forEach(function (value, index) {
                  
                  related_id.push(value.node.entityId);

              })
              similar_product = related_id;
              var review = alldata.reviews.edges;
              
              var reviews = [];
              if (review.length != 0) {
                  var num = 0;
                  for (var i = 0; i < 3; i++) {
                  if (review.length > i)
                      reviews.push(review[i].node);

                  }
              }
              var category = alldata.categories.edges;
              
              var category_id = '';
                                  var category_name = '';
                                  category.forEach(function (value, index) {
                                      
                                      if(category_id == '' && category_name == ''){
                                          var cat_id = value.node.id;
                                          var splited_url = atob(cat_id);
                                          var categoryid = splited_url.split("Category:");
                                          category_id = categoryid[1];
                                      
                                          category_name = value.node.name
                                      }
                                      else{
                                          var splited_url = atob(value.node.id);
                                          var categoryid= splited_url.split("Category:");
                                          var catid = categoryid[1];
                                          category_id = category_id+','+catid;
                                          category_name = category_name+','+value.node.name;
                                      }

                                  })
                                  
                  var Category_id = [];
              var Category_name = [];
              category.forEach(function (value, index) {
                  var c_id = value.node.id;
                  var splited_url = atob(c_id);
                  var catid = splited_url.split("Category:");  
                  var Cat_id = catid[1];
                  var cat_name = value.node.name
                  Category_id.push(Cat_id);
                  Category_name.push(cat_name);
              })
              var categories = { Category_id, Category_name };
              product_details.setAttribute("category_id",category_id);
              product_details.setAttribute("category_name",category_name);
              setTimeout(function () { 
                  var benefit = [];
                  let OverviewSlide = document.querySelectorAll(".OverviewSlide.slick-active .content ul li");
                  for (let i = 0; i < OverviewSlide.length; i++) {

                  benefit.push(OverviewSlide[i].textContent)
                  };
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
          var productObject ={
              productId : pid,
              productName : pname,
              productPrice : price,
              productSalePrice : salePrice,
          };
          var products = [];
          let related_products = document.getElementsByClassName("related_products");
          if(related_products.length > 0){
          related_products[0].forEach(function (value, index) {
  
          var price_actual = value.getElementsByClassName('price--non-sale')[0].textContent;
          var sale_price_data = value.getElementsByClassName('price--actual')[0].textContent;
          if(price_actual != ''){
          var price_data = price_actual.split("₹");
          var price = price_data[1].replace(",","");
          }
          var sale_data = sale_price_data.split("₹");
          var salePrice = sale_data[1].replace(",","");
          var obj = {
          "product_id" : value.getElementsByClassName('price--actual')[0].getAttribute("data-product-id"),
          "name" : value.querySelectorAll(".card .card-body .card-title a")[0].textContent,
          "price" : price,
          "salePrice" : salePrice
          
          };
          products.push(obj);
          })
      }

      //end webengage for product view

      
        //add rating
        var element = document.getElementById("rating-rate");
       if(element != null){
        element.addEventListener('change', function(){
            let selector = document.querySelector('.stickey_data');
            let Product_Id = document.querySelector(".Product_Id");
            let Product_details = document.querySelector(".product_details");

            let name = selector.getAttribute('title');  
            let pid = Product_Id.value;
            let quantity = Product_details.getAttribute("quantity");
            let price = Product_details.getAttribute("price");
            let sale_price = Product_details.getAttribute("sale_price");
            let category_name = Product_details.getAttribute("category_name");
            let categoryName = [category_name];
            let category_id = Product_details.getAttribute("category_id");
            let categoryId = [category_id];
            let categories = {categoryId,categoryName};
             
            var data = { 'Name': name,
                         'product_id' : pid,
                          'price' : price,
                          'sale_price' : sale_price,
                          'quantity' : quantity,
                          'categories' : categories
                       };
           window.dataLayer = window.dataLayer || [];
                       window.dataLayer.push({reviewRating : data});
        });
    }
         //end add rating

        //submit review
        var x = document.getElementsByClassName("submit--review");
        if(x.length != 0){
        x[0].addEventListener('click', function(e){
             
            let selector = document.querySelector('.stickey_data');
            let Product_Id = document.querySelector(".Product_Id");
            let Product_details = document.querySelector(".product_details");

            let name = selector.getAttribute('title');  
            let pid = Product_Id.value;
            let quantity = Product_details.getAttribute("quantity");
            let price = Product_details.getAttribute("price");
            let sale_price = Product_details.getAttribute("sale_price");
            let category_name = Product_details.getAttribute("category_name");
            let categoryName = [category_name];
            let category_id = Product_details.getAttribute("category_id");
            let categoryId = [category_id];
            let categories = {categoryId,categoryName};
             
           let data = { 'Name': name,
                        'product_id' : pid,
                         'price' : price,
                         'sale_price' : sale_price,
                         'quantity' : quantity,
                         'categories' : categories
                      };
           setTimeout(function(){
           var len = document.querySelectorAll(".form-field--error").length;
           if(len == 0){
          window.dataLayer = window.dataLayer || [];
                      window.dataLayer.push({reviewComment : data});
           }
           },1000);
        });
    }
        //end submit review
       
         //add to cart  and buynow webengage
     function addtocartwebengage(pid) {
        var totalcount = document.getElementsByClassName("form-input--incrementTotal")[0].value;
        var count = document.getElementsByClassName("cart-quantity")[0].textContent;
        var pro_sale_price = document.querySelector(".stickey_data").getAttribute("sale_price").replace(/\D+/g, '');
  var pro_actual_price = document.querySelector(".stickey_data").getAttribute("actual_price").replace(/\D+/g, '');
  var ga_discount = 100*(pro_actual_price-pro_sale_price)/pro_actual_price;
       
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

        if(document.querySelectorAll(".productView-image-main .productView-image .saleSavingTag").length != 0){
        var dis = document.querySelectorAll(".productView-image-main .productView-image .saleSavingTag")[0].textContent;
        var discount = dis.trim();
         }
        fetch('/api/storefront/carts?productId=' + pid,
          {
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
                                if(value.productId == pid){
                                     Quantity = value.quantity; 
                                     pro_sku = value.sku; 
                                     document.getElementsByClassName("pdpCount")[0].textContent = Quantity;
                                     document.getElementsByClassName("pdpCount")[0].classList.add("fillPDPCount");
                                }
                                if(totalitems == ''){
                                    totalitems = value.quantity;
                                }else{
                                    totalitems += value.quantity;
                                }
                                
                            })
                          
                            window.dataLayer = window.dataLayer || [];
                            window.dataLayer.push({
                              'numberOfItemsInCart': totalitems
                           });
              }
    
              var query = `query productById{
                site {
                product(entityId: `+ pid + `) {
                  id
                  entityId
                  name
                  inventory{
                   isInStock
                   aggregated{
                     availableToSell
                     warningLevel
                   }
                 }
                  categories
                  {
                   edges
                    {
                      node
                      {
                        id
                        name
                        
                      }
                    } 
                  }
                  prices (includeTax:true){
                    price {
                      ...MoneyFields
                    }
                    salePrice {
                      ...MoneyFields
                    }
                    retailPrice {
                      ...MoneyFields
                    }
                    basePrice {
                        ...MoneyFields
                        }
                  }
                 
                }
                }
                }
                
                fragment MoneyFields on Money {
                value
                currencyCode
                }`;
                axios({
                    url: '/graphql',
                    method: 'post',
                    contentType: "application/json",
                    headers: {
                      'Authorization': 'Bearer ' + BearerToken
                   },
                    data: {
                      query:query
                    }
                  }).then((result) => {     
                      var alldata = result.data.data.site.product;
                   if(alldata != null){
                  p_id = alldata.entityId;
    
                  p_name = alldata.name;
                  if (alldata.prices.retailPrice != null) {
                    mrp = alldata.prices.retailPrice.value;
                  }else{
                    mrp = alldata.prices.basePrice.value;
                  }
                  if (alldata.prices.salePrice != null) {
                    discounted_price = alldata.prices.salePrice.value;
                  }else{
                      discounted_price = 0;
                  }
    
                  var category = alldata.categories.edges;
    
    
                  var category_ID = [];
                  var category_NAME = [];
                  category.forEach(function (value, index) {
    
                    category_ID.push(value.node.id);
                    category_NAME.push(value.node.name);
    
                  })
                  var categories = { category_ID, category_NAME };
                             var category_id = '';
                                var category_name = '';
                                category.forEach(function (value, index) {
                                   if(category_id == '' && category_name == ''){
                                       var cat_id = value.node.id;
                                       var splited_url = atob(cat_id);
                                       var categoryid = splited_url.split("Category:");
                                        category_id = categoryid[1];
                                       category_name = value.node.name
                                     }
                                      else{
                                        var splited_url = atob(value.node.id);
                                        var categoryid= splited_url.split("Category:");
                                         var catid = categoryid[1];
                                          category_id = category_id+','+catid;
                                          category_name = category_name+','+value.node.name;
                                    }
    
                                })
    
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
                  dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
                  dataLayer.push({
                      'event': 'addToCart',
                      'ecommerce': {
                        'currencyCode': 'INR',
                        'add': {                                // 'add' actionFieldObject measures.
                          'products': [{                        //  adding a product to a shopping cart.
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
                     dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
                     dataLayer.push({
                         'event': 'add_to_cart',
                         'ecommerce': {
                          
                           'items': {                                // 'add' actionFieldObject measures.
                             'products': [{                        //  adding a product to a shopping cart.
                               'item_name': p_name,
                               'item_id': pro_sku,
                               'currency': 'INR',
                               'price': discounted_price,
                               'item_brand': 'Kapiva',
                               'discount':pro_actual_price-pro_sale_price,
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
                  webengage.track("add to cart", {
                    "Product_ID": p_id,
                    "Product_Name": p_name,
                    "Category_ID": category_id,
                    "Category_Name": category_name,
                    "MRP": Number(mrp),
                    "Discount": discount,
                    "Discount_Price": discounted_price,
                    "Quantity": Quantity,
                    "Total_Item_in_cart": total_item_in_cart,
                    "Cart_value": cart_value,
                    "Total_Item_in_cart": total_item_in_cart,
                    "Cart_value": cart_value
                  });
                  
                  var productObject = {
                    "Product_ID": p_id,
                    "Product_Name": p_name,
                    "categories": categories,
                    "price": mrp,
                    "salePrice": discounted_price,
                    "Quantity": Quantity
                  };
                   window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({addToCartProduct : productObject});
                    
                     
                }
              });
            });
          });
      }
      //end add to cart  and buynow webengage

        //add to cart product
        var x = document.getElementById("form-action-addToCart");
        x.addEventListener('click', function(e){
     var totalcount = document.getElementsByClassName("form-input--incrementTotal")[0].value;
     if(totalcount > 0){
            var Data = this;
        this.classList.add("sendloadingaddtocartpdp")
       
        var count = document.getElementsByClassName("cart-quantity")[0].textContent;
      //  document.getElementsByClassName("addTocartText")[0].textContent = "Added to cart";
        var pid = document.getElementsByClassName("product_id")[0].value;
        var dataid = document.getElementsByClassName("dataid")[0].value;
       
        e.preventDefault();
       
        const form = document.querySelector('[data-cart-item-add]');
        const formData = new FormData(form);
          
                    axios({
                        url: '/remote/v1/cart/add',
                        method: 'post',
                        dataType: 'json',
                        data: formData,
                    }).then((result) => {       
                        if(result.data.data.cart_item){
                            Data.classList.remove("sendloadingaddtocartpdp")
                            if (count == 0) {
                                document.getElementsByClassName("cart-icon")[0].click();
                            }
                            document.getElementsByClassName("cart-quantity")[0].textContent = parseInt(count) + parseInt(totalcount);
                            document.getElementsByClassName("addTocartText")[0].textContent = "Add to cart";
                        addtocartwebengage(pid);
                        
                        }
              });
           
        
    }
    })
   //end add to cart product

        let validator;

        // Init collapsible
        collapsibleFactory();

        this.productDetails = new ProductDetails($('.productView'), this.context, window.BCData.product_attributes);
        this.productDetails.setProductVariant();

        videoGallery();

        this.bulkPricingHandler();

        const $reviewForm = classifyForm('.writeReview-form');

        if ($reviewForm.length === 0) return;

        const review = new Review($reviewForm);

        $('body').on('click', '[data-reveal-id="modal-review-form"]', () => {
            validator = review.registerValidation(this.context);
            this.ariaDescribeReviewInputs($reviewForm);
        });

        $reviewForm.on('submit', () => {
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
            MobileSearchIcon.addEventListener('click', function(e){
                document.getElementsByClassName("HeaderSearch")[0].toggle();
                document.querySelectorAll(".HeaderWrap .RighrtHeader-Wrap .HeaderSearch").toggle();
             });
         }
        //end Mobile search icon click
         
    }

    ariaDescribeReviewInputs($form) {
        $form.find('[data-input]').each((_, input) => {
            const $input = $(input);
            const msgSpanId = `${$input.attr('name')}-msg`;

            $input.siblings('span').attr('id', msgSpanId);
            $input.attr('aria-describedby', msgSpanId);
        });
    }

    productReviewHandler() {
        if (this.url.indexOf('#write_review') !== -1) {
            this.$reviewLink.trigger('click');
        }
    }

    bulkPricingHandler() {
        if (this.url.indexOf('#bulk_pricing') !== -1) {
            this.$bulkPricingLink.trigger('click');
        }
    }
}
