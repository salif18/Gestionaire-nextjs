const { default: db } = require("@/lib/db");
const { NextResponse } = require("next/server");

export const DELETE = async(req,res)=> {
    const id = req.url.split('depenses/')[1];
    try{
      const results = await new Promise((resolve,reject)=>{
        db.query('DELETE FROM depenses WHERE id = ?',[id],(err,results)=>{
            if(err){
                reject(err)
            }else{
                resolve(results)
            }
        })
      });
      return NextResponse.json(
        {message:'Dépense supprimée avec succès !!',results},
        {status:200})
    }catch(err){
        return NextResponse.json(
            {message:'err',error:err},
            {status:500})
    }
}