import {getUserProfile, logOut} from "../../api/auth.api.ts";
import {useQuery} from "react-query";
import {Button} from "antd";
import {useAuth} from "../../featers/AuthContext.tsx";



export const Profile = () => {
    const {data, isLoading} = useQuery('userData', getUserProfile);
    const {setLoggedIn } = useAuth();
    const logOutHandler = () => {
        try {
            logOut()
            setLoggedIn(false)
        }
        catch (e){

        }
    }
       return (
        <>
        {!isLoading && <Button onClick={logOutHandler}>
            Logout
        </Button> }
            <ul style={{fontSize: 30}}>

                <li>
                    {data?.username}
                </li>
                <li>
                    {data?.email}
                </li>
                <li>
                    {data?.phoneNumber}
                </li>
            </ul>

        </>
    );
};
