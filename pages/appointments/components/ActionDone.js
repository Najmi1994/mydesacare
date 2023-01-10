import { useState } from "react";
import { useSessionAll } from "src/actions/appointment";

export default function ActionDone(props) {
    console.log('test :', props);
    
    const { data, isFetching } = useSessionAll(props.dataBooking.unique_link);

    console.log('data is : ', data);
    return (
        <>
          <div
              aria-hidden='true'
              className='overflow-y-auto overflow-x-hidden fixed top-40 right-0 left-20 z-40 w-full h-modal md:h-full'>
              <div className='mx-auto relative p-4 w-full max-w-xl h-full md:h-auto'>
                <div className='relative bg-white rounded-lg shadow'>
                  <button
                    onClick={() => props.onHandlerModal(false, [])}
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
                      Completed Session
                    </h3>
                    {/* Stepper timeline content */}
                    <div>
                      <ol class='relative border-l border-gray-200 dark:border-gray-700'>
                        {data?.steps.map((step, index) => (
                            <li class='mb-10 ml-4' key={index}>
                              <span class='flex absolute -left-3 justify-center items-center w-6 h-6 text-white bg-purple-800 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900 mt-8'>
                                {step.label}
                              </span>
                              <time class='mb-1 ml-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
                                <p className="font-bold text-black mb-3">Description</p>
                                <p className="text-black">{step.description}</p>
                              </time>
                            </li>
                          )
                        )}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-black bg-opacity-50 fixed inset-0 z-20'></div>
        </>
    )

}
 