# Working on the project

How to set up the project and how to make changes to it.

## Setup

1. Install [Node.js](https://nodejs.org/en/) **26** (the version in [.nvmrc](.nvmrc)). npm comes with it.
2. Clone your repository and install the dependencies:

   ```bash
   git clone <your-repository-url>
   cd todomatic-final-exam
   npm ci
   ```

3. Start the dev server with `npm run dev` and open http://localhost:3000.

Use **npm only**, not yarn or pnpm: the project's lockfile is `package-lock.json`.

- `npm ci` installs exactly what `package-lock.json` lists. Use it after cloning or pulling.
- `npm install <package>` adds a new package and updates `package-lock.json`. Commit both `package.json` and `package-lock.json`.

## Scripts

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the dev server at http://localhost:3000 |
| `npm run lint`    | Check the code with ESLint                    |
| `npm test`        | Run the tests once                            |
| `npm run test:watch` | Re-run the tests whenever a file changes   |
| `npm run build`   | Build the production bundle into `dist/`      |
| `npm run preview` | Serve the built `dist/` folder locally        |

## Branches

Do each change on its own branch, created from an up-to-date `main`:

```bash
git switch main
git pull
git switch -c feature/save-tasks
```

Name branches `feature/<short-name>` for new features and `fix/<short-name>` for bug fixes.

## Commit messages

Write the first line as `type: what the commit does`, in the imperative ("add", not "added"), in at most 72 characters:

```
fix: count unfinished tasks in the heading

The heading used the number of tasks shown by the current filter,
so on the Completed filter it counted completed tasks as remaining.
```

Use the body to explain **why** the change was needed. Common types:

| Type       | Use for                                          |
| ---------- | ------------------------------------------------ |
| `feat`     | a new feature                                    |
| `fix`      | a bug fix                                        |
| `refactor` | a code change that does not change behaviour     |
| `style`    | formatting, typos, comments                      |
| `test`     | adding or changing tests                         |
| `docs`     | README, this guide, other documentation          |
| `build`    | dependencies, Vite or npm configuration          |
| `ci`       | GitHub Actions workflows                         |
| `chore`    | anything else (repository files, cleanup)        |

The project's own history follows these rules. Run `git log` to see examples.

## Before you commit

1. `npm run lint` passes with no errors or warnings.
2. `npm test` passes.
3. `npm run build` succeeds.
4. You tried the change in the browser, **with the keyboard too**: Tab, Enter and Space must reach and operate everything.

## Code conventions

Follow the patterns already in `src/`:

- Function components with destructured props: `function Todo({ id, name })`.
- Update state from the previous value: `setTasks((prevTasks) => ...)`.
- Never change state directly; create new arrays and objects (`map`, `filter`, `...spread`).
- Keep the accessibility features: every input has a `<label>`, buttons have
  `visually-hidden` text that names the task, and focus moves to a sensible
  element after Edit, Save, Cancel and Delete.

## Tests

Tests live next to the code they test, named `*.test.jsx` (see [src/App.test.jsx](src/App.test.jsx)).
They use [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/):
find elements the way a user would, by role and accessible name, then act with `userEvent`:

```jsx
await user.click(screen.getByRole("button", { name: "Edit Sleep" }));
expect(screen.getByLabelText("New name for Sleep")).toHaveFocus();
```

When you add a feature or fix a bug, add a test for it. A test that cannot find
an element by its name often means a screen reader cannot either.

## Pull requests

Open a pull request from your branch into `main` and fill in the template:
what you changed, why, and how you tested it.

## License

The project is based on MDN's [todo-react](https://github.com/mdn/todo-react) and is licensed under the [Mozilla Public License 2.0](LICENSE).
