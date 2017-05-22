import { Component } from '@storefront/core';
import Submit from '../../src/submit';
import suite from './_suite';

suite('Submit', ({ expect, spy }) => {

  describe('constructor()', () => {
    afterEach(() => delete Component.prototype.expose);

    it('should call expose()', () => {
      const expose = Component.prototype.expose = spy();

      new Submit();

      expect(expose.calledWith('submit')).to.be.true;
    });

    describe('state', () => {
      describe('onClick()', () => {
        it('should call $query.submit()');

        it('should not call $query.submit() if no $query');
      });
    });
  });
});
