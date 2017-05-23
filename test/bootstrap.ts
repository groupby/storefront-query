import * as storefront from '@storefront/core';
import * as mock from 'mock-require';
import * as sinon from 'sinon';

sinon.stub(storefront, 'view');

mock('../src/query/index.html', {});
mock('../src/reset/index.html', {});
mock('../src/search-box/index.html', {});
mock('../src/submit/index.html', {});
