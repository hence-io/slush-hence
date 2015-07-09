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

## Playing With Your Element

### Serving the files
```gulp``` to serve and watch files, compiling and joining js as es6 modules/browserify with maps, and scss joining with maps. Linting is also done on the fly to ensure you're aware of issues sooner rather than later.

### Build
```gulp build``` outputs the compiled needed files to /dist

### Creating Documentation
```npm run docs``` generates js/scss documentation from code comments

### Testing
```npm run test``` runs karam and executes the unit tests one time
```npm run test:watch``` runs karam and executes the unit tests on the fly with watchers (both the scr folder and unit tests)

### web-component-tester

The tests are compatible with [web-component-tester](https://github.com/Polymer/web-component-tester).
Install it via:

    npm install -g web-component-tester

Then, you can run your tests on _all_ of your local browsers via:

    wct

#### WCT Tips

`wct -l chrome` will only run tests in chrome.

`wct -p` will keep the browsers alive after test runs (refresh to re-run).

`wct test/some-file.html` will test only the files you specify.
