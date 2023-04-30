import React, {useEffect, useState} from "react";


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
               <img src={vanData.imageUrl} />
              <div className="van-info">
                <h3>{vanData.name}</h3>
                <p>${vanData.price}<span>/day</span></p>
              </div>
                <i className={`van-type ${vanData.type} selected`}>{vanData.type}</i>
             </div>
    ))

    return(
        <>
        <div className="van-list-container">
            <div className="van-list">
                {vanElements}
            </div>
        </div>
        </>
            
    )
}