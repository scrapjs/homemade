/*
homemade.js is stupid preprocessor
 */
var path  = require('path'),
	fs    = require('fs');

exports.handle = handle;
exports.handleFile = handleFile;

//regex's
var prefix = "#",
	comment = "(?:\\/\\/|\\/\\*)",
	start = comment + "[ \\t]?" + prefix + "[ \\t]?",
	end =  "[ \\t]*(?:\\*\\/|(?:\\/\\/[^\\r\\n]*)?$)",
	expression = "((?:[^\\n\\r](?!\\*\\/))+[^\\n\\r])" //"((?:[\\\\ a-zA-Z\\'\\\"\\+\\$\\_\\\/-\\?0-9\\(\\)\\{\\}\\;\\:](?!\\*\\/))+)",
	inline = "([^*\\s]+)",
	variable = "([\\$a-zA-Z_][\\$a-zA-Z_0-9]*)",
	assign = "[ \\t]*=[ \\t]*",
	conditionStep = function(token){return start + token}, //like //#endif
	conditionBodyTill = function(tillToken){return "((?:[^](?!" + conditionStep(tillToken) + "))*[^])"} //like 


//Some necessities for API (in rendering)
//result of rendering a rule
global.tplResult = "";

//printer to the tplResult
global.print = function (str) {
	if (!tplResult) tplResult = str;
	else tplResult += "\n" + str;
}


//rules to apply to the file
var rules = [
	{
		name: "exclude",
		re: new RegExp(start + "(exclude)" + conditionBodyTill("(?:endexclude|end)") + conditionStep("(?:endexclude|end)") + end, "gm"),
		handle: function(match, token, body, context){
			//console.log("ECXLUDE:" + token)
			//console.log(match)
			return "";
		}
	},
	{
		name: 'define',
		re: new RegExp(start + "(define)[ ]+" + expression + end, "gm"),
		handle:	function(match, token, target, context){
			//console.log("DEFINE:" + token)
			//console.log(match)
			//console.log(target)
			tplResult = "";
			try {
				eval.call(global, target + ";");
				return tplResult;
			} catch (e){
				throw e
				return "//HOMEMADE ERROR: Define failed"; 
			}
		}
	},
	{
		name: 'condition',
		re: new RegExp(start + "(if|ifdef|ifndef)[ \\t]+" + conditionBodyTill("endif") + conditionStep("endif") + end, "gm"),
		handle: function(match, token, body, context){
			//console.log("CONDITION:" + match)
			//console.log(body)
			tplResult = "";

			//Go by conditions, testing clauses in turn
			//check if condition
			var ifMatch = body.match(new RegExp(expression + end, "m"));
			var ifCondition = ifMatch && ifMatch[1];
			//console.log("ifCondition:" + ifCondition)
			body = body.replace(new RegExp(expression + end, "m"), ""); //remove first expression (condition)
			var ifBody = body.match(new RegExp(conditionBodyTill("(?:else|elif)"), "m"))[1].trim();
			if (token == "ifndef"){
				if (eval("!( " + ifCondition + ")")){
					//console.log("ifndef caught:")
					//console.log(ifndefBody)
					return handle(ifBody, context);
				}
			} else {
				if (!!eval(ifCondition)){
					//console.log("if caught:")
					//console.log(ifBody)
					return handle(ifBody, context);
				}
			}
			body = body.replace(new RegExp(conditionBodyTill("(?:elif|else)"), "m"), ""); //remove up to second condition

			//check elifs
			var elifRe = new RegExp(start + "(elif)", ""); //simple tester if existence elif
			while (body.match(elifRe) !== null){
				//caught something
				var elifMatch = body.match(new RegExp(start + "elif" + expression + end, "m")); //get condition
				var elifCondition = elifMatch[1];
				//console.log(body)
				//console.log("elifMatch:" + elifMatch)
				//console.log("elifCondition:" + elifCondition)
				body = body.replace(new RegExp(start + "elif" + expression + end, "m"), ""); //remove elif expression (condition)
				var elifBody = body.match(new RegExp(conditionBodyTill("(?:else|elif)"), "m"))[1].trim();
				if (!!eval(elifCondition)) return handle(elifBody, context);
				body = body.replace(new RegExp(conditionBodyTill("(?:elif|else)"), "m"), ""); //remove up to next condition
			}

			//else - else
			if (body.match(new RegExp(start + "else", ""))) {
				body = body.replace(new RegExp(start + "else[ ]*" + end, "m"), "").trim(); //remove elif expression (condition)
				return handle(body, context);
			}

			return tplResult;
		}
	},
	{
		name: 'echo',
		re: new RegExp(start + "(print|put|echo)[ ]+" + expression + end, "gm"),
		handle: function(match, token, target, context){
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
		re: new RegExp(start + "(include)[ \\t]+" + inline + "[ \\t]*" + end, "gm"),
		handle: function(match, token, file, context){
			//console.log("INCLUDE")
			//console.log("match:" + match)
			file = (file || '').trim().replace(/["']/g,"");
			//console.log("file:" + path.join(context.srcDir,file))
			var includedSource = handleFile(path.join(context.srcDir,file), extend({},context));
			return includedSource;
		}
	}
]


//Main handlr - returns handled string result
function handleFile(src, context) {
	context = context || {};
	context.src = src;
	context.srcDir = path.dirname(src);
	//console.log("handleFile in dir:" + context.srcDir)

	try {
		var data = fs.readFileSync(src);
	} catch (e){
		console.log('Include failed. File \"' + src + '\" wasn’t found.')
		return "//HOMEMADE ERROR: Include failed. Can't find the file \"" + src + "\""; 
	}

	return handle(data, context);
	//console.log("handle opened: " + src)
}

//Source code string handler - returns handled source
function handle(data, context) {
	data = data.toString();
	
	var rv = data;

	//extend globals with context
	for (var k in context){
		global[k] = context[k];
	}

	//eval all keywords
	for (var i = 0, l = rules.length; i<l; i++){
		rv =  rv.replace(rules[i].re, function(match, token, content){
			return rules[i].handle.apply(this, [match, token, content, context])
		});
	}
	
	return rv;
}


//simple util
function extend(a, b){
	if (!b) return;
	if (!a) a = {};
	for (var i in b){
		a[i] = b;
	}
}


//---------------CLI
//console.log(process.argv)
var args = process.argv.slice(2);
if (args.length >= 2) {
	fs.writeFileSync(args[1], handleFile(args[0], args[2]))
}