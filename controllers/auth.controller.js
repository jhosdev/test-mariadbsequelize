const db = require('../config/db');
const User = db.users;
const Rol = db.roles;
const Company = db.companies;
const Menu = db.menus;
const MenuRol = db.menu_roles;


const generateAccessToken = (username) => {
    if (username === "admin@gmail.com") return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY4NTExMTUwMiwiZXhwIjoxNjg1MTE1MTAyLCJzdWIiOiIxIn0.wioy7j4XX5vnj1YutcGmpHb0jkKGqWBTHbirTdzC3ZU"
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNsaWVudGVAZ21haWwuY29tIiwiaWF0IjoxNjg1MTExNDc3LCJleHAiOjE2ODUxMTUwNzcsInN1YiI6IjIifQ.HT4v9QjzrL-Fu19KfMSaroh_S6kfx45wgDFWlWrDFZ8'
}

const menuAdmin = {
    menu: [
        {
            "idMenu": "2",
            "name": "Usuarios",
            "route": "users",
            "icon": "fa fa-users",
            "order": "2",
            "submenus": [
                {
                    "idMenu": "3",
                    "name": "Lista",
                    "route": "list",
                    "icon": "fa fa-caret-right",
                    "order": "1"
                },
                {
                    "idMenu": "4",
                    "name": "Registrar",
                    "route": "register",
                    "icon": "fa fa-caret-right",
                    "order": "2"
                }
            ]
        },
        {
            "idMenu": "5",
            "name": "Pagos",
            "route": "payments",
            "icon": "fa fa-money",
            "order": "1",
            "submenus": [
                {
                    "idMenu": "6",
                    "name": "Pagos Pendientes",
                    "route": "pending",
                    "icon": "fa fa-caret-right",
                    "order": "1"
                }
            ]
        }
    ]
}

const menuUser = {
    menu: [
        {
            "idMenu": "5",
            "name": "Pagos",
            "route": "payments",
            "icon": "fa fa-money",
            "order": "1",
            "submenus": [
                {
                    "idMenu": "6",
                    "name": "Pagos Pendientes",
                    "route": "pending",
                    "icon": "fa fa-caret-right",
                    "order": "1"
                }
            ]
        }
    ]
}

const getUsersWithRoles = async () => {
    try {
        const users = await User.findAll({
            include: {
                model: Rol,
                attributes: ['rol'],
            },
            attributes: ['idUser', 'email'],
            raw: true
        });
        return users;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Usage
getUsersWithRoles()
.then(users => console.log(users))
.catch(error => console.error(error));

const getUserWithRoles = async (id) => {
    try {
        const users = await User.findAll({
            where : {idUser : id},
            include: {
                model: Rol,
                attributes: ['rol'],
            },
            attributes: ['idUser', 'email'],
            raw: true
        });
        return users;
    } catch (error) {
        console.error(error);
        throw error;
    }
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

        const foundUser = await User.findOne({ 
            where: { email: email },
            include: [
                {
                    model: Rol,
                    attributes: ['rol'],
                },
                {
                    model: Company,
                    attributes: ['name'],
                },
            ],
        });

        

        if (!foundUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }

        if (!foundUser.active) {
            return res.status(401).json({ message: 'Usuario inactivo' }) //Unauthorized
        }

        const match = password === foundUser.password

        //const match = await bcrypt.compare(password, foundUser.password)
        if (!match) return res.status(401).json({ message: 'Contraseña incorrecta' }) //Unauthorized


        const userObject = foundUser.get({ plain: true })

        const accessToken = generateAccessToken(foundUser.username)

        const fullName = userObject.email.split('@')[0];
        const lastName = '';
        
        const menuItems = (foundUser.fk_idRol === 1 ? menuAdmin.menu : menuUser.menu);

        const objUser = {
            id: userObject.idUser,
            email: userObject.email,
            fullName: fullName,
            lastName: lastName,
            role: userObject.rol.rol,
            empresa: userObject.empresa.name,
            menu: menuItems,
        }

        // Send accessToken containing username and roles 
        res.json({ user: objUser, accessToken: accessToken });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    login,
}