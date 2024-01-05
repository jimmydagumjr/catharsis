import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentTrack: 0
}

const musicPlayerSlice = createSlice({
    name: 'musicPlayer',
    initialState,
    reducers: {
        setCurrentTrack: (state, action) => {
            state.currentTrack = action.payload;
        }
    }
})

export const { setCurrentTrack } = musicPlayerSlice.actions
export default musicPlayerSlice.reducer