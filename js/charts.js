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
            { label: 'Fitness', data: data4, backgroundColor: '#6ebe9f', parsing: { yAxisKey: '_3' }, yAxisID: 'y', }, 
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

const data5 = [];
const cfg5 = {
    type: 'bar',
    data: {
        labels: [],
        datasets: [
            { label: 'Fitness Ratios', data: data5, backgroundColor: '#c73558', parsing: { yAxisKey: 'ratio' }, yAxisID: 'y', }, 
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

const data6 = [];
const cfg6 = {
    type: 'bar',
    data: {
        labels: [],
        datasets: [
            { label: 'Fitness Cutoffs', data: data6, backgroundColor: '#2586a4', parsing: { yAxisKey: 'cutoff' }, yAxisID: 'y', }, 
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

const data7 = [];
const cfg7 = {
    type: 'bar',
    data: {
        labels: [],
        datasets: [
            { label: 'Average Fitness', data: data7, backgroundColor: '#2586a4', parsing: { yAxisKey: 'average_fitness' }, yAxisID: 'y', }, 
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

const cfg8 = {
    type: 'line',
    data: { labels: [], datasets: [] },
    // https://www.chartjs.org/docs/3.8.0/samples/line/multi-axis.html
    options: {
        responsive: true,
        scales: { y: { type: 'linear', display: true, position: 'left', }, },
        plugins: {
            legend: {
                display: true,
            },
            title: {
              display: true,
              text: 'Best Parents (TOP-5 longest living chromosomes up to current generation and sorted by average fitness)'
            }
        }
    }
};

const cfg9 = {
  type: 'line',
  data: { labels: [], datasets: [] },
  // https://www.chartjs.org/docs/3.8.0/samples/line/multi-axis.html
  options: {
      responsive: true,
      scales: { y: { type: 'linear', display: true, position: 'left', }, },
      plugins: {
          legend: {
              display: true,
          },
          title: {
            display: true,
            text: 'Best Parents (TOP-5 lasted at least 1/3 of the longest living chromosome up until now and sorted by average fitness)'
          }
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
const chart5 = new Chart($("#chart5")[0].getContext('2d'), cfg5);
const chart6 = new Chart($("#chart6")[0].getContext('2d'), cfg6);
const chart7 = new Chart($("#chart7")[0].getContext('2d'), cfg7);
const chart8 = new Chart($("#chart8")[0].getContext('2d'), cfg8);
const chart9 = new Chart($("#chart9")[0].getContext('2d'), cfg9);

export { 
    data1, cfg1, chart1,
    data2, cfg2, chart2,
    data3, cfg3, chart3,
    data4, cfg4, chart4,
    data5, cfg5, chart5,
    data6, cfg6, chart6,
    data7, cfg7, chart7,
           cfg8, chart8,
           cfg9, chart9,
}