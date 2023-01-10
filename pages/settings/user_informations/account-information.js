import React, { useEffect, useState } from "react";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Link from "next/link";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useUser, getUInfo } from "src/actions/user";
import { useCompany } from "src/actions/company";
import { useRecoilValue } from "recoil";
import { useQueryClient } from "react-query";
import { CircularProgress } from '@mui/material';

import {
  TEXT_PROFILE_PHOTO,
  TEXT_SEARCH_COUNTRY,
  TEXT_PHONE_NUMBER,
  TEXT_PROFILE_PHOTO_PREVIEW,
  TEXT_UPLOAD_OR_DROP_FILE,
  TEXT_SAVE,
} from "src/utils/Text";

// import data
import { account_type } from "src/data/settings";
import { userAtom } from "src/recoil/user";
import { useProfile, useProfileUpdate } from "src/actions/settings";
import { CustomAlert } from "src/components/Alert";
import Admin from "src/layouts/Admin";
import { ToastContainer } from "react-toastify";

export default function AccountInformation() {
  const { t: t1 } = useTranslation("settings");
  const [accountType, setAccountType] = useState(0);
  function AccountType(accountType) {
    switch (accountType) {
      case 0:
        return "Personal Account";
      case 1:
        return "Business Account";
      default:
        break;
    }
  }

  const queryClient = useQueryClient();
  const customer = queryClient.getQueryData(["customerInfo"])

  const router = useRouter();
  const { data, isFetching } = useProfile();
  const { mutate, error, isError, isLoading: isButtonLoading } = useProfileUpdate();

  // const { userInfo } = useUser();
  // const { data } = useCompany();
  // const auth = useRecoilValue(authAtom);

  const onSubmit = async (values) => {
    console.log('data', values);
    // return false;
    await mutate(values);
  };

  return (
    <>
    <ToastContainer />

    {!isFetching 
    ? 
      <div className=" md:px-12 mx-auto">
        {/* <h3 className="flex items-center justify-center py-10 text-black font-bold text-4xl">
          
        </h3> */}
        {/* {isError && <CustomAlert message={error.message} type="error" />} */}
        <fieldset className="">
          <legend className="sr-only">Countries</legend>

          {accountType === 0 && (
            <div id="personal-account">
              <Formik
                enableReinitialize
                validateOnChange={false}
                validateOnBlur={false}
                initialValues={{
                  profilePic: "",
                  name: data?.data.profile.name,
                  email: data?.data.profile.email,
                  gender: data?.data.profile.gender,
                  marital_status : data?.data.profile.marital_status,
                  age: data?.data.profile.age,
                  phone_no: data?.data.profile.phone_no,
                  experience: data?.data.profile.experience,
                  expertise: data?.data.profile.expertise

                }}
                // validationSchema={Yup.object().shape({
                //   fullname: Yup.string().required(MESSAGE_NAME_REQUIRED),
                //   email: Yup.string()
                //     .email(MESSAGE_INVALID_EMAIL_ADDRESS)
                //     .required(MESSAGE_EMAIL_REQUIRED),
                //   password: Yup.string().required(MESSAGE_PASSWORD_REQUIRED),
                //   phoneNumber: Yup.string().required(MESSAGE_PHONE_NUMBER_REQUIRED),
                //   terms: Yup.bool().oneOf([true], "Field must be checked"),
                // })}
                onSubmit={onSubmit}>
                {(form) => (
                  <form onSubmit={form.handleSubmit}>
                    <p className="mb-4 pt-10 mx-4">
                      {/* {t1("content.accountInfo.profilePhoto")} */}
                    Profile Photo
                    </p>
                    <div className="flex flex-row items-center mb-5 mx-4">  
                      <img className="w-12 h-12 rounded-full shadow-lg" src={data?.data.profile.profile_img ? 'https://www.mydesa.my/v2/'+data?.data.profile.profile_img : 'https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg'}/>
                      {/* <button className="border-2 ml-6 j h-9 w-1/3 inline-flex justify-center align-middle content-center  py-2 px-3 text-xs font-semibold text-center text-white bg-white rounded-lg hover:bg-blue-800 focus:ring-4 dark:bg-primary dark:hover:bg-primary dark:focus:ring-blue-800">
                        <p className="text-center text-black">
                          {t1("content.accountInfo.upload")}
                        </p>
                      </button> */}
                      <div className="col-auto  ml-6 ">
                        {/* <p className="text-xs">
                          {t1("content.accountInfo.profilePhoto1")}
                          <br />
                          {t1("content.accountInfo.profilePhoto2")}
                        </p> */}
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <div className="mb-6 m-3 w-6/12">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-xs font-semibold text-gray-900 dark:text-gray-300">
                          {/* {t1("content.accountInfo.name")} */}
                          Name
                        </label>
                        <input
                          {...form}
                          id="name"
                          name="name"
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          type="name"
                          value={form.values.name}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Name"
                          required
                        />
                      </div>
                      <div className="mb-6  m-3 w-6/12">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-xs font-semibold text-gray-900 dark:text-gray-300">
                          {/* {t1("content.accountInfo.email")} */}
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={form.values.email}
                          placeholder="Email"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-row">
                      <div className="mb-6 m-3 w-6/12">
                          <label htmlFor="tabs" className="py-2 text-xs font-semibold">
                            Gender
                          </label>
                          <select
                            id="tabs"
                            name="gender"
                            onChange={form.handleChange}
                            value={form.values.gender}
                            className="w-full p-2.5 my-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                          </select>
                      </div>
                      <div className="mb-6  m-3 w-6/12">
                        <label
                          htmlFor="maritalstatus"
                          className="block mb-2 text-xs font-semibold text-gray-900 dark:text-gray-300">
                          Marital status
                        </label>
                        <select
                            id="tabs"
                            name="marital_status"
                            onChange={form.handleChange}
                            value={form.values.marital_status}
                            className="w-full p-2.5 my-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option >Select Mrital Status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Cohabitting">Cohabitting</option>
                          </select>
                      </div>
                    </div>

                    <div className="flex flex-row">
                      <div className="mb-6 m-3 w-6/12">
                        <label
                          htmlFor="age"
                          className="block mb-2 text-xs font-semibold text-gray-900 dark:text-gray-300">
                          Age
                        </label>
                        <input
                          {...form}
                          id="age"
                          type="age"
                          name="age"
                          onChange={form.handleChange}
                          value={form.values.age}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder=""
                          required
                        />
                      </div>
                      <div className="mb-6  m-3 w-1/2">
                        <label
                          htmlFor="phone"
                          className="block mb-2 text-xs font-semibold text-gray-900 dark:text-gray-300">
                          {" "}
                          {/* {t1("content.accountInfo.mobile")} */}
                          Mobile No
                        </label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-xs text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            +60
                          </span>
                          <input
                            type="text"
                            id="phone_no"
                            name="phone_no"
                            onChange={form.handleChange}
                            value={form.values.phone_no}
                            className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-xs border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                          />
                        </div>
                      </div>

                    </div>

                    <div className="py-4">
                      <div className="mb-6 py-4 px-2">
                        <div className=" w-full">
                          <label htmlFor="tabs" className="text-xs font-semibold">
                            Year of Experience
                          </label>
                          <select
                            id="tabs"
                            name="experience"
                            onChange={form.handleChange}
                            value={form.values.experience}
                            className="w-full my-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option >Select Year of Experience</option>
                            <option value="Beginer">1-3 Years</option>
                            <option value="Ameatur">1-6 Years</option>
                            <option value="Good">1-10 Years</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-6 py-4 px-2">
                        <div className=" w-full">
                          <label htmlFor="tabs" className="text-xs font-semibold">
                            Expertise Category
                          </label>
                          <select
                            id="tabs"
                            name="expertise"
                            onChange={form.handleChange}
                            value={form.values.expertise}
                            className="w-full my-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option >Select Expertise</option>
                            <option value="Peribadi">Peribadi</option>
                            <option value="Keluarga">Keluarga</option>
                            <option value="Kerjaya">Kerjaya</option>
                            <option value="Kesihatan mental">Kesihatan mental</option>
                            <option value="Ketagihan">Ketagihan</option>
                            <option value="Jenayah">Jenayah</option>
                          </select>
                        </div>
                      </div></div>
                    <hr className="my-2 h-5"></hr>

                    <div className="flex">
                      <button className="w-full h-10 mt-4  m-2 justify-center  py-2 px-3 text-xs font-semibold text-center text-white bg-primary rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-primary dark:hover:bg-primary dark:focus:ring-blue-800">
                        <p className="text-center">
                          {/* {t1("content.save")} */}
                          Save
                        </p>
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          )}

        </fieldset>
      </div>
    : 
      <CircularProgress />
    }
     
    </>
  );
}
export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["settings"])),
    },
  };
}

