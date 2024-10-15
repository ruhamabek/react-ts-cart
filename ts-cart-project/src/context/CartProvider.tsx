import {createContext , useMemo, useReducer, Reducer, ReactElement} from "react";

type initCartType = {
  sku: string
  name: string
  price: number
  quantity: number
}

type initCartStateType = {
  cart: initCartType[]
}

export const initCartState: initCartStateType = {
  cart: []
}

const REDUCER_ACTION_TYPE = {
  ADD : "ADD" ,
  REMOVE: "REMOVE",
  SUBMIT: 'SUBMIT',
  QUANTITY: "QUANTITY"
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

type ReducerAction = {
  type: string,
  payload?: initCartType
}

const reducer: Reducer<initCartStateType, ReducerAction> = (state: initCartStateType , action: ReducerAction) => {
  switch (action.type) {
             case REDUCER_ACTION_TYPE.ADD: {
           if(!action.payload) {
               throw new Error("Action payload missing in ADD action")
           }

          const {sku , name , price } = action.payload;
          const filteredCart:initCartType[] = state.cart.filter(item => item.sku !==  sku);
          const itemExist = state.cart.find(item => item.sku === sku);
          const quantity = itemExist ? itemExist.quantity + 1 : 1;

          return {...state , cart: [...filteredCart , {sku , name , price , quantity}]};

       }

       case REDUCER_ACTION_TYPE.REMOVE: {
         if(!action.payload) {
           throw new Error("Action payload missing in REMOVE action")
         }

        const {sku} = action.payload;

        const filteredCart:initCartType[] = state.cart.filter(item => item.sku !==  sku);
        return{ ...state , cart: [...filteredCart]};

       }

       case REDUCER_ACTION_TYPE.QUANTITY: {
          if(!action.payload) {
            throw new Error("Action payload missing in QUANTITY action")
          }
          
          const {sku , quantity} = action.payload;
          const filteredCart:initCartType[] = state.cart.filter(item => item.sku !==  sku);
          const itemExist: initCartType | undefined = state.cart.find(item => item.sku === sku);
          if(!itemExist){
            throw new Error("Item does not exist in cart")
          }
          const updatedCart = {...itemExist , quantity}

          return{...state, cart: [...filteredCart , updatedCart]}
       }

       case REDUCER_ACTION_TYPE.SUBMIT: {
         if(!action.payload) {
           throw new Error("Action payload missing in SUBMIT action")
         }

         return {...state , cart: []}
       }
       default: {
         throw new Error(`Unhanded action type: ${action.type}`)
       }
  }
}
const useCartContext = (initCartState: initCartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState)

  const REDUCER_ACTIONS = useMemo(() => {
      return REDUCER_ACTION_TYPE
  }, [])

  const totalItems = state.cart.reduce((previousValue, cartItem) => {
      return previousValue + cartItem.quantity
  }, 0)

  const totalPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
      state.cart.reduce((previousValue, cartItem) => {
          return previousValue + (cartItem.quantity * cartItem.price)
      }, 0)
  )

  const cart = state.cart.sort((a, b) => {
      const itemA = Number(a.sku.slice(-4))
      const itemB = Number(b.sku.slice(-4))
      return itemA - itemB
  })

  return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart }
}

type useCartContextType = ReturnType<typeof useCartContext>
const initCartContext: useCartContextType = {
     dispatch: () => {},
     REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
     totalItems: 0,
     totalPrice: '',
     cart: []
}

const CartContext = createContext<useCartContextType>(initCartContext)

type ChildrenType = {
  children: ReactElement | ReactElement[]
}

export const CartProvider = ({children}: ChildrenType) => {
       <CartContext.Provider value={useCartContext(initCartContext)}>
        {children}
       </CartContext.Provider>
}


export default CartContext