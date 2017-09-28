import PolymerRedux from 'polymer-redux'
import navList from './nav-list'
import { createStore } from 'redux'

const initial = {
  navList
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'UPDATE_PROFILE':
      return Object.assign({}, state, {
        profile: action.profile
      })
    case 'UPDATE_PERMISSION':
      return Object.assign({}, state, {
        permission: action.permission
      })
    case 'UPDATE_USER':
      return Object.assign({}, state, {
        user: action.user
      })
    default:
      return state
  }
}

const store = createStore(reducer, initial)

export default PolymerRedux(store)
export { store }