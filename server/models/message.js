module.exports = (sequelize, DataTypes) => {
    return sequelize.define('message', {
        name :{
            /* column 속성들 */
            type: DataTypes.STRING(30),
            allowNull: false,
            
           
            /* 여기까지 */
        },
        message: {
            type: DataTypes.STRING(100),
            allowNull: false,
            
        },
       
    }, {
        timestamps: false,
    });
}
