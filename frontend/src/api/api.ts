import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT to protected requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ====================
// AUTH
// ====================

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await api.post("/auth/register", {
    name,
    email,
    password,
  });

  return response.data;
};

export const login = async (
  email: string,
  password: string
) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  // Store JWT if returned by backend
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

// ====================
// VEHICLES
// ====================

export const getVehicles = async () => {
  const response = await api.get("/vehicles");

  return response.data;
};


export const createVehicle = async (vehicle: {
  make: string;
  model: string;
  category: string;
  price: number;
  quantity: number;
}) => {
  const response = await api.post("/vehicles", vehicle);

  return response.data;
};

export const updateVehicle = async (
  id: string,
  vehicle: {
    make: string;
    model: string;
    category: string;
    price: number;
    quantity: number;
  }
) => {
  const response = await api.put(`/vehicles/${id}`, vehicle);
  return response.data;
};

export const deleteVehicle = async (id: string | number) => {
  const response = await api.delete(`/vehicles/${id}`);

  return response.data;
};

// ====================
// VEHICLE SEARCH
// ====================

export const searchVehicles = async (params: {
  make?: string;
  model?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  const response = await api.get("/vehicles/search", {
    params,
  });

  return response.data;
};

// ====================
// INVENTORY
// ====================

export const purchaseVehicle = async (
  id: string | number
) => {
  const response = await api.post(`/vehicles/${id}/purchase`);

  return response.data;
};

export const restockVehicle = async (
  id: string | number,
  quantity: number
) => {
  const response = await api.post(`/vehicles/${id}/restock`, {
    quantity,
  });

  return response.data;
};

// ====================
// DEFAULT AXIOS INSTANCE
// ====================

export default api;