
import { ReactNode } from "react";
import Header from "./Header";
import PageTransition from "../animation/PageTransition";
import ConnectionStatus from "../dashboard/ConnectionStatus";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container px-4 md:px-6 mx-auto pb-12">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <ConnectionStatus />
    </div>
  );
};

export default Layout;
