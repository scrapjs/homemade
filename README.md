# Homemade.js
Micro JS preprocessor with C-preprocessor-like syntax. Include, define, put, conditions.

## API
Compliable with [preprocessor.js](https://github.com/dcodeIO/Preprocessor.js) and more.
See [test/before.js](https://github.com/dfcreative/homemade/blob/master/test/before.js) for examples of use.

## Use
`node homemade.js path/to/source.js path/to/destination.js`

## Application
* Build jquery-plugins, components, wrappers, AMD modules etc. easier and more clear way than concat
* Precalculate some values. It may result in faster code than if it is calculated runtime.
* Code-generation
* Escaping console in build like `/*#exclude*/console.log(dev_info)/*#endexclude*/`

## Note
This plugin was created as fast replacement to preprocessor.js, preprocess.js etc, due to absence of necessary building features, like define, put etc. It is full of flaws:

* Insecure - context is defined in global scope, evaluating code has acces to the node environment, some variable names may interfere with environment, and nobody know what to do
* Extremely feckless in debugging own bugs.
* Cannot handle nested conditions.
* Catches only simple kinds of errors.
* Does not checks syntax, it’s all due to the author not to make mistakes
* Doomed to be replaced in future with a better preprocessor.

But it perfectly serves main purposes. That is why it’s called homemade.

## License
Copyright Dmitry Ivanov.

Written by Dmitry Ivanov.

Licensed under the MIT license.