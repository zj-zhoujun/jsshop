webpackJsonp([32],{IQf1:function(t,e){},NGAE:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("IHPB"),a=s.n(i),l={data:function(){return{page:1,pageSize:5,list:[]}},created:function(){var t=this;this.$api.afterSalesList({page:this.page,limit:this.pageSize},function(e){var s=e.data.list;t.list=[].concat(a()(s)),s.length<t.pageSize&&t.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.loadedDone")})},methods:{afterDetail:function(t){this.$router.push({path:"/aftersalesdetail",query:{aftersales_id:t}})},loadMore:function(){var t=this;this.$api.afterSalesList({page:++this.page,limit:this.pageSize},function(e){var s=e.data.list;t.list=[].concat(a()(t.list),a()(s)),s.length<t.pageSize&&t.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.loadedDone"),t.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad")})}}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"ordertab"},[s("yd-infinitescroll",{ref:"infinitescrollDemo",attrs:{callback:t.loadMore}},t._l(t.list,function(e,i){return s("div",{key:i,staticClass:"order-content",attrs:{slot:"list"},slot:"list"},[s("div",{staticClass:"order-content-header"},[s("p",{staticClass:"header-left"},[t._v("售后单号："+t._s(e.aftersales_id))]),t._v(" "),1===e.status?s("p",{staticClass:"header-right"},[t._v("待审核")]):2===e.status?s("p",{staticClass:"header-right"},[t._v("审核通过")]):3===e.status?s("p",{staticClass:"header-right"},[t._v("审核拒绝")]):t._e()]),t._v(" "),s("yd-list",{attrs:{theme:"4"},nativeOn:{click:function(s){return t.afterDetail(e.aftersales_id)}}},t._l(e.order.items,function(e,i){return s("yd-list-item",{key:i},[s("img",{attrs:{slot:"img",src:e.image_url},slot:"img"}),t._v(" "),s("h3",{staticClass:"goodsname",attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.name))]),t._v(" "),s("p",{staticClass:"goods",attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.addon))]),t._v(" "),s("yd-list-other",{attrs:{slot:"other"},slot:"other"},[s("div",[s("span",{staticClass:"demo-list-price"},[s("em",[t._v("¥")]),t._v(t._s(e.price))])]),t._v(" "),s("div",[t._v("x"+t._s(e.nums))])])],1)}),1),t._v(" "),s("div",{staticClass:"order-content-footer"},[s("div",{staticClass:"footer-top"},[s("p",{staticClass:"footer-top-left"},[t._v("共计 "+t._s(e.order.items.length)+" 件商品")]),t._v(" "),s("p",{staticClass:"footer-top-right"},[t._v("合计：¥"+t._s(e.refund))])]),t._v(" "),s("div",{staticClass:"footer-bottom"},[s("yd-button",{staticClass:"right-btn",attrs:{type:"hollow",shape:"circle"},nativeOn:{click:function(s){return t.afterDetail(e.aftersales_id)}}},[t._v("查看")])],1)])],1)}),0),t._v(" "),s("yd-backtop")],1)},staticRenderFns:[]};var o=s("C7Lr")(l,r,!1,function(t){s("IQf1")},null,null);e.default=o.exports}});
//# sourceMappingURL=32.67bc82fa38bd98ea2015.js.map