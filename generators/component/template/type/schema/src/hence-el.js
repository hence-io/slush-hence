'use strict';
/**
 * @module <%= compName %>
 */
import console from 'consoler';
import {HenceSchema} from 'hence-polycore';

let is = '<%= compName %>';

/**
 * <%= compNameCamel %> Component
 * @constructor
 */
let <%= compNameCamel %> = HenceSchema({
  is, // auto set as is : is, es6 laziness joy!
  /********************************************************************************************************************
   * Initialization
   ********************************************************************************************************************/
  properties: {},

  /*********************************************************************************************************************
   * Event Listeners
   ********************************************************************************************************************/

  /**
   * When working with listeners, if their target element doesn’t exist on the DOM you get a very basic nonspecific
   * error 'Uncaught TypeError: Invalid value used as weak map key’!  Make sure to review the listeners you set up
   * against you DOM elements. By default listeners look for IDs on elements so ‘myButton.tap’ will watch click/touches
   * on a #myButton element in the component
   */
  listeners: {},

  /*********************************************************************************************************************
   * Element DOM Hooks
   ********************************************************************************************************************/

    ready() {
    this.async(()=> {
      //console.log('attached::_executeQuery on', this.action);
      this._executeQuery();
    })
  },


  /*********************************************************************************************************************
   * Element Behaviour
   ********************************************************************************************************************/

    _executeQuery() {
    let self = this;
    let query = self.query || {};
    let results = self.results || [];

    switch (this.action) {
    }

    //console.log('_executeQuery ', query, results);

    return results;
  }
});

export {is};
export default <%= compNameCamel %>;
