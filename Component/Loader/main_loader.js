import React from 'react';
import Loader from 'react-loader-spinner'
const CommonLoader =(props)=>{
  return(<div class="loader_cont" > <Loader
         type="RevolvingDot"
         color="#0195ED"
         height={100}
         width={100}
      ></Loader>
      <p class="text-center">{props.message}</p>
      </div>)
}
export default CommonLoader;