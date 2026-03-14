import { onRequest as __api_dns_js_onRequest } from "D:\\Expense Tracker\\functions\\api\\dns.js"
import { onRequest as __api_github_auth_js_onRequest } from "D:\\Expense Tracker\\functions\\api\\github-auth.js"
import { onRequest as __api_receive_js_onRequest } from "D:\\Expense Tracker\\functions\\api\\receive.js"
import { onRequest as __api_send_js_onRequest } from "D:\\Expense Tracker\\functions\\api\\send.js"

export const routes = [
    {
      routePath: "/api/dns",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_dns_js_onRequest],
    },
  {
      routePath: "/api/github-auth",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_github_auth_js_onRequest],
    },
  {
      routePath: "/api/receive",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_receive_js_onRequest],
    },
  {
      routePath: "/api/send",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_send_js_onRequest],
    },
  ]