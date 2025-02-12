import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
    const [message, setMessage] = useState("Verifying...");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            const token = searchParams.get("token");
            if (!token) {
                setMessage("Invalid or missing verification token.");
                return;
            }

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/verify-email?token=${token}`
                );
                setMessage(response.data.message);
                setTimeout(() => navigate("/login"), 3000);
            } catch (error) {
                setMessage(
                    error.response?.data?.message || "Email verification failed."
                );
            }
        };

        verifyEmail();
    }, [searchParams, navigate]);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Email Verification</h2>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default VerifyEmail;
