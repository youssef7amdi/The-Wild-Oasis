import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  pointer-events: auto;

  &:hover {
    background-color: var(--color-gray-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-gray-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-gray-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: 0;
  top: 0;
  transform: translate(
    ${(props) => -props.position.x}px,
    ${(props) => props.position.y}px
  );
  pointer-events: auto;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-gray-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-gray-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => {
    setOpenId("");
    if (document.body.style.pointerEvents)
      document.body.style.pointerEvents = null;
  };
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    document.body.style.pointerEvents = "none";
    // console.log(window.innerWidth, rect);
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <>
      <StyledToggle onClick={handleClick}>
        <HiEllipsisVertical />
      </StyledToggle>
    </>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close, false);
  const [windowHight, setWindowHight] = useState(window.innerHeight);

  useEffect(() => {
    function updateHeight() {
      setWindowHight(window.innerHeight);
    }
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const distanceFromTop = position?.y + 130;
  const shouldBeBlow = windowHight >= distanceFromTop;
  const idealPosition = useMemo(
    function () {
      const idealPosition = shouldBeBlow
        ? position
        : { x: position?.x, y: position?.y - 170 };

      return idealPosition;
    },
    [position, shouldBeBlow]
  );

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={idealPosition} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
