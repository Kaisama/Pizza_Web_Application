//HTTP/HTTPS Call
import URL from '../utils/constant.js';
 async function makeNetworkCall(){
 // const URL='https://gist.githubusercontent.com/kshirsagarps/36fade16fa39202715656ef487aaf7b0/raw/2b682e589ef283f06be42d2799dfa54f57794a6e/Pizza.json';
  //  const promise = fetch(URL);
  //  promise.then(response=>{
  //   console.log('Response is',response);
  //  const promise2= response.json();
  //  promise2.then(data=>console.log('Data is', data))
  //  .catch(err=>console.log('JSON parse error',err))
  //  }).catch(err=>{
  //   console.log('Error is',err);
  //  })
  try{
  const response=await fetch(URL);//block
  const object=await response.json();//block
  return object;//wrap inside  promise
  }catch(err){
    console.log('problem in api',err);
    throw err; 
  }

}
export default makeNetworkCall;