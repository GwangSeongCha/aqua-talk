var shortid = require("shortid"); //random id를 만들기위한 middleware
const url = require('url');
const querystring = require('querystring');
var models = require('../models'); //mysql sequalize를 위한 middleware

var id;             //ajax출력을 위한 임시저장공간과 동시에 logout시 초기화를 위해 전역변수
var email;          //ajax출력을 위한 임시저장공간과 동시에 logout시 초기화를 위해 전역변수
var display_name;   //ajax출력을 위한 임시저장공간과 동시에 logout시 초기화를 위해 전역변수
var google_id;      //ajax출력을 위한 임시저장공간과 동시에 logout시 초기화를 위해 전역변수
var isNewRegister; //새로운 회원인지 이미 가입된 회원인지 저장하기위한 변수 

module.exports = function (app) {


    var passport = require("passport"),
        LocalStrategy = require("passport-local").Strategy,
        GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {      //처음 로그인할떄 세션저장
        //구글 로그인정보가 넘어옴
        //  console.log('serializeUser', user)
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {      //리다이렉트할때마다 세션검사
        console.log("id", id);

        
       

            done(null, id);

            
            // project는 Project 테이블에서 title이 'aProject'인 첫번째 항목 || 또는 null
       
        
    });



    var googleCredentials = require("../config/google.json");
    // console.log(googleCredentials.web.client_id);
    passport.use(
        new GoogleStrategy({
                clientID: googleCredentials.web.client_id,          //구글환경설정
                clientSecret: googleCredentials.web.client_secret,  //구글환경설정
                callbackURL: googleCredentials.web.redirect_uris[0],    //구글환경설정
                passReqToCallback: true,
            },
            function (request, accessToken, refreshToken, profile, done) {
                //  console.log('Googlestragey', accessToken, refreshToken, profile)
                email = profile.emails[0].value;
                //console.log("email is ", profile._json);
                console.log("profile123132",profile);
                request.id = profile._json;
                //console.log("accaccess",request.accessToken);

                user = {
                    email: email,
                    id: profile.id,
                    displayName: profile.displayName,
                   
                };
                //변수에 저장


                models.User        //User_webs 테이블
                    .findOrCreate({     //where에 있으면 select 없으면 insert
                        where: {
                            email: user.email

                        },
                        defaults: {         
                            userid: user.id,
                            username: user.displayName
                            
                        }
                    })
                    .then(user_info => {        //findorcreate 실행되고나서
                        console.log("user", user_info[0]._options.isNewRecord); //새로 생성된건지 기존에 있는건지
                        isNewRegister = user_info[0]._options.isNewRecord;
                        console.log(user_info[0].dataValues.id)
                      
                        email = user_info[0].dataValues.email
                        display_name = user_info[0].dataValues.displayName
                        google_id = user_info[0].dataValues.id
                    })

                done(null, user)        





            }
        )
    );

    app.get(                //로그인 창 뜨는 주소
        "/auth/google",
        passport.authenticate("google", {
            // scope: 'https://www.google.com/m8/feeds' //기능들 허용하는거
            scope: ["https://www.googleapis.com/auth/plus.login", "email"],
        })
    );

    app.get(                //결과창 
        "/auth/google/callback",
        passport.authenticate("google", {
            failureRedirect: "/auth/login",     //실패했을때 다시 로그인창
        }),
        function (req, res) {

            res.redirect('/');          
        }
    );

    app.get('/user_info', (req, res) => {           //
        res.header({
            "Access-Control-Allow-Origin": "*",
        });
        res.json({
            user_info: {
                id: id,
                email: email,
                display_name: display_name,
                google_id: google_id


            }
        })
    });
    app.get('/logout', (req, res) => {      //로그아웃을 했을때 추가적으로 구글 로그아웃이 되려면  
                                            //https://mail.google.com/mail/u/0/?logout&hl=en로 href걸면된다 서버에서 했을경우 cors발생 클라이언트에서 일단 하고 
                                            //후에 https 적용됫을때 서버해서 했을대도 통하는지 확인할예정
        id = "";
        email = "" ;
        display_name = "";
        google_id = "";
        isNewRegister = "";
        req.logout()
        res.redirect("/");
    });





    return passport;
};