import { Pagination } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useAppointment } from 'src/actions/appointment';
// import { useTranslation } from "next-i18next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function All() {
  const [page, setPage] = useState(0);
  
  const { data, isLoading, isSuccess, isFetching, isError, error } = useAppointment('',page);
  const [showModal, setShowModal] = useState(false);
  
  console.log('test', data?.pages);

  const countPerPage = 10; 
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
          name: <div className='w-full text-center font-bold'>CONTACT NO</div>,
          cell: row => <div className='w-full text-center'>{row.country_code+row.mobileno}</div>,
      },
      {
          name: <div className='w-full text-center font-bold'>PROBLEM TYPE</div>,
          cell: row => <div className='w-full text-center'>{row.problem_type}</div>,
      },
      {
          name: <div className='w-full text-center font-bold'>STATUS</div>,
          cell: row => <div className='w-full text-center font-bold'>
                            {row.status== 1 ? <span className='bg-yellow-100 text-yellow-auto0 text-xs font-medium px-2.5 py-0.5 rounded'>New</span> : '' }
                            {row.status== 2 ? <span className='bg-blue-300 text-yellow-auto0 text-xs font-medium px-2.5 py-0.5 rounded'>Accept</span> : '' }
                            {row.status== 3 ? <span className='bg-yellow-300 text-yellow-auto0 text-xs font-medium px-2.5 py-0.5 rounded'>In-Progress</span> : '' }
                            {row.status== 4 ? <span className='bg-green-300 text-yellow-auto0 text-xs font-medium px-2.5 py-0.5 rounded'>Completed</span> : '' }
                            {row.status== 5 ? <span className='bg-red-100 text-yellow-auto0 text-xs font-medium px-2.5 py-0.5 rounded'>Cancelled</span> : '' }
                            {row.status== 6 ? <span className='bg-red-300 text-yellow-auto0 text-xs font-medium px-2.5 py-0.5 rounded'>Rejected</span> : '' }
                        </div>,
      },
    ];
  // console.log('appointment', data);
  // console.log('key', Object.keys(data?.data.res_data));
  // return false;
  return (
    <>
      <div>

       
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg '>
            
              
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
                
              <table className='w-full text-sm text-left text-gray-500 hidden'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 text-center'>
                  <tr>
                    <th scope='col' className='px-6 py-3'>
                      Client
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Booking time
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Contact No
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Problem type
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Status
                    </th>
                    {/* <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Action</span>
                                    </th> */}
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
                    <td className='px-6 py-4'>
                      {moment(booking.date).format("DD/MM/YYYY")}
                      {/* {booking.date} */}
                      <br />
                      <time className='text-xs'>{moment(booking.date+' '+booking.time).format("hh:mm A")}</time>
                    </td>
                    <td className='px-6 py-4'>{booking.country_code+booking.mobileno}</td>
                    <td className='px-6 py-4'>{booking.problem_type}</td>
                    <td className='px-6 py-4'>
                      
                        {booking.status== 1 ? <span className='bg-yellow-100 text-yellow-auto0 text-xs font-medium px-2.5 py-0.5 rounded'>New</span> : '' }
                        {booking.status== 2 ? <span className='bg-blue-300 text-yellow-auto0 text-xs font-medium px-2.5 py-0.5 rounded'>Accept</span> : '' }
                        {booking.status== 3 ? <span className='bg-yellow-300 text-yellow-auto0 text-xs font-medium px-2.5 py-0.5 rounded'>In-Progress</span> : '' }
                        {booking.status== 4 ? <span className='bg-green-300 text-yellow-auto0 text-xs font-medium px-2.5 py-0.5 rounded'>Completed</span> : '' }
                        {booking.status== 5 ? <span className='bg-red-100 text-yellow-auto0 text-xs font-medium px-2.5 py-0.5 rounded'>Cancelled</span> : '' }
                        {booking.status== 6 ? <span className='bg-red-300 text-yellow-auto0 text-xs font-medium px-2.5 py-0.5 rounded'>Rejected</span> : '' }
                      
                    </td>
                    {/* <td className="text-right">
                                        <button
                                            onClick={() => setShowModal(true)}
                                            type="button"
                                            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300">
                                            <span className="text-xs px-4 py-1 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                                                EDIT
                                            </span>
                                        </button>
                                    </td> */}
                  </tr>
                  ))}
                </tbody>
              </table>

              <div className='flex items-center justify-center hidden'>
                <Pagination  count={data?.pages} variant="outlined" shape="rounded" className='mt-5 mb-5 mx-auto' />
              </div>
              
            </div>
            
            {/* <div className='relative overflow-x-auto shadow-md sm:rounded-lg text-center'>
              <p className='p-8'>No Data</p>
            </div> */}
       

        
        {showModal != false ? (
          <>
            <div
              aria-hidden='true'
              className='overflow-y-auto overflow-x-hidden fixed top-40 right-0 left-20 z-40 w-full h-modal md:h-full'>
              <div className='mx-auto relative p-4 w-full max-w-md h-full md:h-auto'>
                <div className='relative bg-white rounded-lg shadow'>
                  <button
                    onClick={() => setShowModal(false)}
                    type='button'
                    className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'>
                    <svg
                      className='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        fillRule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clipRule='evenodd'></path>
                    </svg>
                  </button>
                  <div className='py-6 px-6 lg:px-8'>
                    <h3 className='mb-4 text-xl font-medium text-gray-900'>
                      Edit Appointment Detail
                    </h3>
                    <form className='space-y-6'>
                      <div>
                        <input
                          type='datetime-local'
                          name='datetime'
                          id='datetime'
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                          required
                        />
                      </div>
                      <div>
                        <input
                          type='text'
                          name='contact_no'
                          id='contact_no'
                          value='0189723650'
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                          required
                        />
                      </div>
                      <div>
                        <input
                          type='text'
                          name='services'
                          id='services'
                          value='Family'
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                          required
                        />
                      </div>
                      <button
                        type='submit'
                        className='w-full text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-800 font-medium rounded-lg text-sm px-4 py-1 text-center'>
                        Edit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-black bg-opacity-50 fixed inset-0 z-20'></div>
          </>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
