const { copyFile } = require('fs/promises');

const source = {
  staging: 'env/.env.staging',
  production: 'env/.env.production',
  // APP_ENV defined on vercel
}[process.env.APP_ENV];

if (!source) {
  throw new Error('unknown type: ' + process.env.APP_ENV);
}
copyFile(source, '.env');
