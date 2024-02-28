import React, { useState, FormEvent } from 'react';
import axios from 'axios';

interface CarValueResponse {
    car_value: number;
  }
  


const CarValue: React.FC = () => {

  const [model, setModel] = useState<string>('');
  const [year, setYear] = useState<number | ''>('');
  const [carValue, setCarValue] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

   
    try {
      const response = await axios.post<CarValueResponse>('http://localhost:3000/api_1', { model, year });
      setCarValue(response.data.car_value);
      setError(null);
    } catch (err) {
      setError(error);
      setCarValue(null);
    }
  };


  return (
    <section className='flex text-center justify-center my-10'>
      <form onSubmit={handleSubmit} className='border border-black/30 p-2 flex justify-center text-center gap-2 my-3 w-[50rem]'>
        <label className='  flex text-center justify-center p-2'>
          Model:
          <input className='border border-black ml-1 outline-none w-[5rem] pl-2' type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
        </label>
        <label className='  flex text-center justify-center p-2'>
          Year:
          <input 
          className='border border-black ml-1 pl-2 outline-none w-[4rem] [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none' 
          type="number" 
          value={year} 
          onChange={(e) => setYear(Number(e.target.value))} 
          required
          maxLength={4} />
        </label>
        <button type="submit" className=' border border-black rounded-full mx-2 bg-gray-300 py-1 px-2 hover:scale-110 active:scale-105 '>Calculate Car Value</button>
         <p className=' w-[10rem] text-left justify-center pt-2'>Car Value: {carValue}</p>

      </form>
     
    </section>
  )
}
export default CarValue