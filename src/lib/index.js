import React, { createContext, useContext, useEffect } from "react";

import { useImmer } from "use-immer";

const contexts = {};

function mergeDeep(target, source) {
  const isObject = (obj) => obj && typeof obj === "object";

  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  Object.keys(source).forEach((key) => {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });

  return target;
}

const StoreHooks = (fn, storeKey, { enableCache, storage }) => {
  const [store, setStore] = useImmer(() => {
    const _store = fn({});

    return {
      ..._store,
      ...Object.keys(_store)
        .filter((attr) => typeof _store[attr] === "function")
        .reduce((acc, attr) => {
          acc[attr] = (...args) =>
            setStore((draft) => {
              _store[attr].apply(draft, [...args, { store: draft, setStore }]);

              if (enableCache && storage)
                storage.setItem("@store:" + storeKey, JSON.stringify(draft));
            });
          return acc;
        }, {}),
    };
  });

  useEffect(() => {
    async function initCache() {
      if (enableCache && storage) {
        let cache = await Promise.resolve(
          storage.getItem("@store:" + storeKey)
        );
        cache = cache ? JSON.parse(cache) : {};
        console.log(cache);

        setStore((draft) => {
          Object.keys(cache).forEach((key) => {
            draft[key] = mergeDeep(draft[key], cache[key]);
          });
        });
      }
    }

    initCache();
  }, []);

  return store;
};

const CreateProvider = React.memo(
  ({ Provider, store, storage, enableCache, children, storeKey }) => {
    return (
      <Provider value={store(storeKey, { enableCache, storage })}>
        {children}
      </Provider>
    );
  }
);

export const Store = (fn) => (storeKey, { enableCache, storage }) => {
  const _storeHooks = StoreHooks(fn, storeKey, { enableCache, storage });

  return _storeHooks;
};

export const StoreProvider = ({ stores, storage, enableCache, children }) => {
  return Object.keys(stores).reduce((acc, key) => {
    const StoreContext = createContext();
    contexts[key] = StoreContext;
    return (
      <CreateProvider
        Provider={StoreContext.Provider}
        store={stores[key]}
        storeKey={key}
        enableCache={enableCache}
        storage={storage}
      >
        {acc}
      </CreateProvider>
    );
  }, children);
};

StoreProvider.defaultProps = {
  enableCache: true,
  storage: window !== "undefined" ? localStorage : null,
};

export const useStore = (store) => {
  return useContext(contexts[store]);
};
