'use client'

import styles from "./Zone.module.css";
import { useState, useEffect } from "react";
import {TLDStatisticsDTO} from "../../../payloads/response/TLDStatisticsDTO";

export function Zone({ name, description, id }) {
    const [statistics, setStatistics] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/DataLakeAPI/${id}/statistics`)
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
                            <thead>
                                <tr>
                                    <th>#Fonts</th>
                                    <th>#Metadata</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{statistics.getTotalSources()}</td>
                                    <td>{statistics.getTotalMetadataCount()}</td>
                                </tr>
                            </tbody>
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