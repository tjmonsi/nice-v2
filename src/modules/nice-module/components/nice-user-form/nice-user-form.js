import 'polymer/polymer.html'
import 'paper-input/paper-input.html'
import 'paper-input/paper-textarea.html'
import 'paper-dialog/paper-dialog.html'
import '../nice-user-tos/nice-user-tos.js'
import Profile from '../user-model/member-model.js'
import './nice-user-form.html'

class NiceUserForm extends Profile(Polymer.Element) {
  static get is () { return 'nice-user-form' }

  static get properties () {
    return {
      memberImageProgress: {
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

  static get observers () {
    return [
      '_checkTos(user, profile, profile.agree)'
    ]
  }

  _checkTos (user, profile, agree) {
    if (user && profile && !agree) {
      this.shadowRoot.querySelector('nice-user-tos').open()
    }
  }

  _uploadProfileImage (e) {
    var el = e.target
    var files = el.inputElement.files || el.inputElement.inputElement.files
    if (files.length) {

      var file = files[0];

      if (firebase) {
        var path = `v2/user/list/image/${this.memberId}`
        var key = firebase.database().ref(path).push().key
        this._memberImageTask = firebase.storage().ref(path).child(`${key}--${file.name}`).put(file);
        this._memberImageTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          this._uploadTask.bind(this, 'memberImageProgress'),
          this._onError.bind(this),
          () => {
            this.set('memberImageProgress', 99.99);
            // console.log(this._bannerImageTask.snapshot.downloadURL)
            this.set('member.image', this._memberImageTask.snapshot.downloadURL);
            setTimeout(() => {
              this.set('memberImageProgress', 0)
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
    var path = `v2/user/data/${this.memberId}`
    if (this.member) {
      updates[`${path}/firstName`] = this.member.firstName || ''
      updates[`${path}/lastName`] = this.member.lastName || ''
      updates[`${path}/displayName`] = this.member.firstName + ' ' + this.member.lastName || ''
      updates[`${path}/address`] = this.member.address || ''
      updates[`${path}/image`] = this.member.image || ''
      updates[`${path}/work`] = this.member.work || ''
      updates[`${path}/position`] = this.member.position || ''

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