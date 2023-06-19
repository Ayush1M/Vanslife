import React, { Suspense } from "react";
import {
  Link,
  useSearchParams,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { getVans } from "../api";


export function loader() {
  return defer({ vans: getVans() });
}


export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const data = useLoaderData();

  const typeFilter = searchParams.get("type");

  function renderVanElements(vansData) {
    const displayVans = typeFilter
      ? vansData.filter((van) => van.type.toLowerCase() === typeFilter)
      : vansData;

    const vanElements = displayVans.map((vanData) => (
      <div key={vanData.id} className="van-tile">
        <Link
          to={vanData.id}
          state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
        >
          <img src={vanData.imageUrl} />
          <div className="van-info">
            <h3>{vanData.name}</h3>
            <p>
              ${vanData.price}
              <span>/day</span>
            </p>
          </div>
          <i className={`van-type ${vanData.type} selected`}>{vanData.type}</i>
        </Link>
      </div>
    ));

    return (
      <>
        <div className="van-list-filter-buttons">
          <button
            onClick={() => setSearchParams({ type: "simple" })}
            className={`van-type simple ${
              typeFilter === "simple" ? "selected" : ""
            } `}
          >
            Simple
          </button>

          <button
            onClick={() => setSearchParams({ type: "rugged" })}
            className={`van-type rugged ${
              typeFilter === "rugged" ? "selected" : ""
            } `}
          >
            Rugged
          </button>

          <button
            onClick={() => setSearchParams({ type: "luxury" })}
            className={`van-type luxury ${
              typeFilter === "luxury" ? "selected" : ""
            } `}
          >
            Luxury
          </button>

          {typeFilter ? (
            <button
              onClick={() => setSearchParams({})}
              className="van-type clear-filters"
            >
              Clear Filter
            </button>
          ) : null}
        </div>
        <div className="van-list">{vanElements}</div>
      </>
    );
  }

  return (
    <>
      <div className="van-list-container">
        <h1>Explore Our Van Options</h1>
        <Suspense fallback={<h2>Loading vans...</h2>}>
        <Await resolve={data.vans}>{renderVanElements}</Await>
        </Suspense>
      </div>
    </>
  );
}
