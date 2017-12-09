# hyperapp-starterkit

> Reusable app logic to kickstart developing

## Install

```
npm i @whaaaley/hyperapp-starterkit
```

## Usage

### Cake

Store any slice on demand.

```js
import { app } from 'hyperapp'
import { Cake } from 'hyperapp-starterkit'

app({
  state: {
    Cake: Cake.state
  },
  actions: {
    Cake: Cake.actions
  }
})
```

Store a slice.

```js
actions.Cake.add({ foo: 'bar' })
// => { state: { Cake: { foo: 'bar' } } }
```

Grab a slice.

```js
state.Cake.foo
// => 'bar'
```

### Overlay

Manage state of all overlay elements.

```js
import { app } from 'hyperapp'
import { Overlay } from 'hyperapp-starterkit'

const hyperapp = app({
  state: {
    Overlay: Overlay.state
  },
  actions: {
    Overlay: Overlay.actions
  }
})

window.addEventListener('click', e => {
  hyperapp.Overlay.blur(e)
})
```

Add the `_overlay` class to overlay toggles to allow swapping overlays without having to blur (off click) beween swapping.

Use `stopPropagation` to do the thing.

Use the `toggle` action with the name of the overlay to toggle it's visibility.

```js
h('div', {
  class: '_overlay'
  onclick (e) {
    e.stopPropagation()
    data.toggle(data.name)
  }
}, 'Menu')
```

### Router

Minimal hash router.

```js
import { app } from 'hyperapp'
import { Router } from 'hyperapp-starterkit'

const hyperapp = app({
  state: {
    Router: Router.state
  },
  actions: {
    Router: Router.actions
  }
})

hyperapp.Router.init()

window.addEventListener('hashchange', e => {
  hyperapp.Router.init()
})
```

Use a router view function using the current path to change the view.

```js
const RouterView = data => ({
  '': Home,
  '/about': About,
  '/contact': Contact,
  '/dashboard': Dashboard
})[data.path] || NotFound
```
