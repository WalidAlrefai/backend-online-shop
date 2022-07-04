'use strict';
const router = require('express').Router();
const bearerAuth = require('../middlewares/bearer');
const {itemModel, userModel} = require('../models/index')

router.post('/createItem',bearerAuth,async(req,res)=>{
    let{itemName,itemImage,itemDescription,itemPrice,userId}=req.body
    // let id = req.params.id
    let createItem = await itemModel.create({
        itemName :itemName,
        itemImage:itemImage,
        itemDescription:itemDescription,
        itemPrice:itemPrice,
        userId:userId
    })
    res.status(201).json({
        'items':createItem
    })
})
router.get('/items',bearerAuth,async(req,res)=>{

    let items = await itemModel.findAll()
    res.status(200).json({
        'items':items
    })
})
router.get('/item/:id',bearerAuth,async(req,res)=>{

    let id = req.params.id
    let item = await itemModel.findOne({where:{id:id}})
    res.status(200).json({
        'item':item
    })
})
router.put('/updateItem/:id',bearerAuth,async(req,res)=>{
    let id=req.params.id
    let {itemName,itemImage,itemDescription,itemPrice}=req.body
    let chosenItem = await itemModel.findOne({where:{id:id}})
    chosenItem.update({
        itemName:itemName,
        itemImage:itemImage,
        itemDescription:itemDescription,
        itemPrice:itemPrice
    })
    res.status(201).json({
        'updatedItem':chosenItem
    })

})
router.delete('/deleteItem/:id',bearerAuth,async(req,res)=>{
    let id = req.params.id
    await itemModel.destroy({where:{id:id}})
    res.status(200).send(`deleted sucsessfully`)
})
module.exports=router;