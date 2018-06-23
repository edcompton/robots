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

- run file + provide inputs,
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

Sample Input
53
11E RFRFRFRF
32N FRRFLLFFRRFLL
03W LLFFFLFLFL

Sample Output
11E
33NLOST 23S
