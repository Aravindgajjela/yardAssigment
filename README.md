##  Please Refresh on Adding Task  ##


# Task Management Application

This is a full-stack Task Management web application built with **React.js**, **Next.js**, and **MongoDB**. The app allows users to create, edit, update, and delete tasks. Each task contains a title, description, due date, and completion status.

## Features
- Create new tasks
- Edit and update existing tasks
- Toggle task completion status
- Delete tasks
- Real-time task listing and updates
- Built using **React** for the frontend and **Next.js** for the backend API

## Technologies Used
- **Frontend**: React.js
- **Backend**: Next.js API routes
- **Database**: MongoDB
- **Styling**: CSS

---

## Setup Instructions

### 1. Clone the Repository
First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/task-manager.git
```

### 2. Install Dependencies
Navigate to the project directory and install all the required dependencies:

```bash
cd task-manager
npm install
```

### 3. Set Up MongoDB
You will need a MongoDB database to store your tasks. Follow these steps to set up MongoDB:

- Sign up for a MongoDB Atlas account (if you don't have one) and create a new cluster.
- Create a new database called `taskManager` (this is set in the code).
- In the cluster dashboard, go to **Database Access** and create a new database user with the necessary read/write permissions.
- In **Network Access**, allow access from anywhere by adding the IP 0.0.0.0/0.
- Get the **MongoDB URI** for your cluster (connection string).

### 4. Add MongoDB URI to Environment Variables
Create a `.env.local` file in the root of your project and add the following line:

```
MONGODB_URI=your-mongodb-uri-here
```

### 5. Run the Development Server
Once everything is set up, run the development server:

```bash
npm run dev
```

This will start the application at `http://localhost:3000`.

---

## Usage

- **Home Page**: You’ll see the list of tasks and can add a new task using the `TaskForm` component.
- **Edit Task**: Click on the "Edit" button to modify a task’s details.
- **Toggle Completion**: Mark a task as completed or incomplete.
- **Delete Task**: Click the "Delete" button to remove a task.

---

## Folder Structure

```
/task-manager
├── /components
│   ├── TaskForm.js          # Form to add new tasks
│   ├── TaskItem.js          # Task item that displays each task and handles actions
│   ├── TaskList.js          # Displays all tasks in a table
│   ├── EditTaskModal.js     # Modal to edit tasks
├── /pages
│   ├── /api
│   │   └── tasks.js         # Next.js API route to handle CRUD operations
│   ├── index.js             # Main page that renders the task list and form
├── /styles
│   ├── TaskForm.css         # Styling for TaskForm
│   ├── TaskItem.css         # Styling for TaskItem
│   ├── EditTaskModal.css    # Styling for the modal
├── /utils
│   └── db.js                # MongoDB database connection helper
├── .env.local               # Environment variables for MongoDB URI
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
```

---

## API Endpoints

The following API routes are available to interact with the task database:

### `GET /api/tasks`
Fetches all tasks from the database.

### `POST /api/tasks`
Creates a new task in the database. Request body should include:
```json
{
  "title": "Task Title",
  "description": "Task Description",
  "dueDate": "2025-02-20"
}
```

### `PUT /api/tasks`
Updates an existing task. Request body should include:
```json
{
  "id": "task-id",
  "title": "Updated Task Title",
  "description": "Updated Task Description",
  "dueDate": "2025-02-25",
  "completed": true
}
```

### `DELETE /api/tasks`
Deletes a task. Request body should include:
```json
{
  "taskId": "task-id"
}
```

---

## Deployment

To deploy this application in a production environment, follow these steps:

1. Set up a MongoDB instance in production (you can use MongoDB Atlas for cloud hosting).
2. Update the `.env` file with the production MongoDB URI.
3. Deploy the application to a platform like Vercel (for Next.js) or any other preferred hosting service.

For Vercel deployment:
- Connect your GitHub repository to Vercel and deploy the application.
- Ensure the **MONGODB_URI** is set as an environment variable in Vercel’s dashboard.

---

## Troubleshooting

- **Issue**: MongoDB URI connection error.
  - **Solution**: Double-check the URI in `.env.local` for correctness. Make sure the MongoDB cluster is accessible.
  
- **Issue**: The app is not showing any tasks.
  - **Solution**: Ensure the API route `/api/tasks` is correctly fetching tasks from MongoDB. Check if tasks exist in your database.

---

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---






























This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
