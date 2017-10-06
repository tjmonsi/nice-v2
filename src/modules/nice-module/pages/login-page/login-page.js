import 'polymer/polymer.html'
import 'paper-button/paper-button.html'
import 'paper-material/paper-material.html'
import User from '../../components/user-model/user-model.js'
import './login-page.html'

class LoginPage extends User(Polymer.Element) {
  static get is () { return 'login-page' }

  static get observers () {
    return [
      '_checkUser(user, profile, profile.agree)'
    ]
  }

  _checkUser (user, profile, agree) {
    if (user && profile) {
      if (!agree) {
        window.history.pushState({}, '', '/community/' + this.user.uid + '/edit')
        window.dispatchEvent(new CustomEvent('location-changed'))
      }
    }
  }

  reload () {
    var agree = this.profile && this.profile.agree
    this._checkUser(this.user, this.profile, agree)
  }
}

customElements.define(LoginPage.is, LoginPage)