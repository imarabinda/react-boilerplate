import { useRoutes } from "react-router";
import routes from "./config/routes.config";

const Routes = () => {
  const element = useRoutes(routes);
  return element;
};

export default Routes;
