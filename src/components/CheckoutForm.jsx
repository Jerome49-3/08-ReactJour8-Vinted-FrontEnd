import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useState } from "react";
import axios from "axios";
import AddressForm from '../components/AdressForm';
import Image from '../components/Image';

const CheckoutForm = ({ data, succes, setSucces }) => {
  console.log('data on checkOutForm:', data);
  console.log('data.product_name:', data.product_name, '\n', 'data.total:', data.total, '\n', 'data.product_price:', data.product_price, '\n', 'data.product_id:', data.product_id, '\n', 'product_image:', data.product_image, '\n', 'buyer_token:', data.buyer_token);

  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [ispayed, setIspayed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIspayed(true);
    try {
      if (elements == null) {
        setIspayed(false);
        return;
      }
      //destructuration de la clé error de la réponse de elements.submit() et la renommer submitError.
      const { error: submitError } = await elements.submit();
      if (submitError) {
        // console.log('submitError', submitError);
        setErrorMessage(submitError.message);
        setIspayed(false);
        return;
      }
      const response = await axios.post('http://localhost:3000/payment',
        { product_title: data.product_name, amount: data.total, product_price: data.product_price, product_id: data.product_id, buyer_token: data.buyer_token },
        {
          headers: {
            Authorization: `Bearer ${data.buyer_token}`
          },
        }
      );
      console.log('response.data in checkOutForm:', response.data);
      const clientSecret = response.data.client_secret;
      console.log('clientSecret in checkOutForm:', clientSecret);
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements: elements,
        clientSecret: clientSecret,
        payment_method: 'pm_card_visa',
        confirmParams: {
          return_url: 'http://localhost:5173/'
        },
        redirect: "if_required",
      });
      if (error) {
        setErrorMessage(error.message);
        setIspayed(false);
        return;
      } else if (paymentIntent.status === "succeeded") {
        setSucces(true);
      }
      console.log('paymentIntent:', paymentIntent)
    } catch (error) {
      console.log(error);
      setIspayed(false);
    }
    setIspayed(false);
  }
  return succes ? (
    <div className="resumCommand">
      <div className="left">
        <p>Merci pour votre achat de {data.product_name}</p>
      </div>
      <div className="right">
        <Image src={data.product_image} alt={data.product_name} />
      </div>
    </div>

  ) : (
    <form onSubmit={handleSubmit}>
      <AddressForm />
      <PaymentElement />
      <button disabled={ispayed || !stripe || !elements}>Payer</button>
    </form>
  )
}

export default CheckoutForm