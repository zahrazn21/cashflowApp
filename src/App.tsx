import { Route, Routes } from "react-router-dom";
import "./App.css";
import StartPage from "./pages/StartPage";
import SignUp from "./pages/ParentSignUp";
import CostRegistration from "./pages/CostRegistration";
import "flowbite";
import LoginPage from "./pages/LoginPage";
import ChildSignUp from "./pages/ChildSignUp";
import ParentLogin from "./pages/ParentLogin";
import ChildLogin from "./pages/ChildLogin";
import DetailsPage from "./pages/DetailsPage";
import { useLocation } from "react-router-dom";

import Header from "./components/ui/header";
import Dashboard from "./pages/ChildDashboard";
import { AppProvider } from "./components/ui/AppContext";
import GoalPage from "./pages/GoalPage";
import TranPage from "./pages/TrainPage";
import AddUser from "./components/ParentDashboard/AddUsers/AddUser";
import ParentDashboard from "./pages/ParentDashboard";
import ParentHeader from "./components/ui/ParentHeader";
import { ChildProvider } from "./components/ParentDashboard/AddUsers/ChildProvider";

function App() {
  const location = useLocation();
  const showHeaderPaths = [
    { link: "/cost", name: " ثبت هزینه" },
    { link: "/Details", name: "جزییات" },
    { link: "/dashboardChild", name: "داشبورد" },
    { link: "/goals", name: "اهداف" },
    { link: "/train", name: "آموزش" },
  ];
  const shouldShowHeader = showHeaderPaths.find(
    (res) => res.link === location.pathname
  );
  const showHeaderPathsParent = [
    { link: "/parentDashboard", name: "داشبورد" },
    { link: "/addChild", name: "افزودن فرزند" },
  ];
  const shouldShowHeaderParent = showHeaderPathsParent.find(
    (res) => res.link === location.pathname
  );

  return (
    <>
      <AppProvider>
        <div className="flex justify-center w-screen h-screen bg-gray-700 top-0 left-0 fixed">
          <div className="h-full bg-[oklch(0.96_0_0)] w-[450px]  flex items-center justify-center">
            {shouldShowHeader && (
              <Header showHeaderPaths={showHeaderPaths}></Header>
            )}

            <Routes>
              <Route path={"/"} element={<StartPage></StartPage>}></Route>
              {/* <Route path="/login" element={<Login></Login>}></Route> */}
              <Route path="/rigester" element={<SignUp></SignUp>}></Route>
              <Route
                path="/cost"
                element={<CostRegistration></CostRegistration>}
              ></Route>
              <Route
                path="/LoginPage"
                element={<LoginPage></LoginPage>}
              ></Route>
              <Route
                path="/LoginChild"
                element={<ChildLogin></ChildLogin>}
              ></Route>
              <Route
                path="/ChildSignUp"
                element={<ChildSignUp></ChildSignUp>}
              ></Route>
              <Route
                path="/LoginParent"
                element={<ParentLogin></ParentLogin>}
              ></Route>
              <Route
                path="/Details"
                element={<DetailsPage></DetailsPage>}
              ></Route>
              <Route
                path="/dashboardChild"
                element={<Dashboard></Dashboard>}
              ></Route>
              <Route path="/goals" element={<GoalPage></GoalPage>}></Route>
              <Route path="/train" element={<TranPage></TranPage>}></Route>
              <Route path="/addChild" element={<AddUser></AddUser>}></Route>
            </Routes>
            <ChildProvider>
              {shouldShowHeaderParent && (
                <ParentHeader
                  showHeaderPaths={showHeaderPathsParent}
                ></ParentHeader>
              )}
              <Routes>
                <Route
                  path="/parentDashboard"
                  element={<ParentDashboard></ParentDashboard>}
                ></Route>
              </Routes>
            </ChildProvider>
          </div>
        </div>
      </AppProvider>
    </>
  );
}

export default App;
