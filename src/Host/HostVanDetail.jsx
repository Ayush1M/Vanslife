import React, { Suspense } from "react";
import {
  Link,
  Outlet,
  NavLink,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { getHostVans } from "../api";
import { requireAuth } from "../utils";

export async function loader({ params, request }) {
  await requireAuth(request);
  return defer({ vans: getHostVans(params.id) });
}

export default function HostVanDetail() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  const data = useLoaderData();

  function renderHostVanDetail(currentVan) {
    return (
      <section>
        <Link to=".." relative="path" className="back-button">
          &larr; <span>Back to all vans</span>
        </Link>

        <div className="host-van-detail-layout-container">
          <div className="host-van-detail">
            <img src={currentVan.imageUrl} />
            <div className="host-van-detail-info-text">
              <i className={`van-type van-type-${currentVan.type}`}>
                {currentVan.type}
              </i>
              <h3>{currentVan.name}</h3>
              <h4>${currentVan.price}/day</h4>
            </div>
          </div>
          <nav className="host-van-detail-nav">
            <NavLink
              to="."
              end
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Detail
            </NavLink>
            <NavLink
              to="pricing"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Pricing
            </NavLink>
            <NavLink
              to="photos"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Photos
            </NavLink>
          </nav>
          <Outlet context={{ currentVan }} />
        </div>
      </section>
    );
  }
  return (
    <Suspense fallback={<h2>Loading details...</h2>}>
      <Await resolve={data.vans}>{renderHostVanDetail}</Await>
    </Suspense>
  );
}
