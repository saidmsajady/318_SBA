const express = require ('express');
const router = express.Router();
const dcs = require('../data/dcs.js');

// The GET route for aquiring all the data for DC
router.get('/', ( req, res ) => {
    const links = [
        {
            href: 'dcs/:id',
            rel: ':id',
            type: 'GET'
        }
    ]
    res.json({ dcs, links});
})

// The GET route for aquiring DC data by ID
router.get('/:id', ( req, res, next ) => {
    const dc = dcs.find((d) => d.id == req.params.id);

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
    if (dc) res.json({ dc, links});
    else next();
})

// The POST method to create a new DC section
router.post('/', ( req, res ) => {
    if (req.body.name && req.body.affiliation && req.body.enemy && req.body.species) {
        const dc = {
            id: dcs.length + 1,
            name: req.body.name,
            affiliation: req.body.affiliation,
            enemy: req.body.enemy,
            species: req.body.species,
        }

        dcs.push(dc);
        res.json(dc);
    } else {
        res.status(400).json({ error: "Invalid DC Data"});
    }
})

// The PATCH method to update a DC section
router.patch('/:id', ( req, res, next ) => {
    const dc = dcs.find((d, i) => {
        if (d.id == req.params.id) {
            for (const key in req.body) {
                dcs[i][key] = req.body[key];
            }
            return true;
        }
    })

    if (dc) {
        res.json(dc)
    } else {
        next();
    }
})

// The DELETE method to remove a DC section
router.delete('/:id', ( req, res ) => {
    const dc = dcs.find((d, i) => {
        if (d.id == req.params.id) {
            dcs.splice(i, 1);
            return true;
        }
    })

    if (dc) res.json(dc);
    else next();
})

module.exports = router;