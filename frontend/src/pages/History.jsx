import { useEffect, useState } from "react";
import {
  getAssessments,
  updateDoctorNote
} from "../services/assessmentApi";

const sexLabels = {
  0: "Female",
  1: "Male"
};

const chestPainLabels = {
  0: "Typical angina",
  1: "Atypical angina",
  2: "Non-anginal pain",
  3: "Asymptomatic"
};

const fbsLabels = {
  0: "False",
  1: "True"
};

const restecgLabels = {
  0: "Normal",
  1: "ST-T wave abnormality",
  2: "Left ventricular hypertrophy"
};

const exangLabels = {
  0: "No",
  1: "Yes"
};

const slopeLabels = {
  0: "Upsloping",
  1: "Flat",
  2: "Downsloping"
};

const thalLabels = {
  0: "Normal",
  1: "Fixed defect",
  2: "Reversible defect"
};

const predictionLabels = {
  0: "No heart disease detected",
  1: "Possible heart disease detected"
};

function History() {
  const [assessments, setAssessments] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [error, setError] = useState("");
  const [notes, setNotes] = useState({});

  const [riskFilter, setRiskFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    loadAssessments();
  }, []);

  const loadAssessments = async () => {
    try {
      const data = await getAssessments();
      setAssessments(data);

      const noteMap = {};

      data.forEach((item) => {
        noteMap[item.id] = item.doctorNote || "";
      });

      setNotes(noteMap);
    } catch (err) {
      setError("Došlo je do greške prilikom učitavanja istorije procena.");
      console.error(err);
    }
  };

  const filteredAssessments = assessments
    .filter((item) => {
      if (riskFilter !== "All" && item.riskLevel !== riskFilter) {
        return false;
      }

      const assessmentDate = new Date(item.createdAt);

      if (fromDate) {
        const from = new Date(fromDate);
        from.setHours(0, 0, 0, 0);

        if (assessmentDate < from) {
          return false;
        }
      }

      if (toDate) {
        const to = new Date(toDate);
        to.setHours(23, 59, 59, 999);

        if (assessmentDate > to) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
        if (sortBy === "newest") {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }

        if (sortBy === "oldest") {
            return new Date(a.createdAt) - new Date(b.createdAt);
        }

        if (sortBy === "highestProbability") {
            return b.probability - a.probability;
        }

        if (sortBy === "lowestProbability") {
            return a.probability - b.probability;
        }

        return 0;
        });

  const clearFilters = () => {
    setRiskFilter("All");
    setFromDate("");
    setToDate("");
    setSortBy("newest");
  };

  const toggleDetails = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleNoteChange = (id, value) => {
    setNotes((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const saveNote = async (id) => {
    try {
      await updateDoctorNote(id, notes[id]);
      alert("Doctor note saved.");
      await loadAssessments();
    } catch (error) {
      console.error(error);
      alert("Failed to save note.");
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleString();
  };

  return (
    <section className="history-card">
      <h1>Assessment History</h1>
      <p className="subtitle">
        Pregled prethodno sačuvanih procena rizika.
      </p>

      <div className="filters-card">
        <div className="filter-field">
          <label>Risk level</label>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="filter-field">
          <label>From date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div className="filter-field">
          <label>To date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <div className="filter-field">
            <label>Sort by</label>
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="highestProbability">Highest probability</option>
                <option value="lowestProbability">Lowest probability</option>
            </select>
        </div>

        <button className="small-button" onClick={clearFilters}>
          Clear filters
        </button>
      </div>

      <p className="history-count">
        Showing {filteredAssessments.length} of {assessments.length} assessments.
      </p>

      {error && <div className="error-card">{error}</div>}

      {assessments.length === 0 ? (
        <p>No assessments found.</p>
      ) : filteredAssessments.length === 0 ? (
        <p>No assessments match the selected filters.</p>
      ) : (
        <div className="table-wrapper">
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Age</th>
                <th>Risk level</th>
                <th>Probability</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredAssessments.map((item) => (
                <>
                  <tr key={item.id}>
                    <td>{formatDate(item.createdAt)}</td>
                    <td>{item.age}</td>
                    <td>
                      <span className={`result-badge ${item.riskLevel?.toLowerCase()}`}>
                        {item.riskLevel}
                      </span>
                    </td>
                    <td>{(item.probability * 100).toFixed(2)}%</td>
                    <td>
                      <button
                        className="small-button"
                        onClick={() => toggleDetails(item.id)}
                      >
                        {expandedId === item.id ? "Hide details" : "View details"}
                      </button>
                    </td>
                  </tr>

                  {expandedId === item.id && (
                    <tr>
                      <td colSpan="5">
                        <div className="details-panel">
                          <div>
                            <h3>Input parameters</h3>

                            <div className="details-grid">
                              <p><strong>Sex:</strong> {sexLabels[item.sex]}</p>
                              <p><strong>Chest pain type:</strong> {chestPainLabels[item.cp]}</p>
                              <p><strong>Resting BP:</strong> {item.trestbps} mm Hg</p>
                              <p><strong>Cholesterol:</strong> {item.chol} mg/dl</p>
                              <p><strong>Fasting blood sugar:</strong> {fbsLabels[item.fbs]}</p>
                              <p><strong>Resting ECG:</strong> {restecgLabels[item.restecg]}</p>
                              <p><strong>Max heart rate:</strong> {item.thalach}</p>
                              <p><strong>Exercise angina:</strong> {exangLabels[item.exang]}</p>
                              <p><strong>Oldpeak:</strong> {item.oldpeak}</p>
                              <p><strong>Slope:</strong> {slopeLabels[item.slope]}</p>
                              <p><strong>Major vessels:</strong> {item.ca} vessels</p>
                              <p><strong>Thal:</strong> {thalLabels[item.thal]}</p>
                            </div>
                          </div>

                          <div className="prediction-summary">
                            <h3>Prediction result</h3>

                            <div className={`result-badge ${item.riskLevel?.toLowerCase()}`}>
                              {item.riskLevel} risk
                            </div>

                            <p><strong>Prediction:</strong> {predictionLabels[item.predictedClass]}</p>
                            <p><strong>Probability:</strong> {(item.probability * 100).toFixed(2)}%</p>
                            <p className="message">{item.message}</p>

                            <div className="doctor-note-section">
                              <h4>Doctor Note</h4>

                              <textarea
                                value={notes[item.id] || ""}
                                onChange={(e) =>
                                  handleNoteChange(item.id, e.target.value)
                                }
                                placeholder="Enter doctor's note..."
                                className="doctor-note-textarea"
                              />

                              <button
                                className="small-button"
                                onClick={() => saveNote(item.id)}
                              >
                                Save Note
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default History;