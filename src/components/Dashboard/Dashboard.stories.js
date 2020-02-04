import React from "react";
import Dashboard from "./Dashboard";
import ApiDoc from "./Dashboard.md";

export default {
  component: Dashboard,
  title: "Dashboard",
  parameters: { notes: ApiDoc }
};

export const Default = () => <Dashboard />;
