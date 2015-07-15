loadAllSchemas();

function loadAllSchemas() {
  var _ = require('lodash');
  var request = require('request');

  request('http://schema.rdfs.org/all.json', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var rawData = JSON.parse(body);
        var schemaDataTypes = rawData.datatypes;
        var schemaProps = rawData.properties;
        var schemaTypes = rawData.types;

        var fs = require('fs');
        _.keys(schemaTypes).forEach(function (type) {
          var schema = buildSchemaObject(schemaTypes[type]);
          fs.writeFile('./schemas/' + type + '.json', JSON.stringify(schema), function (err) {
            if (err) {
              throw err;
            }
            console.log(type + '.json saved!');
          });
        });

        function buildSchemaObject(target) {
          var schema = target;
          var newProps = {};

          if (schema && schema.properties) {
            schema.properties.forEach(function (propType, i) {
                var currentProp = _.clone(schemaProps[propType].ranges);

                if (currentProp.length === 1) {
                  currentProp = currentProp[0];
                }

                newProps[propType] = currentProp;
              }
            );
          }

          schema.properties = newProps;

          //console.log(schema);
          return schema;
        }
      }
    }
  );
}
