import React from 'react';
import SearchComponent from '../Component/searchcomponent';
import {Link} from 'react-router-dom';
import {NETWORKLIST} from '../url';
import axios from 'axios';
import Pagination from "react-js-pagination";
import Loader from '../Component/Loader/main_loader';
import cogoToast from 'cogo-toast';
import $ from 'jquery'
class Network extends React.Component
{
    state={networkList:[],isLoading:false,loading_msg:'Please Wait',currentPage:1,total:1,itemsCountPerPage:10,pageRangeDisplayed:3}
    componentDidMount()
    {
         this.getData(1,'')
    }
    getData=(page,keyword)=>{
         const HEADER = {
          headers: {
           'Content-Type': 'application/json;charset=UTF-8',
           'Accept':'application/json',
           'Authorization':"Bearer " + localStorage.getItem('lamba_web_token'),
          }
          };
        axios.post(`${NETWORKLIST}?page=${page}`,{
            // 'searchKeyword':keyword,
            // 'jobid':this.state.jobid
        },HEADER).then((res)=>{
            if(res.data.meta.code==200)
            {
              var response=res.data.data;
              this.setState({currentPage:response.current_page,networkList:response.data,total:response.total});
              setTimeout(()=>this.setState({isLoading:true}),1000)
            }
        }).catch((error)=>{

        })
    }
	render()
	{
    const {networkList,isLoading,loading_msg,total}=this.state;
    if(isLoading)
    {
      	return(<section class="wrapper">
              <div class="m-5 p-2" style={{}}>

                   <table class="table">
                    <thead class="thead-dark">
                      <tr>
                        <th>S.No</th>
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {networkList.length>0 && networkList.map((res,index)=>{return(
                        <tr style={{cursor:"pointer"}} onClick={()=>{this.props.history.push(`/network/${res.name.toLowerCase()}/${res.id}`)}}>
                          <td>{index+1}</td>
                          <td>{res.id}</td>
                          <td>{res.name}</td>
                          <td>{res.gender}</td>
                          <td>{res.permanent_address==null?"Not defined":res.permanent_address.city}</td>
                        </tr>)})}
                    </tbody>
                  </table>
                {total>1 && <div class="float-right mt-3">
                  <Pagination
                      activePage={this.state.currentPage}
                      itemsCountPerPage={this.state.itemsCountPerPage}
                      totalItemsCount={this.state.total}
                      pageRangeDisplayed={this.state.pageRangeDisplayed}
                      onChange={this.getData}
                      itemClass='page-item'
                      linkClass="page-link bold"
                   />
              </div>}
              </div>
              </section>)
    }
    else
    {
      return(<Loader message={loading_msg}/>)
    }
	}
}
export default Network