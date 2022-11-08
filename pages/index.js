import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  Switch,
  Redirect,
} from "react-router-dom";
import{useQuery,gql} from '@apollo/client';
import { Navigate } from "react-router-dom";

import Layout from '../components/Layout';
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import NotePage from './note';
import SignUp from './signup';
import SignIn from './signin';
import NewNote from './new';
import EditNote from './edit';
import {IS_LOGGED_IN} from '../gql/query';

// check for a local token



const Pages = () => {
	
const data = {
  isLoggedIn: !!localStorage.getItem('token')
};

 return (

	<BrowserRouter>

	<Routes>

	<Route exact path="/"element={<Home/>} />
	<Route path="/mynotes"element={<ProtectedRoute data={data}><MyNotes/></ProtectedRoute>}/>
	<Route path="/favorites"element={<ProtectedRoute data={data}><Favorites/></ProtectedRoute>}/>
	<Route path="/note/:id"element={<NotePage/>}/>
	<Route path="/signup"element={<SignUp/>}/>
	<Route path="/signin"element={<SignIn/>}/>
	<Route path="/new"element={<ProtectedRoute data={data} ><NewNote/></ProtectedRoute>}/>
	<Route path="/edit"element={<EditNote/>}/>
   
	</Routes>

	</BrowserRouter>
	
	  
	);
}

const ProtectedRoute= ({ data={data},redirectPath = '/', children, }) => {
	
  if (!data) {
    return <Navigate to={redirectPath} replace />;
	
	 console.log(data);
  }
  if(data){

  return children;}
  
};


export default Pages;
