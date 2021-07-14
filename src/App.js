import React, { Component } from "react";
import MyDocument from "./Doc";
import axios from 'axios';
import './App.css'

class App extends Component {
  state = {
    file: null,
    loading: true
  };

  componentDidMount(){
    axios.get('http://tot.cloud.c3.furg.br/api/files/v1/searchable/7b947862-e3c1-40b3-a3c0-648cbc7a6210', {
      headers: {'X-ToT-Auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjYzMTY5OTIsInVzZXJuYW1lIjoidG90YWRtaW4ifQ.0RF64fw842bRhUZtoq1OdZfKQT3wVaS1UEnSr2ERi0w'},
      responseType: 'blob'
    })
    .then(resp => {
      this.setState({
        file: resp.data, 
        loading: false,
        fileURL: window.URL.createObjectURL(new Blob([resp.data], {type: 'application/pdf'}))
      })
    })
    .catch(err => console.log(err))
  }

  render(){
    return(
      //<PDFViewer width="100%" height="800px">
        <MyDocument doc={this.state.fileURL} loading={this.state.loading}/>
      
      //</PDFViewer>
    );
  }
}

export default App;