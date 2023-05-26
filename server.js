const express=require('express')
const app=express()
require('dotenv').config()

import('node-fetch').then((module) => {
    const fetch = module.default;
  
  }).catch((error) => {
    // Handle any errors that occur during the dynamic import
    console.error('Failed to import node-fetch:', error);
  });
app.use(express.urlencoded({extended:false}))
const router=require('./routers/mainrouter')




app.use(router)
app.use(express.static('public'))
app.set('view engine','ejs')
app.listen(5000)