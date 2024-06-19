import { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";

const RecentProjects = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="py-20">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">Recent Projects</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-x-24 gap-y-8 mt-10">
        {projects.map((item) => (
          <a
            href={item.githubLink}
            target="_blank"
            key={item.id}
            rel="noopener noreferrer"
            className="project-link"
          >
            {isClient ? (
              <div
                className="sm:h-[41rem] h-[32rem] lg:min-h-[32.5rem] flex items-center justify-center sm:w-[570px] w-[80vw]"
              >
                <PinContainer title="Github" href="https://github.com/Aadesh098">
                  <div className="relative flex items-center justify-center sm:w-[570px] w-[80vw] overflow-hidden sm:h-[40vh] h-[30vh] mb-10">
                    <div
                      className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                      style={{ backgroundColor: "#13162D" }}
                    >
                      <img src="/bg.png" alt="bgimg" />
                    </div>
                    <img
                      src={item.img}
                      alt="cover"
                      className="z-10 absolute bottom-0"
                    />
                  </div>

                  <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                    {item.title}
                  </h1>

                  <p
                    className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                    style={{
                      color: "#BEC1DD",
                      margin: "1vh 0",
                    }}
                  >
                    {item.des}
                  </p>

                  <div className="flex items-center justify-between mt-7 mb-3">
                    <div className="flex items-center">
                      {item.iconLists.map((icon, index) => (
                        <div
                          key={index}
                          className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                          style={{
                            transform: `translateX(-${5 * index + 2}px)`,
                          }}
                        >
                          <img
                            src={icon}
                            alt={`icon${index}`}
                            className="p-2"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-center items-center">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center lg:text-xl md:text-xs text-sm text-purple"
                      >
                        Check Live Site
                        <FaLocationArrow
                          className="ms-3"
                          color="#CBACF9"
                        />
                      </a>
                    </div>
                  </div>
                </PinContainer>
              </div>
            ) : null}
          </a>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
