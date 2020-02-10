import React from "react";
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class EditarConta extends React.Component<any, any> {
	
   constructor(props: any) {
    super(props)
	
    this.onChangeTipoConta = this.onChangeTipoConta.bind(this);
    this.onChangeNomeResponsavel = this.onChangeNomeResponsavel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
	  codigo: '',
      tipoConta: 'Conta Corrente',
      nomeResponsavel: ''
    }
  }
  
  componentDidMount() {
    axios.get('http://localhost:4000/contas/editar-conta/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          codigo: res.data.codigo,
          tipoConta: res.data.tipo_conta,
          nomeResponsavel: res.data.nome_responsavel
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeTipoConta(e: any) {
    this.setState({tipoConta: e.target.value})
  }

  onChangeNomeResponsavel(e: any) {
    this.setState({nomeResponsavel: e.target.value})
  }
  
  onSubmit(e: any) {
    e.preventDefault()
	
	if(this.state.nomeResponsavel.trim() === ''){
		window.alert('Preencha o nome do responsável pela conta');
	} else {
		const contaObject = {
		  tipo_conta: this.state.tipoConta,
		  nome_responsavel: this.state.nomeResponsavel
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
      <Form onSubmit={this.onSubmit}>
		<Form.Group controlId="Codigo">
          <Form.Label>Código Conta</Form.Label>
          <Form.Control type="Number" disabled value={this.state.codigo} />
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
          Atualizar
        </Button>
      </Form>
    </div>);
  }
}