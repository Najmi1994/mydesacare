/* eslint-disable react/jsx-no-target-blank */
import Admin2 from "src/layouts/Admin2";
import React, { useEffect, useState } from "react";
// import { useTranslation } from "next-i18next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Link from "next/link";

import All from "./components/all";
import New from "./components/new";
import Accepted from "./components/Accepted";
import Inprogress from "./components/inprogress";
import Completed from "./components/completed";
import Cancelled from "./components/cancelled";
import Rejected from "./components/rejected";


import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { purple } from '@mui/material/colors';

import { useProfile } from "src/actions/settings";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#694BF1',
    },
  },
  typography: {
    button: {
      textTransform: "none",

    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function Appointments() {
  const { data:profile, isFetching:proFetch } = useProfile();

  function checking_profile(data){
    if(!data.data.profile.age || !data.data.profile.phone_no || !data.data.profile.marital_status || !data.data.profile.expertise || !data.data.profile.experience){
      window.location.href = '/settings';
    }
  }

  useEffect(() => {
    if(!proFetch){
      checking_profile(profile);
    }
  }); 

  const [showModal, setShowModal] = useState(false);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="px-4 md:px-10 mx-auto w-full min-h-screen">
        <div className="my-2 mx-0 bg-white rounded-md">
          {/* <div className="border-b">
            <div className="text-sm text-blue-600 text-left p-2 pb-1">
              Appointments
            </div>
          </div> */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <ThemeProvider theme={theme}>
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    textTransform: "lowercase"
                  }}>
                  <Tabs
                    defaultValue={0}
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    textColor="secondary"
                    indicatorColor="secondary"
                  >

                    <Tab
                      label="All"

                      {...a11yProps(0)}
                    />
                    <Tab
                      label="New"
                      {...a11yProps(1)}
                    />
                    <Tab
                      label="Accept"
                      {...a11yProps(2)}
                    />
                    <Tab
                      label="In-Progress"
                      {...a11yProps(3)}
                    />
                    <Tab
                      label="Completed"
                      {...a11yProps(4)}
                    />
                    <Tab
                      label="Cancelled"
                      {...a11yProps(5)}
                    />
                    <Tab
                      label="Rejected"
                      {...a11yProps(6)}
                    />

                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <All />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <New />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Accepted />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <Inprogress />
                </TabPanel>
                <TabPanel value={value} index={4}>
                  <Completed />
                </TabPanel>
                <TabPanel value={value} index={5}>
                  <Cancelled />
                </TabPanel>
                <TabPanel value={value} index={6}>
                  <Rejected />
                </TabPanel>
              </Box>
            </ThemeProvider>
          </div>

        </div>
      </div>
    </>
  );
}

Appointments.layout = Admin2;

// export async function getServerSideProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, [
//         "onboarding",
//         "addressbookpage",
//         "billingpage",
//         "components",
//         "homepage",
//         "importBulkOrder",
//         "integrationPage",
//         "multiPointOrder",
//         "orderDetailsPage",
//         "orderpage",
//         "pageWrapper",
//         "settings",
//         "topuppage",
//       ])),
//     },
//   };
// }
