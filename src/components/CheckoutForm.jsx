import { PaymentElement } from "@stripe/react-stripe-js"
import { useStripe, useElements } from "@stripe/react-stripe-js"
import { useState } from "react";
import axios from "axios";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [succes, setSucces] = useState(false);
  const [ispayed, setIspayed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIspayed(true);
    try {
      if (elements == null) {
        return
      }
      //destructuration de la clé error de la réponse de elements.submit() et la renommer submitError.
      const { error: submitError } = await elements.submit();
      if (submitError) {
        // console.log('submitError', submitError);
        setErrorMessage(submitError.message)
      }
      const response = await axios.post('url/payment');
      console.log('response.data:', response.data.client_secret);
      const clientSecret = response.data.client_secret;
      const { error, responseStripe } = await stripe.confirmPayment({
        elements: elements,
        clientSecret: clientSecret,
        consfirmParams: {
          return_url: 'http://localhost:5173/'
          //redirect: "if_required",
        }
      })
      console.log('responseStripe:', responseStripe)
    } catch (error) {
      console.log(error)
    }
    setIspayed(false);
  }
  return succes ? (<p>Merci pour votre achat !</p>) : (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe || !elements}>Payer</button>
    </form>
  )
}

export default CheckoutForm