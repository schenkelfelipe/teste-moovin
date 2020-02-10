import React from 'react';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CriarConta from "./components/criar-conta.component";
import EditarConta from "./components/editar-conta.component";
import SaqueConta from "./components/saque-conta.component";
import DepositoConta from "./components/deposito-conta.component";
import ListaContas from "./components/lista-contas.component";
import Home from "./components/Home";
import MoovinLogo from "./moovin-logo.png";


const App = () => {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>

            <Navbar.Brand>
				<Link to={"/"} className="nav-link">
					Home
				</Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <Nav>
                <Link to={"/criar-conta"} className="nav-link">
                  Criar Conta
                </Link>
              </Nav>
              <Nav>
                <Link to={"/lista-contas"} className="nav-link">
                  Lista Contas
                </Link>
              </Nav>
            </Nav>

          </Container>
        </Navbar>
      </header>

      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path="/criar-conta" component={CriarConta} />
                <Route exact path="/editar-conta/:id" component={EditarConta} />
                <Route exact path="/lista-contas" component={ListaContas} />
				<Route exact path="/saque-conta/:id" component={SaqueConta} />
				<Route exact path="/deposito-conta/:id" component={DepositoConta} />
              </Switch>
			  <img src={MoovinLogo} className="image-moovin" alt="logo moovin"/>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Router>
  );
}

export default App;
