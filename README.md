# Hence Component Stack

---

## About
Hence is a shift in modern development methodology, focused intently on build web components at it's core utilizing
Google's Polymer with a code base built entirely in ES6 / ES2015.

Providing comprehensive scaffolding and build support, you can get up and running with some base line components
effortlessly. Leveraging the power of the HenceComp core, an empowering extensible layer on top of Polymer, provides
you with the specialized component type at your finger tips, including some much needed abilities not
natively found in Polymer.

Hence's aim is to provide you with a streamlined development & build processes today for the cutting edge technology
of tomorrow. Build smaller, build smarter!

## [Hence Component Framework](https://github.com/hence-io/hence-component-framework)

To find out about all of these concepts in depth, and the full capabilities of the Hence Component Framework, detailed
documentation is featured on it's project page:
[Hence Component Framework](https://github.com/hence-io/hence-component-framework).

### Component Types
When creating Hence, fully embracing the web component mindset, we set out to define a key set of component types
which work together all focused on their individual concerns. The Hence scaffolding tool helps you to build out these
specific component types, custom tailored to give you the assets and ready to go code best suited to it's purpose.

* UI
    * UI components have the most diverse controls and sections built in, as they encompass the full range of possible
Polymer aspects when it comes to planning out and building what you need.
* Model
    * Models come with some baked in model specific controls, and require less in the resulting component which you will
build upon, yet you are in no way limited in what you can do with them (just adhere to is purpose). It also comes
with copies of it's needed override function.
* Schema
    * Schemas like models come with less fluff, largely focused on one purpose, overriding the executeQuery method,
which feeds data out to any other components desiring to consume API data, yet again you're not limited in varying
how you approach this.

### Hence's Tool Belt
What's under the hood? Hence leverages up and coming tech supported by a solid foundation of dependable tools.

* Included
  * Hence Component Framework
  * Polymer Web Components
  * ES6 / ES2015
    * Babel
    * Browserify
  * Sass
    * Compass
  * Gulp
    * BrowserSync
* Optional
  * ES Lint
  * Scss Lint
  * KSS Style Guide
    * SC5 Styleguide
  * Web Component Behavioural Testing
  * Karma Unit Testing
  * JS Doc Generation

---

## Getting Started
### Installation
#### Prerequisites
You must have Nodejs installed. As well, you also must have Ruby pre-installed if you wish to leverage Sass Compass
or the Scss Linter (both are optional).

#### Obtaining the Generator
When installing `slush-hence` globally with NPM, as a preinstall flag, this package will automatically install slush &
bower for you globally should you not already have them.

```bash
$ npm i -g slush-hence
```

Installing through git:
```bash
$ npm install -g hence-io/slush-hence#v0.2.7
```

### Building Your First Component - Quick Start

Generate a new component with the following command, and adjust your options at the prompts:
```bash
$ slush hence
```

Navigate to your component folder, and start your component:
```bash
$ gulp
```

Make some changes to the files in the /src folder, and watch your changes update in real time while building
your component.

When you have your component in a good place, you can build it to be used for consumption:
```bash
$ gulp build
```

The built component will reside in a ```/dist``` folder. The distribution copy has minified assets (css/js), and
generates a needed import file consolidating your module and assets, so that you can include it in other components.

With the build complete, you can now easily push your repo to bower or npm. Review those package files and update any
details you want before doing so.

All done!  If you'd like to know more in depth aspects of the framework, read the Extended build guide below.

### Building Your First Component - Extended
#### Generate Your Component
With the component generator installed, we can now start creating our first component.

Unlike most generators which assume you want to scaffold code into your current folder, by default the Hence
generator will ask you if you wish to create your new component into a sub-folder, or optionally place the files in
the current folder.

```bash
$ slush hence
```

When the generator begins, you will be asked a series of questions and select some options regarding what kind of
component and tools you wish to create.

##### Component Definition
* Each component should have it's own unique name. The generator will guide you through the process of naming your
component using the convention '[namespace]-[name]'.
* *The Namespace* for your component will help to identify the project where the component will existing
* *The Name* is a descriptor for your component unique to your project
* Selecting different component *Types* will provide you with different configurations to match that type's requirements.
* Fill in a description and version number to define the component package files.

##### Author Details
* Your name & email being the primary author for the component.
* You will be prompted for your github username, with a chance to create a repo under the project details.

##### Project Details
* You will be prompted whether or not you wish to have a git repo initialized for
your component as it's built.
* Sass processor: You are provide the option to choice to build this component with Compass (by default) or using
lib-sass if you so desire.
* Options: All of the optional tools to help you build your component are enabled by default, but you can freely
toggle them off to create a leaner component stack if you desire.
  * eslint - Providing ES6 JS linting as part of the dev/build process
  * es/js docs - Allows generating documentation from you JS comments
  * scsslint - Providing SCSS linting as part of the dev/build process
  * kss style guide - Allows generating a KSS style guide as part of the build process
  * karma unit testing - Provides access to ES6 JS unit testing
  * wct component testing - Provides access to Web Component Test (WCT) behavioural testing
  * editorconfig - Standardizes your projects IDE settings
* Folder: The option to generate the component into a sub-folder (default) or in the current folder you're in.
* Packages: An option to install the needed npm/bower packages once the files are set up (default) or not.

#### Review You Component Structure
Now that your component has been generated, navigate into it's folder and we will review it's structure.

* ```/gulp```
  * Contains all of the gulp tasks needed to support developing and building your component. With all
the tireless efforts put into building Hence, you should have no need to affect these at all, however advanced
users can certainly make adjustments as they see fit.
* ```/test```
  * Contains all of the behaviour and unit tests to run against your component.
* ```/src```
  * Contains all of your source files used to build your component, with it's dedicated html/js/scss files, and a
couple files to support previewing and testing variations of your component in the browser in real time. More
details on each file are below

##### Component Files: HTML Template
The HTML template holds the ```dom-module``` definition of the component. This is the main file where you craft your
visual template, or load in other components to render with data. The component properties tie into variables usable
on the template with ease thanks to Polymers wonderful structure. By default it inherits the Polymer component,
standard for any new Polymer component.

The UI & Model components make use of the HTML template, whereas the Schema components tend not to need it, serving
as a data conduit instead.

##### Component Files: JS Source
The JS source file is what defines your components properties and events to provide access to this from the HTML
template. This is what Polymer uses to interpret your components found on the DOM and give it context.

Depending on the component type you chose, you may see many placeholders and detailed comment, as with UI components,
or more specialized selection of controls for the Model and Schema types. Comments through the JS source are used to
compile the JS Docs when building your component for consumption.

Polymer has as lot going on, and sometimes it's possible to add a method or property to your component which could
cause conflicts. Hence checks your component for any such conflicts and highlights them to you in console so that you
can address them before it becomes an issue.

##### Component Files: Scss Style
The Scss encompasses the style specific to your component, and supporting style libraries. Through Compass and it's
plugins, some very handy agnostic styling can be applied to your components, so that wherever they get implemented
that they can be branded with ease. Comments through the Scss are used to compile the KSS style guide when building
your component for consumption.

##### Component Files: Index JS/HTML
Beyond working with the component files themselves, for development, testing, and the KSS style guide, the index files
are used to provide a playground for displaying or creating variations of your component side by side. This helps to
ensure your component works as you desire in every possible way, as well as shows you ways in which to dynamically
leverage your component when using it in other frameworks.

#### Working With Your Component
You've generated your component and are now familiar with it's structure, it's time to start playing with it!
Developing is made easy with BrowserSync and gulp to watch, lint, compile and serve your component. It will open in
Chrome (by default) for you to work with real time, and live inject css/html updates, while reloading with JS changes.

To run your component, from it's root folder type:
```bash
$ gulp
```

Make some changes and save, then watch them update without any effort!

#### Building Your Component
When you have your component in a good place, you can build it to be used for consumption.

```bash
$ gulp build
```

The built component will reside in a ```/dist``` folder. The distribution copy has minified assets (css/js), and
generates a needed import file consolidating your module and assets, so that you can include it in other components.

With the build complete, you can now easily push your repo to bower or npm. Review those package files and update any
details you want before doing so.

#### Testing Your Component
The ```/test``` folder contains two sub-folders for the varied testing available for your component (if you selected
those options).

##### Testing: Behaviour Tests
The ```/test/behaviour``` provides BDD style tests, which leverages the WCT test framework and Selenium, to run your
component thought it's given tests in a live browser setting, ensuring it represents what users will be experiencing
when interacting with it. The tests are written in part HTML defining your component on the DOM as needed, and in JS
to determine the tests and generate more of your components on the fly as needed.

To run your tests:
```bash
$ gulp test
```

The task will watch your test & src folders to changes and continually perform the tests till you stop it, allowing
you to easily work through tweaks and get the test and code inline without having to run test manually over and over.
