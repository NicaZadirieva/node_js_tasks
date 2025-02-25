process.on("message", (msg) => {
  console.log("Parent received message:", msg);
  process.send("Parent responded with message");
  process.disconnect();
});
