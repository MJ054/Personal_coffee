const { body } = require('express-validator');
const userDao = require('./dao/userDao');

const nicknameValidation = [
    body('nickname').notEmpty().withMessage('닉네임은 필수입니다.')
    .custom(async(value)=>{
        const nicknameCount = await userDao.checkNicknameDuplicate(value);
        if(nicknameCount > 0){
            throw new Error('이미 사용 중인 닉네임입니다.');
        }
    })
];

const passwordValidation = [
    body('password').notEmpty().withMessage('비밀번호는 필수입니다.'),
    body('password2').notEmpty().withMessage('비밀번호 확인은 필수입니다.')
    .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('비밀번호가 일치하지 않습니다.');
        }
        return true;
      })
];

const idValidation = [
    body('id').notEmpty().withMessage('아이디는 필수입니다.')
    .custom(async(value)=>{
        const idCount = await userDao.checkIdDuplicate(value);
        if (idCount > 0) {
            throw new Error('이미 사용 중인 아이디입니다.');
        }
    })
]

module.exports = {
  nicknameValidation,
  passwordValidation,
  idValidation
};