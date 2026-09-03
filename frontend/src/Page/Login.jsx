
import { auth, googleProvider } from "../Utiles/firebase";
import { signInWithPopup } from "firebase/auth";
import api from "../Utiles/axios";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { setUserData } from "../Redux/userSlice";

function Login() {
    const dispatch = useDispatch();

    // ================================
    // GOOGLE AUTHENTICATION
    // ================================
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
        <div className="relative min-h-screen overflow-hidden bg-[#07090d] text-white">

            {/* =====================================================
                BACKGROUND
            ====================================================== */}

            {/* Grid */}
            <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                    backgroundImage: `
                        linear-gradient(#64748b 1px, transparent 1px),
                        linear-gradient(90deg, #64748b 1px, transparent 1px)
                    `,
                    backgroundSize: "45px 45px",
                }}
            />

            {/* Glow */}
            <div className="absolute -left-52 -top-52 h-[550px] w-[550px] rounded-full bg-cyan-500/10 blur-[150px]" />

            <div className="absolute -bottom-52 -right-52 h-[550px] w-[550px] rounded-full bg-blue-600/10 blur-[150px]" />

            {/* =====================================================
                HEADER
            ====================================================== */}

            <header className="relative z-20 flex h-[76px] items-center justify-between border-b border-white/[0.06] px-6 md:px-10">

                {/* Logo */}
                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 font-mono text-sm font-bold text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.08)]">
                        &lt;/&gt;
                    </div>

                    <div className="font-mono text-4xl font-bold tracking-tight">
                        Code<span className="text-cyan-400">Nova</span>
                    </div>

                </div>

                {/* Status */}
                <div className="hidden items-center gap-2 font-mono text-[10px] tracking-wider text-gray-500 sm:flex">

                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />

                    SYSTEM ONLINE

                </div>

            </header>

            {/* =====================================================
                MAIN
            ====================================================== */}

            <main className="relative z-10 mx-auto flex min-h-[calc(100vh-76px)] max-w-[1250px] items-center px-5 py-12">

                <div className="grid w-full items-center gap-16 lg:grid-cols-[1fr_430px]">

                    {/* =================================================
                        LEFT SIDE
                    ================================================== */}

                    <section className="hidden lg:block">

                        {/* Path */}
                        <div className="mb-5 font-mono text-sm text-cyan-400">
                            ~/CodeNova
                        </div>

                        {/* Heading */}
                        <h1 className="max-w-[600px] text-5xl font-bold leading-[1.08] tracking-[-2px] xl:text-6xl">

                            Build.

                            <br />

                            Code.

                            <br />

                            <span className="text-cyan-400">
                                Create without limits.
                            </span>

                        </h1>

                        {/* Description */}
                        <p className="mt-6 max-w-[550px] text-sm leading-7 text-gray-500">
                            A modern AI-powered development environment
                            designed for developers who want to build
                            faster, smarter and better.
                        </p>

                        {/* =================================================
                            CODE EDITOR
                        ================================================== */}

                        <div className="mt-9 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d1117] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">

                            {/* Editor Header */}
                            <div className="flex h-11 items-center border-b border-white/[0.06] bg-[#0b0f14]">

                                {/* Window buttons */}
                                <div className="flex gap-2 pl-4">

                                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />

                                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />

                                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />

                                </div>

                                {/* File */}
                                <div className="ml-6 flex h-full items-center border-b border-cyan-400 px-5 font-mono text-xs text-gray-300">

                                    main.js

                                </div>

                            </div>

                            {/* Code */}
                            <div className="flex min-h-[220px] p-6 font-mono text-xs leading-7">

                                {/* Line Numbers */}
                                <div className="mr-6 select-none text-right text-gray-700">

                                    01
                                    <br />
                                    02
                                    <br />
                                    03
                                    <br />
                                    04
                                    <br />
                                    05
                                    <br />
                                    06
                                    <br />
                                    07
                                    <br />
                                    08
                                    <br />
                                    09

                                </div>

                                {/* Code Content */}
                                <div className="text-gray-300">

                                    <div>
                                        <span className="text-purple-400">
                                            const
                                        </span>{" "}

                                        <span className="text-cyan-300">
                                            CodeNova
                                        </span>{" "}

                                        = {"{"}
                                    </div>

                                    <div className="pl-6">

                                        <span className="text-blue-300">
                                            poweredBy
                                        </span>
                                        :{" "}

                                        <span className="text-green-300">
                                            "AI"
                                        </span>,

                                    </div>

                                    <div className="pl-6">

                                        <span className="text-blue-300">
                                            developer
                                        </span>
                                        :{" "}

                                        <span className="text-green-300">
                                            true
                                        </span>,

                                    </div>

                                    <div className="pl-6">

                                        <span className="text-blue-300">
                                            creativity
                                        </span>
                                        :{" "}

                                        <span className="text-green-300">
                                            "unlimited"
                                        </span>

                                    </div>

                                    <div>
                                        {"};"}
                                    </div>

                                    <div className="mt-2">

                                        <span className="text-purple-400">
                                            await
                                        </span>{" "}

                                        <span className="text-cyan-300">
                                            CodeNova
                                        </span>

                                        .build();

                                    </div>

                                    <div className="mt-2 text-gray-700">

                                        // Your next idea starts here...

                                    </div>

                                </div>

                            </div>

                            {/* =================================================
                                TERMINAL
                            ================================================== */}

                            <div className="border-t border-white/[0.06] bg-[#090c10] px-5 py-4 font-mono text-[11px]">

                                <div className="mb-2 text-[9px] tracking-widest text-gray-700">
                                    TERMINAL
                                </div>

                                <div className="text-gray-400">

                                    <span className="text-emerald-400">
                                        ➜
                                    </span>{" "}

                                    codenova

                                    <span className="ml-2 text-gray-600">
                                        ready to build...
                                    </span>

                                </div>

                            </div>

                        </div>

                    </section>

                    {/* =================================================
                        RIGHT SIDE - LOGIN
                    ================================================== */}

                    <section className="w-full max-w-[430px] justify-self-center lg:justify-self-end">

                        {/* Login Card */}
                        <div className="rounded-2xl border border-white/[0.08] bg-[#0d1117]/95 p-7 shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-9">

                            {/* Logo */}
                            <div className="flex items-center gap-4">

                               

                                <div>

                                    <h2 className="font-mono text-2xl font-bold">
                                        Code<span className="text-cyan-400">
                                            Nova
                                        </span>
                                    </h2>

                                    <p className="mt-1 font-mono text-[10px] text-gray-600">
                                        AI Development Environment
                                    </p>

                                </div>

                            </div>

                            {/* =================================================
                                WELCOME
                            ================================================== */}

                            <div className="mt-9">

                                <p className="mb-3 font-mono text-[10px] text-gray-600">
                                    // authentication.required
                                </p>

                                <h3 className="text-3xl font-bold tracking-tight">
                                    Welcome back
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-gray-500">
                                    Sign in to continue building your
                                    next project with CodeNova.
                                </p>

                            </div>

                            {/* =================================================
                                GOOGLE LOGIN
                            ================================================== */}

                            <button
                                onClick={googleLogin}
                                className="group mt-8 flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-white text-sm font-semibold text-gray-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-[0_15px_35px_rgba(0,0,0,0.35)] active:translate-y-0"
                            >

                                <FcGoogle
                                    size={23}
                                />

                                <span>
                                    Continue with Google
                                </span>

                            </button>

                            {/* =================================================
                                DIVIDER
                            ================================================== */}

                            <div className="my-7 flex items-center gap-3">

                                <div className="h-px flex-1 bg-white/[0.07]" />

                                <span className="font-mono text-[8px] tracking-[0.18em] text-gray-600">
                                    SECURE AUTHENTICATION
                                </span>

                                <div className="h-px flex-1 bg-white/[0.07]" />

                            </div>

                            {/* =================================================
                                FEATURES
                            ================================================== */}

                            <div className="space-y-2.5">

                                <div className="flex items-center gap-3 rounded-lg border border-white/[0.05] bg-white/[0.015] px-4 py-3">

                                    <span className="text-xs text-cyan-400">
                                        ✓
                                    </span>

                                    <span className="text-[11px] text-gray-500">
                                        Access your projects & workspace
                                    </span>

                                </div>

                                <div className="flex items-center gap-3 rounded-lg border border-white/[0.05] bg-white/[0.015] px-4 py-3">

                                    <span className="text-xs text-cyan-400">
                                        ✓
                                    </span>

                                    <span className="text-[11px] text-gray-500">
                                        AI-powered coding environment
                                    </span>

                                </div>

                                <div className="flex items-center gap-3 rounded-lg border border-white/[0.05] bg-white/[0.015] px-4 py-3">

                                    <span className="text-xs text-cyan-400">
                                        ✓
                                    </span>

                                    <span className="text-[11px] text-gray-500">
                                        Your workspace, synced securely
                                    </span>

                                </div>

                            </div>

                            {/* =================================================
                                TERMS
                            ================================================== */}

                            <p className="mt-7 text-center font-mono text-[9px] leading-5 text-gray-700">

                                By continuing, you agree to CodeNova's{" "}

                                <span className="cursor-pointer text-gray-500 transition-colors hover:text-cyan-400">
                                    Terms
                                </span>

                                {" "}and{" "}

                                <span className="cursor-pointer text-gray-500 transition-colors hover:text-cyan-400">
                                    Privacy Policy
                                </span>

                            </p>

                        </div>

                        {/* Service Status */}
                        <div className="mt-5 flex items-center justify-center gap-2 font-mono text-[9px] text-gray-700">

                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.7)]" />

                            CodeNova services operational

                        </div>

                    </section>

                </div>

            </main>

        </div>
    );
}

export default Login;
