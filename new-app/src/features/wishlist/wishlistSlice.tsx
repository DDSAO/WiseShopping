import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../redux/store';
import { getServerUrl } from '../Global';

export enum WishlistStatus {
  DRAFT = "draft",
  DOING = "doing",
  DONE = "done",
}



export type Wishlist = {
  title: string,
  id: number,
  status: WishlistStatus,
  items: WishItem[],
  createdDate: number,
  updatedDate: number,
}

export interface WishItem {
  name: string,
  checked: boolean,
  id: number,
}

interface WishlistState {
  wishlists: Wishlist[],
} 

const initialState: WishlistState = {
  wishlists: [
    {
      title: "test wishlist",
      id: 99,
      status: WishlistStatus.DRAFT,
      items: [
        {name: "Egg", checked: false, id:0},
        {name: "Egg2", checked: false, id:1},
        {name: "Egg3", checked: false, id:2},
        {name: "Egg4", checked: false, id:3},
        {name: "Egg5", checked: false, id:4},
      ],
      createdDate: Date.now(),
      updatedDate: Date.now(),
    },
    {
      title: "test wishlist",
      id: 0,
      status: WishlistStatus.DRAFT,
      items: [
        {name: "Egg", checked: false, id:0},
        {name: "Egg2", checked: false, id:1},
        {name: "Egg3", checked: false, id:2},
        {name: "Egg4", checked: false, id:3},
        {name: "Egg5", checked: false, id:4},
      ],
      createdDate: Date.now(),
      updatedDate: Date.now(),
    }, {
      title: "test wishlist",
      id: 1,
      status: WishlistStatus.DRAFT,
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
      createdDate: Date.now(),
      updatedDate: Date.now(),
    }, {
      title: "test wishlist",
      id: 2,
      status: WishlistStatus.DRAFT,
      items: [
        {name: "Egg", checked: false, id:0},
        {name: "Egg2", checked: false, id:1},
        {name: "Egg3", checked: false, id:2},
        {name: "Egg4", checked: false, id:3},
        {name: "Egg5", checked: false, id:4},
      ],
      createdDate: Date.now(),
      updatedDate: Date.now(),
    },
  ],
}

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {

  }
})

export default wishlistSlice.reducer;