import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="text-2xl bg-image h-screen w-full flex items-center justify-center">
      <form className="w-11/12 opacity-bg p-6 ">
        <div className="flex justify-between">
          <div className="flex flex-col mb-3 w-[48%]">
            <label className="text-base text-white mb-1">Firstname</label>
            <input
              type="text"
              className="px-3 text-base py-3 rounded-md bg-white border-none"
            />
          </div>
          <div className="flex flex-col mb-3 w-[48%]">
            <label className="text-base text-white mb-1">Lastname</label>
            <input
              type="text"
              className="px-3 text-base py-3 rounded-md bg-white border-none"
            />
          </div>
        </div>

        <div className="flex flex-col mb-3">
          <label className="text-base text-white mb-1">Email Address</label>
          <input
            type="text"
            className="px-3 text-base py-3 rounded-md bg-white border-none"
          />
        </div>
        <div className="flex flex-col mb-3 w-full">
          <label className="text-base text-white mb-1">Set</label>
          <div className="pr-3 w-full bg-white rounded-md">
            <select className="w-full px-3 text-base py-3 rounded-md bg-white border-none outline-none">
              <option>Choose your Set</option>
              <option value="1987-1992">1987-1992</option>
              <option value="1988-1993">1988-1993</option>
              <option value="1989-1994">1989-1994</option>
              <option value="1990-1995">1990-1995</option>
              <option value="1991-1996">1991-1996</option>
              <option value="1992-1997">1992-1997</option>
              <option value="1993-1998">1993-1998</option>
              <option value="1994-1999">1994-1999</option>
              <option value="1995-2000">1995-2000</option>
              <option value="1996-2001">1996-2001</option>
              <option value="1997-2002">1997-2002</option>
              <option value="1998-2003">1998-2003</option>
              <option value="1999-2004">1999-2004</option>
              <option value="2000-2005">2000-2005</option>
              <option value="2001-2006">2001-2006</option>
              <option value="2002-2007">2002-2007</option>
              <option value="2003-2008">2003-2008</option>
              <option value="2004-2009">2004-2009</option>
              <option value="2005-2010">2005-2010</option>
              <option value="2006-2011">2006-2011</option>
              <option value="2007-2012">2007-2012</option>
              <option value="2008-2013">2008-2013</option>
              <option value="2009-2014">2009-2014</option>
              <option value="2010-2015">2010-2015</option>
              <option value="2011-2016">2011-2016</option>
              <option value="2012-2017">2012-2017</option>
              <option value="2013-2018">2013-2018</option>
              <option value="2014-2019">2014-2019</option>
              <option value="2015-2020">2015-2020</option>
              <option value="2016-2021">2016-2021</option>
              <option value="2017-2022">2017-2022</option>
              <option value="2018-2023">2018-2023</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col mb-3">
          <label className="text-base text-white mb-1">Password</label>
          <input
            type="password"
            className="px-3 text-base py-3 rounded-md bg-white border-none"
          />
        </div>
        <div className="py-2 rounded-md mt-2 bg-[#1560bd] flex items-center w-1/4 justify-center">
          <button className="text-base m-0 text-white ">Register</button>
        </div>

        <div className="flex justify-between mt-4">
          <Link to="/login" className="text-base text-white">
            Login
          </Link>
          <Link to="" className="text-base text-white">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
