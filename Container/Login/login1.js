import React,{useEffect,useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import $ from 'jquery';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {LOGIN,TAG,REGISTER} from '../../url.js';
import cogoToast from 'cogo-toast';
import LoadingGif from '../../Component/Loader/main_loader'
const Login=(props)=>{
  const [signIn,changeSignIn]=useState(false);
  const [loaderData,changeLoaderData]=useState({loading:false,loading_msg:"Please Wait"});
  const [submitDisabled,changeSubmitDisabled]=useState(false);
  const [formdata,ChangeFormdata]=useState({name:"",email:"",phone_number:"",password:"",gender:"",date_of_birth:""})
  const [loginForm,ChangeLoginForm]=useState({email:"",password:""});
  const registerHandler=(e)=>{
  	  e.preventDefault();
      $('#login_err_msg').html('');
      $('#err_msg_effect').removeClass('err_slide');
      // this.setState({submitDisabled:true,err_result:[]});
      changeSubmitDisabled(true);
	  if(formdata.name=='' || formdata.email=='' || formdata.password=='' || formdata.phone_number=="")
	    {
	      cogoToast.success('All Fields Must Be Filled');
	      changeSubmitDisabled(false);
	      return false;
	    }
	    let d="";
	    if(formdata.date_of_birth!="")
	    {
	    	const {date_of_birth}=formdata;
	        // d=date_of_birth.getFullYear()+'-'+(date_of_birth.getMonth()+1)+'-'+date_of_birth.getDate();
	        // d=date_of_birth.toDateString("Y-mm-dd");
	        d=generateDateToday();
	    	// ChangeFormdata({...formdata,date_of_birth:date_of_birth.getFullYear()+'-'+(date_of_birth.getMonth()+1)+'-'+date_of_birth.getDate()})
	    }
        axios.post(REGISTER,{...formdata,date_of_birth:d})
      .then(response=>{
      	console.log(response);
      	let res=response.data.meta;
          if(res.code==201){
          	changeSubmitDisabled(false);
          	changeLoaderData({...loaderData,loading:true,loading_msg:`Registering ${formdata.name} Please Wait`})
            setTimeout(()=>loginHandler(),1000);

          }
          else {
            cogoToast.success('Something Went Wrong Please try again');
            changeSubmitDisabled(false);
            $('#login_err_msg').html('Invalid Credentials');
          }
      })
      .catch((error)=>{
        changeSubmitDisabled(false);
        cogoToast.success(error.message);
      });

  }
  const generateDateToday=()=>{
    var d = formdata.date_of_birth
    var year = d.getFullYear();
    var month = ("0" + (d.getMonth() + 1)).slice(-2);
    var day = ("0" + d.getDate()).slice(-2);
    var hour = ("0" + d.getHours()).slice(-2);
    var minutes = ("0" + d.getMinutes()).slice(-2);
    var seconds = ("0" + d.getSeconds()).slice(-2);
    return year + "-" + month + "-" + day + " "+ hour + ":" + minutes + ":" + seconds;
}
  const loginHandler=()=>{
  	   $('#login_err_msg').html('');
  	   changeSubmitDisabled(true);
	   if(formdata.email=='' || formdata.password=='')
	    {
	      cogoToast.success('All Fields Must Be Filled');
	      changeSubmitDisabled(false);
	      return false;
	    }
        axios.post(LOGIN,formdata)
      .then(response=>{
      	console.log(response);
      	let res=response.data.meta;
          if(res.code==200){
            localStorage.setItem('status','Y');
            let name=response.data.data.user.name.charAt(0).toUpperCase() + response.data.data.user.name.slice(1);
            localStorage.setItem('name',name);
            localStorage.setItem('lamba_web_token',response.data.data.session.access_token);
            localStorage.setItem('email',formdata.email);
            localStorage.setItem('user_id',response.data.data.user.id);
            changeSubmitDisabled(false);
          	changeLoaderData({...loaderData,loading:true,loading_msg:`LoggedIn ${response.data.data.user.name} Please Wait`})
            cogoToast.success('Logged in successfully!');
            setTimeout(()=>window.location.href='/',1000);

          }
          else {
            changeSubmitDisabled(false);
            $('#login_err_msg').html('Invalid Credentials');
          }
      })
      .catch( (error)=> {
        changeSubmitDisabled(false);
       cogoToast.success(error.message);
      });
  }
  if(!loaderData.loading)
  {
  return(<div class="container">
	<br/> 
	<div class="card bg-light">
	<span id="login_err_msg" style={{color:"red"}}></span>
	{!signIn && <article class="card-body mx-auto" style={{maxWidth:"400px;"}}>
		<h4 class="card-title mt-3 text-center">Create Account</h4>
		<p class="text-center">Get started with your free account</p>

		<p class="divider-text">
	        <span class="bg-light">OR</span>
	    </p>
		<form onSubmit={registerHandler}>
		<div class="form-group input-group">
			<div class="input-group-prepend">
			    <span class="input-group-text"> <i class="fa fa-user"> *</i> </span>
			 </div>
	        <input name="" class="form-control" placeholder="Full name" type="text" required onChange={(e)=>ChangeFormdata({...formdata,name:e.target.value.trim()})}/>
	    </div> 
	    <div class="form-group input-group">
	    	<div class="input-group-prepend">
			    <span class="input-group-text"> <i class="fa fa-envelope"> *</i> </span>
			 </div>
	        <input name="" class="form-control" placeholder="Email address" type="email" required onChange={(e)=>ChangeFormdata({...formdata,email:e.target.value.trim()})}/>
	    </div>
	    <div class="form-group input-group">
	    	<div class="input-group-prepend">
			    <span class="input-group-text"> <i class="fa fa-phone"> *</i> </span>
			</div>
	    	<input name="" class="form-control" placeholder="Phone number" type="text" required onChange={(e)=>ChangeFormdata({...formdata,phone_number:e.target.value.trim()})}/>
	    </div> 
	    <div class="form-group input-group">
	    	<div class="input-group-prepend">
			    <span class="input-group-text"> <i class="fa fa-building"></i> </span>
			</div>
			<select class="form-control" onChange={(e)=>ChangeFormdata({...formdata,gender:e.target.value.trim()})}>
				<option selected="">Gender</option>
				<option value="male">Male</option>
				<option value="female">Female</option>
			</select>
		</div> 
		     <div class="form-group input-group">
	    	<div class="input-group-prepend">
			    <span class="input-group-text"><i class="fa fa-building"></i></span>
			</div>
			<input name="" class="form-control" placeholder="Enter Your Dob" type="text" disabled/>
	        <DatePicker
	        selected={formdata.date_of_birth}
	        onChange={(date)=>{ChangeFormdata({...formdata,date_of_birth:date})}}
	        className="form-control"
	        maxDate={new Date()}
	      />
	    </div>  
	    <div class="form-group input-group">
	    	<div class="input-group-prepend">
			    <span class="input-group-text"> <i class="fa fa-lock"> *</i> </span>
			</div>
	        <input class="form-control" placeholder="Create password" type="password" onChange={(e)=>ChangeFormdata({...formdata,password:e.target.value.trim()})}/>
	    </div>     
	                           
	    <div class="form-group">
	        <button type="submit" class="btn btn-primary btn-block" disabled={submitDisabled}> Create Account  </button>
	    </div>     
	    <p class="text-center">Have an account? <a href="javascript:" onClick={()=>changeSignIn(true)}>Log In</a> </p>                                                                 
	</form>
	</article>}
	{signIn && <article class="card-body mx-auto" style={{maxWidth:"400px;"}}>
		<h4 class="card-title mt-3 text-center">Login To Your Account</h4>
		<p class="divider-text">
	        <span class="bg-light">OR</span>
	    </p>
		<form>
	    <div class="form-group input-group">
	    	<div class="input-group-prepend">
			    <span class="input-group-text"> <i class="fa fa-envelope"> *</i> </span>
			 </div>
	        <input name="" class="form-control" placeholder="Email address" type="email" onChange={(e)=>ChangeFormdata({...formdata,email:e.target.value.trim()})}/>
	    </div>
	    <div class="form-group input-group">
	    	<div class="input-group-prepend">
			    <span class="input-group-text"> <i class="fa fa-lock"> *</i> </span>
			</div>
	        <input class="form-control" placeholder="Create password" type="password" onChange={(e)=>ChangeFormdata({...formdata,password:e.target.value.trim()})}/>
	    </div>     
	                           
	    <div class="form-group">
	        <button type="button" class="btn btn-primary btn-block" onClick={()=>loginHandler()}>Signin</button>
	    </div>     
	    <p class="text-center">New user? <a href="javascript:" onClick={()=>changeSignIn(false)} disabled={submitDisabled}>Create Account</a> </p>                                                                 
	</form>
	</article>}

	</div> 
</div> )
  }
  else
  {
  	return(<LoadingGif message={loaderData.loading_msg}/>)
  }
	
}
export default Login;