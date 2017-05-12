import { view, Events, Tag } from '@storefront/core';
import Query from '../query';

const KEY_ENTER = 13;

interface SearchBox extends Tag.Instance {
  $query?: Query.State;
  refs: { searchBox: HTMLInputElement };
}

@view('gb-search-box', require('./index.html'), {}, require('./index.css'))
class SearchBox {

  state: object = {
    onKeyDown: (event: KeyboardEvent & { target: HTMLInputElement }) => {
      if (event.keyCode === KEY_ENTER) {
        this.flux.search(event.target.value);
      }
    },
    onKeyUp: (event: KeyboardEvent & { target: HTMLInputElement }) => {
      if (event.keyCode !== KEY_ENTER) {
        this.flux.autocomplete(event.target.value);
      }
    }
  };

  constructor() {
    this.flux.on(Events.ORIGINAL_QUERY_UPDATED, this.updateOriginalQuery);
  }

  onBeforeMount() {
    if (this.$query) {
      this.$query.register(this);
    }
  }

  updateOriginalQuery = (originalQuery: string) => this.set({ originalQuery });
}

export default SearchBox;
