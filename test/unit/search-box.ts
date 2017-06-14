import { Events } from '@storefront/core';
import SearchBox from '../../src/search-box';
import suite from './_suite';

suite('SearchBox', ({ expect, spy }) => {
  let searchBox: SearchBox;

  beforeEach(() => searchBox = new SearchBox());

  describe('constructor()', () => {
    describe('state', () => {
      describe('onKeyUp()', () => {
        it('should set preventUpdate', () => {
          const event: any = { keyCode: 13, target: {} };
          searchBox.flux = <any>{ search: () => null };

          searchBox.state.onKeyUp(event);

          expect(event.preventUpdate).to.be.true;
        });

        it('should call flux.search()', () => {
          const value = 'hula hoop';
          const search = spy();
          searchBox.flux = <any>{ search };

          searchBox.state.onKeyUp(<any>{ keyCode: 13, target: { value } });

          expect(search).to.be.calledWith(value);
        });

        it('should hide sayt on ESC pressed', () => {
          const emit = spy();
          searchBox.flux = <any>{ emit };

          searchBox.state.onKeyUp(<any>{ keyCode: 27 });

          expect(emit).to.be.calledWith('sayt:hide');
        });

        it('should call flux.autocomplete()', () => {
          const value = 'hula hoop';
          const autocomplete = spy();
          const emit = spy();
          searchBox.flux = <any>{ autocomplete, emit };

          searchBox.state.onKeyUp(<any>{ target: { value } });

          expect(autocomplete).to.be.calledWith(value);
          expect(emit).to.be.calledWith('sayt:show');
        });

        it('should emit hide:sayt', () => {
          const emit = spy();
          searchBox.flux = <any>{ emit };

          searchBox.state.onKeyUp(<any>{ target: {} });

          expect(emit).to.be.calledWith('sayt:hide');
        });
      });
    });

    describe('init()', () => {
      it('should listen for ORIGINAL_QUERY_UPDATED', () => {
        const on = spy();
        searchBox.flux = <any>{ on };

        searchBox.init();

        expect(on).to.be.calledWith(Events.ORIGINAL_QUERY_UPDATED, searchBox.updateOriginalQuery);
      });
    });

    describe('updateOriginalQuery()', () => {
      it('should set originalQuery', () => {
        const originalQuery = 'orange soda';
        const set = searchBox.set = spy();
        searchBox.state = <any>{ originalQuery: 'cherry soda' };

        searchBox.updateOriginalQuery(originalQuery);

        expect(set).to.be.calledWith({ originalQuery });
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

        expect(register).to.be.calledWith(searchBox);
      });

      it('should not call $query.register() if no $query', () => {
        expect(() => searchBox.onBeforeMount()).to.not.throw();
      });
    });
  });
});
