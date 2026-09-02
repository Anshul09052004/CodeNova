import { auth, googleProvider } from "../Utiles/firebase";
import { signInWithPopup } from "firebase/auth";
import api from "../Utiles/axios";
import icon from "../assets/NexusLogo.jpg";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { setUserData } from "../Redux/userSlice";

function Login() {
    const dispatch = useDispatch();
    const googleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const token = await result.user.getIdToken();

            const { data } = await api.post("/api/auth/login", { token });

            console.log(data);
            dispatch(setUserData(data));
        } catch (error) {
            console.log(error.message);
            dispatch(setUserData(null));
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090F] px-5">

            {/* Background Glow */}
            <div className="absolute left-[-200px] top-[-150px] h-[450px] w-[450px] rounded-full bg-violet-700/20 blur-[120px]" />
            <div className="absolute bottom-[-180px] right-[-180px] h-[420px] w-[420px] rounded-full bg-indigo-600/20 blur-[120px]" />

            {/* Card */}
            <div className="relative z-10 w-full max-w-[460px] rounded-[34px] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl shadow-[0_0_80px_rgba(124,58,237,.25)]">

                {/* Logo */}
                <div className="flex flex-col items-center">
                    <img
                        src={icon}
                        alt="Nexus AI"
                        className="h-24 w-24 rounded-[28px] object-cover shadow-[0_0_35px_rgba(139,92,246,.45)]"
                    />

                    <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white">
                        Nexus <span className="text-violet-400">AI</span>
                    </h1>

                    <p className="mt-3 text-center text-gray-400">
                        Your AI assistant for everything
                    </p>
                </div>

                {/* Welcome */}
                <div className="mt-12 text-center">
                    <h2 className="text-3xl font-bold text-white">
                        Welcome Back
                    </h2>

                    <p className="mt-3 text-gray-400">
                        Continue with your Google account
                    </p>
                </div>

                {/* Button */}
                <button
                    onClick={googleLogin}
                    className="mt-10 flex h-16 w-full items-center justify-center gap-4 rounded-2xl border border-violet-500/40 bg-[#181824] text-lg font-semibold text-white transition-all duration-300 cursor-pointer hover:bg-violet-500/10"
                >
                    <FcGoogle size={28} />
                    Continue with Google
                </button>

                {/* Divider */}
                <div className="my-8 flex items-center">
                    <div className="h-px flex-1 bg-white/10"></div>
                    <span className="mx-4 text-xs uppercase tracking-widest text-gray-500">
                        Secure Login
                    </span>
                    <div className="h-px flex-1 bg-white/10"></div>
                </div>

                {/* Footer */}
                <p className="text-center text-sm leading-7 text-gray-500">
                    By continuing, you agree to our{" "}
                    <span className="cursor-pointer text-violet-400 hover:text-violet-300">
                        Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="cursor-pointer text-violet-400 hover:text-violet-300">
                        Privacy Policy
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;