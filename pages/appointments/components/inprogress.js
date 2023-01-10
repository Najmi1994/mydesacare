import React, { useState } from 'react';
// import { useTranslation } from "next-i18next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createPopper } from '@popperjs/core';
import Link from 'next/link';
import { useAppointment } from 'src/actions/appointment';

// Mui stepper

import ActionCompleted from './ActionCompleted';
import { ToastContainer } from 'react-toastify';
import DataTable from 'react-data-table-component';
import moment from 'moment';



export default function Inprogress() {

  const [page, setPage] = useState(0);
  const countPerPage = 10; 

  const { data, isLoading, isSuccess, isFetching, isError, error } = useAppointment('3',page);
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
            name: <div className='w-full text-center font-bold'>NOTES</div>,
            cell: row => <div className='w-full text-center'>{row.notes}</div>,
        },
        {
            name: <div className='w-full text-center font-bold'>MEET LINK</div>,
            cell: row => <div className='w-full text-center'>{row.meeting_link}</div>,
        },
        {
            name: <div className='w-full text-center font-bold'>STATUS</div>,
            cell: row =>  <div className='w-full text-center font-bold'>
                            <span className='bg-yellow-300 text-yellow-auto0 text-xs font-medium px-2.5 py-0.5 rounded'>
                              {row.status_session == 1 ? 'Pending' : ''}
                              {row.status_session == 2 ? 'Completed' : ''}
                            </span>
                          </div>,
        }, 
        {
            name: <div className='w-full text-center font-bold'>SESSION</div>,
            cell: row =>    <div className='w-full text-center font-bold'>
                              <span className='bg-yellow-300 text-yellow-auto0 text-xs font-medium px-2.5 py-0.5 rounded'>
                                {row.no_session}st
                              </span>
                            </div>,
        },
        {
            name: <div className='w-full text-center font-bold'>ACTION</div>,
            cell: row =>  <button onClick={() => onHandlerModal(true, row)} type='button' className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300'>
                            <span className='text-xs px-4 py-1 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0'>
                              View timeline
                            </span>
                          </button>,
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

  return (
    <>
      <ToastContainer />
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
          <table className='w-full text-sm text-left text-gray-500 hidden'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 text-center'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Client
                </th>
                <th scope='col' className='px-6 py-3'>
                  Notes
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
                <td className='px-6 py-4'>
                  {booking.notes}
                </td>
                <td className='px-6 py-4'>
                  <a href={booking.meeting_link} target="_blank" className="text-blue-500 underline">Link Meeting</a>
                </td>

                <td className='px-6 py-4'>
                  <span className='bg-yellow-300 text-yellow-auto0 text-xs font-medium px-2.5 py-0.5 rounded'>
                    {booking.status_session == 1 ? 'Pending' : ''}
                    {booking.status_session == 2 ? 'Completed' : ''}
                  </span>
                </td>
                <td className='px-6 py-4'>
                  <span className='bg-yellow-300 text-yellow-auto0 text-xs font-medium px-2.5 py-0.5 rounded'>
                    {booking.no_session}st
                  </span>
                </td>
                <td className='text-right'>
                  <button onClick={() => onHandlerModal(true, booking)} type='button' className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300'>
                    <span className='text-xs px-4 py-1 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0'>
                      View timeline
                    </span>
                  </button>
                  {/* <div className="flex items-center justify-center">
                                        <a
                                            className="text-blueGray-500 block "
                                            href="#pablo"
                                            ref={btnDropdownRef}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
                                            }}>
                                            <div className=" flex items-center gap-2 px-5 py-2 mb-2 mx-4 text-sm font-medium rounded-lg border border-purple-400">
                                                <span>Action</span>
                                                <span className="bg-purple-300 rounded-full w-6 h-6 flex items-center justify-center">
                                                    <i class="fas fa-angle-down "></i>
                                                </span>
                                            </div>
                                        </a>
                                        <div
                                            ref={popoverDropdownRef}
                                            className={
                                                (dropdownPopoverShow ? "block " : "hidden ") +
                                                "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                                            }>

                                            <Link href="">
                                                <a

                                                    className={
                                                        "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                                    }>
                                                    Add session
                                                </a>
                                            </Link>
                                            <Link href="#">
                                                <a
                                                    onClick={() => setShowModal(true)}
                                                    className={
                                                        "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                                    }>
                                                    View timeline
                                                </a>
                                            </Link>
                                            <Link href="">
                                                <a
                                                    className={
                                                        "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                                    }>
                                                    Complete this session
                                                </a>
                                            </Link>

                                        </div>
                                    </div> */}
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
           <ActionCompleted onHandlerModal={onHandlerModal} dataBooking={dataBooking} />
          </>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
