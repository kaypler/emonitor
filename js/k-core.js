
;(function (window, $, undefined) {
    if (typeof window.EFD == "undefined") {
        var EFD = {
            counter: 0,
            current: 0,
            frameArray: [],
            init: function () {
                var that = this;

                // 初始化菜单
                that.initMenu();

                // 加载首页
                that.openTab("个人中心", "home.html");
            },
            initMenu: function () {
                var that = this;
                $("#menuNav li").on("click", "a", function (event) {
                    if ($(this).parent().hasClass("active")) {
                        event.preventDefault();
                        return;
                    }

                    var tabName = $(this).text();
                    var url = $(this).attr("href");
                    that.openTab(tabName. url);
                    event.preventDefault();
                })
            },
            openTab: function (name, url) {
                var that = this;
                if (that.isExistPage(url)) {
                    that.switchTab(that.current);
                    return;
                }
                
                $("#menuNav li").removeClass("active");
                $("menuNav").find("a[href='"+url+"']").addClass("active");
                var tabItem = $('<li class="active"></li>');
                var a = $('<a href="#" target="iframe-'+that.counter+'" title="'+name+'"><span>'+name+'</span></a>').click(function (event) {
                    if ($(this).parent().hasClass("active")) {
                        event.preventDefault();
                        return;
                    }
                    that.current = $(this).attr("target").split("-")[1];
                    that.switchTab(that.current);
                    event.preventDefault();
                }).appendTo(tabItem);
                $("#tabNav li").removeClass("active");
                tabItem.appendTo($('#tabNav'));
                if (url.indexOf("home.html") > -1) {
                    tabItem.addClass("index");
                }else {
                    $('<i class="fa fa-close"></i>').click(function (event) {
                        var target = $(this).parent().attr("target").split("-")[1];
                        that.closeTab(target);
                        event.stopPropagation();
                    }).appendTo(a);
                }

                var iframe = $('<iframe src="'+url+'" frameborder="0" name="iframe-'+that.counter+'" class="page-frame"></iframe>');
                $("#mainFrame").find("iframe").hide();
                iframe.appendTo($("#mainFrame"));
                this.frameArray.push({
                    "name": name,
                    "url": url,
                    "frame": iframe
                });
                ++that.counter;
                ++that.current;
            },
            switchTab: function (current) {
                $("#tabNav li").removeClass("active");
                $("#tabNav li").eq(current).addClass("active");

                $("#menuNav li").removeClass("active");
                $("#menuNav").find("a[href='"+this.frameArray[current].url+"']").parent().addClass("active");
                $("#mainFrame").find("iframe").fadeOut(200);
                this.frameArray[current].frame.fadeIn(200);
            },
            closeTab: function (current) {
                if ( $("#tabNav li").eq(current).hasClass("active")) {
                    $("#tabNav li").eq(current - 1).add("active");
                    this.switchTab(current - 1);
                }
                $("#tabNav li").eq(current).remove();
                this.frameArray.splice(current, 1);
                $("#mainFrame").find("iframe").remove();
                --this.counter;
                --this.current;
            },
            isExistPage: function (url) {
                var that = this;
                var isExist = false;
                that.frameArray.forEach(function (item, i) {
                    if (item.url == url) {
                        isExist = true;
                        that.current = i;
                    }
                });
                return isExist;
            }
        };
        window.EFD = EFD;
    }
})(window, $);