import pkg = require('../../src');
import Query from '../../src/query';
import Reset from '../../src/reset';
import SearchBox from '../../src/search-box';
import Submit from '../../src/submit';
import suite from './_suite';

suite('package', ({ expect }) => {
  it('should expose Query', () => {
    expect(pkg.Query).to.eq(Query);
  });

  it('should expose Reset', () => {
    expect(pkg.Reset).to.eq(Reset);
  });

  it('should expose SearchBox', () => {
    expect(pkg.SearchBox).to.eq(SearchBox);
  });

  it('should expose Submit', () => {
    expect(pkg.Submit).to.eq(Submit);
  });
});
