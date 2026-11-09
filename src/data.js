import {
  BriefcaseBusiness, CalendarCheck, Code2, Database, FileText, GraduationCap, Handshake,
  Headset, HeartHandshake, MessagesSquare, Table2, UserPlus, UserSearch, Users,
} from "lucide-react";
import {
  SiAndroidstudio, SiBootstrap, SiC, SiCplusplus, SiCss, SiExpress, SiFigma,
  SiFlutter, SiGithub, SiHtml5, SiJavascript, SiJupyter, SiMongodb,
  SiNodedotjs, SiPostman, SiPython, SiReact, SiUbuntu,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

export const highlights = [
  { title: "Recruitment & Talent Coordination", text: "People-first support for organised, welcoming teams.", icon: UserSearch },
  { title: "Event & Programme Management", text: "Planning, coordination, and calm delivery from start to finish.", icon: CalendarCheck },
  { title: "Communication & Stakeholder Management", text: "Clear communication across teams, communities, and events.", icon: MessagesSquare },
];

// VERIFY THESE QUALITATIVE LEVELS with Manahil; the CV does not state skill percentages.
export const peopleSkills = [
  ["Recruitment and Talent Coordination", UserSearch, "Proficient"],
  ["Employee Onboarding Support", UserPlus, "Working knowledge"],
  ["Event and Programme Management", CalendarCheck, "Advanced"],
  ["Communication and Stakeholder Management", MessagesSquare, "Advanced"],
  ["Data Management and HRIS Aptitude", Table2, "Working knowledge"],
  ["Conflict Resolution and Team Facilitation", Handshake, "Proficient"],
  ["Training and Development Support", GraduationCap, "Working knowledge"],
  ["CSR and Welfare Initiatives", HeartHandshake, "Proficient"],
];

// VERIFY THESE TECHNICAL LEVELS with Manahil; the CV names these tools but does not rate proficiency.
export const technicalSkills = [
  ["Flutter", SiFlutter, "Working knowledge"],
  ["React.js", SiReact, "Working knowledge"],
  ["Node.js", SiNodedotjs, "Working knowledge"],
  ["MongoDB", SiMongodb, "Working knowledge"],
];

export const toolGroups = [
  { title: "Languages", items: [["C++", SiCplusplus], ["C", SiC], ["Python", SiPython], ["JavaScript", SiJavascript], ["HTML5", SiHtml5], ["CSS3", SiCss]] },
  { title: "Frameworks & Libraries", items: [["React.js", SiReact], ["Node.js", SiNodedotjs], ["Express.js", SiExpress], ["Flutter", SiFlutter], ["Bootstrap 5", SiBootstrap]] },
  // FileText is used as the documented generic database icon for Oracle 11g; react-icons has no Oracle mark in this installed version.
  { title: "Databases", items: [["MongoDB", SiMongodb], ["SQL", Database], ["Oracle 11g", FileText]] },
  // FileText represents MS Visio and BriefcaseBusiness is used as a neutral MS 365 mark (no matching Simple Icon is installed).
  { title: "Tools & Platforms", items: [["GitHub", SiGithub], ["Figma", SiFigma], ["Android Studio", SiAndroidstudio], ["VS Code", VscVscode], ["Postman", SiPostman], ["Jupyter Notebook", SiJupyter], ["Ubuntu", SiUbuntu], ["MS Visio", FileText], ["MS 365", BriefcaseBusiness]] },
];

export const experience = [
  ["Event Management Co-Head", "Daira — National Event", "Led event management coordination and supported the delivery of a national event."],
  ["General Secretary", "Silent Steps Welfare Society", "Coordinated society activities and supported welfare-focused initiatives."],
  ["Social Media Head", "E-Gaming Society", "Managed social media communication for the society and its activities."],
  ["Social Media Co-Head", "Photography Society", "Worked collaboratively on the society’s social media presence."],
  ["CS Instructor Internee", "Teaching experience", "Supported learners through computer science instruction."],
  ["Team Member", "Rung Society", "Contributed as part of a student society team."],
];

export const projects = [
  ["INDIELIFE", "Flutter · MongoDB · REST APIs", "A mobile application project built with Flutter, MongoDB, and REST APIs."],
  ["E-Commerce Shopping Website", "Node.js · JavaScript · Bootstrap", "An e-commerce website created with a JavaScript and Node.js stack."],
  ["Hospital Management System", "C# · Oracle 11g", "A hospital management system developed with C# and Oracle 11g."],
  ["Flex Management LMS", "Object-oriented programming", "A learning management system project applying OOP principles."],
];

export const services = [
  ["HR and onboarding support", Users],
  ["Customer support and communication", Headset],
  ["Event and programme coordination", CalendarCheck],
  ["Data and records management", Database],
  ["Full-stack and mobile development", Code2],
];
