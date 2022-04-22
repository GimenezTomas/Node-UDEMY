const { Router } = require('express')
const {usersGET, usersDELETE, usersPATCH, usersPOST, usersPUT} = require('../controllers/users')
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-field')

const Role = require('../models/Role')

const router = Router()


router.get('/', usersGET )

router.put('/:id', usersPUT )

router.post('/', [
    check('mail', 'no es valido').isEmail(),
    check('name', 'El nombre es ovligatoriio').not().isEmpty(),
    check('password', 'El password debe de ser de mas de 6 letras').isLength({min: 6}),
    //check('rol', 'No es un rol vañidp').isIn('ADMIN_ROLE', 'USER_ROLE'),
    check('role').custom( async(role = '' ) => {
        const roleExists = await Role.findOne({ role })
        if( !roleExists ){
            throw new Error(`El rol ${role} no existe`)
        }
    }), 
    validateFields
], usersPOST )
//en el medio van los middlewears
router.delete('/', usersDELETE )

router.patch('/', usersPATCH )

module.exports = router;
