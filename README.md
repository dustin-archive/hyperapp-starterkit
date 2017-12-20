# @whaaaley/hyperapp-starterkit

> Reusable app logic to kickstart developing

## Legend

+ [Install](#install)
+ [Usage](#usage)
  + [Cake](#cake)
    + [Cake Installation](#cake-installation)
    + [Cake Usage](#cake-usage)
  + [Overlay](#overlay)
    + [Overlay Installation](#overlay-installation)
    + [Overlay Usage](#overlay-usage)
  + [Router](#router)
    + [Router Installation](#router-installation)
    + [Router Usage](#router-usage)
      + [Map Paths to Views](#map-paths-to-views)
      + [Change Route](#change-route)
      + [Google Analytics](#google-analytics)
+ [Compatibility](#compatibility)

## Install

```
npm i @whaaaley/hyperapp-starterkit
```

## Usage

### Cake

Store any slice on demand.

#### Cake Installation

```js
import { app } from 'hyperapp'
import { Cake } from 'hyperapp-starterkit'

const model = {
  state: {
    Cake: {}
  },
  actions: {
    Cake
  }
}

// ...

app(model, view)
```

#### Cake Usage

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

#### Overlay Installation

```js
import { app } from 'hyperapp'
import { Overlay } from 'hyperapp-starterkit'

const model = {
  state: {
    Overlay: {}
  },
  actions: {
    Overlay
  }
}

// ...

const hyperapp = app(model, view)

window.addEventListener('click', e => {
  hyperapp.Overlay.blur(e)
})
```

#### Overlay Usage

Add an `_overlay` class to all overlay toggles. Without this class switching between overlays will force the user to blur (off click) between switching.

[Use `stopPropagation` to do the thing.](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation)

Use the `toggle` action with a unique id, such as the overlay's name, to toggle it's visibility.

```js
h('div', {
  class: '_overlay'
  onclick (e) {
    e.stopPropagation()
    actions.Overlay.toggle('menu')
  }
}, 'Menu')
```

### Router

Minimal hash router.

#### Router Installation

Installing the router is very easy and follows the usual patterns.
The `init` action optionally accepts a callback that passes in the current router state object.
This examples shows everything you need to install the router.

```js
import { app } from 'hyperapp'
import { Router } from 'hyperapp-starterkit'

const state = {
  Router: {}
}

const actions = {
  Router
}

// ...

const hyperapp = app(state, actions, view)

hyperapp.Router.init()

window.addEventListener('hashchange', e => {
  hyperapp.Router.init()
})
```

#### Router Usage

##### Map Paths to Views

There's no built-in way to change your view based on the current path.
The reccomended way to change your view is to create a "router view" function similar to the following example.
It's incredibly simple and it gets the job done!
As your app grows in complexity you may want to opt for a more featured router library, but simple is often enough!

```js
import { h, app } from 'hyperapp'

// ...

const Home = h('div', null, 'Home')
const About = h('div', null, 'About')
const Contact = h('div', null, 'Contact')
const NotFound = h('div', null, '404')

const RouterView = path => ({
  '': Home,
  '/about': About,
  '/contact': Contact
})[path] || NotFound

const view = d => state => RouterView(state.Router.path)

app(state, actions, view)

// ...
```

##### Change Route

Path and query can be updated manually in the address bar or with an anchor tag and `href`.
You can also programmatically set the path and encode query strings using the `route` action.
State will always reflect changes assuming you've installed the router corrrectly.

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

state.Router.path
// => /about

state.Router.query
// => { fuzzy: 'wuzzy', was: 'a', bear: 'fuzzy', wuzzy: 'had', no: 'hair' }
```

#### Google Analytics

Adding Google Analytics to this router is easy peasy.
Add the Google Analytics library in your HTML and create the connection using your Google Analytics ID.
Create a function using the library that sends the current path to Google Analytics and pass it to the router's `init` function.

```html
<script src='https://www.google-analytics.com/analytics.js'></script>
```

```js
// ...

window.ga('create', 'UA-XXXXXXXXX-X', 'auto')

const googleAnalytics = data => {
  window.ga('send', 'pageview', data.path)
}

hyperapp.Router.init(googleAnalytics)

window.addEventListener('hashchange', e => {
  hyperapp.Router.init(googleAnalytics)
})
```

## Compatibility
| starterkit     | hyperapp       |
| :------------- | :------------- |
| 0.3.0          | 0.18.x         |
| 0.2.0          | 0.16.x         |
| 0.1.0          | 0.16.x         |
