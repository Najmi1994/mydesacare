import React, { useState } from 'react';
// import { useTranslation } from "next-i18next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createPopper } from '@popperjs/core';
import { useAppointment } from 'src/actions/appointment';
import Link from 'next/link';
import ActionModal from './ActionModal';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import DataTable from 'react-data-table-component';

export default function New() {
  // Modal
  const [page, setPage] = useState(0);
  const countPerPage = 10; 

  const [showModal, setShowModal] = useState(false);
  const [reject, setReject] = useState(false);
  const [accept, setAccept] = useState(false);
  const [dataBooking, setDataBooking] = useState([]);

  const { data, isLoading, isSuccess, isFetching, isError, error, refetch } = useAppointment('1',page);
  
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
        name: <div className='w-full text-center font-bold'>ACTION</div>,
        cell: row => <div className='w-full text-center'><button onClick={() => onHandlerModal(true, row)} type='button' className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300'><span className='text-xs px-4 py-1 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0'>View</span></button></div>,
    },
  ];


  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      // placement: "right",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  function onHandlerModal(toggle, data){
    if(!toggle){
      setDataBooking([])
    } else {
      setDataBooking(data)
    }
    setShowModal(toggle)
  }
  //console.log('databooking', dataBooking)
  

  return (
    <>
      <ToastContainer/>
      <div>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg '>
          {/* Filter & search table */}
          <div className='p-4 flex items-center hidden'>
            <div
              className='relative m-1'
              style={{ width: '-webkit-fill-available' }}>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <svg
                  className='w-5 h-5 text-gray-500'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                    clipRule='evenodd'></path>
                </svg>
              </div>
              <input
                type='text'
                id='table-search'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5'
                placeholder='Search'
                style={{ width: '-webkit-fill-available' }}
              />
            </div>
            <div
              className='relative my-1 mr-0'
              style={{ width: '-webkit-fill-available' }}>
              <input
                type='datetime-local'
                id='table-datetime'
                className='bg-gray-50 border border-r-0.5 border-gray-300 text-gray-900 text-sm rounded-lg rounded-r-none focus:ring-blue-500 focus:border-blue-500 block p-2.5'
                style={{ width: '-webkit-fill-available' }}
              />
            </div>
            <div
              className='relative my-1'
              style={{ width: '-webkit-fill-available' }}>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <svg
                  className='w-5 h-5 text-gray-500'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                    clipRule='evenodd'></path>
                </svg>
              </div>
              <input
                type='text'
                id='table-filter'
                className='bg-gray-50 border border-l-0.5 border-r-0.5 border-gray-300 text-gray-900 text-sm rounded-lg rounded-r-none rounded-l-none focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5'
                placeholder='Filter'
                style={{ width: '-webkit-fill-available' }}
              />
            </div>
            <div
              className='relative my-1 ml-0'
              style={{ width: '-webkit-fill-available' }}>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <svg
                  className='w-5 h-5 text-gray-500'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                    clipRule='evenodd'></path>
                </svg>
              </div>
              <input
                type='text'
                id='table-sort'
                className='bg-gray-50 border border-l-0.5 border-gray-300 text-gray-900 text-sm rounded-lg rounded-l-none focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5'
                placeholder='Sort'
                style={{ width: '-webkit-fill-available' }}
              />
            </div>
            <div
              className='relative m-1'
              style={{ width: '-webkit-fill-available' }}>
              <button
                type='button'
                class='py-3 px-5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700'
                style={{ width: '-webkit-fill-available' }}>
                Export CSV
              </button>
            </div>
          </div>
{/*           
          <DataTable 
                  columns={columns} 
                  data={data?.data} 
                  pagination
                  paginationTotalRows={data?.count}  
                  onChangePage={page => setPage(page)}
            /> */}

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
                {/* <th scope="col" className="px-6 py-3">
                                    Status
                                </th> */}
                <th scope='col' className='px-6 py-3'>
                  <span className=''>Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
            {data?.data.map((booking,index) => (
              <tr className='bg-white border-b hover:bg-gray-50 text-center'>
                <th
                  scope='row'
                  className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                  {booking.name}
                </th>
                <td className='px-6 py-4'>
                  {moment(booking.date).format("DD/MM/YYYY")}
                  <br />
                  <time className='text-xs'>{moment(booking.date+' '+booking.time).format("hh:mm A")}</time>
                </td>
                <td className='px-6 py-4'>{booking.country_code+booking.mobileno}</td>
                <td className='px-6 py-4'>{booking.problem_type}</td>
              
                <td className='text-right '>
                  <button onClick={() => onHandlerModal(true, booking)} type='button' className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300'><span className='text-xs px-4 py-1 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0'>View</span>
                  </button>
                </td>
              </tr>
            ))}
             
            </tbody>
          </table>



        </div>
        {showModal != false ? (
          <>
            {reject != false ? (
              <>
                <div aria-hidden='true' className='overflow-y-auto overflow-x-hidden fixed top-40 right-0 left-20 z-50 w-full  md:h-full'>
                  <div className='mx-auto relative p-4 w-full max-w-md md:h-auto'>
                    <div className='relative bg-white rounded-lg shadow-2xl'>
                      <button onClick={() => setReject(false)} type='button' className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'>
                        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                          <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd'></path>
                        </svg>
                      </button>
                      <div className='py-6 px-6 lg:px-8'>
                        <h3 className='mb-4 text-xl font-medium text-gray-900'>
                          Reject appointment
                        </h3>
                        <form className='space-y-6'>
                          <div>
                            <label for='reason' class='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'>
                              Select an option
                            </label>
                            <select id='reason' class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                              <option selected>Choose Your reason</option>
                              <option value='1'>Not available</option>
                              <option value='2'>Something went wrong </option>
                              <option value='3'>Assign new counselor</option>
                            </select>
                          </div>
                          <div>
                            <label for='reason' class='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'>
                              Assign to new counselor
                            </label>
                            <select id='reason' class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                              <option selected>Choose new counselor</option>
                              <option value='1'>Din</option>
                              <option value='2'>Arif </option>
                              <option value='3'>Zainal</option>
                            </select>
                          </div>

                          <button onClick={() => setReject(true)} className='w-full bg-red-400 text-white border font-medium rounded-lg text-sm px-4 py-1 text-center'>
                            Reject & Assign
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className='bg-black bg-opacity-50 fixed inset-0 z-20'></div>
              </>
            ) : (
              <ActionModal onHandlerModal={onHandlerModal} dataBooking={dataBooking} refetch={refetch}/>
            )}
          </>
        ) : (
          ''
        )}

        {/* {reject != false ? (
            <>
                <div
                    aria-hidden="true"
                    className="overflow-y-auto overflow-x-hidden fixed top-40 right-0 left-20 z-50 w-full  md:h-full">
                    <div className="mx-auto relative p-4 w-full max-w-md md:h-auto">
                        <div className="relative bg-white rounded-lg shadow-2xl">
                            <button
                                onClick={() => setReject(false)}
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"></path>
                                </svg>
                            </button>
                            <div className="py-6 px-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium text-gray-900">
                                    Reject appointment
                                </h3>
                                <form className="space-y-6">

                                    <div>
                                        <label for="reason" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>
                                        <select id="reason" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option selected>Choose Your reason</option>
                                            <option value="1">Not available</option>
                                            <option value="2">Something went wrong </option>
                                            <option value="3">Assign new counselor</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label for="reason" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Assign to new counselor</label>
                                        <select id="reason" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option selected>Choose new counselor</option>
                                            <option value="1">Din</option>
                                            <option value="2">Arif </option>
                                            <option value="3">Zainal</option>
                                        </select>
                                    </div>

                                    <button
                                        onClick={() => setReject(true)}
                                        className="w-full bg-red-400 text-white border font-medium rounded-lg text-sm px-4 py-1 text-center">
                                        Reject & Assign
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-black bg-opacity-50 fixed inset-0 z-20"></div>
            </>
        ) : (
            ""
        )} */}
      </div>
    </>
  );
}
