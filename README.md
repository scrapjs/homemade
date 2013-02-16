# Homemade.js
Dumb js preprocessor. It can only include, exclude, eval and echo.

## API
```javascript
//Include
//→ file.js

//Exclude
//✂-------------
var a = "Some stub",
	b = "Some other stub";
//----------------

//Eval (make context for templates)
//eval
var a = 1;
//------------

//Template
/*%
if (a) {
	print("var b = " + a*10);
}
*/

//Echo
//%= a + 5
```

## Nice use cases

* Create API methods for the class or even classes itself, based on some model (Meta-programming). Demo [Color.js in Graphics](https://github.com/dfcreative/graphics/blob/master/src/Color.js).
* Precalculate some values. It will result in faster code than if it is calculated in runtime.
* Any kinds of code-generation

## Grunt
Add `homemade` task and enjoy precompiled code.