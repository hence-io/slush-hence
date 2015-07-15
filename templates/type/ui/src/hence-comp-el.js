'use strict';

var polymerComp;
let is = '<%= compName %>';

/**
 * <%= compNameCamel %> Class
 */
let <%= compNameCamel %> = {
  is, // auto set as is : is, es6 laziness joy!
  /********************************************************************************************************************
   * Initialization
   ********************************************************************************************************************/
  properties: {
    greeting: {
      type: String,
      value: 'Hello!'
    }
  },

  /**
   * https://www.polymer-project.org/1.0/docs/devguide/registering-elements.html#custom-constructor
   * The factoryImpl method is only invoked when you create an element using the constructor. The factoryImpl method is
   * not called if the element is created from markup by the HTML parser, or if the element is created using
   * document.createElement.
   *
   * The factoryImpl method is called after the element is initialized (local DOM created, default values set, and so
   * on). See Ready callback and element initialization for more information.
   * @constructor
   */
  factoryImpl(opts = {}) {
    if (opts.greeting) {
      this.set('greeting', opts.greeting);
    }
  },

  /*********************************************************************************************************************
   * Event Listeners
   ********************************************************************************************************************/

  /**
   * When working with listeners, if their target element doesn’t exist on the DOM you get a very basic nonspecific
   * error 'Uncaught TypeError: Invalid value used as weak map key’  Make sure to review the listeners you set up
   * against you DOM elements. By default listeners look for IDs on elements so ‘myButton.tap’ will watch click/touches
   * on a #myButton element in the component
   */
  listeners: {
    'spawn.tap': 'eventSpawnTap' // tap on a id="special" element
  },

  eventSpawnTap(e) {
    console.log('eventSpawnTap', e);
    this.set('greeting', 'Spawning moar!');
    this.element.create({greeting: 'This'});
    this.element.create({greeting: 'is'});
    this.element.create({greeting: 'a'});
    this.element.create({greeting: 'test'});
    this.element.create({greeting: ', yo!'});
  },


/*********************************************************************************************************************
   * Element DOM Hooks
   ********************************************************************************************************************/

  /**
   * This is called after all elements have been configured, but propagates bottom-up. This element's children are
   * ready, but parents are not. This is the point where you should make modifications to the DOM (when  necessary),
   * or kick off any processes the element wants to perform.
   */
  ready() {

  },

  /**
   * `attached` fires once the element and its parents have been inserted  into a document. This is a good place to
   * perform any work related to your element's visual state or active behavior (measuring sizes, beginning animations,
   * loading resources, etc).
   */
  attached() {
    this.async(function() {
      // access sibling or parent elements here
    });
  },

  /**
   * The analog to `attached`, `detached` fires when the element has been removed from a document. Use this to clean
   * up anything you did in `attached`.
   */
  detached() {

  },

  attributeChanged(name, type) {
    console.log(this.localName + '#' + this.id + ' attribute ' + name +
      ' was changed to ' + this.getAttribute(name) + ' of type ' + type);
  },

  /*********************************************************************************************************************
   * Element Behaviour
   ********************************************************************************************************************/


  /**
   * Does some secret magic!
   * @private
   */
  _doHiddenstuff() {

  },

  /**
   * Sometimes it's just nice to say hi.
   *
   * @param {string} greeting A positive greeting.
   * @return {string} The full greeting.
   */
  sayHello(greeting ='Hello World!') {
    return '<%= compName %> says, ' + greeting;
  },

  /*********************************************************************************************************************
   * Dynamic Element Controls
   ********************************************************************************************************************/

  /**
   * A set of initialization and generating polymer helper functions
   */
  element: {
    /**
     * Binds this component to the DOM to be available for consumption
     */
    register() {
      return polymerComp = Polymer(<%= compNameCamel %>);
    },

    /**
     * Attach this element to the body, or target DOM tag
     */
    create(opts = {}, target = '') {
      let el = new polymerComp(opts);

      // if a target was provided, attempt to find it, else default to the document
      target = target ? document.querySelector(target) || document.body : document.body;

      target.appendChild(el);

      return el;
    }
  }
};

export {is};
export default <%= compNameCamel %>;
