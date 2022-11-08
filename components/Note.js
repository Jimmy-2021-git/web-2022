import React from 'react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import styled from 'styled-components';
import {useQuery,gql} from '@apollo/client';
import NoteUser from './NoteUser';
import {IS_LOGGED_IN} from '../gql/query';



/* import { registerLocale } from 'react-datepicker';

import {es} from 'date-fns/locale'
registerLocale('es', es)
import DatePicker from 'react-datepicker'; */


function convertUTCDateToLocalDate(date) {
  var dateLocal = new Date(date);
  var newDate = new Date(dateLocal.getTime() - dateLocal.getTimezoneOffset()*60*1000);
  return newDate;
};


const StyledNote=styled.article`
max-width:800px;
margin:0 auto;
`;
const MetaData=styled.div`
@media(min-width:500px){
	display:flex;
	align-items:top;
}
`;
const MetaInfo=styled.div`
padding-right:1em;
`;

const UserActions=styled.div`
margin-left:auto;
`;


function Note  ({note}){
	
	const{loading,error,data = {
  isLoggedIn: !!localStorage.getItem('token')
}}=useQuery(IS_LOGGED_IN);
    console.log(IS_LOGGED_IN);
	
	return(

	 	 <StyledNote>
      <MetaData>
        <MetaInfo>
          <img
            src={note.author.avatar}
            alt={`${note.author.username} avatar`}
            height="50px"
          />
        </MetaInfo>
        <MetaInfo>
          <em>by</em> {note.author.username} <br />
		  {format(convertUTCDateToLocalDate(note.createdAt), 'MMM dd yyyy')}
        </MetaInfo>
	    {data.isLoggedIn ? (
          <UserActions>
            <NoteUser note={note} />
          </UserActions>
        ) : (
          <UserActions>
            <em>Favorites:</em> {note.favoriteCount}
          </UserActions>
        )}
      </MetaData>
      <ReactMarkdown children={note.content} />
	</StyledNote>

	);
};
export default Note;

/*
	<article>
	<img 
	src={note.author.avatar}
	alt={`${note.author.username}avator`}
	height="50px"/>
	{''}
	{note.author.username}
	{note.createdAt}
	{note.favoriteCount}
	{''}
	<ReactMarkdown source={note.content}/>
	</article>
*/	

/*
{data.isLoggedIn ?(
		<UserActions>
		<NoteUser note={note}/>
		</UserActions>
		):(
        <UserActions>
          <em>Favorites:</em> {note.favoriteCount}
        </UserActions>)}
		*/
		
		
	/*
	const data = {  isLoggedIn: !!localStorage.getItem('token')};
	*/