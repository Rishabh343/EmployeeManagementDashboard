import React, { useContext, useEffect, useMemo, useState } from "react";
import { EmployeeContext } from "../common/EmployeeContext";
import { ThemeContext } from "../common/ThemeContext";
import Button from "../common/Button";
import Modal from "../common/Modal";
import Table from "../common/Table";
import Loader from "../common/Loader";
import { Trash2, Search, Pencil } from "lucide-react";
export default function Employee() {
  const { employees, setEmployees } = useContext(EmployeeContext);
  const { theme } = useContext(ThemeContext);

  const [showModal, setShowModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const [searchLoading, setSearchLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    department: "",
    image: "",
  });

  const columns = ["Image", "Name", "Email", "Department", "Phone", "Actions"];

  const inputStyle =
    theme === "light"
      ? "bg-white text-black border-gray-300"
      : "bg-gray-800 text-white border-gray-600";

  const editButtonStyle =
    theme === "light" ? "bg-gray-200 text-black" : "bg-gray-700 text-white";

  const departments = useMemo(() => {
    return [...new Set(employees.map((emp) => emp.company.department))];
  }, [employees]);

  useEffect(() => {
    setSearchLoading(true);

    const timer = setTimeout(() => {
      setSearchLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedDepartment]);

  const filteredEmployees = useMemo(() => {
    return employees
      .filter((emp) => {
        const fullName = `${emp.firstName} ${emp.lastName || ""}`.toLowerCase();

        const matchesSearch = fullName.includes(searchTerm.toLowerCase());

        const matchesDepartment =
          selectedDepartment === "" ||
          emp.company.department === selectedDepartment;

        return matchesSearch && matchesDepartment;
      })
      .slice(0, 10);
  }, [employees, searchTerm, selectedDepartment]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const openAddModal = () => {
    setEditEmployee(null);
    setFormData({
      firstName: "",
      email: "",
      phone: "",
      department: "",
      image: "",
    });
    setShowModal(true);
  };

  const openEditModal = (emp) => {
    setEditEmployee(emp);

    setFormData({
      firstName: emp.firstName,
      email: emp.email,
      phone: emp.phone,
      department: emp.company.department,
      image: emp.image,
    });

    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.firstName || !formData.email || !formData.phone) {
      alert("All fields required");
      return;
    }

    if (editEmployee) {
      const updated = employees.map((emp) =>
        emp.id === editEmployee.id
          ? {
              ...emp,
              firstName: formData.firstName,
              email: formData.email,
              phone: formData.phone,
              image: formData.image,
              company: {
                ...emp.company,
                department: formData.department,
              },
            }
          : emp,
      );

      setEmployees(updated);
    } else {
      const newEmployee = {
        id: Date.now(),
        firstName: formData.firstName,
        lastName: "",
        email: formData.email,
        phone: formData.phone,
        image: formData.image,
        company: {
          department: formData.department,
        },
      };

      setEmployees([newEmployee, ...employees]);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
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
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className={`border px-4 py-3 rounded-xl min-w-[220px] ${inputStyle}`}
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
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
      ) : filteredEmployees.length === 0 ? (
        <div className="text-center text-xl font-semibold mt-10">
          No Result Found
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEmployees.map((emp) => (
            <div
              key={emp.id}
              className={`grid grid-cols-1 md:grid-cols-6 gap-4 items-center px-6 py-4 rounded-2xl shadow-md hover:shadow-lg transition ${
                theme === "light"
                  ? "bg-white"
                  : "bg-gray-800 border border-gray-700"
              }`}
            >
              <div>
                <img
                  src={emp.image}
                  alt=""
                  className="w-14 h-14 rounded-lg object-cover"
                />
              </div>

              <div className="font-medium">
                {emp.firstName} {emp.lastName}
              </div>

              <div className="break-all">{emp.email}</div>

              <div>{emp.company.department}</div>

              <div>{emp.phone}</div>

              <div className="flex gap-5">
                <button
                  onClick={() => openEditModal(emp)}
                  className="text-yellow-500 hover:scale-110 transition"
                >
                  <Pencil size={20} />
                </button>

                <button
                  onClick={() => handleDelete(emp.id)}
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
            name="firstName"
            placeholder="Name"
            value={formData.firstName}
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
            name="phone"
            placeholder="Phone"
            value={formData.phone}
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
