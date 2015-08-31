var componentScaffold = require('./component');
var scaffoldScaffold = require('./scaffold');

module.exports = {
  component: function(done){
    componentScaffold.run(done);
  },
  scaffold: function(done){
    scaffoldScaffold.run(done);
  }
};
