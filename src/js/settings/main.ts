import "../assets/styles/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./main.vue";
import { initBolt } from "../lib/utils/bolt";

initBolt();

const app = createApp(App);

app.use(createPinia());

app.mount("#root");
