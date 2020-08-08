import React from 'react'
const InputBox=(props)=>
{
		return(<input type={props.type} placeholder={props.placeholder} name={props.name} id={props.id} class={props.class} required={props.required}/>)
}


InputBox.defaultProps = {
  placeholder: "Placeholder",
  type:'input',
  name: "name",
  id:'id',
  required:true,
  class:'None'
};


export default InputBox