import 'polymer/polymer.html'
import 'paper-fab/paper-fab.html'
import '../../components/nice-footer/nice-footer.js'
import '../../components/nice-dashboard-nav/nice-dashboard-nav.js'
import '../../components/nice-list/nice-list.js'
import Permission from '../../components/permission-model/permission-model.js'
import User from '../../components/user-model/user-model.js'
import './dashboard-quick-facts-page.html'

class DashboardPage extends Permission(User(Polymer.Element)) {
  static get is () { return 'dashboard-quick-facts-page' }
  
  addItem () {
    var updates = {}
    var path = `v2/quickfacts`
    var key = firebase.database().ref(`${path}/data`).push().key
    updates[`${path}/data/${key}/title`] = 'Title'
    updates[`${path}/data/${key}/summary`] = ''
    updates[`${path}/data/${key}/bannerImage`] = ''
    updates[`${path}/data/${key}/body`] = ''
    updates[`${path}/data/${key}/published`] = false
    updates[`${path}/data/${key}/datePublished`] = firebase.database.ServerValue.TIMESTAMP
    updates[`${path}/query/draft/${key}/value`] = firebase.database.ServerValue.TIMESTAMP
    
    return firebase.database().ref().update(updates).then(() => {
        document.querySelector('app-shell').showMessage('Created an Quick Facts Article', null, null, null, 5000)
        window.history.pushState({}, '', `quickfacts/${key}/edit`)
        window.dispatchEvent(new CustomEvent('location-changed'))
        return Promise.resolve()
      }).catch(this._onError.bind(this))
  }
}

customElements.define(DashboardPage.is, DashboardPage)