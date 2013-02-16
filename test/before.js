/* Simple test of precompiler */

//========================= INCLUDES ========================

//---------- Wrong include
//→ hello_world.js
//--------------------


//----------- Correct include 1
//→ include1.md
//---------------------------


//------------ Correct include 2
/*inc----------
include2.js
---------*/
//---------------------------


//-------------Correct include 3
/*↓
include2.js
*/
//---------------------------


//-------------Correct include 4
/*include include2.js */
//-------------------------

//------------- Basic case
//→ include2.js //Include header

//==================== EXCLUDES ========================

//-------------------- Correct exclude 1
//✂--------------
Some shit to be cut
var particularlyThis = [1,2,/*don’t mess it up, man */,5];
//-----------------

var thisShouldntBeCut = [1,2,/*don’t mess it up, man */,5];

//----------------------- Correct exclude 2
/*✂-------------------
Another fuck 
multiline shit
desirable to be cut
var cutThis = [1,2,5] //don’t mess it up, man
*/


//------------------------ Correct exclude 3
//cut-----------------
Test if this is deleted 
(wrong syntax, as you can see)
var thisShouldntBeCut = [1,2,/*don’t mess it up, man */,5];
//---------------------


//----------------------- Correct exclude 4
/*exclude
What about this? I want it 
to disappear too
var cutThis = [1,2,5] //don’t mess it up, man
-------------------------*/


//===================== EVALS =======================

/*%
var target = [] 
*/

//%---------
var obj = [1,2,3]
for (var i = obj.length; i--;){
	target.push(i*3)
}
//----------


//= target[1]; //Is everything ok?