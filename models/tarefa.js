const mongoose = require('mongoose');

const schemaTarefa = new mongoose.Schema({
  descricao: {
    required: true,
    type: String
  },
  statusRealizada: {
    required: true,
    type: Boolean
  },
  // Novo campo para vincular ao usuário
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('Tarefa', schemaTarefa);