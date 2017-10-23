import 'polymer/polymer.html'
import 'paper-fab/paper-fab.html'
import '../../components/nice-icon/nice-icon.html'
import '../../components/nice-footer/nice-footer.js'
import '../../components/nice-list/nice-list.js'
import '../../components/nice-article/nice-article.js'
import '../../components/nice-article-form/nice-article-form.js'
import Permission from '../../components/permission-model/permission-model.js'
import User from '../../components/user-model/user-model.js'
import './story-category-page.html'

class StoryCategoryPage extends Permission(User(Polymer.Element))  {
  static get is () { return 'story-category-page' }
  
  setTitle (category) {
    switch(category) {
      case 'farmer':
        return 'Farmer Stories'
      case 'training':
        return 'Training and Support Stories'
      case 'technology':
        return 'Sustainable Agricultural Technology Stories'
      case 'socialagripreneurs':
        return 'Social Agri-Entrepreneurs Stories'
      case 'agroprocessing':
        return 'Agro-Processing Stories'
      case 'bayanihan':
        return 'Bayanihan Economic Enterprise Stories'
      default:
        return 'Stories'
    }
  }
  
  addItem () {
    var updates = {}
    var path = `v2/story`
    var key = firebase.database().ref(`${path}/data`).push().key
    updates[`${path}/data/${key}/title`] = 'Title'
    updates[`${path}/data/${key}/summary`] = ''
    updates[`${path}/data/${key}/bannerImage`] = ''
    updates[`${path}/data/${key}/body`] = ''
    updates[`${path}/data/${key}/published`] = false
    updates[`${path}/data/${key}/datePublished`] = firebase.database.ServerValue.TIMESTAMP
    updates[`${path}/query/draft/${key}/value`] = firebase.database.ServerValue.TIMESTAMP
    
    return firebase.database().ref().update(updates).then(() => {
        document.querySelector('app-shell').showMessage('Created an Story Article', null, null, null, 5000)
        window.history.pushState({}, '', `story/${key}/edit`)
        window.dispatchEvent(new CustomEvent('location-changed'))
        return Promise.resolve()
      }).catch(this._onError.bind(this))
  }
}

customElements.define(StoryCategoryPage.is, StoryCategoryPage)