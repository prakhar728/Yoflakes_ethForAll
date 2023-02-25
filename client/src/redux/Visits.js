import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";

const helperFunction = (data) =>{
    const response = ethers.utils.parseBytes32String(data);
    return response
}
export const gatherRecords = createAsyncThunk(
    "Visits/gatherRecords",
    async(data,thunkApi)=>{
        try {
            const instance = thunkApi.getState().wallet.instance;
            const response = await instance.showAllVisits(data);
            const recordsAll = []
            if(response.length)
            {for(let i=0;i<response.length;i++){
                let temp = response[i];
                var d = new Date(parseInt(temp[0]) * 1000);
                recordsAll.push(new Array(d,temp[1],temp[2]))
            }}
            console.log("The Response for Records",recordsAll);
            return recordsAll;
        } catch (error) {
            console.log(error);
        }
    }
)

export const visitSlice  =  createSlice({
    name:"visits",
    initialState:{
        loading:null,
        error:null,
        records:null
    },
    extraReducers:(builder)=>{
        function onPending(state){
            state.loading= true
            state.error=null
        }
        function onRejection(state,action) {
            state.loading=false,
            state.error=action.payload
        }
        builder.addCase(gatherRecords.fulfilled,(state,action)=>{
            console.log(action.payload);
            state.records=action.payload
            state.loading=false
        })

        builder.addCase(gatherRecords.pending,onPending);

        builder.addCase(gatherRecords.rejected,onRejection);
    }
})


export default visitSlice.reducer