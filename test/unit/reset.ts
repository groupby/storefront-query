import Reset from '../../src/reset';
import suite from './_suite';

suite('Reset', ({ expect, spy }) => {
  let reset: Reset;

  beforeEach(() => reset = new Reset());

  describe('constructor()', () => {
    describe('state()', () => {
      describe('onClick()', () => {
        it('should call flux.reset()', () => {
          const fluxReset = spy();
          reset.flux = <any>{ reset: fluxReset };

          reset.state.onClick();

          expect(fluxReset.called).to.be.true;
        });
      });
    });
  });
});
