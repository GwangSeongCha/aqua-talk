var express = require('express');
var router = express.Router();

var users = require('./../model/user');
var jwt = require('jsonwebtoken');
var jwtSecret = 'secret';
var models = require('../models');

var profile_url = "not_exist"; //profile
var status_message = "not_exist"; //status_message
var my_email;
var friends = new Array();
var list;
var email_list = new Array();
var name_list = new Array();
var statusMessage_list = new Array();
var profile_list = new Array();
var search_friend_name;
var email;

/*
function Signup(Email, Token, next) {
    var userModel = new user();
    userModel.email = Email;
    userModel.gtoken = Token;
    userModel.save(function (err, newUser) {
        newUser.jsonWebToken = jwt.sign(newUser, jwtSecret);
        newUser.save(function (err, savedUser) {
            next(err, savedUser);
        });
    });
}
*/

router.post('/search/friend', async (req, res, next) => {

    search_friend_name = req.body.friend_name;

    //조회
    var search_list = await models.User.findAll({
        where: {
            username: search_friend_name
        }
    })
    console.log(search_list);

    //출력
    if (search_list.length === 0) {
        res.json({
            friend_list_info: [{

                email: "",
                username: "",
                status_message: "",
                profile: ""

            }]
        })
    } else {
        res.json({
            friend_list_info: [{

                email: search_list[0].dataValues.email,
                username: search_list[0].dataValues.username,
                status_message: "",
                profile: ""

            }]
        })
    }



})

router.post('/insert/friend', async (req, res, next) => {
    email=req.body.email;
    search_friend_name = req.body.friend_name;
    //실패했을때 is_success=을 false로 만들어야됨.
    var insert = await models.Is_friend.findOrCreate({
        where: {
            email: email,
            friend: search_friend_name
        },
        defaults: {

        }
    })
    console.log("insert",insert);
    res.json({
        is_success: true
    })

})
router.post('/delete/friend', async (req, res, next) => {

    email=req.body.email;
    search_friend_name = req.body.friend_name;
    console.log("search_friend_name",search_friend_name);
    console.log("email",email);
    //실패했을때 is_success=을 false로 만들어야됨.
    var deleted = await models.Is_friend.destroy({
        where: {
            email:email,
            friend: req.body.friend_name
        },
        truncate: true
    })

    res.json({
        is_delete: true
    })
})


router.post('/update/info', async (req, res, next) => {

    var new_name = req.body.new_name;
    var new_status_message = req.body.new_status_message;
    //실패했을때 is_success=을 false로 만들어야됨.
    var insert = await models.User.update(
        {
        username: new_name,
        statusMessage: new_status_message}
       
    , 
    {
        where: {
            email: email
            
        }
    })
   
    
   
    res.json({
        is_update: true
    })


})





router.post('/login/info', (req, res, next) => {

    email = req.body.email
    var userid = req.body.userid
    var username = req.body.username

    var friend_list_array = new Array();
    console.log(1);
    models.User
        .findOrCreate({
            where: {
                email: req.body.email
            },
            defaults: {
                userid: userid,
                username: username,
                profile :"http://localhost:3002/file/download"
            }

        })

        .then((user_info) => {

            models.Is_friend.findAll({
                    where: {
                        email: user_info[0].dataValues.email
                    }
                })
                .then((friend_list) => {
                    for (i = 0; i < friend_list.length; i++) {
                        //console.log(friend_list[i].dataValues.friend)
                        friend_list_array[i] = friend_list[i].dataValues.friend;

                    }
                    my_email = user_info[0].dataValues.email;
                    

                    //가입할떄 default 사진으로 사용되게 img url로 사용할수 있께 같이전송
                    //해야되는거 select 이메일 반환하는 where문 name쓰게 
                    //  console.log(friend_list_array)
                    // console.log("여기",user_info[0].dataValues.profile)


                    if (user_info[0].dataValues.profile == null) {
                        // profile_url= __dirname+'/uploads/default.jpg'
                        profile_url = "http://localhost:3002/file/download"
                    }
                    else{
                        profile_url=user_info[0].dataValues.profile;
                    }
                    if (user_info[0].dataValues.statusMessage == null) {
                        status_message = "";
                    } else {
                        status_message = user_info[0].dataValues.statusMessage;
                    }



                    delay();

                    function result() {
                        console.log("f", friends);
                        res.json({
                            user_info: {

                                email: user_info[0].dataValues.email,
                                username: user_info[0].dataValues.username,
                                statusMessage: status_message,
                                profile: profile_url,
                                friend_list: { 
                                    email:friends[0][1],
                                    username:friends[0][2],
                                    statusMessage:friends[0][3],
                                    profile:friends[0][4]
                                    }
                            }
                        })
                    }


                    async function delay() {
                        console.log("Aaa");
                        console.log("asdasd", friend_list_array);
                        for (j = 0; j < friend_list_array.length; j++) {
                            console.log("friend_list_array[]", j, friend_list_array[j], friend_list_array.length);
                            list = await models.User.findAll({
                                where: {
                                    username: friend_list_array[j]
                                }
                            })
                            console.log("list", list);

                            if(list[0].dataValues.statusMessage==null){
                                list[0].dataValues.statusMessage="";
                            }
                            if(list[0].dataValues.profile==null){
                                list[0].dataValues.profile="";
                            }
                            friends[j] = new Array(4);
                            friends[j][0] = list[0].dataValues.email;
                            friends[j][1] = list[0].dataValues.username;
                            friends[j][2] = list[0].dataValues.statusMessage;
                            friends[j][3] = list[0].dataValues.profile;


                        }
                        return await result();
                    }

                })



        })
})






module.exports = router;