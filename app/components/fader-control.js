import Ember from 'ember';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';

export default Ember.Component.extend(RecognizerMixin, {
  touchStart(e) {
    this.handleTouchEvents(e);
  },

  touchMove(e) {
    this.handleTouchEvents(e);
  },

  handleTouchEvents: function(e) {
    if (e.target.nodeName === "INPUT") {
      var boundingRect = e.target.getBoundingClientRect();
      var touchPointVertical = e.originalEvent.changedTouches[0].pageY;
      if (touchPointVertical <= boundingRect.bottom && touchPointVertical >= boundingRect.top) {
        var inputHeight = Math.ceil(boundingRect.bottom - boundingRect.top);
        var notches = e.target.max - e.target.min;
        var notchSize = Math.ceil(inputHeight / notches);
        var distanceFromTopOfInput = touchPointVertical - Math.ceil(boundingRect.top);
        var notchesFromTop = distanceFromTopOfInput / notchSize;
        var notchesFromBottom = Math.round(notches - notchesFromTop);
        if (notchesFromBottom > e.target.max) {
          notchesFromBottom = e.target.max;
        }
        if (notchesFromBottom < e.target.min) {
          notchesFromBottom = e.target.min;
        }
        this.set('value', notchesFromBottom);
        e.preventDefault();
      }
    }
  }
});
