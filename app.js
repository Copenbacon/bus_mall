'use strict';

var imageSources = [];
var labelsForChart = [];
var numOfVotesForChart = [];
var clicker = 0;
var buttonVisiblity = document.getElementById('printLi');
buttonVisiblity.style.visbility = 'hidden';



var surveyUl = document.getElementById('surveyUl');
var leftPhoto = document.getElementById('left_image');
var centerPhoto = document.getElementById('center_image');
var rightPhoto = document.getElementById('right_image');

new ImageConstructor('Baby', 'img/baby.jpg');
new ImageConstructor('Banana', 'img/banana.jpg');
new ImageConstructor('Bathroom', 'img/bathroom.jpg');
new ImageConstructor('Breakfast', 'img/breakfast.jpg');
new ImageConstructor('Bubblegum', 'img/chair.jpg');
new ImageConstructor('Chair', 'img/chair.jpg');
new ImageConstructor('Cthulhu', 'img/cthulhu.jpg');
new ImageConstructor('Dog Duck', 'img/dog_duck.jpg');
new ImageConstructor('Dragon Meat', 'img/dragon_meat.jpg');
new ImageConstructor('Pen', 'img/pen.jpg');
new ImageConstructor('Pet','img/pet.jpg');
new ImageConstructor('R2D2 Bag', 'img/r2d2.jpg');
new ImageConstructor('Rain Boots', 'img/rain_boots.jpg');
new ImageConstructor('Pizza Scissors', 'img/scissors.jpg');
new ImageConstructor('Shark Sleeping Bag', 'img/shark.jpg');
new ImageConstructor('Tauntaun Sleeping Bag', 'img/tauntaun.jpg');
new ImageConstructor('Unicorn', 'img/tauntaun.jpg');
new ImageConstructor('Tentacle USB', 'img/usb.jpg');
new ImageConstructor('Water Can', 'img/usb.jpg');
new ImageConstructor('Wine Glass', 'img/wine_glass.jpg');

function ImageConstructor(imageName, imagePath){
  this.imageName = imageName;
  this.imagePath = imagePath;
  this.imageViews = 0;
  this.clickCounter = 0;
  imageSources.push(this);
  // console.log(this);
}

var currentImg = [];

function randomNumber(){
  return Math.floor(Math.random() * imageSources.length);
}

function chooseImagesToDisplay() {
  var leftPhotoIndex = randomNumber();
  var centerPhotoIndex = randomNumber();
  var rightPhotoIndex = randomNumber();

  while(centerPhotoIndex === leftPhotoIndex){
    centerPhotoIndex = randomNumber();
  }

  while(rightPhotoIndex === leftPhotoIndex){
    rightPhotoIndex = randomNumber();
  }

  while(rightPhotoIndex === centerPhotoIndex){
    rightPhotoIndex = randomNumber();
  }

  var imageIndices = {
    leftPhotoIndex : leftPhotoIndex,
    centerPhotoIndex : centerPhotoIndex,
    rightPhotoIndex : rightPhotoIndex,
  };
  // console.log('imageIndices: ', imageIndices);
  return imageIndices;
}

function createImg(){
  var imageIndices = chooseImagesToDisplay();
  console.log('imageIndices ', imageIndices);

  var leftItem = imageSources[imageIndices.leftPhotoIndex];
  var centerItem = imageSources[imageIndices.centerPhotoIndex];
  var rightItem = imageSources[imageIndices.rightPhotoIndex];

  currentImg = [];
  currentImg.push(leftItem);
  currentImg.push(centerItem);
  currentImg.push(rightItem);

  console.log('currentImg ', currentImg );
  leftPhoto.src = currentImg[0].imagePath;
  centerPhoto.src = currentImg[1].imagePath;
  rightPhoto.src = currentImg[2].imagePath;
}

createImg();

function handleClicks(event){
  console.log('handleClicks', event);

  if(event.target.id === 'surveyUl'){
    alert('You must click on an image.');
    return;
  }

  if (clicker === 25){
    buttonVisiblity.style.visibility = 'visible';
    console.log('this is 25');
    return;
  } else if (event.target.id === 'left_image') {
    currentImg[0].clickCounter += 1;
    clicker += 1;
    console.log(clicker + ' this is the clicker');
    console.log(currentImg[0]);
  }

  if (event.target.id === 'center_image') {
    currentImg[1].clickCounter += 1;
    clicker += 1;
    console.log(clicker + ' this is the clicker');
    console.log(currentImg[1]);
  }

  if (event.target.id === 'right_image'){
    currentImg[2].clickCounter += 1;
    clicker += 1;
    console.log(clicker + ' this is the clicker');
    console.log(currentImg[2]);
  }
  createImg();

};



surveyUl.addEventListener('click', handleClicks);

var printLi = document.getElementById('printLi');

function renderResults() {
  listOfVotes.innerHTML = '';
  for ( var i = 0; i <= 25; i++){
    var listEl = document.createElement('li');
    listEl.textContent = imageSources[i].clickCounter + ' clicks for ' + imageSources[i].imageName;
    listOfVotes.appendChild(listEl);
    console.log(imageSources[i].clickCounter + ' clicks for ' + imageSources[i].imageName);
  }
  return;
}

function createChartArrays(){
  for (var i = 0; i < imageSources.length; i++){
    numOfVotesForChart[i] = imageSources[i].clickCounter;
    labelsForChart[i] = imageSources[i].imageName;
  }
}

printChart.addEventListener('click', createChartArrays);

printLi.addEventListener('click', renderResults);

// Begin code for Chart

var getChart = document.getElementById('voteChart');
// var Chart = require('Chart.js');

function createChart(){
  var voteChart = new Chart(getChart, {
    type: 'Bar',
    data: {
      labels: labelsForChart,
      datasets: [{
        label: 'Number Of Votes',
        data: numOfVotesForChart,
        backgroundColor: 'rgb(255, 199, 132)',
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
};
