import React, { useEffect } from 'react';
import { useMutation, useApolloClient,InMemoryCache,ApolloClient} from '@apollo/client';


import UserForm from '../components/UserForm';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import { IS_LOGGED_IN } from '../gql/query';
import { gql } from '@apollo/client';
const SIGNIN_USER = gql`
  mutation signIn($email: String, $password: String!) {
    signIn(email: $email, password: $password)
  }
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
const IS_LOGGED_IN = gql`
  {
    isLoggedIn@client
  }
`;

function SignIn (props) {
	 let navigate = useNavigate();
	 const data = {  isLoggedIn: !!localStorage.getItem('token')};	
  useEffect(() => {
    // update the document title
    document.title = 'Sign In — Notedly';
  });

 
  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      // store the token
      localStorage.setItem('token', data.signIn);
      // update the local cache
	
  
      navigate('/');
    }
  });

  return (
  	<div>
    <Header/>
       <Wrapper>
	  <Navigation/>
	 <Main>
	 <div>
    <React.Fragment>
      <UserForm action={signIn} formType="signIn" />
      {/* if the data is loading, display a loading message*/}
      {loading && <p>Loading...</p>}
      {/* if there is an error, display a error message*/}
      {error && <p>Error signing in!</p>}
    </React.Fragment>
	
	</div>
	</Main>
	</Wrapper>
	</div>
  );
};

export default SignIn;
