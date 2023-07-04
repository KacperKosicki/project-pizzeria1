import {settings, select} from '../settings.js';

class AmountWidget {
  constructor(element) {
    const thisWidget = this;
      
    thisWidget.getElements(element);
    thisWidget.setValue(thisWidget.input.value || settings.amountWidget.defaultValue);
    thisWidget.initActions();

  }

  getElements(element){
    const thisWidget = this;
    
    thisWidget.element = element;
    thisWidget.input = thisWidget.element.querySelector(select.widgets.amount.input);
    thisWidget.linkDecrease = thisWidget.element.querySelector(select.widgets.amount.linkDecrease);
    thisWidget.linkIncrease = thisWidget.element.querySelector(select.widgets.amount.linkIncrease);

  }

  setValue(value) {
    const thisWidget = this;

    const newValue = parseInt(value);

    const minValue = settings.amountWidget.defaultMin;
    const maxValue = settings.amountWidget.defaultMax;

    if(thisWidget.value !== newValue && !isNaN(newValue)) {
      if (newValue < minValue) {
        thisWidget.value = minValue;
      } else if (newValue > maxValue) {
        thisWidget.value = maxValue;
      } else {
        thisWidget.value = newValue;
      }
    }
    thisWidget.input.value = thisWidget.value;
    thisWidget.announce();
  }

  initActions() {
    const thisWidget = this;

    thisWidget.input.addEventListener('change', function(){
      thisWidget.setValue(this.value);
    });

    thisWidget.linkDecrease.addEventListener('click', function(event){
      event.preventDefault();
      thisWidget.setValue(thisWidget.value - 1);
    });

    thisWidget.linkIncrease.addEventListener('click', function(event){
      event.preventDefault();
      thisWidget.setValue(thisWidget.value + 1);
    });
  }

  announce() {
    const thisWidget = this;
      
    const event = new Event('updated', {
      bubbles: true
    });
    thisWidget.element.dispatchEvent(event);

  }
}

export default AmountWidget;