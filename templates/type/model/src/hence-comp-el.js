'use strict';
/**
 * @module <%= compName %>
 */
import console from 'consoler';
import {HenceModel} from 'hence-comp';
import _each from 'lodash/collection/each';

let is = '<%= compName %>';

/**
 * <%= compNameCamel %> Component
 * @constructor
 */
let <%= compNameCamel %> = HenceModel({
  is, // auto set as is : is, es6 laziness joy!
  /********************************************************************************************************************
   * Initialization
   ********************************************************************************************************************/
  properties: {
  },

  /*********************************************************************************************************************
   * Element Behaviour
   ********************************************************************************************************************/

  /**
   * Manipulate the state loaded in from the schema to be suited for the expecting UI element. Executed by the
   * ```renderState()``` function
   *
   * @private
   */
    _transformState(entry) {
    let result = {};
    // todo: process the entry into a usable result, combining or adjusting raw data into consumable properties for
    // the expectant UI component.
    // result.this = entry.that;
    return result;
  },

  behaviors: []
});

export {is};
export default <%= compNameCamel %>;
