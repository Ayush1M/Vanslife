import React, { Suspense } from "react";
import {
  Link,
  useLocation,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { getVans } from "../api";

export function loader({ params }) {
  return defer({ vans: getVans(params.id) });
}

export default function Vandetail() {
  const location = useLocation();
  const data = useLoaderData();

  function renderVanDetail(vanDetail) {
    const search = location.state?.search || "";
    const type = location.state?.type || "all";

    return (
      <div className="van-detail-container">
        <Link to={`..${search}`} relative="path" className="back-button">
          &larr; <span>Back to {type} vans</span>
        </Link>
        <div className="van-detail">
          <img src={vanDetail.imageUrl} />
          <i className={`van-type ${vanDetail.type} selected`}>
            {vanDetail.type}
          </i>
          <h2>{vanDetail.name}</h2>
          <p className="van-price">
            <span>${vanDetail.price}</span>/day
          </p>
          <p>{vanDetail.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<h2>Loading vans detail....</h2>}>
      <Await resolve={data.vans}>{renderVanDetail}</Await>
    </Suspense>
  );
}
