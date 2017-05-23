import { Component, Events } from '@storefront/core';
import SearchBox from '../../src/search-box';
import suite from './_suite';

suite('SearchBox', ({ expect, spy }) => {

  describe('constructor()', () => {
    afterEach(() => delete Component.prototype.flux);

    it('should listen for ORIGINAL_QUERY_UPDATED', () => {
      const on = spy();
      Component.prototype.flux = <any>{ on };

      const searchBox = new SearchBox();

      expect(on.calledWith(Events.ORIGINAL_QUERY_UPDATED, searchBox.updateOriginalQuery)).to.be.true;
    });

    describe('state', () => {
      let searchBox: SearchBox;

      beforeEach(() => {
        Component.prototype.flux = <any>{ on: () => null };
        searchBox = new SearchBox();
      });

      describe('onKeyUp()', () => {
        it('should set preventUpdate', () => {
          const event: any = { target: {} };
          searchBox.flux = <any>{ autocomplete: () => null };

          searchBox.state.onKeyUp(event);

          expect(event.preventUpdate).to.be.true;
        });

        it('should call flux.search() when enter key pressed', () => {
          const value = 'red rum';
          const search = spy();
          searchBox.flux = <any>{ search };

          searchBox.state.onKeyUp(<any>{ target: { value }, keyCode: 13 });

          expect(search.calledWith(value)).to.be.true;
        });

        it('should call flux.autocomplete() when any other key pressed', () => {
          const value = 'red rum';
          const autocomplete = spy();
          searchBox.flux = <any>{ autocomplete };

          searchBox.state.onKeyUp(<any>{ target: { value } });

          expect(autocomplete.calledWith(value)).to.be.true;
        });
      });
    });
  });

  describe('actions', () => {
    let searchBox: SearchBox;

    before(() => Component.prototype.flux = <any>{ on: () => null });
    beforeEach(() => searchBox = new SearchBox());
    after(() => delete Component.prototype.flux);

    describe('updateOriginalQuery()', () => {
      it('should set originalQuery', () => {
        const originalQuery = 'orange soda';
        const set = searchBox.set = spy();
        searchBox.state = <any>{ originalQuery: 'cherry soda' };

        searchBox.updateOriginalQuery(originalQuery);

        expect(set.calledWith({ originalQuery })).to.be.true;
      });

      it('should not set originalQuery if value will not change', () => {
        searchBox.state = <any>{};
        searchBox.refs = <any>{ searchBox: { value: '' } };
        searchBox.set = () => expect.fail();

        searchBox.updateOriginalQuery(undefined);

        searchBox.refs = <any>{ searchBox: { value: 'cherry hardwood' } };

        searchBox.updateOriginalQuery('cherry hardwood');

        searchBox.state = <any>{ originalQuery: 'masonry' };

        searchBox.updateOriginalQuery('masonry');
      });
    });

    describe('onBeforeMount()', () => {
      it('should call $query.register()', () => {
        const register = spy();
        searchBox.$query = <any>{ register };

        searchBox.onBeforeMount();

        expect(register.calledWith(searchBox)).to.be.true;
      });

      it('should not call $query.register() if no $query', () => {
        expect(() => searchBox.onBeforeMount()).to.not.throw();
      });
    });
  });
});
