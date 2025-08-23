import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import "./EditUserDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft } from "lucide-react";
import { clearError } from "../../store/Reducers/userReducer";
import { getUserProfile, updateUserDetails } from "../../store/Actions/userActions";
import Loading from '../../components/Loader/Loading'
import ErrorCard from "../../components/ErrorCard/ErrorCard";

const EditUserDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { user, loading , profileError } = useSelector((state) => state.userReducer)

    const {
        register,
        handleSubmit,
        reset
    } = useForm({
        defaultValues: {
            displayName: "",
            username: "",
            bio: "",
        }
    });

    useEffect(() => {
        if (!user) {
            dispatch(getUserProfile());
        }
        if (user) {
            console.log(user, loading);
        }

    }, [dispatch, user]);

    useEffect(() => {
        if (user) {
            reset({
                displayName: user?.displayName || "",
                username: user?.userId?.username || "",
                bio: user?.bio || "",
            });
        }
    }, [user, reset]);

    const onSubmit = async (data) => {
        const fd = new FormData();

        if (data.displayName) fd.append('displayName', data.displayName);

        if (data.username) fd.append("username", data.username);

        if (data.bio) fd.append("bio", data.bio);

        if (data.profilePic && data.profilePic[0]) {
            fd.append("profilePic", data.profilePic[0]);
        }
        await dispatch(updateUserDetails(fd))
        reset()
    };

    const handleBackBtn = () => {
        navigate('/profile')
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className="edit-user-page" style={{position:"relative"}}>
            <header className="header">
                <ChevronLeft className="back-btn" onClick={handleBackBtn} />
                <div className="profile-text">
                    <h2>Edit profile</h2>
                </div>
            </header>

            <ErrorCard message={profileError} loading={loading} clearAction={clearError} isvisible={true} />

            <main className="content">
                <form onSubmit={handleSubmit(onSubmit)} className="form">

                    <div className="profile-pic-container">
                        <img
                            src={user?.avatarUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuCvZ6iX3SS0n5bWvq4xivN92oDnmMmoPonKiGulM2PvFLtdFxF6eyVrTBeE3UQtkxdiNU3-4hgssfcdEtNLC_0vOMumHsu9WeV5VzCak-VKmQJuYP9hTcQa7IDcFf0gKtBjU7OguR4YD4vSdk3Nyzf5GQHbzPaXqQNP9bwbuepDDJ2OZ889Bsdw6iX-rL1drIoBrKoJc3Bxt-GxOwJrr-MK2gDB4rNECU9WkHpFdbvgcNJ8uuvzjMTtu7edZ9-US0OhApKxfEXDKDM"}
                            alt="Profile"
                            className="profile-pic"
                            style={{
                                objectFit: "contain",
                                backgroundColor: "white"
                            }}
                        />
                        <label htmlFor="profilePic" className="change-pic-text">
                            Change profile photo
                        </label>
                        <input
                            type="file"
                            id="profilePic"
                            accept="image/*"
                            hidden
                            {...register("profilePic")}
                        />
                    </div>

                    <div className="form-group">
                        <label>Display Name</label>
                        <input
                            {...register("displayName")}
                            placeholder="Enter display name"
                        />
                    </div>

                    <div className="form-group">
                        <label>Username</label>
                        <input
                            {...register("username")}
                            placeholder="Enter username"
                        />
                    </div>

                    <div className="form-group">
                        <label>Bio</label>
                        <textarea
                            {...register("bio")}
                            placeholder="Write something about yourself..."
                        ></textarea>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="save-btn">
                            Update
                        </button>
                    </div>
                </form>
            </main>

        </div>
    );
};

export default EditUserDetails;
