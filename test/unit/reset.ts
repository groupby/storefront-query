import Reset from '../../src/reset';
import suite from './_suite';

suite('Reset', ({ expect, spy }) => {
  let reset: Reset;

  beforeEach(() => reset = new Reset());

  describe('init()', () => {
    it('should call expose()', () => {
      const expose = reset.expose = spy();

      reset.init();

      expect(expose.calledWith('reset')).to.be.true;
    });

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
