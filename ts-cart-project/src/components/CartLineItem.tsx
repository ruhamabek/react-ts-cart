import {ReactElement , ChangeEvent} from 'react'
import { CartItemType, ReducerAction } from '../context/CartProvider'
import { ReducerActionType } from '../context/CartProvider'

type PropsType = {
     REDUCER_ACTIONS: ReducerActionType;
     item: CartItemType;
     dispatch: React.Dispatch<ReducerAction>;
}

const CartLineItem = ({REDUCER_ACTIONS , item, dispatch}: PropsType) =>{

  const img = new URL(`../images/${item.sku}.jpg`, import.meta.url).href

  const lineTotal = (item.price * item.qty);

  const onRemoveFromCart = () => {
    dispatch({type: REDUCER_ACTIONS.REMOVE, payload: item})
  }

  const onQuantityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({type: REDUCER_ACTIONS.QUANTITY, payload: { ...item, qty: Number(e.target.value) }})
  }

  const highestQty = item.qty > 20? 20 : item.qty;
  const optionValues: number[] = [...Array(highestQty).keys()].map(i => i + 1);
  const option: ReactElement[] = optionValues.map(val => {
    return <option key={`opt${val}`} value={val}>{val}</option>
})
const content = (
  <li className="cart__item">
      <img src={img} alt={item.name} className="cart__img" />
      <div aria-label="Item Name">{item.name}</div>
      <div aria-label="Price Per Item">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}</div>

      <label htmlFor="itemQty" className="offscreen">
          Item Quantity
      </label>
      <select
          name="itemQty"
          id="itemQty"
          className="cart__select"
          value={item.qty}
          aria-label="Item Quantity"
          onChange={onQuantityChange}
      >{option}</select>

      <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(lineTotal)}
      </div>

      <button
          className="cart__button"
          aria-label="Remove Item From Cart"
          title="Remove Item From Cart"
          onClick={onRemoveFromCart}
      >
          ❌
      </button>
  </li>
)

return content
}
  
export default CartLineItem