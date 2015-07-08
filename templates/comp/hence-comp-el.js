// element registration
Polymer({
  is: "<%= compName %>",

  /**
   * The element's properties
   */
  properties: {
    /**
     * A sample public property
     */
    greeting: {
      type: String,
      value: "Hello!"
    }
  },

  // Element Lifecycle

  ready: function() {
    // `ready` is called after all elements have been configured, but
    // propagates bottom-up. This element's children are ready, but parents
    // are not.
    //
    // This is the point where you should make modifications to the DOM (when
    // necessary), or kick off any processes the element wants to perform.
  },

  attached: function() {
    // `attached` fires once the element and its parents have been inserted
    // into a document.
    //
    // This is a good place to perform any work related to your element's
    // visual state or active behavior (measuring sizes, beginning animations,
    // loading resources, etc).
  },

  detached: function() {
    // The analog to `attached`, `detached` fires when the element has been
    // removed from a document.
    //
    // Use this to clean up anything you did in `attached`.
  },

  /**
   * Sometimes it's just nice to say hi.
   *
   * @param {string} greeting A positive greeting.
   * @return {string} The full greeting.
   */
  sayHello: function(greeting) {
    var response = greeting || 'Hello World!';
    return '<%= compName %> says, ' + response;
  },

  /**
   * Does some secret magic!
   * @private
   */
  _doHiddenstuff: function(){

  }
});