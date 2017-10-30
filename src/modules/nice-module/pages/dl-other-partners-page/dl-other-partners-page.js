import algoliasearch from 'algoliasearch';
import 'polymer/polymer.html'
import 'paper-fab/paper-fab.html'
import 'paper-button/paper-button.html'
import 'paper-input/paper-input.html'
import '../../components/nice-footer/nice-footer.js'
import '../../components/nice-list/nice-list.js'
import '../../components/nice-list-two/nice-list-two.js'
import '../../components/nice-article/nice-article.js'
import '../../components/nice-article-form/nice-article-form.js'
import '../../components/nice-dl-nav/nice-dl-nav.js'
import '../../components/nice-dl-row/nice-dl-row.js'
import Permission from '../../components/permission-model/permission-model.js'
import User from '../../components/user-model/user-model.js'
import './dl-other-partners-page.html'

const client = algoliasearch("KPABG9X1BC", "67ce428bbd3db7a52768cd22ce4d995c");
const index = client.initIndex('nice_articles')

class DlOtherPartnersPage extends Permission(User(Polymer.Element))  {
  static get is () { return 'dl-other-partners-page' }

  static get properties () {
    return {
      params: {
        type: Object,
        value: {
          query: 'published'
        }
      },
      query: {
        type: String
      },
      year: {
        type: Number
      },
      researchInstitution: {
        type: String
      },
      searchObj: {
        type: Object,
        value: null
      },
      searchResults: {
        type: Array,
        value: []
      }
    }
  }

  static get observers () {
    return [
      '_checkEdit(edit)',
      '_checkFilter(year, researchInstitution)'
    ]
  }
  
  reload () {
    document.title = `Project NICE | Digital Libraries from Other Partners`
  }

  _checkEdit (edit) {
    return edit === 'edit'
  }
  
  _checkFilter (year, researchInstitution) {
    // console.log(year, researchInstitution)
    if (year || researchInstitution) {
      this.search();
    } else if (!this.query) {
      this.resetSearch();
    }
  }
  
  search () {
    var filters = ['model:dl', 'published:true', 'types:otherpartners'];
    
    if (this.year) {
      filters.push(`year:${this.year}`)
    }
    
    if (this.researchInstitution) {
      filters.push(`researchInstitution:${this.researchInstitution}`)
    }
    
    var searchObj = {
      query: this.query,
      attributesToRetrieve: ['title', 'model'],
      hitsPerPage: 100,
      filters: filters.join(' AND ')
    }
    this.searchObj = searchObj;
    
    index.search(this.searchObj, (err, content) => {
      if (err) return console.error(err);
      var list = [];
      content.hits.forEach(item => {
        var obj = item;
        obj.$key = item.objectID;
        obj.type = item.model
        list.push(obj)
      })
      // console.log(list)
      this.searchResults = list
    })
  }
  
  resetSearch () {
    this.searchObj = null;
    this.query = '';
    this.year = '';
    this.researchInstitution = '';
    this.searchResults = [];
  }
  
  addItem () {
    var updates = {}
    var path = `v2/dl`
    var key = firebase.database().ref(`${path}/data`).push().key
    updates[`${path}/data/${key}/title`] = 'Title'
    updates[`${path}/data/${key}/summary`] = ''
    updates[`${path}/data/${key}/bannerImage`] = ''
    updates[`${path}/data/${key}/body`] = ''
    updates[`${path}/data/${key}/published`] = false
    updates[`${path}/data/${key}/datePublished`] = firebase.database.ServerValue.TIMESTAMP
    updates[`${path}/query/draft/${key}/value`] = firebase.database.ServerValue.TIMESTAMP
    
    return firebase.database().ref().update(updates).then(() => {
        document.querySelector('app-shell').showMessage('Created a Research Article', null, null, null, 5000)
        window.history.pushState({}, '', `dl/${key}/edit`)
        window.dispatchEvent(new CustomEvent('location-changed'))
        return Promise.resolve()
      }).catch(this._onError.bind(this))
  }
}

customElements.define(DlOtherPartnersPage.is, DlOtherPartnersPage)