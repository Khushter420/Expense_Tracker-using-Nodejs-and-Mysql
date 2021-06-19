const submitAmount = document.getElementById("btn3");
 let a=0;
 submitAmount.addEventListener("click", async (e) => {
 e.preventDefault();
 const description = document.getElementById("text").value;
 const amount = document.getElementById("amount").value;
 
 if (description.length > 0 && amount.length > 0) {
 var object = {
   description: description, 
   amount:amount
 };          
   }
   console.log(object);
   const token = localStorage.getItem('token');
   const x = axios.post('http://localhost:5000/addexpense',object)

 /*   if(response.status === 201){
        addNewExpensetoUI(response.data.expense);
    } else {
        throw new Error('Failed To create new expense');
    }

    }).catch(err => showError(err))*/

});

/*function addNewExpensetoUI(expense){
    a+=expense.amount;
    const parentElement = document.getElementById('listOfExpenses');
    const expenseElemId = `expense-${expense.id}`;
    parentElement.innerHTML += `
        <li id=${expenseElemId}>
            ${expense.expenseamount} - ${expense.category} - ${expense.description}
            <button onclick='deleteExpense(event, ${expense.id})'>
                Delete Expense
            </button>
        </li>`
}*/




