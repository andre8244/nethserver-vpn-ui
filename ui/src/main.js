/*
 * Copyright (C) 2019 Nethesis S.r.l.
 * http://www.nethesis.it - nethserver@nethesis.it
 *
 * This script is part of NethServer.
 *
 * NethServer is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License,
 * or any later version.
 *
 * NethServer is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with NethServer.  If not, see COPYING.
 */

import Vue from "vue";
import VueI18n from "vue-i18n";
import Router from "vue-router";

import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
Vue.component("v-select", vSelect);

import VueToggleButton from "vue-js-toggle-button";
Vue.use(VueToggleButton);

import VueGoodTable from "vue-good-table";
Vue.use(VueGoodTable);

import DocInfo from "./components/DocInfo.vue";
Vue.component("doc-info", DocInfo);

import App from "./App.vue";
import Dashboard from "./views/Dashboard.vue";
import IPSec from "./views/IPSec.vue";
import OpenVPNTun from "./views/OpenVPNTun.vue";
import OpenVPNRW from "./views/OpenVPNRW.vue";
import Logs from "./views/Logs.vue";
import About from "./views/About.vue";

import "./filters";

import UtilService from "./services/util";
Vue.mixin(UtilService);

import VTooltip from "v-tooltip";
Vue.use(VTooltip);

Vue.config.productionTip = false;

Vue.directive("focus", {
  inserted: function(el) {
    el.focus();
  }
});

Vue.use(VueI18n);
const i18n = new VueI18n();

Vue.use(Router);
const router = new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/dashboard"
    },
    {
      path: "/dashboard",
      component: Dashboard
    },
    {
      path: "/ipsec",
      component: IPSec
    },
    {
      path: "/openvpn-tun",
      component: OpenVPNTun
    },
    {
      path: "/openvpn-rw",
      component: OpenVPNRW
    },
    {
      path: "/logs",
      component: Logs
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

var app = new Vue({
  i18n,
  router,
  render: h => h(App)
});

nethserver.fetchTranslatedStrings(function(data) {
  i18n.setLocaleMessage("cockpit", data);
  i18n.locale = "cockpit";
  app.$mount("#app"); // Start VueJS application
});
