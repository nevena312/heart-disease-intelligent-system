function AboutModel() {
  return (
    <div className="about-card">
      <h1>About Model</h1>
      <p className="subtitle">
        Opis inteligentne komponente sistema i načina na koji se koristi trenirani MLP model.
      </p>

      <section className="about-section">
        <h2>Purpose</h2>
        <p>
          Sistem koristi prethodno trenirani MLP model neuronske mreže za binarnu klasifikaciju
          rizika od srčanog oboljenja. Model na osnovu 13 medicinskih parametara procenjuje
          da li postoji rizik od prisustva srčanog oboljenja.
        </p>
      </section>

      <section className="about-section">
        <h2>Dataset attributes</h2>
        <div className="attribute-grid">
          <p><strong>age:</strong> age in years</p>
          <p><strong>sex:</strong> 1 = male, 0 = female</p>
          <p><strong>cp:</strong> chest pain type</p>
          <p><strong>trestbps:</strong> resting blood pressure</p>
          <p><strong>chol:</strong> serum cholesterol</p>
          <p><strong>fbs:</strong> fasting blood sugar &gt; 120 mg/dl</p>
          <p><strong>restecg:</strong> resting ECG result</p>
          <p><strong>thalach:</strong> maximum heart rate achieved</p>
          <p><strong>exang:</strong> exercise induced angina</p>
          <p><strong>oldpeak:</strong> ST depression induced by exercise</p>
          <p><strong>slope:</strong> slope of the peak exercise ST segment</p>
          <p><strong>ca:</strong> number of major vessels</p>
          <p><strong>thal:</strong> thalassemia test result</p>
        </div>
      </section>

      <section className="about-section">
        <h2>Machine learning pipeline</h2>
        <ol className="pipeline-list">
          <li>Podaci se učitavaju iz heart disease dataset-a.</li>
          <li>Ulazni atributi se skaliraju korišćenjem StandardScaler-a.</li>
          <li>SMOTE se koristi za balansiranje trening skupa.</li>
          <li>MLP neuronska mreža trenira se nad skaliranim i balansiranim podacima.</li>
          <li>Trenirani model, scaler i redosled atributa čuvaju se kao deployment artefakti.</li>
          <li>FastAPI servis učitava model i vraća predikciju za nove ulazne podatke.</li>
        </ol>
      </section>

      <section className="about-section">
        <h2>System architecture</h2>
        <div className="architecture-box">
          React frontend → Spring Boot backend → Python FastAPI AI service → MLP model → PostgreSQL
        </div>
      </section>

      <section className="about-section">
        <h2>Model output</h2>
        <p>
          Model vraća binarnu klasu, verovatnoću i nivo rizika. Klasa 0 označava odsustvo
          srčanog oboljenja, dok klasa 1 označava prisustvo srčanog oboljenja. Na osnovu
          verovatnoće dodatno se prikazuje Low, Medium ili High nivo rizika.
        </p>
      </section>
    </div>
  );
}

export default AboutModel;