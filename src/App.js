import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export class App extends Component {
  render() {
    return (
      <div>
        <Title title={'Hello World'} />
        <Input />
        <Button />
      </div>
    );
  }
}

export const Title = (props) => {
  return(
    <h1>{ props.title }</h1>
  );
}

export const Input = () => {
  const handleChange = (event) => {
    console.log(event.target.value);
  }

  return (
    <input onChange={handleChange} />
  );
}

export const Button = () => {
  return (
    <button>送信</button>
  );
}

