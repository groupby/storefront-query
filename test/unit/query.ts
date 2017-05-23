import { Component } from '@storefront/core';
import Query from '../../src/query';
import suite from './_suite';

suite('Query', ({ expect, spy }) => {

  describe('constructor()', () => {
    afterEach(() => delete Component.prototype.expose);

    it('should set initial registered', () => {
      Component.prototype.expose = () => null;

      const query = new Query();

      expect(query.registered).to.eql([]);
    });

    it('should call expose()', () => {
      const expose = Component.prototype.expose = spy();

      new Query();

      expect(expose.calledWith('query')).to.be.true;
    });

    describe('state', () => {
      let query: Query;

      beforeEach(() => {
        Component.prototype.expose = () => null;
        query = new Query();
      });

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
});
