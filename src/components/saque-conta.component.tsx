import React from "react";
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class SaqueConta extends React.Component<any, any> {
	
   constructor(props: any) {
    super(props)
	
    this.onChangeValorSaque = this.onChangeValorSaque.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
	  valorSaque: 0,
	  saldoConta: 0
    }
  }
  
  componentDidMount() {
    axios.get('http://localhost:4000/contas/editar-conta/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          codigo: res.data.codigo,
          tipoConta: res.data.tipo_conta,
          nomeResponsavel: res.data.nome_responsavel,
		  saldoConta: res.data.saldo
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeValorSaque(e: any) {
	if(e.target.value >= 0){
		this.setState({valorSaque: e.target.value})
	} else {
		this.setState({valorSaque: 0})
	}
  }
  
  onSubmit(e: any) {
    e.preventDefault()
	
	const saldoTotal = this.state.saldoConta - Number(this.state.valorSaque) - 0.3;
	
	if(Number(this.state.valorSaque) > 600){
		window.alert("Valor do saque não pode ser superior a 600 Biteris");
	} else if(saldoTotal < 0) {
		window.alert("Saldo Insuficiente");
	} else {
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
		
		<Form.Group controlId="ValorSaque">
          <Form.Label>Valor Saque (em Biteris B$) <span className="saldo-atual">Saldo Atual: B$ {this.state.saldoConta}</span></Form.Label>
          <Form.Control type="Number" value={this.state.valorSaque} onChange={this.onChangeValorSaque} />
        </Form.Group>
		
        <Button size="sm" variant="primary" onClick={this.onSubmit} >
          Sacar
        </Button>
		
		<div className="rodape-explicativo">
			* O saque deve considerar a taxa de 0,30 B$, caso o valor de saque exceda o valor do saldo + a taxa, o saque não ocorrerá.
		</div>
      </Form>
    </div>);
  }
}