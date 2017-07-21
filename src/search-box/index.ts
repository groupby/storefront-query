import { tag, Events, Selectors, Tag } from '@storefront/core';
import Query from '../query';

const KEY_ENTER = 13;
const KEY_ESCAPE = 27;
const KEY_UP = 38;
const KEY_DOWN = 40;

@tag('gb-search-box', require('./index.html'))
class SearchBox {

  $query: Query.State;
  refs: { searchBox: HTMLInputElement };
  state: SearchBox.State = {
    originalQuery: Selectors.query(this.flux.store.getState()),
    onKeyDown: (event) => (event.keyCode === KEY_DOWN || event.keyCode === KEY_UP) && event.preventDefault(),
    onKeyUp: (event) => {
      event.preventUpdate = true;
      switch (event.keyCode) {
        case KEY_ENTER:
          if (this.services.autocomplete.hasActiveSuggestion()) {
            return this.flux.emit('sayt:select_active');
          } else {
            return this.actions.search(event.target.value);
          }
        case KEY_ESCAPE: return this.flux.emit('sayt:hide');
        case KEY_UP: return this.flux.emit('sayt:activate_previous');
        case KEY_DOWN: return this.flux.emit('sayt:activate_next');
        default:
          const query = event.target.value;
          if (query) {
            this.actions.updateAutocompleteQuery(query);
          } else {
            this.flux.emit('sayt:hide');
          }
      }
    },
    onClick: (event) => {
      console.log('im click');
      event.preventUpdate = true;
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
    onKeyDown(event: InputKeyboardEvent): void;
    onKeyUp(event: InputKeyboardEvent): void;
    onClick(event: Tag.Event): void;
  }

  export interface InputKeyboardEvent extends KeyboardEvent, Tag.Event {
    target: HTMLInputElement;
  }
}

export default SearchBox;
