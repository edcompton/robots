const {executeAllMoves} = require('./helpers/robotMovement');
const readline = require('readline');

const game = {};

// Function to gather inputs from the command line and execute program on 'run' input
function gatherInputs() {
  game.isLost = false;
  game.finalRobotPositions = [];
  game.lostCoordinates = [];
  game.robotPositions = {};
  const rl = readline.createInterface(process.stdin, process.stdout);
  let counter = 0;

  rl.setPrompt('> ');
  rl.prompt();
  rl.on('line', (line) => {
    // If command has been given to run program
    if (line === 'run') rl.close();

    // If it is the first line of the input, and therefore the grid coordinates
    if (line && counter === 0) {
      const grid = line.split(' ');

      if (grid[0] > 50 || grid[1] > 50) {
        console.log('Each axis value must not be greater than 50');
        rl.prompt();
      } else {
        game.gridCoords = { x: grid[0], y: grid[1] };
        counter++;
      }
    // If the input is instructions
    } else if ((line && /[A-Z]/.test(line.split(' ')[0])) && game.robotPositions[counter]) {
      const instructions = line.split('');

      if (instructions.length > 99) {
        console.log('Robot instructions must be less than 100 characters');
        rl.prompt();
      } else {
        game.robotPositions[counter].instructions = instructions;
        counter++;
      }
    // If the input is robot starting coordinates
    } else if (line && /[0-9]/.test(line.split(' ')[0])) {
      const input = line.split(' ');
      game.robotPositions[counter] = { startingCoord: { x: input[0], y: input[1], direction: input[2] } };

    // No valid input, run again
    } else {
      rl.prompt();
    }

  }).on('close', () => {
    findAndPrintFinalPositions.call(game);
    process.exit(0);
  });
}

function findAndPrintFinalPositions() {
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
