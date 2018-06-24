const {executeAllMoves} = require('./helpers/robotMovement');
const readline = require('readline');

const game = {};

game.isLost = false;
game.finalRobotPositions = [];
game.lostCoordinates = [];
game.robotPositions = {};

function gatherInputs() {
  var rl = readline.createInterface(process.stdin, process.stdout);
  let counter = 0;
  rl.setPrompt('> ');
  rl.prompt();

  rl.on('line', (line) => {

    if (line === 'run') {
      findFinalPositions.call(game);
      process.exit(0);
    } else if (line && counter === 0) {
      counter++;
      const grid = line.split(' ');
      game.gridCoords = { x: grid[0], y: grid[1] };

    } else if (line && !line.match(/[0-9]/)) {
      game.robotPositions[counter].instructions = line.split('');
      counter++;

    } else if (line) {
      const input = line.split(' ');
      game.robotPositions[counter] = {
        startingCoord: {
          x: parseInt(input[0]),
          y: parseInt(input[1]),
          direction: input[2]
        }
      };
    }

    rl.prompt();
  });
}

function findFinalPositions() {
  Object.keys(this.robotPositions).forEach((num) => {
    // Create consts for ease of reading
    const startingCoord = this.robotPositions[num].startingCoord;
    const instructions = this.robotPositions[num].instructions;

    this.finalRobotPositions.push(executeAllMoves.call(this, startingCoord, instructions));
  });
  // Print the final results
  console.log(`\nPOSITIONS:\n${this.finalRobotPositions.join('\n')}`);
}

// Run the program
gatherInputs();
