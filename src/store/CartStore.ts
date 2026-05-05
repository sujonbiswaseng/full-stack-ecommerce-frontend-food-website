"use client"
import { Slide, toast } from "react-toastify"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  id: string
  name?: string
  price: number
  mealid:string
  image: string
  isAvailable:boolean
  quantity: number,
  deliverycharge:number,
  restaurantName:string
}

interface CartState {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  increase: (id: string) => void
  decrease: (id: string) => void
  clearCart: () => void
  getSubtotal: () => number,
  getDeliveryCharge: () => any
}

export const manageCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => {
          const exist = state.cart.find((i) => i.id === item.id)
         if(!exist){
          const id = toast.loading("Please wait...")
          toast.dismiss(id)
           toast.success("cart item added sucessfully",{theme:"dark",icon:'🏆' as any})
         }
          if (exist) {
            toast.success("item quentity increase sucessfully",{theme:"dark",icon:'🏆' as any,transition:Slide})
            return {
              cart: state.cart.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            }
          }

          return { cart: [...state.cart, item] }
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((i) => i.id !== id),
           success:toast.success("cart item delete sucessfully",{theme:"dark"})
          
        })),

      increase: (id) =>
        set((state) => ({
          cart: state.cart.map((i) =>
            i.id === id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        })),

      decrease: (id) =>
        set((state) => ({
          cart: state.cart.map((i) =>
            i.id === id && i.quantity > 1
              ? { ...i, quantity: i.quantity - 1 }
              : i
          ),
        })),

      clearCart: () => set({ cart: [] }),

      getSubtotal: () =>
        get().cart.reduce(
          (acc, item) =>
            acc + item.price * item.quantity,
          0
        ),

        getDeliveryCharge: () => {
        const cart = get().cart;
        const deliceryCharge = cart.reduce((acc, item) => acc + item.deliverycharge, 0);
        const deliveryCharge = deliceryCharge === 0 ? 0 : 120;
        return deliveryCharge;
      }

    }),
    {
      name: "BiteBase-cart", // save to add to cart
    }
  )
)