import {storage} from '@core/utilits';

export class LocalStorageClient {
  constructor(name) {
    this.name = storageName(name);
  }

  save(state) {
    storage(this.name, state);
    return Promise.resolve();
  }

  get() {
    // return Promise.resolve(storage(this.name));
    return new Promise((resolve) => {
      const state = storage(this.name);

      setTimeout(() => resolve(state), 2500);
    });
  }
}

function storageName(param) {
  return `excel:${param}`;
}