import db from "@/lib/db";
import { NextResponse } from "next/server";


  //obtenir total vendues par mois et annee
  export const GET = async (req, res) => {
    try {
      const sql =`
        SELECT
          YEAR(timestamps) AS annee,
          MONTH(timestamps) AS mois,
          COUNT(*) AS nombre_ventes,
          SUM(prixVente * qty) AS total_ventes
          FROM vente
          GROUP BY annee, mois
          ORDER BY annee, mois;
      `;
      
      const results = await new Promise((resolve,reject)=>{
          db.query(sql,(err,results)=>{
            if(err){
              reject(err)
            }else{
              resolve(results)
            }
          })
      })
      return NextResponse.json(
        {message:'ok',results},
        {status:200}
        );
    } catch (err) {
      return NextResponse.json(
        { error: 'Une erreur s\'est produite lors de la récupération des statistiques de vente.',results },
        {status:500});
    }
  }