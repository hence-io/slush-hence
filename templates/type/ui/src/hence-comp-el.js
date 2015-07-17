'use strict';
/**
 * @module <%= compName %>
 */
import console from 'consoler';
import HenceComp from 'hence-comp';

let is = '<%= compName %>';

/**
 * <%= compNameCamel %> Component
  * @constructor
 */
let <%= compNameCamel %> = HenceComp({
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
   * The factoryImpl method is only invoked when you create an element using the constructor, this.createElement or
   * it's binding functions. Instances hardcoded into html already will NOT execute this constructor. You've been
   * warned.
   *
   * @param {Object} opts A set of options for configuring this component
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
   * error 'Uncaught TypeError: Invalid value used as weak map key’!  Make sure to review the listeners you set up
   * against you DOM elements. By default listeners look for IDs on elements so ‘myButton.tap’ will watch click/touches
   * on a #myButton element in the component
   */
  listeners: {
    'spawn.tap': 'eventSpawnTap' // tap on a id="special" element
  },

  /**
   * @param {Event} e The event executing this function
   */
  eventSpawnTap(e) {
    // Update the property, using this.set to fire any expecting listeners
    this.set('greeting', 'Spawning moar!');

    // Create a new component and attach it to the document
    let el = this.createElement();
    document.body.appendChild(el);

    // Create a new component, automatically appending to a given target
    this.appendElementTo({greeting: '... and moar!'}, document.getElementById('newStuff'));
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
    // WARNING, updating DOM elements HERE may override variable revisions in the factoryImpl function if created
    // with the createElement function,leveraging the components defaults instead. If the element is embedded, no issue.

    // Access a local DOM element by ID using this.$
    // this.$.greeting.textContent += ", has loaded!";

    // Access a local DOM element by selector using this.$$('')
    // this.$$('#greeting').textContent += ", has loaded!";
  },

  /**
   * `attached` fires once the element and its parents have been inserted  into a document. This is a good place to
   * perform any work related to your element's visual state or active behavior (measuring sizes, beginning animations,
   * loading resources, etc).
   */
  attached() {
    // WARNING, updating DOM elements HERE may override variable revisions in the factoryImpl function if created
    // with the createElement function,leveraging the components defaults instead. If the element is embedded, no issue.

    // Access a local DOM element by ID using this.$
    // this.$.greeting.textContent += ", has loaded!";

    // Access a local DOM element by selector using this.$$('')
    // this.$$('#greeting').textContent += ", has loaded!";

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

  /**
   * @param {String} name The name of the attribute
   * @param {String} type The variable type of the attribute
   */
  attributeChanged(name, type) {
    let attr = this.getAttribute(name);
    console.log(`${this.localName}#${this.id} attribute ${name} was changed to ${attr} of type ${type}`);
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
   * @param {String} greeting A positive greeting.
   * @return {String} The full greeting.
   */
  sayHello(greeting ='Hello World!') {
    return '<%= compName %> says, ' + greeting;
  }
});

export {is};
export default <%= compNameCamel %>;
