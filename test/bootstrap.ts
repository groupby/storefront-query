import * as chai from 'chai';
import * as mock from 'mock-require';
import * as sinonChai from 'sinon-chai';

chai.use(sinonChai);

mock('../src/query/index.html', {});
mock('../src/reset/index.html', {});
mock('../src/search-box/index.html', {});
mock('../src/submit/index.html', {});
