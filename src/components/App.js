import '../css/App.css';
import '../css/style.scss'
import React from 'react';
import Pulpit from './Pulpit';
import Searching from './Searching';
import Results from './Results';

const API = 'https://www.omdbapi.com/?t=the+hunger+games&plot=full?i=tt3896198&apikey=b6fe8a66'
const API2 = [{api:'https://www.omdbapi.com/?t=orange+is+the+new+black&plot=full?i=tt3896198&apikey=b6fe8a66', id: 1,}, {api:'https://www.omdbapi.com/?t=vikings&plot=full?i=tt3896198&apikey=b6fe8a66', id: 2,},
{api:'https://www.omdbapi.com/?t=how+i+met+your+mother&plot=full?i=tt3896198&apikey=b6fe8a66', id: 3,}, {api:'https://www.omdbapi.com/?t=american+pie&plot=full?i=tt3896198&apikey=b6fe8a66', id:4,},
 {api:'https://www.omdbapi.com/?t=lucifer&plot=full?i=tt3896198&apikey=b6fe8a66', id:5,}, {api:'https://www.omdbapi.com/?t=peaky+blinders&plot=full?i=tt3896198&apikey=b6fe8a66', id:6,}
]

class App extends React.Component {
  state = {
    title: "",
    searchTitle: "",
    pulpitTitle: [],
  }

  handleInput = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  handleClick= () => {
    const replace= () => this.state.title.replace(" ","+")
    const api = API.replace( "the+hunger+games", replace)
    return (
    this.handleFetch(api)
    )
  }

  handleFetch = (url) => {
  fetch(url)
  .then(response => {
    if(response.ok) {return response}
  })
  .then(response => response.json())
  .then(title => {
    console.log(title)
      this.setState({
      searchTitle: title,
      })
    })}

  componentDidMount() {
    API2.map(movie => (
      fetch(movie.api)
        .then(response => response.json())
        .then(title => {
          if (title.Response === 'False') {
            return null
          } else {
            const pulpitTitle = [...this.state.pulpitTitle]
            pulpitTitle.push(title)
            this.setState({
              pulpitTitle
            })
          }
          }
        )) )
  }

  render() {
  return (
    <div className="wrapper">
      <Searching title={this.state.title} handleClick={this.handleClick} handleInput={this.handleInput}/>
      <Results searchTitle={this.state.searchTitle}/>
      <Pulpit pulpitTitle={this.state.pulpitTitle} searchTitle={this.state.searchTitle}/>
    </div>
  );
  }
}

export default App;
