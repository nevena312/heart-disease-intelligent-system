import { useEffect, useState } from "react";
import { getAssessments } from "../services/assessmentApi";

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

function History() {
  const [assessments, setAssessments] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAssessments();
  }, []);

  const loadAssessments = async () => {
    try {
      const data = await getAssessments();
      setAssessments(data);
    } catch (err) {
      setError("Došlo je do greške prilikom učitavanja istorije procena.");
      console.error(err);
    }
  };

  const toggleDetails = (id) => {
    setExpandedId(expandedId === id ? null : id);
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

      {error && <div className="error-card">{error}</div>}

      {assessments.length === 0 ? (
        <p>No assessments found.</p>
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
              {assessments.map((item) => (
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

                                <p><strong>Predicted class:</strong> {item.predictedClass}</p>
                                <p><strong>Probability:</strong> {(item.probability * 100).toFixed(2)}%</p>
                                <p className="message">{item.message}</p>
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