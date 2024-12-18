import "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Routing from "./Routing/Routing";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    // بنلف التطبيق كله بالـ Provider عشان نقدر نوصل للـ store من أي مكان
    <Provider store={store}>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ToastContainer />
        <Navbar />
        <SearchBar />
        <Routing />
        <Footer />
      </div>
    </Provider>
  );
};

export default App;