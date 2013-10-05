# Homemade.js
Cozy JS preprocessor with C-preprocessor-like syntax. `Include`, `exclude`, `define`, `put`, conditions.

## Use
`node homemade.js path/to/source.js path/to/destination.js`

### API

Compliable with [preprocessor.js](https://github.com/dcodeIO/Preprocessor.js) and more.

#### `exclude`
Removes code from result
```js
	//#exclude
	console.log(a, b, c)
	//#end
```

#### `include`
Inserts files recursive way

Source:
```js
	//#include c.js
```

`c.js`:
```js
	//#include a.js
	//#include b.js
```

Result:
```
	//> a.js
	//> b.js
```

#### `define`
Defines variable to use in preprocessor.
```js
	//#define PI = 3.14
	//#define RAD2DEG = function(rad){ return rad * 180/PI }
```

#### `put`
Places result of some code.
```js
	/*#put RAD2DEG(3)*/
	/*#put "'" + TEST + "'" */
	//#put (function(){ return "Some_result"})()
```

#### Conditions: `if`, `ifdef`, `ifndef`, `elif`, `else`
Chooses clause according to the condition
```js
//#if DEV
	var name = "devil"
//#elif PROD
	var name = "angel"
//#elif name
	/* #put "var name = '" + name + "'" */
//#else
	var name = "noname"
//#endif
```

See [test/before.js](https://github.com/dfcreative/homemade/blob/master/test/before.js) for more examples.

## Use cases 
#### jQuery/Zepto/vanilla plugin using `build.js`
```js
//build.js
(function($){
	//#ifndef pluginName
		var pluginName = "awesomePlugin"
	//#else
		/* #put "var pluginName = '" + pluginName + "'" */
	//#endif

	//#include "../src/utils.js"
	//#include "../src/plugin-vanilla.js"
	
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

*Hint*: hook up [grunt-homemade](https://github.com/dfcreative/grunt-homemade) task and build with no pain.

## Application
* Build jquery-plugins, components, wrappers, AMD modules etc. easier and more clear way than concat
* Precalculate some values. It may result in faster code than if it is calculated runtime.
* Code-generation
* Escaping console in build like `/*#exclude*/console.log(dev_info)/*#end*/`

## Projects use homemade
* [sticky-js](https://github.com/dfcreative/sticky)
* [slide-area](https://github.com/dfcreative/slide-area)

## Note
This plugin was created as fast replacement to preprocessor.js, preprocess.js etc, due to absence of necessary building features, like define, put etc. It is full of flaws:

* Insecure - context is defined in global scope, evaluating code has acces to the node environment, some variable names may interfere with environment, and nobody knows what to do.
* Extremely feckless in debugging own bugs.
* Cannot handle nested conditions.
* Catches only simple kinds of errors.
* Does not checks syntax, it’s all due to author not to make mistakes.
* Doomed to be replaced in future with a better preprocessor.

But it perfectly serves main purposes. That is why it’s called _homemade_.

## License
Copyright Dmitry Ivanov.

Written by Dmitry Ivanov.

Licensed under the MIT license.