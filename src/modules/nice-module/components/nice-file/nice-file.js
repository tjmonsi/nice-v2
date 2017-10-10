import 'polymer/polymer.html'
import 'paper-button/paper-button.html'
import './nice-file.html'
import '../nice-icon/nice-icon.html'
import File from '../file-model/file-model.js'

class NiceFile extends File(Polymer.Element) {
  static get is () { return 'nice-file' }

  static get properties () {
    return {
      type: String,
      articleId: String
    }
  }
}

customElements.define(NiceFile.is, NiceFile)