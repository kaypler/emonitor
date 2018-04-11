;(function (window, $, undefined) {
    window.TableUtils = {
        init: function () {
            this.createIndexLevelTable();
        },
        createIndexLevelTable: function () {
            var context = this;
            $.ajax("getIndexLevel").then(function (data) {
                var tbody = $("#inList div.rl-body").html("");
                var container = $("<div class='rl-body-con'></div>").appendTo(tbody);

                var list = data || [];
                if (list.length == 0) {
                    tbody.html("<div class='rl-body-info'><div class='item'>无记录</div></div>")
                }else  {
                    list.forEach(function (item) {
                        var tr = $("<div class='rl-tr'></div>");
                        tr.append("<div class='rl-td'></div>");
                        tr.append("<div class='rl-td'></div>");
                        tr.append("<div class='rl-td'></div>");
                        tr.append("<div class='rl-td'></div>");
                        tr.append("<div class='rl-td'></div>");
                        tr.append("<div class='rl-td'></div>");
                        tr.append("<div class='rl-td'></div>");
                        container.append(tr);
                    });
                    context.noticeUp(container, "-36px", 200);
                }
            });
        },
        noticeUp: function (obj, top, time) {
            // 调用自匿名函数，解决setInterval休眠问题
            return (function fn() {
                $(obj).animate({
                    marginTop: top
                }, time, function () {
                    $(this).css({marginTop: "0"}).find(":first").appendTo(this);
                    setTimeout(fn, 2000);
                });
            })();
        }
    };

})(window, jQuery);