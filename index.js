const game = {};

// First off, initialise the exercise by grabbing the inputs given on the command line and storing them in variables for later.
game.initialise = function() {
  game.isLost = false;
  // Store the arguments from the command line in variables to be passed to setup functions in due course. Convert gridSize to an integer for ease of later board creation (if visualising).
  game.gridCoords = game.setCoordinates(process.argv.slice(2, 3)[0]);

  game.inputs = process.argv.slice(3, process.argv.length);

  console.log(game.gridCoords);
  console.log(game.inputs);
};
