const { exec, spawn } = require("child_process");

const childProcess = exec("dir", (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${err.message}`);
    return;
  }

  console.log(`stdout: ${stdout}`);

  if (stderr) {
    console.error(`stderr: ${stderr}`);
  }
});

childProcess.on("exit", (code) => {
  console.log(`Child process exited with code ${code}`);
});

// My guess here is that because dir is not an actual program (there's no dir.exe in Windows),
// you have to tell the spawn() command whether it's supposed to run
// this in a command shell ({ shell: true }) or without a command shell.
// Whereas on other platforms, things such as ls are actual programs that can be run either way.

const childProcess2 = spawn("dir", { shell: true });

childProcess2.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

childProcess2.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

childProcess2.on("exit", (code) => {
  console.log(`Child process2 exited with code ${code}`);
});
