import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api"
});

export const createAssessment = async (data) => {
  const response = await api.post("/assessments", data);
  return response.data;
};

export const getAssessments = async () => {
  const response = await api.get("/assessments");
  return response.data;
};

export const updateDoctorNote = async (id, doctorNote) => {
  const response = await api.patch(
    `/assessments/${id}/note`,
    {
      doctorNote
    }
  );

  return response.data;
};