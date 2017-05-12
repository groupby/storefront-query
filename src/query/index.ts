import { view, Events, Tag } from '@storefront/core';
import SearchBox from '../search-box';

interface Query extends Tag.Instance { }

@view('gb-query', require('./index.html'), { mode: 'default' })
class Query {

  registered: SearchBox[] = [];

  state: Query.State = {
    register: (tag) => this.registered.push(tag),
    submit: () => {
      if (this.registered.length !== 0) {
        this.flux.search(this.registered[0].refs.searchBox.value);
      }
    }
  };

  constructor() {
    this.expose('query');
  }
}

namespace Query {
  export interface State {
    register: (tag: SearchBox) => void;
    submit: () => void;
  }
}

export default Query;
