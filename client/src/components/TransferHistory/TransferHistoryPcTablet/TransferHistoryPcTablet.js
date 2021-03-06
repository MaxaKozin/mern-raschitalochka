import React from 'react';
import { useSelector } from 'react-redux';
import styles from './TransferHistoryPcTablet.module.css';
import TableHeader from '../TableHeader';
import TableRow from '../TableRow';
import Loader from '../../Loader';


export default function TransferHistoryPcTablet() {
  const transactionHistory = useSelector(
    (state) => state.finance.transactionHistory
  );
  const isLoading = useSelector((state) => state.finance.isLoading)
  return (
    <>
      <TableHeader />
      {transactionHistory.length === 0 ? (<h1 className={styles.warning}>Your transaction list empty. Pls add transactions to start supervise the accounts</h1>) : (
        <ul className={styles.tableBody}>
          {isLoading ? (
            <Loader />
          ) : (
              transactionHistory.map((
                transaction
              ) => (
                <li key={transaction._id} className={styles.tableRow}>
                  <TableRow {...transaction} />
                </li>
              ))
            )}
        </ul>
      )
      }
    </>
  )
};
