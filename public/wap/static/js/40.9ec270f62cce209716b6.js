webpackJsonp([40],{HrDi:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=i("Gu7T"),a=i.n(e),n={data:function(){return{isCheckAll:!0,list:[],total:"",promotion:[],goods_pmt:"",order_pmt:""}},created:function(){this.cartList()},computed:{canBuy:function(){var t=[];return this.list.forEach(function(s){s.is_select&&t.push(s.id)}),!!t.length}},methods:{radioHandler:function(t){this.list[t].is_select=!this.list[t].is_select,this.selectedHandler()},selectedHandler:function(){var t=[];if(this.list.forEach(function(s){s.is_select&&t.push(s.id)}),t.length)this.cartList(t);else for(var s in this.list.forEach(function(t){t.is_select=!1}),this.total="0.00",this.goods_pmt="0.00",this.order_pmt="0.00",this.isCheckAll=!1,this.promotion)this.$set(this.promotion[s],"type",1)},showDetail:function(t){this.$router.push({path:"/goodsdetail",query:{goods_id:t}})},minus:function(t,s){this.setNums(t,--s)},add:function(t,s){for(var i in this.list)if(this.list[i].id===t){if(!(s<this.list[i].products.stock))return!1;this.setNums(t,++s)}},setNums:function(t,s){var i=this;this.$api.setCartNum({id:t,nums:s},function(t){if(t.status){var s=t.data.list;i.total=i.GLOBAL.formatMoney(t.data.amount,2,""),i.promotion=t.data.promotion_list,i.goods_pmt=i.GLOBAL.formatMoney(t.data.goods_pmt,2,""),i.order_pmt=i.GLOBAL.formatMoney(t.data.order_pmt,2,""),i.list=[].concat(a()(s))}})},cartList:function(){var t=this,s=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],i={};s.length&&(i.ids=s.toString(),i.display="all"),this.$api.cartList(i,function(s){if(s.status){var i=s.data.list;t.total=t.GLOBAL.formatMoney(s.data.amount,2,""),t.promotion=s.data.promotion_list,t.goods_pmt=t.GLOBAL.formatMoney(s.data.goods_pmt,2,""),t.order_pmt=t.GLOBAL.formatMoney(s.data.order_pmt,2,""),t.list=[].concat(a()(i))}})},checkAll:function(t){this.list.forEach(function(s){s.is_select=t.target.checked}),this.selectedHandler()},balance:function(){this.$router.push({path:"/firmorder",query:{cartIds:this.ids.toString()}})},skip:function(){},touchStart:function(t){this.startX=t.touches[0].clientX},touchEnd:function(t){var s=t.currentTarget.parentElement;this.endX=t.changedTouches[0].clientX,"0"===s.dataset.type&&this.startX-this.endX>30&&(this.restSlide(),s.dataset.type=1),"1"===s.dataset.type&&this.startX-this.endX<-30&&(this.restSlide(),s.dataset.type=0),this.startX=0,this.endX=0},checkSlide:function(){for(var t=document.querySelectorAll(".list-item"),s=0;s<t.length;s++)if("1"===t[s].dataset.type)return!0;return!1},restSlide:function(){for(var t=document.querySelectorAll(".list-item"),s=0;s<t.length;s++)t[s].dataset.type=0},deleteItem:function(t){var s=this,i=t.currentTarget.dataset.index;this.$api.removeCart({ids:this.list[i].id},function(t){if(t.status){s.$dialog.toast({mes:t.msg,time:1500,icon:"success"}),s.restSlide(),s.list.splice(i,1);var e=[];for(var a in s.list)e.push(s.list[a].id);s.ids=e,s.cartList(s.ids)}})}},watch:{list:{handler:function(){var t=this.list.length,s=[];this.list.forEach(function(t){t.is_select&&s.push(t.id)}),t===s.length?this.isCheckAll=!0:this.isCheckAll=!1},deep:!0}}},c={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"cart"},[t.list.length?i("div",{staticClass:"cartlist"},[i("ul",{attrs:{color:"#ff3b44"}},t._l(t.list,function(s,e){return i("li",{key:e,staticClass:"list-item",attrs:{val:s.id,"data-type":"0"}},[i("div",{staticClass:"list-box",staticStyle:{padding:".15rem",position:"relative"},on:{"!touchstart":function(s){return t.touchStart(s)},"!touchend":function(s){return t.touchEnd(s)}}},[i("div",{staticClass:"check-box"},[i("input",{directives:[{name:"model",rawName:"v-model",value:s.is_select,expression:"item.is_select"}],staticClass:"input_check",attrs:{type:"checkbox",name:"box",id:s.id},domProps:{value:s.id,checked:Array.isArray(s.is_select)?t._i(s.is_select,s.id)>-1:s.is_select},on:{click:function(s){t.radioHandler(e)},change:function(i){var e=s.is_select,a=i.target,n=!!a.checked;if(Array.isArray(e)){var c=s.id,o=t._i(e,c);a.checked?o<0&&t.$set(s,"is_select",e.concat([c])):o>-1&&t.$set(s,"is_select",e.slice(0,o).concat(e.slice(o+1)))}else t.$set(s,"is_select",n)}}}),i("label",{attrs:{for:s.id}})]),t._v(" "),i("img",{staticClass:"goodsimg",attrs:{src:s.products.image_path},on:{click:function(i){t.showDetail(s.products.goods_id)}}}),t._v(" "),i("div",{staticClass:"list-body"},[i("h3",{staticClass:"goodsname",on:{click:function(i){t.showDetail(s.products.goods_id)}}},[t._v(t._s(s.products.name))]),t._v(" "),i("p",{staticClass:"standard",on:{click:function(i){t.showDetail(s.products.goods_id)}}},[t._v(t._s(s.products.spes_desc))]),t._v(" "),i("ul",{staticClass:"btn-numbox"},[i("li",[i("p",{staticClass:"price",on:{click:function(i){t.showDetail(s.products.goods_id)}}},[t._v("￥"+t._s(s.products.price))])]),t._v(" "),i("li",{staticClass:"spinner"},[i("ul",{staticClass:"count"},[i("li",{on:{click:function(i){t.minus(s.id,s.nums)}}},[i("button",{staticClass:"num-jian",attrs:{id:"num-jian"}},[t._v("－")])]),t._v(" "),i("li",[i("input",{directives:[{name:"model",rawName:"v-model",value:s.nums,expression:"item.nums"}],staticClass:"input-num",attrs:{type:"text",id:"input-num",readonly:""},domProps:{value:s.nums},on:{input:function(i){i.target.composing||t.$set(s,"nums",i.target.value)}}})]),t._v(" "),i("li",{on:{click:function(i){t.add(s.id,s.nums)}}},[i("button",{staticClass:"num-jia",attrs:{id:"num-jia"}},[t._v("＋")])])])])]),t._v(" "),s.products.promotion_list?i("div",t._l(s.products.promotion_list,function(s,e){return i("div",{key:e},[s.type?i("yd-badge",{attrs:{shape:"square",type:"danger"}},[t._v(t._s(s.name))]):i("yd-badge",{attrs:{shape:"square",type:"square"}},[t._v(t._s(s.name))])],1)})):t._e()])]),t._v(" "),i("div",{staticClass:"delete",attrs:{"data-index":e},on:{click:t.deleteItem}},[t._v("删除")])])}))]):i("div",{staticClass:"cartlist data-none"},[t._v("\n        空空如也，快去挑选喜欢的商品吧~\n    ")]),t._v(" "),t.list.length?i("div",{staticClass:"cartfooter-top"},[0!==t.promotion.length?i("div",{staticClass:"cartfooter-left-price"},[t._m(0),t._v(" "),t._l(t.promotion,function(s,e){return i("div",{key:e},[2===s.type?i("yd-badge",{attrs:{shape:"square",type:"danger"}},[t._v(t._s(s.name))]):i("yd-badge",{attrs:{shape:"square",type:"square"}},[t._v(t._s(s.name))])],1)})],2):t._e(),t._v(" "),i("div",{staticClass:"cartfooter-right-price"},[i("p",[t._v("商品优惠："),i("span",{staticClass:"price"},[t._v("￥"+t._s(t.goods_pmt||0))])]),t._v(" "),i("p",[t._v("订单优惠："),i("span",{staticClass:"price"},[t._v("￥"+t._s(t.order_pmt||0))])])])]):t._e(),t._v(" "),i("div",{staticClass:"cartfooter"},[i("div",{staticClass:"cartfooter-left"},[t.list.length?i("div",{staticClass:"check-box"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.isCheckAll,expression:"isCheckAll"}],staticClass:"input_check",attrs:{type:"checkbox",id:"allcheck"},domProps:{checked:Array.isArray(t.isCheckAll)?t._i(t.isCheckAll,null)>-1:t.isCheckAll},on:{click:function(s){t.checkAll(s)},change:function(s){var i=t.isCheckAll,e=s.target,a=!!e.checked;if(Array.isArray(i)){var n=t._i(i,null);e.checked?n<0&&(t.isCheckAll=i.concat([null])):n>-1&&(t.isCheckAll=i.slice(0,n).concat(i.slice(n+1)))}else t.isCheckAll=a}}}),i("label",{attrs:{for:"allcheck"}}),i("span",[t._v("全选")])]):t._e(),t._v(" "),i("div",{staticClass:"cartfooter-left-price"},[i("p",[t._v("合计："),i("span",{staticClass:"price"},[t._v("￥"+t._s(t.total||0))])]),t._v(" "),i("p",{staticClass:"annotation"},[t._v("不包含运费")])])]),t._v(" "),i("div",{staticClass:"cartfooter-btn"},[t.canBuy?i("yd-button",{attrs:{type:"danger"},nativeOn:{click:function(s){return t.balance(s)}}},[t._v("去结算")]):i("yd-button",{attrs:{type:"disabled",disabled:""}},[t._v("去结算")])],1)])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"content-header"},[s("p",[this._v("促销")])])}]};var o=i("VU/8")(n,c,!1,function(t){i("Y+MF")},null,null);s.default=o.exports},"Y+MF":function(t,s){}});
//# sourceMappingURL=40.9ec270f62cce209716b6.js.map