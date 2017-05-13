import { view, Component } from '@storefront/core';

@view('gb-reset', require('./index.html'), require('./index.css'))
class Reset extends Component {

  state: Reset.State = {
    onClick: () => this.flux.reset()
  };
}

namespace Reset {
  export interface State {
    onClick(): void;
  }
}

export default Reset;
