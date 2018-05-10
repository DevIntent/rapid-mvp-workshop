// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyDWXmPatJYrQAeqE_C3toU2tycSTuBHD4g',
    authDomain: 'rapid-mvp-workshop.firebaseapp.com',
    databaseURL: 'https://rapid-mvp-workshop.firebaseio.com',
    projectId: 'rapid-mvp-workshop',
    storageBucket: 'rapid-mvp-workshop.appspot.com',
    messagingSenderId: '243853787037'
  }
};
