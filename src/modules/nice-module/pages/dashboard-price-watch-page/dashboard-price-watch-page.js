import 'polymer/polymer.html'
import '../../components/nice-footer/nice-footer.js'
import '../../components/nice-dashboard-nav/nice-dashboard-nav.js'
import '../../components/price-watch-v1/price-watch-form.html'
import './dashboard-price-watch-page.html'

class DashboardPage extends Polymer.Element {
  static get is () { return 'dashboard-price-watch-page' }
  
  reload () {
    document.title = `Project NICE | Dashboard for Price Watch Pages`
  }
}

customElements.define(DashboardPage.is, DashboardPage)