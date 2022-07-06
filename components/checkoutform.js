import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/router";

const CheckoutForm = ({id,code}) => {
  const stripe = useStripe();
  const elements = useElements();
console.log("id,code====",localStorage.getItem('id'),localStorage.getItem('code'))
 
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        // return_url: "http://localhost:3000/done",
        return_url: "http://kingscharts.io/done",
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // router.push({
      //   pathname: "http://kingscharts.io/done",
      //   query: {
      //     code: code,
      //     id: id,
      //   },
      // });
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="pay-now-cont">
        <button disabled={!stripe} className="payment-btn">
          Pay Now
        </button>
        {/* Show error message to your customers */}
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    </form>
  );
};

export default CheckoutForm;
