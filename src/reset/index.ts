import { alias, tag, Tag } from '@storefront/core';

@alias('reset')
@tag('gb-reset', require('./index.html'))
class Reset {

  state: Reset.State = {
    onClick: () => this.flux.reset()
  };
}

interface Reset extends Tag<any, Reset.State> { }
namespace Reset {
  export interface State {
    onClick(): void;
  }
}

export default Reset;
