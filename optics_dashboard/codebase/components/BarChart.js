import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import { Box } from "@chakra-ui/react";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      series: [
        {
          data: props.data,
        },
      ],
      theme: {
        mode: "dark",
      },

      options: {
        chart: {
          toolbar: {
            show: false,
            tools: {
              download: false,
            },
          },
          zoom: {
            enabled: false,
          },
          height: 350,
          type: "bar",
          events: {
            click: function (chart, w, e) {
              // console.log(chart, w, e)
            },
          },
        },
        colors: props.color
          ? props.color
          : [
              function ({ value, seriesIndex, w }) {
                if (value <= 0) {
                  return "#4c45e5";
                } else {
                  return "#24ee70";
                }
              },
            ],
        plotOptions: {
          bar: {
            columnWidth: "45%",
          },
        },
        tooltip: {
          theme: "dark",
          // followCursor: true,
          fixed: {
            enabled: true,
            position: "topLeft",
            offsetX: 0,
            offsetY: "5em",
          },
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            return (
              '<Box><div class="arrow_box">' +
              "<span>" +
              series[seriesIndex][dataPointIndex] +
              "</span>" +
              "</div></Box>"
            );
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        grid: {
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        yaxis: {
          show: false,
        },
        xaxis: {
          // categories: props.categories,
          type: "datetime",
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            style: {
              colors: "#ffffff",
              // fontSize: "12px",
            },
            offsetY: 2,
          },
        },
        title: {
          text: props.title && props.title,
          align: "left",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "18px",
            fontWeight: "regular",
            // fontFamily: undefined,
            color: "#ffffff",
          },
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={350}
        />
      </div>
    );
  }
}

export default ApexChart;
