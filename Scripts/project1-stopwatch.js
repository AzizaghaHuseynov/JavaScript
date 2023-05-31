const startButton = document.querySelector('.js-start-button')
const resetButton = document.querySelector('.js-reset-button')
const showTime = document.querySelector('.js-show-time');
let intervalId;
let intervalId2;
let intervalId3;

let i=0;
let k=0;
let l=0;
let counter = 0;

let timeLapList = [{
  lap: 'Lap',
  lapTimes: 'Lap times',
  OverallTime: 'Overall time'
}];


if (localStorage.length === 0) {
  i=0;
  k=0;
  l=0;
  showTime.innerHTML = `${i} : ${k} . ${l}`;

} else if (localStorage.length !== 0) {

showTime.innerHTML = JSON.parse(localStorage.getItem('data'));
startButton.innerHTML = 'Resume';
startButton.classList.add('resume-button');
resetButton.innerHTML = 'Reset';
resetButton.disabled = false;


let parts = showTime.innerHTML.split(/[:.]/);
console.log(showTime.innerHTML);
i = parseInt(parts[0]);
k = parseInt(parts[1]);
l = parseInt(parts[2]);
}





function renderLapList() {

  let lapHTML = '';

  timeLapList.forEach((lapObject) => {

    const {lap, lapTimes, OverallTime} = lapObject;

    const html = `
    <div>${lap}</div>
    <div>${lapTimes}</div>
    <div>${OverallTime}</div>`;


    lapHTML += html;

  });

  document.querySelector('.js-lap-list').innerHTML = lapHTML;
};



function addLaps() {
  counter++;

  if (resetButton.innerText === 'Lap') {
    let parts = showTime.innerHTML.split(/[:.]/);
    i = parseInt(parts[0]);
    k = parseInt(parts[1]);
    l = parseInt(parts[2]);

    let previousOverallTime = timeLapList[timeLapList.length - 1].OverallTime;

    console.log(previousOverallTime);

    let previousParts = previousOverallTime.split(/[:.]/);
    let min = parseInt(previousParts[0]);
    let sec = parseInt(previousParts[1]);
    let msec = parseInt(previousParts[2]);


    let lapTimes = `${Math.abs(i-min)} : ${Math.abs(k-sec)} . ${Math.abs(l-msec)}`;

    if (previousOverallTime !== 'Overall time') {
      timeLapList.push({
      lap: counter,
      lapTimes: lapTimes,
      OverallTime: `${i} : ${k} . ${l}`
    });
  } else {
      timeLapList.push({
      lap: counter,
      lapTimes: `${i} : ${k} . ${l}`,
      OverallTime: `${i} : ${k} . ${l}`
    });
  };
  
  renderLapList();
  }
}




function startTime () {

   if (startButton.innerText === 'Start' || startButton.innerText === 'Resume') {
    startButton.innerHTML = 'Stop';
    startButton.classList.add('stop-button');
    startButton.classList.remove('resume-button');
    resetButton.innerHTML = 'Lap';
    resetButton.disabled = false;

    allIntervals();

    } else if (startButton.innerText === 'Stop') {

      updateTime();
      
    };
  };


function allIntervals() {

  intervalId = setInterval(() => {
    showTime.innerHTML = `${i++} : ${k} . ${l}`;
    localStorage.setItem('data', JSON.stringify(showTime.innerHTML))
  }, 60000);

  intervalId2 = setInterval(() => {
    showTime.innerHTML = `${i} : ${k++} . ${l}`;
    localStorage.setItem('data', JSON.stringify(showTime.innerHTML))
    if (k===60) {
      k=0;
    };
  }, 1000);
  
    intervalId3 = setInterval(() => {
      showTime.innerHTML = `${i} : ${k} . ${l++}`;
      localStorage.setItem('data', JSON.stringify(showTime.innerHTML))
      if (l===100) {
        l=0;
      };
    }, 1);
  };


function secondButton() {

  if (resetButton.innerText === 'Lap') {

    addLaps();

  } else if (resetButton.innerText === 'Reset') {

    resetTime();

  };
}


function updateTime() {
  clearInterval(intervalId);
  clearInterval(intervalId2);
  clearInterval(intervalId3);

  showTime.innerHTML = `${i} : ${k} . ${l}`;

  startButton.innerHTML = 'Resume';
  startButton.classList.remove('stop-button');
  startButton.classList.add('resume-button');
  resetButton.innerHTML = 'Reset';
}


function resetTime() {

  if (resetButton.innerText === 'Reset') {

    i = 0; k = 0; l = 0; counter = 0;
    showTime.innerHTML = `${i} : ${k} . ${l}`;
    updateTime();
    localStorage.clear()

    startButton.innerHTML = 'Start';
    startButton.classList.remove('stop-button');
    startButton.classList.remove('resume-button');
    resetButton.innerHTML = 'Lap';
    resetButton.disabled = true;


    document.querySelector('.js-lap-list').innerHTML = '';
  
    timeLapList = [{
      lap: 'Lap',
      lapTimes: 'Lap times',
      OverallTime: 'Overall time'
    }];


  };
}






