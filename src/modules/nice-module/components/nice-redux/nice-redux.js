import PolymerRedux from 'polymer-redux'
import navList from './nav-list'
import { createStore } from 'redux'

const initial = {
  navList
}

const reducer = (state, action) => {
  switch(action.type) {
    default:
      return state
  }
}

const store = createStore(reducer, initial)

export default PolymerRedux(store)