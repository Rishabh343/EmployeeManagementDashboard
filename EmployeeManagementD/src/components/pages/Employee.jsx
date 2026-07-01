import React, { useContext, useEffect, useMemo, useState } from "react";
import { EmployeeContext } from "../common/EmployeeContext";
import { ThemeContext } from "../common/ThemeContext";
import Button from "../common/Button";
import Modal from "../common/Modal";
import Table from "../common/Table";
import Loader from "../common/Loader";
import { Trash2, Search, Pencil } from "lucide-react";
export default function Employee() {
  const {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployee,
    filterEmployee,
  } = useContext(EmployeeContext);
  const { theme } = useContext(ThemeContext);

  const [showModal, setShowModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const [searchLoading, setSearchLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    department: "",
    profileImage: "",
  });

  const columns = ["Image", "Name", "Email", "Department", "Phone", "Actions"];

  const inputStyle =
    theme === "light"
      ? "bg-white text-black border-gray-300"
      : "bg-gray-800 text-white border-gray-600";

  const editButtonStyle =
    theme === "light" ? "bg-gray-200 text-black" : "bg-gray-700 text-white";

  const departments = useMemo(() => {
    return [...new Set(employees.map((emp) => emp.department))];
  }, [employees]);

  useEffect(() => {
    setSearchLoading(true);

    const timer = setTimeout(() => {
      setSearchLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedDepartment]);

  // const filteredEmployees = useMemo(() => {
  //   return employees
  //     .filter((emp) => {
  //       const fullName = `${emp.fullName} `.toLowerCase();

  //       const matchesSearch = fullName.includes(searchTerm.toLowerCase());

  //       const matchesDepartment =
  //         selectedDepartment === "" || emp.department === selectedDepartment;

  //       return matchesSearch && matchesDepartment;
  //     })
  //     .slice(0, 10);
  // }, [employees, searchTerm, selectedDepartment]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const openAddModal = () => {
    setEditEmployee(null);
    setFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      department: "",
      profileImage: "",
    });
    setShowModal(true);
  };

  const openEditModal = (emp) => {
    setEditEmployee(emp);

    setFormData({
      fullName: emp.fullName,
      email: emp.email,
      phoneNumber: emp.phoneNumber,
      department: emp.department,
      profileImage: emp.profileImage,
    });

    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.fullName || !formData.email || !formData.phoneNumber) {
      alert("All fields required");
      return;
    }

    try {
      if (editEmployee) {
        await updateEmployee(editEmployee._id, formData);
      } else {
        await addEmployee(formData);
      }

      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
  };

  if (!employees.length) return <Loader />;

  return (
    <div
      className={`min-h-screen p-6 ${
        theme === "light" ? "bg-gray-100 text-black" : "bg-gray-900 text-white"
      }`}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-5">Employee List</h1>

        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search employees..."
                className={`border pl-10 pr-3 py-3 rounded-xl w-full ${inputStyle}`}
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);
                  searchEmployee(value);
                }}
              />
            </div>

            <select
              className={`border px-4 py-3 rounded-xl min-w-[220px] ${inputStyle}`}
              value={selectedDepartment}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedDepartment(value);
                filterEmployee(value);
              }}
            >
              <option value="">All Departments</option>

              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <Button
            onClick={openAddModal}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl whitespace-nowrap"
          >
            Add Employee
          </Button>
        </div>
      </div>

      <div
        className={`hidden md:grid grid-cols-6 px-6 py-3 text-sm font-semibold mb-2 ${
          theme === "light" ? "text-gray-500" : "text-gray-400"
        }`}
      >
        <div>Image</div>
        <div>Name</div>
        <div>Email</div>
        <div>Department</div>
        <div>Phone</div>
        <div>Actions</div>
      </div>

      {searchLoading ? (
        <Loader />
      ) : employees.length === 0 ? (
        <div className="text-center text-xl font-semibold mt-10">
          No Result Found
        </div>
      ) : (
        <div className="space-y-4">
          {employees.map((emp) => (
            <div
              key={emp._id}
              className={`grid grid-cols-1 md:grid-cols-6 gap-4 items-center px-6 py-4 rounded-2xl shadow-md hover:shadow-lg transition ${
                theme === "light"
                  ? "bg-white"
                  : "bg-gray-800 border border-gray-700"
              }`}
            >
              <div>
                <img
                  src={emp.profileImage}
                  alt=""
                  className="w-14 h-14 rounded-lg object-cover"
                />
              </div>

              <div className="font-medium">{emp.fullName}</div>

              <div className="break-all">{emp.email}</div>

              <div>{emp.department}</div>

              <div>{emp.phoneNumber}</div>

              <div className="flex gap-5">
                <button
                  onClick={() => openEditModal(emp)}
                  className="text-yellow-500 hover:scale-110 transition"
                >
                  <Pencil size={20} />
                </button>

                <button
                  onClick={() => handleDelete(emp._id)}
                  className="text-red-500 hover:scale-110 transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editEmployee ? "Edit Employee" : "Add Employee"}
      >
        <div className="flex flex-col gap-3">
          <input
            name="fullName"
            placeholder="Name"
            value={formData.fullName}
            onChange={handleChange}
            className={`border p-3 rounded-lg ${inputStyle}`}
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`border p-3 rounded-lg ${inputStyle}`}
          />

          <input
            name="phoneNumber"
            placeholder="Phone"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`border p-3 rounded-lg ${inputStyle}`}
          />

          <input
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className={`border p-3 rounded-lg ${inputStyle}`}
          />

          <Button
            onClick={handleSave}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg"
          >
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
}
