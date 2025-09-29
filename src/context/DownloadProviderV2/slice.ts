import { createSlice } from '@reduxjs/toolkit';

interface DownloadSliceSliceData {
  downloadIsOpen: boolean;
  downloadIsShow: boolean;
  downloadData: any[];
  downloadLength: number;
}

const initialState: DownloadSliceSliceData = {
  downloadIsOpen: false,
  downloadIsShow: false,
  downloadData: [],
  downloadLength: 0
};

const DownloadSliceSlice = createSlice({
  name: 'download',
  initialState,
  reducers: {
    onStoreDownloadGet: (state, action) => {
      state.downloadIsOpen = !!action.payload.length;
      state.downloadIsShow = !!action.payload.length;
      state.downloadData = action.payload;
      state.downloadLength = action.payload.length;
    },
    onStoreDownloadAdd: (state, action) => {
      state.downloadIsOpen = true;
      state.downloadIsShow = true;
      state.downloadData = action.payload;
      state.downloadLength += 1;
    },
    onStoreDownloadOpenToggle: (state, action) => {
      state.downloadIsOpen = action.payload;
    },
    onStoreDownloadShowToggle: (state, action) => {
      state.downloadIsShow = action.payload;
    },
    onStoreDownloadLengthAdd: state => {
      state.downloadLength += 1;
    },
    onStoreDownloadLengthDelete: state => {
      state.downloadIsOpen = !!(state.downloadLength - 1);
      state.downloadIsShow = !!(state.downloadLength - 1);
      state.downloadLength = state.downloadLength - 1;
    }
  }
});

export const {
  onStoreDownloadGet,
  onStoreDownloadAdd,
  onStoreDownloadOpenToggle,
  onStoreDownloadShowToggle,
  onStoreDownloadLengthAdd,
  onStoreDownloadLengthDelete
} = DownloadSliceSlice.actions;

export type { DownloadSliceSliceData };

export default DownloadSliceSlice.reducer;
