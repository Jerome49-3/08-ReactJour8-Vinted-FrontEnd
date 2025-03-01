import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
// import Cookies from "cookies-js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useUser } from "../assets/lib/userFunc";
import cryptoRandomString from "crypto-random-string";

//connection Stripe
const stripeConnect = loadStripe(
  import.meta.env.VITE_REACT_APP_STRIPE_KEY_PUBLIC
);

const Payment = ({ dataShoppingCart, setDataShoppingCart }) => {
  const { token } = useUser();
  const [succes, setSucces] = useState(false);
  const [numCmd, setNumCmd] = useState(null);
  const { state } = useLocation();
  console.log("state in /payment:", state);
  const {
    product_name,
    product_price,
    product_image,
    product_id,
    product_pictures,
  } = state;
  console.log(
    "product_name in /payment:",
    product_name,
    "\n",
    "product_price in /payment:",
    product_price,
    "\n",
    "product_image in /payment:",
    product_image,
    "\n",
    "product_id in /payment:",
    product_id,
    "\n",
    "product_pictures in /payment:",
    product_pictures
  );
  useEffect(() => {
    const numberCommand = cryptoRandomString({ length: 16 });
    console.log("numberCommand in /payment:", numberCommand);
    console.log();

    setNumCmd(numberCommand);
  }, []);

  // useEffect(() => {
  //   const newDataShoppingCart = [...dataShoppingCart];
  //   const objData = {
  //     product_id: product_id,
  //     product_name: product_name,
  //     product_price: product_price,
  //     product_image: product_image,
  //   };
  //   console.log("objData in offer/:id:", objData);
  //   newDataShoppingCart.push(objData);
  //   console.log("newDataShoppingCart in offer/:id:", newDataShoppingCart);
  //   setDataShoppingCart(newDataShoppingCart);
  //   console.log(
  //     "dataShoppingCart inside handleclick in offer/:id:",
  //     dataShoppingCart
  //   );
  // }, [
  //   dataShoppingCart,
  //   product_id,
  //   product_name,
  //   product_price,
  //   product_image,
  // ]);

  // useEffect(() => {
  //   const StrDataShoppingCart = JSON.stringify(dataShoppingCart);
  //   Cookies.set("vintedShoppingCart", StrDataShoppingCart, {
  //     expires: 15,
  //     secure: true,
  //   });
  //   // Vérification de la création du cookie
  //   console.log("Cookie set:", Cookies.get("vintedShoppingCart"));
  // }, [dataShoppingCart]);

  console.log(
    "Number((product_price * 100).toFixed(0)):",
    Number((product_price * 100).toFixed(0))
  );
  console.log(
    "typeof Number((product_price * 100).toFixed(0)):",
    typeof Number((product_price * 100).toFixed(0))
  );
  const options = {
    mode: "payment",
    amount: Number((product_price * 100).toFixed(0)),
    currency: "eur",
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: "#0570de",
        colorBackground: "#ffffff",
        colorText: "#30313d",
        colorDanger: "#df1b41",
        fontFamily: "Arial, sans-serif",
        spacingUnit: "4px",
        borderRadius: "4px",
      },
      rules: {
        ".Input": {
          fontSize: "16px",
          color: "#424770",
          padding: "12px",
        },
        ".Label": {
          fontSize: "14px",
          fontWeight: "500",
          color: "#6b7c93",
        },
        ".Tab": {
          padding: "10px 12px",
          border: "none",
        },
        ".Input--invalid": {
          color: "#df1b41",
        },
        ".Block": {
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
        },
      },
    },
    loader: "auto",
  };
  let price = Number(product_price).toFixed(2);
  console.log("price in /payment:", price);
  const buyerProtectionCosts = Number(0.4).toFixed(2);
  console.log("buyerProtectionCosts:", buyerProtectionCosts);
  const shippingCosts = Number(0.8).toFixed(2);
  console.log("shippingCosts:", shippingCosts);
  const subTotal =
    Number((buyerProtectionCosts * 100).toFixed(0)) +
    Number((shippingCosts * 100).toFixed(0)) +
    Number((price * 100).toFixed(0));
  console.log("subTotal:", subTotal);
  const total = (subTotal / 100).toFixed(2);
  console.log("total:", total);
  console.log("dataShoppingCart in /payment:", dataShoppingCart);

  return (
    <div className="boxShoppingCart">
      <div className="wrapper">
        <div className="shoppingCart">
          <h1>Commande N° {numCmd}</h1>
          <div className={succes ? "hide" : "top"}>
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
                  Il ne vous reste plus qu'une étape pour vous offir{" "}
                  <span>{product_name}</span>. Vous allez payer {total} € (frais
                  de protection acheteurs et frais de port inclus )
                </p>
              </div>
            </div>
          </div>
          <div className={succes ? "hide" : "line"}></div>
          <div className="bottom">
            <Elements stripe={stripeConnect} options={options}>
              <CheckoutForm
                data={{
                  product_name: state.product_name,
                  product_price: product_price,
                  total: subTotal,
                  product_image: state.product_image,
                  product_pictures: state.product_pictures,
                  product_id: state.product_id,
                  buyer_token: token,
                  numberOfCommand: numCmd,
                }}
                succes={succes}
                setSucces={setSucces}
              />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
