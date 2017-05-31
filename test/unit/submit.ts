import Submit from '../../src/submit';
import suite from './_suite';

suite('Submit', ({ expect, spy }) => {
  let submit: Submit;

  beforeEach(() => submit = new Submit());

  describe('init()', () => {
    it('should call expose()', () => {
      const expose = submit.expose = spy();

      submit.init();

      expect(expose.calledWith('submit')).to.be.true;
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
