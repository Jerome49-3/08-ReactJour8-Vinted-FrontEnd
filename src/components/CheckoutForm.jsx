import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import AddressForm from "../components/AdressForm";
import Image from "../components/Image";

const CheckoutForm = ({ data, succes, setSucces }) => {
  console.log("data on checkOutForm:", data);
  console.log(
    "data.product_name in CheckoutForm:",
    data.product_name,
    "\n",
    "data.total in CheckoutForm:",
    data.total,
    "\n",
    "data.product_price in CheckoutForm:",
    data.product_price,
    "\n",
    "data.product_id in CheckoutForm:",
    data.product_id,
    "\n",
    "product_image in CheckoutForm:",
    data.product_image,
    "\n",
    "buyer_token in CheckoutForm:",
    data.buyer_token
  );

  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [ispayed, setIspayed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIspayed(true);
    try {
      if (elements === null) {
        setIspayed(false);
        return;
      }
      //destructuration de la clé error de la réponse de elements.submit() et la renommer submitError.
      const { error: submitError } = await elements.submit();
      if (submitError) {
        console.log("submitError", submitError);
        setErrorMessage(submitError.message);
        setIspayed(false);
        return;
      }
      const response = await axios.post(
        `http://localhost:3000/payment`,
        // const response = await axios.post(
        //   `https://site--vintaidbackend--s4qnmrl7fg46.code.run/payment`,
        {
          product_title: data.product_name,
          amount: data.total,
          product_price: data.product_price,
          product_id: data.product_id,
          buyer_token: data.buyer_token,
        },
        {
          headers: {
            Authorization: `Bearer ${data.buyer_token}`,
          },
          withCredentials: true,
        }
      );
      console.log("response.data in checkOutForm:", response.data);
      const clientSecret = response.data.client_secret;
      console.log("clientSecret in checkOutForm:", clientSecret);
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements: elements,
        clientSecret: clientSecret,
        payment_method: "pm_card_visa",
        confirmParams: {
          return_url: "http://localhost:5173/",
          // return_url: "https://vintaid.netlify.app/",
        },
        redirect: "if_required",
      });
      if (error) {
        setErrorMessage(error.message);
        setIspayed(false);
        return;
      } else if (paymentIntent.status === "succeeded") {
        const address = JSON.stringify(paymentIntent.shipping.address);
        console.log(
          "paymentIntent.shipping.address in /payment:",
          paymentIntent.shipping.address
        );
        console.log("address in /payment:", address);
        const sendSuccess = await axios.post(
          `http://localhost:3000/confirmPayment`,
          // const sendSuccess = await axios.post(
          //   `https://site--vintaidbackend--s4qnmrl7fg46.code.run/confirmPayment`,
          {
            product_title: data.product_name,
            amount: data.total,
            product_price: data.product_price,
            product_id: data.product_id,
            offer_solded: true,
            buyer_address: address,
          },
          {
            headers: {
              Authorization: `Bearer ${data.buyer_token}`,
            },
            withCredentials: true,
          }
        );
        if (sendSuccess) {
          console.log("sendSuccess in /payment:", sendSuccess);
          setSucces(true);
        }
      }
      console.log("paymentIntent:", paymentIntent);
    } catch (error) {
      console.log(error);
      setIspayed(false);
    }
    setIspayed(false);
  };
  return succes ? (
    <div className="resumCommand">
      <div className="left">
        <p>Merci pour votre achat de {data.product_name}</p>
      </div>
      <div className="right">
        {data.product_image ? (
          <Image src={data.product_image} alt={data.product_name} />
        ) : (
          <>
            {data.product_pictures.map((images, index) => {
              // console.log('images:', images);
              return (
                <>
                  {index > 0 && index < 2 && (
                    <Image src={images.secure_url} alt={data.product_name} />
                  )}
                </>
              );
            })}
          </>
        )}
      </div>
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
      <AddressForm />
      <PaymentElement />
      <button disabled={ispayed || !stripe || !elements}>Payer</button>
      {errorMessage && <div className="red">{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
