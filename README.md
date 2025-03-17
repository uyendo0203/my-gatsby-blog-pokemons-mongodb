# My Gatsby Blog with Pokémon and MongoDB

<p align="center">
  A Gatsby-powered static site integrated with MongoDB for data storage. This project features a Pokémon list and a blog with full CRUD (Create, Read, Update, Delete) functionality. Optimized for performance and scalability using Gatsby's static file generation capabilities.
</p>

---

## 🛠 Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```shell
   git clone https://github.com/uyendo0203/my-gatsby-blog-pokemons-mongodb
   cd my-gatsby-blog-pokemons-mongodb
   ```

2. **Install dependencies**:
   ```shell
   npm install
   ```

3. **Start the development**:
   ```shell
   npm run develop
   ```

4. **Start server**:
   ```shell
    node server.js 
   ```

---

## 🚀 Features

- **Pokémon List**: View, add, edit, and delete Pokémon entries.
- **Blog**: Create, update, and manage blog posts.
- **Development Server**: Access the site at `http://localhost:8000` during development.

---

## 📂 File Structure

The project is organized as follows:

```
|__ api/               # api by nodejs (blog, pokemon)
├── src/
│   ├── components/    # Reusable React components (e.g., Header, Footer, etc.)
│   ├── pages/         # Static and dynamic pages (e.g., index.js, blog.js)
│   ├── templates/     # Templates for programmatically created pages (e.g., blog-post.js)
│   ├── styles/        # CSS and SCSS files for styling components
│   └── utils/         # Utility functions and helpers
├── gatsby-config.js   # Configuration file for Gatsby plugins and site metadata
├── gatsby-node.js     # Node APIs for creating dynamic pages and sourcing data
├── .env               # Environment variables (e.g., MongoDB connection string)
├── package.json       # Project dependencies and npm scripts
├── server.js          # Run node server with mongodb
├── README.md          # Project documentation
└── LICENSE            # License information
```

Each folder and file serves a specific purpose to ensure the project is modular and maintainable.

---

## 📖 Usage

1. **Pokémon Management**:
   - Add, edit, or delete Pokémon entries.
   - View the Pokémon list dynamically rendered from MongoDB.

2. **Blog Management**:
   - Create, update, and delete blog posts.
   - Manage content easily through the integrated CRUD functionality.

3. **Development**:
   - Run the development server and access the site at `http://localhost:8000`.

---

## 🌟 Technologies Used

- **Gatsby**: Static site generator for fast and scalable web applications.
- **MongoDB**: NoSQL database for storing Pokémon and blog data.
- **React**: Component-based UI library for building the frontend.
- **Node.js**: Backend runtime for server-side logic.


## 📜 License## 🤝 Contributing

This project is licensed under the [MIT License](LICENSE).Contributions are welcome! Feel free to submit a pull request or open an issue for any bugs or feature requests.

------

## 🤝 Contributing## 📧 Contact








For any inquiries, reach out to [uyendo0203](mailto:uyendo0203@example.com).## 📧 Contact---Contributions are welcome! Feel free to submit a pull request or open an issue for any bugs or feature requests.For any inquiries, reach out to [uyendo0203](mailto:uyendo0203@example.com).