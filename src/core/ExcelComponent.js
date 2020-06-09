import {DOMListener} from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscribers = [];

    this.prepare();
  }

  // Настраивает наш компонент до init()
  prepare() {}

  // Возвращает шаблон компонента
  toHTML() {
    return '';
  }

  // Уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // Подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  // Инициализирует компонент
  // Добавляет DOM-слушателей
  init() {
    this.initDOMListeners();
  }

  // Удаляет компонент
  // Чистит слушатели
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach( (unsub) => unsub() );
  }
}
