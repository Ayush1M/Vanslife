import React, {useEffect, useState} from "react";
import {Link, useSearchParams} from 'react-router-dom'


export default function Vans(){
    const [searchParams, setSearchParams] = useSearchParams()
    const [vansData, setVansData] = useState([])

    const typeFilter = searchParams.get("type")
    const displayVans = typeFilter ? vansData.filter((van) => van.type.toLowerCase() === typeFilter) : vansData

    useEffect(()=> {
        async function getVansData(){
            const res = await fetch('/api/vans')
            const data = await res.json()
            setVansData(data.vans)
        }
        getVansData()
    }, [])


    const vanElements = displayVans.map((vanData) => (
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
            <h1>Explore Our Van Options</h1>
            <div className="van-list-filter-buttons">
                <button onClick={() => setSearchParams({type: "simple"})} className={`van-type simple ${typeFilter === "simple" ? "selected" : ""} `}>Simple</button>

                <button onClick={() => setSearchParams({type: "rugged"})} className={`van-type rugged ${typeFilter === "rugged" ? "selected" : ""} `}>Rugged</button>

                <button onClick={() => setSearchParams({type: "luxury"})} className={`van-type luxury ${typeFilter === "luxury" ? "selected" : ""} `}>Luxury</button>

                {typeFilter 
                ? (<button onClick={() => setSearchParams({})} className="van-type clear-filters">Clear Filter</button>) 
                : null}
            </div>
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