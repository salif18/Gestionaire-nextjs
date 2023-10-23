const { default: db } = require("@/lib/db");
const { NextResponse } = require("next/server");

export const POST = async(req,res)=> {
    const {montants, motifs} = await req.json();
    const depenses = {
        montants:montants, 
        motifs:motifs
    }
    try{
      const results = await new Promise((resolve,reject)=>{
        db.query(`INSERT INTO depenses set ?`,depenses,(err,results)=>{
            if(err){
                reject(err)
            }else{ 
                resolve(results)
            }
        })
      });
      
      return NextResponse.json(
        {message:'Dépense enregistrée avec succès !!',results},
        {status:201})
    }catch(err){
      return NextResponse.json(
            {message:err.message},
            {status:500}
            )
    }
}

export const GET = async(req,res)=> {
    try{
      const results = await new Promise((resolve,reject)=>{
        db.query('SELECT*FROM depenses ORDER BY timestamps DESC',(err,results)=>{
            if(err){
                reject(err)
            }else{
                resolve(results)
            }
        })
      });
      return NextResponse.json(
        {message:'ok',results},{status:200})
    }catch(err){
        return NextResponse.json(
            {message:'error',error:err},{status:500})
    }
}

