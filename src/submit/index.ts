import { view, Tag } from '@storefront/core';
import Query from '../query';

interface Submit extends Tag.Instance {
  $query: Query.State;
}

@view('gb-submit', require('./index.html'), {}, require('./index.css'))
class Submit {

  state: object = {
    onClick: () => this.$query && this.$query.submit()
  };
}

export default Submit;
