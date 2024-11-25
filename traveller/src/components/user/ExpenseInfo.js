import React from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';

const ExpenseInfo = ({ totalConfirmedExpenseINR }) => (
  <p className="flex items-center text-gray-600 mb-4">
    <FaMoneyBillWave className="mr-2 text-blue-500" />
    Total Expense (Confirmed Payments): <span className="font-bold ml-1">₹{totalConfirmedExpenseINR?.toFixed(2)}</span>
  </p>
);

export default ExpenseInfo;
