type PropsType = {
  viewCart: boolean,
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>,
}
const Nav = ({viewCart, setViewCart}: PropsType) => {
    
  const button = viewCart ? (
    <button onClick={() => setViewCart(false)}>View Cart</button>
  ) : (
    <button onClick={() => setViewCart(true)}>Add to Cart</button>
  )

   const content = <nav>{button}</nav>

  return content
}

export default Nav