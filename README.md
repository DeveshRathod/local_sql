# ToDo App with PostgreSQL and Sequelize

This project is a simple ToDo application using PostgreSQL for the database and Sequelize for ORM.

## Prerequisites

- **Node.js**: Ensure Node.js is installed. [Download Node.js](https://nodejs.org/)
- **PostgreSQL**: Ensure PostgreSQL is installed. [Download PostgreSQL](https://www.postgresql.org/download/macosx/)
- **Homebrew**: For installing PostgreSQL on macOS. [Install Homebrew](https://brew.sh/)

## Setting Up PostgreSQL

1. **Install PostgreSQL:**

   ```bash
   brew install postgresql
   ```

2. **Start PostgreSQL Service:**

   ```bash
   brew services start postgresql
   ```

3. **Create a PostgreSQL User and Database:**

   Open the PostgreSQL command-line tool:

   ```bash
   psql postgres
   ```

   Execute the following commands in the `psql` prompt:

   ```sql
   CREATE USER username WITH PASSWORD password;
   CREATE DATABASE tododb;
   GRANT ALL PRIVILEGES ON DATABASE tododb TO username;
   \q
   ```

## Setting Up Sequelize

1. **Initialize the Sequelize Project:**

   In your project directory, run:

   ```bash
   npx sequelize-cli init
   ```

   This creates the following folders:

   - `config`: Contains configuration files.
   - `models`: Contains Sequelize models.
   - `migrations`: Contains migration files.
   - `seeders`: Contains seed files.

2. **Configure Sequelize:**

   Edit `config/config.json` to include your PostgreSQL credentials:

   ```json
   {
     "development": {
       "username": "username",
       "password": "password",
       "database": "tododb",
       "host": "127.0.0.1",
       "dialect": "postgres"
     }
   }
   ```

3. **Generate a Model:**

   Generate a `Todo` model with attributes:

   ```bash
   npx sequelize-cli model:generate --name Todo --attributes title:string,description:string,completed:boolean
   ```

4. **Run Migrations:**

   Apply migrations to create tables:

   ```bash
   npx sequelize-cli db:migrate
   ```

5. **(Optional) Generate a New Migration:**

   Create a new migration file:

   ```bash
   npx sequelize-cli migration:generate --name migration-name
   ```

6. **(Optional) Run Seeders:**

   Populate the database with initial data:

   ```bash
   npx sequelize-cli db:seed:all
   ```

   **Undo Seeders:**

   ```bash
   npx sequelize-cli db:seed:undo:all
   ```

7. **(Optional) Undo Migrations:**

   Revert the last migration:

   ```bash
   npx sequelize-cli db:migrate:undo
   ```

## Running the Application

1. **Start the Express Server:**

   Ensure you have a `server.js` file set up with your Express server configuration. Start it with:

   ```bash
   node server.js
   ```

2. **Start the React Application:**

   In the `client` directory, run:

   ```bash
   npm start
   ```

## Troubleshooting

- **Access Denied Error**: If you encounter an access denied error, ensure your PostgreSQL credentials are correct and that the user has the necessary privileges.
- **Connection Issues**: Check if PostgreSQL is running and listening on the correct port (default is `5432`).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
