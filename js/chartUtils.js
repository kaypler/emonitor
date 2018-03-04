var ChartUtils = {
    init: function () {
        this.drawSymmetryGraph("dprChart");
        this.drawBars("tvChart");
        this.drawPie("csChart");
    },
    drawLines: function (id) {
        var option = {
           /* title: {
                text: '大小盘强弱及预测指标走势今年以来',
                x: 'center'
            },*/
            color: ['#283E56', '#1989AC'],
            tooltip: {trigger: 'axis'},
            legend: {
                bottom: 0,
                data:['500/300收益率之比','预测指标（右轴）']
            },
            xAxis: [
                {
                    type: 'category',
                    axisLine: {show: false},
                    axisTick: {show: false},
                    data: ['2017/1/1','2017/2/1','2017/3/1','2017/4/1','2017/5/1',
                        '2017/6/1','2017/7/1','2017/8/1','2017/9/1','2017/10/1','2017/11/1','2017/12/1']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLine: {show: false},
                    axisTick: {show: false}
                },
                {
                    type: 'value',
                    axisLine: {show: false},
                    axisTick: {show: false},
                    splitLine: {show: false}
                }
            ],
            series: [
                {
                    name:'500/300收益率之比',
                    type:'line',
                    showSymbol: false,
                    yAxisIndex: 0,
                    lineStyle: {
                        width: 3
                    },
                    data:[1.8, 2.0, 3.8, 7.5, 7.3, 8.2, 7.3, 12.4, 12.0, 16.5, 14.0, 10.2]
                },
                {
                    name:'预测指标（右轴）',
                    type:'line',
                    showSymbol: false,
                    yAxisIndex: 1,
                    lineStyle: {
                        width: 3
                    },
                    data:[2.0, 2.2, 3.3, 4.5, 6.3, 8.4, 9.3, 13.4, 11.1, 12.5, 12.0, 9.2]
                }
            ]
        };
        var panel = document.getElementById(id);
        var chart = echarts.init(panel);
        chart.setOption(option);
    },
    drawSymmetryGraph: function (id) {
        var labelLeft = {
            normal: {
                position: 'left'
            }
        };
        var labelInsideRight = {
            normal: {
                position: 'insideRight'
            }
        };
        var option = {
            /*title: {
                text: 'ETF折溢价率',
                x: 'center'
            },*/
            color: ['#F7B081','#BFD8EC'],
            tooltip : {},
            grid: {
                top: 80,
                bottom: 30
            },
            xAxis: {
                type : 'value',
                position: 'bottom',
                axisLine: {show: false},
                axisTick: {show: false},
                axisLabel: {
                    color: '#A9A9A9',
                    formatter: function(value) {
                        return value.toFixed(2)+"%";
                    }
                },
                splitLine: {lineStyle:{type:'dashed'}},
            },
            yAxis: {
                type : 'category',
                axisLine: {show: false},
                axisLabel: {show: false},
                axisTick: {show: false},
                splitLine: {show: false},
                data : ['A', 'B', 'C', 'D', 'E', 'F']
            },
            visualMap: {
                show: false,
                dimension: 0,
                pieces: [{
                    lt: 0,
                    color: '#F7B081'
                }, {
                    gte: 0,
                    color: '#BFD8EC'
                }]
            },
            series : [
                {
                    name:'',
                    type:'bar',
                    label: {
                        normal: {
                            show: true,
                            color: '#333',
                            formatter: '{b}'
                        }
                    },
                    data:[
                        {value: 5,label: labelLeft},
                        {value: 3,label: labelLeft},
                        {value: 1,label: labelLeft},
                        {value: -2,label: labelInsideRight},
                        {value: -3,label: labelInsideRight},
                        {value: -5,label: labelInsideRight}
                    ],
                    markLine: {
                        symbol: 'none',
                        data: [
                            {xAxis: -2},{xAxis: 2}
                        ]
                    }
                }
            ]
        };   
        var panel = document.getElementById(id);
        var chart = echarts.init(panel);
        chart.setOption(option);
    },
    drawPie: function (id) {
        var option = {
            /*title: {
                text: '市场股票涨跌停情况',
                x: 'center'
            },*/
            color: ['#AFABAB','#9DC3E6','#A9D18E','#F4B183'],
            series: [
                {
                    name:'',
                    type:'pie',
                    radius: ['50%', '70%'],
                    label: {
                        formatter: '{b}，{c}，{d}%'
                    },
                    data:[
                        {value:200, name:'停牌'},
                        {value:400, name:'平盘'},
                        {value:800, name:'下跌'},
                        {value:1300, name:'上涨'}
                    ]
                }
            ]
        };
        var panel = document.getElementById(id);
        var chart = echarts.init(panel);
        chart.setOption(option);
    },
    drawBars: function (id) {
        var option = {
            /*title: {
                text: 'ETF交易额',
                x: 'center'
            },*/
            color: ['#5B9BD5','#ED7D31'],
            legend: {
                bottom: 0,
                data:['实时交易额（亿元）','同期交易额（亿元）']
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    axisLine: {show: false},
                    axisTick: {show: false},
                    data : ['A', 'B', 'C', 'D', 'E', 'F']
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine: {show: false},
                    axisTick: {show: false}
                }
            ],
            series : [
                {
                    name:'实时交易额（亿元）',
                    type:'bar',
                    barWidth: '30%',
                    data:[20, 15, 10, 7, 5, 3]
                },
                {
                    name:'同期交易额（亿元）',
                    type:'bar',
                    barWidth: '30%',
                    data:[10, 12, 14, 10, 1, 2]
                }
            ]
        };
        var panel = document.getElementById(id);
        var chart = echarts.init(panel);
        chart.setOption(option);
    }
};
