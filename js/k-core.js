
;(function (window, $, undefined) {
    if (typeof window.EFD == "undefined") {
        var EFD = {
            tabMap: {},
            frameMap: {},
            init: function (menus) {
                var that = this;

                // 初始化菜单
                that.initMenu(menus);

                // 加载首页
                that.openTab("个人中心", "home.html");
            },
            initMenu: function (menus) {
                var context = this;
                $.each(menus, function (i, m) {
                    if (i == 0) {
                        $("#menuCategory").text(m.name);
                    }

                    $('<li><a href="#"><i class="fa "'+m.icon+' aria-hidden="true"></i>&nbsp;<span>'+m.name
                        +'</span></a></li>').appendTo($("#menuBar"));

                    $.each(m.children, function (i, c) {
                        var li = $('<li class="nav-menu-item"></li>').appendTo($("#menuNav"));
                        var a = $('<a href="'+c.url+'"><i class="fa '+c.icon+'" aria-hidden="true"></i><span class="nav-menu-title">&nbsp;'+
                            c.name+'</span></a>').appendTo(li);
                        a.click(function (event) {
                            if ($(this).parent().hasClass("active")) {
                                event.preventDefault();
                                return;
                            }

                            var tabName = $(this).text();
                            var url = $(this).attr("href");
                            context.openTab(tabName, url);
                            event.preventDefault();
                        });
                    });
                    $("#menuNav").children(":first-child").addClass("active");
                });
                $("#menuBar").children(":first-child").addClass("active");
            },
            openTab: function (name, url) {
                var context = this;
                if (context.isExistPage(url)) {
                    context.switchTab(url);
                    return;
                }
                
                $("#menuNav li").removeClass("active");
                $("menuNav").find("a[href='"+url+"']").addClass("active");
                context.tabMap[url] = $('<li class="active"></li>').data("key", url).appendTo($("#tabNav"));
                var a = $('<a href="javascript:void(0);" title="'+name+'"><span>'+name+'</span></a>').click(function (event) {
                    event.preventDefault();
                    var key = $(this).data("key");
                    if (context.tabMap.currentKey == key) {
                        return;
                    }
                    context.switchTab(key);
                }).appendTo(context.tabMap[url]);

                if (url.indexOf("home.html") > -1) {
                    context.tabMap[url].addClass("index");
                }else {
                    $('<i class="fa fa-close"></i>').click(function (event) {
                        event.stopPropagation();
                        context.closeTab(url);
                    }).appendTo(a);
                }

                context.frameMap[url] = $('<iframe src="'+url+'" frameborder="0" class="page-frame"></iframe>').appendTo($("#mainFrame"));
                if (!context.tabMap.currentKey) {
                    context.tabMap.currentKey = url;
                }else {
                    context.tabMap[context.tabMap.currentKey].removeClass("active");
                    context.frameMap[context.tabMap.currentKey].hide();
                    context.tabMap.currentKey = url;
                }
            },
            switchTab: function (url) {
                var context = this;
                $("#menuNav li").removeClass("active");
                $("#menuNav").find("a[href='"+url+"']").parent().addClass("active");

                context.tabMap[context.tabMap.currentKey].removeClass("active");
                context.tabMap[url].addClass("active");
                context.frameMap[context.tabMap.currentKey].hide();
                context.frameMap[url].fadeIn(200);
                context.tabMap.currentKey = url;
            },
            closeTab: function (url) {
                var context = this;
                if (context.tabMap.currentKey == url) {
                    var pre = context.tabMap[context.tabMap.currentKey].prev();
                    context.switchTab(pre.data("key"));
                }

                context.tabMap[url].remove();
                context.tabMap[url].removeData();
                delete context.tabMap[url];
                context.frameMap[url].remove();
                delete context.frameMap[url];
            },
            isExistPage: function (url) {
                var context = this;
                var isExist = false;
                for (var key in context.tabMap) {
                    if (key == url) {
                        isExist = true;
                    }
                }
                return isExist;
            }
        };
        window.EFD = EFD;
    }
})(window, $);