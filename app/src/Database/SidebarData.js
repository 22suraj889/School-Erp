import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Class Master",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add Subjects",
        path: "/class-master/add-subjects",
      },
      {
        title: "Add Optional Subjects",
        path: "/class-master/add-optional-subject",
      },
      {
        title: "Add class and sections",
        path: "/class-master/add-class-and-section",
      },
    ],
  },
  {
    title: "Teacher Master",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add Teacher",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Student Master",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add Student  Directly",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
      {
        title: "Add Student Application",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
      {
        title: "Peding Requests",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },

    ],
  },
  {
    title: "Transport Master",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add Stops with fees",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
      {
        title: "Add Vehicles",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
      {
        title: "Add Driver",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
      {
        title: "Locate driver or bus",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Staff Management",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add staff",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Assigning",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add driver",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Fee Structures",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add driver",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Exam Addition",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add driver",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Staff Attendance",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add driver",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Timetable",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add driver",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Timetable",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add driver",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Syllabus",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add driver",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Add Events/Holidays",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add driver",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Statical Reports",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add driver",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Send Notices",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add driver",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Expense Adding",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add driver",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Promote Students",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add driver",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
    ],
  },
];
