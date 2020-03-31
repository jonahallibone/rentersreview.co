import React, { useEffect, useRef, useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import LottieLoader from "../lottie-loader/lottie-loader";
import styles from "./homepage-search.module.scss";
import { useMemo } from "react";

const SEARCH_BUILDINGS = gql`
  query SearchBuildings($query: String!) {
    SearchBuildings(query: $query) {
      buildings {
        _id
        street
        streetNumber
        location
        borough
        zipcode
      }
      total
    }
  }
`;

const HomepageSearch = () => {
  const prevReq = useRef(null);
  const currentReq = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);

  const [searchBuildings, { loading }] = useLazyQuery(SEARCH_BUILDINGS, {
    variables: {
      query: searchTerm
    },
    onCompleted: data => {
      console.log(data);
      if (data.SearchBuildings.buildings.length) {
        if (currentReq.current === prevReq.current) {
          setResults(data.SearchBuildings.buildings);
          setTotal(data.SearchBuildings.total);
        }
      } else {
        setResults(null);
      }
    }
  });

  const memLoading = useMemo(() => loading, [loading]);

  useEffect(() => {
    if (searchTerm.length) {
      currentReq.current = new Promise(resolve => {
        searchBuildings();
        resolve(true);
      });
      prevReq.current = currentReq.current;
    } else {
      setResults([]);
    }
  }, [searchTerm, searchBuildings]);

  const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className={styles.homepage_input__container}>
      <input
        type="text"
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
        className={styles.homepage_input__input}
        placeholder="123 Appleseed Lane"
      />

      <button disabled={loading} className={styles.homepage_input__button}>
        {memLoading ? <LottieLoader /> : "Search"}
      </button>
      {results?.length > 0 && !loading && (
        <ul className={styles.homepage_input__search_results}>
          {results.map(result => (
            <li key={result._id} className={styles.homepage_input__search_li}>
              <Link
                className={styles.homepage_input__search_result}
                to={`/building/${result._id}`}
              >
                <div>
                  <strong>
                    {result.streetNumber} {result.street}, NEW YORK, NY,{" "}
                    {result.zipcode}
                  </strong>
                </div>
                <small>{result.borough}</small>
              </Link>
            </li>
          ))}
          <li className={styles.homepage_input__search_result}>
            <strong>See all {numberWithCommas(total)} results</strong>
          </li>
        </ul>
      )}
    </div>
  );
};

export default HomepageSearch;
