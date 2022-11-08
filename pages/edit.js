import React from 'react';
import {useQuery,gql} from '@apollo/client';


import NoteForm from '../components/NoteForm';
import {GET_NOTE,GET_ME} from '../gql/query';
import {EDIT_NOTE} from '../gql/mutation';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditNote (props){
	let { id } = useParams(); 
    let navigate = useNavigate();
	
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
  // fetch the current user's data
  const { data: userdata } = useQuery(GET_ME);
  // define our mutation
  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id
    },
    onCompleted: () => {
      props.history.push(`/note/${id}`);
    }
  });
 if (loading) return 'Loading...';
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;
  // if the current user and the author of the note do not match
  if (userdata.me.id !== data.note.author.id) {
    return <p>You do not have access to edit this note</p>;
  }

  // pass the data and mutation to the form component
  return <NoteForm content={data.note.content} action={editNote} />;
};


export default EditNote;

/*
	if(userdata.me.id !==data.note.author.id){
	return(
	<div> 
	  <Header/>
       <Wrapper>
	  <Navigation/>
	 <Main>
	<p>You do not have access to edit this note</p>
	</Main>
	</Wrapper>
	</div>
); }

*/