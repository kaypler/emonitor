
;(function (window, $, undefined) {
    if (typeof window.MonitorConfig == "indefined") {
        var MonitorCOnfig = {
            dprTable: null,tvTable: null,ocTable: null,productTable: null,
            init: function () {
                // 初始化表格
                this.createDprTable();
                this.createTvTable();
                this.createOcTable();

                // 初始化事件
                this.initEvent();
            },
            initEvent: function () {
                var that = this;
                $('.img-select div.img-wrapper').click(function () {
                    $(this).toggleClass("selected");
                });
                $(".page-header-actions").on("click", ".play", function () {
                    window.open("pzmonitor.html");
                });
                $(".btn-toolbar").on("click", ".play", function () {
                    window.open("phmonitor.html");
                });
                $("#addModal").on("hidden.bs.modal", function () {
                    that.productTable.destroy();
                    $("#productTable").empty();
                })
            },
            createDprTable: function () {
                var that = this;
                that.dprTable = $("#dprTable").DataTable({
                    ajax: {
                        url: "getEtfFunds",
                        data: {"module": "ETF_PREmIUM"}
                    },
                    language: zh_cn,
                    order: [1, "asc"],
                    columns:[{
                        data: null,
                        title: "<input type='checkbox' name='dprCheckall' id='dprCheckall' />"
                    },{
                        data: "fundCode",
                        title: "基金代码"
                    },{
                        data: "fundName",
                        title: "基金简称"
                    },{
                        data: "denominatorType",
                        title: "净值方式",
                        render: function (data,type, row) {
                            if (data == "1") {
                                return "<a href='javascript: void(0);' class='etrigger' data-column='denominatorType' " +
                                    "data-param='fundCode="+row.fundCode+"&denominatorType=1'>实时净值</a>"
                            }else if (data == "2") {
                                return "<a href='javascript: void(0);' class='etrigger' data-column='denominatorType' " +
                                    "data-param='fundCode="+row.fundCode+"&denominatorType=2'>IOPV</a>"
                            }else {
                                return "<a href='javascript: void(0);' class='etrigger' data-column='denominatorType' " +
                                    "data-param='fundCode="+row.fundCode+"&denominatorType=1'>未知</a>"
                            }
                        }
                    }],
                    columnDefs: [{
                        targets: 0,
                        ordertables: false,
                        render: function (data, type, row, meta) {
                            return '<input type="checkbox" name="dprChecklist" value="'+row.fundCode+'" />';
                        }
                    }],
                    dom: '<"row" <"col-sm-6" B><"col-sm-6" f>>rt<"row" <"col-sm-6" i><"col-sm-6" p>>',
                    buttons: [{
                        
                    }]
                })
            },
            createTvTable: function () {

            },
            createOcTable: function () {

            },
            createProductTable: function () {

            }
        };
    }
})(window, jQuery);