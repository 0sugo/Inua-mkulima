import React from 'react'
import image1 from '../components/images/white logo.svg'
import image2 from '../components/images/Group 2@2x.png'

const Transactions = () => {
  return (
    <div className="container mx-auto p-4">
      <div className='flex items-center justify-between border-b-2 border-green-700 my-4'>
        <span className="mb-4 bg-green-700 text-white px-8 py-2">Transaction Receipt</span>
        <div className='flex items-center gap-4'>
          <img src={image1} className='w-10' alt="" />
          <img src={image1} className='w-10' alt="" />
          <img src={image2} className='w-10' alt="" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="grid grid-cols-2 gap-2">
            <p className="font-bold">Date:</p>
            <p className='text-green-700'>Mon, 16 March 2024</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <p className="font-bold">Reference Number:</p>
            <p className='text-green-700'>AAAB3D27ED21</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <p className="font-bold">Wallet:</p>
            <p className='text-green-700'>Muranga Kilimo</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <p className="font-bold">Farmer Name/ID:</p>
            <p className='text-green-700'>Gidraf - 30123456</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <p className="font-bold">Farmer Phone No:</p>
            <p className='text-green-700'>0712345678</p>
          </div>
        </div>
        <div>
        <div className="grid grid-cols-2 gap-2">
          <p className="font-bold">Agro-dealer Name:</p>
          <p className='text-green-700'>Harrison Kungs</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <p className="font-bold">Merchant ID:</p>
          <p className='text-green-700'>POS1323535</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <p className="font-bold">Phone Number:</p>
          <p className='text-green-700'>0712 345 678</p>
        </div>
        </div>
      </div>
      <table className="table-auto w-full mt-4 border-collapse">
        <thead>
          <tr className='bg-green-700 text-white'>
            <th className="px-4 py-2 border-b">Product Code</th>
            <th className="px-4 py-2 border-b">Quantity</th>
            <th className="px-4 py-2 border-b">Price</th>
            <th className="px-4 py-2 border-b">Total Amount</th>
            <th className="px-4 py-2 border-b">Deduction</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border-b">NPK 6kgs</td>
            <td className=" px-4 py-2 border-b">2</td>
            <td className="px-4 py-2 border-b">10.00</td>
            <td className="px-4 py-2 border-b">20.00</td>
            <td className="px-4 py-2 border-b">0.00</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border-b">Urea 5kgs</td>
            <td className="px-4 py-2 border-b">1</td>
            <td className="px-4 py-2 border-b">15.00</td>
            <td className="px-4 py-2 border-b">15.00</td>
            <td className="px-4 py-2 border-b">0.00</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4 bg-green-700 text-white p-4 text-right">
        <p className="font-bold">Total: &nbsp;&nbsp;&nbsp; <span className="text-lg bg-white text-black py-2 px-4">35.00</span></p>
      </div>
    </div>
  )
}

export default Transactions
