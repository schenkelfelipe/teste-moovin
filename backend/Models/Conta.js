const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let contaSchema = new Schema({
  codigo: { type: Number, unique: true },
  tipo_conta: { type: String },
  nome_responsavel: { type: String },
  saldo: { type: Number, required: false }
})

module.exports = mongoose.model('Conta', contaSchema)