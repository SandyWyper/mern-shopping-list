import {
  LISTS_LOADING,
  LISTS_LOADED,
  LISTS_ADD,
  LISTS_DELETE,
  ITEM_ADD,
  ITEM_DELETE,
  SELECT_TAB,
} from '../actions/types';

const initialState = {
  lists: [],
  loading: false,
  activeTab: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LISTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LISTS_LOADED:
      return {
        ...state,
        lists: [...action.payload],
        loading: false,
        activeTab: action.payload[0]._id,
      };
    case ITEM_DELETE:
      // This seems long winded....? Perhaps a refactor at a later date.
      let { listID, itemID } = JSON.parse(action.payload);
      return {
        ...state,
        lists: state.lists.filter((list) => {
          if (list._id !== listID) {
            return list;
          } else {
            const newList = list;
            newList.items = newList.items.filter((item) => item._id !== itemID);
            return newList;
          }
        }),
      };
    case ITEM_ADD:
      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list._id !== action.payload._id) {
            return list;
          } else {
            return action.payload;
          }
        }),
      };
    case LISTS_ADD:
      return {
        ...state,
        lists: [...state.lists, action.payload],
        activeTab: action.payload._id,
      };
    case LISTS_DELETE:
      return {
        ...state,
        lists: state.lists.filter((list) => list._id !== action.payload),
        // If the id for the first list is returned, then set activeTab to the second list of the array if it exists.
        activeTab:
          (state.lists[0]._id !== action.payload && state.lists[0]._id) ||
          (state.lists[1] && state.lists[1]._id) ||
          '',
      };
    case SELECT_TAB:
      return {
        ...state,
        activeTab: action.payload,
      };
    default:
      return state;
  }
}
