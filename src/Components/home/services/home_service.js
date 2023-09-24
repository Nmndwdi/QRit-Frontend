import httpErrorHandle from "../../../common/error_handling";
import Toaster from "../../../common/toaster";
import GlobalVariables from "../../../constants/GlobalVariables";

class HomeService
{
    static async AddItem(data)
    {
        try {
            const id=localStorage.getItem('x-user-id');
            const token=localStorage.getItem('x-auth-token');
            if(token!=null)
            {
                const tokenres = await fetch(`${GlobalVariables.uri}/tokenIsValid`,{
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json; charset=UTF-8',
                        'x-auth-token':token,
                    },
                });
                const tokenresdata = await tokenres.json();
                if(tokenresdata===true)
                {
                    const item_name=data['item_name'];
                    const item_link=data['item_link'];
                    const response = await fetch(`${GlobalVariables.uri}/api/add-item`,{
                        method:'POST',
                        headers:{
                            'Content-Type': 'application/json; charset=UTF-8',
                            'x-auth-token':token,
                        },
                        body:JSON.stringify(
                            {
                                id,
                                item_name,
                                item_link,
                            }
                        )
                    });

                    function onSuccess()
                    {
                        Toaster("Item Added Successfully !","success");
                    }
                    httpErrorHandle(response,onSuccess);
                    if(response.status===200) return true;
                    else return false;
                }
                else
                {
                    Toaster("Signin again, Your token is invalid","error");
                    return false;
                }
            }
            else
            {
                Toaster("Signin again , Your token is invalid","error");
                return false;
            }
        } 
        catch (e) 
        {
            Toaster(e.message,"error");
        }
    }

    static async GetItems(userId)
    {
        try {
            const id=userId;
            const response = await fetch(`${GlobalVariables.uri}/api/get-items`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json; charset=UTF-8',
                    'x-user-id':id,
                },
            });

            // async function onSuccess()
            // {
            //     Toaster("Item Retrieved Successfully !","success");
            // }
            if(response.status===200)
            {
                const resdata = await response.json();
                return resdata;
            }
            else return null;
        } 
        catch (e) 
        {
            Toaster(e.message,"error");
            return null;
        }
    }

    static async DeleteItem(objectId)
    {
        try {
            const id=localStorage.getItem('x-user-id');
            const token=localStorage.getItem('x-auth-token');
            if(token!=null)
            {
                const tokenres = await fetch(`${GlobalVariables.uri}/tokenIsValid`,{
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json; charset=UTF-8',
                        'x-auth-token':token,
                    },
                });
                const tokenresdata = await tokenres.json();
                if(tokenresdata===true)
                {
                    const response = await fetch(`${GlobalVariables.uri}/api/delete-item`,{
                        method:'POST',
                        headers:{
                            'Content-Type': 'application/json; charset=UTF-8',
                            'x-auth-token':token,
                        },
                        body:JSON.stringify(
                            {
                                id,
                                objectId,
                            }
                        )
                    });

                    // const resdata = await response.json();
                    // console.log(resdata);
                    function onSuccess()
                    {
                        Toaster("Item Deleted Successfully !","success");
                    }
                    httpErrorHandle(response,onSuccess);
                    if(response.status===200) return true;
                    else return false;
                }
                else
                {
                    Toaster("Signin again , Your token is invalid","error");
                    return false;
                }
            }
            else
            {
                Toaster("Signin again , Your token is invalid","error");
                return false;
            }
        } 
        catch (e) 
        {
            Toaster(e.message,"error");
        }
    }

    static async UpdateItem(data,objectId)
    {
        try {
            const id=localStorage.getItem('x-user-id');
            const token=localStorage.getItem('x-auth-token');
            if(token!=null)
            {
                const tokenres = await fetch(`${GlobalVariables.uri}/tokenIsValid`,{
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json; charset=UTF-8',
                        'x-auth-token':token,
                    },
                });
                const tokenresdata = await tokenres.json();
                if(tokenresdata===true)
                {
                    const item_name=data['item_name'];
                    const item_link=data['item_link'];
                    const response = await fetch(`${GlobalVariables.uri}/api/update-item`,{
                        method:'POST',
                        headers:{
                            'Content-Type': 'application/json; charset=UTF-8',
                            'x-auth-token':token,
                        },
                        body:JSON.stringify(
                            {
                                id,
                                objectId,
                                item_name,
                                item_link,
                            }
                        )
                    });

                    // const resdata = await response.json();
                    // console.log(resdata);
                    function onSuccess()
                    {
                        Toaster("Item Updated Successfully !","success");
                    }
                    httpErrorHandle(response,onSuccess);
                    if(response.status===200) return true;
                    else return false;
                }
                else
                {
                    Toaster("Signin again , Your token is invalid","error");
                    return false;
                }
            }
            else
            {
                Toaster("Signin again , Your token is invalid","error");
                return false;
            }
        } 
        catch (e) 
        {
            Toaster(e.message,"error");
        }
    }
}

export default HomeService;