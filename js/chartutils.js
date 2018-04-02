var ChartUtils = {
    init: function () {
        this.drawSymmetryGraph("dprChart");
        this.drawBars("tvChart");
        this.drawPie("csChart");
        this.drawGridBar("ocChart");
        this.drawLines("spChart");
    },
    drawLines: function (id) {
        var option = {
            color: ['#3FF2E8', '#D7FB2D'],
            tooltip: {trigger: 'axis'},
            legend: {
                bottom: 0,
                textStyle: {
                    color: '#7AAAD2'
                },
                data:['500/300收益率之比','预测指标（右轴）']
            },
            grid: {
                left: '7%',
                right: '7%',
                top: '10%',
                bottom: '10%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    axisLine: {show: false},
                    axisTick: {show: false},
                    axisLabel: {
                        color: '#7AAAD2'
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#2A557E'
                        }
                    },
                    data: ['2017/1/1','2017/2/1','2017/3/1','2017/4/1','2017/5/1',
                        '2017/6/1','2017/7/1','2017/8/1','2017/9/1','2017/10/1','2017/11/1','2017/12/1']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLine: {show: false},
                    axisTick: {show: false},
                    axisLabel: {
                        color: '#7AAAD2'
                    },
                },
                {
                    type: 'value',
                    axisLine: {show: false},
                    axisTick: {show: false},
                    splitLine: {show: false},
                    axisLabel: {
                        color: '#7AAAD2'
                    },
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
            color: ['#1CD9C3','#FE116C'],
            tooltip : {
                show: false
            },
            grid: {
                left: '7%',
                right: '7%',
                top: '10%',
                bottom: '10%',
                containLabel: true
            },
            xAxis: {
                type : 'value',
                position: 'bottom',
                axisLine: {show: false},
                axisTick: {show: false},
                axisLabel: {
                    color: '#7AAAD2',
                    formatter: function(value) {
                        return value.toFixed(2)+"%";
                    }
                },
                splitLine: {
                    lineStyle:{
                        color:'#2A557E'
                    }
                },
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
                    color: '#1CD9C3'
                }, {
                    gte: 0,
                    color: '#FE116C'
                }]
            },
            series : [
                {
                    name:'',
                    type:'bar',
                    label: {
                        normal: {
                            show: true,
                            color: '#7AAAD2',
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
                        lineStyle: {
                            color: '#FFB201',
                        },
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
            color: ['#AFABAB','#9DC3E6','#A9D18E','#F4B183'],
            series: [
                {
                    name:'',
                    type:'pie',
                    radius: ['50%', '70%'],
                    label: {
                        color: '#7AAAD2',
                        formatter: '{b}\n[{c}，{d}%]'
                    },
                    data:[
                        {
                            value:200,
                            name:'停牌',
                            itemStyle: {
                                color: '#606363'
                            }
                        },
                        {
                            value:1300, 
                            name:'上涨',
                            itemStyle: {
                               color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#EF52E6'},
                                            {offset: 0.5, color: '#EF4079'},
                                            {offset: 1, color: '#F5365F'}
                                        ]
                                )
                            }
                        },
                        {
                            value:800, 
                            name:'下跌',
                            itemStyle: {
                               color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#47B98A'},
                                            {offset: 0.5, color: '#44B2A0'},
                                            {offset: 1, color: '#2497D5'}
                                        ]
                                )
                            }
                        },
                        {
                            value:400, 
                            name:'平盘',
                            itemStyle: {
                               color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#4B3AFD'},
                                            {offset: 0.5, color: '#6839F2'},
                                            {offset: 1, color: '#9730FA'}
                                        ]
                                )
                            }
                        }
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
            color: ['#5B9BD5','#ED7D31'],
            legend: {
                bottom: 0,
                textStyle: {
                    color: '#7AAAD2'
                },
                data:['实时交易额（亿元）','同期交易额（亿元）']
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            
                    type : 'shadow'        
                }
            },
            grid: {
                left: '7%',
                right: '7%',
                top: '10%',
                bottom: '10%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    axisLine: {show: false},
                    axisTick: {show: false},
                    axisLabel: {
                        color: '#7AAAD2'
                    },
                    data : ['A', 'B', 'C', 'D', 'E', 'F']
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine: {show: false},
                    axisTick: {show: false},
                    axisLabel: {
                        color: '#7AAAD2'
                    },
                }
            ],
            series : [
                {
                    name:'实时交易额（亿元）',
                    type:'bar',
                    barWidth: '30%',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#48B2ED'},
                                    {offset: 0.5, color: '#368BFE'},
                                    {offset: 1, color: '#3352FF'}
                                ]
                            )
                        }
                    },
                    data:[20, 15, 10, 7, 5, 3]
                },
                {
                    name:'同期交易额（亿元）',
                    type:'bar',
                    barWidth: '30%',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#EBB647'},
                                    {offset: 0.5, color: '#EB834C'},
                                    {offset: 1, color: '#F25666'}
                                ]
                            )
                        }
                    },
                    data:[10, 12, 14, 10, 1, 2]
                }
            ]
        };
        var panel = document.getElementById(id);
        var chart = echarts.init(panel);
        chart.setOption(option);
    },
    drawGridBar: function (id) {
        var option = {
            color: ["#5FBCFF"],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['2011年', '2012年']
            },
           grid: [
                {x: '3%', y: '10%', width: '50%', height: '80%',containLabel: true},
                {x2: '7%', y: '10%', width: '30%', height: '80%',containLabel: true}
            ],
            xAxis: [
                {
                    type: 'value',
                    gridIndex: 0,
                    axisLabel: {show: false},
                    axisLine: {show: false},
                    axisTick: {show: false},
                    splitLine: {show: false}
                },
                {
                    type: 'value',
                    gridIndex: 1,
                    axisLabel: {show: false},
                    axisLine: {show: false},
                    axisTick: {show: false},
                    splitLine: {show: false}
                },
            ],
            yAxis: [
                {
                    type: 'category',
                    gridIndex: 0,
                    axisLine: {show: false},
                    axisTick: {show: false},
                    axisLabel: {
                        formatter: function(value){
                            var values = value.split("|");
                            return '{' + values[0] + '|'+ values[1] +'}'
                        },
                        rich: {
                            a: {
                                color: '#7AAAD2'
                            },
                            b: {
                                color: '#BA6F85'
                            }
                        }
                    },
                    data: ['b|A  2017/12/9',
                           'a|B  2018/1/3',
                           'a|C  2018/5/5',
                           'a|D  2018/6/7',
                           'a|E  2018/11/11']
                },
                {
                    type: 'category',
                    gridIndex: 1,
                    axisLine: {show: false},
                    axisTick: {show: false},
                    axisLabel: {show: false},
                }
            ],
            series: [
                {
                    name: '基础份额净值',
                    type: 'bar',
                    barWidth: '50%',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    label: {
                        show: true,
                        position: 'right',
                        formatter: function(o){
                            var e = 'a';
                            var value = o.data
                            if (value > 1.2) {
                                e = 'b';
                            }
                            return '{' + e + '|'+ value +'}';
                        },
                        rich: {
                            a: {
                                color: '#7AAAD2'
                            },
                            b: {
                                color: '#BA6F85'
                            }
                        }
                    },
                    data: [1.2, 1.1, 1.3, 1.4, 1],
                    markLine: {
                        symbol: 'none',
                        lineStyle: {
                            color: '#FFB201',
                        },
                        data: [
                            {xAxis: 1.2}
                        ]
                    }
                },
                {
                    name: 'B份额净值',
                    type: 'bar',
                    barWidth: '50%',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    label: {
                        show: true,
                        position: 'right',
                        formatter: function(o){
                            var e = 'a';
                            var value = o.data;
                            if (value <= 0.4) {
                                e = 'b';
                            }
                            return '{' + e + '|'+ value +'}';
                        },
                        rich: {
                            a: {
                                color: '#7AAAD2'
                            },
                            b: {
                                color: '#BA6F85'
                            }
                        }
                    },
                    data: [0.8, 0.6, 1.2, 0.4, 0.5],
                    markLine: {
                        symbol: 'none',
                        lineStyle: {
                            color: '#FFB201',
                        },
                        data: [
                            {xAxis: 0.4}
                        ]
                    }
                }
            ]
        };
        var panel = document.getElementById(id);
        var chart = echarts.init(panel);
        chart.setOption(option);
    }
};
