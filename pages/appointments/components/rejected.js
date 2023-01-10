import moment from "moment";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useAppointment } from 'src/actions/appointment';
// import { useTranslation } from "next-i18next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Rejected() {

     const [page, setPage] = useState(0);
    const countPerPage = 10; 

    const { data, isLoading, isSuccess, isFetching, isError, error } = useAppointment('6',page);

    const columns = [
            {
                name: <div className='font-bold'>NO.</div>,
                cell: row => row.row_num,
                width: '4rem'
            },
            {
                name: <div className='font-bold'>CLIENT</div>,
                selector: row => row.name,
            },
            {
                name: <div className='w-full text-center font-bold'>BOOKING TIME</div>,
                cell: row => <div className='w-full text-center'><div>{moment(row.date).format("DD/MM/YYYY")}</div><div><time className='text-xs'>{row.time}</time></div></div>,
                width: '10rem'
            },
            {
                name: <div className='w-full text-center font-bold'>Reason</div>,
                cell: row =>  <div className='w-full text-center font-bold'>{row.reason}</div>,
            },
    ];

    return (
        <>
            <div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                    {/* Filter & search table */}
                   
                    <table className="w-full text-sm text-left text-gray-500 hidden">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Client
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Booking time
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Reason
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {data?.data.map((booking, index) => (
                                <tr className="bg-white border-b hover:bg-gray-50 text-center">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {booking.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {moment(booking.date).format("DD/MM/YYYY")}
                                        <br />
                                        <time className='text-xs'>{moment(booking.date+' '+booking.time).format("hh:mm A")}</time>
                                    </td>
                                    <td className="px-6 py-4">{booking.reason_reject}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <DataTable 
                        // title=" "
                        className='w-full'
                        columns={columns} 
                        data={data?.data}
                        progressPending={isFetching} 
                        highlightOnHover
                        pagination
                        paginationServer
                        paginationTotalRows={data?.count}
                        paginationPerPage={countPerPage}
                        paginationComponentOptions={{
                        noRowsPerPage: true
                        }}
                        onChangePage={page => {setPage(page)}}
                        // selectableRows={isAdmin}
                        // selectableRowDisabled={rowDisabledCriteria}
                        // contextActions={contextActions}
                        // onSelectedRowsChange={handleRowSelected}
                        // clearSelectedRows={toggleCleared}
                    />
                </div>
            </div>
        </>
    )
}

