/* Simple test of precompiler */

//#define SOME="some"

//========================= INCLUDES ========================
//---------- Wrong include
//#include hello_world.js
//--------------------

//----------- Correct include 1
//#include ./incs/include1.md


//------------ Correct include 2
/*#include "incs/include2.js"*/


//------------- Recursive include
// #include incs/include3.js //Include header



//===================== ECHOES ================
//#put 1+1

//#define TEST=123

;/*#define _v = "ok?"*/;
// #define function x(x){return x*2}

var a = /*#put "'" + TEST + "'" */;

var b = // #put (function(){ return _v})();

//#put x(2) 

//test undefineds not to be removed
if (to.y !== undefined) this.top = to.y;
if (to.x !== undefined) this.left = to.x;


//===================== Conditions =======================
//#define yep = true

//---------Ifdef test
/*#ifdef yep*/
	//#put "1st condition (correct)"
/*#endif*/


//-----------Ifndef test
//#ifndef yep
	//#put "1st condition (incorrect)"
//#elif yep==false
	//#put "2nd condition (incorrect)"
//#elif yep===false
	3rd condition (incorrect)
//#else
4th condition (correct)
//#endif


//------------Evaluable condition
/*#if true == false*/1 (incorrect)/*#elif true*/2 (correct)/*#else*/3 (incorrect)/*#endif*/


//-------------Elifs
//#if yep == false
	//#put "Wrong condition"
//#elif false
	2 (incorrect)
//#elif false
	3 (incorrect)
//#elif false
	4 (incorrect)
//#elif yep == true
	//#put yep + ": 5 (correct)"
//#elif false
	//#put "6 Incorrect condition"
//#else
	//#put "7 Incorrect condition"
//#endif