const express = require ('express');
const router = express.Router();
const marvels = require('../data/marvels.js');

// The GET route for aquiring all the data for Marvel
router.get('/', ( req, res ) => {
    const links = [
        {
            href: 'marvels/:id',
            rel: ':id',
            type: 'GET'
        }
    ]
    res.json({ marvels, links});
})

// The GET route for aquiring Marvel data by ID
router.get('/:id', ( req, res, next ) => {
    const marvel = marvels.find((m) => m.id == req.params.id);

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
    if (marvel) res.json({ marvel, links});
    else next();
})

// The POST method to create a new Marvel section
router.post('/', ( req, res ) => {
    if (req.body.name && req.body.affiliation && req.body.enemy && req.body.species) {
        const marvel = {
            id: marvels.length + 1,
            name: req.body.name,
            affiliation: req.body.affiliation,
            enemy: req.body.enemy,
            species: req.body.species,
        }

        marvels.push(marvel);
        res.json(marvel);
    } else {
        res.status(400).json({ error: "Invalid Marvel Data"});
    }
})

// The PATCH method to update a Marvel section
router.patch('/:id', ( req, res, next ) => {
    const marvel = marvels.find((m, i) => {
        if (m.id == req.params.id) {
            for (const key in req.body) {
                marvels[i][key] = req.body[key];
            }
            return true;
        }
    })

    if (marvel) {
        res.json(marvel)
    } else {
        next();
    }
})

// The DELETE method to remove a Marvel section
router.delete('/:id', ( req, res ) => {
    const marvel = marvels.find((m, i) => {
        if (m.id == req.params.id) {
            marvels.splice(i, 1);
            return true;
        }
    })

    if (marvel) res.json(marvel);
    else next();
})

module.exports = router;