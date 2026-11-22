import React from "react";

export const useNavigate = () => () => {};
export const useLocation = () => ({ pathname: "/admin/login", state: {} });
export const useSearchParams = () => [new URLSearchParams(), () => {}];
export const Link = ({ children, to, ...props }) => React.createElement("a", { href: to, ...props }, children);
export const Navigate = ({ to }) => React.createElement("div", { "data-testid": "navigated-to" }, to);
export const BrowserRouter = ({ children }) => React.createElement("div", null, children);
export const Routes = ({ children }) => React.createElement("div", null, children);
export const Route = ({ element }) => element;

export default {
  useNavigate,
  useLocation,
  useSearchParams,
  Link,
  Navigate,
  BrowserRouter,
  Routes,
  Route,
};
