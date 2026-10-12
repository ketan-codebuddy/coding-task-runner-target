import { NotFoundException } from "@nestjs/common";
import { TasksService } from "./tasks.service";

describe("TasksService", () => {
  let service: TasksService;

  beforeEach(() => {
    service = new TasksService();
  });

  it("returns the initial tasks", () => {
    expect(service.findAll()).toHaveLength(2);
  });

  it("creates a task with the default todo status", () => {
    const task = service.create({ title: "Try coding-task-runner" });
    expect(task.title).toBe("Try coding-task-runner");
    expect(task.status).toBe("todo");
  });

  it("returns a task by id", () => {
    expect(service.findOne(1).title).toBe("Explore the API");
  });

  it("filters tasks by status", () => {
    expect(service.findAll("in_progress")).toHaveLength(1);
  });

  it("updates a task", () => {
    const task = service.update(1, {
      title: "Explore task endpoints",
      status: "done",
    });

    expect(task.title).toBe("Explore task endpoints");
    expect(task.status).toBe("done");
    expect(service.findOne(1)).toEqual(task);
  });

  it("removes a task", () => {
    expect(service.remove(1)).toEqual({ deleted: true, id: 1 });
    expect(service.findAll().some((task) => task.id === 1)).toBe(false);
  });

  it("throws when a task does not exist", () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
  });

  it("throws when updating a task that does not exist", () => {
    expect(() => service.update(999, { title: "Missing task" })).toThrow(
      NotFoundException,
    );
  });

  it("throws when deleting a task that does not exist", () => {
    expect(() => service.remove(999)).toThrow(NotFoundException);
  });
});
