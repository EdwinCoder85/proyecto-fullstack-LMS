"use client";

import Link from "next/link";
import { useState } from "react";
import { RiHome3Line, RiFirefoxLine, RiLayoutGridLine, RiTeamLine, RiLiveLine, RiDownload2Line, RiSettings3Line, RiCheckboxBlankCircleLine, RiMenu3Fill, RiCloseLine } from "react-icons/ri";

export default function Dashboard() {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toogleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <section className="w-full flex justify-center items-center bg-slate-300">
      <div
        className={`fixed top-20 w-60 h-[calc(100vh-5.4rem)] bg-slate-50 border border-primary p-8 flex flex-col justify-between transition-all ${
          showMenu ? "left-0" : "-left-full"
        }`}
      >
        <div>
          <ul>
            <li>
              <Link
                href="/"
                className="pl-4 text-primary font-bold flex items-center gap-4 hover:bg-primary hover:text-white py-2 px4 rounded-xl transition-colors"
              >
                <RiHome3Line />
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="pl-4 text-primary font-bold flex items-center gap-4 hover:bg-primary hover:text-white py-2 px4 rounded-xl transition-colors"
              >
                <RiFirefoxLine />
                Store
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="pl-4 text-primary font-bold flex items-center gap-4 hover:bg-primary hover:text-white py-2 px4 rounded-xl transition-colors"
              >
                <RiLayoutGridLine />
                Library
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="pl-4 text-primary font-bold flex items-center gap-4 hover:bg-primary hover:text-white py-2 px4 rounded-xl transition-colors"
              >
                <RiTeamLine />
                Friends
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="pl-4 text-primary font-bold flex items-center gap-4 hover:bg-primary hover:text-white py-2 px4 rounded-xl transition-colors"
              >
                <RiLiveLine />
                Live
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li>
              <Link
                href="/"
                className="pl-4 text-primary font-bold flex items-center gap-4 hover:bg-primary hover:text-white py-2 px4 rounded-xl transition-colors"
              >
                <RiDownload2Line />
                Downloads
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="pl-4 text-primary font-bold flex items-center gap-4 hover:bg-primary hover:text-white py-2 px4 rounded-xl transition-colors"
              >
                <RiSettings3Line />
                Settings
              </Link>
            </li>
          </ul>
        </div>
        {/* Boton menu movil */}
        <button onClick={toogleMenu} className="bg-primary font-bold text-white fixed w-8 bottom-8 right-8 p-2 text-l rounded-full">
          {showMenu ? <RiCloseLine/> : <RiMenu3Fill />}
        </button>
      </div>
    </section>
  );
}

