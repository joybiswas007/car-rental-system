import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import RentACar from "./Components/RentACar";

const App = () => {
  return (
    <>
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/rent" element={<RentACar />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </>
  );
};

export default App;
