import { view, Component } from '@storefront/core';
import Query from '../query';

@view('gb-submit', require('./index.html'))
class Submit extends Component {
  $query: Query.State;

  state: Submit.State = {
    onClick: () => this.$query && this.$query.submit()
  };

  constructor() {
    super();
    this.expose('submit');
  }
}

namespace Submit {
  export interface State {
    onClick(): void;
  }
}

export default Submit;
