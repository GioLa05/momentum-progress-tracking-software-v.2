// src/Components/ClientWrapper/ClientWrapper.tsx
"use client";

import React from "react";
import Header from "@/Components/Header/Header";
import { EmployeeProvider } from "@/app/api/employee-context/EmployeeContext";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <EmployeeProvider>
      <Header />
      {children}
    </EmployeeProvider>
  );
};

export default ClientWrapper;
