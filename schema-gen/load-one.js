loadSchema('Person', function (Person) {
  var fs = require('fs');
  fs.writeFile('./Person.json', JSON.stringify(Person), function (err) {
    if (err) {
      throw err;
    }
    console.log('It\'s saved!');
  });
});

function loadSchema(type, done) {
  var _ = require('lodash');
  var request = require('request');
  var maxDepth = 2;

  request('http://schema.rdfs.org/all.json', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var rawData = JSON.parse(body);
        var schemaDataTypes = rawData.datatypes;
        var schemaProps = rawData.properties;
        var schemaTypes = rawData.types;

        done(buildSchemaObject(schemaTypes[type]));

        function buildSchemaObject(target, currentDepth) {
          var schema = target;
          var newProps = {};

          currentDepth = currentDepth || 0;
          currentDepth++;

          if (schema && schema.properties) {
            schema.properties.forEach(function (propType, i) {
                var currentProp = _.clone(schemaProps[propType].ranges);

                if (currentProp && currentDepth <= maxDepth) {
                  //console.log(propType, currentProp);
                  currentProp.forEach(function (attr, i) {
                    if (!schemaProps[attr] && !schemaDataTypes[attr] && attr !== type) {
                      //console.log('looking up type', !!attr, currentDepth);
                      currentProp[i] = buildSchemaObject(schemaTypes[attr], currentDepth);
                    }
                  });
                }

                var firstProperty = currentProp[0];
                if (currentProp.length === 1 && !schemaDataTypes[firstProperty]) {
                  currentProp = {type: convertDataTypeToJson(firstProperty)};
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

function convertDataTypeToJson(schemaDataType) {
  var type = schemaDataType;
  switch (type) {
    case 'Number':
    case 'Float':
    case 'Integer':
      type = 'number';
      break;
    case 'Boolean':
    case 'Date':
      type = type.toLowerCase();
      break;
    case 'Text':
    case 'DateTime':
    case 'Time':
    case 'url':
      type = 'string';
      break;
  }

  return type;
}
