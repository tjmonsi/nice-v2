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
      },
      type: {
        type: String,
        notify: true
      },
      topics: {
        type: Array,
        value: [
          {
            $key: 'farmer',
            name: 'Farmers'
          },
          {
            $key: 'products',
            name: 'Products, training, and support services'
          },
          {
            $key: 'sustainable',
            name: 'Sustainable agricultural technology '
          },
          {
            $key: 'socialagripreneurs',
            name: 'Social Entrepreneurs '
          },
          {
            $key: 'agroprocessing',
            name: 'Agro-Processing '
          },
          {
            $key: 'bayanihan',
            name: 'Bayanihan Economics'
          }
        ]
      }
    }
  }
  
  resetSearch () {
    this.year = '';
    this.researchInstitution = ''
    this.type = '';
  }
}

customElements.define(NiceDlNav.is, NiceDlNav)