import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  address:"0x0",
  signer:"",
  instance:""
}

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    updateAddress:(state,action)=>{
        state.address=action.payload
    }
    ,
    updateSigner: (state,action) => {
      state.signer = action.payload
    },
    updateInstance:(state,action)=>{
      state.instance=action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateAddress, updateSigner,updateInstance} = walletSlice.actions

export default walletSlice.reducer