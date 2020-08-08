import React from 'react';
import Loader from '../Component/Loader/main_loader';
class Home extends React.Component
{
    state={isLoading:false,loading_msg:'Please Wait'}
    componentDidMount()
    {
      setTimeout(()=>this.setState({isLoading:true}),1000)
    }
	render()
	{
    const {jobList,isLoading,loading_msg,jobid,total}=this.state;
    if(isLoading)
    {
      	return(<section class="wrapper">
              <div class="m-5 p-2" style={{}}>
                  Welcome
              </div>
              </section>)
    }
    else
    {
      return(<Loader message={loading_msg}/>)
    }
	}
}
export default Home