
import { encode, decode } from '@whaaaley/query-string'

var Router = {
  init: function () {
    var hash = window.location.hash
    var index = hash.indexOf('?')
    return {
      query: decode(hash.slice(index)),
      path: hash.slice(1, index === -1 ? hash.length : index)
    }
  },
  route: function (data) {
    return function (model) {
      window.location.hash = (data.path || model.state.path) + encode(data.query || model.state.query)
    }
  }
}

export { Router }
