import React, { useEffect } from 'react';
import {useQuery,gql }from '@apollo/client';
import NoteFeed from '../components/NoteFeed';
import {GET_MY_NOTES} from '../gql/query';

import Header from '../components/Header';
import Navigation from '../components/Navigation';
import styled from 'styled-components';

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

const Main = styled.main`
  position: fixed;
  height: calc(100% - 185px);
  width: 100%;
  padding: 1em;
  overflow-y: scroll;
  // Again apply media query styles to screens above 700px 
  @media (min-width: 700px) {
    flex: 1;
    margin-left: 220px;
    height: calc(100% - 64px);
    width: calc(100% - 220px);
  }
`;
const MyNotes = () => {
  useEffect(() => {
    // update the document title
    document.title = 'My Notes — Notedly';
  });

  const { loading, error, data} = useQuery(GET_MY_NOTES);

  // if the data is loading, our app will display a loading message
  if (loading) return 'Loading...';
  // if there is an error fetching the data, display an error message
  // `Error! ${error.message}`;
  if (error) return (
  <div> 
	  <Header/>
       <Wrapper>
	  <Navigation/>
	 <Main>
	<p> Please log in /Sign up first !</p>
	 	</Main>
	</Wrapper>
	</div>
);
  // if the query is successful and there are notes, return the feed of notes
  // else if the query is successful and there aren't notes, display a message
 if (data.me.notes.length !== 0) {
      return (
	<div> 
	  <Header/>
       <Wrapper>
	  <Navigation/>
	 <Main>
	<NoteFeed notes={data.me.notes}/>
	</Main>
	</Wrapper>
	</div>
);
  } else {
   return (
	<div> 
	  <Header/>
       <Wrapper>
	  <Navigation/>
	 <Main>
	<p>No notes yet</p>
	</Main>
	</Wrapper>
	</div>
);
  }
};


export default MyNotes;

