import algoliasearch from 'algoliasearch';
import 'polymer/polymer.html'
import 'paper-fab/paper-fab.html'
import 'paper-button/paper-button.html'
import 'paper-input/paper-input.html'
import '../../components/nice-footer/nice-footer.js'
import '../../components/nice-community-nav/nice-community-nav.js'
import '../../components/nice-user-list/nice-user-list.js'
import '../../components/nice-user-list-two/nice-user-list-two.js'
import '../../components/nice-user/nice-user.js'
import '../../components/nice-user-form/nice-user-form.js'
import User from '../../components/user-model/user-model.js'
import Permission from '../../components/permission-model/permission-model.js'
import './community-page.html'

const client = algoliasearch("0M86UIGKEC", "c185f46b9b8fd9e6de36ddbb214976de");
const index = client.initIndex('nice_articles')

class CommunityPage extends Permission(User(Polymer.Element)) {
  static get is () { return 'community-page' }
  
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
  
  reload () {
    document.title = `Project NICE | Community`
  }

  static get observers () {
    return [
      '_checkTos(user.uid, permission.role, profile, profile.agree)',
      '_checkFilter(queryParams.category)'
    ]
  }

  _checkEdit (edit) {
    return edit === 'edit'
  }

  _checkTos (user, role, profile, agree) {
    if (user && role) {
      if (!this._checkRole(user, role, 'member')) {
        if (profile && !agree) {
        
          window.history.pushState({}, '', '/community/' + this.user.uid + '/edit')
          window.dispatchEvent(new CustomEvent('location-changed'))
        } else {
          window.history.pushState({}, '', '/community/' + this.user.uid)
          window.dispatchEvent(new CustomEvent('location-changed'))
        }
      } else if (profile && !agree) {
        window.history.pushState({}, '', '/community/' + this.user.uid + '/edit')
        window.dispatchEvent(new CustomEvent('location-changed'))
      }
    }
  }
  
  _checkFilter (userType) {
    // console.log(year, researchInstitution)
    if (userType) {
      this.search();
    } else if (!this.query) {
      this.resetSearch();
    }
  }
  
  search () {
    var filters = ['model:user', '(role:admin OR role:member OR role:staff OR role:editor)'];
    
    if (this.queryParams) {
      if (this.queryParams.category) {
        filters.push(`userType:${this.queryParams.category}`)  
      }
      
      // if (this.queryParams.subcategory) {
      //   filters.push(`categorySub:${this.queryParams.subcategory}`)  
      // }
      
      // if (this.queryParams.type) {
      //   filters.push(`types:${this.queryParams.type}`)  
      // }
    }
    
    console.log(filters)
    
    var searchObj = {
      query: this.query,
      attributesToRetrieve: ['firstName', 'model'],
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
      console.log(list)
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
}

customElements.define(CommunityPage.is, CommunityPage)