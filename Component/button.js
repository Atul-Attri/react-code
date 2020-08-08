import React from 'react'
const Button=(props)=>
{	
	return(<button type={props.type} id={props.id} class={props.class} disabled={props.required} >{props.title}</button>)
}


Button.defaultProps = {
  title: "Submit",
  type:'button',
  id:'id',
  disabled:false,
  class:'btn btn-primary float-right',
};


export default Button