# Space_Invader_Game

The game is ran on the basis of using css transform and translate. 
When the images are created, a X and Y coordinates is recorded onto the screen.
For ammos, they are created and store in an array and translate onto the background.
Once translated, y coordinates are change according to the delta time and thus they can move
For the player movement, it make use of having the keycode matching and once match, the movement will be updated onto the background
The boundary setting is set up to prevent movement out of a certain area such that if it wants to go beyond a certain X or Y axis, a new X or Y coordinate is given
Ammos touching the player or enemy are based on collision testing 