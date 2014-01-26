# ![homemade.js](https://raw.github.com/dfcreative/homemade/master/homemade.png) Homemade.js
Cozy C-like preprocessor. Implements `include`, `exclude`, `define`, `put`, `if`, `elif`, `ifdef`.

#### a. Use in console
`node homemade.js path/to/source.js path/to/destination.js`

#### b. Use with grunt ★
See [grunt-homemade](https://github.com/dfcreative/grunt-homemade) task.


## API

Fully compatible with [preprocessor.js](https://github.com/dcodeIO/Preprocessor.js) syntax.

### `#exclude` — removes fragments of code

Source:
```js
//#exclude
console.log(a, b, c)
//#end
```

Result:
```js
```

Useful when you want to remove supporting code from the build, like helper functions etc.

### `#include` — inserts file

Source:
```js
//#include ./c.js
```

`c.js`:
```js
Hello world!
```

Result:
```
Hello world!
```

Files are inserted in a recursive way, so that inserted files will be handled also.
The current directory `.` is taken one of the current file. The current file is that where the current `#inline` directive is.

### `#define` — defines variable to use in preprocessor

Source:
```js
//#define name = "Hello world"
//#define dictToArray = function(dict){ var result = []; for (var key in dict){ result.push(key + " " + dict[key]) }; return result; }
```

Defined variables can be used later in `#put` or `#if`s.

### `#put` — places variable source (uses [tosource](https://github.com/marcello3d/node-tosource) for serialization)

Source:
```js
var projectName = //#put name
//#define a = {a:1, b:2, c:3}
//#put a;
//#put dictToArray(a);
//#put `var a = ` + projectName + `;`
```

Result:
```js
var projectName = 'Hello world'
{a:1, b:2, c:3}
["a 1", "b 2", "c 3"]
```

To output raw code, use markdown inline code notation, like `\`raw code\` + variable`

### `#if`, `#ifdef`, `#ifndef`, `#elif`, `#else`

Source:
```js
//#if DEV
	console.log("debug:", result)
//#else
	//#put "var projectName = '" + name + "'"
//#endif
```

Result with `DEV === true`:
```js
	console.log("debug:", result)
```

Result with `DEV === false`:
```js
	var projectName = 'Hello world'
```

For more examples see [test/before.js](https://github.com/dfcreative/homemade/blob/master/test/before.js).

## jQuery/Zepto/vanilla plugin boilerplate

`build.js`:
```js
(function($){
	//#ifndef pluginName
		var pluginName = "awesomePlugin"
	//#else
		/* #put `var pluginName = ` + pluginName */
	//#endif

	//#include "../src/utils.js"
	//#include "../src/AwesomePlugin.js"

	//jquery-plugin
	if ($){
		$['fn'][pluginName] = function (arg) {
			return this['each'](function(i,e){
				var $e = $(e);
				var instance = new AwesomePlugin($e[0], arg);
				$e.data(pluginName, instance);
			})
		};
	} else {
		window[pluginName] = AwesomePlugin;
	}
})(window['jQuery'] || window['Zepto']);
```

## Motivation
This plugin was created as a fast replacement to [preprocessor.js](https://github.com/dcodeIO/Preprocessor.js) and alike, due to lack of necessary building features in them on that moment, like `define`, `put` etc.

For now *homemade* has some flaws:

* Insecure − context is defined in global scope, so that you have to beware of variable names in `#define`
* Nested conditions are not supported
* No decent syntax errors detection


## Projects which use _homemade_
* [sticky-js](https://github.com/dfcreative/sticky)
* [imagine-js](https://github.com/dfcreative/imagine)
* [rus-js](https://github.com/dfcreative/rus)

## License
Copyright Dmitry Ivanov.
Written by Dmitry Ivanov.
Licensed under the MIT license.
