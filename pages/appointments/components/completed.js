import React, { useState } from 'react';
// import { useTranslation } from "next-i18next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useAppointment } from 'src/actions/appointment';

// Mui stepper
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { consulor_progress } from 'src/data/consulor_progress';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import ActionDone from './ActionDone';

const steps = [
  {
    label: '1st Session',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: '2nd Session',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: '3rd Session',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

export default function Completed() {
  
  const [page, setPage] = useState(0);
  const countPerPage = 10; 

  const { data, isLoading, isSuccess, isFetching, isError, error } = useAppointment('4',page);
  const [ showModal, setShowModal ] = useState(false);
  const [ dataBooking, setDataBooking ] = useState(false);

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
            name: <div className='w-full text-center font-bold'>STATUS</div>,
            cell: row =>  <div className='w-full text-center font-bold'>
                            <span className='bg-green-300 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded'>
                              Complete
                            </span>
                          </div>,
        }, 
        {
            name: <div className='w-full text-center font-bold'>SESSION</div>,
            cell: row =>    <div className='w-full text-center font-bold'>
                              <span className='bg-green-300 text-green-400 text-xs font-medium px-2.5 py-0.5 rounded'>
                                {row.no_session}st
                              </span>
                            </div>,
        },
        {
            name: <div className='w-full text-center font-bold'>ACTION</div>,
            cell: row =>  <div className='w-full text-center font-bold'>
                            <button onClick={() => onHandlerModal(true, row)} type='button' className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300'>
                              <span className='text-xs px-4 py-1 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0'>
                                View timeline
                              </span>
                            </button>
                          </div>,
        },
  ];

  function onHandlerModal(toggle, data){
    if(!toggle){
      setDataBooking([]);
    }else{
      setDataBooking(data);
    }
    setShowModal(toggle);
  }
  

  return (
    <>
      <div>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg '>
          {/* Filter & search table */}
          
          <table className='w-full text-sm text-left text-gray-500 hidden'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 text-center'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Client
                </th>
                <th scope='col' className='px-6 py-3'>
                  Meet Link
                </th>

                <th scope='col' className='px-6 py-3'>
                  Status
                </th>
                <th scope='col' className='px-6 py-3'>
                  Session
                </th>
                <th scope='col' className='px-6 py-3'>
                  <span className=''>Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((booking, index) => (
                <tr className='bg-white border-b hover:bg-gray-50 text-center'>
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                    {booking.name}
                  </th>
                  <td className='px-6 py-4'>{booking.meeting_link}</td>

                  <td className='px-6 py-4'>
                    <span className='bg-green-300 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded'>
                      Complete
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <span className='bg-green-300 text-green-400 text-xs font-medium px-2.5 py-0.5 rounded'>
                      3rd
                    </span>
                  </td>
                  <td className='text-right'>
                    <button
                      onClick={() => setShowModal(true)}
                      type='button'
                      className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300'>
                      <span className='text-xs px-4 py-1 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0'>
                        View timeline
                      </span>
                    </button>
                  </td>
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
        {showModal != false ? (
          <>
           <ActionDone  onHandlerModal={onHandlerModal} dataBooking={dataBooking} />
          </>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
