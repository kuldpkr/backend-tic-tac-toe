const express = require('express');
const Model = require('../models/model');
const router = express.Router();

const allowedURL = "https://tic-tac-toe-kuldpkr.netlify.app/";
const isURLAllowed = (req) => {
    const referer = req.get('Referer');
    const origin = req.get('Origin');
    
    if ((referer && referer.startsWith(allowedURL)) || (origin && origin.startsWith(allowedURL))) {
        return true;
    } else {
        return false;
    }
}

//Post Method
router.post('/users', async (req, res) => {
    if(isURLAllowed(req)){
        const data = new Model({
            name: req.body.name,
            email: req.body.email
        })
    
        try {
            const dataToSave = await data.save();
            res.status(200).json(dataToSave)
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
    else {
        res.status(403).json({ message: 'Forbidden: Access is denied' });
    }

})

//Get all Method
router.get('/users', async (req, res) => {
    if(isURLAllowed(req)){
        try {
            const data = await Model.find();
            res.json(data)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    else {
        res.status(403).json({ message: 'Forbidden: Access is denied' });
    }
    
})

module.exports = router;