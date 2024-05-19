import { Header } from "../components";

const Main = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Main;
