"use client"
import React, { useContext, useEffect, useState } from 'react';
import { MyStore } from '@/context/store';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '@/components/layouts/Navbar';
import SideBar from '@/components/layouts/SideBar';
import { useRouter } from 'next/navigation';


const Depenseur = () => {
  const {message, sendDepensesToDataBase, backendURI} = useContext(MyStore)
  const [dateValue, setDateValue] = useState('');
  const [opperations,setOpperations] = useState([])
  const router = useRouter()
  //charger les depenses
  useEffect(()=>{
    const getDepenses =()=>{
     axios.get(`/api/depenses`)
     .then((res) =>{
      setOpperations(res.data.results)
     }).catch(err => console.error(err))
    };
    getDepenses()
},[])

  //etat initial des champs formulaire
  const [depenses,setDepenses] = useState({ montants:'', motifs:''})

  //etat de stockage d'erreur
  const [error , setError] = useState('');

  //valeurs de la selections
  const options = [
    {values:'Dépenses-personnelles',label:'DEPENSES-PERSONNELLES'},
    {values:'Payement-location',label:'PAYEMENT-LOCATION'},
    {values:"Payement-Electricité",label:"PAYEMENT-ELECTRICITE"}
  ];
   
  //change letat
    const handleChange=(e)=>{
      const {name,value} = e.target;
      setDepenses({...depenses,[name]:value})
    };

    //envoyer la depense
    const handleSend =(e)=>{
      e.preventDefault();
      if(depenses.montants.length <= 0 || depenses.motifs.length <= 0){
       setError('Veuiller ajouter les valeurs')
      }else{
        router.push('/pages/depenses')
        sendDepensesToDataBase(depenses)
        setDepenses({ montants:'', motifs:''});
        
      }
    };
    
    //supprimer la depense
    const handleDelete =(id)=>{
         axios.delete(`/api/depenses/${id}`)
         .then((res) => res.data)
         .catch((err) => console.error(err))
    };

    //calcule de la somme du depense journaliere
    const calcul =()=>{
      const filterDepense = opperations?.filter((x) => x.timestamps.includes(dateValue))
      const prix  = filterDepense.map((a) => a.montants );
      const sum = prix.reduce((a,b) => a + b,0)
      return sum
    }
    const sommeDujour = calcul()

    //filtrage par date
    const opperationFilter = opperations.filter((x) => x.timestamps.includes(dateValue))

    return (
      <>
      <Navbar/>
      <main className='App'>
      <SideBar/>
        <section className='depenseurs'>
            <header className='header-fournisseurs'>
              <h1>Enregistrer vos dépenses</h1>
            </header>
            <div className='contacts-zone'>
            <form>
            <div className='left-zone'>
             <div className='con'>
             <label>MONTANTS</label>
             <input type='number' name='montants' value={depenses.montants} onChange={(e)=>handleChange(e)} placeholder='Montant...'/>
             { depenses.montants.length <= 0 && <span>{error}</span>}
             </div>
             <div className='con'>
             <label>MOTIFS</label>
             <select type='text' name='motifs' value={depenses.motifs} onChange={(e)=>handleChange(e)} >
            <option >Sélectionner--un--motif</option>
            {options.map((item) =>(
                <option key={item.values} value={item.values}>{item.label}</option>
            ))}
            </select>
            {depenses.motifs.length <=0 && <span>{error}</span>}
             </div>
             <span className='messge-dep'>{message}</span>
             <button className='btn-contact'  onClick={(e)=>handleSend(e)}>Enregistrer</button>
             
            </div>
            </form>

            <div className='rigth-zone'>
            <div className='filtre'>
            <label>Dépenses du </label>
            <input type='date' value={dateValue} onChange={(e)=>setDateValue(e.target.value)} />
            <div className='donto'>
            <h3>Total</h3>
             <span>{sommeDujour} FCFA</span>
             </div>
            </div>
            {opperationFilter.length <=0 && <span className='aucun'>Aucunes dépenses</span>}
            { opperationFilter.map((item)=>(
              <div className='card-contact' key={item.id}>
             <div className='rig'>
             <h3>MONTANTS</h3>
               <p>{item.montants} FCFA</p>
             </div>
             <div className='rig'>
             <h3>MOTIFS</h3>
             <p>{item.motifs}</p>
             </div> 
             <div className='rig'>
             <h3>DATE</h3>
             <p>{item.timestamps}</p>
             </div> 
             <span className='btn-depense' onClick={()=>handleDelete(item.id)}><DeleteIcon className='i' /></span>
             
             </div>
             ))}
            </div>
            </div>
        </section>
        </main>
        </>
    );
}

export default Depenseur;
