
import React from 'react';
import { Table } from  'reactstrap'

import './styles.css';

const TokensTable = ({data}) => {
    return (
        <>
            <h1 className='pink-header'>MY TOKENS</h1>
            <div className='table-wrap'>
                <Table className='tokens-table'>
                    <thead>
                    <tr>
                        <th>
                            Token ID
                        </th>
                        <th>
                            Name
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    { (data.content && data.content.map(({id, name}) => (
                        <tr key={id}>
                            <td>
                                {id}
                            </td>
                            <td>
                                {name}
                            </td>
                        </tr>
                    )))
                    || <tr className='no-data'><td colspan="2">No Data</td></tr> }
                    </tbody>
                </Table>
            </div>
        </>

    );
}

export default TokensTable;
