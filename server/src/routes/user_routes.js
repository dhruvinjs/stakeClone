import { Router } from "express";
import {ChangeCurrentPassword, checkMail, getCurrentUser, userRegister,investMoney, adminData, withdrawAmt, deductLostAmt, betUnits, AddWinningUnits, takeRemUnits, generateGameandrefreshToken} from "../controllers/user-controller.js";
import {loginUser} from "../controllers/user-controller.js";
import { verifyJwt } from "../middleware/auth-middleware.js";
import { logOut } from "../controllers/user-controller.js";
import cookieParser from "cookie-parser";
import { generatenewAccessToken } from "../controllers/user-controller.js";
import { adminProfile, loginAdmin, logOutAdmin, regAdmin } from "../controllers/admin-controller.js";
import {verifyAdminJwt} from '../middleware/adminAuth-middleware.js';
import { clearGameToken, gamesData, gnumTokenandNum, guessNumDailybets, overallGameData, takeProfit } from "../controllers/game-controller.js";
import { verifyGameJwt } from "../middleware/gameAuth-middleware.js";

const routers=Router();

routers.route("/register").post(userRegister);//so basically the users is the prefix and then userRegister is then the nexxt page
//so whenever we have to login or regiter go through user route
routers.route("/login").post(loginUser);

//secured routes
routers.route("/logOut").post(verifyJwt,logOut);
routers.route("/refresh-token").post(generatenewAccessToken);

routers.route("/ChangePass").post(verifyJwt,ChangeCurrentPassword);
routers.route("/GetCurrentUser").get(verifyJwt,getCurrentUser);
routers.route("/AdminData").get(adminData)
routers.route("/Resetmail").post(checkMail)
routers.route("/Invest").put(verifyJwt,investMoney)
routers.route("/Withdraw").patch(verifyJwt,withdrawAmt)
routers.route("/DeductLostAmt").patch(verifyJwt,deductLostAmt)
routers.route("/Betunits").put(verifyJwt,betUnits)
routers.route("/Depositunits").put(verifyJwt,AddWinningUnits)
routers.route("/RegAdmin").post(regAdmin);
routers.route("/Admin/Login").post(loginAdmin);
routers.route("/AdminProfile").get(verifyAdminJwt,adminProfile);
routers.route("/Adminlogout").post(verifyAdminJwt,logOutAdmin)
routers.route("/CreateGame").post(verifyAdminJwt,gamesData)
routers.route("/gameProfit").put(verifyGameJwt,takeProfit);
routers.route("/TakeRemUnits").put(verifyJwt,takeRemUnits);
routers.route('/GameLogout').post(verifyGameJwt,clearGameToken)
routers.route('/Admin/TotalGameProfit').get(verifyAdminJwt,overallGameData)
routers.route('/Dailybets').post(verifyGameJwt,guessNumDailybets)//i will take the final data when game over 
routers.route('/GnumToken').get(verifyGameJwt,gnumTokenandNum)

export default routers;

