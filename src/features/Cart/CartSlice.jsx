import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//! imp APIs
import API from "../../API";

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

const CartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product === action.payload.product
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity++;
      } else {
        state.cartItems?.push({
          ...action.payload,
          quantity: +action.payload.quantity,
          // quantity: 1,
        });
      }
    },
    incrementQuantity: (state, action) => {
      const cartItem = state.cartItems?.find(
        (item) => item.product === action.payload
      );
      cartItem.quantity++;
    },
    decrementQuantity: (state, action) => {
      const cartItem = state.cartItems?.find(
        (item) => item.product === action.payload
      );
      if (cartItem.quantity === 1) {
        cartItem.quantity = 1;
      } else {
        cartItem.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cartItems?.filter(
        (item) => item.product !== action.payload //! action.payload is an _id
      );
      state.cartItems = removeItem;
    },
    emptyCart: (state, action) => {
      state.cartItems = initialState.cartItems;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data?.cart) {
          state.cartItems = action.payload.data.cart.cartItems;
        }
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(postCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(postCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = initialState.cartItems;
      })
      .addCase(postCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeItem,
  emptyCart,
} = CartSlice.actions;
const reducer = CartSlice.reducer;

export default reducer;

export const getCart = createAsyncThunk(
  "/cart/getCart",
  async (_, thunkAPI) => {
    try {
      const response = await API.cart.getCart();
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        response: {
          data: error.response.data,
          status: error.response.status,
          statusText: error.response.statusText,
        },
      });
    }
  }
);

export const postCart = createAsyncThunk(
  "/cart/postCart",
  async (_, thunkAPI) => {
    try {
      const cartItems = thunkAPI.getState().cart?.cartItems;
      const response = await API.cart.postCart({ cartItems });

      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        response: {
          data: error.response.data,
          status: error.response.status,
          statusText: error.response.statusText,
        },
      });
    }
  }
);
