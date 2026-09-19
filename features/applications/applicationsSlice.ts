import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "@/lib/api";
import { JobApplication } from "@/lib/types";
import type { RootState } from "@/lib/store";

import type { Pagination } from "@/lib/types";

type ApplicationsState = {
  items: JobApplication[];
  selected: JobApplication | null;
  loading: boolean;
  error: string | null;
  pagination: Pagination | null;
};

const initialState: ApplicationsState = {
  items: [],
  selected: null,
  loading: false,
  error: null,
  pagination: null,
};

type ApplicationsFilter = {
  search?: string;
  status?: string;
  source?: string;
  city?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  all?: boolean;
};

export const fetchApplications = createAsyncThunk(
  "applications/fetchAll",
  async (
    filter: ApplicationsFilter | undefined,
    { getState, rejectWithValue }
  ) => {
    try {
      const token = (getState() as RootState).auth.token;

      const query = new URLSearchParams();
      if (filter?.search) query.set("search", filter.search);
      if (filter?.status) query.set("status", filter.status);
      if (filter?.source) query.set("source", filter.source);
      if (filter?.city) query.set("city", filter.city);
      if (filter?.startDate) query.set("startDate", filter.startDate);
      if (filter?.endDate) query.set("endDate", filter.endDate);
      if (filter?.all) {
        query.set("all", "true");
      } else if (filter?.page) {
        query.set("page", String(filter.page));
      }
      const qs = query.toString();

      const res = await apiRequest<{
        data: JobApplication[];
        pagination: Pagination;
      }>(`/applications${qs ? `?${qs}` : ""}`, { token });
      return res;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const fetchApplicationById = createAsyncThunk(
  "applications/fetchById",
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const token = (getState() as RootState).auth.token;
      const res = await apiRequest<{ data: JobApplication }>(
        `/applications/${id}`,
        { token }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const createApplication = createAsyncThunk(
  "applications/create",
  async (
    payload: Omit<JobApplication, "id">,
    { getState, rejectWithValue }
  ) => {
    try {
      const token = (getState() as RootState).auth.token;
      const res = await apiRequest<{ data: JobApplication }>("/applications", {
        method: "POST",
        body: payload,
        token,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const updateApplication = createAsyncThunk(
  "applications/update",
  async (
    { id, data }: { id: string; data: Partial<JobApplication> },
    { getState, rejectWithValue }
  ) => {
    try {
      const token = (getState() as RootState).auth.token;
      const res = await apiRequest<{ data: JobApplication }>(
        `/applications/${id}`,
        { method: "PUT", body: data, token }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const deleteApplication = createAsyncThunk(
  "applications/delete",
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const token = (getState() as RootState).auth.token;
      await apiRequest(`/applications/${id}`, { method: "DELETE", token });
      return id;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchApplicationById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(createApplication.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateApplication.fulfilled, (state, action) => {
        const index = state.items.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
        state.selected = action.payload;
      })
      .addCase(deleteApplication.fulfilled, (state, action) => {
        state.items = state.items.filter((a) => a.id !== action.payload);
      });
  },
});

export default applicationsSlice.reducer;
