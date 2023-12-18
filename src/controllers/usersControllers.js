import UserDao from "../daos/UserDao.js";

const userDao = new UserDao();

// Controlador para el registro de usuarios
const register = async (req, res, next) => {
  try {
    const user = req.body;
    const result = await userDao.register(user);

    if (result) {
      res.redirect('/');
    } else {
      res.redirect('/errorRegister');
    }
  } catch (error) {
    console.error('Error en el controlador de registro:', error);
    next(error);
  }
};

// Controlador para el inicio de sesión
const login = async (req, res, next) => {
  try {
    if (req.session.user) {
      res.redirect('/errorLogin');
      return;
    }

    const user = req.body;
    const userWithoutSensitiveInfo = await userDao.login(user);

    if (userWithoutSensitiveInfo) {
      req.session.user = userWithoutSensitiveInfo;
      res.redirect('/products');
    } else {
      res.redirect('/errorCredencial');
    }
  } catch (error) {
    console.error('Error en el controlador de inicio de sesión:', error);
    next(error);
  }
};

// Controlador para cerrar sesión
const logout = (req, res, next) => {
  try {
    req.session.destroy();
    res.redirect('/');
  } catch (error) {
    console.error('Error en el controlador de cierre de sesión:', error);
    next(error);
  }
};

export { register, login, logout };






// import UserDao from "../daos/UserDao.js";

// const userDao = new UserDao();


// //Función para determinar si es una solicitud de API(postman o handlebars(html))
// const isApiRequest= (req) => {
//     const acceptHeader = req.get('Accept');
//     return acceptHeader && acceptHeader.includes('application/json')
// }

// // Controlador para el registro de usuarios
// const register = async (req, res, next) => {
//     try {
//         const user = req.body; // Asegúrate de que tu solicitud (req) contenga la información del usuario
//         const result = await userDao.register(user);

//         if (result) {
//             res.status(201).json({ message: 'Usuario registrado correctamente' });
//         } else {
//             res.status(400).json({ message: result.message });
//         }
//     } catch (error) {
//         console.error('Error en el controlador de registro:', error);
//         next(error);
//     }
// };

// // Controlador para el inicio de sesión
// const login = async (req, res, next) => {
//     try {

//         if(req.session.user){
//             return res.status(400).json({message:'Ya has iniciado sesión.'})
//         }
//         const user = req.body; // Asegúrate de que tu solicitud (req) contenga las credenciales del usuario
//         const userWithoutSensitiveInfo = await userDao.login(user);

//         if (userWithoutSensitiveInfo) {
//             req.session.user = userWithoutSensitiveInfo; // Guardar el usuario en la sesión
//             res.json({ message: 'Inicio de sesión exitoso', user: userWithoutSensitiveInfo });
//         } else {
//             res.status(401).json({ message:'Credenciales incorrectas' });
//         }
//     } catch (error) {
//         console.error('Error en el controlador de inicio de sesión:', error);
//         next(error);
//     }
// };

// // Controlador para cerrar sesión
// const logout = (req, res, next) => {
//     try {
//         req.session.destroy(); // Destruir la sesión actual
//         res.json({ message: 'Sesión cerrada correctamente' });
//     } catch (error) {
//         console.error('Error en el controlador de cierre de sesión:', error);
//         next(error);
//     }
// };

// export { register, login, logout };
