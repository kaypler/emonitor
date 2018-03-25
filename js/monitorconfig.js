
;(function (window, $, undefined) {
    if (typeof window.MonitorConfig == "indefined") {
        var MonitorConfig = {
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
                        text: '<i class="fa fa-plus"></i> 新增',
                        titleAttr: '新增',
                        className: 'btn',
                        action: function () {
                            that.createProductTable("ETF_PREMIUM");
                            $("#addModal").modal("show");
                        }
                    },{
                        text: '<i class="fa fa-minus"></i> 删除',
                        titleAttr: '删除',
                        className: 'btn disabled dprDelBtn',
                        action: function () {
                            that.delFundInfo("ETF_PREMIUM");
                        }
                    },{
                        extend: 'excel',
                        text: '<i class="fa fa-file-excel-o"></i>'
                    }],
                    initComplete: function () {
                        $("#dprCheckall").click(function () {
                            if ($(this).is(":checked")) {
                                $("input:checkbox[name='dprChecklist']").attr("checked", true);
                                $(".dprDelBtn").removeClass("disabled");
                            }else {
                                $("input:checkbox[name='dprChecklist']").attr("checked", false);
                                $(".dprDelBtn").addClass("disabled");
                            }
                        });
                        $("#dprTable tbody").on("click", "input:checkbox", function () {
                            if ($(this).is(":checked")) {
                                $(".dprDelBtn").removeClass("disabled");
                            }
                            if ($("input:checkbox[name='dprCHecklist']:checked").length == 0) {
                                $(".dprDelBtn").addClass("disabled");
                            }
                        });
                        $("#dprTable tbody").on("click", "a.etrigger", function (event) {
                            $(this).editDprTable();
                            event.stopPropagation();
                        });
                    }
                });
            },
            createTvTable: function () {

            },
            createOcTable: function () {

            },
            createProductTable: function (module) {
                var that = this;
                $.ajax({
                    url: "getWindFunds",
                    data: {"module": module}
                }).then(function (data) {
                    var list = data.list || [];
                    var elist = data.elist || [];
                    that.productTable = $("#productTable").DataTable({
                        language: zh_cn,
                        dom: '<"row" <"col-sm-6" B><"col-sm-6" f>>rtp',
                        data: list,
                        order: [1, 'asc'],
                        columns: [{
                            data: null,
                            title: "<input type='checkbox' name='dprCheckall' id='dprCheckall' />"
                        },{
                            data: "fInfoWindcode",
                            title: "基金代码"
                        },{
                            data: "fInfoName",
                            title: "基金简称"
                        }],
                        columnDefs: [{
                            targets: 0,
                            ordertables: false,
                            render: function (data, type, row, meta) {
                                return '<input type="checkbox" name="checklist" value="'+row.fundCode+'" />';
                            }
                        }],
                        buttons: [{
                            text: '<i class="fa fa-plus"></i> 新增',
                            titleAttr: '新增',
                            className: 'btn disabled addBtn',
                            action: function () {
                               var funds = "";
                               var checkBox = $("input:checkbox[name='checklist']:checked");
                               $.each(checkBox, function (i, item) {
                                   funds += "," + $(this).val();
                               });
                               funds = funds.substr(1);
                               $.post({
                                   url: "addFundInfo",
                                   data: {"module": module, "funds": funds}
                               }).then(function (data) {
                                   BootstrapDialog.show({
                                       title: "提示",
                                       message: data.msg,
                                       size: BootstrapDialog.SIZE_SMALL
                                   });
                                   if (data.success) {
                                       if (module == "ETF_PREMIUM") {
                                           that.dprTable.ajax.reload();
                                       }
                                       if (module == "ETF_REALTIME") {
                                           that.tvTable.ajax.reload();
                                       }
                                       if (module == "CLASSIFICATION") {
                                           that.ocTable.ajax.reload();
                                       }
                                   }
                               });
                            }
                        }],
                        initComplete: function () {
                            $("#checkall").click(function () {
                                if ($(this).is(":checked")) {
                                    $("input:checkbox[name='checklist']").attr("checked", true);
                                    $(".addBtn").removeClass("disabled");
                                }else {
                                    $("input:checkbox[name='checklist']").attr("checked", false);
                                    $(".addBtn").addClass("disabled");
                                }
                            });
                            $("#productTable tbody").on("click", "input:checkbox", function () {
                                if ($(this).is(":checked")) {
                                    $(".addBtn").removeClass("disabled");
                                }
                                if ($("input:checkbox[name='checklist']:checked").length == 0) {
                                    $(".addBtn").addClass("disabled");
                                }
                            });
                        }
                    });
                })
            },
            delFundInfo: function (module) {

            }
        };
        window.MonitorConfig = MonitorConfig;
    }
    $(function () {
        MonitorConfig.init();
    });
})(window, jQuery);