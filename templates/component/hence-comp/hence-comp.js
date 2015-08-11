import _extend from 'lodash/object/extend';

let HenceComp = function (comp) {
  return _extend(comp || {}, {
    _polymer: null,
    /**
     * Binds this component to the DOM to be available for consumption
     */
    registerElement() {
      let result = this._polymer;
      if (!result) {
        result = this._polymer = Polymer(this);
      }
      return result;
    },

    /**
     * Attach this element to the body, or target DOM tag
     */
    createElement(opts = {}, target = '') {
      let el = new this._polymer(opts); // Generates a new polymer component of this type

      // if a target was provided, attempt to find it, else default to the document
      target = target ? document.querySelector(target) || document.body : document.body;

      target.appendChild(el);

      return el;
    }
  });
};

export default HenceComp;
