const db = require('../config/db');
const User = db.users;
const Menu = db.menus;
const MenuRol = db.menu_roles;

const generateAccessToken = (username) => {
    if (username === "admin@gmail.com") return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY4NTExMTUwMiwiZXhwIjoxNjg1MTE1MTAyLCJzdWIiOiIxIn0.wioy7j4XX5vnj1YutcGmpHb0jkKGqWBTHbirTdzC3ZU"
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNsaWVudGVAZ21haWwuY29tIiwiaWF0IjoxNjg1MTExNDc3LCJleHAiOjE2ODUxMTUwNzcsInN1YiI6IjIifQ.HT4v9QjzrL-Fu19KfMSaroh_S6kfx45wgDFWlWrDFZ8'
}

const generateNames = (username) => {
    if (username === "admin@gmail.com") return { fullName: 'Juan', lastName: 'Perez' }
    return { fullName: 'Jose', lastName: 'Garcia' }
}

const menuAdmin = {
    menu: [
        {
            "idMenu": "1",
            "name": "Panel",
            "route": "dashboard",
            "icon": "fa fa-gear-fill",
            "order": "1",
            "submenus": []
        },
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

const getMenuItemsByRoleId = async (roleId) => {
    try {
        const menuItems = await Menu.findAll({
            attributes: ['idMenu', 'idParent', 'name', 'route', 'icon', 'order'],
            include: [{
                model: MenuRol,
                where: { fk_idRol: roleId, active: 1 },
                attributes: []
            }],
            order: [['idParent', 'ASC'], ['order', 'ASC']]
        });

        return menuItems;
    } catch (error) {
        // Handle the error appropriately
        console.error(error);
        throw error;
    }
};

// @desc Login
// @route POST /login
// @access Public
const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' })
    }

    const foundUser = await User.findOne({ where: { email: email } });

    if (!foundUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    if (!foundUser.active) {
        return res.status(401).json({ message: 'Usuario inactivo' }) //Unauthorized
    }

    //const match = await bcrypt.compare(password, foundUser.password)
    const match = password === foundUser.password

    if (!match) return res.status(401).json({ message: 'Contraseña incorrecta' }) //Unauthorized

    const accessToken = generateAccessToken(foundUser.username)
    const { fullName, lastName } = generateNames(foundUser.username)

    //const menuItems = await Menu.findAll();
    //console.log(menuItems)
    //const menuItems = await getMenuItemsByRoleId(foundUser.fk_idRol);
    //console.log(menuItems);
    const userRole = (foundUser.fk_idRol === 1 ? 'admin' : 'user');
    const userEmpresa = (foundUser.fk_idEmpresa === 1 ? 'OBEN Peru' : 'OBEN Colombia')
    const menuItems =  (foundUser.fk_idRol === 1 ? menuAdmin.menu : menuUser.menu);
    const objUser = {
        email: foundUser.email,
        fullName: fullName,
        lastName: lastName,
        role: userRole,
        menu: menuItems,
        empresa: userEmpresa
    }


    // Send accessToken containing username and roles 
    res.json({ user: objUser, accessToken: accessToken });
}

module.exports = {
    login,
}