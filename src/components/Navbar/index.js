import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";

export default function Navbar() {
  return (
    <div className="fixed z-10">
      <div className="">
        <Link to="/">
          <div className="m-3 md:m-5" md={7} sm={12}>
            <div className="text-center">
              <div>
                <img
                  src={`/assets/images/icon.png`}
                  alt="Bible"
                  className="w-16 sm:w-20 xl:w-24"
                />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
