import React from "react";
import { createPopper } from "@popperjs/core";
import { Spinner } from "src/components/Spinner";
import { useLogout } from "src/actions/auth";
import { authAtom } from "src/recoil/auth";
import { useRecoilValue } from "recoil";
import { CustomAlert } from "../Alert";
import { useTranslation } from "next-i18next";
import { useCommonHooks } from "src/hooks/translation/useCommonHooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useProfile } from "src/actions/settings";

const UserDropdown = () => {
  const { data } = useProfile();
  const { rightMenus } = useCommonHooks();
  const router = useRouter();
  const { mutate, isLoading, isError, error } = useLogout();
  const auth = useRecoilValue(authAtom);
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const onLogout = async () => {
    localStorage.clear();
    router.reload();
    router.push("/auth/login");
    // const {
    //   data: { companyId = "", refreshToken = "" },
    // } = auth;
    // const data = {
    //   companyId: companyId,
    //   refreshToken: refreshToken,
    // };
    // await mutate(data);
  };
  if (isLoading) return <Spinner />;
  if (isError) return <CustomAlert message={error.message} />;
  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}>
        <div className="items-center flex">
          <span className="w-8 h-8 text-xs text-black inline-flex items-center justify-center rounded-full">
            {/* <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"            
              src={data?.data?.profile?.profile_img ? 'https://staging.mydesa.my/v2/'+data?.data.profile.profile_img : '/img/team-1-800x800.jpg'}
            /> */}
            <i class="text-purple-600  fas fa-user-cog" />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }>
        {/* <Link href="/settings">
          <a
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
            // onClick={(e) => e.preventDefault()}
          >
            {rightMenus.yourProfile}
          </a>
        </Link> */}
        {auth?.data?.level_access == null ?
        <Link href="/settings">
          <a
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }>
            {rightMenus.settings}
          </a>
        </Link>
        : ''}

        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <a
          href="#sign-out"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={onLogout}>
          {rightMenus.logout}
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
