import algoliasearch from 'algoliasearch';
import 'polymer/polymer.html'
import 'paper-fab/paper-fab.html'
import 'paper-button/paper-button.html'
import 'paper-input/paper-input.html'
import '../../components/nice-icon/nice-icon.html'
import '../../components/nice-footer/nice-footer.js'
import '../../components/nice-list/nice-list.js'
import '../../components/nice-list-two/nice-list-two.js'
import '../../components/nice-article/nice-article.js'
import '../../components/nice-story-nav/nice-story-nav.js'
import '../../components/nice-article-form/nice-article-form.js'
import Permission from '../../components/permission-model/permission-model.js'
import User from '../../components/user-model/user-model.js'
import './story-page.html'

const client = algoliasearch("KPABG9X1BC", "67ce428bbd3db7a52768cd22ce4d995c");
const index = client.initIndex('nice_articles')

class StoryPage extends Permission(User(Polymer.Element))  {
  static get is () { return 'story-page' }
  
  static get properties () {
    return {
      query: {
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
      '_checkFilter(queryParams.category, queryParams.subcategory, queryParams.type)'
    ]
  }

  _checkEdit (edit) {
    return edit === 'edit'
  }
  
  _checkFilter (categoryMain, categorySub, type) {
    // console.log(year, researchInstitution)
    if (categoryMain || categorySub || type) {
      this.search();
    } else if (!this.query) {
      this.resetSearch();
    }
  }
  
  search () {
    var filters = ['model:story', 'published:true'];
    
    if (this.queryParams) {
      if (this.queryParams.category) {
        filters.push(`categoryMain:${this.queryParams.category}`)  
      }
      
      if (this.queryParams.subcategory) {
        filters.push(`categorySub:${this.queryParams.subcategory}`)  
      }
      
      if (this.queryParams.type) {
        filters.push(`types:${this.queryParams.type}`)  
      }
    }
    
    // console.log(filters)
    
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

customElements.define(StoryPage.is, StoryPage)