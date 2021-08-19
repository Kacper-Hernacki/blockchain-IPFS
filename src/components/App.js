import React, { Component } from 'react'
import './App.css'

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({
  host: 'ipfs.infura.io',
  port: '5001',
  protocol: 'https',
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buffer: null,
      memeHash: '',
    }
  }

  // example hash 'QmR18y1sQMA86NFjGqDdNqv9Dg7HQVB5vpC8F2nPWagfGq'
  // example url: https://ipfs.infura.io/ipfs/QmR18y1sQMA86NFjGqDdNqv9Dg7HQVB5vpC8F2nPWagfGq

  captureFile = (event) => {
    event.preventDefault()
    console.log('file captured...')
    // Process file for IPFS
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
    }
  }

  onSubmit = (event) => {
    event.preventDefault()
    console.log('submitting...')
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('IPFS result', result)
      if (error) {
        console.error(error)
      }
      // store in blockchain
    })
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="https://www.thedevsuniverse.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TheDev'sUniverse
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <h2 className="app__header">Choose your next meme coin</h2>
            <main role="main" className="col-lg-12 d-flex text-center main">
              <img
                className="app__image"
                src="https://www.fxmag.pl/images/articles/dogecoin-doge-co-musisz-o-nim-wiedziec-opis-kryptowaluty-historia-notowania-opinie.jpg"
                alt=""
              />
              <form onSubmit={this.onSubmit}>
                <input type="file" onChange={this.captureFile} />
                <input type="submit" />
              </form>
            </main>
          </div>
        </div>
      </div>
    )
  }
}

export default App
