# FS Project (PlanEase)

A full-stack project for task and note management with a modern UI and robust backend.

## Features
- User authentication (login/register)
- Task management with CRUD operations
- Note management system
- Interactive dashboard
- Responsive design
- Real-time updates

## Tech Stack
- Frontend: HTML5, CSS3, JavaScript (ES6+)
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- Styling: Custom CSS with modern animations

## Project Structure
```
├── backend/          # Backend server code
├── js/              # Frontend JavaScript files
├── node_modules/    # Dependencies (ignored)
├── public/          # Static assets
├── .env            # Environment variables (ignored)
├── .gitignore      # Git ignore file
├── app.js          # Main application file
├── package.json    # Project dependencies
└── README.md       # Project documentation
```

## Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository
```bash
git clone [your-repo-url]
cd FS-Project-2025
```

2. Install dependencies
```bash
npm install
```

3. Environment Setup
   - Create a `.env` file in the root directory
   - Add the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

4. Start the development server
```bash
node backend/server.js
```

5. Access the application
   - Open your browser and navigate to `http://localhost:3000`

## API Documentation

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login existing user
- GET `/api/auth/verify` - Verify user token

### Tasks
- GET `/api/tasks` - Get all tasks
- POST `/api/tasks` - Create new task
- PUT `/api/tasks/:id` - Update task
- DELETE `/api/tasks/:id` - Delete task

### Notes
- GET `/api/notes` - Get all notes
- POST `/api/notes` - Create new note
- PUT `/api/notes/:id` - Update note
- DELETE `/api/notes/:id` - Delete note

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support
For support, email vedanshmehrotra2006@gmail.com or open an issue in the repository.
