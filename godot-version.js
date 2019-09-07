const glob = require("glob")
const prompts = require('prompts')
const exec = require('child_process').execFile;

const args = process.argv.slice(2);

var directory = "./"

if (args[0] === "d") {
  directory = args[1];
}

glob(directory+"Godot**.exe", null, function(err, files) {
  let choicesArray = [];

  files.forEach(file => {
    choicesArray.unshift({title: /v(.*?).exe/.exec(file)[1], value: file});
  });

  (async () => {
    const response = await prompts([
      {
        type: 'select',
        name: 'value',
        message: 'Pick your Godot version:',
        choices: choicesArray,
        initial: 0
      }
    ]);
    var cli = exec(response.value)

    cli.stdout.on('data', function(data) {
      console.log("Godot: " + data)
    })
  })();
});




