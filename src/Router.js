
import { encode, decode } from '@whaaaley/query-string'

var Router = {
  init: function (data) {
    var hash = window.location.hash
    var index = hash.indexOf('?')
    var state = {
      query: decode(hash.slice(index)),
      path: hash.slice(1, index === -1 ? hash.length : index)
    }
    data && data(state)
    return state
  },
  route: function (data) {
    return function (state) {
      window.location.hash = (data.path || state.path) + encode(data.query || state.query)
    }
  }
}

export { Router }
