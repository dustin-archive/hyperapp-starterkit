# @whaaaley/hyperapp-starterkit

> Reusable app logic to kickstart developing

## Legend

+ [Install](#install)
+ [Usage](#usage)
  + [Stash](#stash)
    + [Stash Installation](#stash-installation)
    + [Stash Usage](#stash-usage)
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

### Stash

> Store a state slice on demand.

Stash is place to store arbitrary information.
This is great for rapid development or debugging!
If it's temporary or if you just don't know where it should go, add it to `Stash`.

#### Stash Installation

Installing the stash action is very easy.
This example contains everything you need to install it.

```js
import { app } from 'hyperapp'
import { Stash } from 'hyperapp-starterkit'

const state = {
  Stash: {}
}

const actions = {
  Stash
}

// ...

app(state, actions, view)
```

#### Stash Usage

Everything you add is saved to the `Stash` state object.
Add and retrieve state like this.

```js
actions.Stash.add({ foo: 'bar' })
// => { state: { Stash: { foo: 'bar' } } }

state.Stash.foo
// => 'bar'
```

### Overlay

> Manage state of overlay elements.

Overlay is a manager for things like drop-downs, menus, modals, etc.
Anything that you click on to open and click away to close should be managed here.
Managing all overlays in a single place ensures that only one overlay is ever opened at any time.
It also allows you to programmatically open and close any overlay from anywhere.
This is awesome when creating complex user flows or live tutorials that demonstrate how to use an app by opening overlays for the user.

#### Overlay Installation

Installing the overlay manager is easy and follows the usual patterns.
This example contains everything you need to install it.

```js
import { app } from 'hyperapp'
import { Overlay } from 'hyperapp-starterkit'

const state = {
  Overlay: {}
}

const actions = {
  Overlay
}

// ...

const main = app(state, actions, view)

window.addEventListener('click', e => {
  main.Overlay.blur(e)
})
```

#### Overlay Usage

Using the overlay manager requires a small amount of work in userland.

+ Add an `_overlay` class to all overlay toggles.
  + Without this class, switching between overlays will force the user to blur (off click) between switching.
+ Use `stopPropagation` to do the thing.
  + [Learn more about `stopPropagation` here.](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation)
+ Use the `toggle` action with a unique id, such as the overlay's name, to toggle it.
+ Check the overlay state to control your views.

```js
const menuClasses = overlay =>
  overlay === 'menu'
    ? '_overlay -visible'
    : '_overlay'

const view = (state, actions) =>
  h('div', {
    class: menuClasses(state.Overlay.overlay),
    onclick (e) {
      e.stopPropagation()
      actions.Overlay.toggle('menu')
    }
  }, 'Menu')
```

### Router

> Minimal hash router.

Routers are great! This one is extra simple and comes with paths and query strings only! Use this router to get a simple SPA up and running. It doesn't come with anything fancy and you have to create the router view yourself. You can't get more barebones than this.

#### Router Installation

Installing the router is easy and follows the usual patterns.
The `init` action optionally accepts a callback that passes in the current router state object.
This example contains everything you need to install the router.

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

const main = app(state, actions, view)

main.Router.init()

window.addEventListener('hashchange', e => {
  main.Router.init()
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

Path and query state can be updated manually in the address bar or with an anchor tag and `href`.
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

+ Add the Google Analytics library in your HTML.
+ Create the connection using your Google Analytics tracking ID.
+ Create a callback function for router's `init` using the Google Analytics library to send the current path.

```html
<script src='https://www.google-analytics.com/analytics.js'></script>
```

```js
// ...

window.ga('create', 'UA-XXXXXXXXX-X', 'auto')

const googleAnalytics = data => {
  window.ga('send', 'pageview', data.path)
}

main.Router.init(googleAnalytics)

window.addEventListener('hashchange', e => {
  main.Router.init(googleAnalytics)
})
```

## Compatibility
| starterkit     | hyperapp       |
| :------------- | :------------- |
| 0.3.0          | 0.18.x         |
| 0.2.0          | 0.16.x         |
| 0.1.0          | 0.16.x         |
