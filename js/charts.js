const data1 = [];
const cfg1 = {
    type: 'bar',
    data: {
        labels: [],
        datasets: [
            { label: 'Game Score', data: data1, backgroundColor: '#FFA600', parsing: { yAxisKey: 'score' }, yAxisID: 'y', }, 
            { label: 'Frames Score', data: data1, backgroundColor: '#BC5090', parsing: { yAxisKey: 'frame_score' }, yAxisID: 'y1',}
        ]
    },
    // https://www.chartjs.org/docs/3.8.0/samples/line/multi-axis.html
    options: {
        responsive: true,
        stacked: false,
        scales: {
          y: { type: 'linear', display: true, position: 'left', },
          y1: { type: 'linear', display: true, position: 'right',
            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        }
      }
};

const data3 = [];
const cfg3 = {
    type: 'bar',
    data: {
        labels: [],
        datasets: [
            { label: '(this.score*2)**2', data: data3, backgroundColor: '#FFA600', parsing: { yAxisKey: '_1' }, yAxisID: 'y', }, 
            { label: 'frame_score**1.5', data: data3, backgroundColor: '#BC5090', parsing: { yAxisKey: '_2' }, yAxisID: 'y1',}
        ]
    },
    // https://www.chartjs.org/docs/3.8.0/samples/line/multi-axis.html
    options: {
        responsive: true,
        stacked: false,
        scales: {
          y: { type: 'linear', display: true, position: 'left', },
          y1: { type: 'linear', display: true, position: 'right',
            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        }
      }
};

const data4 = [];
const cfg4 = {
    type: 'bar',
    data: {
        labels: [],
        datasets: [
            { label: 'Fitness', data: data4, backgroundColor: '#FFA600', parsing: { yAxisKey: '_3' }, yAxisID: 'y', }, 
        ]
    },
    // https://www.chartjs.org/docs/3.8.0/samples/line/multi-axis.html
    options: {
        responsive: true,
        stacked: false,
        scales: {
          y: { type: 'linear', display: true, position: 'left', },
        }
      }
};

const data2 = [];
const cfg2 = {
    type: 'bar',
    data: {
        labels: [],
        datasets: [
            { label: 'Average Game Score', data: data2, backgroundColor: '#FF6361', parsing: { yAxisKey: 'average_game_score' }, yAxisID: 'y', }, 
            { label: 'Average Frame Score', data: data2, backgroundColor: '#58508D', parsing: { yAxisKey: 'average_frame_score' }, yAxisID: 'y1',}
        ]
    },
    // https://www.chartjs.org/docs/3.8.0/samples/line/multi-axis.html
    options: {
        responsive: true,
        stacked: false,
        scales: {
          y: { type: 'linear', display: true, position: 'left', },
          y1: { type: 'linear', display: true, position: 'right',
            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        }
      }
};

const chart1 = new Chart($("#chart1")[0].getContext('2d'), cfg1);
const chart2 = new Chart($("#chart2")[0].getContext('2d'), cfg2);
const chart3 = new Chart($("#chart3")[0].getContext('2d'), cfg3);
const chart4 = new Chart($("#chart4")[0].getContext('2d'), cfg4);

export { 
    data1, cfg1, chart1,
    data2, cfg2, chart2,
    data3, cfg3, chart3,
    data4, cfg4, chart4,
}