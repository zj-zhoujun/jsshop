//全部分类
const app = getApp(); //全局app

Page({
    //页面数据
    data: {
        class_list: [],
        goodsList: [],
        ajaxStatus: false,
        loading: true,
        loadingComplete: false,
        nodata:false,
        all_cat: [],
        on_class: 0,
        content_height: 0,
        cate_style: app.config.cate_style,
        searchData: {
            where: {},
            limit: 10,
            page: 1,
            order: {
                key: 'sort',
                sort: 'asc'
            }
        },
    },

    //加载执行
    onShow: function (options) {
        var page = this;

        //获取全部数据
        let all_cat = app.db.get('all_cat');
        if (all_cat) {
            console.log(11111)
            console.log(all_cat)
            //缓存有值
            let on_class = 0;
            if (all_cat[0].id) {
                on_class = all_cat[0].id;
            }
            let class_list = [];
            if (all_cat[0].child) {
                class_list = all_cat[0].child;
            }
            page.setData({
                all_cat: all_cat,
                on_class: on_class,
                class_list: class_list,
                cate_style: app.config.cate_style
            });
            var obj = {
                cat_id: all_cat[0].id
            }
            page.getGoods(obj)
        } else {
            //缓存无值
            console.log(22222222222222222222)
            app.api.getAllCat(function (res) {
                if (res.status) {
                    let on_class = 0;
                    if (res.data[0].id) {
                        on_class = res.data[0].id;
                    }
                    let class_list = [];
                    if (res.data[0].child) {
                        class_list = res.data[0].child;
                    }
                    page.setData({
                        all_cat: res.data,
                        on_class: on_class,
                        class_list: class_list,
                        cate_style: app.config.cate_style
                    });

                    //存储缓存
                    app.db.set('all_cat', res.data);
                    console.log(7777777777777)
                    console.log(res.data)
                    var obj = {
                        cat_id: res.data[0].id
                    }
                    page.getGoods(obj)
                }
            });
        }

        // 设置content高度
        wx.getSystemInfo({
            success: function (res) {
                page.setData({
                    // second部分高度 = 窗口可使用高度 - 头部底部部分高度
                    content_height: res.windowHeight - res.windowWidth / 750 * 120
                });
            }
        });
    },
    getGoods: function (data) {
        console.log(1111111111111111111111111111111111)
        console.log(data)
        var page = this;
        if (page.data.ajaxStatus) {
            return false;
        }
        page.setData({
            ajaxStatus: true,
            loading: true,
            loadingComplete: false,
            nodata: false,
        });
        //如果已经没有数据了，就不取数据了，直接提示已经没有数据
        if (page.data.loadingComplete) {
            wx.showToast({
                title: '暂时没有数据了',
                icon: 'success',
                duration: 2000
            });
            return false;
        }
        console.log(3333333)
        this.data.searchData.where = data
        app.api.goodsList(this.data.searchData, function (res) {
            if (res.status) {
                //判是否没有数据了，只要返回的记录条数小于总记录条数，那就说明到底了，因为后面没有数据了 
                var isEnd = false;
                if (res.data.list.length < page.data.searchData.limit) {
                    isEnd = true;
                }
                //判断是否为空
                var isEmpty = false;
                if (page.data.searchData.page == 1 && res.data.list.length == 0) {
                    isEmpty = true;
                }
                page.setData({
                    goodsList: res.data.list,
                    ajaxStatus: false,
                    loading: !isEnd && !isEmpty,
                    toView: '',
                    loadingComplete: isEnd && !isEmpty,
                    nodata: isEmpty,
                });
            }
        });
    },
    //获取一级分类下的子分类列表
    getClassList: function (parent_id) {
        console.log(33333333333)
        var page = this;
        var data = {
            parent_id: parent_id
        }
        app.api.getClassChild(data, function (res) {
            if (res.status) {
                page.setData({
                    class_list: res.data
                });
            }
        });
    },

    //切换分类
    topclass: function (e) {
        let page = this;
        let o_id = e.currentTarget.dataset.id;
        let all_cat = page.data.all_cat;
        let class_list = [];
        console.log(o_id)
        var obj = {
            cat_id: o_id
        }
        this.getGoods(obj)
        //page.getClassList(e.currentTarget.dataset.id);
        for (let i = 0; i < all_cat.length; i++) {
            if (all_cat[i].id == o_id) {
                if (all_cat[i].child) {
                    class_list = all_cat[i].child;
                } else {
                    class_list = [];
                }
            }
        }

        //设置当前样式
        page.setData({
            on_class: o_id,
            class_list: class_list
        });
    },
    goodsDetail: function (e) {
        let ins = encodeURIComponent('id=' + e.currentTarget.dataset.id);
        wx.navigateTo({
            url: '../detail/detail?scene=' + ins
        });
    },
    //前往商品分类列表
    goodsList: function (event) {
        wx.navigateTo({
            url: '../itemList/itemList?id=' + event.currentTarget.dataset.id
        });
    },
  
    //客服回调
    customerService: function (e) {},

    //搜索
    // search: function (e) {
    //     var key = e.detail.value;
    //     wx.navigateTo({
    //         url: '../itemList/itemList?key=' + key
    //     });
    // },

    //跳转搜索
    searchNav: function () {
        wx.navigateTo({
            url: '../search/search'
        });
    },

    //页面隐藏执行
    onHide: function () {
        this.setData({
            key: ''
        });
    }
});