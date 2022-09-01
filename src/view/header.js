import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import HomeClick from "../navComponent/HomeClick";
import ClipClick from "../navComponent/ClipClick";

export default function Header() {
  const [show, setShow] = useState(false);

  function handleClickMenu() {
    setShow(prev => !prev);
  }

  return (
    <header>
      <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
        <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">
          Newyork Times
        </h3>
        <FontAwesomeIcon onClick={handleClickMenu} icon={faBars} />
        {show ? (
          <nav>
            <ul>
              <HomeClick />
              <ClipClick />
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
