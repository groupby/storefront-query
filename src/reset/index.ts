import { view, Component } from '@storefront/core';

@view('gb-reset', require('./index.html'))
class Reset extends Component {

  state: Reset.State = {
    onClick: () => this.flux.reset()
  };

  constructor() {
    super();
    this.expose('reset');
  }
}

namespace Reset {
  export interface State {
    onClick(): void;
  }
}

export default Reset;
