import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getFollowersThunk, getUserThunk } from "../../store/user";
import "./Follows.css"

function Followers({userId, hideFollowers}) {
    const dispatch = useDispatch()
    const history = useHistory()

    const followersObj = useSelector((state) => state.userReducer.userFollowers)

    let followers;

    if (followersObj) {
        followers = Object.values(followersObj)
        console.log("What are followers? \n\n", followers)
    }


    useEffect(() => {
        (async() => {
            await dispatch(getFollowersThunk(userId))
        })()

    }, [dispatch])

    const goToProfile = async(followerId) => {
        hideFollowers()
        await dispatch(getUserThunk(followerId))
        history.push(`/users/${followerId}`)
    }

    return (<>
    <h3 className="h3Follow">Followers</h3>
    {followers?.length === 0 ? <div className="noFollows">No Followers</div> :
    followers?.map((follower, idx) => (

        <div className="eachFollowName" key={idx} onClick={() => goToProfile(follower.id)}> {follower.username}</div>
    ))
    }
    </>)
}
export default Followers;
