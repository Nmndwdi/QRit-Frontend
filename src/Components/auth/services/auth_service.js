// import cookies from 'js-cookie';
import httpErrorHandle from '../../../common/error_handling.js';
import Toaster from '../../../common/toaster';
import GlobalVariables from '../../../constants/GlobalVariables.js';

class AuthService
{
    static async Signup(data)
    {
        try {
            const response = await fetch(`${GlobalVariables.uri}/api/signup`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body:JSON.stringify(data)
            });

            // console.log(response);
            function onSuccess()
            {
                Toaster("Account created! Login with the same credentials!","success");
            }
            httpErrorHandle(response,onSuccess);
        } 
        catch (e) 
        {
            Toaster(e.message,"error");
        }
    }

    static async Signin(data)
    {
        try {
            const response = await fetch(`${GlobalVariables.uri}/api/signin`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body:JSON.stringify(data)
            });

            // console.log(response);        
            async function onSuccess()
            {
                const resdata= await response.json();
                // console.log(resdata['name']);
                localStorage.setItem('x-user-name',resdata['name']);
                localStorage.setItem('x-auth-token', resdata['token']);
                localStorage.setItem('x-user-id',resdata['_id']);
                
                Toaster("Login successful!","success");
            }
            await httpErrorHandle(response,onSuccess);

            function delay(ms) {
                return new Promise((resolve) => {
                  setTimeout(resolve, ms);
                });
              }

            await delay(1000);

            return response;
            
        } 
        catch (e) 
        {
            Toaster(e.message,"error");
        }
    }
}

export default AuthService