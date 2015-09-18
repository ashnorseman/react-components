/**
 * Created by AshZhang on 15/9/18.
 */


'use strict';

import ajax from '../src/common/utils/ajax';


xdescribe('Ajax', () => {

  beforeEach(() => {
    jasmine.Ajax.install();
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
  });

  describe('.get()', () => {

    it('sends a request', () => {
      ajax.get('/ash');

      expect(jasmine.Ajax.requests.mostRecent().url).toEqual('/ash');
      expect(jasmine.Ajax.requests.mostRecent().method).toEqual('GET');
    });

    it('sends queries', () => {
      ajax.get('/ash', {
        type: 1,
        text: 'ash lee'
      });

      expect(jasmine.Ajax.requests.mostRecent().url).toEqual('/ash?type=1&text=ash%20lee');
    });
  });

  describe('.post()', () => {

    it('sends a request', () => {
      ajax.post('/ash');

      expect(jasmine.Ajax.requests.mostRecent().url).toEqual('/ash');
      expect(jasmine.Ajax.requests.mostRecent().method).toEqual('POST');
      expect(jasmine.Ajax.requests.mostRecent().params).toEqual('{}');
    });

    it('sends params', () => {
      ajax.post('/ash', {
        type: 1,
        text: 'ash lee'
      });

      expect(jasmine.Ajax.requests.mostRecent().params).toEqual('{"type":1,"text":"ash lee"}');
    });
  });

  describe('.put()', () => {

    it('sends a request', () => {
      ajax.put('/ash/1');

      expect(jasmine.Ajax.requests.mostRecent().url).toEqual('/ash/1');
      expect(jasmine.Ajax.requests.mostRecent().method).toEqual('PUT');
      expect(jasmine.Ajax.requests.mostRecent().params).toEqual('{}');
    });

    it('sends params', () => {
      ajax.put('/ash/1', {
        type: 1,
        text: 'ash lee'
      });

      expect(jasmine.Ajax.requests.mostRecent().params).toEqual('{"type":1,"text":"ash lee"}');
    });
  });

  describe('.delete()', () => {

    it('sends a request', () => {
      ajax.delete('/ash/1');

      expect(jasmine.Ajax.requests.mostRecent().url).toEqual('/ash/1');
      expect(jasmine.Ajax.requests.mostRecent().method).toEqual('DELETE');
      expect(jasmine.Ajax.requests.mostRecent().params).toEqual('{}');
    });

    it('sends params', () => {
      ajax.delete('/ash/1', {
        type: 1,
        text: 'ash lee'
      });

      expect(jasmine.Ajax.requests.mostRecent().params).toEqual('{"type":1,"text":"ash lee"}');
    });
  });
});