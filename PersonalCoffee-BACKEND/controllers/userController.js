const userDao = require('../dao/userDao');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
require('express-async-errors');
var createError = require('http-errors');


const userController = {

  //회원가입
  userRegister: async (req, res) => {

    const errorMessages = {};
    const result = validationResult(req);

    if (!result.isEmpty()) {
      result.array().forEach(error => {
        errorMessages[error.path] = error.msg;
      });
      return res.status(400).json({ errors: errorMessages });
    }

    const { id, password, nickname } = req.body;

    // 중복 확인 및 비밀번호 일치 여부 검사

    // 비밀번호 암호화
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 유저 등록
    userDao.register(id, hashedPassword, nickname);
    return res.status(200).json();

  },

  //로그인
  login: async (req, res, next) => {
    const errorMessages = {};
    const result = validationResult(req);

    if (!result.isEmpty()) {
      result.array().forEach(error => {
        errorMessages[error.path] = error.msg;
      });
      return res.status(400).json({ errors: errorMessages });
    }

    //로그인 성공, 실패 여부 
    const { id, password } = req.body;

    const { userId, nickname, hashedPassword } = await userDao.login(id);

    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (isPasswordValid) {
      console.log("로그인 성공");
      req.session.user = {
        userId: userId,
        id: id,
        nickname: nickname
      };

      // 세션 데이터 저장
      req.session.save((err) => {
        if (err) {
          console.error('Failed to save session:', err);
          throw createError(500, 'Failed to save session');
        } else {
          console.log('Session saved successfully');
          return res.status(200).json();
        }
      });
      
    } else {
      throw createError(400, '비밀번호가 틀렸습니다');
    }
  },

  //로그아웃
  logout: async (req, res) => {
    if (req.session.user) {
      console.log('로그아웃 처리');
      req.session.destroy(
        function (err) {
          if (err) {
            console.log('세션 삭제시 에러');
            throw createError(500, 'Failed to delete session');
          }
          console.log('세션 삭제 성공');
          return res.status(200).json();
        }
      );
    }
  },

  addNfc: async (req, res) => {

    const userId = req.session.user.userId;
    const nfcId = req.params.nfcId
    await userDao.addNfc(userId, nfcId);
    return res.status(200).json();
  }
}

module.exports = userController;