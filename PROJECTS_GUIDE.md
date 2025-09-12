# Managing Projects on Your Website

This document explains how to add, edit, and manage projects on your website using the new JSON-based system.

## Project Structure

All projects are stored in `js/data/projects.json`. Each project has the following structure:

```json
{
  "id": "unique-project-id",
  "title": "Project Title",
  "description": "Brief project description",
  "image": "path/to/image.jpg",
  "url": "project-page-url-or-external-link",
  "demoUrl": "optional-demo-url",
  "technologies": ["Tech1", "Tech2"],
  "featured": true/false
}
```

## How to Add a New Project

1. Open `js/data/projects.json`
2. Add a new project object in the "projects" array with:
   - Unique `id` (lowercase, hyphen-separated)
   - `title` (displayed name)
   - `description` (brief summary)
   - `image` path (relative to website root)
   - `url` (project page or external link)
   - Optional `demoUrl` if there's a live demo
   - `technologies` array
   - `featured` boolean (true to show in featured section)

Example:
```json
{
  "id": "new-project",
  "title": "My New Project",
  "description": "An awesome new project",
  "image": "images/new-project.jpg",
  "url": "https://github.com/yourusername/project",
  "demoUrl": "https://demo.project.com",
  "technologies": ["Unity", "AR", "WebGL"],
  "featured": true
}
```

## How to Edit Existing Projects

1. Open `js/data/projects.json`
2. Find the project you want to edit by its `id`
3. Modify any of the fields
4. Save the file

## Featured Projects

- Set `featured: true` for projects you want to highlight
- Featured projects appear in the main section of your portfolio
- Regular projects appear in the full projects list

## Adding Project Images

1. Place your project images in the `images/` directory
2. Use relative paths in the JSON file (e.g., `"image": "images/my-project.jpg"`)
3. Recommended image size: At least 800x600 pixels, optimized for web

## Tips

- Keep descriptions concise and focused
- Use high-quality images that represent your project well
- Test links after adding them
- Maintain consistent formatting in the JSON file