const Sequelize = require('sequelize');

module.exports = ((sequelize,DataTypes)=>{
    return sequelize.define('is_friend',{
        email:{
            type: Sequelize.STRING(100),
            allowNull: false,
            
        },
        friend:{
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        
       

    },{
        timestamps:true,
        paranoid : true, // 삭제일 (복구용)
    })
})