
var Cake = {
  state: {},
  actions: {
    add: function (data) {
      return function (state) {
        return data
      }
    }
  }
}

export { Cake }
