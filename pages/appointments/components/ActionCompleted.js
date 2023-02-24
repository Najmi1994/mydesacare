import Link from 'next/link';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useBookingUpdate, useSessionAdd, useSessionAll, useSessionUpdate } from 'src/actions/appointment';
import { CircularProgress } from '@material-ui/core';

export default function ActionCompleted(props) {
     const { mutate, error, isError, isLoading: isButtonLoading } = useBookingUpdate();

     const { mutate:setSession } = useSessionAdd();

     const { mutate:setSessionUpdate } = useSessionUpdate();
     
     const [change, setChange] = useState()
     const { data, isFetching } = useSessionAll(props.dataBooking.unique_link, change);

    //  console.log('steps',data?.steps);
// return false;
    async function setConfirm(values){
        values.dataBooking['next_status'] = '4';
        console.log('data', values);
        // return false;
        await mutate(values);
        props.onHandlerModal(false, []);
    }

    async function setNewSession(values, length){
        let len = length+1
        values.dataBooking['no_session'] = length+1;
        console.log('data', values);
        // return false;
        await setSession(values, {
            onSuccess: (data) => {
                setChange(len)
                // console.log('success', data);
            }
        });
        // props.onHandlerModal(false, []);
    }

    // const [message, setMessage] = useState('');

    // stepper timeline
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    function handleClick(i){
        setActiveStep(i);
    }

    // async function setAddress(id){
      
    //     if(message){
    //         handleNext();
    //         const new_data = {};
    //         new_data['id'] = id;
    //         new_data['note'] = message
    //         await setSessionUpdate(new_data);
    //     }else{
    //         console.log('nodata','notda');
    //     }
    //     // console.log('data baru', new_data);
    // }

    async function handleMessageChange(message,id,length){
        
        if(message){
            let len2 = message
            handleNext();
            const new_data = {};
            new_data['id'] = id;
            new_data['note'] = message;

            await setSessionUpdate(new_data, {
                onSuccess: (data) => {
                    setChange(len2)
                    // console.log('success', data);
                }
            });
        }else{
            console.log('nodata','notda');
        }
    };
   
  return (
   <>
    <div aria-hidden='true' className='overflow-y-auto overflow-x-hidden fixed top-40 right-0 left-20 z-40 w-full h-modal md:h-full'>
        <div className='mx-auto relative p-4 w-full max-w-md h-full md:h-auto'>
        <div className='relative bg-white rounded-lg shadow'>
            <button onClick={() => props.onHandlerModal(false, [])} type='button' className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'>
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd'></path>
            </svg>
            </button>
            <div className='py-6 px-6 lg:px-8'>
            <h3 className='mb-4 text-xl font-medium text-gray-900'>
                Timeline Session
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
                </div>
                </div>
              
            </div>
            {/* Stepper timeline content */}
            <div>
                <Box sx={{ maxWidth: 400 }}>
                {!isFetching ?
                    <>
                    <Stepper activeStep={activeStep} orientation='vertical'>
                        {data?.steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel optional={ index === data?.steps.length-1
                            ? 
                                (
                                <Typography variant='caption'>
                                    Last step
                                </Typography>
                                ) 
                            : 
                                null
                            }>
                            <div onClick={() => handleClick(index)} >{step.label}st Session</div>
                            </StepLabel>
                            <StepContent>
                            <Typography>
                                <textarea rows="6" onChange={(e) => e.target.value} onBlur={(e) => handleMessageChange(e.target.value,step.id)} className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>{step.description}</textarea>
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                                {/* <div>
                                    <Button variant='contained' onClick={() => setAddress(step.id)} sx={{mt: 1, mr: 1, color: 'purple', '&:hover': {  backgroundColor: '#694BF1', },}}> Add note
                                    </Button>
                                </div> */}
                                {/* <div>
                                    <Button variant='contained' onClick={() => setAddress(step.id)} sx={{mt: 1, mr: 1, color: 'purple', '&:hover': {  backgroundColor: '#694BF1', },}}> Delete note
                                    </Button>
                                </div> */}
                            </Box>
                            </StepContent>
                        </Step>
                        ))}
                    </Stepper>
                    </>
                : <CircularProgress />}
                {activeStep === data?.steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>
                        All steps completed - you&apos;re finished
                    </Typography>
                    {/* <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                    </Button> */}
                    </Paper>
                )}
                </Box>
                <hr />
                <div className='flex items-center gap-2 py-4'>
                    <button onClick={() => setNewSession(props, data?.steps.length)} className='w-1/2 border font-medium rounded-lg text-sm px-4 py-1 text-center'>
                        Add session
                    </button>
                    <button onClick={() => setConfirm(props)} className='w-1/2 text-white bg-green-400 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-1 text-center'>
                        Completed
                    </button>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>

    <div className='bg-black bg-opacity-50 fixed inset-0 z-20'></div>
   </>
  )
}

