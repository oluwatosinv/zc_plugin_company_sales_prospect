import React, { useState } from "react";
import Input from "../components/Input";
import Select from "../components/Select";
import HomeCard from "../components/HomeCard";
import Founder from "../components/svg/Manager _Flatline.svg";
import Salesman from "../components/svg/Salesman_Flatline.svg";
import Executive from "../components/svg/Businessman _Flatline.svg";
import Saleswoman from "../components/svg/Businesswoman_Flatline.svg";
import Manager from "../components/svg/Businessmen _Flatline.svg";
import Others from "../components/svg/Watermelon_Flatline.svg";
import Supervisor from "../components/svg/Startup_Flatline.svg";
import Loader from "../components/svg/Loader.svg";
import "../App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import OnboardCompany from "../context/OnboardingContext";

const schema = yup.object().shape({
  company: yup.string().required(),
  position: yup.string().required(),
  sector: yup.string().required(),
});


function Home(props) {
  const [pageOne, setpageOne] = useState(true);
  const [showLoader, setshowLoader] = useState(false);
  const { register,handleSubmit, formState: { errors }, } = useForm({resolver: yupResolver(schema)});

  const showPageTwo = () => {
    setpageOne(false);
  };

  const handleClickOthers = () => {
    document.getElementById("others-input").style.display = "block";
    document.getElementById("others-line").style.display = "block";
  }

  const handleClick = () => {
    document.getElementById("others-input").style.display = "none";
    document.getElementById("others-line").style.display = "none";
  }

  const onSubmit = (details) => {
    OnboardCompany(details)
    .then((res)=>{
      console.log(res)
    })
    .catch((error)=>{
      console.error(error)
    })
  };

  // const handleClickMobile = () => {
  //   onSubmit
  //   setshowLoader(true);
  //   setTimeout(() => {
  //     props.history.push("/NoProspectsFound");
  //   }, 3000);
  // };

  return showLoader ? (
    <div>
      <img src={Loader} alt="loader" className="animate-spin" id="loader" />
      <h2 className="font-medium text-2xl text-black-500 text-center">
        Setting up your account
      </h2>
      <br />
      <p className="text-base text-gray-400 text-center">Please wait a while</p>
    </div>
  ) : (
    <div>
      {pageOne ? (
        <form className="flex flex-col w-6/7 mx-auto md:w-1/3 p-5 mt-10 box-xs" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="font-bold text-xl md:text-2xl text-black-500 text-left">
            Sales Managment Just Got Easier!
          </h2>
          <br />
          <p className="text-base text-gray-400 text-left">
            Start by setting up your company’s personal details on Zuri Sales
            Prospect Plugin
          </p>
          <br />

          <div>
            <Input
              title="company"
              label="Company Name"
              placeholder="Type your company name"
              register={register} 
              required
            />
            <p className="text-red-500 text-xs mb-2 -mt-3 capitalize">{errors.company?.message}</p>

            <Select
              title="sector"
              label="What sector is your company into?"
              register={register} 
              required
            >
              <option disabled selected value="">
                Select Sector
              </option>
              <option>Technology</option>
              <option>Education</option>
              <option>Engineering</option>
              <option>Art</option>
              <option>Business</option>
              <option>Real estate</option>
            </Select>
            <p className="text-red-500 text-xs mb-2 -mt-3 capitalize">{errors.sector?.message}</p>

            <Select
              title="position"
              label="What is your position?"
              register={register} 
              required
            >
              <option disabled selected value="">
                Select position
              </option>
              <option>Executive</option>
              <option>Sales Man</option>
              <option>Sales woman</option>
              <option>Founder</option>
              <option>Manager</option>
              <option>Supervisor</option>
              <option>Others</option>
            </Select>
            <p className="text-red-500 text-xs mb-2 -mt-3 capitalize">{errors.position?.message}</p>

            <div className="flex justify-end">
              <button
                className="hidden w-36 bg-primary p-3 text-white rounded-sm border-primary md:block hover:bg-green-300"
                onClick={showPageTwo}
              >
                Continue
              </button>

              <button
                type="submit"
                className=" block w-36 bg-primary p-3 text-white rounded-sm border-primary md:hidden  hover:bg-green-300"
              >
                Setup
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="md:flex flex-col w-4/5 mx-auto p-5 hidden">
          <h2 className="font-medium text-xl md:text-2xl text-black-500 text-center">
            What do you do at Zuri?
          </h2>
          <br />
          <p className="text-base text-gray-400 text-center">
            We will use this to personalize your Sales Prospect experience
          </p>
          <br />
          <div className="flex flex-row flex-wrap justify-around content-start w-6/7">
            <HomeCard
              src={Executive}
              text="Executive"
              id="Executive"
              handleClick={handleClick}
            />
            <HomeCard
              src={Salesman}
              text="Sales Man"
              id="Salesman"
              handleClick={handleClick}
            />
            <HomeCard
              src={Saleswoman}
              text="Sales Woman"
              id="Saleswoman"
              handleClick={handleClick}
            />
            <HomeCard
              src={Founder}
              text="Founder"
              id="Founder"
              handleClick={handleClick}
            />
            <HomeCard
              src={Manager}
              text="Manager"
              id="Manager"
              handleClick={handleClick}
            />
            <HomeCard
              src={Supervisor}
              text="Supervisor"
              id="Supervisor"
              handleClick={handleClick}
            />
            <HomeCard
              src={Others}
              text="Others"
              id="Others"
              handleClick={handleClickOthers}
            />
            <div className="others-box">
              <input className="border  border-none mt-20 outline-none h-12  w-full" type="text" placeholder="Type in your position" id="others-input" />
              <hr className="border-gray-500" id="others-line" />
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
