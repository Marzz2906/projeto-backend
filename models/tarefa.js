const mongoose = require('mongoose');

const subTarefaSchema = new mongoose.Schema({
  descricao: { type: String, required: true },
  statusRealizada: { type: Boolean, default: false }
});

const schemaTarefa = new mongoose.Schema({
  descricao: {
    required: true,
    type: String
  },
  statusRealizada: {
    required: true,
    type: Boolean
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  prioridade: {
    type: String,
    enum: ['Alta', 'Média', 'Baixa'],
    default: 'Baixa'
  },
  subTarefas: [subTarefaSchema]
}, {
  versionKey: false
});

module.exports = mongoose.model('Tarefa', schemaTarefa);