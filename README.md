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

hyperapp.Overlay.init()
```

### Router

Minimalistic hash router logic.

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
