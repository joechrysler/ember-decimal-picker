import Ember from 'ember';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';

export default Ember.Component.extend(RecognizerMixin, {
  // Since these properties are passed in when we use our component, we don't
  // technically need them here. I like to include them so that when I'm looking
  // at a component's script by itself, I know which properties I can use
  // without having to dig around in the template.
  units: 0,
  tenths: 0,
  hundredths: 0,
  faders: 3,

  minimum: 0.00,
  min: Ember.computed('minimum', function() {
    return this.decimalToDigits(this.get('minimum'));
  }),

  maximum: 2.99,
  max: Ember.computed('maximum', function() {
    return this.decimalToDigits(this.get('maximum'));
  }),

  combinedValue: Ember.computed('units', 'tenths', 'hundredths', 'faders', function() {
    let units = parseInt(this.get('units'));
    let tenths = parseInt(this.get('tenths')) / 10;
    let hundredths = parseInt(this.get('hundredths')) / 100;
    let denominator = 100;
    let val = units + tenths + hundredths;
    return Math.round(val * denominator) / denominator;
  }),

  init: function() {
    this._super();
    this.setProperties(this.decimalToDigits(this.get('initialValue')));
  },

  touchMove(e) {
    // Since we're handling touch events ourselves in the fader control, we don't want
    // to process touchMove events at this level.
    e.preventDefault();
  },

  decimalToDigits: function(decimal) {
    let decimalValue = Number(decimal).toFixed(this.get('faders') - 1);  // A string like "2.99"
    return {
      units: decimalValue[0],
      tenths: decimalValue[2],
      hundredths: decimalValue[3]
    };
  },

  actions: {
    done: function() {
      alert(this.get('combinedValue'));
    },

    clear: function() {
      this.setProperties(this.decimalToDigits(this.get('initialValue')));
    },
  }
});
