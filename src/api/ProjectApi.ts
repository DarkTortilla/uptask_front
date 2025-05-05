import { dashBoardProjectSchema, Project, ProjectFormData, projectSchema } from "../types";
import api from "../lib/axios";
import { isAxiosError } from "axios";

export async function createProject(formData:ProjectFormData) {
    try {
        const {data} = await api.post('/projects',formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjects() {
    try {
        const { data } =  await api('/projects');
        const response = dashBoardProjectSchema.safeParse(data);
        if (response.success) {
            return response.data
        } 
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
    
}

export async function getProjectById(projectId:Project['_id']) {
    try {
        const {data} = await api(`/projects/${projectId}`)
        const response = projectSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
type ProjectAPIType = {
    formData:ProjectFormData,
    projectId:Project['_id']
}

export async function updateProject( {formData,projectId}:ProjectAPIType){
    try {
        const {data} = await api.put<string>(`/projects/${projectId}`,formData)
        const response = projectSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteProject(projectId:Project['_id']) {
    try {
        const {data} = await api.delete<string>(`/projects/${projectId}`)
        const response = projectSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}