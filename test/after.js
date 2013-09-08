/* Simple test of precompiler */



//========================= INCLUDES ========================
//---------- Wrong include
//HOMEMADE ERROR: Include failed. Can’t find "hello_world.js"
//--------------------



//----------- Correct include 1
/*
First text being included.
*/




//------------ Correct include 2
console.log("Include2 ready some");


//------------- Recursive include
//should include1 & include2 below
/*
First text being included.
*/
console.log("Include2 ready some");



//===================== ECHOES

2



;;


var a = '123';

var b = ok?

4



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