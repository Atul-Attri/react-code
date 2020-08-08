import React from 'react'
const TextArea=(props)=>
{
	return(<textarea placeholder={props.placeholder} name={props.name} id={props.id} class={props.class} required={props.required} rows={props.rows} placeholder={props.placeholder}></textarea>)
}


TextArea.defaultProps = {
  placeholder: "Placeholder",
  name: "name",
  id:'id',
  required:true,
  class:'form-control',
  rows:3
};


export default TextArea