import { useState } from "react";
import { createAssessment } from "../services/assessmentApi";

const predictionLabels = {
  0: "No heart disease detected",
  1: "Possible heart disease detected"
};

function Dashboard() {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: ""
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    const requestBody = {
      age: Number(formData.age),
      sex: Number(formData.sex),
      cp: Number(formData.cp),
      trestbps: Number(formData.trestbps),
      chol: Number(formData.chol),
      fbs: Number(formData.fbs),
      restecg: Number(formData.restecg),
      thalach: Number(formData.thalach),
      exang: Number(formData.exang),
      oldpeak: Number(formData.oldpeak),
      slope: Number(formData.slope),
      ca: Number(formData.ca),
      thal: Number(formData.thal)
    };

    try {
      const data = await createAssessment(requestBody);
      setResult(data);
    } catch (err) {
      if (err.response && err.response.status === 400 && err.response.data) {
        const validationMessages = Object.values(err.response.data);
        setError(validationMessages.join(" "));
      } else {
        setError("Došlo je do greške prilikom obrade zahteva. Proverite da li backend i AI servis rade.");
      }

      console.error(err);
    }
  };

  const getRiskClass = () => {
    if (!result?.riskLevel) return "";
    return result.riskLevel.toLowerCase();
  };

  return (
    <>
      <section className="hero">
        <h1>Heart Disease Risk Assessment</h1>
        <p className="subtitle">
          Inteligentni sistem koristi prethodno trenirani MLP model neuronske mreže za procenu rizika od srčanog oboljenja na osnovu medicinskih parametara pacijenta.
        </p>
      </section>

      <main className="content">
        <section className="form-card">
          <h2>Patient parameters</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="field">
                <label>Age</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} required />
                <span className="hint">Allowed range: 1–120 years.</span>
              </div>

              <div className="field">
                <label>Sex</label>
                <select name="sex" value={formData.sex} onChange={handleChange} required>
                  <option value="">Select...</option>
                  <option value="0">Female</option>
                  <option value="1">Male</option>
                </select>
                <span className="hint">Biological sex.</span>
              </div>

              <div className="field">
                <label>Chest pain type</label>
                <select name="cp" value={formData.cp} onChange={handleChange} required>
                  <option value="">Select...</option>
                  <option value="0">Typical angina</option>
                  <option value="1">Atypical angina</option>
                  <option value="2">Non-anginal pain</option>
                  <option value="3">Asymptomatic</option>
                </select>
              </div>

              <div className="field">
                <label>Resting blood pressure</label>
                <input type="number" name="trestbps" value={formData.trestbps} onChange={handleChange} required />
                <span className="hint">Allowed range: 50–250 mm Hg.</span>
              </div>

              <div className="field">
                <label>Cholesterol</label>
                <input type="number" name="chol" value={formData.chol} onChange={handleChange} required />
                <span className="hint">Allowed range: 50–700 mg/dl.</span>
              </div>

              <div className="field">
                <label>Fasting blood sugar &gt; 120 mg/dl</label>
                <select name="fbs" value={formData.fbs} onChange={handleChange} required>
                  <option value="">Select...</option>
                  <option value="0">False</option>
                  <option value="1">True</option>
                </select>
                <span className="hint">True if fasting blood sugar is above 120 mg/dl.</span>
              </div>

              <div className="field">
                <label>Resting ECG</label>
                <select name="restecg" value={formData.restecg} onChange={handleChange} required>
                  <option value="">Select...</option>
                  <option value="0">Normal</option>
                  <option value="1">ST-T wave abnormality</option>
                  <option value="2">Left ventricular hypertrophy</option>
                </select>
                <span className="hint">Resting electrocardiographic result.</span>
              </div>

              <div className="field">
                <label>Maximum heart rate</label>
                <input type="number" name="thalach" value={formData.thalach} onChange={handleChange} required />
                <span className="hint">Allowed range: 50–250.</span>
              </div>

              <div className="field">
                <label>Exercise induced angina</label>
                <select name="exang" value={formData.exang} onChange={handleChange} required>
                  <option value="">Select...</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
                <span className="hint">Angina caused by exercise.</span>
              </div>

              <div className="field">
                <label>Oldpeak</label>
                <input type="number" step="0.1" name="oldpeak" value={formData.oldpeak} onChange={handleChange} required />
                <span className="hint">Allowed range: 0–10.</span>
              </div>

              <div className="field">
                <label>Slope</label>
                <select name="slope" value={formData.slope} onChange={handleChange} required>
                  <option value="">Select...</option>
                  <option value="0">Upsloping</option>
                  <option value="1">Flat</option>
                  <option value="2">Downsloping</option>
                </select>
                <span className="hint">Slope of the peak exercise ST segment.</span>
              </div>

              <div className="field">
                <label>Number of major vessels</label>
                <select name="ca" value={formData.ca} onChange={handleChange} required>
                  <option value="">Select...</option>
                  <option value="0">0 vessels</option>
                  <option value="1">1 vessel</option>
                  <option value="2">2 vessels</option>
                  <option value="3">3 vessels</option>
                </select>
                <span className="hint">Number of vessels colored by fluoroscopy.</span>
              </div>

              <div className="field">
                <label>Thal</label>
                <select name="thal" value={formData.thal} onChange={handleChange} required>
                  <option value="">Select...</option>
                  <option value="0">Normal</option>
                  <option value="1">Fixed defect</option>
                  <option value="2">Reversible defect</option>
                </select>
                <span className="hint">Thalassemia test result.</span>
              </div>
            </div>

            <button className="submit-button" type="submit">
              Analyze Risk
            </button>
          </form>
        </section>

        <aside className="side-panel">
          <section className="info-card">
            <h2>Kako tumačiti rezultat</h2>

            <ul className="info-list">
                <li>
                    <strong>Low risk</strong> – nizak procenjeni rizik od srčanog oboljenja.
                </li>
                <li>
                    <strong>Medium risk</strong> – preporučuje se dodatna analiza i praćenje pacijenta.
                </li>
                <li>
                    <strong>High risk</strong> – povećana verovatnoća prisustva srčanog oboljenja i potreba za daljom dijagnostikom.
                </li>
            </ul>

            <p className="message">
                Napomena: rezultat predstavlja pomoć pri proceni rizika i ne predstavlja konačnu medicinsku dijagnozu.
            </p>
          </section>

          {error && (
            <section className="error-card">
              {error}
            </section>
          )}

          {result && (
            <section className="result-card">
              <h2>Assessment Result</h2>

              <div className={`result-badge ${getRiskClass()}`}>
                {result.riskLevel} risk
              </div>

              <div className="result-row">
                <span className="result-label">Prediction</span>
                <span className="result-value">
                    {predictionLabels[result.predictedClass]}
                </span>
              </div>

              <div className="result-row">
                <span className="result-label">Probability</span>
                <span className="result-value">
                  {(result.probability * 100).toFixed(2)}%
                </span>
              </div>

              <p className="message">{result.message}</p>
            </section>
          )}
        </aside>
      </main>
    </>
  );
}

export default Dashboard;