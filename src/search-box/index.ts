import { view, Component, Events } from '@storefront/core';
import Query from '../query';

const KEY_ENTER = 13;

@view('gb-search-box', require('./index.html'), require('./index.css'))
class SearchBox extends Component {
  $query?: Query.State;
  refs: { searchBox: HTMLInputElement };

  state: SearchBox.State = {
    onKeyUp: (event) => {
      event.preventUpdate = true;
      if (event.keyCode === KEY_ENTER) {
        this.flux.search(event.target.value);
      } else {
        this.flux.autocomplete(event.target.value);
      }
    }
  };

  constructor() {
    super();
    this.flux.on(Events.ORIGINAL_QUERY_UPDATED, this.updateOriginalQuery);
  }

  updateOriginalQuery = (originalQuery: string) =>
    ((originalQuery || '') !== (this.state.originalQuery || this.refs.searchBox.value))
    && this.set({ originalQuery })

  onBeforeMount() {
    if (this.$query) {
      this.$query.register(this);
    }
  }
}

namespace SearchBox {
  export interface InputKeyboardEvent extends KeyboardEvent {
    target: HTMLInputElement;
    preventUpdate?: boolean;
  }

  export interface State {
    originalQuery?: string;
    onKeyUp(event: InputKeyboardEvent): void;
  }
}

export default SearchBox;
