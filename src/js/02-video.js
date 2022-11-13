'use strict';

console.log(5);

import Player from '@vimeo/player';
var throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LOCALSTORAGE_KEY = 'videoplayer-current-time';

const onPlay = function (event) {
  console.log(event);

  const seconds = event.seconds;
  const secondsToString = JSON.stringify(seconds);
  localStorage.setItem('LOCALSTORAGE_KEY', secondsToString);
};

player.on('timeupdate', throttle(onPlay, 1000));

const getDataStorage = localStorage.getItem('LOCALSTORAGE_KEY');
const DataStorageToNumber = JSON.parse(getDataStorage);
console.log(DataStorageToNumber);

player
  .setCurrentTime(DataStorageToNumber)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
