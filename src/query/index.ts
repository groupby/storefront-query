import { view, Component, Events } from '@storefront/core';
import SearchBox from '../search-box';

@view('gb-query', require('./index.html'), [
  { name: 'mode', default: 'default' }
])
class Query extends Component {

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
    super();
    this.expose('query');
  }
}

namespace Query {
  export interface State {
    register(tag: SearchBox): void;
    submit(): void;
  }
}

export default Query;
