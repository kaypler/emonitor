;(function ($, _bd, undefined) {
    function EHandler(obj, option) {
        this.opt = option;
        this.obj = obj;
        this.popover = null;
        this.create = function () {
            if (this.opt.column == "denominatorType") {
                this.editDenominatorType();
            }
        },
        this.editDenominatorType = function () {
            var that = this;
            var popover = $('<div class="epopover top">'
                +'<div class="earrow"></div>'
                +'<h3 class="etitle">净值方式</h3>'
                +'<div class="econtent"></div>'
                +'<div class="eloading" style="display: none;"></div>'
                +'<div class="econtrol">'
                +'<div>'
                +'<div class="einput">'
                +'<select id="denominatorType" class="eselect"><option value="1">实时净值</option><option value="2">IOPV</option></select>'
                +'</div>'
                +'<div class="ebuttons">'
                +'<button type="button" class="esubmit default"><i class="fa fa-check"></i></button>'
                +'<button type="button" class="ecancel defaut"><i class="fa fa-close"></i></button>'
                +'</div>'
                +'<div style="clear: both"></div>'
                +'</div>'
                +'<div class="ehelp" style="display: none;"></div>'
                +'</div>'
                +'</div>');

            $(document.body).append(popover);
            var denominatorType = that.opt.param.split("&")[1].split("=")[1];
            $("#denominatorType").val(denominatorType);
            this.popover = popover;

            var left = this.obj.offset().left;
            var top = this.obj.offset().top;
            var w = this.popover.width();
            var h = this.popover.height();
            this.popover.css({
                left: left - w/2 + 10 + "px",
                top: top - h - 15 + "px"
            });

            this.bindEvent();
            $(".esubmit").click(function (e) {
                that.editFundInfo();
                e.preventDefault();
            });
        },
        this.editFundInfo = function () {
            var that = this;
            var fundCode = that.opt.param.split("&")[0].split("=")[1];
            var denominatorType = $("#denominatorType").val();
            $.post({
                url: "editFundInfo",
                data: {
                    fundCode: fundCode,
                    module: "ETF_PREMIUM",
                    denominatorType: denominatorType
                }
            }).then(function (data) {
                that.popover.remove();
                _bd.show({
                    title: "提示",
                    message: "ETF_PREMIUM",
                    size: _bd.SIZE_SMALL
                });
                if (data.success) {
                    var text = (denominatorType == 1) ? "实时净值" : "IOPV";
                    that.obj.text(text);
                }
            });
        },
        this.bindEvent = function () {
            var that = this;
            this.popover.delegate(".ecancel", "click", function () {
                that.popover.remove();
            });

            var show = 0;
            this.popover.mouseover(function () {
                show = 1;
            });
            this.popover.mouseout(function () {
                show = 0;
            });
            $(document.body).click(function () {
                if (show == 0) {
                    that.popover.remove();
                }
            });
            $(".page-container").scroll(function () {
                that.popover.remove();
            });
        },
        this.showTip = function (msg) {
            $(".help").html(msg).show();
            setTimeout(function () {
                $(".help").fadeOut(500);
            }, 2000);
        }
    }

    $.fn.editDprTable = function (opt) {
        $(".epopover").remove();
        var column = this.attr("data-column");
        var param = this.attr("data-param");
        var option = { column: column, param: param};
        $.extend(option, opt);
        var handler = new EHandler(this, option);
        handler.create();
        return this;
    }
})(jQuery,BootstrapDialog);