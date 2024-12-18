import { AddressElement } from '@stripe/react-stripe-js';

const AddressForm = () => {
  return (
    <form>
      <h3>Adresse de Livraison:</h3>
      <AddressElement options={{ mode: 'shipping' }} />
    </form>
  );
};

export default AddressForm;