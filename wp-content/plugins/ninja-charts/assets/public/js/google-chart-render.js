/*eslint-disable*/

jQuery(document).ready(function () {
    (function () {
        var charts = jQuery('.ninja-charts-google-container');
        if (charts.length) {
            const th = this;
            charts.each(function () {
                var chartId = jQuery(this).data('id');
                var uniqid = jQuery(this).data('uniqid');
                var chartInstance = 'ninja_charts_instance_' + chartId;
                var canvasDom = 'ninja_charts_instance' + uniqid;
                var renderData = window[chartInstance];
                var options = JSON.parse(renderData.options);
                var canvas = document.getElementById(canvasDom);

                google.charts.load('current', {'packages': ['corechart']});
                google.charts.setOnLoadCallback(drawChart);

                function drawChart() {
                    let chartType = renderData.chart_type;
                    var data = google.visualization.arrayToDataTable(renderData.chart_data);
                    const chartOption = {
                        title: renderData.chart_name,
                        titlePosition: options.title.display === 'true' ? options.title.position : 'none',
                        titleTextStyle: {
                            color: options.title.fontColor,
                            fontSize: options.title.fontSize
                            // bold: options.title.titleTextStyle.bold,
                            // italic: options.title.titleTextStyle.italic
                        },
                        legend: {
                            position: options.legend.display === 'true' ? options.legend.position : 'none',
                            textStyle: {
                                color: options.legend.fontColor,
                                fontSize: options.legend.fontSize
                                // bold: options.legend.textStyle.bold,
                                // italic: options.legend.textStyle.italic
                            },
                            alignment: options.legend.alignment
                        },
                        tooltip: {
                            isHtml: false,
                            trigger: options.tooltip.enabled ? options.tooltip.trigger : 'none',
                            textStyle: {
                                color: options.tooltip.titleFontColor,
                                fontSize: options.tooltip.titleFontSize
                                // bold: options.tooltip.textStyle.bold,
                                // italic: options.tooltip.textStyle.italic
                            }
                        },
                        hAxis: {
                            title: options.axes.x_axis_label,
                            // minValue: options.axes.hAxis.minValue,
                            // maxValue: options.axes.hAxis.maxValue,
                            textStyle: {
                                color: options.chart.fontColor,
                                fontSize: options.chart.fontSize
                            }
                        },
                        vAxis: {
                            title: options.axes.y_axis_label,
                            minValue: options.axes.verticle_min_tick,
                            maxValue: options.axes.verticle_max_tick,
                            textStyle: {
                                color: options.chart.fontColor,
                                fontSize: options.chart.fontSize
                            }
                        },
                        isStacked: options.axes.stacked,
                        pieHole: renderData.chart_type === 'DonutChart' ? 0.4 : 1,
                        is3D: options.chart.threeD,
                        // chartArea: {
                        //     backgroundColor: {
                        //         stroke: 'red',
                        //         strokeWidth: 4
                        //     }
                        // },
                        animation: {
                            duration: 1000,
                            easing: 'out',
                            startup: true
                        },
                        backgroundColor: {
                            fill: options.chart.backgroundColor,
                            strokeWidth: options.chart.borderWidth,
                            stroke: options.chart.borderColor,
                            rx: options.chart.borderRadius
                        },
                        slices: options.series,
                        series: renderData.chart_type === 'ComboChart' ? {1: {type: 'line'}} : options.series,
                        seriesType: renderData.chart_type === 'ComboChart' ? 'bars' : '',
                        colors: options.series ? options.series.map(x => x.color) : [],
                        pieSliceTextStyle: {
                            color: options.chart.fontColor,
                            fontSize: options.chart.fontSize,
                        }
                    };

                    if (options.chart.responsive === 'false') {
                        let marginStyle = {
                            'margin-left': 'auto',
                            'margin-right': 'auto'
                        };

                        if (options.chart.position === 'right') {
                            marginStyle['margin-right'] = '0';
                        } else if (options.chart.position === 'left') {
                            marginStyle['margin-left'] = '0';
                        }

                        let uniqChart = `.ninja-charts-google-container .ninja_charts_instance${uniqid}`;
                        jQuery(uniqChart).css(marginStyle);
                    }

                    if (renderData.chart_type !== 'ComboChart') {
                        delete chartOption.colors;
                    }
                    chartType = renderData.chart_type === 'DonutChart' ? 'PieChart' : renderData.chart_type;
                    var chart = new google.visualization[chartType](canvas)
                    chart.draw(data, chartOption);
                }
            })
        }
    })();
});
