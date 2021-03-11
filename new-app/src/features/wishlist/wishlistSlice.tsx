import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../redux/store';
import { getServerUrl } from '../Global';




export type Wishlist = {
  title: string,
  id: number,
  status: "draft"|"doing"|"done",
  items: WishItem[],
  createdDate: number,
  updatedDate: number,
  color: "blue" | "red" | "green" | "default",
}

export interface WishItem {
  name: string,
  checked: boolean,
  id: number,
}

interface WishlistState {
  wishlists: Wishlist[],
  pastWishlists: Wishlist[],
  fetchStatus: "fetching" | "fetched",
} 

const initialState: WishlistState = {
  fetchStatus: "fetched",
  pastWishlists: [
    {
      title: "best wishlist",
      id: 0,
      status: "doing",
      items: [
        {name: "Egg", checked: false, id:0},
        {name: "Egg2", checked: false, id:1},
        {name: "Egg3", checked: false, id:2},
        {name: "Egg4", checked: false, id:3},
        {name: "Egg5", checked: false, id:4},
      ],
      createdDate: Date.now() - 100,
      updatedDate: Date.now(),
      color: "red",
    }
  ],
  wishlists: [
    {
      title: "aest wishlist",
      id: 99,
      status: "draft",
      items: [
        {name: "Egg", checked: false, id:0},
        {name: "Egg2", checked: false, id:1},
        {name: "Egg3", checked: false, id:2},
        {name: "Egg4", checked: false, id:3},
        {name: "Egg5", checked: false, id:4},
      ],
      createdDate: Date.now() + 100,
      updatedDate: Date.now(),
      color: "default",
    },
    {
      title: "cest wishlist",
      id: 1,
      status: "doing",
      items: [
        {name: "Egg", checked: false, id:0},
        {name: "Egg2", checked: false, id:1},
        {name: "Egg3", checked: false, id:2},
        {name: "Egg4", checked: false, id:3},
        {name: "Egg5", checked: false, id:4},
        {name: "Egg5", checked: false, id:5},
        {name: "Egg5", checked: false, id:6},
        {name: "Egg5", checked: false, id:7},
        {name: "Egg5", checked: false, id:8},
        {name: "Egg5", checked: false, id:9},
        {name: "Egg5", checked: false, id:10},
      ],
      createdDate: Date.now() ,
      updatedDate: Date.now(),
      color: "blue",
    }, {
      title: "dest wishlist",
      id: 2,
      status: "doing",
      items: [
        {name: "Egg", checked: false, id:0},
        {name: "Egg2", checked: false, id:1},
        {name: "Egg3", checked: false, id:2},
        {name: "Egg4", checked: false, id:3},
        {name: "Egg5", checked: false, id:4},
      ],
      createdDate: Date.now(),
      updatedDate: Date.now(),
      color: "green",
    },
    
  ],
}


export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleCheck: (state, action: PayloadAction<{wid: number, id:number}>) => {
      let wishlist = state.wishlists.find((wishlist) => wishlist.id === action.payload.wid)!
      wishlist.updatedDate = Date.now()
      let item = wishlist.items.find((item) => item.id === action.payload.id)!
      item.checked = ! item.checked
    },
    removeItem: (state, action: PayloadAction<{wid: number, id:number}>) => {
      const { wid, id } = action.payload
      const wishlist = state.wishlists.find((wishlist) => wishlist.id === wid)!
      const items = wishlist.items.filter((item) => item.id !== id)
      wishlist.items = items
    },
    deleteWishlist: (state, action: PayloadAction<{wid: number}>) => {
      const { wid } = action.payload
      state.wishlists= state.wishlists.filter((wishlist) => wishlist.id !== wid)
    },
    deletePastWishlist: (state, action: PayloadAction<{wid: number}>) => {
      const { wid } = action.payload
      state.pastWishlists = state.pastWishlists.filter((wishlist) => wishlist.id !== wid)
    },
    finishWishlist: (state, action: PayloadAction<{wid: number}>) => {
      let pastWishlists:Wishlist[] = []
      state.wishlists = state.wishlists.filter((wishlist) => {
        if (wishlist.id !== action.payload.wid) return true
        wishlist.updatedDate = Date.now()
        wishlist.status = "done"
        pastWishlists = [...state.pastWishlists, wishlist]
        return false
      })
      state.pastWishlists = pastWishlists
    }
  }
})

export const { toggleCheck, removeItem, deleteWishlist, deletePastWishlist, finishWishlist } = wishlistSlice.actions

export default wishlistSlice.reducer;