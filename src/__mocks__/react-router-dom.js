const React = require("react");

module.exports = {
  useNavigate: () => () => {},
  useLocation: () => ({ pathname: "/admin/login", state: {} }),
  useSearchParams: () => [new URLSearchParams(), () => {}],
  Link: ({ children, to, ...props }) => React.createElement("a", { href: to, ...props }, children),
  Navigate: ({ to }) => React.createElement("div", { "data-testid": "navigated-to" }, to),
  BrowserRouter: ({ children }) => React.createElement("div", null, children),
  Routes: ({ children }) => React.createElement("div", null, children),
  Route: ({ element }) => element,
};
