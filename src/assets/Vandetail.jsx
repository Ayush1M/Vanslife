import React, { useEffect, useState } from "react";
import { useParams , Link, useLocation } from "react-router-dom";


export default function Vandetail(){
    const params = useParams()
    const location = useLocation()
    console.log(location)
    const [vanDetail, setVanDetail] = useState([])

    useEffect(()=> {
        async function getVanDetail(){
            const res = await fetch(`/api/vans/${params.id}`)
            const data = await res.json()
            setVanDetail(data.vans)
        }
        getVanDetail()
    }, [params.id])

    const search = location.state?.search || ""
    const type = location.state?.type || "all"
    

    return(
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} vans</span></Link>
            {vanDetail ? (
                <div className="van-detail">
                    <img src={vanDetail.imageUrl} />
                    <i className={`van-type ${vanDetail.type} selected`}>{vanDetail.type}</i>
                    <h2>{vanDetail.name}</h2>
                    <p className="van-price"><span>${vanDetail.price}</span>/day</p>
                    <p>{vanDetail.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
            ) : <h2>Loading...</h2>}
        </div>
    )
}