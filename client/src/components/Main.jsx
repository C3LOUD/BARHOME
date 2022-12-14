import React, { useEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import NotFound from '../pages/NotFound';
import InitialModalContext from '../store/initial-Modal-context';
import Admin from './auth/Admin';
import Posts from './posts/Posts';
import Saved from './posts/Saved';
import Recipes from './recipe/Recipes';
import IngredientSpirit from './spirit/IngredientSpirit';
import Spirits from './spirit/Spirits';
import DarkModeSwitcher from './ui/DarkModeSwitcher';
import Icon from './ui/Icon';
import LogoutBtn from './ui/LogoutBtn';
import SearchInput from './ui/SearchInput';

const Main = (props) => {
  const [mainNode, setMainNode] = useState(null);

  const mainElement = useRef();
  useEffect(() => {
    setMainNode(mainElement.current);
  }, []);

  return (
    <div
      className="relative flex flex-1 flex-col overflow-hidden bg-gradient-to-r from-accent-dark-shade-700 to-accent-dark-shade-400 px-16 pt-8 dark:from-accent-dark-tint-500 dark:to-accent-dark-tint-700 lg:px-12 sm:px-8"
      ref={mainElement}
    >
      <div className="flex w-full justify-between gap-24 md:gap-12 2xs:mb-4">
        <div className="flex w-full gap-4">
          <Icon
            name="menu-sharp"
            style="transition-all text-5xl text-white-100 hover:text-white-400 dark:text-black-100 dark:hover:text-gray-400 hidden md:block"
            onClick={props.onHamburger}
          />
          <SearchInput />
        </div>
        <div className="flex gap-6 xs:hidden">
          <DarkModeSwitcher />
          <LogoutBtn />
        </div>
      </div>
      <div className="flex w-[69rem] flex-1 flex-col overflow-scroll scrollbar-none 2xl:w-full 2xs:block">
        <InitialModalContext.Provider value={mainNode}>
          <Routes>
            <Route
              path="/"
              element={<Navigate replace to={'/dashboard/recipes'} />}
            />
            <Route path="admin/*" element={<Admin />} />
            <Route path="recipes/*" element={<Recipes />} />
            <Route path="spirits/*" element={<Spirits />} />
            <Route
              path="ingredient/*"
              element={<Navigate replace to="/dashboard/spirits" />}
            />
            <Route
              path={'ingredient/:ingredient/*'}
              element={<IngredientSpirit />}
            />
            <Route path="saved/*" element={<Saved />} />
            <Route path="posts/*" element={<Posts />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </InitialModalContext.Provider>
      </div>
    </div>
  );
};

export default Main;
