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
        two_class: 0,
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
        var did = getApp().globalData.classifyId
        var two_did = getApp().globalData.two_classifyId
        // var did = '100'
        //获取全部数据
        let all_cat = app.db.get('all_cat');
        if (all_cat) {
            var objData = all_cat.find(function (obj) {
                return obj.id === did
            })
            // console.log(objData)
            // console.log('缓存有值')
            //缓存有值
            let on_class = 0;
            let two_class = 0;
            let class_list = [];
            let cat_id = ''
            if (did) {
                on_class = objData.id
                if (objData.child) {
                    class_list = objData.child;
                    if (two_did) {
                        two_class = two_did;
                    } else {
                        two_class = class_list[0].id;
                    }
                    cat_id = two_class
                } else {
                    cat_id = on_class
                }
            } else {
                on_class = all_cat[0].id;
                if (all_cat[0].child) {
                    class_list = all_cat[0].child;
                    two_class = class_list[0].id;
                    cat_id = two_class
                } else {
                    cat_id = on_class
                }
            }
            getApp().globalData.two_classifyId = two_class
            page.setData({
                all_cat: all_cat,
                on_class: on_class,
                two_class: two_class,
                class_list: class_list,
                cate_style: app.config.cate_style
            });
            var obj = {
                cat_id: cat_id
                // cat_id: did ? objData.id : two_class
            }
            page.getGoods(obj)
        } else {
            //缓存无值
            // console.log('缓存无值')
            app.api.getAllCat(function (res) {
                if (res.status) {
                    var objData = res.data.find(function (obj) {
                        return obj.id === did
                    })
                    // console.log(objData)
                    let on_class = 0;
                    let two_class = 0;
                    let class_list = [];
                    let cat_id = ''
                    if (did) {
                        on_class = objData.id
                        if (objData.child) {
                            class_list = objData.child;
                            if (two_did) {
                                two_class = two_did;
                            } else {
                                two_class = class_list[0].id;
                            }
                            cat_id = two_class
                        } else {
                            cat_id = on_class
                        }
                    } else {
                        on_class = res.data[0].id;
                        if (res.data[0].child) {
                            class_list = res.data[0].child;
                            two_class = class_list[0].id;
                            cat_id = two_class
                        } else {
                            cat_id = on_class
                        }
                    }
                    getApp().globalData.two_classifyId = two_class
                    page.setData({
                        all_cat: res.data,
                        on_class: on_class,
                        two_class: two_class,
                        class_list: class_list,
                        cate_style: app.config.cate_style
                    });

                    //存储缓存
                    app.db.set('all_cat', res.data);
                    var obj = {
                        // cat_id: did ? objData.id : two_class
                        cat_id: cat_id
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
        console.log(page.data.loadingComplete)
        if (page.data.loadingComplete) {
            wx.showToast({
                title: '暂时没有数据了',
                icon: 'success',
                duration: 2000
            });
            return false;
        }
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
                let goodsList = page.data.goodsList.concat(res.data.list);
                page.setData({
                    goodsList: goodsList,
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
        let on_class = o_id;
        let two_class = 0;
        var cat_id = ''
        page.data.searchData.page = 1
        page.data.goodsList = []
        var objData = all_cat.find(function (obj) {
            return obj.id === o_id
        })
        if (objData.child) {
            two_class = objData.child[0].id
            cat_id = two_class
        } else {
            cat_id = o_id
        }
        var obj = {
            cat_id: cat_id
        }
        getApp().globalData.classifyId = o_id
        getApp().globalData.two_classifyId = two_class
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
            on_class: on_class,
            two_class: two_class,
            class_list: class_list
        });
    },

    //切换二级分类
    leftclass: function (e) {
        let page = this;
        let o_id = e.currentTarget.dataset.id;
        var obj = {
            cat_id: o_id
        }
        page.data.searchData.page = 1
        page.data.goodsList = []
        this.getGoods(obj)
        //page.getClassList(e.currentTarget.dataset.id);

        //设置当前样式
        getApp().globalData.two_classifyId = o_id
        page.setData({
            two_class: o_id
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

  //上拉加载
  bindDownLoad: function () {
      console.log(this)
    var page = this;
    console.log(page.data.searchData.page)
    page.setData({
      toView: 'loading'
    });
    console.log(page.data.loadingComplete)
    if (!page.data.loadingComplete) {
        page.data.searchData.page += 1
        var obj = {
            cat_id: page.data.on_class
        }
      page.getGoods(obj);
    }
  },
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