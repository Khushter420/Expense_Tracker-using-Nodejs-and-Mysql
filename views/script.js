const submitAmount = document.getElementById("btn3");
submitAmount.addEventListener("click", async (e) => {
 e.preventDefault();
 const description = document.getElementById("text").value;
 const amount = document.getElementById("amount").value;
if (description.length > 0 && amount.length >0) {
 var object = {
   description: description, 
   amount:amount,
 };          
   }
   console.log(object);
   const token = localStorage.getItem('token');
   axios.post('http://localhost:5000/addexpense',object, { headers: {"Authorization" : token} }).then((response) => {

    if(response.status === 201){
        addNewExpensetoUI(response.data);
    } else {
        throw new Error('Failed To create new expense');
    }

    }).catch(err => showError(err));

});
  function addNewExpensetoUI(expense){
    const parentElement = document.getElementById('list');
    const expenseElemId = `expense-${expense.id}`;
    parentElement.innerHTML += `
        <li id=${expenseElemId}>
            ${expense.description}<span>-${expense.amount}</span>
            <button onclick='deleteExpense(event, ${expense.id})'>
             Delete Expense
            </button>
        </li>` 
}

window.addEventListener('load', ()=> {
  const token = localStorage.getItem('token');
  axios.get('http://localhost:5000/getexpenses', { headers: {"Authorization" : token} }).then(response => {
      if(response.status === 200){
          response.data.expenses.forEach(expense => {

              addNewExpense(expense);
          })
      } else {
          throw new Error();
      }
  })
});

function deleteExpense(e, expenseid) {
  const token = localStorage.getItem('token');
  axios.delete(`http://localhost:5000/deleteexpense/${expenseid}`, { headers: {"Authorization" : token} }).then((response) => {

  if(response.status === 204){
          removeExpensefromUI(expenseid);
      } else {
          throw new Error('Failed to delete');
      }
  }).catch((err => {
      showError(err);
  }))
}

function showError(err){
  document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
}

function removeExpensefromUI(expenseid){
  const expenseElemId = `expense-${expenseid}`;
  document.getElementById(expenseElemId).remove();
}

document.getElementById('premium').onclick = async function (e) {
  const response  = await axios.get('http://localhost:5000/premiummembership', { headers: {"Authorization" : token} });
  console.log(response);
  var options =
  {
   "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
   "name": "Khushter Nizame",
   "order_id": response.data.order.id, // For one time payment
   "prefill": {
     "name": "Khushter",
     "email": "test.user@example.com",
     "contact": "9837135646"
   },
   "theme": {
    "color": "#000000."
   },
   // This handler function will handle the success payment
   "handler": function (response) {
       console.log(response);
       axios.post('http://localhost:5000/updatetransactionstatus',{
           order_id: options.order_id,
           payment_id: response.razorpay_payment_id,
       }, { headers: {"Authorization" : token} }).then(() => {
           alert('You are a Premium User Now')
       }).catch(() => {
           alert('Something went wrong. Try Again!!!')
       })
   },
};
const rzp1 = new Razorpay(options);
rzp1.open();
e.preventDefault();

rzp1.on('payment.failed', function (response){
alert(response.error.code);
alert(response.error.description);
alert(response.error.source);
alert(response.error.step);
alert(response.error.reason);
alert(response.error.metadata.order_id);
alert(response.error.metadata.payment_id);
});
}

