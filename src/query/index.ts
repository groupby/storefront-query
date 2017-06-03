import { alias, tag, Events, Tag } from '@storefront/core';
import SearchBox from '../search-box';

@alias('query')
@tag('gb-query', require('./index.html'))
class Query {

  registered: SearchBox[] = [];
  props: Query.Props = {
    mode: 'default'
  };
  state: Query.State = {
    register: (tag) => this.registered.push(tag),
    submit: () => {
      if (this.registered.length !== 0) {
        this.flux.search(this.registered[0].refs.searchBox.value);
      }
    }
  };
}

interface Query extends Tag<Query.Props, Query.State> { }
namespace Query {
  export interface Props {
    // TODO handle other modes
    mode: 'default' | 'automatic';
  }

  export interface State {
    register(tag: SearchBox): void;
    submit(): void;
  }
}

export default Query;
