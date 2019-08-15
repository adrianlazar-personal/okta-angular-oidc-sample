// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  BASE_URL: 'https://adrian.oktapreview.com',
  ISSUER: 'https://adrian.oktapreview.com/oauth2/default',
  CLIENT_ID: '0oalsdtagdf6X2Eky0h7',
  REDIRECT_URL: window.location.origin + '/login',
  SCOPES: ['openid', 'profile', 'email'],
  production: false
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
