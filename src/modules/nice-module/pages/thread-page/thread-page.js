import 'polymer/polymer.html'
import '../../components/nice-footer/nice-footer.js'
import '../../components/nice-thread-list/nice-thread-list.js'
import '../../components/nice-thread/nice-thread.js'
import '../../components/nice-community-nav/nice-community-nav.js'
import Permission from '../../components/permission-model/permission-model'
import User from '../../components/user-model/user-model';
import './thread-page.html'

class ThreadPage extends Permission(User(Polymer.Element)) {
  static get is () { return 'thread-page' }

  // static get observers () {
  //   return [
  //     '_checkUser(user, permission.role)'
  //   ]
  // }

  // _checkUser (user, role) {
  //   if (user && role) {
  //     if (!this._checkRole(user, role, 'member')) {
  //       window.history.pushState({}, '', '/login')
  //       window.dispatchEvent(new CustomEvent('location-changed'))
  //     }
  //   } else {
  //     window.history.pushState({}, '', '/login')
  //     window.dispatchEvent(new CustomEvent('location-changed'))
  //   }
  // }

  // reload () {
  //   this._checkUser(this.user, this.permission && this.permission.role)
  // }
}

customElements.define(ThreadPage.is, ThreadPage)