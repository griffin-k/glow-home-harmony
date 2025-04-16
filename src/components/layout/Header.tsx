import { Link } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";

const Header = () => {
  const logoSpring = useSpring({
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 280, friction: 20 },
    delay: 200,
  });

  return (
    <header className="sticky top-0 z-10 glass px-4 py-3 flex items-center justify-between mb-6 shadow-sm">
      {/* Left – LGU Logo */}
      <animated.div style={logoSpring} className="flex items-center">
        <Link to="/" className="w-12 h-12 sm:w-16 sm:h-16">
          <img
            src="https://student.lgu.edu.pk/Content/logo.png"
            alt="LGU Logo"
            className="w-full h-full object-contain"
          />
        </Link>
      </animated.div>

      {/* Center – Page Title */}
      <h1 className="text-xl sm:text-2xl font-bold text-smarthome-primary">
        Smart Conference Room
      </h1>

      {/* Right – DFRCS Logo */}
      <animated.div style={logoSpring} className="flex items-center">
        <Link to="/" className="w-24 sm:w-32 md:w-40">
          <img
            src="https://i.ibb.co/679S8m7f/DFRCS-LOG.png"
            alt="DFRCS Logo"
            className="w-full h-auto object-contain"
          />
        </Link>
      </animated.div>
    </header>
  );
};

export default Header;