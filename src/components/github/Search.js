import React, { Component } from 'react';
import $ from 'jquery';
import Autosuggest from 'react-autosuggest';

const fruits = [
  {
    text: 'Apple'
  },
  {
    text: 'Banana'
  },
  {
    text: 'Cherry'
  },
  {
    text: 'Grapefruit'
  },
  {
    text: 'Lemon'
  }
]

let getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  console.log(inputValue.length);

  // $.ajax({
  //   url: 'https://api.github.com/search/users?q=' + inputValue + 
  //         '&client_id=' + this.props.clientId + '&client_secret=' + 
  //         this.props.clientSecret,
  //   dataType: 'jsonp',
  //   crossDomain: true,
  //   cache: false,
  //   success: function(data) {
  //     console.log(data.data);
  //     onSuggestionsFetchRequested(data.items);
  //   },
  //   error: function(xhr, status, err) {
  //     console.log(err);
  //   }
  // });

  return inputLength === 0 ? [] : fruits.filter(fruit =>
    fruit.text.toLowerCase().slice(0, inputLength) === inputValue
  );
}

const getSuggestionValue = suggestion => suggestion.text;

const renderSuggestion = suggestion => (
  <div>{suggestion.text}</div>
);

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: []
    }
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }
  
  onSubmit(e) {
    e.preventDefault();
    let username = this.refs.username.value.trim();
    if(!username) {
      alert('Please enter a username');
      return;
    }
    this.props.onFormSubmit(username);
    this.refs.username.value = '';
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    })
  }

  onSuggestionsFetchRequested({ value }) {
    console.log(value);
    this.setState({
      suggestions: getSuggestions(value)
    })
    // this.state
  }

  onSuggestionsClearRequested () {
    this.setState({
      suggestions: []
    })
  }

  // getSuggestions(value) {
  //   const inputValue = value.trim().toLowerCase();
  //   const inputLength = inputValue.length;
  
  //   // console.log(this.props);
  
  //   $.ajax({
  //     url: 'https://api.github.com/search/users?q=' + inputValue + 
  //           '&client_id=' + this.props.clientId + '&client_secret=' + 
  //           this.props.clientSecret,
  //     dataType: 'jsonp',
  //     crossDomain: true,
  //     cache: false,
  //     success: function(data) {
  //       console.log(data.data);
  //       onSuggestionsFetchRequested(data.items);
  //     },
  //     error: function(xhr, status, err) {
  //       console.log(err);
  //     }
  //   });
  // }
  
  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Type a username',
      value,
      onChange: this.onChange.bind(this),
      className: "form-control"
    }
    
    return(
      <div>
        {/* <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" ref="username" className="form-control"
                  placeholder="Search Github users" />
        </form> */}
        <br />
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
         />
        <br />
      </div>
    )
  }
}

export default Search;