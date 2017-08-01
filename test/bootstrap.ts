import { bootstrap } from '@storefront/testing';
import * as chai from 'chai';

bootstrap(chai, __dirname, [
  '../src/query/index.html',
  '../src/reset/index.html',
  '../src/search-box/index.html',
  '../src/submit/index.html',
]);
