import { UserModel } from "../db/models/usersSchema.js";
import bcrypt from 'bcrypt';

class UserDao {


    async findByEmail(email) {
        return await UserModel.findOne({ email: email })
    };

    isAdminCredentials(email, password) {
        return email === 'adminCoder@coder.com' && password === 'adminCod3r123'
    }


    async register(user) {
        try {
            const { email } = user;
            const exists = await this.findByEmail(email);

            if (exists) {
                throw new Error('Usuario ya registrado');
            }

            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;

            const newUser = await UserModel.create(user);
            return newUser

        } catch (error) {
            console.log('Error en register => ', error)
            throw new Error('Error al registrar usuario')
        }
    }

    async login(user) {
        try {
            const { email, password } = user;

            //Verificar si las credenciales pertenecen a un administrador
            if (this.isAdminCredentials(email, password)) {
                const userWithoutSensitiveInfo = {
                    loggedIn: true,
                    email: email,
                    role: 'admin',
                    id: '623367688188448938',
                    first_name: 'admin',
                    last_name: 'admin',
                    age: 20
                };
                return userWithoutSensitiveInfo
            }

            //Si no es admin , buscar en base de datos
            const userExist = await this.findByEmail(email);
            //Si no es admin y no existe
            if (!userExist) {
                throw new Error('Credenciales incorrectas.')
            }

            //compara password ingresada con la que esta encriptada
            const passwordMatch = await bcrypt.compare(password, userExist.password);

            if (!passwordMatch) {
                throw new Error('Credenciales incorrectas.')
            }

            const userWithoutSensitiveInfo = {
                loggedIn: true,
                id: userExist._id,
                email: userExist.email,
                first_name: userExist.first_name,
                last_name: userExist.last_name,
                age: userExist.age,
                role: userExist.role,
            };

            return userWithoutSensitiveInfo;
        } catch (error) {
            console.log('Error en login => ', error);
            throw new Error('Error al intentar iniciar sesión');
        }
    }



}

export default UserDao;