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
  'eval' : /(?:(?:\/\/|\/\*)(?:eval)[ -]*[\s]+((?:(?:.|\s)(?![\n\r]-*\*\/|\/\/-+))*(?:.|\s))(?:[\n\r]-*\*\/|\/\/-+))+/igm,
  'template' : /(?:(?:\/\/|\/\*)(?:template|tpl|%)[ -]*[\s]+((?:(?:.|\s)(?![\n\r]-*\*\/|\/\/-+))*(?:.|\s))(?:[\n\r]-*\*\/|\/\/-+))+/igm,
  'echo' : /(?:\/\/|\/\*)(?:%=|echo|print)[ -]*\s+([^\/\*\r\n]+)\s*(?:-*\*\/$|$|\/\/.*$)/igm
}

//Some necessities for API
global.tplResult = "";
global.print = function (str) {
    if (!tplResult) tplResult = str;
    else tplResult += "\n" + str;
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
  });
  
  rv = rv.replace(re['eval'],function(match,code) {
    eval.call(global,code);
    return match
  });

  rv = rv.replace(re['template'],function(match,code) {
    //console.log("//--------TPL CODE")
    //console.log(code)
    tplResult = "";
    eval.call(global,code);
    //console.log(tplResult)
    return tplResult
  });

  rv = rv.replace(re['echo'],function(match,target){
    tplResult = "";
    eval.call(global,"print(" + target + ");");
    return tplResult;
  });

  rv = rv.replace(re['exclude'],"");

  return rv;
}


//---------------CLI
//console.log(process.argv)
var args = process.argv.slice(2);
handleFile(args[0], args[1], args[2], function (status, data) {console.log("ok")})
  
