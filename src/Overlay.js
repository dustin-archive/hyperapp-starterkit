var Overlay = {
  state: {},
  actions: {
    init: function (s, actions) {
      var reset = actions.reset
      window.addEventListener('click', function (e) {
        !e.target.classList.contains('_overlay') && reset()
      })
    },
    reset: function () {
      return {
        overlay: null
      }
    },
    toggle: function (state) {
      return function (data) {
        return {
          overlay: state.overlay === data ? null : data
        }
      }
    }
  }
}

export { Overlay }
