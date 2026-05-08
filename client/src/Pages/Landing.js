// import { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { DataContext } from '../Context/AuthContext';

// const Landing = () => {

//     const { user, loading } = useContext(DataContext);
//     const navigate = useNavigate();

//     // if already logged in then redirecting to dash
//     useEffect(() => {
//         if (!loading && user) {
//             navigate('/dashboard');
//         }
//     }, [user, loading]);

//     const handleLogin = () => {
//         window.location.href = 'http://localhost:4060/auth/github';
//     }

//     if (loading) return <div className="text-center mt-5 text-white">Loading...</div>

//     return (
//         <div style={{
//             minHeight: '100vh',
//             background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             flexDirection: 'column',
//             color: 'white'
//         }}>
//             <h1 className="mb-2 fw-bold">100 Days of Coding Challenge</h1>
//             <p className="mb-4 text-secondary">Build consistency. One problem at a time.</p>
//             <button
//                 onClick={handleLogin}
//                 className="btn btn-light btn-lg d-flex align-items-center gap-2"
//             >
//                 <img
//                     src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
//                     width="28" alt="github"
//                 />
//                 Login with GitHub
//             </button>
//         </div>
//     )
// }

// export default Landing;


import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../Context/AuthContext';
import BASE_URL from '../config';

const Landing = () => {

    const { user, loading } = useContext(DataContext);
    const navigate = useNavigate();

    // if already logged in then redirecting to dash
    useEffect(() => {
        if (!loading && user) {
            navigate('/dashboard');
        }
    }, [user, loading]);

    // const handleLogin = () => {
    //     window.location.href = 'http://localhost:4060/auth/github';
    // }

    const handleLogin = () => {
        window.location.href = `${BASE_URL}/auth/github`;
    }

    if (loading) return (
        <div style={{
            minHeight: '100vh',
            background: '#080B11',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94A3B8',
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            letterSpacing: '0.02em'
        }}>
            Loading...
        </div>
    )

    return (
        <div style={{
            minHeight: '100vh',
            background: '#080B11',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            color: 'white',
            fontFamily: "'Inter', sans-serif",
            position: 'relative',
            overflow: 'hidden',
        }}>

            {/* Ambient glow top-left */}
            <div style={{
                position: 'absolute',
                top: '-180px',
                left: '-120px',
                width: '560px',
                height: '560px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            {/* Ambient glow bottom-right */}
            <div style={{
                position: 'absolute',
                bottom: '-200px',
                right: '-140px',
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            {/* Subtle grid overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                    linear-gradient(rgba(148,163,184,0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(148,163,184,0.04) 1px, transparent 1px)
                `,
                backgroundSize: '48px 48px',
                pointerEvents: 'none',
            }} />

            {/* Main content */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '560px',
                textAlign: 'center',
                padding: '0 24px',
            }}>

                {/* Badge */}
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    background: 'rgba(99,102,241,0.12)',
                    border: '1px solid rgba(99,102,241,0.28)',
                    borderRadius: '999px',
                    padding: '5px 14px',
                    marginBottom: '32px',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#A5B4FC',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                }}>
                    <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#818CF8',
                        boxShadow: '0 0 6px rgba(129,140,248,0.8)',
                        display: 'inline-block',
                    }} />
                    Challenge
                </div>

                {/* Heading */}
                <h1 style={{
                    fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                    fontWeight: '700',
                    lineHeight: '1.15',
                    marginBottom: '20px',
                    letterSpacing: '-0.025em',
                    background: 'linear-gradient(135deg, #E2E8F0 30%, #94A3B8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}>
                    100 Days of Coding Challenge
                </h1>

                {/* Sub */}
                <p style={{
                    fontSize: '16px',
                    color: '#64748B',
                    marginBottom: '44px',
                    lineHeight: '1.7',
                    fontWeight: '400',
                    maxWidth: '380px',
                }}>
                    Build consistency. One problem at a time.
                </p>

                {/* Login button */}
                <button
                    onClick={handleLogin}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'rgba(15, 18, 28, 0.9)',
                        border: '1px solid rgba(148,163,184,0.18)',
                        borderRadius: '10px',
                        padding: '13px 28px',
                        color: '#E2E8F0',
                        fontSize: '15px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        letterSpacing: '0.01em',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
                        fontFamily: "'Inter', sans-serif",
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(99,102,241,0.15)';
                        e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)';
                        e.currentTarget.style.boxShadow = '0 0 0 1px rgba(99,102,241,0.3), 0 4px 16px rgba(99,102,241,0.12)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(15, 18, 28, 0.9)';
                        e.currentTarget.style.borderColor = 'rgba(148,163,184,0.18)';
                        e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)';
                    }}
                >
                    <img
                        src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                        width="20"
                        alt="github"
                        style={{ filter: 'invert(1)', opacity: 0.9 }}
                    />
                    Continue with GitHub
                </button>

                {/* Footer hint */}
                <p style={{
                    marginTop: '28px',
                    fontSize: '12px',
                    color: '#334155',
                    letterSpacing: '0.02em',
                }}>
                    Your progress syncs automatically to your GitHub.
                </p>

            </div>
        </div>
    )
}

export default Landing;