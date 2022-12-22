import PageManager from './page-manager';
import { createCheckoutService } from '@bigcommerce/checkout-sdk';
import $ from 'jquery';
import forms from './common/models/forms';
import nod from './common/nod';

var win=window,
    listeners = [],
    doc = win.document,
    MutationObserver = win.MutationObserver || win.WebKitMutationObserver,
    observer,
    _this;
const service = createCheckoutService();
export default class Checkout extends PageManager {
    async onReady() {
        _this = this;
        // const state = await service.loadCheckout();
        // var get_checkout = state.data.getCheckout();
        // console.log('get_checkout', get_checkout);
        // var grandTotal = get_checkout.grandTotal;

        var script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js";
        document.head.appendChild(script);

        this.ready('.layout-cart .cart.optimizedCheckout-orderSummary', function (element) {
            var groupID=$('#customer-group-id').text();
            if(groupID.length === 0){
                groupID=0;
            }
            var selectorDiv=$('.layout-cart [data-test=redeemable-collapsable]');
            _this.getCoupons(groupID, selectorDiv);

            $('.layout-cart [data-test=redeemable-collapsable] .redeemable-entry .optimizedCheckout-form-input').attr('id','cartLayoutInput');
            $(document).on("click",".layout-cart [data-test=redeemable-collapsable] input[name=coupon]",function(e){
             $("input[name=coupon]").removeAttr("checked");                
                if($(this).hasClass("checked")) {
                    e.preventDefault(); 
                  $(".optimizedCheckout-form-input").val('');
                  $(this).removeAttr("checked");
                  $(this).removeClass("checked");
                 }else{
                   var code=$('input[name=coupon]:checked').val();
                let couponInput = document.getElementById('cartLayoutInput');
                _this.setNativeValue(couponInput , code);
                couponInput.dispatchEvent(new Event('input', { bubbles: true }));
                 $("input:radio[name=coupon]").removeClass("checked");
                 $(this).addClass("checked");
                 $(this).attr("checked",true);
                }
            });
        });

        this.ready('.checkout-form .form-fieldset ul.form-checklist', function (element) {
            var groupID=$('#customer-group-id').text();
            if(groupID.length === 0){
                groupID=0;
            }
            var selectorDiv=$('.checkout-form .form-fieldset.redeemable-payments [data-test=redeemable-collapsable]');
            _this.getCoupons(groupID, selectorDiv);

            $('.checkout-form [data-test=redeemable-collapsable] .redeemable-entry .optimizedCheckout-form-input').attr('id','paymentStepInput');
            $(document).on("click",".checkout-form .form-body [data-test=redeemable-collapsable] input[name=coupon]",function(e){ 
              $("input[name=coupon]").removeAttr("checked");               
                if($(this).hasClass("checked")) {
                    e.preventDefault(); 
                  $(".optimizedCheckout-form-input").val('');
                  $(this).removeAttr("checked");
                  $(this).removeClass("checked");
                 }else{
                      $("input:radio[name=coupon]").removeClass("checked");
                      $('.form-body').find('input[name=coupon]:checked').addClass("checked");
                      $('.form-body').find('input[name=coupon]:checked').attr("checked",true);
                   var code=$('.form-body').find('input[name=coupon]:checked').val();
                let couponInput = document.getElementById('paymentStepInput');
                _this.setNativeValue(couponInput , code);
                couponInput.dispatchEvent(new Event('input', { bubbles: true }));
                
                }
            });
        });

        this.ready('.cartDrawer', function (element) {
            var couponInputLengthInterval = '';
            setTimeout(function(){
                $('.cartDrawer').click(function(){
                    couponInputLengthInterval = setInterval(function(){
                        $("input[name=coupon]").removeAttr("checked");
                        if($('.ReactModalPortal [data-test=redeemable-collapsable]').length > 0){
                            clearInterval(couponInputLengthInterval);
                            var groupID=$('#customer-group-id').text();
                            if(groupID.length === 0){
                                groupID=0;
                            }
                            var selectorDiv=$('.ReactModalPortal [data-test=redeemable-collapsable]');
                            _this.getCoupons(groupID, selectorDiv);

                            $('.ReactModalPortal [data-test=redeemable-collapsable] .redeemable-entry .optimizedCheckout-form-input').attr('id','mobileLayoutInput');
                            $(document).on("click",".ReactModalPortal [data-test=redeemable-collapsable] input[name=coupon]",function(e){                                
                                if($(this).hasClass("checked")) {
                              
                                  $(".optimizedCheckout-form-input").val('');
                                  $(this).removeClass("checked");
                                  $(this).removeAttr("checked");
                                 
                                 }else{
                                  
                                $("input:radio[name=coupon]").removeAttr("checked");
                                $("input:radio[name=coupon]").removeClass("checked");
                                setTimeout(function(){
                                $(".ReactModalPortal .modalOverlay").find("input[name=coupon]:checked").addClass("checked");
                                $(".ReactModalPortal .modalOverlay").find("input[name=coupon]:checked").attr("checked",true);
                                },50);
                                   var code = $(".ReactModalPortal .modalOverlay").find("input[name=coupon]:checked").val();
                                   let couponInput = document.getElementById('mobileLayoutInput');
                                  _this.setNativeValue(couponInput , code);
                                  couponInput.dispatchEvent(new Event('input', { bubbles: true }));
                                
                                }
                            });
                        }
                    },500);
                });
            },1000);
        });
       
        $(document).on("keyup","#postCodeInput",function(){
            var numberReg =  /^[0-9]+$/;
                   var code = $("#postCodeInput").val();
                   var html = '';
                   if (code.length != 6 && code.length != 0){
                       event.preventDefault();
                      html+='<ul class="form-field-errors" data-test="shipping-address-postal-code-field-error-message">'
                      html+='<li class="form-field-error">'
                      html+='<label class="form-inlineMessage" for="shippingAddress.postalCode" style="color:#d14343">Postal Code is not valid</label></li></ul>'                                    
                      $("#postCodeInput").parent().find("ul.form-field-errors").remove();
                      
                      $("#postCodeInput").parent().find(".form-label").css("color","#d14343");
                      $("#postCodeInput").css("border-color","#d14343");
                      $( html ).insertAfter( "#postCodeInput" );
                  }else if(!numberReg.test(code) && code.length != 0){
                      event.preventDefault();
                      html+='<ul class="form-field-errors" data-test="shipping-address-postal-code-field-error-message">'
                      html+='<li class="form-field-error">'
                      html+='<label class="form-inlineMessage" for="shippingAddress.postalCode" style="color:#d14343">Postal Code is not valid</label></li></ul>'                                    
                      $("#postCodeInput").parent().find("ul.form-field-errors").remove();
                      
                      $("#postCodeInput").parent().find(".form-label").css("color","#d14343");
                      $("#postCodeInput").css("border-color","#d14343");
                      $( html ).insertAfter( "#postCodeInput" ); 
                  }else if(numberReg.test(code) && code.length == 6 ){
                       $("#postCodeInput").parent().find(".form-label").css("color","");
                       $("#postCodeInput").css("border-color","#78bf95");
                      $("#postCodeInput").parent().find("ul.form-field-errors").remove();
                  }
          });
          $(document).on("keyup","#phoneInput",function(){
        
            var numberReg =  /^[0-9]+$/;
             var number = $("#phoneInput").val();
    
            var mobilehtml = '';
            if (number.length != 10 && number.length != 0){
                event.preventDefault();
               mobilehtml+='<ul class="form-field-errors" data-test="shipping-address-mobile-number-field-error-message">'
               mobilehtml+='<li class="form-field-error">'
               mobilehtml+='<label class="form-inlineMessage" for="shippingAddress.postalCode" style="color:#d14343">mobile number is not valid</label></li></ul>'                                    
               $("#phoneInput").parent().find("ul.form-field-errors").remove();
               
               $("#phoneInput").parent().find(".form-label").css("color","#d14343");
               $("#phoneInput").css("border-color","#d14343");
               $( mobilehtml ).insertAfter( "#phoneInput" );
           }else if(!numberReg.test(number) && number.length != 0){
               event.preventDefault();
               mobilehtml+='<ul class="form-field-errors" data-test="shipping-address-postal-code-field-error-message">'
               mobilehtml+='<li class="form-field-error">'
               mobilehtml+='<label class="form-inlineMessage" for="shippingAddress.postalCode" style="color:#d14343">mobile number is not valid</label></li></ul>'                                    
               $("#phoneInput").parent().find("ul.form-field-errors").remove();
               
               $("#phoneInput").parent().find(".form-label").css("color","#d14343");
               $("#phoneInput").css("border-color","#d14343");
               $( mobilehtml ).insertAfter( "#phoneInput" ); 
           }else if(numberReg.test(number) && number.length == 10 ){
                $("#phoneInput").parent().find(".form-label").css("color","");
                $("#phoneInput").css("border-color","#78bf95");
               $("#phoneInput").parent().find("ul.form-field-errors").remove();
           }
        });
        $(document).on("keyup","#paymentStepInput",function(e){
      
            $(".checkout-form .form-body [data-test=redeemable-collapsable] input[name=coupon]").each(function(){
              var input = $('#paymentStepInput').val();
              if($(this).val() != input){
            $("input[name=coupon]").removeAttr("checked");
            $("input[name=coupon]").removeClass("checked");
              }else{
                  if(input == $(this).val()){
                    $(this).addClass("checked");
                    $(this).attr("checked",true);
                    return false;
                  }
              }
            }) 
        });
        $(document).on("keyup","#cartLayoutInput",function(e){
      
            $(".layout-cart [data-test=redeemable-collapsable] input[name=coupon]").each(function(){
              var input = $('#cartLayoutInput').val();
              if($(this).val() != input){
            $("input[name=coupon]").removeAttr("checked");
            $("input[name=coupon]").removeClass("checked");
              }else{
                if(input == $(this).val()){
                    $(this).addClass("checked");
                    $(this).attr("checked",true);
                    return false;
                  }
              }
            }) 
        });
        $(document).on("keyup","#mobileLayoutInput",function(e){
      
            $(".ReactModalPortal [data-test=redeemable-collapsable] input[name=coupon]").each(function(){
              var input = $('#mobileLayoutInput').val();
            
              if($(this).val() != input){
            $("input[name=coupon]").removeAttr("checked");
            $("input[name=coupon]").removeClass("checked");
              }else{
                if(input == $(this).val()){
                    $(this).addClass("checked");
                    $(this).attr("checked",true);
                    return false;
                  }
              }
            }) 
        });

    }
    ready(selector, fn) {
        // Store the selector and callback to be monitored
        listeners.push({
            selector: selector,
            fn: fn
        });
        if (!observer) {
            // Watch for changes in the document
            observer = new MutationObserver(this.check);
            observer.observe(doc.documentElement, {
                childList: true,
                subtree: true
            });
        }
        // Check if the element is currently in the DOM
        this.check();
    }
    check() {
        // Check the DOM for elements matching a stored selector
        for (var i = 0, len = listeners.length, listener, elements; i < len; i++) {
            listener = listeners[i];
            // Query for elements matching the specified selector
            elements = doc.querySelectorAll(listener.selector);
            for (var j = 0, jLen = elements.length, element; j < jLen; j++) {
                element = elements[j];
                // Make sure the callback isn't invoked with the 
                // same element more than once
                if (!element.ready) {
                    element.ready = true;
                    // Invoke the callback with the element
                    listener.fn.call(element, element);
                }             
            }
        }
    }
    setNativeValue(element, value) {
        const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
        const prototype = Object.getPrototypeOf(element);
        const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
      
        if (valueSetter && valueSetter !== prototypeValueSetter) {
            prototypeValueSetter.call(element, value);
        } else {
            valueSetter.call(element, value);
        }
    }
    
    getCoupons(groupID, selectorDiv){
        $.ajax
                ({ 
                type: "POST",
                url: "https://bg-sync-api-dev.kapiva.in/api/coupon.php",
                async: false,
                headers:{'gid' : groupID},
                success: function(data)
                {
                var data = JSON.parse(data);
                var currentDate = new Date();
                var couponBlock='<div class="coupon-list">';
                if(data['status'] != 'fail'){
                    for(var i=0;i<data['data'].length;i++)
                   {
                      var coupons=data['data'][i];
                     
                        const value = moment(coupons['expires']).format('MM/DD/YYYY h:mm a');
                        var dt=new Date(value);
                        if(currentDate<dt)
                          {
                             
                            couponBlock+='<li><label class="code_input"><strong>'+coupons['code']+'</strong><br>Save '+coupons['amount']+' <br>Expires on : '+value+'  <input type="radio" value="'+coupons['code']+'" name="coupon"> <span class="checkmark"></span></label></li>';
                              
                          }
                      
                   }
                  }
                couponBlock+="</div>";
                // var selectorDiv=$('[data-test=redeemable-collapsable]');
                selectorDiv.find(".coupon-list").remove()
               selectorDiv.append(couponBlock);
              
            }
        });
    }

   

}
