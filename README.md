# Homemade.js
C-like javascript preprocessor & grunt task. Include, define, put, conditions.

## API
Fully compliable with preprocessor.js and more.
```javascript
//#include ./inc/file.js

//#define TEST=123

var a = /*#put "'" + TEST + "'" */;

```

## Use: CLI
`node homemade.js path/to/source.js path/to/destination.js`

## Use: Grunt-task
Gruntfile.js
```javascript
//config
...
homemade: {
	js: {
		src: 'build/build.jquery.js',
		dest: 'jquery.<%= pkg.name %>.js',
		context: {
			pluginName: "<%= pkg.name %>"
		}
	},

	otherJs: {
		src: '<config:concat.dist.dest>',
		dest: '<%= concat.dist.dest %>'
	}
}
...

grunt.loadNpmTasks('homemade');
//Add "homemade" task
```

## Use cases

* Build jquery-plugins, components, wrappers, amd modules etc. easier and more clear way than concat
* Precalculate some values. It may result in faster code than if it is calculated runtime.
* Code-generation


## License
Copyright Dmitry Ivanov.

Written by Dmitry Ivanov.

Inspired by [Jarrod Overson’s preprocessor](https://github.com/onehealth/preprocess).

Licensed under the MIT license.