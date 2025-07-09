import { z } from "zod";

/*Tasks */

export const taskStatusSchema = z.enum(["pending" , "onHold" , "inProgress" , "underReview" , "completed"])
export const TaskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  project: z.string(),
  description: z.string(),
  status: taskStatusSchema
});

export type Task = z.infer<typeof TaskSchema>;
export type TaskFormData = Pick<Task, 'description' | 'name' >

/* Projects */
export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  tasks: z.array(TaskSchema)
});

export const dashBoardProjectSchema = z.array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
  })
);

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<
  Project,
  "clientName" | "projectName" | "description"
>;
