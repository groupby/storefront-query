import Reset from '../../src/reset';
import suite from './_suite';

suite('Reset', ({ expect, spy }) => {
  let reset: Reset;

  beforeEach(() => reset = new Reset());

  describe('constructor()', () => {
    describe('state()', () => {
      describe('onClick()', () => {
        it('should call actions.reset()', () => {
          const resetRecall = spy();
          reset.actions = <any>{ resetRecall };

          reset.state.onClick();

          expect(resetRecall).to.be.called;
        });
      });
    });
  });
});
