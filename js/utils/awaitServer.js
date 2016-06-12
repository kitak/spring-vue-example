const awaitServer = (fn) => {
  var Phaser = Java.type('java.util.concurrent.Phaser');
  var phaser = new Phaser();
  var results = {error: null, result: ''};
  phaser.register();

  const done = (err, res) => {
    if (err) {
      results.error = null;
    } else {
      results.result = res;
    }
    phaser.arriveAndDeregister();
  };

  phaser.register();
  setTimeout(() => {
    fn(done);
  }, 0);

  phaser.awaitAdvanceInterruptibly(phaser.arrive());
  return results;
};

export default awaitServer;
