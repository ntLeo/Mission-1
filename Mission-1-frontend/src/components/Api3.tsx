import React, { useState } from 'react';
import axios from 'axios';

const QuoteForm: React.FC= () => {

  const [carValue, setCarValue] = useState<number | ''>('');
  const [riskRating, setRiskRating] = useState<number | ''>('');
  const [premiums, setPremiums] = useState<{ monthly: number, yearly: number } | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api_3', { car_value: carValue, risk_rating: riskRating });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setPremiums({ monthly: response.data.monthly_premium, yearly: response.data.yearly_premium });
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
          // If err is an Error object, we can access its properties
          setError("Server error");
      } else {
          // If err is not an Error object, we can't make assumptions about its structure
          console.log(err);
      }
    }
  };

  return (
    <section className='flex text-center justify-center my-10'>
    <form onSubmit={handleSubmit} className='border border-black/30 p-2 flex justify-center text-center gap-2 my-3 w-[50rem] '>
      <label className='flex text-center justify-center p-2 -ml-[6rem]'>
        Car Value:
        <input
          type="number"
          value={carValue}
          onChange={e => setCarValue(Number(e.target.value))}
          className='border border-black ml-1 outline-none w-[5rem] pl-2 h-7'
        />
      </label>
      <label className='  flex text-center justify-center p-2 '>
        Risk Rating:
        <input
          type="number"
          value={riskRating}
          onChange={e => setRiskRating(Number(e.target.value))}
          className='border border-black ml-1 outline-none w-[5rem] pl-2 h-7'
        />
      </label>
      <button type="submit" className=' border border-black rounded-full mx-2  bg-gray-300 py-1 px-2 hover:scale-110 active:scale-105 '>Calculate Premiums</button>
      <div className='w-[12rem] -mr-10 text-left'>
      <p>Monthly Premium:{premiums && <span className='pl-2'>{premiums.monthly}</span>}</p>
      <p className='ml-4'>Yearly Premium:{premiums && <span className='pl-2'>{premiums.yearly}</span>} </p>
      {error && <p>Error: {error}</p>}
      </div>
    </form>
    </section>
  )
}
export default QuoteForm