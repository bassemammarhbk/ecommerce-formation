var express = require('express');
var router = express.Router();

// créer une instance de categorie
const categorie = require('../models/categorie');

// afficher la liste des categories
router.get('/',async(req,res )=>{
    try {
        const cat = await categorie.find({},null, {sort:{'_id' : -1}})
        res.status(200).json(cat)
    } catch(error) {
        res.status(404).json({message:error.message})

    }

});

//créer une nouvelle ctegorie
router.post('/',async (req,res)=>{
    const { nomcategorie , imagecategorie }= req.body ;
    const newCategorie = new categorie({nomcategorie:nomcategorie,imagecategorie:imagecategorie})
    try {
        await newCategorie.save();
        res.status(200).json(newCategorie);
    } catch(error) {
        res.status(404).json({message:error.message});
    }
});


//chercher une categorie
router.get('/:categorieID', async(req,res)=>{
    try {
        const cat = await categorie.findById(req.params.categorieID);
        res.status(200).json(cat);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }

});
/*router.get('/:categorieID', async(req,res)=>{
    try {
        const cat = await categorie.findById(req.params.categorieID);
        res.status(200).json(cat);
    } catch(error){
        res.status(404).json({message:error.message})
    }
}
)*/

//modifier une categorie
router.put('/:categorieID', async(req,res)=>{
    try {
        const cat1 = await categorie.findByIdAndUpdate(
        req.params.categorieID,
        { $set: req.body },
        { new: true }
        );
        res.status(200).json(cat1);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }

});

// supprimer une categorie
router.delete('/:categorieID',async (req, res)=> {
    try {
    const id = req.params.categorieID ;
    await categorie.findByIdAndDelete(id);
    res.json({ message: "categorie deleted successfully." });
    }catch (error) {
        res.status(404).json({ message: error.message });
    }
});
module.exports = router;
