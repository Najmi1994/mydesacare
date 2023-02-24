import { Formik } from 'formik';
import moment from 'moment';
import React, { useState } from 'react'
import { useAllProfile, useBookingUpdate } from 'src/actions/appointment';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import Link from 'next/link';


export default function ActionModal(props) {
    const [reject, setReject] = useState(false);
    const { mutate, error, isError, isLoading: isButtonLoading } = useBookingUpdate();

    const { data:allProfile } = useAllProfile();
console.log('prpo',props);
    const timeConstraints = {
        minutes: {
        step: 30
        }
    }

  const onSubmit = async (values) => {
    // console.log('data', values);
    // return false;

    await mutate(values);
    // props.refetch();
    props.onHandlerModal(false, []);
  };
  


  return (
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
                        <Formik
                            enableReinitialize
                            validateOnChange={false}
                            validateOnBlur={false}
                            initialValues={{
                                appointments_id: props.dataBooking.appointments_id,
                                reason: '',
                                status: '6'
                            }}
                            onSubmit={onSubmit}>
                            {(form) =>(
                                <form className='space-y-6' onSubmit={form.handleSubmit}>
                                    <div>
                                        <div>
                                            <label className='text-xs'>Reason</label>
                                            <input type='text' name='reason' id='reason' value={form.values.reason} onChange={form.handleChange} onBlur={form.handleBlur} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'/>
                                        </div>
                                    
                                    </div>
                                    <button type="submit" className='w-full bg-red-400 text-white border font-medium rounded-lg text-sm px-4 py-1 text-center'>
                                        Reject & Assign
                                    </button>
                                </form>
                            )}
                            </Formik>
                      
                        </div>
                    </div>
                    </div>
                </div>
            
                <div className='bg-black bg-opacity-50 fixed inset-0 z-20'></div>
            </>
        ) : 
            <>
                <div aria-hidden='true' className='overflow-y-auto overflow-x-hidden fixed top-5 right-0 left-20 z-40 w-full h-modal md:h-full'>
                    <div className='mx-auto relative p-4 w-full max-w-md h-full md:h-auto'>
                    <div className='relative bg-white rounded-lg shadow'>
                        <button onClick={() => props.onHandlerModal(false, [])} type='button' className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'>
                        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                            <path fillRule='evenodd'd='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'clipRule='evenodd'></path>
                        </svg>
                        </button>
                        <div className='py-6 px-6 lg:px-8'>
                        <h3 className='mb-4 text-xl font-medium text-gray-900'>
                            Client Information
                        </h3>
                        <div className='flex justify-between border-b py-2'>
                            <div className='flex items-center gap-2 mb-2'>
                            <Link href=''>
                                <span className='bg-gray-200 flex items-center justify-center border w-10 h-10  rounded-full'>
                                <img
                                    className='rounded-full'
                                    src={
                                        props?.dataBooking?.profile_img
                                        ? 
                                        'https://www.mydesa.my/v2/' + props?.dataBooking?.profile_img
                                        : 
                                        'https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg'
                                    }
                                    alt=''
                                />
                                </span>
                            </Link>
                            <div className='flex flex-col text-xs'>
                                <h4>{props.dataBooking.name}</h4>
                                <h5>{props.dataBooking.email}</h5>
                                <h5>{props.dataBooking.depression}</h5>
                                <h5>{props.dataBooking.mobileno}</h5>
                                <h5>{props.dataBooking.anxiety}</h5>
                                <h5>{props.dataBooking.stress}</h5>
                                <h5>{props.dataBooking.problem_type}</h5>
                            </div>
                            </div>
                        
                        </div>
                        <Formik
                            enableReinitialize
                            validateOnChange={false}
                            validateOnBlur={false}
                            initialValues={{                            
                                appointments_id: props.dataBooking.appointments_id,
                                datetime: moment(props.dataBooking.date).format('YYYY-MM-DD'),
                                time: props.dataBooking.time
                            }}
                            onSubmit={onSubmit}>
                            {(form) =>(
                                <form className='space-y-6' onSubmit={form.handleSubmit}>
                                    
                                    <div>
                                    <input type="hidden" name="appointment_id" value={form.values.appointments_id} />
                                    <label className='text-xs'>Booking time </label>
                                        <div className='flex'>
                                            <input type='date' value={form.values.datetime} onChange={form.handleChange} onBlur={form.handleBlur} name='datetime' id='datetime' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5' required/>
                                            <Datetime 
                                                id="dateFrom"
                                                name="time"
                                                className='ml-2 rounded-lg border border-gray-300'
                                                value={form.values.time} 
                                                onChange={(value) => form.setFieldValue("time", moment(value).format("hh:mm A"))} 
                                                onBlur={form.handleBlur}
                                                dateFormat={false}
                                                timeConstraints={timeConstraints} 
                                                />
                                            {/* <input type='time' step="300" value={form.values.datetime} onChange={form.handleChange} onBlur={form.handleBlur} name='datetime' id='datetime' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5' required/> */}
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-2'>
                                    <button onClick={() => setReject(true)} className='w-1/2 border font-medium rounded-lg text-sm px-4 py-1 text-center'>
                                        Reject
                                    </button>
                                    <button type='submit' className='w-1/2 text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-800 font-medium rounded-lg text-sm px-4 py-1 text-center'>
                                        Accept
                                    </button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                        

                        </div>
                    </div>
                    </div>
                </div>

                <div className='bg-black bg-opacity-50 fixed inset-0 z-20'></div>
            </>
        }
    </>
  )
}
