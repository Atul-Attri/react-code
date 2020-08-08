import React from 'react';
import {Link} from 'react-router-dom'
const NotFound=()=>{
  return(<div>
            <div class="loader_cont" >
              <div class="man_icon"><img src="/images/notfound.svg" alt="" /></div>
              <h3 class="title">404</h3>
              <Link to="/"><button type="button" class="btn btn-primary">Company Home</button></Link>
            </div>
            <div class="clearfix"></div></div>
)
}
export default NotFound;
