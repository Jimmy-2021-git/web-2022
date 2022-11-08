import React,{useEffect,useState}from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import {useMutation,useApolloClient,gql} from '@apollo/client';
import UserForm from '../components/UserForm';
import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SIGNUP_USER=gql`
mutation signUp($email:String!,$username:String!,$password:String!){
signUp(email:$email,username:$username,password:$password)}
`;


const Wrapper = styled.div`
 // We can apply media query styles within the styled component 
 // This will only apply the layout for screens above 700px wide 
  @media (min-width: 700px) {
    display: flex;
    top: 64px;
    position: relative;
    height: calc(100% - 64px);
    width: 100%;
    flex: auto;
    flex-direction: column;
  }
`;

const Form=styled.form`
label,
input{
	display:block;
	line-height:2em;
}
input {
	width:100%;
	margin-bottom:1em;
}
`;


const Main = styled.main`
  position: fixed;
  height: calc(100% - 185px);
  width: 100%;
  padding: 1em;
  overflow-y: scroll;
  @media (min-width: 700px) {
    flex: 1;
    margin-left: 220px;
    height: calc(100% - 64px);
    width: calc(100% - 220px);
  }
`;


 function SignUp(props){
//const [values,setValues]=useState();
		let navigate = useNavigate();
const client=useApolloClient();
const [signUp,{loading,error}]=useMutation(SIGNUP_USER,
{
	onCompleted:data=>{
		console.log(data.signUp);
		localStorage.setItem('token',data.signUp);
		navigate('/');
		}
});
/*
const handleChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value });
  };
  */



	
	return(
	
	<div>
    <Header/>
       <Wrapper>
	  <Navigation/>
	 <Main>
	 <div>
   <React.Fragment>
      <UserForm action={signUp} formType="signup" />
      {/* if the data is loading, display a loading message*/}
      {loading && <p>Loading...</p>}
      {/* if there is an error, display a error message*/}
      {error && <p>Error creating an account!</p>}
    </React.Fragment>
  
	</div>
	</Main>
	</Wrapper>
	</div>
	);
};

export default SignUp;

/*
<h2> Sign Up </h2>  
	<Form onSubmit= {event => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    console.log(values);
	signUp({variables:{...values}});}}
>
	<label htmlFor="username">Username:</label>
	<input
	requried="true"
	type="text"
	id="username"
	name="username"
	placeholder="username"
	onChange={handleChange}
	/>
	<label htmlFor="email">Email:</label>
	<input
	requried="true" 
	type="email"
	id="email"
	name="email"
	placeholder="email"
	onChange={handleChange}
	/>
	<label htmlFor="password">Password:</label>
	<input 
	requried="true"
	type="password"
	id="password"
	name="password"
	placeholder="Password"
	onChange={handleChange}
	/><br />
	<button type ="submit">Submit</button>
	</Form>
	*/