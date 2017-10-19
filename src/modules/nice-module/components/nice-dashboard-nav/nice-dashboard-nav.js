import 'polymer/polymer.html'
import './nice-dashboard-nav.html'

class NiceDashboardNav extends Polymer.Element {
  static get is () { return 'nice-dashboard-nav' }
}

customElements.define(NiceDashboardNav.is, NiceDashboardNav)