import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import modalReducer from './modalSlice'
import aadharModalReducer from './aadharModalSlice'
import panModalReducer from './panModalSlice'
import detailsReducer from './detailsSlice'

export default configureStore({
  reducer: {
    userState: userReducer,
    modalState: modalReducer,
    aadharModalState: aadharModalReducer,
    panModalState: panModalReducer,
    detailsState: detailsReducer,
  },
})
