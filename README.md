# Homemade.js
Micro js preprocessor. It can only include, exclude, eval, template and echo.

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

* Include synonyms: `//include file.js`, `//inc file.js`, `//↓ file.js`, `//-> file.js`, `//> file.js`
* Exclude synonims: `//exclude---`, `//cut------`
* Template synonims: `//tpl---`, `//template------`
* Use (windows typographics keys)[https://github.com/dfcreative/windows_typographic_hotkeys] to insert special symbols easily (Just type `[cut]`, or `Alt+→`).

## Use
You can make precompilation either from terminal or as grunt-task.

### 1. CLI
Just call `node homemade.js path/to/source.js path/to/destination.js`

### 2. Grunt-task
Add this line to your project's Gruntfile:
```javascript
grunt.loadNpmTasks('homemade');
```

Add gruntfile config, like this:
```js
homemade: {
  js: {
    'test/after.js' : 'test/before.js',
    'test/after-2.js' : 'test/before-2.js',
    context: {
      dev: true
    }
  },

  otherJs: {
        '<%= concat.dist.dest %>' : '<config:concat.dist.dest>'
	}
}
```

Add `homemade` task and enjoy precompiled code.

## Use cases

* Create API methods for the class or even classes itself, based on some model (Meta-programming). Demo [Color.js in Graphics](https://github.com/dfcreative/graphics/blob/master/src/Color.js).
* Precalculate some values. It will result in faster code than if it is calculated in runtime.
* Any kinds of code-generation


## License
Copyright Dmitry Ivanov.

Written by Dmitry Ivanov.

Inspired by [Jarrod Overson’s preprocessor](https://github.com/onehealth/preprocess).

Licensed under the MIT license.

## TODO
* Ifdefs? Now it can be easily done through eval or template