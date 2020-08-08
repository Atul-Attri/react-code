import React, {useState, useEffect} from 'react';
import {GETPROFILE, HEADER, UPDATEPROFILE} from '../url';
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-date-picker';
import Loader from '../Component/Loader/main_loader';

const UserProfile = () => {

  const [userData, setUserData] = useState({});
  const [typeView, setTypeView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [dob, setDob] = useState(null);
  const [loadingMsg, setLoadingMsg] = useState('Please Wait');
  const [updatedMsg, setUpdatedMsg] = useState(null);
  const [formInputs, setFormInputs] = useState({
    userName:'',
    userMobile:'',
    p_street:'',
    p_city:'',
    p_state:'',
    p_country:'',
    p_pincode:'',
    c_street:'',
    c_city:'',
    c_state:'',
    c_country:'',
    c_pincode:'',
  });

  function handleChange(evt) {
    const { value } = evt.target;
    const array = {};
    array[evt.target.name] = evt.target.value;
    setFormInputs({
      ...formInputs,
      ...array,
    });
  }

   const getData = () => {
     axios.get(GETPROFILE,HEADER).then((res)=>{
         if(res.data.meta.code==200) {
           setUserData(res.data.data);
           setDob(res.data.data.date_of_birth);
           setTimeout(()=>setIsLoading(true),1000)
         }
     }).catch((error)=>{
      console.log("error");
     })
 }

  useEffect(() => {
    getData();
  },[]);    

  function saveChanges(){
    const postData = {
      name: formInputs.userName,
      date_of_birth: dob,
      phone_number: formInputs.userMobile,
      permanent_address:{
        street: formInputs.p_street,
        city: formInputs.p_city,
        state: formInputs.p_state,
        country: formInputs.p_country,
        pincode: formInputs.p_pincode
      },
      company_address:{
        street: formInputs.c_street,
        city: formInputs.c_city,
        state: formInputs.c_state,
        country: formInputs.c_country,
        pincode: formInputs.c_pincode
      }
    };

    axios.put(`${UPDATEPROFILE}`,
    postData,
    HEADER
    ).then((res)=>{
      if(res.data.meta.status === 1) {
        setUpdatedMsg(res.data.meta.message);
      console.log("updated");
      }
   }).catch((err)=>console.log(err));
  }

  function changeDateOfBirth(){
    var updatedDob = moment(dob).format('YYYY-MM-DD');
    alert(updatedDob); return;
    setDob(updatedDob);
  };

	return(
  <>
    {isLoading ?
     <>
      <section class="wrapper">
        <div class="container">
          <div style={{display:"flex", justifyContent:"space-between", marginTop:"1rem"}}>
            <h1>{typeView ? `View` : `Edit`} Profile</h1>
            <h4 onClick={()=> setTypeView(!typeView) }><u style={{color:"blue", cursor:"pointer"}}>{typeView ? `Edit` : `View`}</u></h4>
          </div>
          <hr/>
        <div class="row">
          <div class="col-md-3">
            <div class="text-center">
            <img src="//placehold.it/100" class="avatar img-circle" alt="avatar"/>
            <h6>Upload a different photo...</h6>
            <input type="file" class="form-control"/>
          </div>
        </div>
      
        <div class="col-md-9 personal-info">
        {updatedMsg ?
          <div class="alert alert-info alert-dismissable">
            <a class="panel-close close" data-dismiss="alert">×</a> 
            <i class="fa fa-coffee"></i>
             {updatedMsg}
          </div>
          : null }
          <h3>Personal info</h3>
        
          <div className="row">
            <div className="col-lg-6">
              <div class="form-group">
                <label class="col-lg-3 control-label">Name:</label>
                <div class="col-lg-12">
                  <input class="form-control" name="userName" disabled={typeView ? true : false} type="text" defaultValue={userData.name} onChange={handleChange}/>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div class="form-group">
                <label class="col-lg-3 control-label">Email:</label>
                <div class="col-lg-12">
                  <input class="form-control" type="text" disabled value={userData.email} />
                </div>
              </div>
            </div>  
            <div className="col-lg-6">
              <div class="form-group">
                <label class="col-md-3 control-label">Mobile:</label>
                <div class="col-md-12">
                  <input class="form-control" name="userMobile" disabled={typeView ? true : false} type="text" defaultValue={userData.phone_number} onChange={handleChange}/>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div class="form-group">
                <label class="col-md-3 control-label">DOB:</label>
                  <div class="col-md-12">
                  {typeView ?
                   <input class="form-control" disabled type="text" defaultValue={userData.date_of_birth}/>
                   :
                    <DatePicker onChange={() => changeDateOfBirth()}  value={dob}/>
                  }
                    
                  </div>
              </div>
            </div>
          <div className="col-lg-6">
              <div class="form-group">
                <label class="col-md-12 control-label">Permanent Address:</label>
                <div class="col-md-12">
                  <input class="form-control" name="p_street" placeholder="Street" disabled={typeView ? true : false}type="text" defaultValue={userData.permanent_address.street}/>
                  <input class="form-control" name="p_city" placeholder="City" disabled={typeView ? true : false} type="text" style={{marginTop:"1rem"}} defaultValue={userData.permanent_address.city} onChange={handleChange}/>
                  <input class="form-control" name="p_state" placeholder="State" disabled={typeView ? true : false} type="text" style={{marginTop:"1rem"}} defaultValue={userData.permanent_address.state} onChange={handleChange}/>
                  <input class="form-control" name="p_country" placeholder="Country" disabled={typeView ? true : false} type="text" style={{marginTop:"1rem"}} defaultValue={userData.permanent_address.country} onChange={handleChange}/>
                  <input class="form-control" name="p_pincode" placeholder="Pincode" disabled={typeView ? true : false} type="text" style={{marginTop:"1rem"}} defaultValue={userData.permanent_address.pincode} onChange={handleChange}/>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div class="form-group">
                <label class="col-md-12 control-label">Company Address:</label>
                <div class="col-md-12">
                  <input class="form-control" name="c_street" placeholder="Street" disabled={typeView ? true : false} type="text" defaultValue={userData.company_address.street}/>
                  <input class="form-control" name="c_city" placeholder="City" disabled={typeView ? true : false} type="text" style={{marginTop:"1rem"}} defaultValue={userData.company_address.city} onChange={handleChange}/>
                  <input class="form-control" name="c_state" placeholder="State" disabled={typeView ? true : false} type="text" style={{marginTop:"1rem"}} defaultValue={userData.company_address.state} onChange={handleChange}/>
                  <input class="form-control" name="c_country" placeholder="Country" disabled={typeView ? true : false} type="text" style={{marginTop:"1rem"}} defaultValue={userData.company_address.country} onChange={handleChange}/>
                  <input class="form-control" name="c_pincode" placeholder="Pincode" disabled={typeView ? true : false} type="text" style={{marginTop:"1rem"}} defaultValue={userData.company_address.pincode} onChange={handleChange}/>
                </div>
              </div>
            </div>
          </div> 
          { typeView ? null : <div onClick={() => saveChanges()} class="btn btn-primary"> Save Changes</div>}
        </div>
    </div>
  </div>
</section>
    </> : <>
    <Loader message={loadingMsg}/>
    </>}
    </>
  )
}
export default UserProfile;