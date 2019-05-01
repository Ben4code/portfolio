
const isEmpty = (field) =>{
    if(field.trim() === '') return true;
    else return false;
}

const isEmail = (field) =>{
    // eslint-disable-next-line
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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




export { register, mail };