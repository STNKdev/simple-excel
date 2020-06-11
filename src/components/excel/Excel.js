import {$} from '@core/dom';
import {Emitter} from '@core/Emmiter';
import {StoreSubscriber} from '@core/StoreSubscriber';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.store = options.store;
    this.emitter = new Emitter();
    this.subscriber = new StoreSubscriber(this.store);
  }

  getRoot() {
    // const $root = document.createElement('div');
    // $root.classList.add('excel');
    const $root = $.create('div', 'excel');

    const componentOptions = {
      emitter: this.emitter,
      store: this.store
    };

    this.components = this.components.map( (Component) => {
      // const $el = document.createElement('div');
      // $el.classList.add(Component.className);
      const $el = $.create('div', Component.className);
      const component = new Component($el, componentOptions);

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

    this.subscriber.subscribeComponents(this.components);

    this.components.forEach( (component) => component.init() );
  }

  destroy() {
    this.subscriber.unsubscribeFromStore();
    this.components.forEach( (component) => component.destroy() );
  }
}
