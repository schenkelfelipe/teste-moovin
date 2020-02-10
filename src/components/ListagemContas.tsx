import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class ListagemContas extends React.Component<any, any> {
	
	constructor(props: any) {
        super(props);
        this.deletarConta = this.deletarConta.bind(this);
    }
	
	deletarConta() {
		if(window.confirm('Tem certeza que deseja apagar a conta?')){
			axios.delete('http://localhost:4000/contas/deletar-conta/' + this.props.obj._id)
				.then((res) => {
					window.location.reload();
				}).catch((error) => {
					console.log(error)
				})
		}
    }
	
    render() {
        return (
            <tr>
                <td>{this.props.obj.codigo}</td>
                <td>{this.props.obj.tipo_conta}</td>
                <td>{this.props.obj.nome_responsavel}</td>
				<td>B$ {this.props.obj.saldo}</td>
                <td>
                    <Link className="edit-link" to={"/deposito-conta/" + this.props.obj._id} style={{ textDecoration: 'none' }}>
                        Depósito
                    </Link>
					<Link className="edit-link" to={"/saque-conta/" + this.props.obj._id} style={{ marginLeft: '10px', textDecoration: 'none' }}>
                        Saque
                    </Link>
					<Link className="edit-link" to={"/editar-conta/" + this.props.obj._id} style={{ marginLeft: '10px', textDecoration: 'none' }}>
                        Editar
                    </Link>
                    <Button size="sm" variant="danger" onClick={this.deletarConta} style={{ marginLeft: '10px' }}>Apagar Conta</Button>
                </td>
            </tr>
        );
    }
}