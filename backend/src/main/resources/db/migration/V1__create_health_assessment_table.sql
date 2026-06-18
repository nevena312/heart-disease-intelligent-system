CREATE TABLE health_assessment
(
    id BIGSERIAL PRIMARY KEY,

    age INTEGER NOT NULL,
    sex INTEGER NOT NULL,
    cp INTEGER NOT NULL,
    trestbps INTEGER NOT NULL,
    chol INTEGER NOT NULL,
    fbs INTEGER NOT NULL,
    restecg INTEGER NOT NULL,
    thalach INTEGER NOT NULL,
    exang INTEGER NOT NULL,

    oldpeak DOUBLE PRECISION NOT NULL,

    slope INTEGER NOT NULL,
    ca INTEGER NOT NULL,
    thal INTEGER NOT NULL,

    predicted_class INTEGER NOT NULL,

    probability DOUBLE PRECISION NOT NULL,

    risk_level VARCHAR(20) NOT NULL,

    message VARCHAR(255) NOT NULL,

    created_at TIMESTAMP NOT NULL
);