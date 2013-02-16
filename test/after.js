/* Simple test of precompiler */

//========================= INCLUDES ========================

//---------- Wrong include
//Include failed. File hello_world.js wasn’t found.


//----------- Correct include 1
/*
First text being included.
*/


//------------ Correct include 2
console.log("Include2 ready");
//---------------------------


//-------------Correct include 3
console.log("Include2 ready");
//---------------------------


//-------------Correct include 4
console.log("Include2 ready");
//-------------------------

//------------- Basic case
console.log("Include2 ready");

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