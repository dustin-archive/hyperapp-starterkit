
var Overlay = {
  init: function (data) {
    return function (state) {
      if (!data.target.classList.contains('_overlay') && state.overlay != null) {
        return { overlay: null }
      }
    }
  },
  toggle: function (data) {
    return function (state) {
      return { overlay: state.overlay === data ? null : data }
    }
  }
}

export { Overlay }
