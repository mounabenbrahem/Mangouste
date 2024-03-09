const express =require ("express")
require('dotenv').config();
const mongoose = require('mongoose');
const Person = require ("./PersonModel")

//createandsaveperson()

const app = express()

const PORT = process.env.MONGO_URI



//connection to database
const connectDB = async () => {
    try {
        mongoose.connect("mongodb+srv://mounabenbrahem:mounamouna@cluster0.jnxpjay.mongodb.net/")
        console.log("database connected");
    } catch (error) {
    console.log (error);
}
}
connectDB ()

//  Création et enregistrement d'un enregistrement d'un modèle
const newPerson = new Person({
    nom: 'John',
    age: 30,
    favoriteFoods: ['Pizza', 'Burger']
  });


// Utilisation de model.find()
const findPerson = async () => {
  try {
    const person = await Person.find({ nom: 'John' })
    console.log(person);
  } catch (error) {
    console.log(error);
  }
}

// Utilisation de model.findOne()
const findPersonByFavoriteFood = async () => {
  try {
      const person = await Person.findOne({ favoriteFoods: 'Pizza' });
      console.log(person);
  } catch (error) {
      console.log(error);
  }
}

//  Utilisation de model.findById()
const findPersonById = async (personId) => {
  try {
      const person = await Person.findById(personId);
      console.log(person);
  } catch (error) {
      console.log(error);
  }
}

// Mises à jour classiques avec recherche, modification, puis enregistrement
const updatePersonFavoriteFood = async (personId) => {
  try {
      // Recherche de la personne par son _id
      const person = await Person.findById(personId)

      // Ajoute "hamburger" à la liste des aliments préférés
      person.favoriteFoods.push('hamburger');

      // Enregistre la personne mise à jour
      await person.save();

      console.log('Personne mise à jour :', person);
  } catch (error) {
      console.log(error);
  }
}

// Utilisation de la fonction pour mettre à jour une personne par son _id
const personIdToUpdate = 'votre_id';
updatePersonFavoriteFood(personIdToUpdate);

//  Mise à jour avec model.findOneAndUpdate()
const updatePersonAgeByName = async (personName) => {
  try {
      // Recherche de la personne par nom et mise à jour de son âge
      const updatedPerson = await Person.findOneAndUpdate(
          { nom: 'Alice' }, // Critère de recherche
          { age: 20 }, // Nouvelles valeurs à mettre à jour
          { new: true } // Pour retourner le document mis à jour
      );

      // Vérifie si la personne a été trouvée et mise à jour
      if (!updatedPerson) {
          console.log('Personne non trouvée ou non mise à jour.');
          return;
      }

      console.log('Personne mise à jour:', updatedPerson);
  } catch (error) {
      console.log(error);
  }
}

// Utilisation de la fonction pour mettre à jour l'âge d'une personne par son nom
const personNameToUpdate = 'John';
updatePersonAgeByName(personNameToUpdate);


const removePersonById = async (personId) => {
  try {
      // Recherche de la personne par son _id et suppression
      const removedPerson = await Person.findByIdAndRemove(personId);

      // Vérifie si la personne a été trouvée et supprimée
      if (!removedPerson) {
          console.log('Personne non trouvée ou non supprimée.');
          return;
      }

      console.log('Personne supprimée:', removedPerson);
  } catch (error) {
      console.log(error);
  }
};

// Utilisation de la fonction pour supprimer une personne par son _id
const personIdToRemove = 'id';
removePersonById(personIdToRemove)

//utilisation de la fonction remove 
const removePeopleByName = async () => {
  try {
      // Suppression de toutes les personnes ayant le nom "Mary"
      const result = await Person.remove({ nom: 'Mary' });

      // Vérification du résultat de l'opération
      console.log('Résultat de la suppression :', result);
      console.log('Nombre de documents supprimés :', result.deletedCount);
  } catch (error) {
      console.log(error);
  }
};

// Utilisation de la fonction pour supprimer les personnes par leur nom
removePeopleByName();

//  Aides aux requêtes de recherche en chaîne
const findBurritoLovers = async () => {
  try {
      const burritoLovers = await Person.find({ favoriteFoods: 'burritos' }) // Recherche les personnes qui aiment les burritos
                                          .sort({ nom: 1 }) // Trie par nom
                                          .limit(2) // Limite les résultats à deux documents
                                          .select('-age') // Masque l'âge
                                          .exec(); // Exécute la requête

      console.log('Gens qui aiment les burritos:', burritoLovers);
  } catch (error) {
      console.log(error);
  }
};

// Utilisation de la fonction pour trouver des gens qui aiment les burritos
findBurritoLovers();