import {createSlice} from '@reduxjs/toolkit';
import {IAttributetypes, ICategoryItem} from '../../interface';

const INITIAL_STATE: {
  categories: ICategoryItem[];
  attributes: Record<ICategoryItem['id'], IAttributetypes[]>;
  defaultTitles?: Record<string, any>;
  activeDrawer?: string;
} = {
  categories: [],
  attributes: {},
  defaultTitles: {},
  activeDrawer: undefined,
};

const catogorySlice = createSlice({
  name: 'Category',
  initialState: INITIAL_STATE,
  reducers: {
    onAddCategory(state, action) {
      state.categories.push(action.payload);
    },
    setCategoryName(state, action) {
      const {itemIndex, value} = action.payload;
      state.categories[itemIndex].title = value;
    },
    removeCategory(state, action) {
      state.categories = state.categories.filter(
        cat => cat.id !== action.payload,
      );
    },

    onAddAttribute(state, action) {
      const payload = action.payload;
      if (!state.attributes[payload.categoryId]) {
        state.attributes[payload.categoryId] = [payload];
      } else {
        const exisitingAttr = state.attributes[payload.categoryId].find(
          att =>
            att.key?.toLowerCase().replace(/ /g, '') ===
            payload?.key?.toLowerCase().replace(/ /g, ''),
        );
        if (!exisitingAttr) {
          state.attributes[payload.categoryId].push(payload);
        }
      }
    },
    removeAtt(state, action) {
      const {itemIndex, category} = action.payload;
      const prevState = state.attributes[category];
      const filtered = state.attributes[category].filter(
        (att, i) => i !== itemIndex,
      );

      state.attributes[category] = filtered;

      if (
        state.defaultTitles?.[category]?.toLowerCase() ===
        prevState[itemIndex].key?.toLowerCase()
      ) {
        if (state.attributes[category].length > 0) {
          state.defaultTitles = {
            ...state.defaultTitles,
            [category]: state.attributes[category][0].key,
          };
        } else {
          state.defaultTitles = {
            ...state.defaultTitles,
            [category]: undefined,
          };
        }
      }
    },

    setDefaultTitle(state, action) {
      state.defaultTitles = {
        ...state.defaultTitles,
        [action.payload.categoryId]: action.payload.value,
      };
    },
    trackActiveDrawer(state, action) {
      state.activeDrawer = action.payload;
    },
  },
});

export const {
  onAddCategory,
  setCategoryName,
  removeCategory,
  onAddAttribute,
  removeAtt,
  setDefaultTitle,trackActiveDrawer
} = catogorySlice.actions;
export default catogorySlice.reducer;
