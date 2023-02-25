import { configureStore } from '@reduxjs/toolkit'
import walletReducer from './redux/WalletSlice';

const store = configureStore({
  reducer: {
    wallet: walletReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false
    })
}
})

export default store