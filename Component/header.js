import React from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import {LOGOUT, HEADER} from '../url';
const Header=(props)=>{
      const logoutHandler=()=>{
        $('#error_msg').html('');
        axios.delete(LOGOUT,HEADER).then((res)=>{
          if(res.data.success==1) {
                localStorage.clear();
                window.location.reload('/');
            } else {
                $('#error_msg').html(res.data.msg)
            }
        }).catch((error)=>{

        }) 
     }
        return(
          <header>
              <div class="shadow-sm ">
                  <nav class="navbar navbar-expand-lg navbar-light " style={{backgroundColor:'rgb(240, 245, 251)'}}>
                    <a class="navbar-brand" href="/"><img src="/images/logo.png" width="40" height="40" alt=""/></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul class="navbar-nav mr-auto">
                          <form class="form-inline my-2 my-lg-0">

                          </form>
                      </ul>
                      <li class="nav-item">
                          <Link to="/network"  href="javascript:" class="nav-link">Network</Link>
                      </li>
                      <div class="dropdown">
                        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                          {localStorage.getItem('name')}
                        </button>
                      
                        <div class="dropdown-menu" style={{marginLeft:"-80px"}}>
                          <Link to="/profile" class="dropdown-item" href="javascript:">Profile</Link>
                          {localStorage.getItem('lamba_web_token')!=null && <a href="javascript:" class="dropdown-item" onClick={()=>logoutHandler()}>Logout</a>}
                        </div>
                      </div>
                    </div>
                  </nav>
              </div>
          </header>)
}
export default Header