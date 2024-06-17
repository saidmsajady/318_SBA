const express = require ('express');
const router = express.Router();
const pokemons = require('../data/pokemons.js');

// The GET route for aquiring all the data for Pokemon
router.get('/', ( req, res ) => {
    const links = [
        {
            href: 'pokemons/:id',
            rel: ':id',
            type: 'GET'
        }
    ]
    res.json({ pokemons, links});
})

// The GET route for aquiring Pokemon data by ID
router.get('/:id', ( req, res, next ) => {
    const pokemon = pokemons.find((p) => p.id == req.params.id);

    const links = [{
        href: `/${req.params.id}`,
        rel: '',
        type: 'PATCH',
      },
      {
        href: `/${req.params.id}`,
        rel: '',
        type: 'DELETE',
    }]
    if (pokemon) res.json({ pokemon, links});
    else next();
})

// The POST method to create a new Pokemon section
router.post('/', ( req, res ) => {
    if (req.body.name && req.body.type && req.body.pokedex && req.body.gen) {
        const pokemon = {
            id: pokemons.length + 1,
            name: req.body.name,
            type: req.body.type,
            pokedex: req.body.pokedex,
            gen: req.body.gen,
        }

        pokemons.push(pokemon);
        res.json(pokemon);
    } else {
        res.status(400).json({ error: "Invalid Pokemon Data"});
    }
})

// The PATCH method to update a Pokemon section
router.patch('/:id', ( req, res, next ) => {
    const pokedex = pokemons.find((p, i) => {
        if (p.id == req.params.id) {
            for (const key in req.body) {
                pokemons[i][key] = req.body[key];
            }
            return true;
        }
    })

    if (pokemon) {
        res.json(pokemon)
    } else {
        next();
    }
})

// The DELETE method to remove a Pokemon section
router.delete('/:id', ( req, res ) => {
    const pokemon = pokemons.find((p, i) => {
        if (p.id == req.params.id) {
            pokemons.splice(i, 1);
            return true;
        }
    })

    if (pokemon) res.json(pokemon);
    else next();
})

module.exports = router;