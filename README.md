# Homemade.js

Dumb js preprocessor. It can only include, exclude, eval and echo.

#### API

##### Include
```javascript
//→ file.js //file.js will be included instead that string

//↓ file.js

//-> file.js

//inc------------ file.js

//include file.js
```

##### Exclude

```javascript
//✂------ Code below will be cut up to next comment with dashes -------
…somecode…
//----------------

//exclude-------------
…somecode…
//----------------

/*cut--------------
…some comment…
*/
```

##### Eval

Eval works the same way as underscore templates, but shares context between fragments.

```javascript
/*%----------- Code inside of comment will be evaled
var a = 1;
print(a);
---------------*/

//Example:
//eval--------------
var a = [1,2,3];
//--------------

var b = [];

/*%-------------- This will 
for (var i in a) {
	print("b[" + i + "] = " + i*2);
}
-------------*/
```

##### Echo

```javascript
```

#### Use

Homemade may be useful for example when you need to create a bunch of methods for a class, based on model described, not writing them youself. It’s helpful for meta-programming. The other useful case when you need to precalculate some values and you’re lazy to do it manually. It will result faster code than if it is calculated in runtime.
It’s showed twice faster results when lib inits.

#### Grunt
Add `homemade` task and enjoy precompiled code.