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

//==================== EXCLUDES ========================

//-------------------- Correct exclude 1


var thisShouldntBeCut = [1,2,/*don’t mess it up, man */,5];

//----------------------- Correct exclude 2



//------------------------ Correct exclude 3



//----------------------- Correct exclude 4



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