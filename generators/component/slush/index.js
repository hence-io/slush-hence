var SlushHence = require('../../../common');

// The step order isn't locked down, it can be swapped out as long as higher steps don't require answers from lower
// steps, you're aok!

var step0 = require('./step-install-options');
var step1 = require('./step-component');
var step2 = require('./step-author');
var step3 = require('./step-project');

var componentGenerator = SlushHence.generator({
  validation: {
    detailedInstallOnly: function (answer) {
      return answer.installOption === step0.options.installOptions.detailed;
    }
  }
});

componentGenerator.steps.push(step0.step(componentGenerator));
componentGenerator.steps.push(step1.step(componentGenerator));
//componentGenerator.steps.push(step2.step(componentGenerator));
//componentGenerator.steps.push(step3.step(componentGenerator));

componentGenerator.start();
