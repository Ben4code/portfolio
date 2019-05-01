const isEmpty = (field) =>{
    if(field.trim() === '') return true;
    else return false;
}

const isEmail = (field) =>{
    const emailRegEx = 
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(field.match(emailRegEx)) return true;
    else return false;
}

const register = (data) => {
    //Validate data
    let errors = {};

    //Email
    if(isEmpty(data.email)){
        errors.email = "Email field can not be empty";
    }else if(!isEmail(data.email)){
        errors.email = "Please enter a valid email";
    }

    //Password
    if(isEmpty(data.password)){ 
        errors.password = "Password field can not be empty";
        errors.confirmPassword = "Password fields must match";
    }
    if(data.password !== data.confirmPassword) errors.confirmPassword = "Password fields must match";
    
    //Name
    if(isEmpty(data.name)) errors.handle = "Name field can not be empty";
    
    
    //Image
    //if(!data.avatar) errors.image = "Your avatar is required";
    
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}



const login = (data) => {
    
    let errors = {};
    if(isEmpty(data.email)) errors.email = "Email field is required.";
    if(isEmpty(data.password)) errors.password = "Password field is required.";
    //if(Object.keys(errors).length > 0 ) return res.status(400).json(errors);

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}


const mail = (data) => {
    
    let errors = {};
    if(isEmpty(data.name)) errors.name = "Name field is required.";
    if(isEmpty(data.message)) errors.message = "Message field is required.";
    if(isEmpty(data.email)) errors.email = "Email field is required.";
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}


const addPost = (data) => {
    //Validate data
    let errors = {};

    //Title
    if(isEmpty(data.title)) errors.title = "Title field can not be empty";
    //body
    if(isEmpty(data.body)) errors.body = "Content field can not be empty";
    //author
    if(isEmpty(data.author)) errors.author = "Author field can not be empty";
    //Image
    if(!data.postImg) errors.postImg = "Post image file is invalid";
    
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

const addComment = (data) => {
    //Validate data
    let errors = {};
    //Comment
    if(isEmpty(data.text)) errors.text = "Comment field can not be empty";
    
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

module.exports = { register, login, mail, addPost, addComment };
