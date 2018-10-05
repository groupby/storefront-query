import { consume, provide, tag, Tag } from '@storefront/core';
import Query from '../query';

@consume('query')
@provide('submit')
@tag('gb-submit', require('./index.html'))
class Submit {
  aliases: Submit.Aliases;
  state: Submit.State = {
    onClick: () => this.aliases.query && this.aliases.query.submit(),
  };
}

interface Submit extends Tag<any, Submit.State> {}
namespace Submit {
  export interface State {
    onClick(): void;
  }
  export interface Aliases {
    query: Query.State;
  }
}

export default Submit;
