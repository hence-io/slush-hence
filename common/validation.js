function isTruthy(v) {
  return !!(v === true || v === "true" || v === "y" || v === "yes" || v === "Y" || v === "Yes");
}

function promptNotBlank(input) {
  // Declare function as asynchronous, and save the done callback
  var done = this.async();

  // Do async stuff
  setTimeout(function () {
    if (!input.length) {
      // Pass the return value in the done callback
      done("You need to provide name");
      return;
    }
    // Pass the return value in the done callback
    done(true);
  }, 100);
}

module.exports = {
  isTruthy: isTruthy,
  promptNotBlank: promptNotBlank
};
