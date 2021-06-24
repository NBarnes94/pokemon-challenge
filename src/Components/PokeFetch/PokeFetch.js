import React, { Component } from 'react'
import './PokeFetch.css';


export default class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      count: 15,
    }
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))
  }

//   componentDidMount() {
//       this.myInterval = setInterval(() =>
//           this.setState({
//             count: this.state.count -1
//           }), 1000)
// }

  componentDidUpdate(preProps, prevState){
    if (prevState.count == 1){
      clearInterval(this.myInterval)
    }
  }

  // componentWillUnmount(){
  //   clearInterval(this.interval)
  // }

  resetCount = () =>{
    this.setState({count: 15})
    this.myInterval = setInterval(() =>
          this.setState({
            count: this.state.count -1
          }), 1000)
  }

  handleSubmit(){
    this.fetchPokemon();
    this.resetCount();
  }
  render() {
    console.log(this.state);

    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.handleSubmit() }>Start!</button>
        <h1 className={'timer'} >{this.state.count > 0? 
        <>
        <div>
        <h1>Time left!: {this.state.count}</h1>
        <img className={'pokeImgDark'} src={this.state.pokeSprite} />
        </div>
        </>
        :
        <>
        <h1> {this.state.pokeName} </h1>
        <img className={'pokeImg'} src={this.state.pokeSprite} />
        </>} </h1>
        <div className={'pokeWrap'}>
          {/* <img className={'pokeImg'} src={this.state.pokeSprite} /> */}
          {/* <h1 className={'pokeName'}>{this.state.pokeName}</h1> */}
        </div>
      </div>
    )
  }
}