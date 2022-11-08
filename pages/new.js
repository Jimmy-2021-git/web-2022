import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import NoteForm from '../components/NoteForm';
//import { NEW_NOTE } from '../gql/mutation';
import { GET_MY_NOTES, GET_NOTES } from '../gql/query';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import styled from 'styled-components';
import { gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";

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

const NEW_NOTE = gql`
  mutation newNote($content: String!) {
    newNote(content: $content) {
      id
      content
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        username
        id
      }
    }
  }
`;
function NewNote (props) {
  	let navigate = useNavigate();
  useEffect(() => {
    // update the document title
    document.title = 'New Note — Notedly';
  });

const [data, { loading, error }] = useMutation(NEW_NOTE, {
 
	// refetch the GET_NOTES and GET_MY_NOTES queries to update the cache
    refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
    onCompleted: data => {
      // when complete, redirect the user to the note page
     // props.history.push(`note/${data.newNote.id}`);
	 
	  navigate(`../note/${data.newNote.id}`);
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
    
      {loading && <p>Loading...</p>}

      {error && <p>Error saving the note</p>}
  
      <NoteForm action={data} />
    </React.Fragment>
	</div>
	</Main>
	</Wrapper>
	</div>
  );
 

 
};
export default NewNote;
