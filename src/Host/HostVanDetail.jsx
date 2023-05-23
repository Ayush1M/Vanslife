import React, { useEffect, useState } from "react";
import { useParams, Link, Outlet, NavLink } from "react-router-dom";

export default function HostVanDetail(){
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    const param = useParams()
    const[currentVan, setCurrentVan] = useState([])


    useEffect(() => {
        async function getVanDetail(){
            const res = await fetch(`/api/host/vans/${param.id}`)
            const data = await res.json()
            setCurrentVan(data.vans)
        }
        getVanDetail()
    }, [param.id])

    if(!currentVan) {
        return <h1>Loading....</h1>
    }


    return(
        <section>
            <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>Back to all vans</span></Link>

            <div className="host-van-detail-layout-container">
                <div className="host-van-detail">
                    <img src={currentVan.imageUrl} />
                    <div className="host-van-detail-info-text">
                        <i
                            className={`van-type van-type-${currentVan.type}`}
                        >
                            {currentVan.type}
                        </i>
                        <h3>{currentVan.name}</h3>
                        <h4>${currentVan.price}/day</h4>
                    </div>
                </div>
                <nav className="host-van-detail-nav">
                <NavLink to="." end style={({isActive}) => isActive ? activeStyles : null}>Detail</NavLink>
                <NavLink to="pricing" style={({isActive}) => isActive ? activeStyles : null}>Pricing</NavLink>
                <NavLink to="photos" style={({isActive}) => isActive ? activeStyles : null}>Photos</NavLink>
                </nav>
                <Outlet context={ {currentVan} } />
            </div>
        </section>
    )
}