<script>
  import { Line } from 'vue-chartjs';

  export default {
    extends: Line,
    props: ['data'],
    watch: {
      data: function(chartData) { // watch it
        this.renderChart(
          {
            labels: chartData.labels,
            datasets: chartData.datasets,
          },
          {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 0,
            },
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  unit: chartData.timeUnit || 'day',
                }
              }]
            },
            legend: {
              display: false
            },
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  var label = data.datasets[tooltipItem.datasetIndex].label || '';

                  if (label) {
                    label += ': ';
                  }
                  label += Math.round(tooltipItem.yLabel * 100) / 100;
                  return label;
                }
              }
            }
          }
        );


      }
    }
  };
</script>
