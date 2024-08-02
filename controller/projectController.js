const projects = require("../model/projectModel");


exports.addProjectController = async(req,res)=>{
    console.log('inside addprojectcontroller');
    const userid = req.payload
    console.log(userid);
    const {title, language, github, website, overview} = req.body
    const projectimg = req.file.filename
    try {
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json('Project already exist')
        }
        else{
            const newProject = new projects({
                title,language,github,website,overview,projectimg,userid
            })
            await newProject.save()
            res.status(200).json(newProject)
        }

    } catch (error) {
        res.status(401).json(error)
    }
}

exports.getAllProjectController = async(req,res)=>{
    const searchKey = req.query.search
    console.log(searchKey);

    try {
        const query = {
            language:{$regex:searchKey,$options:'i'}
        }

        const allProjects = await projects.find(query)
        if(allProjects){
            res.status(200).json(allProjects)
        }
        else{
            res.status(406).json('No projects')
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.homeProjectsController = async(req,res)=>{
    try {
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.userProjectController = async(req,res)=>{
    const userid = req.payload
    console.log(userid);

    try {
        const userProject = await projects.find({userid})
        if(userProject){
            res.status(200).json(userProject)
        }
        else{
            res.status(406).json('No Project Added Yet')
        }

    } catch (error) {
        res.status(401).json(error)
    }
}

exports.deleteProjectController = async(req,res)=>{
    console.log('inside delete function');
    const {id} = req.params
    console.log(id);

    try {
        // delteOne - return true or false
        // findByIdAndDelete - documents
        const project = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(project)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.editProjectController = async(req,res)=>{
    const {id} = req.params
    const {userid} = req.payload
    
    const {title, language, github, website, overview, projectimg} = req.body

    const uploadedImage = req.file? req.file.filename:projectimg

    try {
        const existingProject = await projects.findByIdAndUpdate({_id:id},{title,language,github,website,overview,projectimg:uploadedImage,userid})
        
        await existingProject.save()
        res.status(200).json(existingProject)

    } catch (error) {
        res.status(401).json(error)
    }
}