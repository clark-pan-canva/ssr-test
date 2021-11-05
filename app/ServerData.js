import React from 'react';

export const makeController = (store) => {
  const waiting = new Map();
  const ensureChunk = (data) => {
    switch (data.state) {
      case 'pending': {
        let promise;
        if (!waiting.has(data.key)) {
          let resolver, rejecter;
          promise = new Promise((res, rej) => { resolver = res; rejecter = rej;});
          waiting.set(data.key, [promise, resolver, rejecter]);
        } else {
          [promise] = waiting.get(data.key);
        }
        throw promise;
      }
      case 'error': {
        throw data.error;
      }
      case 'success': {
        return data.data;
      }
    }
  }
  const updateChunk = (data) => {
    store[data.key] = data;
    if (waiting.has(data.key)) {
      const [_ ,resolver, rejecter] = waiting.get(data.key);
      switch (data.state) {
        case 'error': {
          rejecter();
        }
        case 'success': {
          resolver();
        }
      }
    }
  }
  return {
    updateChunk,
    ensureChunk,
  }
}

const DataContext = React.createContext(null);

export const DataProvider = ({ children, controller }) =>
  <DataContext.Provider value={controller}>{children}</DataContext.Provider>;

export const useData = (data) => {
  const controller = React.useContext(DataContext);
  return controller.ensureChunk(data);
}