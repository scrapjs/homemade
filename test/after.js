/* Simple test of precompiler */

//========================= INCLUDES ========================
//---------- Wrong include
//Include failed. File hello_world.js wasn’t found.
//--------------------



//----------- Correct include 1
/*
First text being included.
*/




//------------ Correct include 2
console.log("Include2 ready");


//------------- Basic case
//Include failed. File include2.js wasn’t found.



//===================== ECHOES

2



;;


var a = '123';

var b = ok?

4





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