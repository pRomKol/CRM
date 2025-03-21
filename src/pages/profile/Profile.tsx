import {getUserProfile, logOut} from "../../api/auth.api.ts";
import {useQuery} from "react-query";
import {Button} from "antd";



export const Profile = () => {
    const {data} = useQuery('userData', getUserProfile);
       return (
        <>
            <Button onClick={logOut}>
                Logout
            </Button>
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
