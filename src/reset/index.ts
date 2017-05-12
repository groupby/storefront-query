import { view, Tag } from '@storefront/core';

interface Reset extends Tag.Instance { }

@view('gb-reset', require('./index.html'), {}, require('./index.css'))
class Reset {

  state: object = {
    onClick: () => this.flux.reset()
  };
}

export default Reset;
