import { ChangeEvent, useState } from "react";
import Header from "./components/Header";

function App() {

  let [quantity, setQuantity] = useState(10000);

  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setQuantity(Number(e.target.value));
  } 

  function handleClickDecrease() {
    const amount = quantity-STEP;
    if(amount<MIN){
      alert('Quantity not allowed');
      return;
    }
    setQuantity(amount);
  }

  function handleClickIncrease() {
    const amount = quantity+STEP;
    if(amount>MAX){
      alert('Quantity not allowed');
      return;
    }
    setQuantity(amount);
  }


  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
      <Header/>

      <div className="flex justify-around my-6">
        <button
          type="button"
          className="h-10 w-10 flex items-center justify-center font-bold text-white
          text-2xl bg-lime-500 rounded-full hover:outline-none hover:ring-2
          hover:ring-offset-2 hover:ring-lime-500"
          onClick={handleClickDecrease}
        >-</button>
        <button
          type="button"
          className="h-10 w-10 flex items-center justify-center font-bold text-white
          text-2xl bg-lime-500 rounded-full hover:outline-none hover:ring-2
          hover:ring-offset-2 hover:ring-lime-500"
          onClick={handleClickIncrease}
        >+</button>
      </div>

      <input 
        type="range"
        className="w-full h-10 bg-gray-200 accent-lime-500 hover:accent-lime-300"
        onChange={e => handleChange(e)}
        min={MIN}
        max={MAX}
        step={STEP}
        value={quantity}
      />
      <p className="text-center my-10 text-5xl font-extrabold text-indigo-600">{quantity}</p>
    </div>
  )
}

export default App
