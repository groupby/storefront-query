import { view, Component } from '@storefront/core';
import Query from '../query';

@view('gb-submit', require('./index.html'), require('./index.css'))
class Submit extends Component {
  $query: Query.State;

  state: Submit.State = {
    onClick: (event) => {
      event.preventUpdate = true;
      if (this.$query) {
        this.$query.submit();
      }
    }
  };
}

namespace Submit {
  export interface State {
    onClick(event: MouseEvent & { preventUpdate: boolean }): void;
  }
}

export default Submit;
