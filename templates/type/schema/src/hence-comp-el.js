'use strict';

/**
 * <%= compNameCamel %> Class
 */
class <%= compNameCamel %> {
  /********************************************************************************************************************
   * Initialization
   ********************************************************************************************************************/

  /**
   * Initialize the component
   * @constructor
   */
  constructor() {
    /**
     * <%= compNameCamel %> Properties
     * @type {{greeting: {type: String, value: string}}}
     */
    this.properties = {
      /**
       * A sample public property
       */
      greeting: {
        type: String,
        value: 'Hello!'
      }
    };
  }

  /*********************************************************************************************************************
   * Element DOM Hooks
   ********************************************************************************************************************/

  /**
   * This is called after all elements have been configured, but propagates bottom-up. This element's children are
   * ready, but parents are not. This is the point where you should make modifications to the DOM (when  necessary),
   * or kick off any processes the element wants to perform.
   */
  ready() {

  }

  /**
   * `attached` fires once the element and its parents have been inserted  into a document. This is a good place to
   * perform any work related to your element's visual state or active behavior (measuring sizes, beginning animations,
   * loading resources, etc).
   */
  attached() {

  }

  /**
   * The analog to `attached`, `detached` fires when the element has been removed from a document. Use this to clean
   * up anything you did in `attached`.
   */
  detached() {

  }

  /*********************************************************************************************************************
   * Element Behaviour
   ********************************************************************************************************************/

  /**
   * Does some secret magic!
   * @private
   */
  _doHiddenstuff() {

  }

  notSoHiddenStuff() {

  }

  /**
   * Sometimes it's just nice to say hi.
   *
   * @param {string} greeting A positive greeting.
   * @return {string} The full greeting.
   */
  sayHello(greeting ='Hello World!') {
    return '<%= compName %> says, ' + greeting;
  }

  /*********************************************************************************************************************
   * Polymer configuration
   ********************************************************************************************************************/

  /**
   * Snap the component into Polymer
   * @static
   */
  static polymerInit() {
    let Polymer = window.Polymer || null;

    if (Polymer) {
      Polymer(new <%= compNameCamel %>().polymerOptions());
    }
  }

  /**
   * Configure this elements Polymer settings
   * @returns {{is: string, properties: {greeting: {type: String, value: string}}, ready: <%= compName %>.ready,
   * attached: <%= compName %>.attached, detached: <%= compName %>.detached,
   * sayHello: <%= compName %>.sayHello, _doHiddenstuff: <%= compName %>._doHiddenstuff}}
   */
  polymerOptions() {
    return {
      is: '<%= compName %>',
      // The element's properties
      properties: this.properties,
      // Element Lifecycle
      ready: this.ready,
      attached: this.attached,
      detached: this.detached,
      // Custom methods
      sayHello: this.sayHello, // class name vs this. as it is static
      _doHiddenstuff: this._doHiddenstuff
    };
  }

}

export default <%= compNameCamel %>;
