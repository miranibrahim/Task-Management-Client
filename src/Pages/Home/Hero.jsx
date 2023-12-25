import { Link } from "react-router-dom";
import heroBg from "../../assets/hero.png";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Hero = () => {
  const user = useContext(AuthContext);
  return (
    <div className="hero ">
      <div className="hero-content flex-col md:flex-row-reverse lg:justify-between">
        <img
          src={heroBg}
          className=" rounded-lg shadow-2xl mb-6 md:mb-0"
          alt="Hero Background"
        />
        <div className="text-center md:text-left px-5">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
            Task Management Hub!
          </h1>
          <p className="py-2 md:py-6 text-sm md:text-base lg:text-lg text-justify">
            Efficiently organize your tasks and boost productivity with our
            powerful task management system. Simplify your workflow, collaborate
            with your team, and stay on top of your projects effortlessly.
          </p>
          {user ? (
            <>
              <Link to="/dashboard">
                <button className="btn btn-primary text-sm md:text-base lg:text-lg">
                  Let’s Explore
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="btn btn-primary text-sm md:text-base lg:text-lg">
                  Let’s Explore
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
