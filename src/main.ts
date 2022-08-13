import { createApp } from "vue";
import { createPinia } from "pinia";
import VeeValidatePlugin from "./utils/validation";
import { auth } from "./utils/firebase";
import App from "./App.vue";
import router from "./router";

import "./assets/base.css";
import "./assets/main.css";

let app: App;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(VeeValidatePlugin);

    app.mount("#app");
  }
});
