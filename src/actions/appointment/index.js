import { data } from "autoprefixer";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { baseUrl } from "src/config";
import { authAtom } from "src/recoil/auth";
import { initMixpanel } from "src/utils/mixpanel";
import request from "../../../lib/axios";
import { useCompany } from "../company";

const host = baseUrl + "mydesacare/counsellor/api";
const token = typeof window !== 'undefined' ? (localStorage.getItem("accessToken") ? localStorage.getItem("accessToken").replace(/^"(.*)"$/, '$1')  : '') : '';

const headers = {
    Token: token,
    crossDomain: true,
    "Access-Control-Allow-Origin": "*"
};

const useAppointment = (status,data) => {
  return useQuery(
    ["appointment",data],
    () => appointmenByStatus(status,data),
    { refetchOnWindowFocus: false }
  );
};

const appointmenByStatus = async (data,page) => {
  let status = data ? `&status=${data}` : '';
  let db_page = page ? `?_page=${page}` : '?_page=1';
  
  let res = await request({
    url: `${host}/booking_all${db_page}${status}`,
    method: "get",
    headers: headers
  });

  return res.data.data;
};

const useAppointmentAdmin = (status,data) => {
  return useQuery(
    ["appointment",data],
    () => appointmenByAdmin(status,data),
    { refetchOnWindowFocus: false }
  );
};

const appointmenByAdmin = async (data,page) => {
  let status = data ? `&status=${data}` : '';
  let db_page = page ? `?_page=${page}` : '?_page=1';
  
  let res = await request({
    url: `${host}/booking_all_admin${db_page}${status}`,
    method: "get",
    headers: headers
  });

  return res.data.data;
};

const useCountAppointment = () => {
  return useQuery(
    "dashboard_count",
    () => countAppointment(),
    { refetchOnWindowFocus: false }
  );
};

const countAppointment = async () => {
 
  let res = await request({
    url: `${host}/count_appointment`,
    method: "get",
    headers: headers
  });

  return res.data.data;
};

const useSessionAll = (appointments_id, $data) => {
  return useQuery(
    ["session_all", $data],
    () => SessionAll(appointments_id),
    { refetchOnWindowFocus: false }
  );
};

const SessionAll = async (data) => {
  let status = data ? `?appointments_id=${data}` : '';
  let res = await request({
    url: `${host}/list_session${status}`,
    method: "get",
    headers: headers
  });

  return res.data.data;
};

const useBookingUpdate = () => {
  const router = useRouter();
  return useMutation(updateBooking, {
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

const updateBooking = async (data_value) => {
  const new_v = data_value.dataBooking ? data_value.dataBooking : data_value; 
  try{
    let res = await request({
      url: `${host}/updt_booking`,
      method: "post",
      data: new_v,
      headers: headers
    });
    return res;
  } catch(err){
      console.log('err', err);
    throw err;
  }
};

const useBookingInvitation = () => {
  const router = useRouter();
  return useMutation(updateBookingInvitation , {
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

const updateBookingInvitation = async (data_value) => {
  try{
    let res = await request({
      url: `${host}/updt_booking_invitation`,
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

const useAllProfile = () => {
  return useQuery(
    "profileAll",
    () => allProfile(),
    { refetchOnWindowFocus: false }
  );
};

const allProfile = async () => {
  let res = await request({
    url: `${host}/profile_all`,
    method: "get",
    headers: headers
  });
  return res.data.data;
};

const useSessionAdd = () => {
  const router = useRouter();
  return useMutation(addSession, {
    onSuccess: (data) => {
      console.log('success', data);
    }
  });
};

const addSession = async (data_value) => {
  const new_v = data_value.dataBooking ? data_value.dataBooking : data_value; 
  try{
    let res = await request({
      url: `${host}/app_session`,
      method: "post",
      data: new_v,
      headers: headers
    });
    return res;
  } catch(err){
      console.log('err', err);
    throw err;
  }
};

const useSessionUpdate = () => {
  const router = useRouter();
  return useMutation(updateSession, {
    onSuccess: (data) => {
      console.log('success', data);
    }
  });
};

const updateSession = async (data_value) => {
  try{
    let res = await request({
      url: `${host}/updt_session`,
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

export { useAppointmentAdmin, useAppointment, useBookingUpdate, useBookingInvitation, useCountAppointment, useAllProfile, useSessionAll, useSessionAdd, useSessionUpdate};
