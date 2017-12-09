
import { encode, decode } from '@whaaaley/query-string'

var Router = {
  state: {},
  actions: {
    init: function () {
      var hash = window.location.hash
      var index = hash.indexOf('?')
      return {
        query: decode(hash.slice(index)),
        path: hash.slice(1, index === -1 ? hash.length : index)
      }
    },
    route: function (data) {
      return function (state) {
        window.location.hash = (data.path || state.path) + encode(data.query || state.query)
      }
    }
  }
}

export { Router }
