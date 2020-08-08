import React, { useState } from 'react';
import axios from 'axios';
import {Route,Switch} from "react-router-dom";
import Header from './Component/header';
import Footer from './Component/footer';
import routes from './routes';
import Parent from './Component/Parent'
import Loader from './Component/Loader/main_loader';
import Authentication from './Container/Authentication/'
 const App=(props)=>{ 
    const [isLoading,changeIsLoading]=useState(true)
    if(isLoading)
    {
    return(
        <Parent>
          <Header/>
          <Switch>
            {routes.map((route,idx)=>{
              return(route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                    <route.component {...props} />
                  )} />)
                  : (null))
            })}
          </Switch>  
          <Footer/>
        </Parent>
    );
    }
    else
    {
      return(<Loader />)
    }
  }

export default Authentication(App);