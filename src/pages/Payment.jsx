import { v4 as uuidv4 } from 'uuid';
import { useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'cookies-js';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useState } from 'react';

//connection Stripe
const stripeConnect = loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_KEY_PUBLIC);


const Payment = ({ token, dataShoppingCart, setDataShoppingCart }) => {
  const [succes, setSucces] = useState(false);
  const { state } = useLocation();
  console.log('state: in /payment:', state);
  const { product_name, product_price, product_image, product_id } = state;
  console.log('product_name:', product_name, '\n', 'product_price:', product_price, '\n', 'product_image:', product_image, '\n', 'product_id:', product_id);


  useEffect(() => {
    const newDataShoppingCart = [...dataShoppingCart];
    const objData = {
      product_id: product_id,
      product_name: product_name,
      product_price: product_price,
      product_image: product_image,
    };
    console.log('objData in offer/:id:', objData);
    newDataShoppingCart.push(objData);
    console.log('newDataShoppingCart in offer/:id:', newDataShoppingCart);
    setDataShoppingCart(newDataShoppingCart);
    console.log('dataShoppingCart inside handleclick in offer/:id:', dataShoppingCart);
  }, [])

  useEffect(() => {
    const StrDataShoppingCart = JSON.stringify(dataShoppingCart);
    Cookies.set('vintedShoppingCart', StrDataShoppingCart, { expires: 15, secure: true });
    // Vérification de la création du cookie
    console.log('Cookie set:', Cookies.get('vintedShoppingCart'));
  }, [dataShoppingCart]);
  console.log('Number((product_price * 100).toFixed(0)):', Number((product_price * 100).toFixed(0)));
  console.log('typeof Number((product_price * 100).toFixed(0)):', typeof Number((product_price * 100).toFixed(0)));
  const options = {
    mode: "payment",
    amount: Number((product_price * 100).toFixed(0)),
    currency: "eur",
    appearance: {
      theme: 'Night',
      style: {
        base: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#32325d',
        },
        shapes: {
          borderRadius: '12',
          borderWidth: '0.5',
        },
        primaryButton: {
          shapes: {
            borderRadius: '20',
          },
        },
        colors: {
          primary: '#fcfdff',
          background: '#ffffff',
          componentBackground: '#f3f8fa',
          componentBorder: '#f3f8fa',
          componentDivider: '#000000',
          primaryText: '#000000',
          secondaryText: '#000000',
          componentText: '#000000',
          placeholderText: '#73757b',
        },
      }
    },
  }
  let price = Number(product_price).toFixed(2);
  console.log('price in /payment:', price);
  const buyerProtectionCosts = Number(0.40).toFixed(2);
  console.log('buyerProtectionCosts:', buyerProtectionCosts);
  const shippingCosts = Number(0.80).toFixed(2);
  console.log('shippingCosts:', shippingCosts);
  const subTotal = Number((buyerProtectionCosts * 100).toFixed(0)) + Number((shippingCosts * 100).toFixed(0)) + Number((price * 100).toFixed(0));
  console.log('subTotal:', subTotal);
  const total = (subTotal / 100).toFixed(2);
  console.log('total:', total);
  console.log('dataShoppingCart in /payment:', dataShoppingCart);

  return token ? (
    <div className='boxShoppingCart'>
      <div className="wrapper">
        <div className="shoppingCart">
          <h1>Commande N° {uuidv4()}</h1>
          <div className={succes ? 'hide' : "top"}>
            {/* {dataShoppingCart.map((dataShop, key = dataShop.product_id) => {
              const num = dataShop.product_price;
              console.log('num in ShoppingCart:', num);
              let price = Number(num).toFixed(2);
              console.log('price in ShoppingCart:', price);
              console.log('dataShop:', dataShop);
              if (dataShop.product_id === dataShop.product_id) {

              }
              return (
                <>
                  <div className="command" key={key}>

                  </div>
                </>
              )
            })} */}
            <div className="command">
              <p>commande:</p>
              <div>{price} €</div>
            </div>
            <div className="coast">
              <div>
                <p>Frais de protection acheteurs:</p>
                <div>{buyerProtectionCosts} €</div>
              </div>
              <div>
                <p>Frais de port:</p>
                <div>{shippingCosts} €</div>
              </div>
            </div>
            <div className="total">
              <div>
                <p>Total:</p>
                <span>{total} €</span>
              </div>
              <div>
                <p>
                  Il ne vous reste plus qu'une étape pour vous offfir <span>{product_name}</span>. Vous allez payer {total} € (frais de protection acheteurs et frais de port inclus )
                </p>
              </div>
            </div>
          </div>
          <div className={succes ? 'hide' : "line"}></div>
          <div className="bottom">
            <Elements stripe={stripeConnect} options={options}>
              <CheckoutForm data={{ product_name: state.product_name, product_price: product_price, total: subTotal, product_image: state.product_image, product_id: state.product_id, buyer_token: token }} succes={succes} setSucces={setSucces} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  ) : <Navigate to='/login' />
}

export default Payment