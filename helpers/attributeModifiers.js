
// Format the string response to account for whether a leading zero is required or if the robot is lost
function formatResponse(coords, lost) {
  let { x, y } = coords;
  const { direction } = coords;
  let returnString = '';

  // Game grid has four coordinates
  if (this.fourDigitCoords) {
    if (x.toString().length === 1) x = `0${x}`;
    if (y.toString().length === 1) y = `0${y}`;

  // Account for the two variations in a three coordinate grid input
  } else if (this.threeDigitCoords && this.yTwoDigits) {
    if (y.toString().length === 1) y = `0${y}`;
  } else if (this.threeDigitCoords && !this.yTwoDigits) {
    if (x.toString().length === 1) y = `0${y}`;
  }
  // The robot is lost
  if (lost) {
    returnString = `${x}${y}${direction}LOST`;
    this.isLost = false;
  // Normal position return
  } else {
    returnString = `${x}${y}${direction}`;
  }
  return returnString;
}

function lostChecker(coords, axisIncrement) {
  return coords[axisIncrement] > this.gridCoords[axisIncrement] || coords[axisIncrement] < 0
    ? true
    : false;
}

module.exports = {
  lostChecker,
  formatResponse
};
