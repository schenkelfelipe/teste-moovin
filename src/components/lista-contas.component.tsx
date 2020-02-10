import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import ListagemContas from './ListagemContas';


export default class ListaContas extends React.Component<any, any> {

  constructor(props: any) {
    super(props)
    this.state = {
      contas: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/contas/')
      .then(res => {
        this.setState({
          contas: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    return this.state.contas.map((res: any, i: any) => {
      return <ListagemContas obj={res} key={i} />;
    });
  }


  render() {
    return (<div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Tipo Conta</th>
            <th>Nome Responsável</th>
			<th>Saldo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}