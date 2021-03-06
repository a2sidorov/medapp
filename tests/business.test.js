'use strict';

/* Busiess model test */

const assert = require('chai').assert;
const moment = require('moment-timezone');
const Business = require('../models/business');

describe('Business model test', () => {
  let newBusiness;

  before(async () => {
    newBusiness = new Business();
    newBusiness.local.email = 'test@test.com';
    newBusiness.local.password = 'password';;
    await newBusiness.setHolidays();
    newBusiness.timezone = 'Europe/Moscow';
    //newBusiness.timezone = 'America/New_York';
  });

  describe('workdays test', () => {
    it('should be an array', () => {
      assert.isArray(newBusiness.workdays);
    });
    it('should have length 7', () => {
      assert.lengthOf(newBusiness.workdays, 7);
    });
  });

  describe('workhours test', () => {
    it('should be an array', () => {
      assert.isArray(newBusiness.workhours);
    });
    it('should have length 48', () => {
      assert.lengthOf(newBusiness.workhours, 48);
    });
  });

  describe('holidays test', () => {
    it('should be an array', () => {
      assert.isArray(newBusiness.holidays);
    });
    it('should not be empty', () => {
      assert.deepEqual(Object.keys(newBusiness.holidays[0]), ['date', 'name', 'isAvailable']);
    });
  });

  describe('appointments test', () => {
    it('should return an array', () => {
      assert.isArray(newBusiness.appointments);
    });
  });

  describe('createMonth method test', () => {
    it('it should return an array', () => {
      const m = moment();
      assert.isArray(newBusiness.createMonth(m.format()));
    });
    /*
    it('with arguments DST ON', () => {
      const m = moment();
      m.add(1, 'year');
      m.month(5);
      assert.isArray(newBusiness.createMonth(m.format()));
    });
    it('with arguments DST OFF', () => {
      const m = moment();
      m.add(1, 'year');
      m.month(0);
      assert.isArray(newBusiness.createMonth(m.format()));
    });
    */
  });

  describe('createDay method test', () => {
    it('should return an array', () => {
      const m = moment();
      assert.isArray(newBusiness.createDay(m.format()));
    });
    /*
    it('should return an array DST on', () => {
      const dateString = moment().add(1, 'year').month(7).format("YYYY-MM-DD");
      assert.isArray(newBusiness.createDay(dateString));
    });
    it('should return an array DST off', () => {
      const dateString = moment().add(1, 'year').month(7).format("YYYY-MM-DD");
      assert.isArray(newBusiness.createDay(dateString));
    });
    */
  });

  describe('isWorkday method test', () => {
    it('should return false if Sunday', () => {
      assert.isFalse(newBusiness.isWorkday(0));
    });
    it('should return true if Monday', () => {
      assert.isTrue(newBusiness.isWorkday(1));
    });
    it('should return false if Saturday', () => {
      assert.isFalse(newBusiness.isWorkday(6));
    });
  });

  describe('isHoliday method test', () => {
    it('should return true if date is holiday', () => {
      const m = moment().startOf('year');
      assert.isTrue(newBusiness.isHoliday(m.format()));
    });
    it('should return false if date is not holiday', () => {
      const m = moment().startOf('year');
      m.add(1, 'day');
      assert.isFalse(newBusiness.isHoliday(m.format()));
    });
  });

  describe('isBooked method test', () => {
    it('should return false', () => {
      const dateString = moment().tz(newBusiness.timezone).hour(14).minute(0).format();
      assert.isFalse(newBusiness.isBooked(dateString));
    });
  });

  describe('isLate method test', () => {
    it('should return boolean', function (done) {
      const dateString = moment().tz(newBusiness.timezone).format();
      console.log(dateString)
      assert.isBoolean(newBusiness.isLate(dateString));
      done();
    });
  });
});

