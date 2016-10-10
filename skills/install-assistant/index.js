'use strict';

module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('install-assistant');

app.launch(function(req, res) {
  var prompt = 'Ask me about your upcoming service installation dates,\
  or request a change to a scheduled install';

  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('QueryTimeslotIntent', {
    'slots': {
      'SUPPLIER': 'SUPPLIERS',
      'SERVICE': 'SERVICES'
    },
    'utterances': ['{-|SUPPLIER} {-|SERVICE} installation date']
  },
  function(req, res) {
    var supplier = req.slot('SUPPLIER');
    var service = req.slot('SERVICE');
    var reprompt = 'Tell me a supplier and service name to get scheduling information';

    if (_.isEmpty(supplier) || _.isEmpty(service)) {
      var prompt = 'I didn\'t hear a supplier or service code. \
    Tell me a supplier and service name.';
      res.say(prompt).reprompt(reprompt).shouldEndSession(false);
      return true;
    }

    var prompt = 'The service installation date for your ' +
      supplier + ' ' +
      service + ' ' +
      'is set for today.';
    res.say(prompt).send();

    return false;
  });

app.intent('RequestRescheduleIntent', {
    'slots': {
      'SUPPLIER': 'SUPPLIERS',
      'SERVICE': 'SERVICES'
    },
    'utterances': ['Reschedule {-|SUPPLIER} {-|SERVICE} installation date']
  },
  function(req, res) {
    var supplier = req.slot('SUPPLIER');
    var service = req.slot('SERVICE');
    var reprompt = 'Tell me a supplier and service name to get rescheduling options';

    if (_.isEmpty(supplier) || _.isEmpty(service)) {
      var prompt = 'I didn\'t hear a supplier or service code. \
    Tell me a supplier and service name.';
      res.say(prompt).reprompt(reprompt).shouldEndSession(false);
      return true;
    }

    var prompt = 'The service installation date for your ' +
      supplier + ' ' +
      service + ' ' +
      'is currently set for today. ' +
      'Say tomorrow to move the installation to tomorrow, ' +
      'or a day of the week for a particular day';
    res.session('SUPPLIER', supplier);
    res.session('SERVICE', service);
    res.say(prompt).shouldEndSession(false).send();

    return false;
  });

app.intent('SetupRescheduleIntent', {
    'slots': {
      'DAY': 'DAYS'
    },
    'utterances': ['{-|DAY}']
  },
  function(req, res) {
    var day = req.slot('DAY');
    var supplier = req.session('SUPPLIER');
    var service = req.session('SERVICE');
    var reprompt = 'Tell me tomorrow or a particular day of the week to schedule your' +
      supplier + ' ' +
      service;

    if (_.isEmpty(day)) {
      var prompt = 'I didn\'t hear tomorrow or a particular day. \
    Tell me tomorrow or a particular day of the week.';
      res.say(prompt).reprompt(reprompt).shouldEndSession(false);
      return true;
    }

    var prompt = 'The installation date for your ' +
      supplier + ' ' +
      service + ' ' +
      'has been moved to ' +
      day;
    res.say(prompt).send();

    return false;
  });

module.exports = app;
