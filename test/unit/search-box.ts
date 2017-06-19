import { Events, Selectors } from '@storefront/core';
import * as sinon from 'sinon';
import SearchBox from '../../src/search-box';
import suite from './_suite';

const QUERY = 'blue dress';
const STATE = { a: 'b' };

suite('SearchBox', ({ expect, spy, stub }) => {
  let querySelector: sinon.SinonStub;
  let searchBox: SearchBox;

  beforeEach(() => {
    querySelector = stub(Selectors, 'query').returns(QUERY);
    SearchBox.prototype.flux = <any>{ store: { getState: () => STATE } };
    searchBox = new SearchBox();
  });
  afterEach(() => delete SearchBox.prototype.flux);

  describe('constructor()', () => {
    describe('state', () => {
      describe('originalQuery', () => {
        it('should set originalQuery from state', () => {
          expect(querySelector).to.be.calledWith(STATE);
          expect(searchBox.state.originalQuery).to.eq(QUERY);
        });
      });

      describe('onKeyDown()', () => {
        it('should call event.preventDefault() if keyCode is up or down', () => {
          const preventDefault = spy();

          searchBox.state.onKeyDown(<any>{ keyCode: 38, preventDefault });
          searchBox.state.onKeyDown(<any>{ keyCode: 40, preventDefault });

          expect(preventDefault).to.be.calledTwice;
        });

        it('should not call event.preventDefault() if keyCode is any other key', () => {
          const preventDefault = () => expect.fail();

          searchBox.state.onKeyDown(<any>{ keyCode: 13, preventDefault });
        });
      });
      describe('onKeyUp()', () => {
        it('should set preventUpdate', () => {
          const event: any = { keyCode: 10, target: {} };
          searchBox.flux = <any>{ emit: () => null };

          searchBox.state.onKeyUp(event);

          expect(event.preventUpdate).to.be.true;
        });

        it('should call flux.search() if autocomplete is not active on ENTER pressed', () => {
          const value = 'hula hoop';
          const search = spy();
          searchBox.flux = <any>{ search };
          searchBox.services = <any>{ autocomplete: { hasActiveSuggestion: () => false } };

          searchBox.state.onKeyUp(<any>{ keyCode: 13, target: { value } });

          expect(search).to.be.calledWith(value);
        });

        it('should call emit sayt:select_active if autocomplete is active on ENTER pressed', () => {
          const emit = spy();
          searchBox.flux = <any>{ emit };
          searchBox.services = <any>{ autocomplete: { hasActiveSuggestion: () => true } };

          searchBox.state.onKeyUp(<any>{ keyCode: 13 });

          expect(emit).to.be.calledWith('sayt:select_active');
        });

        it('should emit sayt:hide on ESC pressed', () => {
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

        it('should emit sayt:hide on blank query', () => {
          const emit = spy();
          searchBox.flux = <any>{ emit };

          searchBox.state.onKeyUp(<any>{ target: {} });

          expect(emit).to.be.calledWith('sayt:hide');
        });

        it('should emit sayt:activate_next on arrow down pressed', () => {
          const emit = spy();
          searchBox.flux = <any>{ emit };

          searchBox.state.onKeyUp(<any>{ keyCode: 40 });

          expect(emit).to.be.calledWith('sayt:activate_next');
        });

        it('should emit sayt:activate_previous on arrow up pressed', () => {
          const emit = spy();
          searchBox.flux = <any>{ emit };

          searchBox.state.onKeyUp(<any>{ keyCode: 38 });

          expect(emit).to.be.calledWith('sayt:activate_previous');
        });
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
