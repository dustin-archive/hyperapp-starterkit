# hyperapp-starterkit

> Reusable app logic to kickstart developing

## Install

```
npm i @whaaaley/hyperapp-starterkit
```

## Usage

### Cake

```js
import { h, app } from 'hyperapp'
import { Cake } from 'hyperapp-starterkit'

app({
  state: {
    Cake: Cake.state
  },
  actions: {
    Cake: Cake.actions
  },
  view: function (state, actions) {
    return h('button', {
      onclick: function () {
        actions.Cake.add({
          foo: 'bar'
        })
      }
    }, state.Cake.foo)
  }
})
```

### Overlay

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

hyperapp.Overlay.init()
```

### Router

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
```
