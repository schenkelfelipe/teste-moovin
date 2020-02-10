import React from "react";
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class DepositoConta extends React.Component<any, any> {
	
   constructor(props: any) {
    super(props)
	
    this.onChangeValorDeposito = this.onChangeValorDeposito.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
	  valorDeposito: 0,
	  saldoAtual: 0
    }
  }
  
  componentDidMount() {
    axios.get('http://localhost:4000/contas/editar-conta/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          codigo: res.data.codigo,
          tipoConta: res.data.tipo_conta,
          nomeResponsavel: res.data.nome_responsavel,
		  saldoAtual: res.data.saldo
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeValorDeposito(e: any) {
	if(e.target.value >= 0){
		this.setState({valorDeposito: e.target.value})
	} else {
		this.setState({valorDeposito: 0})
	}
  }
  
  onSubmit(e: any) {
    e.preventDefault()
	
	const saldoTotal = Number(this.state.valorDeposito) + this.state.saldoAtual;
	const saldoRound = Math.round(saldoTotal * 100) / 100;
	
	const contaObject = {
	  saldo: saldoRound
    };
    axios.put('http://localhost:4000/contas/atualizar-conta/' + this.props.match.params.id, contaObject)
      .then((res) => {
        this.props.history.push('/lista-contas')
      }).catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
	<div className="form-wrapper">
      <Form>
		<Form.Group controlId="Codigo">
          <Form.Label>Código Conta</Form.Label>
          <Form.Control type="text" disabled defaultValue={this.state.codigo} />
        </Form.Group>
		
        <Form.Group controlId="TipoConta">
          <Form.Label>Tipo Conta</Form.Label>
          <Form.Control as="select" disabled value={this.state.tipoConta}>
			  <option>Conta Corrente</option>
			  <option>Conta Poupança</option>
		  </Form.Control>
        </Form.Group>

        <Form.Group controlId="NomeResponsavel">
          <Form.Label>Nome Responsável</Form.Label>
          <Form.Control type="text" defaultValue={this.state.nomeResponsavel} disabled />
        </Form.Group>

		<Form.Group controlId="ValorDeposito">
          <Form.Label>Valor Depósito (em Biteris B$)</Form.Label>
          <Form.Control type="Number" value={this.state.valorDeposito} onChange={this.onChangeValorDeposito} />
        </Form.Group>
		
        <Button size="sm" variant="primary" onClick={this.onSubmit} >
          Depositar
        </Button>
      </Form>
    </div>);
  }
}