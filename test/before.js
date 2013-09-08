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



//===================== ECHOES

//#put 1+1

//#define TEST=123

;/*#define _v = "ok?"*/;
// #define function x(x){return x*2}

var a = /*#put "'" + TEST + "'" */;

var b = // #put (function(){ return _v})();

//#put x(2) 



		if (to.y !== undefined) this.top = to.y;
		if (to.x !== undefined) this.left = to.x;


//===================== EVALS =======================

//@eval------------
var a = 123;
//@----------------

//@eval
var target = [],
	b = "Final var", c = [];
//@end--


//============================= Templates =================
/*@%
if (a) {
	print("var b = " + a*10);
}
@*/

/*@tpl---------
var obj = [1,2,3];
for (var i = obj.length; i--;){
	target.push(i*3)
}
----------*/

/*@template
for (var i = target.length; i--;){
	print("c[" + i + "] = " + target[i] + ";")
}
*/

//Insert target 1
//@%= "target = " + target[1] + 5 //Is everything ok?

/*@%
 print("var c =" + a );
*/