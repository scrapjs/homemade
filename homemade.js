/*
homemade.js is stupid preprocessor
 */

var path  = require('path'),
	fs    = require('fs');

exports.handle         = handle;
exports.handleFile     = handleFile;

var prefix = "#",
	comment = "(?:\\/\\/|\\/\\*)[ ]?",
	end =  "[ ]*(?:\\*\\/|$|\\/\\/.*$)",
	expression = "((?:[^\\n\\r](?!\\*\\/))+[^\\n\\r])" //"((?:[\\\\ a-zA-Z\\'\\\"\\+\\$\\_\\\/-\\?0-9\\(\\)\\{\\}\\;\\:](?!\\*\\/))+)",
	inline = "([^\\*\\s]+)",
	variable = "([\\$a-zA-Z_][\\$a-zA-Z_0-9]*)",
	assign = "[ ]*=[ ]*"


var rules = [
	{
		name: 'define',
		re: new RegExp(comment + prefix + "(?:define)[ ]+" + expression + end, "gm"),
		handle:	function(match,target, context){
			//console.log("DEFINE")
			//console.log(match)
			//console.log(target)
			tplResult = "";
			eval.call(global, target + ";");
			return tplResult;
		}
	},
	{
		name: 'echo',
		re: new RegExp(comment + prefix + "(?:print|put|echo)[ ]+" + expression + end, "gm"),
		handle: function(match,target){
			//console.log("ECHO")
			//console.log(match)
			//console.log(target)
			tplResult = "";
			eval.call(global, "var __tmp = " + target + "\nprint(__tmp)");
			return tplResult;
		}
	},
	{
		name: 'include',
		re: new RegExp(comment + prefix + "(?:include)[ ]+" + inline + "[ ]*" + end, "gm"),
		handle: function(match,file, context){
			//console.log("INCLUDE")
			//console.log(match)
			file = (file || '').trim().replace(/["']/g,"");
			//console.log(path.join(context.srcDir,file))
			try {
				var includedSource = fs.readFileSync(path.join(context.srcDir,file));
				return includedSource || '//Include failed. File ' + file + ' wasn’t found.';
			} catch (e) {
				console.log('Include failed. File \"' + file + '\" wasn’t found.')
				return "//HOMEMADE ERROR: Include failed. Can’t find \"" + file + "\""; 
			}
		}
	}
	//'exclude' : new RegExp(comment + prefix + "(?:exclude)[\n\r](?:(?:.|\s)(?![\n\r]-*@\*\/|\/\/@(?:end)?-+))*(?:.|\s)(?:[\n\r]-*@?\*\/|\/\/@(?:end)?-+))+", "gm"),
	//'eval' : /(?:(?:\/\/|\/\*)@(?:eval)[ -]*[\s]+((?:(?:.|\s)(?![\n\r]-*@?\*\/|\/\/@(?:end)?-+))*(?:.|\s))(?:[\n\r]-*@?\*\/|\/\/@(?:end)?-+))+/gm,
	//'template' : /(?:(?:\/\/|\/\*)@(?:template)[ -]*[\s]+((?:(?:.|\s)(?![\n\r]-*@?\*\/|\/\/@(?:end)?-+))*(?:.|\s))(?:[\n\r]-*@?\*\/|\/\/@(?:end)?-+))+/gm,
	//if
	//elif
	//ifdef
]

//Some necessities for API
global.tplResult = "";
global.print = function (str) {
		if (!tplResult) tplResult = str;
		else tplResult += "\n" + str;
}

//Main handlr
function handleFile(src, dest, context) {
	context = context || {};
	context.src = src;
	context.srcDir = path.dirname(src);

	try {
		var data = fs.readFileSync(src);
		fs.writeFileSync(dest, handle(data, context));
	} catch (e) {
		console.log(e)
	}
}

//Source code string handler
function handle(data,context) {
	data = data.toString();
	
	var rv = data;

	//extend globals with context
	for (var k in context){
		global[k] = context[k];
	}

	//eval all keywords
	for (var i = 0, l = rules.length; i<l; i++){
		rv =  rv.replace(rules[i].re, function(m, t){return rules[i].handle.apply(this, [m, t, context])});
	}
	
	return rv;
}


//---------------CLI
//console.log(process.argv)
var args = process.argv.slice(2);
if (args.length >= 2) {
	handleFile(args[0], args[1], args[2])
}