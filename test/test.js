var homemade = require("../homemade.js"),
	fs = require("fs");

homemade.handleFile("./test/some_src.js", "./test/some_src_after.js", {pluginName:""})

console.log("test whether simple include ok:")
console.log(fs.readFileSync("./test/some_src_after.js") == fs.readFileSync("./test/some_src.js"))