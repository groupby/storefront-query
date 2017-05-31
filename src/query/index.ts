import { tag, Events, Tag } from '@storefront/core';
import SearchBox from '../search-box';

@tag('gb-query', require('./index.html'), [
  { name: 'mode', default: 'default' }
])
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

  init() {
    this.expose('query');
  }
}

interface Query extends Tag<any, Query.State> { }
namespace Query {
  export interface State {
    register(tag: SearchBox): void;
    submit(): void;
  }
}

export default Query;
