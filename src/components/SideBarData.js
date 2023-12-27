import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import * as GoIcons from 'react-icons/go'

export const SideBarData = [
  {
    title: 'User',
    path: '/user',
    icon: <FaIcons.FaUserCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Posts',
    path: '/posts',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Organization',
    path: '/organization',
    icon: <GoIcons.GoOrganization />,
    cName: 'nav-text'
  },
  {
    title: 'Logout',
    path: '/logout',
    icon: <IoIcons.IoIosLogOut />,
    cName: 'nav-text'
  }
];