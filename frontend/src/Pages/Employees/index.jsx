import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import api from "../../services/api";
import "./index.css";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  async function loadEmployees() {
    const res = await api.get("/employees");
    setEmployees(res.data);
  }

  async function addEmployee(e) {
    e.preventDefault();
    await api.post("/employees", form);
    setForm({ first_name: "", last_name: "", email: "", phone: "" });
    loadEmployees();
  }

  async function deleteEmployee(id) {
    try {
        await api.delete(`/employees/${id}`);
        loadEmployees();
    } catch (err) {
        console.error(err);
        alert("Failed to delete");
    }
  }

  function startEdit(emp) {
    setEditingId(emp.id);
    setEditForm({
      first_name: emp.first_name || "",
      last_name: emp.last_name || "",
      email: emp.email || "",
      phone: emp.phone || ""
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm({});
  }

  async function submitEdit(e) {
    e.preventDefault();
    try {
      await api.put(`/employees/${editingId}`, editForm);
      cancelEdit();
      loadEmployees();
    } catch (err) {
      alert("Failed to update employee");
    }
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="employees-container">
        <h1 className="page-title">Employees</h1>

        <div className="form-box">
          <h3>Add Employee</h3>
          <form onSubmit={addEmployee}>
            <input
              className="input-field"
              placeholder="First Name"
              value={form.first_name}
              onChange={(e) =>
                setForm({ ...form, first_name: e.target.value })
              }
            />
            <input
              className="input-field"
              placeholder="Last Name"
              value={form.last_name}
              onChange={(e) =>
                setForm({ ...form, last_name: e.target.value })
              }
            />
            <input
              className="input-field"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
            <input
              className="input-field"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <button className="submit-btn">Add Employee</button>
          </form>
        </div>

        <div className="table-box">
          <h3 className="box-title">Employee List</h3>

          <table className="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>

             <tbody>
              {employees.length === 0 ? (
                <tr><td colSpan="5" className="no-data">No employees found</td></tr>
              ) : employees.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>
                    {editingId === emp.id ? (
                      <input value={editForm.first_name} onChange={e=>setEditForm({...editForm, first_name:e.target.value})} placeholder="First" />
                    ) : (
                      `${emp.first_name || ""} ${emp.last_name || ""}`
                    )}
                  </td>
                  <td>{editingId === emp.id ? (
                      <input value={editForm.email} onChange={e=>setEditForm({...editForm, email:e.target.value})} />
                    ) : emp.email}</td>
                  <td>{editingId === emp.id ? (
                      <input value={editForm.phone} onChange={e=>setEditForm({...editForm, phone:e.target.value})} />
                    ) : emp.phone}</td>
                  <td className="actions">
                    {editingId === emp.id ? (
                      <>
                        <button className="edit-button" onClick={submitEdit}>Save</button>
                        <button className="delete-btn" onClick={cancelEdit}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button className="edit-button" onClick={()=>startEdit(emp)}>Edit</button>
                        <button className="delete-btn" onClick={()=>deleteEmployee(emp.id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>
  );
}
