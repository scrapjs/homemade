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
//#define DEBUG = true
//#define name = "Hello world"
```

Defined variables can be used later in `#put` or `#if`s.

### `#put` — places variables or evals code passed

Source:
```js
/*#put "var projectName = '" + name + "'" */
```

Result:
```js
var projectName = 'Hello world'
```

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
		/* #put "var pluginName = '" + pluginName + "'" */
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
* Helpless in detecting syntax errors.
* Can not handle nested conditions (fortunately, do not need to).

But it is well-proven and battle-tested in real projects.


## Projects which use _homemade_
* [sticky-js](https://github.com/dfcreative/sticky)
* [imagine-js](https://github.com/dfcreative/imagine)

## License
Copyright Dmitry Ivanov.
Written by Dmitry Ivanov.
Licensed under the MIT license.
