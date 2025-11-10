import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
// 示例 UI 组件已隐藏 - 目前不需要
// import Videos from "./pages/UiElements/Videos";
// import Images from "./pages/UiElements/Images";
// import Alerts from "./pages/UiElements/Alerts";
// import Badges from "./pages/UiElements/Badges";
// import Avatars from "./pages/UiElements/Avatars";
// import Buttons from "./pages/UiElements/Buttons";
// import LineChart from "./pages/Charts/LineChart";
// import BarChart from "./pages/Charts/BarChart";
// Calendar 页面已隐藏 - 目前不需要
// import Calendar from "./pages/Calendar";
// import BasicTables from "./pages/Tables/BasicTables";
// import FormElements from "./pages/Forms/FormElements";
// import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            {/* Calendar 页面已隐藏 - 目前不需要 */}
            {/* <Route path="/calendar" element={<Calendar />} /> */}
            {/* Blank 页面已隐藏 - 示例页面，目前不需要 */}
            {/* <Route path="/blank" element={<Blank />} /> */}

            {/* Forms - 示例组件，已隐藏 */}
            {/* <Route path="/form-elements" element={<FormElements />} /> */}

            {/* Tables - 示例组件，已隐藏 */}
            {/* <Route path="/basic-tables" element={<BasicTables />} /> */}

            {/* Ui Elements - 示例组件，已隐藏 */}
            {/* <Route path="/alerts" element={<Alerts />} /> */}
            {/* <Route path="/avatars" element={<Avatars />} /> */}
            {/* <Route path="/badge" element={<Badges />} /> */}
            {/* <Route path="/buttons" element={<Buttons />} /> */}
            {/* <Route path="/images" element={<Images />} /> */}
            {/* <Route path="/videos" element={<Videos />} /> */}

            {/* Charts - 示例组件，已隐藏 */}
            {/* <Route path="/line-chart" element={<LineChart />} /> */}
            {/* <Route path="/bar-chart" element={<BarChart />} /> */}
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
