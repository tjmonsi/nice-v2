import 'polymer/polymer.html'
import User from '../user-model/user-model.js'
import Category from '../category-user-model/category-user-model.js'
import Permission from '../permission-model/permission-model.js'
import './nice-community-nav.html'

class NiceCommunityNav extends Category(Permission(User(Polymer.Element))) {
  static get is () { return 'nice-community-nav' }
}

customElements.define(NiceCommunityNav.is, NiceCommunityNav)