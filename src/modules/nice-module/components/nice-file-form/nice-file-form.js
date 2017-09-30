import 'polymer/polymer.html'
import 'paper-button/paper-button.html'
import './nice-file-form.html'
import '../nice-icon/nice-icon.html'
import File from '../file-model/file-model.js'

class NiceFileForm extends File(Polymer.Element) {
  static get is () { return 'nice-file-form' }

  static get properties () {
    return {
      type: String,
      articleId: String
    }
  }

  _delete () {
    var updates = {}
    var storagePath = this.file.storagePath
    updates[`v2/${this.type}/list/file/${this.articleId}/${this.fileId}`] = null
    updates[`v2/file/data/${this.id}`] = null

    var promises = [
      firebase.database().ref().update(updates),
      firebase.storage().ref(storagePath).delete()
    ]

    Promise.all(promises).then(() => {
      console.log('delete')
    })

  }

  _save () {
    var updates = {}
    updates[`v2/${this.type}/list/file/${this.articleId}/${this.fileId}/name`] = this.file.name || ''
    updates[`v2/${this.type}/list/file/${this.articleId}/${this.fileId}/caption`] = this.file.caption || ''

    return updates
  }
}

customElements.define(NiceFileForm.is, NiceFileForm)