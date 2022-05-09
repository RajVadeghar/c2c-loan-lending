import { createSlice } from '@reduxjs/toolkit'

export const aadharModalSlice = createSlice({
  name: 'aadharModalState',
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleAadhar: (state) => {
      state.isOpen = !state.isOpen
    },
  },
})

export const { toggleAadhar } = aadharModalSlice.actions
export default aadharModalSlice.reducer
