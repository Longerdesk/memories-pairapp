function Validation(values){
    let error = {};
    const memoDay_pattern = /^20(1[0-9]|2[0-3])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/

    if(values.pairid === ""){
        error.pairid = "Pair ID should no be empty"
    }else if(values.pairid === "null"){
        error.pairid = "You cannot use that pair id"
    }else{
        error.pairid = ""
    }

    if(values.memoDay === ""){
        error.memoDay = "Enter memorial day"
    }else if(!memoDay_pattern.test(values.memoDay)){
        error.memoDay = "Invalid Day"
    }else{
        error.memoDay = ""
    }

    return error;
}

export default Validation;

/*
else if(!(values.passwordConf === values.password)){
        error.passwordConf = "Password do not match"
    }
    */