;(function (window, $, undefined) {
    var Monitor = {
        refreshable: false,
        delayResize: false,
        status: "pz",
        setting: {},
        method: {
            "pzmonitor": {
                callback: function () {
                    ChartUtils.init();
                }
            },
            "phmonitor": {
                callback: function () {
                    TableUtils.init();
                }
            }
        },
        init: function () {
            setInterval(function () {
                var date = new Date();
                $("currentTime").text(date.formatter("hh:mm:ss"));
            });

            if (!this.setting.pages) {
                var msg = "当前没有可显示的模块，请前往配置 >>>";
                $("#mainPage").html("<div class='info'>"+msg+"</div>");
                return;
            }
            this.initCarousel();
        },
        initCarousel: function () {
            var context = this;
            var page = context.setting.pages.split(",");
            var carousel = $('<div class="carousel slide" id="carousel"></div>');
            var indicators = $('<ol class="carousel-indicators" id="indicators"></ol>').appendTo(carousel);
            var innerCarousel = $('<div class="carousel-inner"></div>').appendTo(carousel);
            page.forEach(function (p, i) {
               $('<li data-target="#carousel" data-slide-to="'+i+'"></li>').appendTo(indicators);
               $('<div id="'+p+'" class="item"></div>').appendTo(innerCarousel)
                   .load(p+".html", context.method[p].callback);
            });
            $("#mainPage").html(carousel);
            indicators.children(":first-child").addClass("active");
            innerCarousel.children(":first-child").addClass("active");
            if (page.length == 1) {
                indicators.remove();
            }else {
                var switchTimes = context.setting.switchTimes ? parseInt(context.setting.switchTimes) * 1000 : false;
                carousel.carousel({
                    interval: switchTimes
                }).on("slide.bs.carousel", function () {
                   if ($("#pzmonitor").is(":visible")) {
                       context.refreshable = false;
                       context.status = "ph";
                   }else {
                       context.refreshable = true;
                       context.status = "pz";
                   }
                }).on("slid.bs.carousel", function () {
                    if (context.delayResize && context.status == "pz") {
                        ChartUtils.reset();
                        context.delayResize = false;
                    }
                });

                if (this.setting.switchTime == "54000") {
                    var now  = new Date();
                    if (now.getHours() >= 15 || now.getHours() < 9) {
                        context.status = "ph";
                        carousel.carousel(1);
                    }
                }
            }
        }
    };
    window.Monitor = Monitor;
})(window, jQuery);