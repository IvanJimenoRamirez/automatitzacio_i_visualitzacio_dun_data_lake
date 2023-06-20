/* Imports */
import React from 'react'
import Image from 'next/image'

/* Styles */
import styles from './Table.module.css'

export function Table ({ columns, columnsTranslated, data, actions }) {
  return (
    <div className={styles.tableContainer}>
      <table>
        <thead>
          <tr>
            {columnsTranslated.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {
                columns.map((column, colIndex) => (
                  colIndex < columns.length - 1
                    ? (
                      <td key={colIndex}>{row[column.toLowerCase()]}</td>
                      )
                    : (
                      <React.Fragment key={colIndex} />
                      )
                ))
            }
              <td className={styles.actions}>
                {actions.map((action, actionIndex) => (
                  <button key={actionIndex} onClick={() => action.onClick(row)} className={action.customStyle}>
                    <span>{action.label}</span>
                    <Image
                      src={action.icon}
                      width={20}
                      height={20}
                      alt={action.label.toLowerCase()}
                    />
                  </button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};
