<template>
  <ApexChart type="donut" :options="chartOptions" :series="series" />
</template>

<script>
import ApexChart from "vue-apexcharts"

export default {
  name: "BalanceC",
  components: {
    ApexChart,
  },
  data() {
    return {
      series: [44, 55, 41, 17, 15],
      chartOptions: {
        chart: {
          type: "donut",
          width: "100%",
          height: "100%",
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
          position: "bottom",
        },
        // responsive: [
        //   {
        //     breakpoint: 480,
        //     options: {
        //       chart: {
        //         width: "100%",
        //         height: "100%",
        //       },
        //       legend: {
        //         show: false,
        //         position: "bottom",
        //       },
        //     },
        //   },
        // ],
      },
    }
  },
  mounted() {
    // const data = anychart.data.set([
    //   ["CELO", 10],
    //   ["cUSD", 0],
    // ])
    // var chart = anychart.pie(data)
    // chart.background().fill("#313246 ")
    // chart.innerRadius("55%")
    // // chart.title("Music Streaming Apps Global Market Share")
    // chart.container("balanceC")
    // chart.draw()
    // // new Chart(ctx, {
    // //   type: "doughnut",
    // //   data: {
    // //     labels: ["CELO", "cUSD"],
    // //     datasets: [
    // //       {
    // //         label: "Balance composition",
    // //         data: [0.01, 0.005],
    // //         backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
    // //         hoverOffset: 4,
    // //       },
    // //     ],
    // //   },
    // // })
  },
}
</script>

<style scoped>
div {
  width: 100% !important;
  height: 350px !important;
}
</style>
