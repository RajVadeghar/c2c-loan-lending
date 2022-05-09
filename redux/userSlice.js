import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'userState',
  initialState: {
    hasError: false,
    data: {
      _id: '',
      username: '',
      email: '',
      img: '',
      aadhar: '',
      pan: '',
      salaryslips: [],
      ctc: '',
      accnum: '',
    },
  },
  reducers: {
    update: (state, action) => {
      state = action.payload
      return state
    },
  },
})

export const { update } = userSlice.actions
export default userSlice.reducer
