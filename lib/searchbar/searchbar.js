
;(function ($) {
    var handler = {
        e:null, args: null, show:0, input:null, popup: null, btn: null,
        init: function (e, option) {
            this.e = e;
            this.args = option;
            this.initHtml();
            this.initEvent();
        },
        update: function () {
            $.extend(this.args, option);
        },
        initHtml: function () {
            var form = $('<div class="searchbar-form"></div>');
            var _select = $('<div class="searchbar-select"></div>');
            _select.html('<span class="search-type">'+this.args.label+'</span>');
            var _input = $('<div class="searchbar-input"></div>');
            _input.html('<label for="searchbar-input"></label>'
                +'<input id="search-input" type="text">'
                +'<input id="search-value" type="hidden">'
                +'<ul class="tooltip"></ul>');
            this.btn = $('<div class="searchbar-btn"><a href="javascript:void(0);">'+this.args.btnText+'</a></div>');
            form.append(_select).append(_input).append(this.btn);
            this.e.html(form);
            this.input = $("#search-input");
            this.popup = $("#search-tooltip");

            if(this.args.defaultName) {
                this.input.val(this.args.defaultName);
                $("#search-value").val(this.defaultValue);
            }else {
                $(".search-input label").text(this.args.tip);
            }
        },
        initEvent: function () {
            var that = this;

            that.input.focus(function () {
                $(".searchbar-input label").text('');
            });
            that.blur(function () {
                if ($(this).val() == "") {
                    $(".searchbar-input label").text(that.args.tip);
                    $('#search-value').val();
                }
            });
            that.input.onkeyup(function () {
                that.search();
            });
            that.input.onkeydown(function (e) {
                var keycode = e.which;
                var els = that.popup.find("a");
                if (keycode == 40) {
                    if (els.eq(0)) els.eq(0).focus();
                }else if (keycode == 38) {
                    if (els.eq(els.length-1)) els.eq(els.length-1).focus();
                }else if (keycode == 9){
                    if (event.shiftKey == true) that.popup.hide();
                }
            });
            that.btn.click(function () {
                if (typeof that.args.btnEvent == 'function') {
                    that.args.btnEvent($('#search-value').val());
                }
            });
            $(this).find(".searchbar-input").onmouseover(function () {
                that.show = 1;
            });
            $(this).find(".searchbar-input").onmouseout(function () {
                that.show = 0;
            });
            $(document).click(function () {
                if (that.show == 0) {
                    that.popup.html("");
                    that.popup.hide();
                }
            });
        },
        autofill: function (data) {
            var that = this;
            that.popup.html("");
            if (data.length < 1) {
                that.popup.hide();
                return;
            }
            $.each(data, function (index, item) {
                var li = $("<li><a id='"+item.id+"' href='javascript:void(0);' title='"+item.text+"-"+item.subText+"' alt='"
                    +item.text+"'><span class='le'>"+item.text+"</span><span class='ri'>"+item.subText+"</span></a></li>");
                that.popup.append(li);
            });
            that.popup.show();

            var els = that.popup.find("a");
            els.click(function () {
                clearInterval(that.timer);
                $("#search-value").val($(this).attr("id"));
                that.input.val($(this).attr("alt"));
                that.popup.html("");
                that.popup.hide();
            });
        },
        search: function () {
            var that = this;
            var timer = null;
            return function () {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    var text = that.input.val();
                    if (!text) return;

                    $.get({
                        url: that.args.url,
                        data: {"s": text}
                    }).then(function (data) {
                        var list= data || [];
                        if (text == that.input.val()) {
                            that.autofill(list);

                        }
                    });
                }, 500);
            }
        },
        setValue: function (name, value) {
            $(".searchbar-input label").text("");
            this.input.val(name);
            $("#search-value").val(value);
        }
    };

    $.fn.searchBar = function (option) {
        handler.init(this, option);
        return this;
    };
    $.fn.updateSearchBar = function (option) {
        handler.update(option);
        return this;
    }
    $.fn.setSearchBarVal = function (name, value) {
        handler.setValue(name, value);
        return this;
    }
})(jQuery);