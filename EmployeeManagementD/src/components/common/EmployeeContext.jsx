import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const EmployeeContext = createContext();

export default function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = "https://crud-raoy.onrender.com/api/employee";

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get(BASE_URL);
      setEmployees(response.data.data || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = async (data) => {
    try {
      setLoading(true);
      console.log("Sending to backend:", data);
      const response = await axios.post(BASE_URL, data);
      console.log("Response from backend:", response.data);

      if (response.data && response.data.data) {
        setEmployees((prev) => [response.data.data, ...prev]);
        return response.data.data;
      }
    } catch (error) {
      console.error("Error adding employee:");
      console.error("Status:", error.response?.status);
      console.error("Data:", error.response?.data);
      console.error("Message:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateEmployee = async (id, data) => {
    try {
      setLoading(true);
      const response = await axios.put(`${BASE_URL}/${id}`, data);

      setEmployees((prev) =>
        prev.map((emp) => (emp._id === id ? { ...emp, ...data } : emp)),
      );
    } catch (error) {
      console.error("Error updating employee:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/${id}`);

      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const searchEmployee = async (name) => {
    try {
      setLoading(true);
      if (!name.trim()) {
        await fetchEmployees();
        return;
      }

      const response = await axios.get(`${BASE_URL}/search?name=${name}`);

      setEmployees(response.data.data || []);
    } catch (error) {
      console.error("Error searching employees:", error);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const filterEmployee = async (department) => {
    try {
      setLoading(true);
      if (!department) {
        await fetchEmployees();
        return;
      }

      const response = await axios.get(
        `${BASE_URL}/filter?department=${department}`,
      );

      setEmployees(response.data.data || []);
    } catch (error) {
      console.error("Error filtering employees:", error);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        loading,
        setEmployees,
        fetchEmployees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        searchEmployee,
        filterEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}
