import React, { useContext, useMemo, useState } from "react";
import { EmployeeContext } from "../common/EmployeeContext";
import { ThemeContext } from "../common/ThemeContext";
import Button from "../common/Button";
import Modal from "../common/Modal";
import Table from "../common/Table";

export default function Employee() {
  const { employees, setEmployees } = useContext(EmployeeContext);
  const { theme } = useContext(ThemeContext);

  const [showModal, setShowModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    department: "",
    image: "",
  });

  const columns = [
    "Image",
    "Name",
    "Email",
    "Department",
    "Phone",
    "Actions",
  ];

  const departments = useMemo(() => {
    return [
      ...new Set(
        employees.map((emp) => emp.company.department)
      ),
    ];
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const fullName =
        `${emp.firstName} ${emp.lastName || ""}`.toLowerCase();

      const matchesSearch = fullName.includes(
        searchTerm.toLowerCase()
      );

      const matchesDepartment =
        selectedDepartment === "" ||
        emp.company.department === selectedDepartment;

      return matchesSearch && matchesDepartment;
    });
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
    if (
      !formData.firstName ||
      !formData.email ||
      !formData.phone
    ) {
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
          : emp
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

      setEmployees([...employees, newEmployee]);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    setEmployees(
      employees.filter((emp) => emp.id !== id)
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Employee Management
        </h1>

        <Button
          onClick={openAddModal}
          className="bg-black text-white"
        >
          Add Employee
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name"
          className="border px-3 py-2 rounded"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <select
          className="border px-3 py-2 rounded"
          value={selectedDepartment}
          onChange={(e) =>
            setSelectedDepartment(e.target.value)
          }
        >
          <option value="">All Departments</option>

          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      <Table columns={columns}>
        {filteredEmployees.map((emp) => (
          <tr key={emp.id} className="border-b">
            <td className="px-4 py-3">
              <img
                src={emp.image}
                alt=""
                className="w-12 h-12 rounded-full"
              />
            </td>

            <td className="px-4 py-3">
              {emp.firstName} {emp.lastName}
            </td>

            <td className="px-4 py-3">
              {emp.email}
            </td>

            <td className="px-4 py-3">
              {emp.company.department}
            </td>

            <td className="px-4 py-3">
              {emp.phone}
            </td>

            <td className="px-4 py-3">
              <div className="flex gap-2">
                <Button
                  onClick={() =>
                    openEditModal(emp)
                  }
                  className="bg-gray-200"
                >
                  Edit
                </Button>

                <Button
                  onClick={() =>
                    handleDelete(emp.id)
                  }
                  className="bg-red-500 text-white"
                >
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={
          editEmployee
            ? "Edit Employee"
            : "Add Employee"
        }
      >
        <div className="flex flex-col gap-3">
          <input
            name="firstName"
            placeholder="Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border p-2"
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2"
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2"
          />

          <input
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="border p-2"
          />

          <input
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="border p-2"
          />

          <Button
            onClick={handleSave}
            className="bg-black text-white"
          >
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
}