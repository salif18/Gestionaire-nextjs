import db from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async(req)=>{
    const { id, nom, categories, prixAchat, prixVente, stocks, qty, timestamps} = await req.json();
    const sql = 'INSERT INTO vente set ?';
    const ventes= {
        id:id,
        nom:nom,
        categories:categories,
        prixAchat:prixAchat,
        prixVente:prixVente,
        stocks:stocks,
        qty:qty,
        timestamps:timestamps
    }
    try{
        const results = await new Promise((reject,resolve)=>{
            db.query(sql,[ventes],(err,result)=>{
              if(err){
                 reject(err)
              }else{
                resolve(result)
              }
            })
        })
        return NextResponse.json(
            {message:'Vente effectuée avec succès !!s', results},
            {status:201}
        )
    }catch(err){
        return NextResponse.json(
            {message:'err',erro:err},
            {status:500}
        )
    } 
}

//route pour obtenir tous
export const GET = async (req, res) => {
    try {
      const sql = 'SELECT * FROM vente ORDER BY timestamps DESC';
      const results = await new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
      return NextResponse.json({ message: "ok", results }, { status: 200 });
    } catch (err) {
      return NextResponse.json({ message: "err" }, { status: 500 });
    }
  };
  

  
 