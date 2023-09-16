//contains the logic for fetching ,adding ,sorting ,searching,deletion,updation
//talk to network layer to bring the JSON and convert JSON into object vice versa
import Product from "../models/product.js";
import makeNetworkCall from "./api-client.js";


const productOperations={
   products:[],
   async loadProducts(){
    const pizzas=await makeNetworkCall();
    const pizzaArray= pizzas['Vegetarian'];
    const productArray=pizzaArray.map(pizza=>{
       const currentPizza=new Product(pizza.id,pizza.name,pizza.menu_description,pizza.price,pizza.assets.product_details_page[0].url);
       return currentPizza;
    })
    //console.log(productArray);
    this.products=productArray
    return productArray;
    },
    getProductsInCart(){
      const productInBasket=this.products.filter(product=>product.isAddedInCart);
      return productInBasket;
    },
    searchProducts(pizzaId){
      const product=this.products.find(currentProduct=>currentProduct.id==pizzaId);
      console.log('product found',product);
      product.isAddedInCart=true;
      console.log('Array',this.products);
    }
}
export default productOperations;