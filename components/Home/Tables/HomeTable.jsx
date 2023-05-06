'use client'

import styles from "./HomeTable.module.css";
import { useState, useEffect } from "react";
import {TLDStatisticsDTO} from "../../../payloads/response/TLDStatisticsDTO";

export function HomeTable({ id, col1, col2, loading }) {
    const [statistics, setStatistics] = useState(null);
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
      setLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/DataLakeAPI/${id}/statistics`)
        .then((res) => res.json())
        .then((data) => {
          const sources = new TLDStatisticsDTO(data);
          setStatistics(sources);
          setLoading(false);
        });
    }, []);
  
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{col1}</th>
            <th>{col2}</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="2">{loading}</td>
            </tr>
          ) : (
            statistics &&
            statistics.getSourcesNames().map((sourceName, index) => (
              <tr key={index}>
                <td>{sourceName}</td>
                <td>{statistics.getMetadataFromSource(sourceName)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  }