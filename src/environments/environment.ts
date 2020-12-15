// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backendless: {
    url: `https://api.backendless.com/332D5BD4-56E1-53BE-FFED-BC3B13791F00/5E821146-F8DB-40D5-95F7-FB93121311FC/`,
    endpoints: {
      charm: 'data/Charms',
      ip_addresses: 'data/ip_addresses',
      bulkUpdateCharms: 'data/bulk/Charms',
    }
  },
  urlIP: `https://api.ipify.org/?format=json`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
