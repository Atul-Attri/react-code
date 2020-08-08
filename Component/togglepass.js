import React from 'react';
import $ from 'jquery'
const TogglePass=(props)=>
{
	const togglePass=(id,id2)=>{
    var x = document.getElementById(id);
    if (x.type === "password") {
       $('#'+id2).removeClass('fa fa-eye-slash');
       $('#'+id2).addClass('fa fa-eye');
       x.type = "text";
    } else {
        $('#'+id2).removeClass('fa fa-eye');
        $('#'+id2).addClass('fa fa-eye-slash');
       x.type = "password";
    }
  }
	return(<span onClick={()=>togglePass(props.id1,props.id2)}><i id="leyepass" class="fa fa-eye-slash"></i></span>)
}

export default TogglePass