/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/react-in-jsx-scope */
// import React, { useState } from "react";

import { useState, useRef } from 'react';
import { useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

import {
  others_pages,
  sidebar_action,
  sidebar_pages,
} from 'src/data/sidebar.js';
import Link from 'next/link';
import { useCommonHooks } from 'src/hooks/translation/useCommonHooks';

// components

import AdminNavbar from 'src/components/Navbars/AdminNavbar.js';
import Sidebar from 'src/components/Sidebar/Sidebar.js';
import Sidebar2 from 'src/components/Sidebar/Sidebar2';
import FooterAdmin from 'src/components/Footers/FooterAdmin.js';
import { flex } from 'tailwindcss/defaultTheme';
import { useRouter } from 'next/router';
import { mobiletabs } from 'src/data/mobileTabs';

const drawerWidthOpen = 240;
const paddingIconButton = 10;
const marginIconButton = 14;
const iconFontSize = 20;
const drawerWidthClose =
  (paddingIconButton + marginIconButton) * 2 + iconFontSize;

export default function Admin({ children }) {
  const router = useRouter();

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const refFocus = useRef();
  const { newOrder, questionnaire, sidebarMenus } = useCommonHooks();

  const [selectedIndex, setSelectedIndex] = useState(false);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  function toogleOpen() {
    setOpen(!open);
  }

  function toogleOpenSearch() {
    setOpen(false);
    setTimeout(() => {
      refFocus.current.focus();
    }, 500);
  }

  const drawerContent = (
    <>
      <Box
        sx={{
          display: 'flex',
          // justifyContent: "space-between",
          // height: "42px",
          width: 'auto',
          backgroundColor: 'transparent',
          margin: '20px 14px',
          // padding: "15px 0px",
          // borderBottom: "1px solid lightgray",
          alignItems: 'flex-center',
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            display: open ? 'none' : { xs: 'none', sm: 'initial' },
            marginBottom: '9px',
          }}
        >
          {/* <Logo /> */}
        </Box>
        <Typography
          variant='h1'
          noWrap={true}
          // gutterBottom
          sx={{
            display: { xs: 'none', sm: 'initial', flex },
            // fontSize: "18px",
            // fontWeight: 600,
            color: 'lightgray',
            // width: "154px",
            // marginLeft: open ? "2px" : "8px",
            // paddingTop: "4px",
            paddingBottom: '0px',
          }}
        >
          <img src='/img/logo/MyDesaCare.svg' alt='MyDesa Care' className='' />
        </Typography>

        <Button
          onClick={toogleOpen}
          sx={{
            minWidth: 'initial',
            // padding: "10px 12px",
            // color: "red",
            borderRadius: '8px',
            // backgroundColor: open ? "transparent" : "transparent",
            // "&:hover": {
            //   backgroundColor: "#26284687",
            // },
          }}
        >
          <a className='text-primary'>
            <svg
              className='hidden md:block h-6 '
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16m-7 6h7'
              />
            </svg>
          </a>
        </Button>
      </Box>

      <ul>
        {sidebar_action.map(({ links, name, icons }) => (
          <li className='m-2' key={name}>
            <Link href={links}>
              <a
                className={`flex p-2 bg-fuchsia-200 rounded hover:bg-purple-400 cursor-pointer ${router.asPath ===
                  links && 'bg-purple-600 text-white'}`}
              >
                <span className='ml-1'>{icons}</span>
                <span className='ml-8'>{name}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
  return (
    <>
      <Box className='w-full' sx={{ display: 'flex' }}>
        <Drawer
          className='hidden md:block'
          variant='permanent'
          // open={open}
          sx={{
            width: open
              ? { xs: '0px', sm: drawerWidthClose }
              : { xs: drawerWidthClose, sm: drawerWidthOpen },
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: open
                ? theme.transitions.duration.leavingScreen
                : theme.transitions.duration.enteringScreen,
            }),
            '& .MuiDrawer-paper': {
              // justifyContent: "space-between",
              overflowX: 'hidden',
              width: open
                ? { xs: '0px', sm: drawerWidthClose }
                : { xs: drawerWidthClose, sm: drawerWidthOpen },
              // borderRight: '0px',
              // borderRadius: '0px 0 0 0px',
              boxShadow: theme.shadows[8],
              // backgroundColor: open ? "#0000FF" : "#0000FF",
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: open
                  ? theme.transitions.duration.leavingScreen
                  : theme.transitions.duration.enteringScreen,
              }),
            },
          }}
        >
          {drawerContent}
        </Drawer>
        <div
          className='w-full relative  bg-blueGray-100 px-0 m-h-screen'
          // style={{ marginLeft: "3rem" }}
        >
          {/* Mobile Nav */}
          <div className='md:hidden bg-white sticky top-0 z-50 w-full flex justify-between items-center py-2 px-2'>
            <div className=''>
              <img src='/img/logo/MyDesaCare.svg' alt='MyDesaCareLogo' />
            </div>
            {/* <Link href='settings'>
              <a className='flex items-center justify-center w-4 h-4 p-4 rounded-full bg-purple-200'>
                <i class='fas fa-user-cog p-2 text-xs ' />
              </a>
            </Link> */}
          </div>
          <AdminNavbar />
          {/* Header */}
          <div className='relative bg-bluelight-100 pb-32 '>
            {children}
          </div>
          {/* Mobile Tabs */}
          <div className='w-full md:hidden sticky bottom-0 '>
            <div className=' flex justify-center items-center md:hidden w-full sticky bottom-0 border rounded bg-white py-4 px-2 divide-x '>
              {mobiletabs.map(({ links, name, icons }) => (
                <Link href={links}>
                  <a
                    className='flex flex-col justify-center items-center w-1/2 py-2 px-2'>
                    <span className='flex items-center justify-center w-4 h-4 p-4 rounded-full bg-purple-200'>
                      {icons}
                    </span>
                    <h5 className='text-xs font-semibold py-2'>{name}</h5>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}
