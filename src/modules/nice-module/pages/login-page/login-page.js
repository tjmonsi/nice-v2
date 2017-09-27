import 'polymer/polymer.html'
import 'paper-button/paper-button.html'
import 'paper-material/paper-material.html'
import Redux from '../../components/nice-redux/nice-redux.js'
import User from '../../components/nice-user/nice-user.js'
import './login-page.html'

class LoginPage extends Redux(User(Polymer.Element)) {
  static get is () { return 'login-page' }

  static get observers () {
    return [
      '_checkUser(user)'
    ]
  }

  _checkUser (user) {
    if (user) {
      window.history.pushState({}, '', '/')
      window.dispatchEvent(new CustomEvent('location-changed'))
    }
  }

  reload () {
    if (this.user) {
      window.history.pushState({}, '', '/')
      window.dispatchEvent(new CustomEvent('location-changed'))
    }
  }
}

customElements.define(LoginPage.is, LoginPage)