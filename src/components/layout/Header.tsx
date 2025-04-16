
import { Link } from "react-router-dom";
import { User, Home } from "lucide-react";
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
      <animated.div style={logoSpring}>
        <Link to="/" className="flex items-center gap-2 text-2xl font-semibold text-smarthome-primary">
          <Home className="w-6 h-6" />
          <span>Smart Home Dashboard</span>
        </Link>
      </animated.div>
      <div className="flex items-center">
        <button className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-white/50 transition-all duration-300">
          <User className="w-6 h-6 text-smarthome-primary" />
        </button>
      </div>
    </header>
  );
};

export default Header;
