export class Emitter {
  constructor() {
    this.listeners = {};
  }

  // dispath, fire, trigger
  // Уведомляем слушателей, если они есть
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
    return true;
  }

  // on, listen
  // Подписваемся на уведомления
  // Или добавляем слушателя
  subscribe(event, fn) {
    // Если еще не определён, то это будет пустой массив,
    // если уже определен, то тогда присваевается значение этого массива
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    return () => {
      this.listeners[event] = this.listeners[event]
          .filter((listener) => listener !== fn);
    };
  }
}
