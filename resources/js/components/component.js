class Component {
  constructor(element) {
    if (!this.constructor.selector)
      throw new Error("Missing component selector");

    this.element = element;
  }

  _setModifierStatus(
    modifierOrModifiers,
    elementName = null,
    status,
    options = {}
  ) {
    const action =
      status === "on" ? "add" : status === "off" ? "remove" : "toggle";
    const modifiers = Array.isArray(modifierOrModifiers)
      ? modifierOrModifiers
      : [modifierOrModifiers];
    const target = elementName
      ? this.findElement(elementName, options.scope)
      : this.element;
    const baseClass = elementName
      ? this.getSelectorForElement(elementName).substring(1)
      : this.constructor.className;
    modifiers.forEach((modifier) =>
      target.classList[action](`${baseClass}--${modifier}`)
    );
  }

  setModifier(modifierOrModifiers, status, options = {}) {
    this._setModifierStatus(modifierOrModifiers, null, status, options);
  }

  addModifier(modifierOrModifiers, options = {}) {
    this.setModifier(modifierOrModifiers, "on", options);
  }

  removeModifier(modifierOrModifiers, options = {}) {
    this.setModifier(modifierOrModifiers, "off", options);
  }

  toggleModifier(modifierOrModifiers, options = {}) {
    this.setModifier(modifierOrModifiers, "toggle", options);
  }

  hasModifier(modifierOrModifiers, options = {}) {
    const modifiers = Array.isArray(modifierOrModifiers)
      ? modifierOrModifiers
      : [modifierOrModifiers];
    return modifiers.every(() =>
      this.element.classList.contains(
        `${this.constructor.className}--${modifierOrModifiers}`
      )
    );
  }

  setElementModifier(elementName, modifierOrModifiers, status, options = {}) {
    this._setModifierStatus(modifierOrModifiers, elementName, status, options);
  }

  addElementModifier(elementName, modifierOrModifiers, options = {}) {
    this.setElementModifier(elementName, modifierOrModifiers, "on", options);
  }

  removeElementModifier(elementName, modifierOrModifiers, options = {}) {
    this.setElementModifier(elementName, modifierOrModifiers, "off", options);
  }

  toggleElementModifier(elementName, modifierOrModifiers, options = {}) {
    this.setElementModifier(
      elementName,
      modifierOrModifiers,
      "toggle",
      options
    );
  }

  getSelectorForElement(name, modifierOrModifiers) {
    const elementSelector = name
      ? `${this.constructor.selector}__${name}`
      : this.constructor.selector;
    const modifiers = Array.isArray(modifierOrModifiers)
      ? modifierOrModifiers
      : typeof modifierOrModifiers === "string"
      ? [modifierOrModifiers]
      : [];
    const modifiersQuery = modifiers
      .map((modifier) => `${elementSelector}--${modifier}`)
      .join();
    return `${elementSelector}${modifiersQuery}`;
  }

  getClassNameForElement(name) {
    return name
      ? `${this.constructor.className}__${name}`
      : this.constructor.className;
  }

  findElement(name, modifiers = [], options = {}) {
    return this.querySelector(
      this.getSelectorForElement(name, modifiers),
      options
    );
  }

  findElements(name, modifiers = [], options = {}) {
    return this.querySelectorAll(
      this.getSelectorForElement(name, modifiers),
      options
    );
  }

  querySelector(selector, options = {}) {
    const container = options.scope || this.element;
    return container.querySelector(selector);
  }

  querySelectorAll(selector, options = {}) {
    const container = options.scope || this.element;
    return container.querySelectorAll(selector);
  }

  destroy() {
    delete this.element._instance;
  }

  static initInstances(scope) {
    scope.querySelectorAll(this.selector).forEach((element) => {
      element._instance = new this(element);
    });
  }

  static get className() {
    return this.selector.substring(1);
  }
}

export default Component;
