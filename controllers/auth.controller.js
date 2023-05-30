const db = require('../config/db');
const User = db.user;
const sequelize = db.sequelize;
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { QueryTypes } = require('sequelize');

const nestMenu = (menuData) => {

    let nestedMenuT = [];

    for (const key in menuData) {
        const menu = menuData[key];
        const trueKey = menu.men_id;
        const parentId = menu.men_idpadre;

        const { children, ...menuWithoutChildren } = menu;

        if (!parentId) {
            // Root level menu item
            nestedMenuT.push({ ...menuWithoutChildren, children: [] });
        } else {
            const parentItem = nestedMenuT.find(item => item.men_id === parentId);
            parentItem.children.push({ ...menuWithoutChildren });
        }
    }

    return nestedMenuT;
};



// @desc Login
// @route POST /login
// @access Public
const login = async (req, res) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' })
        }

        const [results] = await db.sequelize.query(`CALL SP_USUARIO_AUTH('${email}')`, { type: QueryTypes.SELECT });

        if (!results[0]) return res.status(404).json({ message: 'Usuario no encontrado' })

        const user = { ...results[0] }

        if (user.est_nombre === 'Inactivo') {
            return res.status(401).json({ message: 'Usuario Inactivo' }) //Unauthorized
        }

        const match = password === user.usu_clave
        //const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(401).json({ message: 'Contraseña incorrecta' }) //Unauthorized

        const [menuData] = await db.sequelize.query(`CALL USP_Menu_List('${user.rol_id}')`, { type: QueryTypes.SELECT });

        const nestedMenuData = nestMenu(menuData);

        const userResponse = {
            userInfo: {
                id: user.usu_id,
                cuenta: user.usu_cuenta,
                nombre: user.usu_nombre,
                fechacreacion: user.usu_fechacreacion,
                fechavencimientoclave: user.usu_fechavencimientoclave,
                estado: user.est_nombre,
                rol: user.rol_nombre,
                id_rol: user.rol_id
            },
            companyInfo: {
                id: user.emp_id,
                nombre: user.emp_nombre,
                direccion: user.emp_direccion,
                telefono: user.emp_telefono,
                pais: user.pai_nombre
            },
            menuInfo: nestedMenuData
        };

        const accessToken = jwt.sign(
            {
                ...userResponse
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        )

        const refreshToken = jwt.sign(
            { cuenta: user.usu_cuenta, },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        )

        // Create secure cookie with refresh token 
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
        })

        // Send accessToken containing username and roles 
        res.json({ ...userResponse, accessToken });

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    login,
}