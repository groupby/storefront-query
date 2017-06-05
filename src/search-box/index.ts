import { tag, Events, Tag } from '@storefront/core';
import Query from '../query';

const KEY_ENTER = 13;

@tag('gb-search-box', require('./index.html'))
class SearchBox {

  $query: Query.State;
  refs: { searchBox: HTMLInputElement };
  state: SearchBox.State = {
    onKeyUp: (event) => {
      event.preventUpdate = true;
      if (event.keyCode === KEY_ENTER) {
        this.flux.search(event.target.value);
      } else {
        const query = event.target.value;
        if (query) {
          this.flux.autocomplete(query);
          this.flux.emit('sayt:show');
        } else {
          this.flux.emit('sayt:hide');
        }
      }
    },
    onBlur: (event) => {
      event.preventUpdate = true;
      this.flux.emit('sayt:hide');
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
    onBlur(event: FocusEvent & Tag.Event): void;
  }

  export interface InputKeyboardEvent extends KeyboardEvent, Tag.Event {
    target: HTMLInputElement;
  }
}

export default SearchBox;
