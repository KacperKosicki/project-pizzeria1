class BaseWidget {
  constructor(wrapperElement, initialValue) {
      const thisWidget = this;

      thisWidget.dom = {};
      thisWidget.dom.wrapper = wrapperElement;

      thisWidget.value = initialValue;
  }

  setValue(value) {
      const thisWidget = this;
  
      const newValue = thisWidget.parseValue(value);
  
      //const minValue = settings.amountWidget.defaultMin;
      //const maxValue = settings.amountWidget.defaultMax;
  
      //if(thisWidget.value !== newValue && !isNaN(newValue)) {
        //if (newValue < minValue) {
          //thisWidget.value = minValue;
        //} else if (newValue > maxValue) {
          //thisWidget.value = maxValue;
        //} else {
          //thisWidget.value = newValue;
        //}
      //}
  
      if(newValue != thisWidget.value && thisWidget.isValid(newValue)) {
        thisWidget.value = newValue;
        thisWidget.announce();
      }
  
      thisWidget.renderValue();
      //thisWidget.dom.input.value = thisWidget.value;
      //thisWidget.announce();
  }

  parseValue(value) {
      return parseInt(value);
  }
  
  isValid(value) {
      return !isNaN(value)
  }

  renderValue() {
      const thisWidget = this;
  
      thisWidget.dom.wrapper.innerHTML = thisWidget.value;
  }

  announce() {
      const thisWidget = this;
        
      const event = new Event('updated', {
        bubbles: true
      });
      thisWidget.dom.wrapper.dispatchEvent(event);
  }
}

export default BaseWidget;