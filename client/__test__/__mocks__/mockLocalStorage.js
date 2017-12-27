export default class LocalStorageMock {
	/**
   * Creates an instance of LocalStorageMock.
   * 
   * @memberOf LocalStorageMock
   */
	constructor() {
		this.store = {};
	}

	/**
   * 
   * 
   * 
   * @memberOf LocalStorageMock
   */
	clear() {
		this.store = {};
	}

	/**
   * 
   * 
   * @param {any} key 
   * @returns 
   * 
   * @memberOf LocalStorageMock
   */
	getItem(key) {
		return this.store[key] || null;
	}

	/**
   * 
   * 
   * @param {any} key 
   * @param {any} value 
   * 
   * @memberOf LocalStorageMock
   */
	setItem(key, value) {
		this.store[key] = value.toString();
	}

	/**
   * 
   * 
   * @param {any} key 
   * 
   * @memberOf LocalStorageMock
   */
  removeItem(key) {
		delete this.store[key];
	}
}
