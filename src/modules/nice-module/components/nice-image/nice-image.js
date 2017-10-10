import 'polymer/polymer.html'
import 'paper-button/paper-button.html'
import './nice-image.html'
import 'paper-dialog/paper-dialog.html'
import '../nice-icon/nice-icon.html'
import Image from '../image-model/image-model.js'

class NiceImage extends Image(Polymer.Element) {
  static get is () { return 'nice-image' }

  static get properties () {
    return {
      type: String,
      articleId: String
    }
  }

  openImage () {
    this.shadowRoot.querySelector('paper-dialog').open()
  }

  closeImage () {
    this.shadowRoot.querySelector('paper-dialog').close()
  }
}

customElements.define(NiceImage.is, NiceImage)