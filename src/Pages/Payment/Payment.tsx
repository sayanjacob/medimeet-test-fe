import { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import './Payment.css'
import axios from 'axios';


const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [clientSecret, setClientSecret] = useState('');
    const total = 1000; // Replace with your total amount value

    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const response = await axios.get('http://localhost:5000/payment');
                const receivedClientSecret = response.data.client_secret;

                console.log('Received client secret:', receivedClientSecret);

                if (!receivedClientSecret || !receivedClientSecret.startsWith('pi_')) {
                    throw new Error('Invalid client secret format');
                }

                setClientSecret(receivedClientSecret);
            } catch (error) {
                console.error('Error fetching or processing client secret:', error);
            }
        };

        fetchClientSecret();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (!clientSecret || !clientSecret.startsWith('pi_')) {
                throw new Error('Invalid client secret format');
            }

            setIsProcessing(true);

            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (error) {
                setErrorMessage(error.message);
                setIsProcessing(false);
            } else if (paymentIntent.status === 'succeeded') {
                setPaymentDetails(paymentIntent);
                setIsProcessing(false);
            }
        } catch (error) {
            console.error('Error confirming card payment:', error);
            setIsProcessing(false);
        }
    };
    return (
        <div>
            {paymentDetails ? (
                <div className='container-fluid text-center'>
                    <img
                        src={paymentDetails.status === "succeeded"
                            ? "https://cdn.dribbble.com/users/147386/screenshots/5315437/media/64a3a80eb03d6fe459abd7e7c1d889f9.gif"
                            : "https://example.com/path/to/alternate-image.jpg"}
                        alt=""
                        style={{ 'width': "25vw" }}
                    />
                    <h2>
                        {paymentDetails.status === "succeeded"
                            ? "Appointment Booked Successfully!"
                            : "Payment Failed"}
                    </h2>
                    <p className='payment-method'>Payment ID: {paymentDetails.id}</p>
                    <p className='payment-subtitle'>Amount: ₹{paymentDetails.amount}</p>
                    <p className='payment-method'>Status: {paymentDetails.status}</p>

                </div>

            ) : (
                <form className='container-fluid' onSubmit={handleSubmit}>
                    <div className=''>
                        <p className='payment-title m-0'>Select Payment method</p>
                        <p className='payment-subtitle m-0 px-1'>Amount to pay: ₹{total}</p>
                    </div>
                    <div className='my-4 '>
                        <label className='payment-subtitle pb-1' htmlFor="card-element">Credit or debit card</label>

                        <CardElement id="card-element" className='mx-2' />
                        <div className='payment-method px-1' role="alert" style={{ color: 'red' }}>
                            {errorMessage}
                        </div>
                    </div>

                    {/* <div className='my-4 '>
                        <p className='payment-subtitle m-0 p-0'>Pay After Service</p>
                        <p className='unavailable-text m-0 p-0 '>Unavailable right now</p>


                        <div className='d-flex flex-row justify-content-between align-items-center disabled-payments'>
                            <p className='payment-method mx-2 my-2 align-content-center'>
                                <span className=''>
                                    <img src="src\assets\cash-svgrepo-com.svg" width={20} alt="" />
                                </span> Pay By Cash after service
                            </p>
                            <i className="bi bi-chevron-right align-content-center disabled-ico p-2 m-0"></i>
                        </div>


                        <div className='d-flex flex-row justify-content-between align-items-center disabled-payments'>
                            <p className='payment-method mx-2 my-2 align-content-center'>
                                <span className=''>
                                    <img src="src\assets\online-payment-svgrepo-com.svg" width={20} alt="" />
                                </span> Pay Online after service
                            </p>
                            <i className="bi bi-chevron-right align-content-center disabled-ico p-2 m-0" width={20}></i>
                        </div>
                    </div> */}


                    {/* <div className='my-4 '>
                        <p className='payment-subtitle m-0 p-0'>UPI</p>


                        <div className='d-flex flex-row justify-content-between align-items-center disabled-payments'>
                            <p className='payment-method mx-2 my-2 align-content-center'>
                                <span className=''>
                                    <img src="src\assets\google-pay-svgrepo-com.svg" width={20} alt="" />
                                </span> Pay via UPI
                            </p>
                            <i className="bi bi-chevron-right align-content-center disabled-ico p-2 m-0"></i>
                        </div>
                    </div> */}

                    <button className=' btn payment-button' type="submit" disabled={isProcessing}>
                        {isProcessing ? 'Processing...' : 'Submit Payment'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default PaymentForm;
