import 'polymer/polymer.html'
import 'paper-input/paper-input.html'
import 'paper-input/paper-textarea.html'
import 'paper-dialog/paper-dialog.html'
import Profile from '../user-model/profile-model.js'
import './nice-user-form.html'

class NiceUserForm extends Profile(Polymer.Element) {
  static get is () { return 'nice-user-form' }

  static get properties () {
    return {
      profileImageProgress: {
        type: Number
      },
      _imageTasks: {
        type: Array
      },
      _fileTasks: {
        type: Array
      }
    }
  }

  _uploadProfileImage (e) {
    var el = e.target
    var files = el.inputElement.files || el.inputElement.inputElement.files
    if (files.length) {

      var file = files[0];

      if (firebase) {
        var path = `v2/user/list/image/${this.profileId}`
        var key = firebase.database().ref(path).push().key
        this._profileImageTask = firebase.storage().ref(path).child(`${key}--${file.name}`).put(file);
        this._profileImageTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          this._uploadTask.bind(this, 'profileImageProgress'),
          this._onError.bind(this),
          () => {
            this.set('profileImageProgress', 99.99);
            // console.log(this._bannerImageTask.snapshot.downloadURL)
            this.set('profile.image', this._profileImageTask.snapshot.downloadURL);
            setTimeout(() => {
              this.set('profileImageProgress', 0)
              // this._bannerImageTask = null
            }, 100);
          }
        )
      }
    }
  }

  _uploadTask (progressPath, snapshot) {
    var val = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    this.set(progressPath, val ? val : 0.01);
  }

  _save () {
    var updates = {}
    var path = `v2/user/data/${this.profileId}`
    if (this.profile) {
      updates[`${path}/firstName`] = this.profile.firstName || ''
      updates[`${path}/lastName`] = this.profile.lastName || ''
      updates[`${path}/displayName`] = this.profile.firstName + ' ' + this.profile.lastName || ''
      updates[`${path}/address`] = this.profile.address || ''
      updates[`${path}/image`] = this.profile.image || ''
      updates[`${path}/work`] = this.profile.work || ''
      updates[`${path}/position`] = this.profile.position || ''

      var images = this.shadowRoot.querySelectorAll('nice-image-form')
      if (images && images.length) {
        images.forEach(image => {
          if (image._save) {
            var imageUpdates = image._save()
            for (var k in imageUpdates) {
              updates[k] = imageUpdates[k]
            }
          }
        })
      }

      var files = this.shadowRoot.querySelectorAll('nice-file-form')
      if (files && files.length) {
        files.forEach(file => {
          if (file._save) {
            var fileUpdates = file._save()
            for (var l in fileUpdates) {
              fileUpdates[l] = fileUpdates[l]
            }
          }
        })
      }

      return firebase.database().ref().update(updates).then(() => {
        document.querySelector('app-shell').showMessage('Saved', null, null, null, 5000)
        return Promise.resolve()
      }).catch(this._onError.bind(this))
    }
  }

  _handleCancel () {
    this.shadowRoot.querySelector('.cancel-dialog').open()
  }

  _closeCancel () {
    this.shadowRoot.querySelector('.cancel-dialog').close()
  }

  _cancel () {
    this.shadowRoot.querySelector('.cancel-dialog').close()
    window.history.pushState({}, '', `/${this.type}/${this.articleId}`)
    window.dispatchEvent(new CustomEvent('location-changed'))
  }
}

customElements.define(NiceUserForm.is, NiceUserForm)