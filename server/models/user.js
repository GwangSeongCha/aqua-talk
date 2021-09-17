const Sequelize = require('sequelize');

module.exports = ((sequelize,DataTypes)=>{
    return sequelize.define('user',{
        email:{
            type: Sequelize.STRING(100),
            allowNull: false,
            primaryKey: true,
        },
        userid:{
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        username:{
            type: Sequelize.STRING( 100),
            allowNull: false, // 카카오 로그인은 비번 필요없으니,,
        },
       
        statusMessage:{
            type:Sequelize.STRING(100),
            allowNull:true,
        },
        profile:{
            type:Sequelize.STRING(100),
            allowNull:true,
        }
       

    },{
        timestamps:true,
        paranoid : true, // 삭제일 (복구용)
    })
})