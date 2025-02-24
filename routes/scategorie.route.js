const express = require('express');
const router = express.Router();
const SCategorie=require("../models/scategorie") ;

//afficher la iste scategorie
router.get('/', async(req,res)=>{
    try {
        const scat = await SCategorie.find({} ,null, {sort :{'_id' : -1}}).populate("categorieID")
        res.status(200).json(scat);
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
});

// créer une nouvelle scategorie
router.post('/', async(req,res)=>{
    const {nomscategorie,imagescat,categorieID} = req.body ;
    const newSCategorie = new SCategorie({nomscategorie:nomscategorie,imagescat:imagescat,categorieID:categorieID })
    // const newSCategorie = new SCategorie (req.body)
    try {
        await newSCategorie.save();
        res.status(200).json(newSCategorie);
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
})

// chercher une sous categrie
router.get('/:scategorieID', async(req,res)=>{
    try {
        const scat = await SCategorie.findById(req.params.scategorieID);
        res.status(200).json(scat);
    } catch {
        res.status(404).json({message: error.message})
    }
})

// modifier une scategorie
router.put('/:scategorieID', async(req,res)=>{
    try{
    const scat1 = await SCategorie.findByIdAndUpdate(
        req.params.scategorieID ,
        {$set: req.body},
        {new : true }
    );
    res.status(200).json(scat1);
    }catch (error) {
        res.status(404).json({ message: error.message });
    }
})

// Supprimer une scategorie
router.delete('/:scategorieID',async(req,res)=>{
    const id = req.params.scategorieID;
    await SCategorie.findByIdAndDelete(id)
    res.json({ message: "sous categorie deleted successfully." });
})

// chercher scategorie par cat
router.get('/cat/:categorieID',async(req, res)=>{
    try {
        []
    res.status(200).json(scat);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
});
module.exports = router ;