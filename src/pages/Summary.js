import React, { useState, useEffect } from 'react';
import { CiCircleMinus } from "react-icons/ci";
import { useLocation, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const Summary = () => {
    const { state } = useLocation();
    const [products, setProducts] = useState(state?.selectedProducts || []);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [walletBalance, setWalletBalance] = useState(2400);
    const [timer, setTimer] = useState(90);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();

    const handleQuantityChange = (e, productTitle) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.title === productTitle
                        ? { ...product, quantity: value === '' ? 0 : parseInt(value) }
                        : product
                )
            );
        }
    };

    useEffect(() => {
        const filteredProducts = products.filter((product) => product.quantity > 0);
        setProducts(filteredProducts);
    }, [products]);

    const calculateTotalPrice = () => {
        return products.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2);
    };

    const calculateDiscount = (price, quantity, discountPercentage) => {
        return (price * quantity * (discountPercentage / 100)).toFixed(2);
    };

    const calculateTotalDiscount = () => {
        return products.reduce((totalDiscount, product) => {
            return totalDiscount + (product.price * product.quantity * (product.discountPercentage / 100));
        }, 0).toFixed(2);
    };

    const calculateNetAmount = () => {
        const totalAmount = calculateTotalPrice();
        const totalDiscount = calculateTotalDiscount();
        return (totalAmount - totalDiscount).toFixed(2);
    };

    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < 5) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '') {
            if (index > 0) {
                document.getElementById(`otp-input-${index - 1}`).focus();
            }
        }
    };

    const handleDeduction = () => {
        const netAmount = calculateNetAmount();
        if (walletBalance >= netAmount) {
            setWalletBalance(walletBalance - netAmount);
            setIsProcessing(true);
            setTimeout(() => {
                setIsProcessing(false);
                setTotalAmount(netAmount);
                setIsModalOpen(true);
            }, 3000);
        } else {
            alert("Insufficient wallet balance");
        }
    };

    const handleBack = () => {
        navigate('/');
    };

    useEffect(() => {
        if (timer === 0) return;
        const interval = setInterval(() => {
            setTimer((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <main>
            <div className="mx-auto p-4">
                <h3 className="font-bold">Summary</h3>
                <div className="flex items-center space-x-4 my-4">
                    <button className="bg-[#E8B40A] text-white px-4 py-1 rounded-md" onClick={handleBack}>{"<"}Back</button>
                    <h6 className="flex gap-2">
                        <span className="underline text-[#E8B40A] font-semibold">Product Details</span> {" >"} <span>Summary</span>
                    </h6>
                </div>

                <div>
                    <h6><b>Selected Products</b></h6>
                    <div className="grid grid-cols-1 gap-4 space-y-4">
                        <div className="flex flex-col">
                            <div className="bg-white md:w-[90%] border border-black p-4 rounded-lg mt-4">
                                <div className="grid grid-cols-6 gap-2 py-2">
                                    <span><b>Product name</b></span>
                                    <span><b>Qty</b></span>
                                    <span><b>Price</b></span>
                                    <span><b>Total</b></span>
                                    <span><b>Discount</b></span>
                                </div>
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <div key={product.title} className="grid grid-cols-6 gap-2 py-2">
                                            <span className='text-[#3E3E3E] text-nowrap'>{product.title}</span>
                                            <input
                                                type="text"
                                                value={product.quantity}
                                                onChange={(e) => handleQuantityChange(e, product.title)}
                                                className="w-16 text-center text-[#3E3E3E99]"
                                                pattern="[0-9]*"
                                            />
                                            <span className='text-[#3E3E3E99]'>{product.price} kes</span>
                                            <span className='text-[#3E3E3E99]'>{(product.price * product.quantity).toFixed(2)} kes</span>
                                            <span>{calculateDiscount(product.price, product.quantity, product.discountPercentage)} kes</span>
                                            <div className="flex space-x-2">
                                                <button
                                                    className="w-10 h-10 p-2"
                                                    onClick={() => {
                                                        if (product.quantity > 1) {
                                                            setProducts((prevProducts) =>
                                                                prevProducts.map((prod) =>
                                                                    prod.title === product.title
                                                                        ? { ...prod, quantity: prod.quantity - 1 }
                                                                        : prod
                                                                )
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <CiCircleMinus className="text-xl" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center col-span-6 py-4">No products in the cart</div>
                                )}
                                <div className="flex justify-between w-[74%]">
                                    <span ><b>Total</b></span>
                                    <span className="underline"><b>{calculateTotalDiscount()} kes</b></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col items-center justify-center gap-2">
                        <h6>Enter the <b>verification code</b> sent to the parent at <b>072******715</b> via SMS.</h6>
                        <div className="flex gap-2 mt-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-input-${index}`}
                                    type="text"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    maxLength={1}
                                    className="w-10 h-10 text-center border-2 border-black rounded-md"
                                />
                            ))}
                        </div>
                        <p>Didn't receive OTP? Resend in <span className='text-[#E8B40A] font-bold'>{formatTime(timer)}</span></p>

                        <div className="grid grid-cols-1 md:grid-cols-2 w-[80%] my-4">
                            <button className="border border-black rounded-md py-2 px-16 mx-auto font-bold" onClick={handleBack}>Back</button>
                            <button className="bg-black text-white px-6 py-2 rounded-md mx-auto font-bold" onClick={handleDeduction}>
                                Pay {calculateNetAmount()} kes
                            </button>
                        </div>

                        {isProcessing && (
                            <div className="flex justify-center my-4">
                                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-4 border-gray-300 rounded-full" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        )}

                        <div className="text-center my-4 w-[80%]">
                            <span className="text-[#FF1B1B] font-semibold">You will receive {calculateTotalDiscount()} kes from the subsidy program. If this does not cover the total cost of the purchase, ensure you get the balance from the customer.</span>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && <SuccessPaymentModal onClose={() => setIsModalOpen(false)} totalAmount={totalAmount} products={products} />}
        </main>
    );
};

const SuccessPaymentModal = ({ onClose, totalAmount, products }) => {
    const navigate = useNavigate();

    const handleDoneClick = () => {
        navigate('/');
    };

    const handleDownloadReceipt = () => {
        if (!products || products.length === 0) {
            alert("No products to display in the receipt.");
            return;
        }

        const doc = new jsPDF();
        const content = `
            Transaction Receipt
            ---------------------------
            Products:
            ${products.map((product) => `${product.title} - Qty: ${product.quantity} - Price: ${product.price} kes - Total: ${(product.price * product.quantity).toFixed(2)} kes`).join('\n')}
            
            Total: ${totalAmount} kes
        `;

        doc.text(content, 10, 10);
        doc.save('receipt.pdf');
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white flex flex-col items-center gap-4 p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-[#000000]">Payment Successful</h2>
                <h6>Ref Number: <span className='font-bold text-[#000000]'>Abakfah3913af</span></h6>
                <h6>Date: <span className='font-bold text-[#000000]'>16 March 2024</span></h6>
                <h6><span className='font-bold text-[#000000]'>{totalAmount} KES</span></h6>
                <h6>Agrovet product purchase for</h6>
                <h6 className='text-[#52575D] font-bold'>Gladys Kivuva-12345678</h6>
                <p className="text-gray-600 mb-6">The payment has been successfully processed.</p>

                <div className="w-full flex space-x-4">
                    <button
                        className="w-full border border-black rounded-md font-bold bg-white hover:bg-gray-100 py-3"
                        onClick={handleDownloadReceipt}
                    >
                        Download Receipt
                    </button>
                    <button
                        className="w-full bg-black text-white rounded-md font-bold py-3"
                        onClick={onClose}
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Summary;
