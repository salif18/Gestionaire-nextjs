const { default: db } = require("@/lib/db")
const { NextResponse } = require("next/server")


export const DELETE = async(req,res) => {
    const id = req.url.split('ventes/')[1]
    const sql =`DELETE FROM vente WHERE id = ?`
    try{
        const results = await new Promise((reject,resolve)=>{
    db.query(sql,[id] ,(err,result)=>{
       if(err){
        reject(err)
       }else{
        resolve(result)
       }
    })  
})
return NextResponse.json(
    {message:'La vente a été annulée avec succès !!',results},
    {status:200}
    )
  }catch(err){
    return NextResponse.json(
        {message:'err',error:err},
        {status:500}
    )
  }
  }
  
  