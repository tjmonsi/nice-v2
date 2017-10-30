import 'polymer/polymer.html'
import Category from '../category-model/category-model.js'
import './nice-story-nav.html'

class NiceStoryNav extends Category(Polymer.Element) {
  static get is () { return 'nice-story-nav' }
  
  isEqual (a, b, c, d) {
    return a === b || a === c || a === d;
  }
}

customElements.define(NiceStoryNav.is, NiceStoryNav)