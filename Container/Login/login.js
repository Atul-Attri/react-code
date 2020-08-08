import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {LOGIN,TAG,REGISTER} from '../../url.js';
import LoadingGif from '../../Component/Loader/main_loader'
import cogoToast from 'cogo-toast';
import TogglePassword from '../../Component/togglepass';
import InputBox from '../../Component/InputBox'
class Login extends Component {
  state={err_result:[],isLoading:false,sigin:true,signup:false,loading:false,loading_msg:'',url:'',submitDisabled:false,lpswdvisible:false}
  // componentDidMount()
  // {
  //   cogoToast.success('This is a success message!');
  // }
  loginFormSubmit=(e)=>
  {
      e.preventDefault();
      $('#err_msg_effect').removeClass('err_slide');
      $('#login_err_msg').html('');
      this.setState({submitDisabled:true,err_result:[]})
        var emailid=e.target.lemail.value.trim();
        var password=e.target.lpassword.value.trim();
        axios.post(LOGIN, {
        email:emailid,
        password:password,
      })
      .then(response=>{
          if(response.data.success==3)
          {
            this.setState({submitDisabled:false,err_result:response.data.error});
            $('#err_msg_effect').addClass('err_slide');
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
          }
          if(response.data.success=='1'){
            localStorage.setItem('status','Y');
            localStorage.setItem('name',response.data.name);
            localStorage.setItem('squareboat_web_token',response.data.token);
            localStorage.setItem('email',response.data.email);
            localStorage.setItem('user_id',response.data.user_id);
            localStorage.setItem('account_id',response.data.account_id);
            this.setState({loading:true,loading_msg:'Logging In Please Wait',submitDisabled:false});
            cogoToast.success('Logged in successfully!');
                    //    setTimeout(()=>this.props.history.push('/dashboard/ve')),1500);
            //setTimeout(()=>window.location.href='/',1000);
            setTimeout(()=>this.props.history.push(localStorage.getItem('url')),1500);

          }
          else {
            this.setState({submitDisabled:false})
            $('#login_err_msg').html('Invalid Credentials');
          }
      })
      .catch((error)=> {
        this.setState({submitDisabled:false})
      });
  }
  normalLogin=(emailid,password)=>
  {
      $('#login_err_msg').html('');
        axios.post(LOGIN, {
        email:emailid,
        password:password
      })
      .then(response=>{
          if(response.data.success=='1'){
            localStorage.setItem('status','Y');
            localStorage.setItem('name',response.data.name);
            localStorage.setItem('squareboat_web_token',response.data.token);
            localStorage.setItem('email',response.data.email);
            localStorage.setItem('account_id',response.data.account_id);
            localStorage.setItem('user_id',response.data.user_id);

            //setTimeout(()=>this.props.history.push('/'),1500);
            this.setState({loading:true,loading_msg:'Logging In Please Wait',submitDisabled:false});
            cogoToast.success('Logged in successfully!');
            setTimeout(()=>this.props.history.push(localStorage.getItem('url')),1500);
            //setTimeout(()=>window.location.href='/',1000);

          }
          else {
            this.setState({submitDisabled:false})
            $('#login_err_msg').html('Invalid Credentials');
          }
      })
      .catch( (error)=> {
        this.setState({submitDisabled:false})
        console.log(error);
      });
  }
  registerFormSubmit=(e)=>
  {
      e.preventDefault();
      $('#login_err_msg').html('');
      $('#err_msg_effect').removeClass('err_slide');
      this.setState({submitDisabled:true,err_result:[]})
        var name=e.target.pname.value.trim();
        var emailid=e.target.pemail.value.trim();
        var password=e.target.ppass.value.trim();
        if(name=='' || emailid=='' || password=='')
        {
          cogoToast.success('All Fields Must Be Filled');
          this.setState({submitDisabled:false})
          return false;
        }
        axios.post(REGISTER, {
        name:name,
        email:emailid,
        password:password
      })
      .then(response=>{
        if(response.data.success==3)
        {
            this.setState({submitDisabled:false});
            $('#login_err_msg').html("Invalid Details");
            // $('#err_msg_effect').addClass('err_slide');
            //     $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        }
          if(response.data.success=='1'){
            this.setState({submitDisabled:false,loading:true,loading_msg:`Registering ${name} Please Wait`});
            setTimeout(()=>this.normalLogin(emailid,password),1000);

          }
          else if(response.data.success=='2')
          {
            cogoToast.success(response.data.msg);
            this.setState({submitDisabled:false})
            $('#login_err_msg').html(response.data.msg);
          }
          else {
            cogoToast.success('Something Went Wrong Please try again');
            this.setState({submitDisabled:false})
            $('#login_err_msg').html('Invalid Credentials');
          }
      })
      .catch((error)=>{
        this.setState({submitDisabled:false})
        console.log(error);
      });
  }
  render() {
    const {signup,sigin,isLoading,loading,loading_msg,submitDisabled,err_result}=this.state;
      if(!isLoading)
    {
      if(!loading)
      {
    return (
      <div class="container center_div">
      {err_result.length >0 && <div class="error_box" id="err_msg_effect">
              <ul>
                {err_result.map((res,key)=>{
                  return(<li key={key}><p>{res}</p></li>)
                })}
              </ul>
            </div>}
                <section class="login_page">
        {sigin && <article class="login">
            <form onSubmit={this.loginFormSubmit} id="login_form" >
                <div class="logo">
                    <a href="index.html">
                        <img src="/images/logo.png" alt="" />
                    </a>
                </div>
                <h2>Log In</h2>
                <div class="fields">
                    <div class="inputbox">
                        <label>Email</label>
                        <InputBox type="email" placeholder="Enter Email" required={true}  name="lemail"/>
                    </div>
                    <div class="inputbox">
                        <label>Password</label>
                        <InputBox type="password" placeholder="Enter Password" name="lpassword" id="lpassword" required={true}/>
                        {/*<TogglePassword  id1="lpassword" id2="leyepass"/>*/}
                    </div>
                </div>
                  <span id="login_err_msg"></span>
                  <a href="javascript:" class="register" onClick={()=>this.setState({sigin:false,signup:true,err_result:[]})}>Create An Account</a>
                  <div class="buttons">
                      <button type="submit" class="btn btn_submit" disabled={this.state.submitDisabled}>{submitDisabled?"Loading...":"Login"}</button>
                  </div>
            </form>
        </article>}

        
          {signup && <article class="login" >
            <form onSubmit={this.registerFormSubmit}>
                <div class="logo">
                    <a href="index.html">
                        <img src="/images/logo.png" alt="" />
                    </a>
                    </div>
                    <h2>Register</h2>
                 <div class="fields">
                      <div class="inputbox">
                          <label>Name</label>
                          <InputBox type="text" placeholder="Full Name" name="pname" id="pname" required={true}/>
                      </div>
                      <div class="inputbox">
                          <label>Email</label>
                          <InputBox type="email" placeholder="Enter Email" name="pemail" id="pemail" required={true}/>
                      </div>
                      <div class="inputbox">
                          <label>Password</label>
                          <InputBox type="password" placeholder="Password" name="ppass" id="ppass" required={true}/>
                          {/*<TogglePassword  id1="ppass" id2="reyepass"/>*/}
                      </div>

                  </div>
                    <span id="login_err_msg"></span>
                  <a href="javascript:;" class="register" onClick={()=>this.setState({sigin:true,signup:false,err_result:[]})}>Already a member</a>
                  <div class="buttons">
                      <button type="submit" class="btn btn_submit" disabled={this.state.submitDisabled}>{submitDisabled?"Loading...":"Register"}</button>
                  </div>
            </form>
        </article>}
        <div class="clearfix"></div>
    </section>
      </div>
)
}
else {
  return(<LoadingGif message={loading_msg}/>)
}
}
else {
  return(<LoadingGif message={loading_msg}/>)
}
    
  }
}
export default Login;