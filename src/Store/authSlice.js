import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  employeeId: null,
  managerId: null,
  payrollProcessorId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setEmployeeId(state, action) {
      state.employeeId = action.payload;
    },
    setManagerId(state, action) {
      state.managerId = action.payload;
    },
    setPayrollProcessorId(state, action) {
      state.payrollProcessorId = action.payload;
    },
    clearToken(state) {
      state.token = null;
      state.employeeId = null;
      state.managerId = null;
      state.payrollProcessorId = null;
    },
  },
});

export const {
  setToken,
  setEmployeeId,
  setManagerId,
  setPayrollProcessorId,
  clearToken,
} = authSlice.actions;
export default authSlice.reducer;
