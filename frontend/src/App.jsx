import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
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
      const response = await axios.post(
        "http://localhost:8080/api/assessments",
        requestBody
      );

      setResult(response.data);
    } catch (err) {
      if (err.response && err.response.status === 400 && err.response.data) {
        const validationMessages = Object.values(err.response.data);
        setError(validationMessages.join(" "));
      } else {
        setError("Došlo je do greške prilikom obrade zahteva.");
      }

      console.error(err);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h1>Heart Disease Risk Assessment</h1>
        <p className="subtitle">
          Unesite medicinske parametre pacijenta i sistem će proceniti rizik od srčanog oboljenja.
        </p>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-grid">
            <label>
              Age
              <input type="number" name="age" value={formData.age} onChange={handleChange} required />
            </label>

            <label>
              Sex
              <select name="sex" value={formData.sex} onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="0">Female</option>
                <option value="1">Male</option>
              </select>
            </label>

            <label>
              Chest pain type
              <select name="cp" value={formData.cp} onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="0">Typical angina</option>
                <option value="1">Atypical angina</option>
                <option value="2">Non-anginal pain</option>
                <option value="3">Asymptomatic</option>
              </select>
            </label>

            <label>
              Resting blood pressure
              <input type="number" name="trestbps" value={formData.trestbps} onChange={handleChange} required />
            </label>

            <label>
              Cholesterol
              <input type="number" name="chol" value={formData.chol} onChange={handleChange} required />
            </label>

            <label>
              Fasting blood sugar &gt; 120 mg/dl
              <select name="fbs" value={formData.fbs} onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="0">False</option>
                <option value="1">True</option>
              </select>
            </label>

            <label>
              Resting ECG
              <select name="restecg" value={formData.restecg} onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="0">Normal</option>
                <option value="1">ST-T wave abnormality</option>
                <option value="2">Left ventricular hypertrophy</option>
              </select>
            </label>

            <label>
              Maximum heart rate
              <input type="number" name="thalach" value={formData.thalach} onChange={handleChange} required />
            </label>

            <label>
              Exercise induced angina
              <select name="exang" value={formData.exang} onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </label>

            <label>
              Oldpeak
              <input type="number" step="0.1" name="oldpeak" value={formData.oldpeak} onChange={handleChange} required />
            </label>

            <label>
              Slope
              <select name="slope" value={formData.slope} onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="0">Upsloping</option>
                <option value="1">Flat</option>
                <option value="2">Downsloping</option>
              </select>
            </label>

            <label>
              Number of major vessels
              <select name="ca" value={formData.ca} onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="0">0 vessels</option>
                <option value="1">1 vessel</option>
                <option value="2">2 vessels</option>
                <option value="3">3 vessels</option>
              </select>
            </label>

            <label>
              Thal
              <select name="thal" value={formData.thal} onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="0">Normal</option>
                <option value="1">Fixed defect</option>
                <option value="2">Reversible defect</option>
              </select>
            </label>
          </div>

          <button type="submit">Analyze Risk</button>
        </form>

        {error && <div className="error">{error}</div>}

        {result && (
          <div className="result-card">
            <h2>Assessment Result</h2>
            <p><strong>Predicted class:</strong> {result.predictedClass}</p>
            <p><strong>Probability:</strong> {(result.probability * 100).toFixed(2)}%</p>
            <p><strong>Risk level:</strong> {result.riskLevel}</p>
            <p><strong>Message:</strong> {result.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;