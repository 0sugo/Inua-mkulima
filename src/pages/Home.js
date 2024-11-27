import React, { useEffect, useState } from 'react';
import axios from '../api/api';
import { CiCirclePlus, CiCircleMinus } from 'react-icons/ci'; // Import the Circle Plus and Minus icons
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [walletBalance, setWalletBalance] = useState(2400);
  const navigate = useNavigate();

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/products?limit=5&skip=0');
      setProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleAddToCart = (product) => {
    const existingProductIndex = selectedProducts.findIndex(item => item.title === product.title);

    if (existingProductIndex !== -1) {
      const updatedSelectedProducts = [...selectedProducts];
      updatedSelectedProducts[existingProductIndex].quantity += 1;
      setSelectedProducts(updatedSelectedProducts);
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (product) => {
    const updatedSelectedProducts = selectedProducts.filter(item => item.title !== product.title);
    setSelectedProducts(updatedSelectedProducts);
  };

  const handleDeduction = async () => {
    console.log('Deduction triggered');
    try {
      const totalDeduction = selectedProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);
      console.log('Total Deduction:', totalDeduction); // Debugging line

      if (walletBalance >= totalDeduction) {
        if (selectedProducts.length > 0) {
          const productsToSave = selectedProducts.map(product => ({
            title: product.title,
            quantity: product.quantity,
            price: product.price,
            total: product.price * product.quantity,
            discount: (product.price * product.quantity * (product.discountPercentage / 100)).toFixed(2),
          }));

          console.log('Saving to localStorage:', productsToSave); // Debugging line
          localStorage.setItem('selectedProducts', JSON.stringify(productsToSave)); // Store detailed info
        }

        setWalletBalance(walletBalance - totalDeduction);

        navigate('/summary', { state: { selectedProducts } });
      } else {
        alert("Insufficient wallet balance");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotalDiscount = () => {
    const totalDiscount = selectedProducts.reduce((sum, product) => {
      return sum + (product.price * product.quantity * (product.discountPercentage / 100));
    }, 0);

    return parseFloat(totalDiscount.toFixed(2));
  };

  const calculateTotalPrice = () => {
    return selectedProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  };

  return (
    <main>
      <div className='mx-auto p-4'>
        <h3>Product Details</h3>
        <div className='flex items-center space-x-4 my-4'>
          <button className='bg-[#E8B40A] text-white px-4 py-1 rounded-md'>{"<"}Back</button>
          <h6>Product Details</h6>
        </div>

        <div>
          <h6><b>Inua mkulima wallet</b> balance: <b>Kes {walletBalance}</b></h6>
        </div>

        {loading ? (
          <h3>Loading....</h3>
        ) : (
          error ? (
            <h3>Error: {error.message}</h3>
          ) : (
            products.length === 0 ? (
              <h3>No products found</h3>
            ) : (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 space-y-4">
                <div className='flex flex-col'>
                  <span>Products</span>
                  <div className='border border-black p-4 rounded-lg mt-4'>
                    <div className="grid grid-cols-3">
                      <span><b>Product name</b></span>
                      <span><b>Price</b></span>
                      <span><b>Action</b></span>
                    </div>
                    {products.map((product) => (
                      <div key={product.title} className="grid grid-cols-3 gap-2 py-2">
                        <span>{product.title}</span>
                        <span>{product.price} kes</span>
                        {selectedProducts.find(item => item.title === product.title) ? (
                          <span> </span>
                        ) : (
                          <button
                            className='w-10 h-10 p-2'
                            onClick={() => handleAddToCart(product)}
                          >
                            <CiCirclePlus className="text-xl" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className='space-y-6 flex flex-col'>
                  <span>Selected Products</span>

                  <div className='border border-black p-4 rounded-lg mt-4 bg-[#FFFBEF]'>
                    {selectedProducts.length === 0 ? (
                      <div className="text-center text-[#3E3E3E99] italic py-4">
                        Please select a product from the products panel first.
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-6 gap-2 py-2">
                          <span><b>Product name</b></span>
                          <span><b>Qty</b></span>
                          <span><b>Price</b></span>
                          <span><b>Total</b></span>
                          <span><b>Discount</b></span>
                          <span><b>Action</b></span>
                        </div>

                        {selectedProducts.map((product) => (
                          <div key={product.title} className="grid grid-cols-6 gap-2 py-2">
                            <span>{product.title}</span>
                            <span>{product.quantity}</span>
                            <span>{product.price} kes</span>
                            <span>{(product.price * product.quantity).toFixed(2)} kes</span>
                            <span>{(product.price * product.quantity * (product.discountPercentage / 100)).toFixed(2)} kes</span>
                            <button
                              className=' w-10'
                              onClick={() => handleRemoveFromCart(product)}
                            >
                              <CiCircleMinus className="text-xl" />
                            </button>
                          </div>
                        ))}

                        <div className="flex justify-between mt-4">
                          <span><b>Total Discount</b></span>
                          <span></span>
                          <span></span>
                          <span></span>
                          <span><b>{calculateTotalDiscount()} kes</b></span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          )
        )}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 my-4'>
        <button className='border border-black rounded-md py-2 px-16 mx-auto font-bold' >Back</button>

        <button className='bg-black text-white px-6 py-2 rounded-md mx-auto' onClick={handleDeduction}>
          Deduct Total: {calculateTotalDiscount()} kes
        </button>
      </div>
      <div className='text-center w-[80%]'>
        <span className='text-[#FF1B1B]  font-semibold'>You will receive {calculateTotalDiscount()}  kes from the subsidy program. If this does not cover the total cost of the purchase ensure you get the balance from the customer.</span>
      </div>
    </main>
  );
};

export default Home;
