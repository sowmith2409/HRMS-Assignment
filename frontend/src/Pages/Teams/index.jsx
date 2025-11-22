import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import api from "../../services/api";
import "./index.css";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  async function loadTeams() {
    const res = await api.get("/teams");
    setTeams(res.data);
  }

  async function addTeam(e) {
    e.preventDefault();
    await api.post("/teams", form);
    setForm({ name: "", description: "" });
    loadTeams();
  }

  async function deleteTeam(id) {
    try {
      await api.delete(`/teams/${id}`);
      loadTeams();
    } catch (error) {
      alert("Failed to delete team");
    }
  }

  function startEdit(team) {
    setEditingId(team.id);
    setEditForm({ name: team.name || "", description: team.description || "" });
  }

  function cancelEdit() { setEditingId(null); setEditForm({}); }

  async function submitEdit(e) {
    e.preventDefault();
    try {
      await api.put(`/teams/${editingId}`, editForm);
      cancelEdit();
      loadTeams();
    } catch (err) { alert("Failed to update team"); }
  }

  useEffect(() => {
    loadTeams();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="teams-container">
        <h1 className="page-title">Teams</h1>

        <div className="form-box">
          <h3 className="form-heading">Add Team</h3>
          <form onSubmit={addTeam}>
            <input
              className="input-field"
              placeholder="Team Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="input-field"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <button className="submit-btn">Add Team</button>
          </form>
        </div>

        <div className="list-box">
          <h3>Team List</h3>

          <table className="team-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Team Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr><td colSpan="4" className="no-data">No teams found</td></tr>
              ) : teams.map(t => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{editingId === t.id ? <input value={editForm.name} onChange={(e)=>setEditForm({...editForm, name:e.target.value})} /> : t.name}</td>
                  <td>{editingId === t.id ? <input value={editForm.description} onChange={(e)=>setEditForm({...editForm, description:e.target.value})} /> : t.description}</td>
                  <td>
                    {editingId === t.id ? (
                      <>
                        <button className="edit-button" onClick={submitEdit}>Save</button>
                        <button className="delete-btn" onClick={cancelEdit}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button className="edit-button" onClick={()=>startEdit(t)}>Edit</button>
                        <button className="delete-btn" onClick={()=>deleteTeam(t.id)}>Delete</button>
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
