const sql = require('mssql');
const config = require('./DbConfig');

const DbOperations = async (name, email, pass) => {
    try {
        const pool = await sql.connect(config);//Sql connection

        
        const Check = await pool.request().input("email", sql.VarChar(255),email).query(`select COUNT(*) as count from Fields 
        where email= @email`);

        if(parseInt(Check.recordset[0].count) > 0){
            
            console.log("email already exists");
            return{success:false,message:"Email exists"}
        }
        const result = await pool.request()
            .input("name", sql.VarChar(100), name)
            .input("email", sql.VarChar(255), email)
            .input("pass", sql.VarChar(100), pass)
            .query(`
                INSERT INTO Fields (name, email, pass)
                VALUES (@name, @email, @pass)
            `);

        console.log("Signup Successful! Rows affected:", result.rowsAffected[0]);
        // console.log(result.recordset[0]);
        
        return { success: true, message: "Signup Successful!" };

    } catch (error) {
        console.error("Database operation failed:", error);
        return { success: false, error: error.message };
    }
};

const LoginOp=async(email,pass)=>{
try{
    const pool = await sql.connect(config);

    const fetchdetails= await pool.request()
    .input('email',sql.VarChar(255),email)
    .input('pass',sql.VarChar(100),pass)
    .query(`select COUNT(*) as count from Fields 
where email= @email And pass=@pass;`);

if(parseInt(fetchdetails.recordset[0].count,10)>0){
    return{success:true,message:`Successful login for${email}`};
}
else{
return{success:false,message:"No such email exists or password incorrect"};
}
}
catch(error){
    console.log("Internal Error",error.message)
    return {success:false}
}
};

module.exports = {
    DbOperations,
    LoginOp
};
