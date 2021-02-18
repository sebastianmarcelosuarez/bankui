import React from "react";

export default class App extends React.Component {
  state = {
    loading: true,
    transaction: null,
    myValue: 0
  };

  async componentDidMount() {
    console.log('I was triggered during componentDidMount')
    const url = "http://localhost:8080/api_v1/transactions"
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    this.setState({ transaction: data[0], loading: false });
  }

  handle = ev => {
    console.log(ev.currentTarget.value)
    this.setState({ myValue: ev.currentTarget.value })
  }

  handleClick = (event) => {
    console.log("current value")
    console.log(this.state.myValue)

    const recipeUrl = "http://localhost:8080/api_v1/modify"

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ myValue: this.state.myValue })
};

    fetch(recipeUrl, requestOptions)
  }

  async handleRefreshClick  () {
    console.log('I was triggered during handleRefreshClick')
    const url = "http://localhost:8080/api_v1/transactions"
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    this.setState({ transaction: data[0], loading: false });
  }


  render() {
    if (this.state.loading) {
      return <div>loading......</div>;
    }

    console.log(this.state.transaction)
    return (
      <div>

        <title>Add Transaction</title>
        <input type="text" onChange={this.handle.bind(this)}></input>
        <button onClick={this.handleClick} >commit Transaction</button>

        <button onClick={this.handleRefreshClick} >refresh</button>

        <div>{this.state.transaction.id}</div>
        <div>{this.state.transaction.userName}</div>
        <div>{this.state.transaction.value}</div>
        <div>{this.state.transaction.date}</div>

      </div>
    );
  }
}

