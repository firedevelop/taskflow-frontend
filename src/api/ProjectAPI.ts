import { isAxiosError } from "axios";
import api from "../lib/axios";
import { dashboardProjectSchema, Project, ProjectFormData, projectSchema } from "../types";

export const createProject = async (formData: ProjectFormData) => {
    try {
        const url = "/projects";
        const { data } = await api.post(url, formData);
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const getProjects = async () => {
    try {
        const url = "/projects";
        const { data } = await api(url);

        const response = dashboardProjectSchema.safeParse(data);

        if (response.success) {
            return response.data;
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const getFullProject = async (id: Project['_id']) => {
    try {
        const url = `/projects/${id}`;
        const { data } = await api(url);

        const response = projectSchema.safeParse(data);

        if (response.success) {
            return response.data;
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

type ProjectAPIType = {
    formData: ProjectFormData,
    projectId: Project['_id']
}

export const updateProject = async ({ formData, projectId }: ProjectAPIType) => {
    try {
        const url = `/projects/${projectId}`;
        const { data } = await api.put<string>(url, formData);
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const deleteProject = async (id: Project['_id']) => {
    try {
        const url = `/projects/${id}`;
        const { data } = await api.delete<string>(url);
        console.log(data);
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
