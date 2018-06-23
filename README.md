# robots

###Instructions Breakdown

1. Square grid that robots can move around

2. Each robot orientated by x/y coordinates and an orientation NESW (direction they're facing)

3. Can provide instructions for Left, Right, Forward

4. Need to provide provision for additional commands (scalable code where commands can be added)

5. Rectangular grid has bounds on each edge, so a robot can fall off, leaving a 'scent' preventing further robots from falling off at that point. This is the last grid square and last direction of travel that caused the robot to fall of the edge - essentially an array of commands that can't be executed on that grid square in relation to robot orientation.

6. The first line of input is the upper right coordinates, which dictate the size of the rectangular playing area, building from 0,0 in the bottom left.

7. Input per robot is starting coordinates and orientation, followed by their routing instructions. Separated by whitespace over two lines.

8. Output is the final position of the robot. If the robot falls of the edge, it's the final coordinate and orientation followed by LOST (logged to prevent following robots falling off)

###Main problems

1. Input: separate and store input strings, execute individually. Bear in mind variation of coordinate input that can take place (b/w 2-4 digits, 3 digits requires some logic)

2. Grid creation: not super difficult but may be worth creating separate visual grid to conceptualise robot routes.

3. Robot movement: Orientation of each robot around the grid.

4. Robot loss: per execution, store any 'losses' off the edge of the grid (object of arrays?) to enable the execution of a check per additional robot move to ensure coordinates and orientation of following robot does not match the fatal coordinates.

5. Final Robot position: store final position in global array.

6. Output: Simple formatted array of final positions per robot execution.

###General approach

1. Work through each of the above problems sequentially. Pseudo code and commit frequently.

2. Initially create version that works using only the command line, e.g.

- run file,
- provide inputs,
- receive outputs.

Find a method of validating results, in addition to the sample inputs provided.

3. Create error handling once 'perfect' route is established, to account for potential user error.

4. If time, create visual representation of grid using basic html / css setup, with static moving robots.

5. If loads of time, make it jazzy and give it some animations.

##Considerations

1. Coordinate storing: if the number of coordinates is 3,

- if first number is > 5, x = 1 digit, y = 2 digits.
- If first number is < 5 and second number is > 5, x = 2 y = 1.
- If first number is 5 and second is 0, x = 2, y = 1.  
- If all numbers < 5, not possible to distinguish intentional cut of coordinates, but as playing area is a rectangle not a fatal issue as long as rules are applied consistently when storing robot coords - can assume that x = 1, y = 2.

2. Movement Forward: N = y+1 E = x+1 S = y-1 W = x-1

3. Need to manage lost scenario - use for loop over map or forEach so it's possible to break from the loop.

4. Sort input storing - use a global object for the purposes of this exercise.

5. Ensure considerations made for long sequences - something to bear in mind, but shouldn't be an issue with the method considered.

● We don’t expect you to spend more than 2-3 hours on this challenge
● If you don’t have time to fully complete the challenge, please still send it in and
indicate what your next steps would be. Remember to try to solve the hardest
problems first.
● Use any language and frameworks you want
● KISS - Keep it Simple Stupid.
● User interface design is not the main focus of the problem
● Put your code on a public source repository (such as GitHub) and give us the URL
● Please submit your commit history, we are interested to see how you approach the
challenge and how you verify the validity of your solution.
● We should be able to run your code without any crazy steps
● Secret tip: Make use of the sample data ;)

Problem: Martian Robots

The Problem

The surface of Mars can be modelled by a rectangular grid around which robots are able to move according to instructions provided from Earth. You are to write a program that determines each sequence of robot positions and reports the final position of the robot.
A robot position consists of a grid coordinate (a pair of integers: x-coordinate followed by y-coordinate) and an orientation (N, S, E, W for north, south, east, and west).
A robot instruction is a string of the letters “L”, “R”, and “F” which represent, respectively, the instructions:
● Left : the robot turns left 90 degrees and remains on the current grid point.
● Right : the robot turns right 90 degrees and remains on the current grid point.
● Forward : the robot moves forward one grid point in the direction of the current
orientation and maintains the same orientation.
The direction North corresponds to the direction from grid point (x, y) to grid point (x, y+1).

There is also a possibility that additional command types may be required in the future and provision should be made for this.
Since the grid is rectangular and bounded (...yes Mars is a strange planet), a robot that moves “off” an edge of the grid is lost forever. However, lost robots leave a robot “scent” that prohibits future robots from dropping off the world at the same grid point. The scent is left at the last grid position the robot occupied before disappearing over the edge. An instruction to move “off” the world from a grid point from which a robot has been previously lost is simply ignored by the current robot.

The Input
The first line of input is the upper-right coordinates of the rectangular world, the lower-left coordinates are assumed to be 0, 0.
The remaining input consists of a sequence of robot positions and instructions (two lines per robot). A position consists of two integers specifying the initial coordinates of the robot and an orientation (N, S, E, W), all separated by whitespace on one line. A robot instruction is a string of the letters “L”, “R”, and “F” on one line.
Each robot is processed sequentially, i.e., finishes executing the robot instructions before the next robot begins execution.
The maximum value for any coordinate is 50.
All instruction strings will be less than 100 characters in length.
The Output
For each robot position/instruction in the input, the output should indicate the final grid position and orientation of the robot. If a robot falls off the edge of the grid the word “LOST” should be printed after the position and orientation.
Sample Input
53
11E RFRFRFRF
32N FRRFLLFFRRFLL
03W LLFFFLFLFL
Sample Output
11E
33NLOST 23S
