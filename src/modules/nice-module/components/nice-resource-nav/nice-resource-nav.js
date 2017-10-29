import 'polymer/polymer.html'
import Category from '../category-model/category-model.js'
import './nice-resource-nav.html'

class NiceResourceNav extends Category(Polymer.Element) {
  static get is () { return 'nice-resource-nav' }
  
  isEqual (a, b) {
    return a === b;
  }
}

customElements.define(NiceResourceNav.is, NiceResourceNav)