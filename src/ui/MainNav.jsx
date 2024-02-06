import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  text-transform: capitalize;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-gray-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-gray-800);
    background-color: var(--color-gray-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-gray-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const links = [
  { to: "dashboard", icon: <HiOutlineHome /> },
  { to: "bookings", icon: <HiOutlineCalendarDays /> },
  { to: "cabins", icon: <HiOutlineHomeModern /> },
  { to: "users", icon: <HiOutlineUsers /> },
  { to: "settings", icon: <HiOutlineCog6Tooth /> },
];

function MainNav() {
  return (
    <NavList>
      {links.map((link) => (
        <li key={link.to}>
          <StyledNavLink to={`/${link.to}`}>
            {link.icon}{" "}
            <span>{link.to === "dashboard" ? "home" : link.to}</span>
          </StyledNavLink>
        </li>
      ))}
    </NavList>
  );
}

export default MainNav;
