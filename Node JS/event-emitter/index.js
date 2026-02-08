class MyEventEmitter {
  constructor() {
    // TODO: Initialize a data structure to store event-to-listener mappings.
    // Think about which structure offers the best lookup and deletion time.
    this.eventEmitter = {};
  }

  /**
   * Register a listener for a specific event.
   * @param {string} eventName 
   * @param {Function} listener 
   */
  on(eventName, listener) {
    // TODO: Add the listener to the collection for eventName.
    // LLD Tip: What happens if listener isn't a function?
    if(typeof listener !== "function"){
      console.log("Error! Listener can only be functions!");
      return;
    }
    if(this.eventEmitter[eventName] === undefined){
      this.eventEmitter[eventName] = [];
    }
    this.eventEmitter[eventName].push(listener);
  }

  /**
   * Trigger all listeners registered for a specific event.
   * @param {string} eventName 
   * @param {...any} args - Arguments to pass to the listeners.
   */
  emit(eventName, ...args) {
    // TODO: Retrieve all listeners for eventName and execute them with args.
    // LLD Tip: Should listeners be executed synchronously or asynchronously?
    const listeners = this.eventEmitter[eventName];
    if(listeners === undefined){
      console.log(`No listener exist for ${eventName} event`);
      return;
    }
    for(let i=0; i<listeners.length; i++){
      listeners[i](...args);
    }
  }

  /**
   * Remove a specific listener from an event.
   * @param {string} eventName 
   * @param {Function} listenerToRemove 
   */
  off(eventName, listenerToRemove) {
      const listeners = this.eventEmitter[eventName];
      if (listeners) {
          const index = listeners.lastIndexOf(listenerToRemove);
          if (index !== -1) {
              listeners.splice(index, 1); 
          }
      }
  }

  /**
   * Register a listener that only fires once.
   * @param {string} eventName 
   * @param {Function} listener 
   */
  once(eventName, listener) {
    // TODO: Create a wrapper function that executes the listener 
    // and then automatically calls .off()
  }

  /**
   * Optional: Remove all listeners for a specific event or all events.
   */
  removeAllListeners(eventName) {
    if(this.eventEmitter[eventName] !== undefined){
      this.eventEmitter[eventName] = []
    }
  }
}




const eventEmitter = new MyEventEmitter();
eventEmitter.on("onBoard", () => console.log("Greetings! Welcome to the platform"));
eventEmitter.on("onBoard", (userName) => console.log(`SignUp OTP has been sent to ${userName}`));
// eventEmitter.on("greetByName", (name1, name2) => console.log(`Greetings ${name1} and ${name2}!`));
// eventEmitter.emit("greet", "sarthak");
// eventEmitter.emit("greetByName", "alice", "bob");
eventEmitter.emit("onBoard", "sarthak_pm");
eventEmitter.emit("onBoarding", "sarthak_pm");

