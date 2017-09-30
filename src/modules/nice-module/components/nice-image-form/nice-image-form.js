import 'polymer/polymer.html'
import 'paper-button/paper-button.html'
import './nice-image-form.html'
import '../nice-icon/nice-icon.html'
import Image from '../image-model/image-model.js'

class NiceImageForm extends Image(Polymer.Element) {
  static get is () { return 'nice-image-form' }

  static get properties () {
    return {
      type: String,
      articleId: String
    }
  }

  _delete () {
    var updates = {}
    var storagePath = this.image ? this.image.storagePath : ''
    updates[`v2/${this.type}/list/image/${this.articleId}/${this.imageId}`] = null
    updates[`v2/image/data/${this.id}`] = null

    var promises = [
      firebase.database().ref().update(updates)
    ]
    if (storagePath) {
      promises.push(firebase.storage().ref(storagePath).delete())
    }

    Promise.all(promises).then(() => {
      console.log('delete')
    })
  }

  _save () {
    var updates = {}
    updates[`v2/${this.type}/list/image/${this.articleId}/${this.imageId}/name`] = this.image.name || ''
    updates[`v2/${this.type}/list/image/${this.articleId}/${this.imageId}/caption`] = this.image.caption || ''

    return updates
  }
}

customElements.define(NiceImageForm.is, NiceImageForm)