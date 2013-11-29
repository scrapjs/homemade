//#define DEV=false

flatten: function(str){
	while((match = str.match(this.reversiveDataRE)) !== null && c < limit){
		//#if DEV
		debug && console.group("data:", "'" + reverse(match[2]) + "'", "'" + reverse(match[1]) + "'")
		//#endif				

		var token = new DataToken(unescapeSymbols(reverse(match[2]), "{}"), reverse(match[1]), this);
		str = str.replace(match[0], refBrackets[1] + token.idx + refBrackets[0]);
		c++
	}

	//Then flatten groups
	c = 0;
	while( (match = str.match(this.groupRE)) !== null  && c < limit){
		//#if DEV
		debug && console.group("group:", "'" + match[1] + "'", "'" + match[2] + "'")
		//#endif				

		var token = new GroupToken(match[1], match[2], this);
		str = str.replace(match[0], refBrackets[0] + token.idx + refBrackets[1]);
	}
},