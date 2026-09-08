import Project from '../Models/project.model.js';
import redis from '../../../shared/Redis/redis.js';

// CREATE PROJECT
export const createProject = async (req, res) => {
    try {
        const userId = req.header("x-user-id");

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            });
        }

        const project = await Project.create({
            name,
            description,
            owner: userId
        });

        // Invalidate cache
        await redis.del(`projects:${userId}`);

        return res.status(201).json({
            message: "Project created successfully",
            project
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


// GET ALL PROJECTS
export const getProjects = async (req, res) => {
    try {
        const userId = req.header("x-user-id");

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const key = `projects:${userId}`;

        // 1. Check Redis
        const cachedProjects = await redis.get(key);

        if (cachedProjects) {
            console.log("Projects fetched from Redis");

            return res.status(200).json({
                projects: JSON.parse(cachedProjects)
            });
        }

        // 2. Fetch from MongoDB
        console.log("Projects fetched from MongoDB");

        const projects = await Project.find({
            owner: userId
        });

        // 3. Store in Redis
        await redis.set(
            key,
            JSON.stringify(projects),
            {
                EX: 300 // 5 minutes
            }
        );

        return res.status(200).json({
            projects
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


// GET PROJECT BY ID
export const getProjectById = async (req, res) => {
    try {
        const userId = req.header("x-user-id");

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const { id } = req.params;

        const key = `project:${id}`;

        // Check Redis
        const cachedProject = await redis.get(key);

        if (cachedProject) {
            console.log("Project fetched from Redis");

            return res.status(200).json({
                project: JSON.parse(cachedProject)
            });
        }

        // MongoDB
        const project = await Project.findOne({
            _id: id,
            owner: userId
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        // Save in Redis
        await redis.set(
            key,
            JSON.stringify(project),
            {
                EX: 300
            }
        );

        return res.status(200).json({
            project
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


// TOGGLE STAR
export const toggleStarProject = async (req, res) => {
    try {
        const userId = req.header("x-user-id");

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const { id } = req.params;

        const project = await Project.findOne({
            _id: id,
            owner: userId
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        project.starred = !project.starred;

        await project.save();

        // Invalidate both caches
        await redis.del(`project:${id}`);
        await redis.del(`projects:${userId}`);

        return res.status(200).json({
            message: "Project star status toggled successfully",
            project
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


// DELETE PROJECT
export const deleteProject = async (req, res) => {
    try {
        const userId = req.header("x-user-id");

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const { id } = req.params;

        const project = await Project.findOne({
            _id: id,
            owner: userId
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        await Project.deleteOne({
            _id: id
        });

        // Invalidate cache
        await redis.del(`project:${id}`);
        await redis.del(`projects:${userId}`);

        return res.status(200).json({
            message: "Project deleted successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};