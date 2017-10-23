import 'polymer/polymer.html'
import 'paper-fab/paper-fab.html'
import '../../components/nice-footer/nice-footer.js'
import '../../components/nice-list/nice-list.js'
import '../../components/nice-article/nice-article.js'
import '../../components/nice-article-form/nice-article-form.js'
import '../../components/nice-pas-nav/nice-pas-nav.js'
import Permission from '../../components/permission-model/permission-model.js'
import User from '../../components/user-model/user-model.js'
import './pas-technology-page.html'

class PasTechnologyPage extends Permission(User(Polymer.Element))  {
  static get is () { return 'pas-technology-page' }

  static get observers () {
    return [
      '_checkEdit(edit)'
    ]
  }

  _checkEdit (edit) {
    return edit === 'edit'
  }
  
  addItem () {
    var updates = {}
    var path = `v2/pas`
    var key = firebase.database().ref(`${path}/data`).push().key
    updates[`${path}/data/${key}/title`] = 'Title'
    updates[`${path}/data/${key}/summary`] = ''
    updates[`${path}/data/${key}/bannerImage`] = ''
    updates[`${path}/data/${key}/body`] = ''
    updates[`${path}/data/${key}/published`] = false
    updates[`${path}/data/${key}/datePublished`] = firebase.database.ServerValue.TIMESTAMP
    updates[`${path}/query/draft/${key}/value`] = firebase.database.ServerValue.TIMESTAMP
    
    return firebase.database().ref().update(updates).then(() => {
        document.querySelector('app-shell').showMessage('Created an Products and Services Article', null, null, null, 5000)
        window.history.pushState({}, '', `pas/${key}/edit`)
        window.dispatchEvent(new CustomEvent('location-changed'))
        return Promise.resolve()
      }).catch(this._onError.bind(this))
  }
}

customElements.define(PasTechnologyPage.is, PasTechnologyPage)