import { tag, Events, Tag } from '@storefront/core';
import Query from '../query';

const KEY_ENTER = 13;
const KEY_ESCAPE = 27;

@tag('gb-search-box', require('./index.html'))
class SearchBox {

  $query: Query.State;
  refs: { searchBox: HTMLInputElement };
  state: SearchBox.State = {
    onKeyUp: (event) => {
      event.preventUpdate = true;
      if (event.keyCode === KEY_ENTER) {
        this.flux.search(event.target.value);
      } else if (event.keyCode === KEY_ESCAPE) {
        this.flux.emit('sayt:hide');
      } else {
        const query = event.target.value;
        if (query) {
          this.flux.autocomplete(query);
          this.flux.emit('sayt:show');
        } else {
          this.flux.emit('sayt:hide');
        }
      }
    }
  };

  init() {
    this.flux.on(Events.ORIGINAL_QUERY_UPDATED, this.updateOriginalQuery);
  }

  onBeforeMount() {
    if (this.$query) {
      this.$query.register(this);
    }
  }

  updateOriginalQuery = (originalQuery: string) =>
    ((originalQuery || '') !== (this.state.originalQuery || this.refs.searchBox.value))
    && this.set({ originalQuery })
}

interface SearchBox extends Tag<any, SearchBox.State> { }
namespace SearchBox {
  export interface State {
    originalQuery?: string;
    onKeyUp(event: InputKeyboardEvent): void;
  }

  export interface InputKeyboardEvent extends KeyboardEvent, Tag.Event {
    target: HTMLInputElement;
  }
}

export default SearchBox;
