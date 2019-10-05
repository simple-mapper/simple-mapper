var rate_request_charts = {
  gen: function(){
    //console.log(rate_request_results.data, rate_request_results.data_aggregate);
    rate_request_charts.post_render();
  },

  init: function(text){
  },

  render: function(text){
  },

  post_render: function(){
    rate_request_charts.setChart();
    graph_data.daily(rate_request_results.data.docs)
  },

  myChart: {},

  check: false,

  setChart: function(dataVals){

    if(rate_request_charts.check != false){
      rate_request_charts.myChart.destroy();
    }
    else {
      rate_request_charts.check = true;
    }

    var ctx = document.getElementById('rate_request_charts').getContext('2d');
    rate_request_charts.myChart = new Chart(ctx, {
      type: 'bar',
      data: dataVals,
      options: {
        legend: {
          position: 'right',
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            id: 'A',
            position: 'left',
            ticks: {
              beginAtZero: true,
              stepSize: 1,
            },
          },
          {
            id: 'B',
            position: 'right',
          }]
        },
      }
    });
  }

}
