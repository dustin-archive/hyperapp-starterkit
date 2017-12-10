# hyperapp-starterkit

> Reusable app logic to kickstart developing

## Install

```
npm i @whaaaley/hyperapp-starterkit
```

## Usage

### Cake

Store any slice on demand.

**Cake Installation**

```js
import { app } from 'hyperapp'
import { Cake } from 'hyperapp-starterkit'

app({
  state: {
    Cake: {}
  },
  actions: {
    Cake
  },
  // ...
})
```

**Cake Usage**

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

**Overlay Installation**

```js
import { app } from 'hyperapp'
import { Overlay } from 'hyperapp-starterkit'

const hyperapp = app({
  state: {
    Overlay: {}
  },
  actions: {
    Overlay
  },
  // ...
})

window.addEventListener('click', e => {
  hyperapp.Overlay.blur(e)
})
```

**Overlay Usage**

Add an `_overlay` class to all overlay toggles. Without this class switching between overlays will force the user to blur (off click) between switching.

[Use `stopPropagation` to do the thing.](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation)

Use the `toggle` action with a unique id, such as the overlay's name, to toggle it's visibility.

```js
h('div', {
  class: '_overlay'
  onclick (e) {
    e.stopPropagation()
    actions.Overlay.toggle(data.name)
  }
}, 'Menu')
```

### Router

Minimal hash router.

**Router Installation**

```js
import { app } from 'hyperapp'
import { Router } from 'hyperapp-starterkit'

const hyperapp = app({
  state: {
    Router: {}
  },
  actions: {
    Router
  },
  // ...
})

hyperapp.Router.init()

window.addEventListener('hashchange', e => {
  hyperapp.Router.init()
})
```

**Router Usage**

Use a router view function and the current path to change the view.

```js
const RouterView = path => ({
  '': Home,
  '/about': About,
  '/contact': Contact,
  // ...
})[path] || NotFound

app({
  // ...
  view: () => state => RouterView(state.Router.path)
})
```

You can programmatically set path and encode query strings using the `route` action.

Path and queries can also be updated externally.

```js
actions.Router.route({
  path: '/about',
  query: {
    fuzzy: 'wuzzy',
    was: 'a',
    bear: 'fuzzy',
    wuzzy: 'had',
    no: 'hair'
  }
})
// => http://localhost:3000/#/about?fuzzy=wuzzy&was=a&bear=fuzzy&wuzzy=had&no=hair
```

You can access path and decoded query strings via Router's state.

```js
// http://localhost:3000/#/about?fuzzy=wuzzy&was=a&bear=fuzzy&wuzzy=had&no=hair

state.Router.path
// => /about

state.Router.query
// => { fuzzy: 'wuzzy', was: 'a', bear: 'fuzzy', wuzzy: 'had', no: 'hair' }
```

### Compatibility
| starterkit     | hyperapp       |
| :------------- | :------------- |
| 0.3.0          | 0.16.2         |
| 0.2.0          | 0.16.0         |
| 0.1.0          | 0.16.0         |
