'use client'

import styles from "./Zone.module.css";
import { useState, useEffect } from "react";
import {TLDStatisticsDTO} from "../../../payloads/response/TLDStatisticsDTO";

export function Zone({ name, description, id }) {
    const [statistics, setStatistics] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetch("http://127.0.0.1:8000/DataLakeAPI/" + id + "/statistics")
          .then((res) => res.json())
          .then((data) => {
              const sources = new TLDStatisticsDTO(data);
              setStatistics(sources)
              setLoading(false)
          })
      }, [])

    return (
        <div className={styles.card}>
            <h4>{name}</h4>
            <p>{description}</p>
            {isLoading ? (
                "Loading..."
                ) : (
                <div className={styles.statisticsWrapper}>
                    {statistics ? (
                    <div>
                        <table>
                            <tr>
                                <th>#Fonts</th>
                                <th>#Metadata</th>
                            </tr>
                            <tr>
                                <td>{statistics.getTotalSources()}</td>
                                <td>{statistics.getTotalMetadataCount()}</td>
                            </tr>
                        </table>
                    </div>
                    ) : (
                    "An error has occurred while retrieving the statistics"
                    )}
                </div>
            )}
        </div>
    )
}