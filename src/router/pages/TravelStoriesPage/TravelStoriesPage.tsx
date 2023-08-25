import * as React from 'react';
import style from './TravelStoriesPage.module.scss';
import { Outlet } from 'react-router-dom';

export const getAge = (birth: string) => {
  if (!birth) return;
  const year = Number(birth.substring(6));
  const month = Number(birth.substring(3, 5)) - 1;
  const day = Number(birth.substring(0, 2));
  const today = new Date();
  let age = today.getFullYear() - year;
  if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
    age--;
  }
  return age;
};

export const dateParse = (date: string) => {
  if (!date) return;

  const ymd = date.split('.');

  const mydate = new Date(Number(ymd[2]), Number(ymd[0]) - 1, Number(ymd[1]));

  return mydate.toLocaleString('default', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const TravelStoriesPage = () => {
  return <Outlet />;
};

export default TravelStoriesPage;
