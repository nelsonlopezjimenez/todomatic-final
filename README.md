# todomatic-final-exam

Sample todo app built with React and [Vite](https://vite.dev/). It is the base project for the course final project.

The app comes from MDN's
[React tutorials](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/React_getting_started)
([mdn/todo-react](https://github.com/mdn/todo-react)).

## Getting started

You need [Node.js](https://nodejs.org/en/). The version is in [.nvmrc](.nvmrc). The project uses **npm**.

```bash
npm ci
npm run dev
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for branches, commit messages and code conventions.

## Available scripts

| Command           | What it does                                           |
| ----------------- | ------------------------------------------------------ |
| `npm run dev`     | Start the dev server at http://localhost:3000          |
| `npm run build`   | Build the production bundle into `dist/`               |
| `npm run preview` | Serve the built `dist/` folder locally                 |
| `npm run lint`    | Run ESLint on all `.js` / `.jsx` files                 |
| `npm test`        | Run the tests once (Vitest + React Testing Library)    |
| `npm run test:watch` | Re-run the tests whenever a file changes            |

## Deployment

Pushing to `main` runs [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which lints, tests and builds the app, then publishes it to GitHub Pages.
If lint or tests fail, nothing is published.

GitHub Pages serves project sites from `/<repo-name>/`, so the workflow sets `BASE_PATH` to that and [vite.config.js](vite.config.js) uses it as `base`.
Locally `base` is `/`.

## Learn more

- [React documentation](https://react.dev/)
- [Vite documentation](https://vite.dev/guide/)
- [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## License

This project is based on MDN's code and is licensed under the [Mozilla Public License 2.0](LICENSE).
