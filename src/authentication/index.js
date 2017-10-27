import { store } from '../../core/shell/state.js'

const getRoleNumber = (role) => {
  if (role === 'admin') return 1
  if (role === 'editor') return 2
  if (role === 'staff') return 3
  if (role === 'member') return 4
  if (role === 'pending') return 5
  return 100
}

export default {
  checkRole: (self) => {
    const main = store.getState().main
    if (self.params) {
      if (self.params.edit === 'edit') {
        return main && main.permission && main.user && getRoleNumber(main.permission.role) < 4
      }
      return true
    }
    return true
  },

  checkOwner: (self) => {
    const main = store.getState().main

    if (self.params) {
      if (self.params.edit === 'edit') {
        return main && main.permission && main.user && main.user.uid === self.params.id
      }
      return true
    }
    return true
  },
  
  checkMember: (self) => {
    const main = store.getState().main
    
    if (main && main.user) {
      if (self.params) {
        if (self.params.edit === 'edit') {
          return main && main.permission && main.user && main.user.uid === self.params.id
        }
        return main && main.permission && main.user && getRoleNumber(main.permission.role) < 5
      }
    } 
    return false;
  },
  
  checkStaff: (self) => {
    const main = store.getState().main
    
    if (main && main.user) {
      if (main && main.permission) console.log(getRoleNumber(main.permission.role))
      return main && main.permission && main.user && getRoleNumber(main.permission.role) < 4
      
    } 
    return false;
  },
  
  checkEditor: (self) => {
    const main = store.getState().main
    
    if (main && main.user) {

      return main && main.permission && main.user && getRoleNumber(main.permission.role) < 3
      
    } 
    return false;
  },
  
  checkAdmin: (self) => {
    const main = store.getState().main
    
    if (main && main.user) {

      return main && main.permission && main.user && getRoleNumber(main.permission.role) < 2
      
    } 
    return false;
  },

  exampleAuthentication: () => {
    // returns a 'falsy' value, which means the user is not authenticated
    return false
  }
}
