# Hence.io Component Stack
## <%= compFullname %>

<%= compDescription %>

## Using this component

Add this component to your polymer project with:

    <link rel="import" href="bower_components/<%= compFullname %>.html" >

# Development

All development takes place leveraging the files in the /src & /test folders.

## Dependencies

Element dependencies are managed via [Bower](http://bower.io/). You can
install that via:

    npm install -g bower

Then, go ahead and download the element's dependencies:

    npm i && bower i

## Available Gulp Commands

```$ gulp```
Will compile assets, serve your web component with live reload, transpile es6, and lint your js/scss all while watching your src files

```$ gulp build```
Will compile your component for consumption, exporting it to a /dist folder

```$ gulp test```
Will execute the wct test tool to perform selenium tests on your web component

```$ gulp test:karma```  
Will execute es6 unit testing on your web component's script files

```$ gulp test:karma-watch```  
Will execute the karma tests and set a watcher on the component and test script files

### Inspired By
[https://github.com/alexweber/es6-jspm-gulp-boilerplate](https://github.com/alexweber/es6-jspm-gulp-boilerplate)
