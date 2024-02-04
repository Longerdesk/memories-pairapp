function Validation(values){
    let error = {};
    if(values.userid === ""){
        error.userid = "User ID should no be empty"
    }else{
        error.userid = ""
    }

    if(values.password === ""){
        error.password = "Password should not be empty"
    }else{
        error.password = ""
    }
    return error;
}

export default Validation;