import { createSlice } from '@reduxjs/toolkit'

export const panModalSlice = createSlice({
  name: 'panModalState',
  initialState: {
    isOpen: false,
  },
  reducers: {
    togglePan: (state) => {
      state.isOpen = !state.isOpen
    },
  },
})

export const { togglePan } = panModalSlice.actions
export default panModalSlice.reducer
