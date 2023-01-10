import request from "lib/axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { baseUrl } from "src/config";

const { useQuery, useMutation } = require("react-query");

const host = baseUrl + "mydesacare/counsellor/api";
const token = typeof window !== 'undefined' ? (localStorage.getItem("accessToken") ? localStorage.getItem("accessToken").replace(/^"(.*)"$/, '$1')  : '') : '';

const headers = {
    Token: token,
    crossDomain: true,
    "Access-Control-Allow-Origin": "*"
};

const useCountCounselor = () => {
    return useQuery(
        "count_counselor",
        () => counsellorCount(),
        { refetchOnWindowFocus: false }
    );
};

const counsellorCount = async () => {

    let res = await request({
        url: `${host}/counselor_count`,
        method: "get",
        headers: headers
      });
      console.log('ABC ', res.data.data);
      return res.data.data;
}

const useCounselorAdd = () => {
    const router = useRouter();
    return useMutation(counselorAdd , {
      onSuccess: (data) => {
        console.log('success', data);
         if(data?.data.response.response_code == '200'){
          toast(data?.data.response.response_message);
          // router.push('/settings');
          // console.log('success', data?.data.response.response_message);
        }else{
          toast(data?.data.response.response_message);
          // console.log('error', data?.data.response.response_message);
        }
        // router.push("/dashboard");
      }
    });
  };
  
const counselorAdd = async (data_value) => {
  try{
    let res = await request({
      url: `${host}/counselor_new`,
      method: "post",
      data: data_value,
      headers: headers
    });
    return res;
  } catch(err){
      console.log('err', err);
    throw err;
  }
};

const useCounselorUpdate = () => {
  const router = useRouter();
  return useMutation(counselorUpdate , {
    onSuccess: (data) => {
      console.log('success', data);
       if(data?.data.response.response_code == '200'){
        toast(data?.data.response.response_message);
        // router.push('/settings');
        // console.log('success', data?.data.response.response_message);
      }else{
        toast(data?.data.response.response_message);
        // console.log('error', data?.data.response.response_message);
      }
      // router.push("/dashboard");
    }
  });
};

const counselorUpdate = async (data_value) => {
try{
  let res = await request({
    url: `${host}/counselor_update`,
    method: "post",
    data: data_value,
    headers: headers
  });
  return res;
} catch(err){
    console.log('err', err);
  throw err;
}
};

const useCounselorDelete = () => {
  const router = useRouter();
  return useMutation(counselorDelete , {
    onSuccess: (data) => {
      console.log('success', data);
       if(data?.data.response.response_code == '200'){
        toast(data?.data.response.response_message);
        // router.push('/settings');
        // console.log('success', data?.data.response.response_message);
      }else{
        toast(data?.data.response.response_message);
        // console.log('error', data?.data.response.response_message);
      }
      // router.push("/dashboard");
    }
  });
};

const counselorDelete = async (data_value) => {
try{
  let res = await request({

    url: `${host}/delete_counselor?id=${data_value}`,

    method: "get",
    headers: headers
  });
  return res;
} catch(err){
    console.log('err', err);
  throw err;
}
};


export { useCountCounselor, useCounselorAdd, useCounselorUpdate, useCounselorDelete };