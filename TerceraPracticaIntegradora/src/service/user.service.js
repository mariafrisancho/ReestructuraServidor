import { usersDao } from "../persistence/index.js";
export class UserService{

    // buscar usuario por id
  static getUserbyid=(userId)=>{
     return usersDao.getUserbyid(userId);
  }
  // buscar usaurio por Email

  static getUserbyEmail=(userEmail)=>{
    return usersDao.getUserbyEmail(userEmail);
  }

   // Crear usuario
   static signupUser=(userinfo)=>{
    return usersDao.signupUser(userinfo);
   };
   // actualizar usuario
   static updateUser=(id,user)=>{
    return usersDao.updateUser(id,user);

   };
    // login user

    static loginUser=(logininfo)=>{
        return usersDao.loginUser(logininfo);
    }

}