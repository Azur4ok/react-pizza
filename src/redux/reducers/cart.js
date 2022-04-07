const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = (array) => array.reduce((sum, obj) => obj.price + sum, 0);

const _get = (object, path) => {
  const [firstKey, ...keys] = path.split('.');
  return keys.reduce((val, key) => {
    return val[key];
  }, object[firstKey]);
};

const getTotalSum = (object, path) => {
  return Object.values(object).reduce((sum, object) => {
    const value = _get(object, path);
    return sum + value;
  }, 0);
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PIZZA_CART': {
      const currentPizzasItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];
      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzasItems,
          totalPrice: getTotalPrice(currentPizzasItems),
        },
      };
      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');

      return {
        ...state,
        items: newItems,
        totalCount: totalCount,
        totalPrice: totalPrice,
      };
    }
    case 'CLEAR_CART':
      return {
        items: {},
        totalCount: 0,
        totalPrice: 0,
      };
    case 'REMOVE_PIZZA_CART': {
      const newItems = {
        ...state.items,
      };
      const currentTotalPrice = newItems[action.payload].totalPrice;
      const currentTotalCount = newItems[action.payload].items.length;
      delete newItems[action.payload];
      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount,
      };
    }
    case 'PLUS_CART_ITEM': {
      const newObjItems = [...state.items[action.payload].items, state.items[action.payload].items[0]];
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };
      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }
    case 'MINUS_CART_ITEM': {
      const oldItems = state.items[action.payload].items;
      const newObjItems =
        oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems;
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
