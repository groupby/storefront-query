import { Events } from '@storefront/core';
import SearchBox from '../../src/search-box';
import suite from './_suite';

suite('SearchBox', ({ expect, spy }) => {
  let searchBox: SearchBox;

  beforeEach(() => searchBox = new SearchBox());

  describe('init()', () => {
    it('should listen for ORIGINAL_QUERY_UPDATED', () => {
      const on = spy();
      searchBox.flux = <any>{ on };

      searchBox.init();

      expect(on.calledWith(Events.ORIGINAL_QUERY_UPDATED, searchBox.updateOriginalQuery)).to.be.true;
    });
  });

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
