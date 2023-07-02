import React from 'react'

function ExpenseModal(props) {
    /**Props
    *closeModal()
    *isOpen
    *projectId
    **/
    const [ExpenseName, setExpenseName] = React.useState('');
    const [ExpensePrice, setExpensePrice] = React.useState('');


    
    //--------------------------Cosmetic States--------------------------//
    const [ExpenseNameFilled, setExpenseNameFilled] = React.useState(true);
    const [ExpensePriceFilled, setExpensePriceFilled] = React.useState(true);

    //--------------------------Cosmetic States--------------------------//


    //--------------------------Cosmetic Functions--------------------------//
    function handleExpenseNameFilledClick() {
        setExpenseNameFilled(true);
    }

    function handleExpensePriceFilledClick() {
        setExpensePriceFilled(true);
    }


    //--------------------------Cosmetic Functions--------------------------//

    function closeModal() {
        setExpenseName('');
        setExpensePrice('');
        setExpenseNameFilled(true);
        setExpensePriceFilled(true);
        props.closeModal();
    }


     function handleSubmit(){


        if(ExpenseName !=='' && ExpensePrice !== '')
        {

            const body = {
                ExpenseName,
                ExpensePrice
            }
            props.onSubmit(body);

            closeModal();
        }

        else
        {
            if(ExpenseName ===''){
                setExpenseNameFilled(false);
            }
            if(ExpensePrice ===''){
                setExpensePriceFilled(false);
            }
        }
    }

    function handleExpenseNameChange(event) {
        setExpenseName(event.target.value);
    }

    function handleExpensePriceChange(event) {
        setExpensePrice(event.target.value);
    }

  return (
    <div className={`${props.isOpen ? ("visible"):("hidden")} absolute top-1/3 left-1/3 text-lg w-auto `}>
        <div className='bg-red-600  pl-4 text-2xl pb-2 rounded-t-lg text-white border-2 border-x-black border-t-black border-b-0'>
            Add An Expense
        </div>
        <div className='bg-gray-300 h-auto px-4 pt-2 pb-3 border-2 border-x-black border-b-black border-t-0'>
            <div className='flex flex-col gap-y-3 pt-3 pl-2'>
                <>
                    <div className='flex flex-row gap-x-3'>
                        <p>Expense Name:</p>
                        <input
                            className='pl-2'
                            type='text'
                            value={ExpenseName}
                            onChange={handleExpenseNameChange}
                            onClick={handleExpenseNameFilledClick}

                        />
                    </div>
                    { ExpenseNameFilled?  (""):                  
                     (<p className=' text-red-600 text-left text-xs border-2 
                    border-red-600 rounded-md
                    w-fit p-1
                    '> Please Enter a Name</p>)}
                </>    
                <>
                    <div className='flex flex-row gap-x-3'>
                        <p>Expense Price:</p>
                        <input
                            className='pl-2'
                            type='number'
                            value={ExpensePrice}
                            onChange={handleExpensePriceChange}
                            onClick={handleExpensePriceFilledClick}

                        />
                    </div>
                    
                    { ExpensePriceFilled?  (""):                  
                     (<p className=' text-red-600 text-left text-xs border-2 
                    border-red-600 rounded-md
                    w-fit p-1
                    '> Please Enter a Price</p>)}
                </>    
            </div>
            <div className='flex flex-row justify-between mx-4 py-2 '>
                <button className='bg-green-500 p-1 rounded-md' onClick={handleSubmit}> Submit </button>
                <button className='bg-red-900 p-1 rounded-md text-white' onClick={closeModal}>Cancel</button>
            </div>
        </div>

    </div>
  )
}

export default ExpenseModal