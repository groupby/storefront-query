import { tag, Tag } from '@storefront/core';

@tag('gb-reset', require('./index.html'))
class Reset {

  state: Reset.State = {
    onClick: () => this.flux.reset()
  };

  init() {
    this.expose('reset');
  }
}

interface Reset extends Tag<any, Reset.State> { }
namespace Reset {
  export interface State {
    onClick(): void;
  }
}

export default Reset;
