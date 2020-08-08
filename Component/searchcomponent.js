import React from 'react';
const SearchComponent =(props)=>{
  return(
  	 <input class="form-control mr-sm-2" type="search"  placeholder={props.placeholder} alt="" onChange={(e)=>props.getData(props.currentPage,e.target.value)} class={props.class}/>
  )
}
SearchComponent.defaultProps = {
  placeholder: "Placeholder",
  type:'search',
  id:'id',
  class:''
};
export default SearchComponent;
