/*
homemade.js is stupid preprocessor
 */

/*jshint node:true*/

//TODO: make echo
//TODO: make echo inside eval

'use strict';

//exports.homemade = preprocess;

var path  = require('path'),
    fs    = require('fs');


exports.handle         = handle;
exports.handleFile     = handleFile;

var re = {
  'include' : /(?:\/\/|\/\*)(?:→|↓|->|include|inc)[ ->]*\s+([^\/\*\s]+)\s*(?:-*\*\/$|$|\/\/.*$)/igm,
  'exclude' : /((?:\/\/|\/\*)(?:✂|exclude|cut)[ -]*[\n\r](?:(?:.|\s)(?![\n\r]-*\*\/|\/\/-+))*(?:.|\s)(?:[\n\r]-*\*\/|\/\/-+))+/ig,
  'eval' : /(?:(?:\/\/|\/\*)(?:eval|%)[ -]*[\s]+((?:(?:.|\s)(?![\n\r]-*\*\/|\/\/-+))*(?:.|\s))(?:[\n\r]-*\*\/|\/\/-+))+/igm,
  'echo' : /(?:\/\/|\/\*)(?:=|echo|print)[ -]*\s+([^\s]+)\s*(?:-*\*\/|$)/ig
}

//For evaling
global.evalResult = "";
global.print = function (str) {
    evalResult += "\n" + str;
}

//Main handlr
function handleFile(src, dest, context, callback) {
  context = context || {};
  context.src = src;
  context.srcDir = path.dirname(src);

  fs.readFile(src,function(err,data){
    if (err) return console.log("Error: " + err)
    fs.writeFile(dest, handle(data, context), callback);
  });
}

function handle(src,context) {
  src = src.toString();
  
  var rv = src;

  rv = rv.replace(re['include'],function(match,file){
    file = (file || '').trim();
    try {
      var includedSource = fs.readFileSync(path.join(context.srcDir,file));
      return includedSource || '//Include failed. File ' + file + ' wasn’t found.';
    } catch (e) {
      return '//Include failed. File ' + file + ' wasn’t found.'
    }
  })

  rv = rv.replace(re['exclude'],"");
  
  rv = rv.replace(re['eval'],function(match,code) {
    //console.log("//--------EVAL CODE")
    //console.log(code)
    evalResult = "";
    eval.call(global,code);
    //console.log(evalResult)
    return evalResult
  });

  /*rv = rv.replace(commands['print'].re,function(match,variable) {
    return context[(variable || '').trim()];
  });*/

  return rv;
}


//---------------CLI
//console.log(process.argv)
var args = process.argv.slice(2);
handleFile(args[0], args[1], args[2], function (status, data) {console.log("ok")})
  
