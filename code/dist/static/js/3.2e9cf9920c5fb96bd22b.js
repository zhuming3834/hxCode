webpackJsonp([3],{QCdO:function(t,s){},SJIW:function(t,s){},Y6HO:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e={name:"confirmOrder",data:function(){return{address:{id:"",personName:"",phoneNumber:"",province:"",city:"",area:"",detailed:"",isDefault:1},goodsList:[],totalPrice:0,freight:0,totalNum:0,conpouText:"选择优惠券",conpou:{couponAmount:0,couponId:""},tids:""}},activated:function(){this.totalPrice=0,this.freight=0,this.totalNum=0,this.conpouText="选择优惠券",this.conpou={couponAmount:0,couponId:""},this.tids="";var t=localStorage.getItem("address");""==(t=JSON.parse(t))||null==t||"null"==t?this.getAddressData():this.address=t,this.goodsList=JSON.parse(localStorage.getItem("selectGoods")),this.makeTotalPrice()},methods:{submitClick:function(){var t=this;if(""==t.address.id){if(1!=confirm("请选择收货地址"))return;t.$router.push({path:"/address",query:{type:0}})}else t.$axios.get("basic/commodity/createOrder.do",{params:{tids:t.tids,couponId:"",openId:t.$utils.getOpenID()}}).then(function(s){0==s.data.ret_code?t.wxBridgeReady(s.data.ret_data):alert("操作失败")}).catch(function(t){alert("网路链接失败")})},wxBridgeReady:function(t){var s=this;WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:t.appId,timeStamp:t.timeStamp,nonceStr:t.nonceStr,package:t.package,signType:t.signType,paySign:t.paySign},function(i){"get_brand_wcpay_request：ok"==i.err_msg?s.changeOrderStatus(t.orderId,5):s.changeOrderStatus(t.orderId,6)})},changeOrderStatus:function(t,s){var i=this;i.$axios.get("basic/commodity/modifyOrderState.do",{params:{oId:t,buyState:s}}).then(function(t){if(alert(t.data.ret_code),0==t.data.ret_code){var e=5==s?1:0;i.$router.push({path:"/orders",query:{type:e}})}}).catch(function(t){alert("网路链接失败")})},selectConpouClick:function(){this.$router.push({path:"/coupon",query:{type:1,price:this.totalPrice}})},makeTotalPrice:function(){var t=this.goodsList.length,s=localStorage.getItem("conpouItem");this.conpou=JSON.parse(s),null==this.conpou?this.conpou={couponAmount:0,couponId:""}:(this.conpou.couponAmount=parseInt(this.conpou.couponAmount),this.conpouText="满"+this.conpou.conditions+"减"+this.conpou.couponAmount);for(var i=0;i<t;i++)this.goodsList[i].buyNum=0==this.goodsList[i].buyNum?1:this.goodsList[i].buyNum,this.totalPrice=this.totalPrice+this.goodsList[i].price*this.goodsList[i].buyNum,this.freight=this.goodsList[i].freight,this.totalNum=this.totalNum+this.goodsList[i].buyNum,this.tids=this.tids+this.goodsList[i].tid+",";this.freight=parseInt(this.freight),this.totalPrice=this.totalPrice+this.freight-parseInt(this.conpou.couponAmount)},changeAddressClick:function(){this.$router.push({path:"/address",query:{type:0}})},getAddressData:function(){var t=this;this.$axios.get("/user/userInfo/findUserAddrees.do",{params:{}}).then(function(s){if(0==s.data.ret_code)for(var i=s.data.ret_data.length,e=0;e<i;e++)s.data.ret_data[e].id==t.id&&(t.address=s.data.ret_data[e]);else alert(s.data.ret_msg)}).catch(function(t){alert("网络连接失败")})}},components:{GoodsItem:i("ZKAu").a}},a={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"confirmOrder"},[i("div",{staticClass:"confirm_address",on:{click:t.changeAddressClick}},[i("div",{staticClass:"line1"},[i("div",{staticClass:"line1_name"},[t._v("收货人："+t._s(t.address.personName))]),t._v(" "),i("div",{staticClass:"line1_tel"},[t._v(t._s(t.address.phoneNumber))])]),t._v(" "),i("div",{staticClass:"line2"},[i("div",{staticClass:"line1_name"},[t._v("收货地址：")]),t._v(" "),i("div",{staticClass:"line2_detail"},[t._v(t._s(t.address.province+t.address.city+t.address.detailed))])]),t._v(" "),i("div",{staticClass:"right_arrow"})]),t._v(" "),i("div",{staticClass:"goodsList"},t._l(t.goodsList,function(t){return i("GoodsItem",{key:t.cid,attrs:{imgs:t.imgUrl1,desc:t.cName,price:t.price,num:t.buyNum,id:t.cid}})})),t._v(" "),t._m(0),t._v(" "),i("div",{staticClass:"coupon",on:{click:t.selectConpouClick}},[i("div",{staticClass:"message_title"},[t._v("优惠券：")]),t._v(" "),i("div",{staticClass:"coupon_select"},[t._v("暂无此类优惠信息")])]),t._v(" "),i("div",{staticClass:"about"},[i("div",{staticClass:"message_title"},[t._v("商品金额")]),t._v(" "),i("div",{staticClass:"about_detail"},[t._v("￥"+t._s(t.totalPrice)+"元")])]),t._v(" "),i("div",{staticClass:"about"},[i("div",{staticClass:"message_title"},[t._v("运费")]),t._v(" "),i("div",{staticClass:"about_detail"},[t._v("+￥"+t._s(t.freight))])]),t._v(" "),i("div",{staticClass:"about"},[i("div",{staticClass:"message_title"},[t._v("优惠")]),t._v(" "),i("div",{staticClass:"about_detail"},[t._v("-￥"+t._s(t.conpou.couponAmount))])]),t._v(" "),i("div",{staticClass:"sureOrder"},[i("div",{staticClass:"order_btn",on:{click:t.submitClick}},[t._v("提交订单")]),t._v(" "),i("div",{staticClass:"order_detail"},[t._v("共计"+t._s(t.totalNum)+"件商品 合计："),i("span",[t._v("￥"+t._s(t.totalPrice-t.freight)+"元")])])])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"message"},[s("div",{staticClass:"message_title"},[this._v("买家留言：")]),this._v(" "),s("input",{staticClass:"message_input",attrs:{placeholder:"点击添加留言"}})])}]};var o=i("VU/8")(e,a,!1,function(t){i("SJIW")},"data-v-92d6b816",null);s.default=o.exports},ZKAu:function(t,s,i){"use strict";var e={name:"goodsItemDiv",props:{imgs:String,desc:String,price:Number,id:String,num:Number},methods:{goodsItemClick:function(t){this.$router.push({path:"/goodsDetail",query:{id:1}})}}},a={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{attrs:{id:"goodsItemDiv"}},[i("div",{staticClass:"goodsItem",on:{click:function(s){t.goodsItemClick(t.id)}}},[i("div",{staticClass:"goodsItem_left"},[i("img",{attrs:{src:t.imgs}})]),t._v(" "),i("div",{staticClass:"goodsItem_right"},[i("div",{staticClass:"goodsItem_desc"},[t._v(t._s(t.desc))]),t._v(" "),i("div",{staticClass:"goodsItem_pn"},[i("div",{staticClass:"goodsItem_price"},[t._v("￥"+t._s(t.price))]),t._v(" "),i("div",{staticClass:"goodsItem_num"},[t._v("x"+t._s(t.num))])])])])])},staticRenderFns:[]};var o=i("VU/8")(e,a,!1,function(t){i("QCdO")},"data-v-e644a206",null);s.a=o.exports}});
//# sourceMappingURL=3.2e9cf9920c5fb96bd22b.js.map