import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom'


export default function Vans(){
    const [vansData, setVansData] = useState([])

    useEffect(()=> {
        async function getVansData(){
            const res = await fetch('/api/vans')
            const data = await res.json()
            setVansData(data.vans)
        }
        getVansData()
    }, [])

    const vanElements = vansData.map((vanData) => (
              <div key={vanData.id} className="van-tile">
            <Link to={`/vans/${vanData.id}`}>
               <img src={vanData.imageUrl} />
              <div className="van-info">
                <h3>{vanData.name}</h3>
                <p>${vanData.price}<span>/day</span></p>
              </div>
                <i className={`van-type ${vanData.type} selected`}>{vanData.type}</i>
            </Link>
            </div>
        
    ))

    return(
        <>
        <div className="van-list-container">
            {
                vansData.length > 0 ? 
            (<div className="van-list">
                {vanElements}
            </div>)  : (

            <h2>Loading....</h2>
            )
}
        </div>
        </>
            
    )
}