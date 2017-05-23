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
      let submit: Submit;

      beforeEach(() => {
        Component.prototype.expose = () => null;
        submit = new Submit();
      });

      describe('onClick()', () => {
        it('should call $query.submit()', () => {
          const submitQuery = spy();
          submit.$query = <any>{ submit: submitQuery };

          submit.state.onClick();

          expect(submitQuery.called).to.be.true;
        });

        it('should not call $query.submit() if no $query', () => {
          expect(() => submit.state.onClick()).to.not.throw();
        });
      });
    });
  });
});
