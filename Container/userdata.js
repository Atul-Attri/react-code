import React from 'react';
import SearchComponent from '../Component/searchcomponent';
import {Link} from 'react-router-dom';
import {USERDATA} from '../url';
import axios from 'axios';
import Pagination from "react-js-pagination";
import Loader from '../Component/Loader/main_loader';
import cogoToast from 'cogo-toast';
import $ from 'jquery'
class UserData extends React.Component
{
    state={user_data:{},user_id:0,isLoading:false,loading_msg:'Please Wait'}
    componentDidMount()
    {
        this.setState({user_id:this.props.match.params.user_id},function(){
          this.getData()
        })
    }
    getData=()=>{
         const HEADER = {
          headers: {
           'Content-Type': 'application/json;charset=UTF-8',
           'Accept':'application/json',
           'Authorization':"Bearer " + localStorage.getItem('lamba_web_token'),
          }
          };
        axios.get(`${USERDATA}/${this.state.user_id}/view`,HEADER).then((res)=>{
            if(res.data.meta.code==200)
            {
              var response=res.data.data;
              this.setState({user_data:response});
              setTimeout(()=>this.setState({isLoading:true}),1000)
            }
        }).catch((error)=>{

        })
    }
    componentDidUpdate()
    {
      if(this.props.match.params.user_id!=this.state.user_id)
      {
        this.setState({user_id:this.props.match.params.user_id},function(){
          this.getData()
        })
      }
    }
	render()
	{
    const {user_data,isLoading,loading_msg,total}=this.state;
    if(isLoading)
    {
      	return(<section class="wrapper">
                <div class="container p-5">
                  <div class="row">
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <p>Email:<span>{user_data.email}</span></p>
                        <p>Name:<span>{user_data.name}</span></p>
                        <p>Dob:<span>{user_data.date_of_birth}</span></p>
                        <p>Phone Number:<span>{user_data.phone_number}</span></p>
                      </div>
                  </div>
              </div>
              </section>)
    }
    else
    {
      return(<Loader message={loading_msg}/>)
    }
	}
}
export default UserData