
import { ReactNode } from "react";
import { useSpring, animated } from "@react-spring/web";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const springs = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 280, friction: 20 },
  });

  return <animated.div style={springs}>{children}</animated.div>;
};

export default PageTransition;
