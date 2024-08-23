import { Navigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

const ShoppingCart = ({ token, dataShoppingCart }) => {
  console.log('dataShoppingCart in ShoppingCart:', dataShoppingCart);
  const num = dataShoppingCart.product_price;
  console.log('num in ShoppingCart:', num);
  const price = Number(num).toFixed(2);
  console.log('price in ShoppingCart:', price);

  return token ? (
    <div className='boxShoppingCart'>
      <div className="wrapper">
        <div className="shoppingCart">
          <h1>Résumé de la commande N° {uuidv4()} de {dataShoppingCart.owner.account.username}</h1>
          <div className="top">
            <div className="command">
              <div><p>commande:</p><div>{price}</div></div>
              <div><p>Frais protection acheteurs:</p><div>0, 80 €</div></div>
              <div><p>Frais de port:</p><div>0, 80 €</div></div>
            </div>
          </div>
          <div className="bottom">

          </div>
        </div>
      </div>
    </div>
  ) : <Navigate to='/login' />
}

export default ShoppingCart