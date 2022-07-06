'use strict';
const router = require('express').Router();
const bearerAuth = require('../middlewares/bearer');
const {favoriteModel} = require('../models/index')

router.post('/addFavorite',bearerAuth,async(req,res)=>{
    let{itemName,itemImage,itemDescription,itemPrice,userId}=req.body
    let addFavorite = await favoriteModel.create({
        itemName :itemName,
        itemImage:itemImage,
        itemDescription:itemDescription,
        itemPrice:itemPrice,
        userId:userId
    })
    res.status(201).json({
        'favorites':addFavorite
    })
})

router.get('/favorites',bearerAuth,async(req,res)=>{
    let favorites = await favoriteModel.findAll()
    res.status(200).json({
        'favorites':favorites
    })
})
router.get('/allfavoritesForUser/:id',async(req,res)=>{
    let id = req.params.id
    let ItemsForUser= await favoriteModel.findAll({where:{userId:id}})
    res.status(200).json({'allItemsForUser':ItemsForUser})

})

router.delete('/removeFavorite/:id',bearerAuth,async(req,res)=>{
    let id = req.params.id
    await favoriteModel.destroy({where:{id:id}})
    res.status(200).send(`deleted sucsessfully`)
})
module.exports=router;
