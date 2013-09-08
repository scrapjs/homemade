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


var re = {
	'include' : new RegExp(comment + prefix + "(?:include)[ ]+" + inline + "[ ]*" + end, "gm"),
	//'exclude' : new RegExp(comment + prefix + "(?:exclude)[\n\r](?:(?:.|\s)(?![\n\r]-*@\*\/|\/\/@(?:end)?-+))*(?:.|\s)(?:[\n\r]-*@?\*\/|\/\/@(?:end)?-+))+", "gm"),
	//'eval' : /(?:(?:\/\/|\/\*)@(?:eval)[ -]*[\s]+((?:(?:.|\s)(?![\n\r]-*@?\*\/|\/\/@(?:end)?-+))*(?:.|\s))(?:[\n\r]-*@?\*\/|\/\/@(?:end)?-+))+/gm,
	//'template' : /(?:(?:\/\/|\/\*)@(?:template)[ -]*[\s]+((?:(?:.|\s)(?![\n\r]-*@?\*\/|\/\/@(?:end)?-+))*(?:.|\s))(?:[\n\r]-*@?\*\/|\/\/@(?:end)?-+))+/gm,
	'echo' : new RegExp(comment + prefix + "(?:print|put|echo)[ ]+" + expression + end, "gm"),
	//if
	//elif
	//ifdef
	'define' : new RegExp(comment + prefix + "(?:define)[ ]+" + expression + end, "gm")
	//put
}

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
function handle(src,context) {
	src = src.toString();
	
	var rv = src;

	//extend globals with context
	for (var k in context){
		global[k] = context[k];
	}

	rv = rv.replace(re['define'],function(match,target){
		//console.log("DEFINE")
		//console.log(match)
		//console.log(target)
		tplResult = "";
		eval.call(global, target + ";");
		return tplResult;
	});

	rv = rv.replace(re['include'],function(match,file){
		//console.log("=============")
		//console.log(match)
		//console.log(file)
		file = (file || '').trim();
		try {
			var includedSource = fs.readFileSync(path.join(context.srcDir,file));
			return includedSource || '//Include failed. File ' + file + ' wasn’t found.';
		} catch (e) {
			return '//Include failed. File ' + file + ' wasn’t found.'
		}
	});
	
	rv = rv.replace(re['eval'],function(match,code) {
		//console.log("//--------EVAL CODE")
		//console.log(match)
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
		//console.log("ECHO")
		//console.log(match)
		//console.log(target)
		tplResult = "";
		eval.call(global, "var __tmp = " + target + "\nprint(__tmp)");
		return tplResult;
	});

	rv = rv.replace(re['exclude'],"");

	return rv;
}


//---------------CLI
//console.log(process.argv)
var args = process.argv.slice(2);
if (args.length >= 2) {
	handleFile(args[0], args[1], args[2])
}