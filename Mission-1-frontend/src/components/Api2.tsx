import React, { useState } from 'react';



const RiskRating = () => {
  const [claimHistory, setClaimHistory] = useState('');
  const [riskRating, setRiskRating] = useState<number | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api_2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ claim_history: claimHistory }),
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setRiskRating(data.risk_rating);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
          // If err is an Error object, we can access its properties
          setError(err.message);
      } else {
          // If err is not an Error object, we can't make assumptions about its structure
          console.log(err);
      }
    }
  };


  return (
    <section className='flex text-center justify-center my-10'>
    <form onSubmit={handleSubmit} className='border border-black/30 p-2 flex justify-center text-center gap-2 my-3 w-[50rem] '>
      <label className='  flex text-center justify-center p-2 -ml-[4.6rem]'>
        Claim History:
        <textarea
          value={claimHistory}
          onChange={e => setClaimHistory(e.target.value)}
          className='border border-black ml-1 outline-none w-[15rem] h-[7rem] px-2'
        />
      </label>
      <div className='outline-none'><button className=' border border-black rounded-full mx-2 mt-10 bg-gray-300 py-1 px-2 hover:scale-110 active:scale-105 ' type="submit">Calculate Risk Rating</button></div>
      <div className='w-[10.5rem] h-7 mt-[2.6rem] text-left '>
      <p>Risk Rating:{riskRating && <span className='pl-2'>{riskRating}</span>}</p>
      {error && <p>Error: {error}</p>}
      </div>
    </form>
    </section>
  )
}
export default RiskRating