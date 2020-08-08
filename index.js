import React from 'react';
import ReactDOM from 'react-dom';
import {Switch,BrowserRouter as Router,Route} from "react-router-dom";
import App from './App';
import ScrollToTop from './Container/scrolltotop'
import axios from 'axios'
class MainContainer extends React.Component
{
	state={jobCategory:[]}
	componentDidMount()
	{
		if(localStorage.getItem('jobportal_version')==null)
		{
		  localStorage.clear();
		  localStorage.setItem('jobportal_version','1.0');

		}
		else if(localStorage.getItem('jobportal_version')!='1.0')
		{
		  localStorage.clear();
		  localStorage.setItem('jobportal_version','1.0')
		}
	    this.setStorage();
   }
  setStorage=()=>{
    if(localStorage.getItem('user_id')==null )
    {
      localStorage.setItem('user_id',0)
    }
   }
	render()
	{
		const {jobCategory}=this.state
		return(
	    <Router>
	      <ScrollToTop />
	      <Switch>
		      <Route path="/" component={App}/>/>
	      </Switch>
	    </Router>)
    }
 }
ReactDOM.render( <MainContainer />,document.getElementById('root'));