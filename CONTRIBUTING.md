# Contributing to JSONPlaceholder API

First off, thank you for considering contributing to the JSONPlaceholder API! It's people like you that make this project such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* Use a clear and descriptive title
* Describe the exact steps which reproduce the problem
* Provide specific examples to demonstrate the steps
* Describe the behavior you observed after following the steps
* Explain which behavior you expected to see instead and why
* Include screenshots and animated GIFs if possible

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* Use a clear and descriptive title
* Provide a step-by-step description of the suggested enhancement
* Provide specific examples to demonstrate the steps
* Describe the current behavior and explain which behavior you expected to see instead
* Explain why this enhancement would be useful
* List some other applications where this enhancement exists

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request

## Development Process

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/jsonplaceholder-api.git
   cd jsonplaceholder-api
   npm install
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the [Development Guidelines](docs/development/guidelines.md)
   - Write meaningful commit messages
   - Keep your changes focused and atomic

4. **Test Your Changes**
   ```bash
   # Run unit tests
   npm run test
   
   # Run e2e tests
   npm run test:e2e
   
   # Run linting
   npm run lint
   ```

5. **Update Documentation**
   - Update relevant documentation files
   - Add JSDoc comments for new functions/classes
   - Update API documentation if needed

6. **Create Pull Request**
   - Push your changes to your fork
   - Create a pull request from your fork to our main repository
   - Fill in the pull request template
   - Link any relevant issues

## Style Guides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with an applicable emoji:
    * 🎨 `:art:` when improving the format/structure of the code
    * 🐎 `:racehorse:` when improving performance
    * 🚱 `:non-potable_water:` when plugging memory leaks
    * 📝 `:memo:` when writing docs
    * 🐛 `:bug:` when fixing a bug
    * 🔥 `:fire:` when removing code or files
    * 💚 `:green_heart:` when fixing the CI build
    * ✅ `:white_check_mark:` when adding tests
    * 🔒 `:lock:` when dealing with security
    * ⬆️ `:arrow_up:` when upgrading dependencies
    * ⬇️ `:arrow_down:` when downgrading dependencies

### TypeScript Style Guide

Follow the [Development Guidelines](docs/development/guidelines.md) for TypeScript code style.

### Documentation Style Guide

* Use [Markdown](https://guides.github.com/features/mastering-markdown/) for documentation
* Reference methods and classes with backticks: \`methodName()\`
* Include code examples when relevant
* Keep documentation up to date with code changes

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

* `bug` - Issues that are bugs
* `documentation` - Issues about documentation
* `duplicate` - Issues that are duplicates of other issues
* `enhancement` - Issues that are feature requests
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed
* `invalid` - Issues that aren't valid
* `question` - Further information is requested
* `wontfix` - Issues that won't be worked on

## Recognition

Contributors who have made significant contributions will be recognized in our [CONTRIBUTORS.md](CONTRIBUTORS.md) file.

## Questions?

If you have any questions, please feel free to contact the maintainers or create an issue with the label `question`. 