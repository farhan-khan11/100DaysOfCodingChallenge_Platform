// import React, { useContext, useEffect, useState } from 'react'
// import { DataContext } from '../Context/AuthContext'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

// const Dashboard = () => {
//     const { user, setUser, problems, creatingRepo, setCreatingRepo } = useContext(DataContext)
//     const navigate = useNavigate()


//     const handleLogout = () => {
//         try {
//             axios.get('http://localhost:4060/auth/logout', {
//                 withCredentials: true
//             })
//             setUser(null)
//             navigate("/")
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const handleCreateRepo = () => {
//         setCreatingRepo(true)

//         axios.post('http://localhost:4060/github/create-repo', {}, {
//             withCredentials: true
//         })
//             .then(res => alert(res.data.message))
//             .catch(error => alert(error.response.data.error))
//             .finally(() => {
//                 setCreatingRepo(false)
//             })
//     }

//     return (
//         <div style={{
//             minHeight: '100vh',
//             background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
//             padding: '30px'
//         }}>

//             {/* Navbar */}
//             <div className="d-flex justify-content-between align-items-center mb-4">
//                 <h4 className="text-white fw-bold">100 Days of Coding</h4>
//                 <div className="d-flex align-items-center gap-3">
//                     <img
//                         src={user.avatar}
//                         width="35"
//                         style={{ borderRadius: '50%' }}
//                         alt="avatar"
//                     />
//                     <span className="text-white">{user.username}</span>
//                     {/* {!user.repoCreated && (
//                         <button
//                             className="btn btn-sm btn-success"
//                             onClick={handleCreateRepo}
//                         >
//                             Create Repo
//                         </button>
//                     )} */}
//                                                                                         {/* if creatingRepo = false => disabled = false => then button is clickable if its true then button is unclickable */}
//                     <button className='btn btn-sm btn-success' onClick={handleCreateRepo} disabled={creatingRepo}>
//                         {creatingRepo ? "Creating..." : "Create Repo"}
//                     </button>

//                     <button
//                         className="btn btn-outline-light btn-sm"
//                         onClick={handleLogout}
//                     >
//                         Logout
//                     </button>
//                 </div>
//             </div>

//             {/* Problems List */}
//             <div className="container">
//                 <h5 className="text-white mb-3">Problems</h5>
//                 <div className="row gap-3">
//                     {problems.map((problem, index) => (
//                         <div key={problem._id} className="col-12">
//                             <div
//                                 style={{ background: '#1e293b', borderRadius: '10px', padding: '15px 20px' }}
//                                 className="d-flex justify-content-between align-items-center"
//                             >
//                                 <div>
//                                     <span className="text-secondary me-3">#{index + 1}</span>
//                                     <span className="text-white fw-semibold">{problem.title}</span><br></br>
//                                     <span className="text-white fw-semibold">{problem.description}</span>
//                                 </div>
//                                 <button
//                                     className="btn btn-sm"
//                                     style={{ background: 'linear-gradient(135deg, #38bdf8, #0ea5e9)', color: 'white' }}
//                                     onClick={() => navigate(`/compiler/${problem._id}`)}
//                                 >
//                                     Solve
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Dashboard



import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import BASE_URL from '../config'

const Dashboard = () => {
    const { user, setUser, problems, creatingRepo, setCreatingRepo } = useContext(DataContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        try {
            // axios.get(`http://localhost:4060/auth/logout`, {
            axios.get(`http://${BASE_URL}/auth/logout`, {

                withCredentials: true
            })
            setUser(null)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    const handleCreateRepo = () => {
        setCreatingRepo(true)

        // axios.post('http://localhost:4060/github/create-repo', {}, {
        axios.post(`http://${BASE_URL}/github/create-repo`, {}, {
            withCredentials: true
        })
            .then(res => alert(res.data.message))
            .catch(error => alert(error.response.data.error))
            .finally(() => {
                setCreatingRepo(false)
            })
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: '#080B11',
            padding: '0',
            fontFamily: "'Inter', sans-serif",
            position: 'relative',
            overflow: 'hidden',
        }}>

            {/* Ambient glows */}
            <div style={{
                position: 'fixed',
                top: '-160px', left: '-120px',
                width: '500px', height: '500px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0,
            }} />
            <div style={{
                position: 'fixed',
                bottom: '-180px', right: '-100px',
                width: '520px', height: '520px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0,
            }} />

            {/* Grid overlay */}
            <div style={{
                position: 'fixed',
                inset: 0,
                backgroundImage: `
                    linear-gradient(rgba(148,163,184,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(148,163,184,0.03) 1px, transparent 1px)
                `,
                backgroundSize: '48px 48px',
                pointerEvents: 'none',
                zIndex: 0,
            }} />

            {/* Navbar */}
            <div style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                background: 'rgba(8, 11, 17, 0.85)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderBottom: '1px solid rgba(148,163,184,0.08)',
                padding: '0 32px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {/* Brand */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '28px', height: '28px',
                        borderRadius: '7px',
                        background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '13px', fontWeight: '700', color: 'white',
                        flexShrink: 0,
                    }}>
                        {'</>'}
                    </div>
                    <span style={{
                        color: '#E2E8F0',
                        fontWeight: '600',
                        fontSize: '15px',
                        letterSpacing: '-0.01em',
                    }}>
                        100 Days of Coding
                    </span>
                </div>

                {/* Nav actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                        onClick={handleCreateRepo}
                        disabled={creatingRepo}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            background: creatingRepo ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.15)',
                            border: '1px solid rgba(99,102,241,0.35)',
                            borderRadius: '8px',
                            padding: '7px 14px',
                            color: creatingRepo ? '#6366F1' : '#A5B4FC',
                            fontSize: '13px',
                            fontWeight: '500',
                            cursor: creatingRepo ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s',
                            fontFamily: "'Inter', sans-serif",
                            opacity: creatingRepo ? 0.6 : 1,
                        }}
                        onMouseEnter={e => { if (!creatingRepo) { e.currentTarget.style.background = 'rgba(99,102,241,0.25)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.6)'; } }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.15)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.35)'; }}
                    >
                        {/* Repo icon */}
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                            <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" fill="currentColor" />
                        </svg>
                        {creatingRepo ? 'Creating...' : 'Create Repo'}
                    </button>

                    {/* Divider */}
                    <div style={{ width: '1px', height: '22px', background: 'rgba(148,163,184,0.1)' }} />

                    {/* User info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img
                            src={user.avatar}
                            width="28"
                            height="28"
                            style={{ borderRadius: '50%', border: '1.5px solid rgba(99,102,241,0.4)' }}
                            alt="avatar"
                        />
                        <span style={{ color: '#94A3B8', fontSize: '13px', fontWeight: '500' }}>
                            {user.username}
                        </span>
                    </div>

                    <button
                        onClick={handleLogout}
                        style={{
                            background: 'transparent',
                            border: '1px solid rgba(148,163,184,0.15)',
                            borderRadius: '8px',
                            padding: '7px 14px',
                            color: '#64748B',
                            fontSize: '13px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontFamily: "'Inter', sans-serif",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)'; e.currentTarget.style.color = '#F87171'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(148,163,184,0.15)'; e.currentTarget.style.color = '#64748B'; }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Page body */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                maxWidth: '860px',
                margin: '0 auto',
                padding: '48px 24px',
            }}>

                {/* Section header */}
                <div style={{ marginBottom: '28px' }}>
                    <h5 style={{
                        color: '#E2E8F0',
                        fontWeight: '600',
                        fontSize: '20px',
                        letterSpacing: '-0.015em',
                        marginBottom: '6px',
                    }}>
                        Problem Set
                    </h5>
                    <p style={{ color: '#475569', fontSize: '13px', margin: 0 }}>
                        {problems.length} problems &middot; Solve them all to complete the challenge
                    </p>
                </div>

                {/* Column headers */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '48px 1fr auto',
                    gap: '16px',
                    alignItems: 'center',
                    padding: '0 20px 10px',
                    borderBottom: '1px solid rgba(148,163,184,0.07)',
                    marginBottom: '6px',
                }}>
                    <span style={{ color: '#334155', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.07em' }}>#</span>
                    <span style={{ color: '#334155', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Title</span>
                    <span></span>
                </div>

                {/* Problem rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {problems.map((problem, index) => (
                        <div
                            key={problem._id}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '48px 1fr auto',
                                gap: '16px',
                                alignItems: 'center',
                                background: 'rgba(15,18,28,0.6)',
                                border: '1px solid rgba(148,163,184,0.07)',
                                borderRadius: '10px',
                                padding: '16px 20px',
                                transition: 'all 0.2s ease',
                                cursor: 'default',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(99,102,241,0.06)';
                                e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(15,18,28,0.6)';
                                e.currentTarget.style.borderColor = 'rgba(148,163,184,0.07)';
                            }}
                        >
                            {/* Index */}
                            <span style={{
                                color: '#334155',
                                fontSize: '13px',
                                fontWeight: '600',
                                fontVariantNumeric: 'tabular-nums',
                            }}>
                                {String(index + 1).padStart(2, '0')}
                            </span>

                            {/* Title + description */}
                            <div>
                                <div style={{
                                    color: '#CBD5E1',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    letterSpacing: '-0.01em',
                                    marginBottom: '3px',
                                }}>
                                    {problem.title}
                                </div>
                                <div style={{
                                    color: '#475569',
                                    fontSize: '12px',
                                    lineHeight: '1.5',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '440px',
                                }}>
                                    {problem.description}
                                </div>
                            </div>

                            {/* Solve button */}
                            <button
                                onClick={() => navigate(`/compiler/${problem._id}`)}
                                style={{
                                    background: 'rgba(99,102,241,0.12)',
                                    border: '1px solid rgba(99,102,241,0.3)',
                                    borderRadius: '7px',
                                    padding: '7px 16px',
                                    color: '#A5B4FC',
                                    fontSize: '13px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    whiteSpace: 'nowrap',
                                    fontFamily: "'Inter', sans-serif",
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'rgba(99,102,241,0.25)';
                                    e.currentTarget.style.borderColor = 'rgba(99,102,241,0.6)';
                                    e.currentTarget.style.color = '#C7D2FE';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'rgba(99,102,241,0.12)';
                                    e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)';
                                    e.currentTarget.style.color = '#A5B4FC';
                                }}
                            >
                                Solve →
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Dashboard