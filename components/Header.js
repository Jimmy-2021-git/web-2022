import React from 'react';
import styled from 'styled-components';
import logo from '../img/logo.png';
import { useQuery } from '@apollo/client';
import { Link, withRouter } from 'react-router-dom';

import ButtonAsLink from './ButtonAsLink';
import { IS_LOGGED_IN } from '../gql/query';
import { useNavigate } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
 InMemoryCache
} from '@apollo/client';



const UserState = styled.div`
  margin-left: auto;
`;

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const cache = new InMemoryCache();
// create the Apollo client
const client = new ApolloClient({
  cache,
  resolvers: {},
  connectToDevTools: true
});

// check for a local token


function Header ({props}){
     const navigate = useNavigate();
	 const data = {  isLoggedIn: !!localStorage.getItem('token')};	  
	  {console.log(data)}

  return (
  <div>
    <HeaderBar>
      <img src={logo} alt="Notedly Logo" height="40" />
      <LogoText></LogoText>
	  <UserState>
	  {data.isLoggedIn ?(
	  <ButtonAsLink
	      onClick={() => {
              // remove the token
              localStorage.removeItem('token');
              // clear the application's cache
             
              // update local state
              // write the cache data after cache is reset
			  client.onResetStore(() => cache.modify({ data: { isLoggedIn: false } }));
            
			navigate("/");
			
            }}>Log Out </ButtonAsLink>):(<p>
	  <Link to ={'/signin'}>Sign In</Link> or {''}
	  <Link to ={'/signup'}>Sign Up</Link>
	  </p>)}
	  </UserState>
	  
      
    </HeaderBar>
	</div>
  );
};

export default Header;