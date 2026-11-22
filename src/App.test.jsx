import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { DATA } from "./data";

// Starting tasks: Eat (completed), Sleep, Repeat

function renderApp() {
  // userEvent simulates real typing and clicking, including focus changes
  const user = userEvent.setup();
  render(<App initialTasks={DATA} />);
  return { user };
}

describe("task list", () => {
  it("shows the starting tasks", () => {
    renderApp();
    expect(screen.getByRole("checkbox", { name: "Eat" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Sleep" })).not.toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Repeat" })).not.toBeChecked();
  });

  // MDN's exercise, left for students: see the NOTE in Form.jsx
  it.todo("does not add a task when the name is empty");
});

describe("editing a task", () => {
  it("gives the edit field a different id from the checkbox", async () => {
    const { user } = renderApp();
    const checkboxId = screen.getByRole("checkbox", { name: "Sleep" }).id;

    await user.click(screen.getByRole("button", { name: "Edit Sleep" }));

    expect(screen.getByLabelText("New name for Sleep").id).not.toBe(checkboxId);
  });

  it("renames the task and returns focus to its Edit button", async () => {
    const { user } = renderApp();
    await user.click(screen.getByRole("button", { name: "Edit Sleep" }));

    const field = screen.getByLabelText("New name for Sleep");
    await user.clear(field);
    await user.type(field, "Nap");
    await user.click(screen.getByRole("button", { name: "Save new name for Sleep" }));

    expect(screen.getByRole("checkbox", { name: "Nap" })).toBeInTheDocument();
    expect(screen.queryByRole("checkbox", { name: "Sleep" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Edit Nap" })).toHaveFocus();
  });
});
