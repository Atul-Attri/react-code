const baseurl=" http://127.0.0.1:8000/api/v1"
export const TAG="WEB";
export const USERID=localStorage.getItem('user_id')==null?0:localStorage.getItem('user_id');
export const LOGIN=baseurl+"/login";
export const REGISTER=baseurl+"/register";
export const LOGOUT=baseurl+"/logout";
export const NETWORKLIST=baseurl+"/profile/list";
export const USERDATA=baseurl+"/profile"
export const GETPROFILE=baseurl+"/profile/get"
export const UPDATEPROFILE=baseurl+"/profile/update"



export const HEADER = {
headers: {
 'Content-Type': 'application/json;charset=UTF-8',
 'Accept':'application/json',
 'Authorization':"Bearer " + localStorage.getItem('lamba_web_token'),
}
};