 import productOperations from "../services/product-operations.js";

async function loadPizzas(){
 const pizzas= await productOperations.loadProducts();
 console.log(pizzas);
 for(let pizza of pizzas){
    preparePizzaCard(pizza);
 }
 }
 loadPizzas();
 const printTotal = (pizzaAll) =>
 pizzaAll.reduce((sum, pizza) => sum + parseFloat(pizza.price), 0);
/*
                        <div class="col-4">
                        <div class="card" style="width: 18rem;">
                            <img src="https://img.freepik.com/free-photo/margherita-pizza-served-with-basil-leaves_140725-7974.jpg?w=360&t=st=1693717468~exp=1693718068~hmac=7731066ad8677ad778eb24ea9341eb801ada54e13ff466e8fd30cb789c840791" class="card-img-top" alt="...">
                            <div class="card-body">
                              <h5 class="card-title">Card title</h5>
                              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                              <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                          </div>
                    </div>
                </div>
            </div>
*/
function addToCard(){
  console.log('Add to cart called',this);
  const currentButton=this;
  const pizzaId=currentButton.getAttribute('product-id');
  console.log('Pizza id is ',pizzaId);
  productOperations.searchProducts(pizzaId);
  showBasket();
}
function showBasket(){
 const cartProducts = productOperations.getProductsInCart();
 const basket=document.querySelector('#basket');
// basket.innerHTML='';

  for(let product of cartProducts){
    const li=document.createElement('li');
    li.innerText=`Carted Pizza-${product.name}   Price-${product.price} `;
    li.style="color:#6f42c1";
    basket.appendChild(li);
 }
 const total = printTotal(cartProducts);
 const totalLiTag = document.createElement("li");
  totalLiTag.innerText = `Subtotal  ₹${total.toFixed(2)}`;
  totalLiTag.style="color:#0d6efd"
  basket.appendChild(totalLiTag);

    const afterTax = total * 0.05;
    const totalTax = document.createElement("li");
    totalTax.innerText = `Total Tax  ₹${afterTax.toFixed(2)}`;
    totalTax.style="color:red";
    basket.appendChild(totalTax);

    const afterGST = total.toFixed(2) * 1.05;
    const totalGSTPTag = document.createElement("li");
    totalGSTPTag.innerText = `Amount Payable  ₹${afterGST.toFixed(2)}`;    // totalValue (afterGST);
    totalGSTPTag.style = "color:green";
    basket.appendChild(totalGSTPTag);

    const payButtonContainer = document.getElementById(
      "payment-button-container"
  );
  const payButton = document.getElementById("rzp-button1");
  payButton.className = "btn btn-success";
  payButton.innerText = `Checkout : ₹${afterGST.toFixed(2)}`;
  payButtonContainer.appendChild(payButton);


}
 function preparePizzaCard(pizza){
   const outputDiv=document.querySelector('#output');
   const colDiv=document.createElement('div');
   colDiv.className='col-4';
   const cardDiv=document.createElement('div');
   cardDiv.className='card';
   cardDiv.style="width : 18rem;";
   colDiv.appendChild(cardDiv);
   const img=document.createElement('img');
   img.src=pizza.url;
   img.className="card-img-top";
   cardDiv.appendChild(img);
   const cardBody=document.createElement('div');
   cardBody.className="card-body";
   cardDiv.appendChild(cardBody);
   const h5=document.createElement('h5');
   h5.className="card-title";
   h5.innerText=pizza.name;
   cardBody.appendChild(h5);
   const pTag=document.createElement('p');
   pTag.className="card-text";
   pTag.innerText=pizza.desc;
   cardBody.appendChild(pTag);
   const button=document.createElement('button');
   button.setAttribute('product-id',pizza.id);
   button.addEventListener('click',addToCard);
   button.innerText='Add to cart';
   button.className="btn btn-primary";
   cardBody.appendChild(button);

   outputDiv.appendChild(colDiv);
 }