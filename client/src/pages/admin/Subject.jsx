import axios from "axios";
import React, { useState, useEffect } from "react";

export default function SubjectPage() {
  const [form, setForm] = useState({ name: "", description: "" });
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        await axios.put(`http://localhost:5000/api/subject/${id}`, form);
        alert("Updated Successfully");
      } else {
        await axios.post("http://localhost:5000/api/subject", form);
        alert("Added Successfully");
      }
      setForm({ name: "", description: "" });
      setEdit(false);
      handleFetch();
    } catch (er) {
      alert("Subject not added");
      console.log(er);
    }
  };

  const handleFetch = async () => {
    const res = await axios.get("http://localhost:5000/api/subject");
    setData(res.data);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/subject/${id}`);
      alert("Subject Deleted Successfully");
      handleFetch();
    } catch (er) {
      alert("Sorry, Try Again Later");
      console.log(er);
    }
  };

  const handleEdit = (item) => {
    setForm({ name: item.name, description: item.description });
    setEdit(true);
    setId(item._id);
  };

  useEffect(() => { handleFetch(); }, []);

  return (
    <div style={{ minHeight: "100vh", padding: "25px", background: "linear-gradient(135deg, #ff7b00, #ff5100)", display: "flex", flexDirection: "column", gap: "25px" }}>
      
      {/* 🌟 Form Card */}
      <div
        style={{
          padding: "25px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease"
        }}
        onMouseOver={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 20px 45px rgba(0,0,0,0.35)"; }}
        onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.25)"; }}
      >
        <h3 style={{ color: "#fff", textShadow: "0 0 12px rgba(255,183,75,0.85)", marginBottom: "20px" }}>
          {edit ? "Edit Subject" : "Create Subject"}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="row" style={{ gap: "12px" }}>
            <div className="col-sm-6">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter Subject"
                required
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.6)",
                  background: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  transition: "all 0.3s ease",
                  outline: "none"
                }}
                onFocus={e => e.currentTarget.style.boxShadow = "0 0 12px rgba(255,183,75,0.7)"}
                onBlur={e => e.currentTarget.style.boxShadow = "none"}
              />
            </div>
            <div className="col-sm-6">
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Subject Description"
                required
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.6)",
                  background: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  transition: "all 0.3s ease",
                  outline: "none"
                }}
                onFocus={e => e.currentTarget.style.boxShadow = "0 0 12px rgba(255,183,75,0.7)"}
                onBlur={e => e.currentTarget.style.boxShadow = "none"}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              marginTop: "18px",
              padding: "12px 28px",
              borderRadius: "14px",
              border: "none",
              background: "linear-gradient(90deg, #ff7b00, #ff5100)",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = "scale(1.08) translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 0 18px rgba(255,140,0,0.9)";
              e.currentTarget.style.background = "linear-gradient(90deg, #ff9500, #ff5a00)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
              e.currentTarget.style.background = "linear-gradient(90deg, #ff7b00, #ff5100)";
            }}
          >
            {edit ? "Update Subject" : "Create Subject"}
          </button>
        </form>
      </div>

      {/* 🌟 Table Card */}
      <div
        style={{
          padding: "25px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease"
        }}
        onMouseOver={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 20px 45px rgba(0,0,0,0.35)"; }}
        onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.25)"; }}
      >
        <h3 style={{ color: "#fff", textShadow: "0 0 12px rgba(255,183,75,0.85)", marginBottom: "20px" }}>Subject Details</h3>

        <table style={{ width: "100%", borderCollapse: "collapse", color: "#fff", textAlign: "center" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.3)" }}>
              <th>S.No.</th>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: "12px" }}>Please Add a Subject</td>
              </tr>
            ) : data.map((item, i) => (
              <tr key={item._id} style={{ transition: "all 0.3s ease" }}
                  onMouseOver={e => e.currentTarget.style.background = "rgba(255,183,75,0.15)"}
                  onMouseOut={e => e.currentTarget.style.background = "transparent"}
              >
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <button
                    onClick={() => handleEdit(item)}
                    style={{
                      marginRight: "6px",
                      padding: "6px 12px",
                      borderRadius: "10px",
                      border: "none",
                      background: "linear-gradient(90deg, #ffa500, #ff7b00)",
                      color: "#fff",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
                    }}
                    onMouseOver={e => e.currentTarget.style.boxShadow = "0 0 14px rgba(255,140,0,0.8)"}
                    onMouseOut={e => e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)"}
                  >Edit</button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "10px",
                      border: "none",
                      background: "linear-gradient(90deg, #ff4b2b, #ff0000)",
                      color: "#fff",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
                    }}
                    onMouseOver={e => e.currentTarget.style.boxShadow = "0 0 14px rgba(255,0,0,0.8)"}
                    onMouseOut={e => e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)"}
                  >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
