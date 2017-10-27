import 'polymer/polymer.html'
import 'paper-input/paper-input.html'
import 'paper-dropdown-menu/paper-dropdown-menu.html'
import 'paper-listbox/paper-listbox.html'
import 'paper-item/paper-item.html'
import 'paper-button/paper-button.html'
import Category from '../category-model/category-model.js';
import './nice-dl-nav.html'

class NiceDlNav extends Category(Polymer.Element) {
  static get is () { return 'nice-dl-nav' }
  
  static get properties () {
    return {
      year: {
        type: Number,
        notify: true
      },
      researchInstitution: {
        type: String,
        notify: true
      }
    }
  }
  
  resetSearch () {
    this.year = '';
    this.researchInstitution = ''
  }
}

customElements.define(NiceDlNav.is, NiceDlNav)