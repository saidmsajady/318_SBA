const express = require ('express');
const router = express.Router();
const dc = require('../data/dc.js');

// The GET route for aquiring all the data for DC
router.get('/', ( req, res ) => {
    const links = [
        {
            href: 'dc/:id',
            rel: ':id',
            type: 'GET'
        }
    ]
    res.json({ dc, links});
})

// The GET route for aquiring DC data by ID
router.get('/:id', ( req, res, next ) => {
    const dcs = dc.find((d) => d.id == req.params.id);

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
    if (dcs) res.json({ dcs, links});
    else next();
})

// The POST method to create a new DC section
router.post('/', ( req, res ) => {
    if (req.body.name && req.body.affiliation && req.body.enemy && req.body.species) {
        const dcs = {
            id: dc.length + 1,
            name: req.body.name,
            affiliation: req.body.affiliation,
            enemy: req.body.enemy,
            species: req.body.species,
        }

        dc.push(dcs);
        res.json(dcs);
    } else {
        res.status(400).json({ error: "Invalid DC Data"});
    }
})

// The PATCH method to update a DC section
router.patch('/:id', ( req, res, next ) => {
    const dcs = dc.find((d, i) => {
        if (d.id == req.params.id) {
            for (const key in req.body) {
                dc[i][key] = req.body[key];
            }
            return true;
        }
    })
    if (dcs) {
        res.json(dcs)
    } else {
        next();
    }
})

// The DELETE method to remove a DC section
router.delete('/:id', ( req, res ) => {
    const dcs = dc.find((d, i) => {
        if (d.id == req.params.id) {
            dc.splice(i, 1);
            return true;
        }
    })
    if (dcs) res.json(dcs);
    else next();
})

module.exports = router;



