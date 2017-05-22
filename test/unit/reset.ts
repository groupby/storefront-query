import { Component } from '@storefront/core';
import Reset from '../../src/reset';
import suite from './_suite';

suite('Reset', ({ expect, spy }) => {

  describe('constructor()', () => {
    afterEach(() => delete Component.prototype.expose);

    it('should call expose()', () => {
      const expose = Component.prototype.expose = spy();

      new Reset();

      expect(expose.calledWith('reset')).to.be.true;
    });

    describe('state', () => {
      describe('onClick()', () => {
        it('should call flux.reset()');
      });
    });
  });
});
