# robots

## Instructions for use

1. Clone the repository
2. In the command line, run ```node index.js```
3. Enter grid coordinates
4. For each robot, enter the starting coordinates on one line, followed by the instructions on the next line
5. Type ```run``` and press enter to receive outputs

## Summary of approach

This is a simple node.js command line program without a JS framework.


My plan was to get a working version using the sample inputs first before worrying about the variations of input or output. Having sorted this problem, I then focused on formatting the output correctly, then refactoring my code to be more modular. Once I had a version working via command entry all on a single line, I then refactored my code to allow for multi-line input into the terminal. This enabled me to massively simplify and refactor my code.


My final structure is based around functional programming principles with a global attributes object, used to store references of robot coordinates and final positions. Total exercise took about 3 to 4 hours across the weekend.

## Instructions Interpretation

1. Square grid that robots can move around

2. Each robot positioned by x/y coordinates and an orientation NESW (direction they're facing)

3. Can provide instructions for Left, Right, Forward currently

4. Need to provide provision for additional commands (scalable code where commands can be added - switch statement)

5. Rectangular grid has bounds on each edge, so a robot can fall off, leaving a 'scent' preventing further robots from falling off at that point. This is the last grid square and last direction of travel that caused the robot to fall of the edge - essentially an array of commands that can't be executed on that grid square in relation to robot orientation and coordinates.

6. The first line of input is the upper right coordinates in x/y format, which dictate the size of the rectangular playing area, building from 0,0 in the bottom left.

7. Input per robot is starting coordinates and orientation, followed by their routing instructions - separated by whitespace.

8. Output is the final position of the robot. If the robot falls of the edge, it's the final coordinate and orientation followed by LOST (logged to prevent following robots falling off)

## Main problems

1. Input: separate and store input strings, execute individually.

2. Grid creation: not super difficult but may be worth creating separate visual grid to conceptualise robot routes.

3. Robot movement: Orientation of each robot around the grid.

4. Robot loss: per execution, store any 'losses' off the edge of the grid (object of arrays?) to enable the execution of a check per additional robot move to ensure coordinates and orientation of following robot does not match the fatal coordinates.

5. Final Robot position: store final position in global array.

6. Output: Simple formatted array of final positions per robot execution.


## Considerations

1. Movement Forward: N = y+1 E = x+1 S = y-1 W = x-1

2. Need to manage lost scenario - use a for loop over map or forEach, so it's possible to break from the loop.

3. Sort input storing - use a global object for the purposes of this exercise.

4. Ensure error handling for long sequences - something to bear in mind, but shouldn't be an issue with the method considered.
