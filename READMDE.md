# Homemade.js

Dumb js preprocessor. It can only include, exclude and lodash-template.

#### API

Guess actions:
```javascript
//→ file.js

//✂-------------
…somecode…
//----------------

/*%-----------
var a = 1;
print(a);
---------------*/
```

Hint:
```javascript
//%--------------
var a = [1,2,3];
//--------------
var b = [];

/*%--------------
for (var i in a) {
	print("b[" + i + "] = " + i*2);
}
-------------*/
```

#### Grunt
Add `homemade` task and enjoy precompiled code.