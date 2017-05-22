import { Component } from '@storefront/core';
import Query from '../../src/query';
import suite from './_suite';

suite('Query', ({ expect, spy }) => {

  describe('constructor()', () => {
    afterEach(() => delete Component.prototype.expose);

    it('should set initial registered', () => {
      Component.prototype.expose = () => null;

      const query = new Query();

      expect(query.registered).to.eql([]);
    });

    it('should call expose()', () => {
      const expose = Component.prototype.expose = spy();

      new Query();

      expect(expose.calledWith('query')).to.be.true;
    });

    describe('state', () => {
      describe('submit()', () => {
        it('should call flux.search() with the value of the first registered search-box');

        it('should not call flux.search() if no registered search-box');
      });

      describe('register()', () => {
        it('should add to registered');
      });
    });
  });
});
