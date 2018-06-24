# robots

## Instructions for use

run ```node index.js``` followed by the coordinates, followed by each robot and it's respective instructions, separated by whitespace.

For example:

```node index.js  53 11E RFRFRFRF 32N FRRFLLFFRRFLL 03W LLFFFLFLFL```

```node index.js 1540 1015S RFLRFLFFRF 1232 FFFRRLRFLRF```

## Summary of approach

My plan was to get a working version using the sample inputs first before worrying about the variations of input or output. Once I had a working, object orientated version, I started looking at the possibility of 3 digit or 4 digit coordinates. Having sorted this problem, I then focussed on formatting the output correctly, then refactoring my code to be more modular. My final structure is based around functional programming principles with a global attributes object, used to store references of robot coordinates and final positions. 

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

1. Input: separate and store input strings, execute individually. Bear in mind variation of coordinate input that can take place (b/w 2-4 digits, 3 digits requires some logic)

2. Grid creation: not super difficult but may be worth creating separate visual grid to conceptualise robot routes.

3. Robot movement: Orientation of each robot around the grid.

4. Robot loss: per execution, store any 'losses' off the edge of the grid (object of arrays?) to enable the execution of a check per additional robot move to ensure coordinates and orientation of following robot does not match the fatal coordinates.

5. Final Robot position: store final position in global array.

6. Output: Simple formatted array of final positions per robot execution.

## General approach

1. Work through each of the above problems sequentially. Pseudo code and commit frequently.

2. Create version that works using only the command line, e.g.

- run file,
- provide inputs,
- receive outputs.

Find a method of validating results, in addition to the sample inputs provided.

3. Create error handling once 'perfect' route is established, to account for variation in coordinate input/structure. Test various combinations.

## Considerations

1. Coordinate storing: if the number of coordinates is 3,

- if first number is > 5, x = 1 digit, y = 2 digits.
- If first number is < 5 and second number is > 5, x = 2 y = 1.
- If first number is 5 and second is 0, x = 2, y = 1.  
- If all numbers < 5, not possible to distinguish intentional cut of coordinates, but as playing area is a rectangle not a fatal issue as long as rules are applied consistently when storing robot coords - can assume that x = 2, y = 1.

2. Movement Forward: N = y+1 E = x+1 S = y-1 W = x-1

3. Need to manage lost scenario - use a for loop over map or forEach, so it's possible to break from the loop.

4. Sort input storing - use a global object for the purposes of this exercise.

5. Ensure considerations made for long sequences - something to bear in mind, but shouldn't be an issue with the method considered.
