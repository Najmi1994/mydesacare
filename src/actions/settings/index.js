import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/router";
import { baseUrl } from "src/config";
import request from "../../../lib/axios";

import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

const host = baseUrl + "mydesacare/counsellor/api";
const token = typeof window !== 'undefined' ? (localStorage.getItem("accessToken") ? localStorage.getItem("accessToken").replace(/^"(.*)"$/, '$1')  : '') : '';

const headers = {
    Token: token,
    crossDomain: true,
    "Access-Control-Allow-Origin": "*"
};

const useProfileUpdate = () => {
  const router = useRouter();
  return useMutation(updateProfile, {
    onSuccess: (data) => {
      if(data?.data.response.response_code == '200'){
        toast(data?.data.response.response_message);
        // router.push('/settings');
        // console.log('success', data?.data.response.response_message);
      }else{
        toast(data?.data.response.response_message);
        // console.log('error', data?.data.response.response_message);
      }
      // router.push("/dashboard");
    },
  });
};

const updateProfile = async (credentials) => {
    console.log('credentials',credentials)
  try {
    let res = await request({
      url: `${host}/profile_update`,
      method: "post",
      data: credentials,
      headers: headers
    });
    return res;
  } catch (err) {
    console.log("err", err);
    // throw new Error(error.message);
    throw err;
  }
};

const useProfile = (status) => {
  return useQuery(
    "profile",
    () => profileView(status),
    { refetchOnWindowFocus: false }
  );
};

const profileView = async (data) => {
  let res = await request({
    url: `${host}/profile_view`,
    method: "get",
    headers: headers
  });

  return res.data;
};

export { useProfile, useProfileUpdate };
