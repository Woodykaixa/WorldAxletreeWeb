const { copyFile } = require('fs/promises');
const MAPPING = {
  dev: 'env/.env.development',
  staging: 'env/.env.staging',
  prod: 'env/.env.production',
};

console.log('arg:', process.argv);
const type = process.argv[2];
const source = MAPPING[type];
if (!source) {
  throw new Error('unknown type: ' + type);
}
copyFile(source, '.env');
