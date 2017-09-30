import 'polymer/polymer.html'
import 'paper-input/paper-input.html'
import 'paper-input/paper-textarea.html'
import 'paper-progress/paper-progress.html'
import 'paper-button/paper-button.html'
import 'paper-toggle-button/paper-toggle-button.html'
import '../nice-article/nice-article.js'
import '../nice-image-form/nice-image-form.js'
import '../nice-file-form/nice-file-form.js'
import Article from '../article-model/article-model.js'
import Category from '../category-model/category-model.js'
import './nice-article-form.html'

class NiceArticleForm extends Category(Article(Polymer.Element)) {
  static get is () { return 'nice-article-form' }

  static get properties () {
    return {
      preview: {
        type: Boolean,
        value: false
      },
      bannerImageProgress: {
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

  toggleCategory (e) {
    var el = e.target;
    var id = el.getAttribute('data-key');
    var parent = el.getAttribute('data-parent')
    var cat = el.getAttribute('data-level');
    var checked = el.checked;

    if (checked) {
      this.set(`article.${cat}`, this.article[cat] || {})
      this.set(`article.${cat}.${id}`, this.article[cat][id] || {})
      this.set(`article.${cat}.${id}.value`, true)

      if (parent) {
        this.shadowRoot.querySelector(`paper-toggle-button[data-key=${parent}]`).checked = true
      }
    } else {
      this.set(`article.${cat}.${id}.value`, false)
      // this.article[cat][id].value = false
    }
  }

  _edit () {
    this.preview = false
  }

  _preview () {
    this.preview = true
  }

  _toggleCategory (cat, sub) {
    return this.article && this.article[cat] && this.article[cat][sub] && this.article[cat][sub].value
  }

  _uploadBannerImage (e) {
    var el = e.target
    var files = el.inputElement.files || el.inputElement.inputElement.files
    if (files.length) {

      var file = files[0];

      if (firebase) {
        var path = `v2/${this.type}/list/image`
        var key = firebase.database().ref(path).push().key
        this._bannerImageTask = firebase.storage().ref(path).child(`${key}--${file.name}`).put(file);
        this._bannerImageTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          this._uploadTask.bind(this, 'bannerImageProgress'),
          this._onError.bind(this),
          () => {
            this.set('bannerImageProgress', 99.99);
            // console.log(this._bannerImageTask.snapshot.downloadURL)
            this.set('article.bannerImage', this._bannerImageTask.snapshot.downloadURL);
            setTimeout(() => {
              this.set('bannerImageProgress', 0)
              // this._bannerImageTask = null
            }, 100);
          }
        )
      }
    }
  }

  _uploadFiles (e) {
    var el = e.target
    var type = el.getAttribute('db-type')
    var files = el.inputElement.files || el.inputElement.inputElement.files
    var path = `v2/${type}/data`

    if (files.length) {
      if (firebase) {
        this[`_${type}Tasks`] = []
        // this._imageTasks = []

        for (var i=0; i < files.length; i++) {
          var file = files[i]
          var progressPath = `_${type}Tasks.${i}.progress`
          var key = firebase.database().ref(path).push().key
          var task = firebase.storage().ref(path).child(`${key}--${file.name}`).put(file, {
            cacheControl: 'no-cache'
          })
          this.push(`_${type}Tasks`, {
            task,
            name: file.name,
            progress: 1
          })

          task.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            this._uploadTask.bind(this, progressPath),
            this._onError.bind(this),
            function(t, p, k, j, n) {
              var updates = {}

              this.set(p, 99.99);
              // var metadata = m ? m : {};
              // console.log(t.snapshot.metadata)
              var metadata = {
                cacheControl: t.snapshot.metadata.cacheControl,
                contentType: t.snapshot.metadata.contentType
              }

              updates[`${path}/${k}`] = {
                downloadURL: t.snapshot.downloadURL,
                storagePath: t.snapshot.ref.fullPath,
                name: n,
                metadata,
                type: this.type
              }

              updates[`v2/${this.type}/list/${type}/${this.articleId}/${k}/value`] = true
              firebase.database().ref().update(updates).then(() => {
                this.set(p, 0)
              })
              if (j === files.length - 1) {
                el.value = null;
              }
            }.bind(this, task, progressPath, key, i, file.name)
          )
        }
      }
    }
  }

  _uploadTask (progressPath, snapshot) {
    var val = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    this.set(progressPath, val ? val : 0.01);
  }

  _publish (e) {
    var el = e.target
    var published = el.checked
    var updates = {}
    var path = `v2/${this.type}/`

    this._save().then(() => {
      if (published) {
        if (this.article.categoryMain) {
          for (var i in this.article.categoryMain) {
            if (this.article.categoryMain[i] && this.article.categoryMain[i].value) {
              updates[`${path}/query/${i}/${this.articleId}/value`] = this.article.datePublished
            } else {
              updates[`${path}/query/${i}/${this.articleId}/value`] = null
            }
          }
        }


        if (this.article.categorySub) {
          for (var j in this.article.categorySub) {
            if (this.article.categorySub[j] && this.article.categorySub[j].value) {
              updates[`${path}/query/${j}/${this.articleId}/value`] = this.article.datePublished
            } else {
              updates[`${path}/query/${j}/${this.articleId}/value`] = null
            }
          }
        }

        if (this.article.type && this.article.type.farmer && this.article.type.farmer.value) {
          updates[`${path}/query/farmer/${this.articleId}/value`] = this.article.datePublished
        } else {
          updates[`${path}/query/farmer/${this.articleId}/value`] = null
        }
      } else {
        for (var i in this.article.categoryMain) {
          updates[`${path}/query/${i}/${this.articleId}/value`] = null
        }

        for (var j in this.article.categoryMain) {
          updates[`${path}/query/${j}/${this.articleId}/value`] = null
        }

        updates[`${path}/query/farmer/${this.articleId}/value`] = null
      }
    })

  }

  _save () {
    var updates = {}
    var promises = []
    var path = `v2/${this.type}/data/${this.articleId}`
    updates[`${path}/title`] = this.article.title
    updates[`${path}/summary`] = this.article.summary
    updates[`${path}/bannerImage`] = this.article.bannerImage
    updates[`${path}/body`] = this.article.body
    updates[`${path}/published`] = this.article.published
    for (var i in this.article.categoryMain) {
      updates[`${path}/categoryMain/${i}/value`] = this.article.categoryMain[i].value ? true : null
    }

    for (var j in this.article.categorySub) {
      updates[`${path}/categorySub/${j}/value`] = this.article.categorySub[j].value ? true : null
    }

    var images = this.shadowRoot.querySelectorAll('nice-image-form')
    if (images && images.length) {
      images.forEach(image => {
        if (image._save) {
          promises.push(image._save())
        }
      })
    }

    var files = this.shadowRoot.querySelectorAll('nice-file-form')
    if (files && files.length) {
      files.forEach(file => {
        if (file._save) {
          promises.push(file._save())
        }
      })
    }

    promises.push(firebase.database().ref().update(updates))

    return Promise.all(promises)

    // for (var k in this.articleImages) {
    //   // var imagePath = `v2/image/data/${this.articleImages[k].$key}`
    //   // updates[`${imagePath}/name`] =
    // }
  }

  _isEqual(a, b) {
    return a === b
  }
}

customElements.define(NiceArticleForm.is, NiceArticleForm)