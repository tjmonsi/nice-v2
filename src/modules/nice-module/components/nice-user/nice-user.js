import 'polymer/polymer.html'
import '../nice-icon/nice-icon.html'
import 'iron-icon/iron-icon.html'
import Profile from '../user-model/member-model.js'
import Category from '../category-user-model/category-user-model.js';
import './nice-user.html'

class NiceUser extends Category(Profile(Polymer.Element)) {
  static get is () { return 'nice-user' }
  
  _getMemberType (type) {
    return type && this.categoryUser && this.categoryUser[this.categoryUser.findIndex(item => item.$key === type)].name
  }
}

customElements.define(NiceUser.is, NiceUser)