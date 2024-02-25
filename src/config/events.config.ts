const events = {
  auth: {
    loggedIn: "auth/loggedIn",
    loggedOut: "auth/loggedOut",
    logoutCurrentUser: "auth/logoutCurrentUser",
  },
  notification: {
    showNotification: "notification/showNotification",
  },
  router: {
    routerPush: "router/routerPush",
  },
  test: {
    broadcast: "test/broadcast",
  },
} as const;

export default events;
