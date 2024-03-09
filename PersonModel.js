const mongoose = require('mongoose');

//  Création du schéma de personne
const personSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

//  Création du modèle de personne
const PersonModel = mongoose.model('Person', personSchema);

  module.exports = PersonModel