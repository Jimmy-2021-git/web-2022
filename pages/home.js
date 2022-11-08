import React from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Button from '../components/Button';
import styled from 'styled-components';
import {useQuery,gql} from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import NoteFeed from'../components/NoteFeed';

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

const GET_NOTES=gql`
query NoteFeed($cursor:String){
	noteFeed(cursor:$cursor){
		cursor
		hasNextPage
		notes{
			id
			createdAt
			content
			favoriteCount
			author{
				username
				id
				avatar
			}
		}
	}
}
`;




const Home = () => {
	const{data,loading,error,fetchMore}=useQuery(GET_NOTES);
	if(loading)return<p>Loading...</p>
	if(error)return<p>error!</p>
  return (

 <div>
	  <Header/>
       <Wrapper>
	  <Navigation/>
	 <Main>
	 <div>
	 {console.log(data)}
	<React.Fragment>
	<NoteFeed notes={data.noteFeed.notes}/>;
		{data.noteFeed.hasNextPage &&(
		<Button 
		onClick={()=>
		fetchMore({
			variables:{
			cursor:data.noteFeed.cursor},
			updateQuery:(previousResult,{fetchMoreResult})=>{
				return{
					noteFeed:{
						cursor:fetchMoreResult.noteFeed.cursor,
						hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
						notes:[
						...previousResult.noteFeed.notes,
						...fetchMoreResult.noteFeed.notes],
						__typename:'noteFeed'
		}};
		}})}>>Load more</Button>
		)}
		</React.Fragment>
	
	

</div>
</Main>
	</Wrapper>
	</div>
	

  );
};

export default Home;

/*
	{data.noteFeed.notes.map(note=>(
	<div key={note.id}>
	
	<article key={note.id}>
	<img 
	src={note.author.avatar}
	alt={`${note.author.username}avator`}
	height="50pc"/>
	{''}
	{note.author.username}
	{note.createdAt}
	{note.favoriteCount}
	{''}
	<ReactMarkdown source={note.content}/>
	</article>
	</div>)};
	*/