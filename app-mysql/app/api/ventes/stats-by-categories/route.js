import db from "@/lib/db"
import { NextResponse } from "next/server"


 //obternir le total vendue par categories
 export const GET = async(req,res) => {
    const sql = `SELECT nom,categories, 
                     SUM(qty) as total_vendu 
                     FROM vente 
                     GROUP BY nom ,categories
                     ORDER BY total_vendu DESC  `
    try{
      const results = await new Promise((resolve,reject) => {
        db.query(sql,(err,result)=>{
          if(err){
            reject(err)
          }else{
            resolve(result)
          }
        })
      })
      return NextResponse.json(
        {message:'ok',results},
        {status:200}
        );
    }catch(err){
        return NextResponse.json(
            { error: 'Une erreur s\'est produite lors de la récupération des statistiques de vente.',results },
            {status:500});
        }
  }