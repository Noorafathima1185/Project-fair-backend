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