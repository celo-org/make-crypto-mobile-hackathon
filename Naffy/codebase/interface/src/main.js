import Vue from "vue"
import App from "./App.vue"
import { web3 } from "./helpers/web3"
import { events } from "./helpers/events"
import { store } from "./store"
import { router } from "./router"
import Toastr from "vue-toastr"
import Clipboard from "vue-clipboard2"

import "bootstrap/dist/js/bootstrap.bundle.js"
import "bootstrap/dist/css/bootstrap.min.css"
import "./main.css"

Vue.config.productionTip = false

Vue.use(Toastr)
Vue.use(Clipboard)

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `Naffy - ${to.meta.title}` : "Naffy - Decentralized and transparent creator support platform"

  next()
})

if (store.state.wallet && store.state.wallet !== "null") {
  web3.connect(store.state.wallet).then(async () => {
    events.providerEvents(window.provider)
    new Vue({ router, store, render: (h) => h(App) }).$mount("#app")
  })
} else {
  new Vue({ router, store, render: (h) => h(App) }).$mount("#app")
}
