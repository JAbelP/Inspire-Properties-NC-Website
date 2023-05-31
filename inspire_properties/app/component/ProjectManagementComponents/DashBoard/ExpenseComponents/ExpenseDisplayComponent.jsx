import React from 'react'

function ExpenseDisplayComponent(props) {
    //props
    //expenses
  return (
    <div className='bg-gray-300 mt-2 rounded-md p-2'>
        <p>Expenses: </p>
        {props.expenses.map(expense => (
                    <div key={expense.ExpenseName} className='flex flex-row justify-normal'>
                        <p>{expense.ExpenseName}</p>
                        <p className='ml-6'>${expense.ExpensePrice}</p>
            </div>
        ))}
    </div>
  )
}

export default ExpenseDisplayComponent