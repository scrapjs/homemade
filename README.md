# Homemade.js

Dumb js preprocessor. It can only include, exclude, eval and echo.

## API

Guess what:
```javascript
//→ file.js

//✂-------------
var a = "Some stub",
	b = "Some other stub";
//----------------

/*%-----------
var a = 1;
---------------*/

//%= a
```

Hint:
```javascript
//%--------------
var a = [1,2,3];
//--------------

var b = [];

/*%--------------
for (var i in a) {
	print("b[" + i + "] = " + i*2);
}
-------------*/
```

## Nice use cases

* Create API methods for the class or even classes itself, based on some model of data (Meta-programming). Demo [Color.js in Graphics](https://github.com/dfcreative/graphics/blob/master/src/Color.js).
* Precalculate some values. It will result in faster code than if it is calculated in runtime.
* Any kinds of code-generation

## Grunt
Add `homemade` task and enjoy precompiled code.