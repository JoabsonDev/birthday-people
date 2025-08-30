function Observable() {
  const observers = new Set();

  const subscribe = (fn) => {
    observers.add(fn);
    return () => unsubscribe(fn);
  };

  const unsubscribe = (fn) => {
    observers.delete(fn);
  };

  const notify = (data) => {
    observers.forEach((fn) => fn(data));
  };

  return { subscribe, unsubscribe, notify };
}

const observable = Observable();

export { observable };
