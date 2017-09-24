import 'polymer/polymer.html'
import 'paper-button/paper-button.html'
import Redux from '../../components/nice-redux/nice-redux.js'
import User from '../../components/nice-user/nice-user.js'
import './login-page.html'

class LoginPage extends Redux(User(Polymer.Element)) {
  static get is () { return 'login-page' }


}

customElements.define(LoginPage.is, LoginPage)