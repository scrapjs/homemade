/*
Home-made.js is stupid preprocessor
 */

/*jshint node:true*/

'use strict';

//exports.homemade = preprocess;

var path  = require('path'),
    fs    = require('fs'),
    _     = require('lodash'),
    delim = require('./regexrules');

function handleFile(src, dest, context, callback) {
  context.src = src;
  context.srcDir = path.dirname(src);

  fs.readFile(src,function(err,data){
    if (err) return callback(err,data);
    fs.writeFile(dest, handle(data, context), callback);
  });
}

function handle(src,context) {
  src = src.toString();
  context = context || process.env;
  
  var rv = src;

  rv = rv.replace(getRegex(type,'include'),function(match,file,include){
    file = (file || '').trim();
    var includedSource = fs.readFileSync(path.join(context.srcDir,file));
    return includedSource || match + ' not found';
  })

  rv = rv.replace(getRegex(type,'exclude'),function(match,test,include){
    return testPasses(test,context) ? '' : include;
  })

  rv = rv.replace(getRegex(type,'ifdef'),function(match,test,include){
    test = (test || '').trim();
    return typeof context[test] !== 'undefined' ? include : '';
  })

  rv = rv.replace(getRegex(type,'ifndef'),function(match,test,include){
    test = (test || '').trim();
    return typeof context[test] === 'undefined' ? include : '';
  })

  rv = rv.replace(getRegex(type,'if'),function(match,test,include){
    return testPasses(test,context) ? include : '';
  })

  rv = rv.replace(getRegex(type,'echo'),function(match,variable) {
    return context[(variable || '').trim()];
  });

  return rv;
}

function getRegex(type, def) {

  var isRegex = typeof delim[type][def] === 'string' || delim[type][def] instanceof RegExp;
  return isRegex ?
            new RegExp(delim[type][def],'gi') :
            new RegExp(delim[type][def].start + '((?:.|\n|\r)*?)' + delim[type][def].end,'gi');
}

function getTestTemplate(test) {
  test = test || 'true';
  test = test.replace(/([^=])=([^=])/g, '$1==$2');
  return '<% if ('+test+') { %>true<% }else{ %>false<% } %>'
}

function testPasses(test,context) {
  return _.template(getTestTemplate(test),context) === 'true';
}