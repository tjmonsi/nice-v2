import 'polymer/polymer.html'
import '../../components/nice-footer/nice-footer.js'
import '../../components/nice-community-nav/nice-community-nav.js'
import '../../components/nice-user-list/nice-user-list.js'
import '../../components/nice-user/nice-user.js'
import '../../components/nice-user-form/nice-user-form.js'
import User from '../../components/user-model/user-model.js'
import Permission from '../../components/permission-model/permission-model.js'
import './community-page.html'

class CommunityPage extends Permission(User(Polymer.Element)) {
  static get is () { return 'community-page' }

  static get observers () {
    return [
      '_checkTos(user.uid, permission.role, profile, profile.agree)'
    ]
  }

  _checkEdit (edit) {
    return edit === 'edit'
  }

  _checkTos (user, role, profile, agree) {
    console.log(user, role, profile, agree, this.classList, document.querySelector('app-shell').path) 
    if (user && role) {
      if (!this._checkRole(user, role, 'member')) {
        if (profile && !agree) {
        
          window.history.pushState({}, '', '/community/' + this.user.uid + '/edit')
          window.dispatchEvent(new CustomEvent('location-changed'))
        } else {
          window.history.pushState({}, '', '/community/' + this.user.uid)
          window.dispatchEvent(new CustomEvent('location-changed'))
        }
      } else if (profile && !agree) {
        window.history.pushState({}, '', '/community/' + this.user.uid + '/edit')
        window.dispatchEvent(new CustomEvent('location-changed'))
      }
    }
  }
}

customElements.define(CommunityPage.is, CommunityPage)