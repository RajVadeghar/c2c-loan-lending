import { createSlice } from '@reduxjs/toolkit'

export const detailsSlice = createSlice({
  name: 'detailsState',
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleDetails: (state) => {
      state.isOpen = !state.isOpen
    },
  },
})

export const { toggleDetails } = detailsSlice.actions
export default detailsSlice.reducer
