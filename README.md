# Project Template
A minimal template for modern Python projects.

## How to use this template to create a new project repository
1. Select this template under the "Repository template" dropdown when you [create a repository in Github](https://github.com/organizations/modulai/repositories/new).
2. Clone the repository and open this README.md in your editor to continue from there.
2. Go over the files in the created repository and understand what each tool/file does.
3. Update this readme by replacing the "MY_AWESOME_PROJECT" name below and briefly describe the project.
4. Update the project name in [src/your_project_name](src/your_project_name) and inside of [pyproject.toml](pyproject.toml)
5. If you want to use mypy for typing, uncomment mypy related configs in [pyproject.toml](pyproject.toml) and [.pre-commit-config.yaml](.pre-commit-config.yaml)
6. (Optional) Create a project tracker/planning using [the template](https://github.com/orgs/modulai/projects/29)
7. Finally, remove any information from this readme that is no longer required.

## How to contribute to this template
1. Create a descriptive issue in this project. (Or write in Slack)

# MY_AWESOME_PROJECT
## Get started
### Install Python and Poetry
Install the Python version specified in [pyproject.toml](pyproject.toml) to your system.

Install Poetry [(Instructions on their website)](https://python-poetry.org/) or run the command

```bash
curl -sSL https://install.python-poetry.org | python3 -
```

### Install Requirements
Most of the requirements are installed with the following command
```bash
cd path/to/git-repo
poetry env use 3.10 # Tells Poetry which Python version to use
make install_dependencies
```

### Other Commands
Other useful commands for the project can be found in the [Makefile](Makefile).
