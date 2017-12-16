
var Overlay = {
  init: function (data) {
    return function (model) {
      if (!data.target.classList.contains('_overlay') && model.state.overlay != null) {
        return { overlay: null }
      }
    }
  },
  toggle: function (data) {
    return function (model) {
      return { overlay: model.state.overlay === data ? null : data }
    }
  }
}

export { Overlay }
