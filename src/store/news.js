import { createSlice } from '@reduxjs/toolkit';

export const newsSlice = createSlice({
  name: 'news',
  initialState: {
    start: 0,
    selectedTag: null,
    tagDisp: false,
    logPart: null,
    home: false
  },
  reducers: {
    saveStart: (state, action) => {
      state.start = action.payload
    },
    saveTag: (state,action) => {
      state.selectedTag = action.payload.selectedTag
      state.tagDisp = action.payload.tagDisp
      state.logPart = action.payload.logPart
    },
    saveHome: state => {
      state.home = true
    },
    delHome: state => {
      state.home = false
    }
  }
})

export const { saveStart, saveHome, saveTag, delHome } = newsSlice.actions

export const selectHome = state => state.news.home;

export default newsSlice.reducer

