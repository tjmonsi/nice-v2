import 'polymer/polymer.html'
import Category from '../category-model/category-model.js'
import './nice-story-nav.html'

class NiceStoryNav extends Category(Polymer.Element) {
  static get is () { return 'nice-story-nav' }
  
  isEqual (a, b) {
    return a === b;
  }
}

customElements.define(NiceStoryNav.is, NiceStoryNav)