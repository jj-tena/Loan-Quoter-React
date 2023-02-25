import { ChangeEvent, useState, useEffect } from "react";
import Header from "./components/Header";
import Button from "./components/Button";
import {moneyExpression, calculateTotalPayable} from './helpers';


function App() {

  const [quantity, setQuantity] = useState(10000);
  const [months, setMonths] = useState(6);
  const [total, setTotal] = useState(0);
  const [monthlyPay, setMonthlyPay] = useState(0);


  useEffect(() => {
    setTotal(calculateTotalPayable(quantity, months));
  }, [quantity, months]);

  useEffect(() => {
    setMonthlyPay(total/months);
  }, [total]);

  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setQuantity(Number(e.target.value));
  } 

  function handleMonthsChange(e: ChangeEvent<HTMLSelectElement>) {
    setMonths(Number(e.target.value));
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
        <Button 
          operador="-"
          fn={handleClickDecrease}
        />
        <Button 
          operador="+"
          fn={handleClickIncrease}
        />
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
      <p className="text-center my-10 text-5xl font-extrabold text-indigo-600">
        {moneyExpression(quantity)}
      </p>

      <h2 className="text-2xl font-extrabold text-gray-500 text-center">
        Choose a <span className="text-indigo-600">term</span> to pay
      </h2>
      <select className="mt-5 w-full p-2 bg-white border border-gray-300 
      rounded-lg text-center text-xl font-bold text-gray-500"
      value={months}
      onChange={e => handleMonthsChange(e)}>
        <option value="6">6 Months</option>
        <option value="12">12 Months</option>
        <option value="24">24 Months</option>
      </select>

      <div className="my-5 space-y-3 bg-gray-50 p-5">
        <h2 className="text-2xl font-extrabold text-gray-500 text-center">
          Summary of <span className="text-indigo-600">payments</span>
        </h2>
        <p className="text-xl text-gray-500 text-center font-bold">{months} Months</p>
        <p className="text-xl text-gray-500 text-center font-bold">{moneyExpression(total)} Total payable</p>
        <p className="text-xl text-gray-500 text-center font-bold">{moneyExpression(monthlyPay)} Monthly</p>
      </div>
    </div>
  )
}

export default App
