import Query from '../../src/query';
import suite from './_suite';

suite('Query', ({ expect, spy }) => {
  let query: Query;

  beforeEach(() => query = new Query());

  describe('constructor()', () => {
    it('should set initial registered', () => {
      query.expose = () => null;

      query.init();

      expect(query.registered).to.eql([]);
    });

    it('should call expose()', () => {
      const expose = query.expose = spy();

      query.init();

      expect(expose.calledWith('query')).to.be.true;
    });
  });

  describe('init()', () => {
    describe('submit()', () => {
      it('should call flux.search() with the value of the first registered search-box', () => {
        const value = 'high tops';
        const search = spy();
        query.flux = <any>{ search };
        query.registered = <any[]>[{ refs: { searchBox: { value } } }];

        query.state.submit();

        expect(search.calledWith(value)).to.be.true;
      });

      it('should not call flux.search() if no registered search-box', () => {
        const search = spy();
        query.flux = <any>{ search: () => expect.fail() };
        query.registered = [];

        query.state.submit();
      });
    });

    describe('register()', () => {
      it('should add to registered', () => {
        const tag: any = { a: 'b' };

        query.state.register(tag);

        expect(query.registered).to.eql([tag]);
      });
    });
  });
});
