//# exclude
This has to be excluded
//# end
/* Simple test of precompiler */
a
//#define SOME="some"
b
//========================= INCLUDES ========================
//---------- Wrong include
//#include hello_world.js
//--------------------
c
//----------- Correct include 1
//#include ./incs/include1.md
d
e
//------------ Correct include 2
/*#include "incs/include2.js"*/
f
g
//------------- Recursive include
// #include incs/include3.js //Include header
h
i
j
//===================== ECHOES ================
//#put 1+1
k
//#define TEST=123
l
;/*#define _v = "ok?"*/;
// #define function x(x){return x*2}
m
var a = /*#put "'" + TEST + "'" */;
n
var b = // #put (function(){ return _v})();
o
//#put x(2) 
p
//test undefineds not to be removed
if (to.y !== undefined) this.top = to.y;
if (to.x !== undefined) this.left = to.x;
q
r
//#put [1,2,3,4,5]
//#put {a:1, b:2, c:3}
//#put function(){return 1}
//===================== Conditions =======================
//#define yep = true
s
//---------Ifdef test
/*#ifdef yep*/
t	//#put "1st condition (correct)"
/*#endif*/
u
v
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
w
x
//------------Evaluable condition
/*#if true == false*/1 (incorrect)/*#elif true*/2 (correct)/*#else*/3 (incorrect)/*#endif*/
y
z
//-------------Elifs
//# if yep == false
	//#put "Wrong condition"
//# elif false
	2 (incorrect)
//# elif false
	3 (incorrect)
//#elif false
	4 (incorrect)
//# elif yep == true
	//#put yep + ": 5 (correct)"
//# elif false
	//#put "6 Incorrect condition"
//#else
	//#put "7 Incorrect condition"
//#endif
//-------------excludes
//#exclude 
exclude1
//#end 
/*# exclude*/exclude2/*#endexclude */Excludes ok