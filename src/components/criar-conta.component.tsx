import React, {Component} from "react";
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class CriarConta extends React.Component<any, any> {
	
   constructor(props: any) {
    super(props)
	
	this.onChangeCodigo = this.onChangeCodigo.bind(this);
    this.onChangeTipoConta = this.onChangeTipoConta.bind(this);
    this.onChangeNomeResponsavel = this.onChangeNomeResponsavel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
	  codigo: '',
      tipoConta: 'Conta Corrente',
      nomeResponsavel: ''
    }
  }
  
  onChangeCodigo(e: any) {
    this.setState({codigo: e.target.value})
  }

  onChangeTipoConta(e: any) {
    this.setState({tipoConta: e.target.value})
  }

  onChangeNomeResponsavel(e: any) {
    this.setState({nomeResponsavel: e.target.value})
  }
  
  onSubmit(e: any) {
    e.preventDefault()
	
	const contaObject = {
      codigo: this.state.codigo,
      tipo_conta: this.state.tipoConta,
      nome_responsavel: this.state.nomeResponsavel,
	  saldo: 0
    };
    axios.post('http://localhost:4000/contas/criar-conta', contaObject)
      .then(res => {
		this.props.history.push('/lista-contas')
	  })
	  .catch(error => {
		console.log(error)
	});
  }

  render() {
    return (
	<div className="form-wrapper">
      <Form>
		<Form.Group controlId="Codigo">
          <Form.Label>Código Conta</Form.Label>
          <Form.Control type="Number" value={this.state.codigo} onChange={this.onChangeCodigo} />
        </Form.Group>
		
        <Form.Group controlId="TipoConta">
          <Form.Label>Tipo Conta</Form.Label>
          <Form.Control as="select" value={this.state.tipoConta} onChange={this.onChangeTipoConta}>
			  <option>Conta Corrente</option>
			  <option>Conta Poupança</option>
		  </Form.Control>
        </Form.Group>

        <Form.Group controlId="NomeResponsavel">
          <Form.Label>Nome Responsável</Form.Label>
          <Form.Control type="text" value={this.state.nomeResponsavel} onChange={this.onChangeNomeResponsavel} />
        </Form.Group>

        <Button size="sm" variant="primary" onClick={this.onSubmit} >
          Criar Conta
        </Button>
      </Form>
    </div>);
  }
}