import React from 'react';
import {Redirect} from 'react-router-dom'
import Login from "../Login/login1.js"
const Auth=(OldComponent)=>{
  class NewComponent extends React.Component{
    render()
    {
      if(localStorage.getItem('lamba_web_token')!=null)
      {
      return(<OldComponent {...this.props}/>)
      }
      else {
        return(<Login/>)
      }
    }
  }
  return NewComponent;
}

export default Auth;
