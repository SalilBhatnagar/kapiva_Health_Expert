import 'focus-within-polyfill';
import $ from 'jquery';
import './global/jquery-migrate';
import './common/select-option-plugin';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import mobileMenuToggle from './global/mobile-menu-toggle';
import menu from './global/menu';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import cartPreview from './global/cart-preview';
import privacyCookieNotification from './global/cookieNotification';
import adminBar from './global/adminBar';
import carousel from './common/carousel';
import loadingProgressBar from './global/loading-progress-bar';
//import { inViewCheck } from './global/product-card-options'; // Color options on product card
import svgInjector from './global/svg-injector';
import { translatePageBuilderValues } from './common/utils/translations-utils';

export default class Global extends PageManager {
    onReady() {
     
        const {
            channelId,
            cartId,
            productId,
            categoryId,
            secureBaseUrl,
            maintenanceModeSettings,
            adminBarLanguage,
            showAdminBar,
            isProductCardPresented,
            isProductListPresented,
        } = this.context;
        let BearerToken = this.context.bearerToken;
      //  inViewCheck(this.context); // swatches on product card
        cartPreview(secureBaseUrl, cartId);
        quickSearch();
        currencySelector(cartId);
        foundation($(document));
        quickView(this.context);
        carousel(this.context);
        menu();
        mobileMenuToggle();
        privacyCookieNotification();
        if (showAdminBar) {
            adminBar(secureBaseUrl, channelId, maintenanceModeSettings, JSON.parse(adminBarLanguage), productId, categoryId);
        }
        loadingProgressBar();
        svgInjector();

        if (isProductListPresented || isProductCardPresented) {
            translatePageBuilderValues();
        }
       
        //set count of addtocart
        CountAddToCart()
        var total_item_in_cart = '';
        function CountAddToCart() {
          var setinterval = setInterval(function () {
            var len = document.getElementsByClassName("bag-icon").length;
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
    
                      var qty = value.quantity;
                      if (total_item_in_cart == '') {
                        total_item_in_cart = qty;
                      } else {
                        total_item_in_cart = total_item_in_cart + qty;
                      }
                      
                      document.querySelectorAll('.bag-icon').forEach(item => {
    
                        var p_id = item.getAttribute("data-product-id");
                        if (p_id != undefined && p_id == pid && qty != null) {
                          let el = item;
                      
                          item.parentElement.querySelectorAll('#pro-count')[0].textContent = qty;
                          item.parentElement.parentElement.parentElement.parentElement.classList.add("fill-Prod-add-to-cart");
                          item.parentElement.querySelectorAll('#pro-count')[0].classList.add("fill-count");
                        }
    
                      })
                    })
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                         'numberOfItemsInCart': total_item_in_cart
                      });
                  }
                })
              })
            }
          }, 200)
        }
       //end set count of addtocart
     
         //buynow trending products
         document.querySelectorAll('.Prod-AddToCart .buy-now.weight_manage_buy_now').forEach(item => {
          item.addEventListener('click', function (event) {
             event.preventDefault();
             var Data = this;
             this.classList.add("sendloadingbuynow")
             var discount_pr = '';
            
               if(this.parentElement.parentElement.parentElement.querySelectorAll(".card-figure .card-figure__link .tag-section .groupBox .saleSavingTag").length > 0){
              var discount = this.parentElement.parentElement.parentElement.querySelectorAll(".card-figure .card-figure__link .tag-section .groupBox .saleSavingTag")[0].textContent;
               discount_pr = discount.trim();
               }
            var pro_id = this.getAttribute("data-product-id");
            if (this.classList.contains('disabled') == false) {
              var formData = new FormData();
              formData.append("action","add");
              formData.append("product_id",pro_id);
              formData.append("qty",1);

              axios({
                url: '/remote/v1/cart/add',
                method: 'post',
                dataType: 'json',
                data: formData
              }).then((result) => {
                if (result.data.data.cart_item) {
                  buyNow(pro_id, discount_pr)
                 
                }else{
                  Data.classList.remove("sendloadingbuynow")
                }
              }).catch(function (error) {
                Data.classList.remove("sendloadingbuynow")
             })
            }
          });
        });
        //end buynow trending products

    document.querySelectorAll('.Prod-AddToCart .Prod-AddToCart-add').forEach(item => {
      item.addEventListener('click', function (event) {
    
        event.preventDefault();
        var Data = this.querySelectorAll(".bag-icon")[0];
        Data.classList.add("sendloadingaddtocart")
        var count = document.getElementsByClassName("cart-quantity")[0].textContent;
        var pro_id = Data.getAttribute("data-product-id");
        var discount_pr = '';
        if(Data.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelectorAll(".card-figure .card-figure__link .tag-section .groupBox .saleSavingTag").length > 0){
        var discount = Data.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelectorAll(".card-figure .card-figure__link .tag-section .groupBox .saleSavingTag")[0].textContent;
        discount_pr = discount.trim();
      }
      var formData = new FormData();
      formData.append("action","add");
      formData.append("product_id",pro_id);
      formData.append("qty",1);
      let selector = document.querySelectorAll("div.card[data-product-id='"+pro_id+"']")[0];
      if(selector != undefined){
      let dataAttributes = selector.getAttribute("data-attr-option");
     
      if(dataAttributes != undefined){
        let arr = JSON.parse(dataAttributes);
        var result = Object.entries(arr);

        result.forEach(function (value, key) {
         
          formData.append("attribute["+value[0]+"]",value[1]);
        })
      }
    }
      if(this.classList.contains("has_options")){
        var GraphQL_Query = `query productById{
          site {
          product(entityId: `+ pro_id + `) {
          entityId
          name
          productOptions(first: 50) {
            edges {
              node {
                entityId
                displayName
                isRequired
                isVariantOption
                ... on CheckboxOption {
                  checkedByDefault
                }
                ... on MultipleChoiceOption {
                  values(first: 10) {
                    edges {
                      node {
                        entityId
                        label
                        isDefault
                        ... on SwatchOptionValue {
                          hexColors
                          imageUrl(width: 200)
                        }
                      }
                    }
                  }
                }
              }
            }
         }
          
          }
          }
          }`;
          axios({
            url: '/graphql',
            method: 'post',
            contentType: "application/json",
            async: false,
            headers: {
              'Authorization': 'Bearer ' + BearerToken
           },
            data: {
              query:GraphQL_Query
            }
          }).then((result) => {     
              var optionData = result.data.data.site.product.productOptions.edges;
              var variant_attr = [];
              if(optionData != undefined && optionData.length > 0){
                var variants = optionData;
               
                variants.forEach(function(variant,index){
                    var is_default = false;
                    if(variant.node.isVariantOption){
                      let  variant_values = variant.node.values.edges;
                        variant_values.forEach(function(variant_value){
                            if(variant_value.node.isDefault){
                                is_default = true;
                                formData.append("attribute["+variant.node.entityId+"]",variant_value.node.entityId);
                                     let obj = {
                                          optionId: variant.node.entityId,
                                          optionValue: variant_value.node.entityId,
                                        }
                                        variant_attr.push(obj);  
        
                            }
                        });
                    }else{
                        is_default = true;
                    }
        
                    if(is_default == false){
                      formData.append("attribute["+variants[index].node.entityId+"]",variants[index].node.values.edges[0].node.entityId);
                        let obj = {
                          optionId: variants[index].node.entityId,
                          optionValue: variants[index].node.values.edges[0].node.entityId,
                        }
                        variant_attr.push(obj); 
                    }
                });
                axios({
                  url: '/remote/v1/cart/add',
                  method: 'post',
                  dataType: 'json',
                  data:formData
                }).then((result) => {
                  if (result.data.data.cart_item) {
                               document.querySelector(".cart-quantity").textContent = parseInt(count) + 1;
                                  if (count == 0) {
                                      document.querySelectorAll(".cart-icon")[0].click();
                                  }
                      }else{
                        Data.classList.remove("sendloadingaddtocart") 
                      }
                      var p_id = productId;
                      
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
                                  
                                      getid.forEach(function (value,key) {
                                        var pid = value.productId;
                                       var qty = value.quantity;
                                      if (pid != undefined && pid == pro_id){
                                        Data.querySelectorAll('.Prod-AddToCart .Prod-AddToCart-add .form .button .heart-icon a #pro-count')[0].textContent = qty;
                                        Data.parentElement.parentElement.parentElement.parentElement.classList.add("fill-Prod-add-to-cart");
                                        Data.parentElement.querySelectorAll('.Prod-AddToCart .Prod-AddToCart-add .form .button .heart-icon a #pro-count')[0].classList.add("fill-count");
                                        Data.classList.remove("sendloadingaddtocart")
                                        addToCart(pro_id, discount_pr)
                                      }
                                    });
                                }
                                });
                              }).catch(function (error) {
                                Data.classList.remove("sendloadingaddtocart")
                             });
              });
        }
            
          });
         
      }else{
        axios({
          url: '/remote/v1/cart/add',
          method: 'post',
          dataType: 'json',
          data:formData
        }).then((result) => {
          if (result.data.data.cart_item) {
                       document.querySelector(".cart-quantity").textContent = parseInt(count) + 1;
                          if (count == 0) {
                              document.querySelectorAll(".cart-icon")[0].click();
                          }
              }else{
                Data.classList.remove("sendloadingaddtocart") 
              }
              
              
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
                          
                              getid.forEach(function (value,key) {
                                var pid = value.productId;
                               var qty = value.quantity;
                              if (pid != undefined && pid == pro_id){
                                Data.querySelectorAll('.Prod-AddToCart .Prod-AddToCart-add .form .button .heart-icon a #pro-count')[0].textContent = qty;
                                Data.parentElement.parentElement.parentElement.parentElement.classList.add("fill-Prod-add-to-cart");
                                Data.parentElement.querySelectorAll('.Prod-AddToCart .Prod-AddToCart-add .form .button .heart-icon a #pro-count')[0].classList.add("fill-count");
                                Data.classList.remove("sendloadingaddtocart")
                                addToCart(pro_id, discount_pr)
                              }
                            });
                        }
                        });
                      }).catch(function (error) {
                        Data.classList.remove("sendloadingaddtocart")
                     });
      });
      }
       
    });
  });
 

    document.querySelectorAll('.Prod-AddToCart .buy-now.event_buy_now_add_to_cart').forEach(item => {
      item.addEventListener('click', function (event) {
        this.classList.add("sendloadingbuynow")
        var Data = this;
        var pro_id = this.getAttribute("data-product-id");
        var discount_pr = '';
               
               if(this.parentElement.parentElement.parentElement.querySelectorAll(".card-figure .card-figure__link .tag-section .groupBox .saleSavingTag").length > 0){
              var discount = this.parentElement.parentElement.parentElement.querySelectorAll(".card-figure .card-figure__link .tag-section .groupBox .saleSavingTag")[0].textContent;
               discount_pr = discount.trim();
               }
               var formData = new FormData();
                formData.append("action","add");
                formData.append("product_id",pro_id);
                formData.append("qty",1);
                let selector = document.querySelectorAll("div.card[data-product-id='"+pro_id+"']")[0];
                if(selector != undefined){
                let dataAttributes = selector.getAttribute("data-attr-option");
               
                if(dataAttributes != undefined){
                  let arr = JSON.parse(dataAttributes);
                  var result = Object.entries(arr);
  
                  result.forEach(function (value, key) {
                   
                    formData.append("attribute["+value[0]+"]",value[1]);
                  })
                }
              }
              if(this.classList.contains("has_options")){
                var GraphQL_Query = `query productById{
                  site {
                  product(entityId: `+ pro_id + `) {
                  entityId
                  name
                  productOptions(first: 50) {
                    edges {
                      node {
                        entityId
                        displayName
                        isRequired
                        isVariantOption
                        ... on CheckboxOption {
                          checkedByDefault
                        }
                        ... on MultipleChoiceOption {
                          values(first: 10) {
                            edges {
                              node {
                                entityId
                                label
                                isDefault
                                ... on SwatchOptionValue {
                                  hexColors
                                  imageUrl(width: 200)
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                 }
                  
                  
                  
                  }
                  }
                  }`;
                  axios({
                    url: '/graphql',
                    method: 'post',
                    contentType: "application/json",
                    async: false,
                    headers: {
                      'Authorization': 'Bearer ' + BearerToken
                   },
                    data: {
                      query:GraphQL_Query
                    }
                  }).then((result) => {     
                      var optionData = result.data.data.site.product.productOptions.edges;
                      var variant_attr = [];
                      if(optionData != undefined && optionData.length > 0){
                        var variants = optionData;
                       
                        variants.forEach(function(variant,index){
                            var is_default = false;
                            if(variant.node.isVariantOption){
                              let  variant_values = variant.node.values.edges;
                                variant_values.forEach(function(variant_value){
                                    if(variant_value.node.isDefault){
                                        is_default = true;
                                        formData.append("attribute["+variant.node.entityId+"]",variant_value.node.entityId);
                                             let obj = {
                                                  optionId: variant.node.entityId,
                                                  optionValue: variant_value.node.entityId,
                                                }
                                                variant_attr.push(obj);  
                
                                    }
                                });
                            }else{
                                is_default = true;
                            }
                
                            if(is_default == false){
                              formData.append("attribute["+variants[index].node.entityId+"]",variants[index].node.values.edges[0].node.entityId);
                                let obj = {
                                  optionId: variants[index].node.entityId,
                                  optionValue: variants[index].node.values.edges[0].node.entityId,
                                }
                                variant_attr.push(obj); 
                            }
                        });
        axios({
          url: '/remote/v1/cart/add',
          method: 'post',
          dataType: 'json',
          data: formData
        }).then((result) => {
          if (result.data.data.cart_item) {
               buyNow(pro_id, discount_pr)
               
              }else{
                Data.classList.remove("sendloadingbuynow") 
              }
            }).catch(function (error) {
              Data.classList.remove("sendloadingbuynow")
           });
          }
            
        });
       
    }else{
      axios({
        url: '/remote/v1/cart/add',
        method: 'post',
        dataType: 'json',
        data: formData
      }).then((result) => {
        if (result.data.data.cart_item) {
             buyNow(pro_id, discount_pr)
             
            }else{
              Data.classList.remove("sendloadingbuynow") 
            }
          }).catch(function (error) {
            Data.classList.remove("sendloadingbuynow")
         });
    }
      });
    });

  
}
}

