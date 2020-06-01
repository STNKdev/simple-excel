import {$} from '@core/dom';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    // const $root = document.createElement('div');
    // $root.classList.add('excel');
    const $root = $.create('div', 'excel');
    this.components = this.components.map( (Component) => {
      // const $el = document.createElement('div');
      // $el.classList.add(Component.className);
      const $el = $.create('div', Component.className);
      const component = new Component($el);
      // $el.innerHTML = component.toHTML();
      // DEBUG
      if (component.name) {
        window['c' + component.name] = component;
      }
      $el.html(component.toHTML());
      $root.append($el);
      // $root.insertAdjacentHTML('beforeend', component.toHTML());
      return component;
    });

    return $root;
  }

  render() {
    // this.$el.insertAdjacentHTML('afterbegin', `<h1>ТЕСТ</h1>`);
    this.$el.append(this.getRoot());
    this.components.forEach( (component) => component.init() );
  }
}
