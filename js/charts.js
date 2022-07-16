const data1 = [];
const cfg1 = {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Score',
            data: data1,
            backgroundColor: '#FFA600',
            parsing: { yAxisKey: 'score' },
            yAxisID: 'y',
        }, {
            label: 'Frames Alive',
            data: data1,
            backgroundColor: '#BC5090',
            parsing: { yAxisKey: 'alive' },
            yAxisID: 'y1',
        }]
    },
    // https://www.chartjs.org/docs/3.8.0/samples/line/multi-axis.html
    options: {
        responsive: true,
        stacked: false,
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
    
            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        }
      }
};

const data2 = [];
const cfg2 = {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Average Game Score',
            data: data2,
            backgroundColor: '#FF6361',
            parsing: { yAxisKey: 'average_game_score' },
            yAxisID: 'y',
        }]
    },
    // https://www.chartjs.org/docs/3.8.0/samples/line/multi-axis.html
    options: {
        responsive: true,
        stacked: false,
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
        }
      }
};

const chart1 = new Chart($("#chart1")[0].getContext('2d'), cfg1);
const chart2 = new Chart($("#chart2")[0].getContext('2d'), cfg2);

export { 
    data1, cfg1, chart1,
    data2, cfg2, chart2 
}