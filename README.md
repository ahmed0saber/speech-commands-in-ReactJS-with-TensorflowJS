### speech-commands-in-ReactJS-with-TensorflowJS

### if you got an error due to using webpack v5 or higher
1) install util

<code>
  npm install util
</code>
<br><br>

2) Go to

<code>
  myapp/node_modules/@tensorflow-models/speech-commands/package.json
</code>
<br><br>

3) add the following line as the first line inside the curly brackets { }

<code>
  "browser": { "fs": false, "node-fetch": false, "string_decoder": false, "crypto": false },
</code>
