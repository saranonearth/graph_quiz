console.log("charts here");

//Getting the question number from pathname
let questionNumber = window.location.pathname;
questionNumber = parseInt(questionNumber[questionNumber.length - 1]);
console.log(questionNumber);

let newY = 0;
let newX = 0;

//Function to go to the next question or submit the data
const nextQuestion = async () => {
  if (questionNumber === 2) {
    const res = await axios.post("/submit");
    console.log(res.data);
    window.location.replace("/");
  } else {
    window.location.replace(`/question${questionNumber + 1}`);
  }
};

//Function to show the result to the user
const showResult = (res) => {
  if (res.data.okay) {
    document.getElementById("result").innerHTML = res.data.message;
  } else {
    document.getElementById(
      "result"
    ).innerHTML = `${res.data.message}. The correct answer is ${res.data.correct}`;
  }
  setTimeout(nextQuestion, 2000);
};

//Dataset matrix
const graphValues = [
  [200, 100, 125, 80, 80],
  [150, 80, 55, 100, 100],
];

//Function to re-render chart based on click
const chartClicked = async (event) => {
  clicked = true;

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

  const selectedVal = Math.ceil(newY / 10) * 10;
  myChart.data.datasets[0].data.pop();
  myChart.data.datasets[0].data.push(selectedVal);
  myChart.update();
  const res = await axios.get("/check", {
    params: { level: questionNumber, value: selectedVal },
  });
  console.log(res.data);
  showResult(res);
};

const canvasRef = document.getElementById("myChart");
let ctx = canvasRef.getContext("2d");

let myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [2016, 2017, 2018, 2019, 2020, 2021],
    datasets: [
      {
        label: "Budget",
        //Using question number as index to use from dataset matrix
        data: graphValues[questionNumber - 1],
        backgroundColor: "transparent",
        borderColor: "blue",
        borderWidth: 2,
        pointHitRadius: 25,
      },
    ],
  },
  options: {
    dragData: true,
    dragX: true,
    dragDataRound: -1,
    onDragStart: (e) => {
      console.log(e);
    },
    onDrag: (e, datasetIndex, index, value) => {
      e.target.style.cursor = "grabbing";
    },
    //Function to check if answer is correct or incorrect when user stops the drag
    onDragEnd: async (e, datasetIndex, index, value) => {
      e.target.style.cursor = "default";
      const res = await axios.get("/check", {
        params: { level: questionNumber, value },
      });
      showResult(res);
    },
    elements: {
      line: {
        tension: 0,
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            zeroLineColor: "rgba(38,38,38,1)",
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            zeroLineColor: "rgba(38,38,38,1)",
          },
        },
      ],
    },
  },
});
