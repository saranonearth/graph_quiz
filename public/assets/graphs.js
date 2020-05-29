console.log("charts here");

let clicked = false;
let answerColor = "yellow";
let clickedChecker = false;
let userAnswer;

//Getting the question number from pathname
let questionNumber = window.location.pathname;
questionNumber = parseInt(questionNumber[questionNumber.length - 1]);
console.log(questionNumber);

let newY = 0;
let newX = 0;
let labels = [
  "2014-15",
  "2015-16",
  "2016-17",
  "2017-18",
  "2018-19",
  "2019-20",
  "",
];

//Function to go to the next question or submit the data
const nextQuestion = async (event) => {
  if (questionNumber === 6) {
    const res = await axios.post("/submit");
    console.log(res.data);
    window.location.replace("/end");
  } else {
    window.location.replace(`/question${questionNumber + 1}`);
  }
};

//Function to show the result to the user
const showResult = (res) => {
  if (res.data.okay) {
    document.getElementById(
      "result"
    ).innerHTML = `<p style=" color:green; font-size:20px; padding:5px; font-wight:bold;">${res.data.message}</p>`;
    answerColor = "green";
  } else {
    document.getElementById(
      "result"
    ).innerHTML = `<p style=" color:red; font-size:20px; padding:5px; font-weight:bold;">${res.data.message}</p>`;
    answerColor = "red";
  }
  myChart.data.datasets[1].borderColor = answerColor;
  myChart.data.datasets[1].pointBackgroundColor = answerColor;
  myChart.data.datasets[2].data[5] = res.data.correct;

  myChart.update();
  document.getElementById("next-btn").style.display = "inline-block";
};

//Dataset matrix
const graphValues = [
  [289, 306, 332, 361, 384],
  [12.6, 14.3, 15, 17, 17.2],
  [160, 144, 149, 167, 150],
  [4363, 3741, 5069, 6332, 6141],
  [1472, 399, 711, 1740, 2178],
  [3123, 2720, 4118, 4919, 2814],
];

//Dataset for the correct answers
const correctAnswers = [
  [289, 306, 332, 361, 384],
  [12.6, 14.3, 15, 17, 17.2],
  [160, 144, 149, 167, 150],
  [4363, 3741, 5069, 6332, 6141],
  [1472, 399, 711, 1740, 2178],
  [3123, 2720, 4118, 4919, 2814],
];
const yellowLine = [
  [289, 306, 332, 361, 384],
  [12.6, 14.3, 15, 17, 17.2],
  [160, 144, 149, 167, 150],
  [4363, 3741, 5069, 6332, 6141],
  [1472, 399, 711, 1740, 2178],
  [3123, 2720, 4118, 4919, 2814],
];

//Array of Tick Objects for each array
const ticksArray = [
  {
    beginAtZero: true,
    max: 500,
    min: 200,
    fontColor: "black",
    color: "black",
  },
  {
    beginAtZero: true,
    max: 35,
    min: 12,
    fontColor: "black",
    color: "black",
  },
  {
    beginAtZero: true,
    max: 180,
    min: 140,
    fontColor: "black",
    color: "black",
  },
  {
    beginAtZero: true,
    max: 13000,
    min: 3500,
    fontColor: "black",
    color: "black",
  },
  {
    beginAtZero: true,
    max: 5000,
    min: 350,
    fontColor: "black",
    color: "black",
  },
  {
    beginAtZero: true,
    max: 9000,
    min: 2500,
    fontColor: "black",
    color: "black",
  },
];

//Questions Array
let questions = [
  "Guess the Cases of Liquor sold in AP in the year 2019-20?",
  "Guess the amount spent by the Government of AP in Education Sector in the year 2019-20?",
  "Guess the tonnes of food grains produced in Andhra Pradesh in the year 2019-20?",
  "Guess the amount spent by the Government of AP on Health Care in the year 2019-20?",
  "Guess the amount spent by the Government of AP on Industries & Infrastructure in the year 2019-20?",
  "Guess the amount spent by the Government of AP for the welfare of Backward Classes in the year 2019-20?",
];

//Label strings Array
let questionLabels = [
  "Cases(in Lakhs)",
  "Budget(in Thousand Crores)",
  "Budget(in Lakhs)",
  "Budget(in Crores)",
  "Budget(in Crores)",
  "Budget(in Crores)",
];

//Tooltip labels
let tooltipLabels = ["Lakh", "Crore", "Crore", "Crore", "Crore", "Crore"];

