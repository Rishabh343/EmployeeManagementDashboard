import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const EmployeeContext = createContext();

export default function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/users");

        setEmployees(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployees();
  }, []);
  return (
    <EmployeeContext.Provider value={{ employees, setEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
}
