import { link } from "fs";

export const navItems = [
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Resume", link: "https://avs-resume.tiiny.site/"},
    { name: "Coursework", link: "#coursewok" },
    { name: "Contact", link: "#contact" },
  ];
  
  export const gridItems = [
    {
      id: 1,
      title: "I aim to serve my technical expertise to positively impact my Society",
      description: "",
      className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
      imgClassName: "w-full h-full",
      titleClassName: "justify-end",
      img: "/b1.svg",
      spareImg: "",
    },
    {
      id: 2,
      title: "I'm very flexible in learning new technologies",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "",
      spareImg: "",
    },
    {
      id: 3,
      title: "My tech stack",
      description: "I constantly try to improve",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-center",
      img: "",
      spareImg: "",
    },
    {
      id: 4,
      title: "Tech enthusiast with a passion for Development",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "/grid.svg",
      spareImg: "/b4.svg",
    },
  
    {
      id: 5,
      title: "Currently building an Event's Organization App",
      description: "The Inside Scoop",
      className: "md:col-span-3 md:row-span-2",
      imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
      titleClassName: "justify-center md:justify-start lg:justify-center",
      img: "/b5.svg",
      spareImg: "/grid.svg",
    },
    {
      id: 6,
      title: "Do you wish to start a project together?",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-center md:max-w-full max-w-60 text-center",
      img: "",
      spareImg: "",
    },
  ];
  
  export const projects = [
    {
      id: 1,
      title: "Athenia",
      des: "A Real-Time Collaborative Visual Workspace for Teams and Organizations. Go from brainstorming to execution, all in one place.",
      img: "/p3.png",
      iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/convex.png", "/c.svg"],
      link: "https://athenia-aws.vercel.app/",
      githubLink:"https://github.com/Aadesh098/celestia"
    },
    {
      id: 2,
      title: "Celestia * Sync",
      des: "A Sophisticated Event Organization and Video Conferencing Web Application built using Nextjs. Supercharge your organization's events with our platform. Showcase your events and amplify your reach within our global community.",
      img: "/p1.png",
      iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/stream.svg", "/c.svg"],
      link: "https://celestia-azure.vercel.app/",
      githubLink:"https://github.com/Aadesh098/celestia"
    },
    {
      id: 3,
      title: "Horizon",
      des: "A Scalable Centralized Banking and Finance Management Web Application built using Nextjs. Track Finances, Transfer Funds, Connect Multiple Bank Accounts, Accesss Transaction History and much more ",
      img: "/p2.png",
      iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/dwolla.svg", "/plaid.jpeg"],
      link: "https://horizon-aws.vercel.app/sign-in",
      githubLink:"https://github.com/Aadesh098/horizon"
    },
    {
      id: 4,
      title: "Urja Website",
      des: "Thapar Institute of Engineering and Technology Sports Festival - Urja Official Website 2023",
      img: "/p4.png",
      iconLists: ["/re.svg", "/tail.svg", "/js.svg", "/fb.svg", "/three.svg"],
      link: "https://urja2023.vercel.app/",
      githubLink:"https://github.com/Aadesh098/urja2023"
    },
  ];
  
  export const coursewok = [
    { 
      name: "Semester - 1",
      subject1:
        "Electrical and Electronics Engineering (UES013) - 9",
        subject2:
        "Computer Programming (UTA003) - 9",
        subject3:
        "Mathematics-1 (UMA010) - 9",
        subject4:
        "Mechanics (UES009) - 9",
        subject5:
        "Energy and Environment (UEN002)- 9",
        subject6:
        "Applied Chemistry (UCB008) - 7",
      cg: "8.6 / 10",
      sg: "8.6 / 10",
    },
    { 
      name: "Semester - 2",
      subject1:
      "Object Oriented Programming (UTA018) - 10",
      subject2:
      "Professional Communication (UHU003) - 10",
      subject3:
      "Manufacturing Processes (UTA026) - 10",
      subject4:
      "Engineering Drawing (UTA015) - 9",
      subject5:
      "Applied Physics (UPH004) - 9",
      subject6:
      "Mathematics - 2 (UMA004) - 8",
      cg: "9.3 / 10",
      sg: "9.0 / 10",
    },
    {  
      name: "Semester - 3",
      subject1:
      "Operating Systems (UCS303) - 10",
      subject2:
      "Computer Architecture and Organization (UCS510) - 10",
      subject3:
      "Discrete Mathematical Structures (UCS405) - 10",
      subject4:
      "Data Structures and Algorithms (UCS301) - 9",
      subject5:
      "Numerical Analysis (UMA011) - 9",
      subject6:
      "Experimental Learning Activity - NA",
      cg: "9.2 / 10",
      sg: "9.6 / 10",
    },
    { 
      name: "Semester - 4",
      subject1:
        "Database Management Systems (UCS310) - 10",
        subject2:
        "Software Engineering (UCS503) - 10",
        subject3:
        "Computer Networks (UCS414) - 10",
        subject4:
        "Artificial Intelligence (UCS411) - 10",
        subject5:
        "Design and Analysis of Algorithms (UCS415) - 9",
        subject6:
        "Optimization Techniques (UMA035) - 9",
      cg: "9.3 / 10",
      sg: "9.6 / 10",
    },
    { 
      name: "Semester - 5",
      subject1:
        "Network Programming (UCS413) - 10",
        subject2:
        "Machine Learning (UML501) - 9",
        subject3:
        "UI / UX Specialist (UCS542) - 9",
        subject4:
        "Introduction to Corporate Finance (UHU018) - 9",
        subject5:
        "Probability and Statistics (UCS410) - 8",
        subject6:
        "Cloud Computing (UCS531) - 8",
      cg: "9.2 / 10",
      sg: "8.8 / 10",
    },
    { 
      name: "Semester - 6",
      subject1:
        "Database Engineering (UCS677) - 10",
        subject2:
        "Computer Graphics (UCS505) - 10",
        subject3:
        "Quantum Computing (UCS619) - 9",
        subject4:
        "Test Automation (UCS662) - 9",
        subject5:
        "Theory of Computation (UCS701) - 8",
        subject6:
        "Experiental Learning Activity - NA",
      cg: "9.2 / 10",
      sg: "9.2 / 10",
    },
  ];
  
  export const companies = [
    {
      id: 1,
      name: "cloudinary",
      img: "/cloud.svg",
      nameImg: "/cloudName.svg",
    },
    {
      id: 2,
      name: "appwrite",
      img: "/app.svg",
      nameImg: "/appName.svg",
    },
    {
      id: 3,
      name: "HOSTINGER",
      img: "/host.svg",
      nameImg: "/hostName.svg",
    },
    {
      id: 4,
      name: "stream",
      img: "/s.svg",
      nameImg: "/streamName.svg",
    },
    {
      id: 5,
      name: "docker.",
      img: "/dock.svg",
      nameImg: "/dockerName.svg",
    },
  ];
  
  export const workExperience = [
    {
      id: 1,
      title: "Urja, Tiet (Thapar's Annual Sports Fest)",
      desc: "Excecutive Board - Led a team of 300 students to successfully organize one of India’s premier sporting festivals.",
      className: "md:col-span-2",
      thumbnail: "/exp1.png",
      link:"https://www.instagram.com/urja.tiet/"
    },
    {
      id: 2,
      title: "Creative Computing Society (Coding Student Cell)",
      desc: " Excecutive Member - Organized various Tech events including tech hackathons, guest seminars, speaker sessions, etc.",
      className: "md:col-span-2",
      thumbnail: "/exp4.svg",
      link:"https://www.instagram.com/ccs_tiet/"
    },
    {
      id: 3,
      title: "Markfin, Tiet (Finance Student Cell)",
      desc: "Core Member - Led and Organized over 10 Finance events including Investment Workshops, Speaker Sessions, etc.",
      className: "md:col-span-2",
      thumbnail: "/exp4.png",
      link:"https://www.instagram.com/markfin.tiet/"
    },
    {
      id: 4,
      title: "Rotaract Club Tiet (Social Welfare Student Cell)",
      desc: "Excecutive Member - Organized over 15 Welfare events including Awareness workshops, Blood Donation camps, etc.",
      className: "md:col-span-2", // change to md:col-span-2
      thumbnail: "/exp2.png",
      link:"https://www.instagram.com/rotaractclubtiet/"
    },
  ];
  
  export const socialMedia = [
    {
      id: 1,
      img: "/link.svg",
      link:"https://www.linkedin.com/in/aadeshvir-singh-055427212/"
    },
    {
      id: 2,
      img: "/git.svg",
      link : "https://github.com/Aadesh098"
    },
    {
      id:3,
      img:"/ig.svg",
      link:"https://www.instagram.com/aadesh_001/"
    }
  ];

  export const technologies = [
    {
      name:"C++",
      icon:"/cpp.svg"
    },
    {
      name:"HTML",
      icon:"/html.png"
    },
    {
      name:"CSS",
      icon:"/css.png"
    },
    {
      name:"Javascript",
      icon:"/js.svg"
    },
    {
      name:"ReactJs",
      icon:"/react.png"
    },
    {
      name:"NextJs",
      icon:"/nextjs.png"
    },
    {
      name:"MongoDb",
      icon:"/mongo.svg"
    },
    {
      name:"NodeJs",
      icon:"/node.png"
    },
    {
      name:"Tailwind",
      icon:"/twcss.png"
    },
    {
      name:"ThreeJs",
      icon:"/three.svg"
    },
    {
      name:"Dwolla",
      icon:"/dwolla.svg"
    },
    {
      name:"Appwrite",
      icon:"/appw.svg"
    },
    {
      name:"Github",
      icon:"/gith.svg"
    },
    {
      name:"Postman",
      icon:"/post.svg"
    },
  ]