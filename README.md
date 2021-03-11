# Space_Invader_Game

Summary of methods
The game is ran on the basis of using css transform and translate. 
When the images are created, a X and Y coordinates is recorded onto the screen.
For ammos, they are created and store in an array and translate onto the background.
Once translated, y coordinates are change according to the delta time and thus they can move
For the player movement, it make use of having the keycode matching and once match, the movement will be updated onto the background
The boundary setting is set up to prevent movement out of a certain area such that if it wants to go beyond a certain X or Y axis, a new X or Y coordinate is given
Ammos touching the player or enemy are based on collision testing 

Approach
The approach of the game is first thinking of ways to move the player, followed by a standard way of having enemies to appear on the screen. 
When moving the player and shooting the ammo, there is no cooldown and need to research on how to apply delta time onto this with the css transform.
Next, adding of enemies is just making use of calculation of padding. Adding of enemy ammo has the same basis of player ammo.

Installation
Arrow keys to move
X to shoot special ammo, has a longer cooldown
Space to shoot, shorter cooldown

Future developmemt
Pausing the whole animation when pause is press
Fix the resolution for all screen types
Increase pattern of enemies ammo
 
