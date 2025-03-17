import {getUserProfile} from "../../api/auth.api.ts";
import {useQuery} from "react-query";



export const Profile = () => {
    const {data} = useQuery('userData', getUserProfile);
       return (
        <>
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
