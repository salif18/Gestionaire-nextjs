import db from "@/lib/db";
import { NextResponse } from "next/server";

//obtenir un seul produit
export const GET = async (req, res) => {
    try {
      const id = await req.url.split('produits/')[1];
      const results = await new Promise((resolve, reject) => {
        db.query(`SELECT*FROM produits WHERE id = ?`, [id], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      return NextResponse.json({message:'ok',results},{status:200});
    } catch (err) {
      return NextResponse.json({ message: err.message },{status:500});
    }
  };
  
  //modifier le produit
  export const PUT = async (req, res) => {
      const id = await req.url.split('produits/')[1];
      const { nom, categories, prixAchat, prixVente, stocks } = await req.json();
  
      const sql = `UPDATE produits 
                  SET nom = ?, categories = ?, prixAchat = ?, prixVente = ?, stocks = ? 
                  WHERE id = ?`;
  
      const newValue = [ nom, categories, prixAchat, prixVente, stocks, id ];
        
    try {
      const results = await new Promise((resolve, reject) => {
        db.query(sql, newValue, (err, results) => {
          if (err) {
            console.error(err)
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      return NextResponse.json({message:'Produit a été modifié avec succès !!',results},{status:201});
    } catch (err) {
      return NextResponse.json({ message: err.message },{status:500});
    }
  };
  
  //modifier un champs stocks
export const  PATCH = async (req, res) => {
  try {
    const { stocks } = await req.json();
    const  id  = req.url.split('produits/')[1];

    const results = await new Promise((resolve,reject)=>{
    db.query(
      `UPDATE produits set stocks = ? WHERE id = ?`,[stocks,id],(err,results)=>{
        if(err){
            reject(err)
        }else{
            resolve(results)
        }
      });
    })
    return NextResponse.json({message:'stock a été modifié avec succès !!',results},{status:201});
  } catch (err) {
    return NextResponse.json({ message: err.message },{status:500});
  }
};
  
  export const DELETE = async (req, res) => {
    try {
      const id  = req.url.split('produits/')[1];
      const results = await new Promise((resolve,reject)=>{
          db.query(`DELETE FROM produits WHERE id = ?`, [id],(err,results)=>{
              if(err){
                  reject(err)
              }else{
                  resolve(results)
              }
          })
      }) 
      return NextResponse.json({message:'Le produit a été supprimé avec succès !!',results},{status:200});
    } catch (err) {
      return NextResponse.json({ message: err.message },{status:500});
    }
  };