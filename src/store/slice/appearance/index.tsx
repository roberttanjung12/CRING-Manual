import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { appearanceConfiguration } from '@/configurations/appearance';
import type { Appearance, Sidebar } from './appearance-types';

const initialState: Appearance = appearanceConfiguration;

const AppearanceSlice = createSlice({
  name: 'appearance',
  initialState,
  reducers: {
    hoverSidebar: (state: Appearance, action) => {
      state.sidebar.isHover = action.payload;
    },
    resetAppearance: () => initialState,
    setAppearance: {
      reducer: <Key extends keyof Appearance>(
        state: Appearance,
        action: PayloadAction<{ key: Key; value: Appearance[Key] }>
      ) => {
        state[action.payload.key] = action.payload.value;
      },
      prepare: <Key extends keyof Appearance>(key: Key, value: Appearance[Key]) => ({
        payload: { key, value }
      })
    },
    setSidebar: {
      reducer: <Key extends keyof Sidebar>(
        state: Appearance,
        action: PayloadAction<{ key: Key; value: Sidebar[Key] }>
      ) => {
        state.sidebar[action.payload.key] = action.payload.value;
      },
      prepare: <Key extends keyof Sidebar>(key: Key, value: Sidebar[Key]) => ({
        payload: { key, value }
      })
    },
    toggleCardShadow: (state: Appearance) => {
      state.isCardShadow = !state.isCardShadow;
    },
    toggleLayout: (state: Appearance) => {
      state.isContainerFull = !state.isContainerFull;
    },
    toggleSidebar: (state: Appearance) => {
      state.sidebar.isCollapse = !state.sidebar.isCollapse;
    },
    toggleMobileSidebar: (state: Appearance) => {
      state.sidebar.isMobile = !state.sidebar.isMobile;
    },
    redirectSidebar: state => {
      state.sidebar.isHover = false;
      state.sidebar.isCollapse = true;
    }
  }
});

export const {
  hoverSidebar,
  resetAppearance,
  setAppearance,
  setSidebar,
  toggleCardShadow,
  toggleSidebar,
  toggleMobileSidebar,
  toggleLayout,
  redirectSidebar
} = AppearanceSlice.actions;

export default AppearanceSlice.reducer;