//Function to re-render chart based on click
const chartClicked = async (event) => {
  if (!clickedChecker) {
    if (!clicked) {
      let yTop = myChart.chartArea.top;
      let yBottom = myChart.chartArea.bottom;

      let yMin = myChart.scales["y-axis-0"].min;
      let yMax = myChart.scales["y-axis-0"].max;

      if (event.offsetY <= yBottom && event.offsetY >= yTop) {
        newY = Math.abs((event.offsetY - yTop) / (yBottom - yTop));
        newY = (newY - 1) * -1;
        newY = newY * Math.abs(yMax - yMin) + yMin;
      }

      let xTop = myChart.chartArea.left;
      let xBottom = myChart.chartArea.right;
      let xMin = myChart.scales["x-axis-0"].min;
      let xMax = myChart.scales["x-axis-0"].max;

      if (event.offsetX <= xBottom && event.offsetX >= xTop) {
        newX = Math.abs((event.offsetX - xTop) / (xBottom - xTop));
        newX = newX * Math.abs(xMax - xMin) + xMin;
      }

      const selectedVal = newY.toFixed(0);

      myChart.data.datasets[1].data[5] = selectedVal;
      document.getElementById("result").innerHTML =
        '<p style="color: rgb(20, 42, 105); font-size: large; ">Please Drag And Drop The Red Marker To Enter Your Response </p>';
      clickedChecker = true;
      myChart.update();
    }
  }
};

document.getElementById("questionNumber").innerHTML = `Q${questionNumber}. ${
  questions[questionNumber - 1]
}`;
const canvasRef = document.getElementById("myChart");
let ctx = canvasRef.getContext("2d");
let gradient = null;
let width = null;
let height = null;

let draw = Chart.controllers.line.prototype.draw;
Chart.controllers.line.prototype.draw = function () {
  draw.apply(this, arguments);
  let ctx = this.chart.chart.ctx;
  let _stroke = ctx.stroke;
  ctx.stroke = function () {
    ctx.save();
    ctx.shadowColor = "#ffffff";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    _stroke.apply(this, arguments);
    ctx.restore();
  };
};
Chart.pluginService.register({
  beforeRender: function (chart) {
    if (chart.config.options.showAllTooltips) {
      // create an array of tooltips
      // we can't use the chart tooltip because there is only one tooltip per chart
      chart.pluginTooltips = [];
      chart.config.data.datasets.forEach(function (dataset, i) {
        chart.getDatasetMeta(i).data.forEach(function (sector, j) {
          {
            chart.pluginTooltips.push(
              new Chart.Tooltip(
                {
                  _chart: chart.chart,
                  _chartInstance: chart,
                  _data: chart.data,
                  _options: chart.options.tooltips,
                  _active: [sector],
                },
                chart
              )
            );
          }
        });
      });

      // turn off normal tooltips
      chart.options.tooltips.enabled = false;
    }
  },
  afterDraw: function (chart, easing) {
    if (chart.width < 640) {
    }
    if (chart.config.options.showAllTooltips) {
      // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
      if (!chart.allTooltipsOnce) {
        if (easing !== 1) return;
        chart.allTooltipsOnce = true;
      }

      // turn on tooltips
      chart.options.tooltips.enabled = true;
      Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
        tooltip.initialize();
        tooltip.update();
        // we don't actually need this since we are not animating tooltips
        tooltip.pivot();
        tooltip.transition(easing).draw();
      });
      chart.options.tooltips.enabled = false;
    }
  },
});

let myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        //Using question number as index to use from dataset matrix
        data: yellowLine[questionNumber - 1],
        datalabels: {
          labels: {
            value: null,
          },
        },
        backgroundColor: "transparent",
        borderColor: "yellow",
        pointRadius: 1,
        pointHoverRadius: 4,
        pointHitRadius: 25,
        fill: false,
        tension: 0,
        borderWidth: 6,

        pointBackgroundColor: "yellow",
        pointBorderColor: "#FADA5E",
        pointHoverBackgroundColor: "#07C",
        pointHoverBorderColor: "#FFF",
      },

      {
        //Using question number as index to use from dataset matrix
        data: graphValues[questionNumber - 1],
        datalabels: {
          labels: [
            {
              color: [
                "transparent",
                "transparent",
                "transparent",
                "transparent",
                "transparent",
                "red",
              ],
            },
          ],
          font: {
            family: "FontAwesome",
            size: 24,
            lineHeight: 0.5,
          },
          formatter: (value, context) => {
            return "\uf062\n\uf063";
          },
          align: "right",
        },
        backgroundColor: "transparent",
        borderColor: function (myChart) {
          var chartArea = myChart.chart.chartArea;
          if (!chartArea) {
            // This case happens on initial chart load
            return null;
          }
          var chartWidth = chartArea.right - chartArea.left;
          var chartHeight = chartArea.bottom - chartArea.top;

          if (
            gradient === null ||
            width !== chartWidth ||
            height !== chartHeight
          ) {
            // Create the gradient because this is either the first render
            // or the size of the chart has changed

            width = chartWidth;
            height = chartHeight;
            var ctx = myChart.chart.ctx;
            gradient = ctx.createLinearGradient(
              chartArea.left,
              0,
              chartArea.right,
              0
            );

            gradient.addColorStop(0, "yellow");
            gradient.addColorStop(0.67, "yellow");
            gradient.addColorStop(0.67, "red");
            gradient.addColorStop(1, "red");
          }

          return gradient;
        },
        pointRadius: 2,
        pointHoverRadius: 4,
        pointHitRadius: 25,
        fill: false,
        tension: 0,
        borderWidth: 6,

        pointBorderColor: "red",
        pointHoverBackgroundColor: "red",
        pointHoverBorderColor: "red",
      },
      {
        //Using question number as index to use from dataset matrix
        data: correctAnswers[questionNumber - 1],
        datalabels: {
          labels: {
            value: null,
          },
        },
        backgroundColor: "transparent",
        borderColor: "blue",
        pointRadius: 2,
        pointHoverRadius: 3,
        pointHitRadius: 25,
        fill: false,
        tension: 0,
        borderWidth: 6,

        pointBackgroundColor: "blue",
        pointBorderColor: "blue",
        pointHoverBackgroundColor: "#07C",
        pointHoverBorderColor: "#FFF",
      },
    ],
  },
  options: {
    legend: {
      display: false,
    },
    showAllTooltips: true,
    tooltips: {
      xPadding: 2,
      yPadding: 1,
      displayColors: false,
      bodyFontSize: 10,
      yAlign: "bottom",
      xAlignadius: 4,
      callbacks: {
        labelColor: function (tooltipItem, chart) {
          return null;
        },
      },
      backgroundColor: "#227799",

      callbacks: {
        // use label callback to return the desired label
        label: function (tooltipItem) {
          return tooltipLabels[questionNumber - 1];
        },
        // remove title
        title: function (tooltipItem, data) {
          if (questionNumber === 2) {
            return tooltipItem[0].yLabel + "K";
          } else {
            return tooltipItem[0].yLabel;
          }
        },
      },
    },

    responsive: true,
    maintainAspectRatio: false,

    dragData: true,
    dragX: true,
    dragDataRound: 0,
    dragOptions: {
      showTooltip: true,
    },

    onDragStart: (e, datasetIndex) => {
      if (datasetIndex._index === 5) {
        if (!clicked) {
          document.getElementById(
            "result"
          ).innerHTML = `<p style="color: rgb(20, 42, 105); font-size: large; ">Release The Point On Your Desired Response</p>`;
        } else {
          alert("You cannot change your answer");
        }
      } else {
        return false;
      }
    },
    onDrag: (e, datasetIndex, index, value) => {
      if (!clicked) {
        e.target.style.cursor = "grabbing";
      } else {
      }
    },
    //Function to check if answer is correct or incorrect when user stops the drag
    onDragEnd: async (e, datasetIndex, index, value) => {
      e.target.style.cursor = "default";
      if (!clicked) {
        const res = await axios.get("/check", {
          params: { level: questionNumber, value },
        });
        userAnswer = value;
        clicked = true;
        showResult(res);
      } else {
        alert("You cannot change your answer");
        myChart.data.datasets[0].data[5] = value;
      }
    },

    elements: {
      line: {
        tension: 0,
        spanGaps: true,
      },
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: questionLabels[questionNumber - 1],
            fontColor: "black",
            fontSize: 15,
            color: "black",
          },
          ticks: ticksArray[questionNumber - 1],
          gridLines: {
            drawBorder: false,
            zeroLineColor: "black",
            display: true,
            fontColor: "black",
          },
          label: questionLabels[questionNumber - 1],
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Year",
            fontColor: "black",
            fontSize: 15,
            color: "black",
          },
          ticks: {
            beginAtZero: false,
            fontColor: "black",
          },
          gridLines: {
            zeroLineColor: "#FFFFFF",
            color: [
              "#FFFFFF",
              "#FFFFFF",
              "#FFFFFF",
              "#FFFFFF",
              "#FFFFFF",
              "#E48432",
              "#FFFFFF",
            ],
            fontColor: "black",
          },
        },
      ],
    },
  },
});
