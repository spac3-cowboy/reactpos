import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

import { Button, Dropdown } from "antd";

import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { RiFullscreenExitLine, RiFullscreenLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import BreadcrumbCustom from "./BreadcrumbCustom";

const toggler = [
  <svg
    width='20'
    height='20'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 448 512'
    key={0}
  >
    <path d='M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z'></path>
  </svg>,
];

function Header({ onPress, collapsed, handleCollapsed }) {
  useEffect(() => window.scrollTo(0, 0));

  const isLogged = localStorage.getItem("isLogged");
  const user = localStorage.getItem("user");

  const items = [
    {
      key: "1",
      label: (
        <p
          style={{ margin: 0, padding: "0.2rem 0.5rem" }}
          className='flex items-center p-0.5'
        >
          <UserOutlined style={{ fontSize: "16px" }} />{" "}
          <span className='logout-text font-weight-bold me-2 ms-1'>{user}</span>
        </p>
      ),
    },
    {
      key: "2",
      label: (
        <p
          style={{ margin: 0, padding: "0.2rem 0.5rem" }}
          className='flex items-center'
        >
          <Link to='/admin/auth/logout' className='flex items-center gap-[6px]'>
            <LogoutOutlined className=' text-red-500' />
            <span className='logout-text font-weight-bold'>Log Out</span>
          </Link>
        </p>
      ),
    },
  ];
  const [fullScreen, setFullScreen] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };
  const element = document.documentElement;

  const handleFullScreenClick = () => {
    setFullScreen(true);
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };
  const handleExitFullScreenClick = () => {
    setFullScreen(false);
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };
  useEffect(() => {
    if (isDarkMode) document.body.className = "dark-theme dark";
    if (!isDarkMode) document.body.className = "light-theme light";
  }, [isDarkMode]);

  useEffect(() => {
    document.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement) {
      } else {
        setFullScreen(false);
      }
    });
  }, []);
  return (
    <>
      <div className='flex w-full justify-between items-center pr-8 mr-4 py-1 bg-white dark:bg-[#1C1B20] md:mb-4'>
        <div className='relative flex items-center'>
          <div className='hidden md:flex dark:bg-transparent bg-[rgb(62,87,113)]/90 dark:border-gray-50 border-violet-500 hover:bg-violet-500 border-2 text-white absolute  -left-[38px] w-[33px] h-[33px] rounded-full justify-center items-center z-20'>
            {collapsed ? (
              <RightOutlined
                onClick={() => handleCollapsed(!collapsed)}
                className='text-lg cursor-pointer'
              />
            ) : (
              <LeftOutlined
                onClick={() => handleCollapsed(!collapsed)}
                className='text-lg cursor-pointer'
              />
            )}
          </div>
          {isLogged ? (
            <BreadcrumbCustom />
          ) : (
            <div>
              <h2
                className='text-black text-center ml-4 flex items-center justify-center gap-2'
                style={{ fontSize: "25px" }}
              >
                Innova
                <strong style={{ color: "#55F	", fontWeight: "bold" }}>
                  Inventory
                </strong>
              </h2>
            </div>
          )}
        </div>
        <div className='flex items-center m-[1rem] gap-4'>
          {fullScreen ? (
            <RiFullscreenExitLine
              onClick={handleExitFullScreenClick}
              size={22}
              className='cursor-pointer dark:text-white'
            />
          ) : (
            <RiFullscreenLine
              onClick={handleFullScreenClick}
              size={22}
              className='cursor-pointer dark:text-white'
            />
          )}
          {/* <DarkModeSwitch
            className="mx-[1rem]"
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={20}
          /> */}

          {isLogged && (
            <Button
              type='link'
              className='block md:hidden'
              onClick={() => onPress()}
              style={{ boxShadow: "none" }}
            >
              {toggler}
            </Button>
          )}

          {isLogged && (
            <Dropdown
              menu={{ items }}
              placement='bottomLeft'
              className='user-dropdown'
            >
              <UserOutlined style={{ fontSize: "20px" }} />
            </Dropdown>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
