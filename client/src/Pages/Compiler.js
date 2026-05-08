// import React, { useEffect, useState } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import '../App.css'
// import axios from 'axios'

// const Compiler = () => {

//     const { id } = useParams()
//     const navigate = useNavigate()
//     const [problem, setProblem] = useState(null)
//     const [language, setLanguage] = useState('')
//     const [code, setCode] = useState("")
//     const [output, setOutput] = useState("")


//     useEffect(() => {
//         axios.get(`http://localhost:4060/problems/${id}`)
//             .then(res => setProblem(res.data))
//             .catch(error => console.log(error))
//     }, [id])

//     const handleSumbit = async () => {
//         if (!language) {
//             alert("Please select a language")
//             return;
//         }
//         const payload = {
//             language,
//             code
//         }
//         console.log(payload)
//         try {
//             const { data } = await axios.post("http://localhost:4060/run", payload)
//             console.log("data", data)
//             setOutput(data.output);
//             console.log(data.output)

//         } catch ({ response }) {
//             if (response) {
//                 console.log("response : ", response);
//             }
//             else {
//                 window.alert("Error connecting to server");
//             }
//         }
//     }

//     const handleCommit = async () => {
//         if (!language) {
//             alert("Please select a language")
//             return;
//         }
//         if (!code) {
//             alert("Please write some code")
//             return;
//         }
//         try {
//             const { data } = await axios.post("http://localhost:4060/github/commit",
//                 { code, language, problemId: id },
//                 { withCredentials: true }
//             )
//             alert(data.message);
//             navigate('/dashboard')
//         } catch (error) {
//             console.log("error.response.data.error : ", error.response.data.error)
//             alert(error.response.data.error || "something went wr")
//             navigate('/')
//         }

//     }

//     return (
//         <>
//             <div id='App'>

//                 <div>
//                     <h1><i>ONLINE CODE COMPILER</i></h1>

//                     {problem && (
//                         <div style={{
//                             background: '#1e293b',
//                             padding: '15px 20px',
//                             borderRadius: '10px',
//                             marginBottom: '20px'
//                         }}>
//                             <h5 style={{ color: '#38bdf8' }}>{problem.title}</h5>
//                             <p style={{ color: '#e5e7eb' }}>{problem.description}</p>
//                         </div>
//                     )}

//                     <div>

//                         <label>Language : </label>
//                         <select value={language} onChange={(e) => {
//                             setLanguage(e.target.value)
//                             console.log(e.target.value)
//                         }}>
//                             <option value="">Select</option>
//                             <option value='c'>C</option>
//                             <option value='js'>JavaScript</option>
//                             <option value='py'>Python</option>
//                         </select>

//                     </div>
//                     <br></br>
//                     <textarea rows='35' cols="110" value={code} placeholder="Start writing your code here...."
//                         onChange={
//                             (e) => { setCode(e.target.value) }
//                         }></textarea>
//                 </div>

//                 <button onClick={handleSumbit}>Run</button>
//                 <button onClick={handleCommit}>Commit</button>

//                 <div id='output-box'>
//                     <textarea rows='25' cols="110" value={output} placeholder="output will be displayed here..!"></textarea>
//                     {/* <p>{output}</p> */}
//                 </div>

//             </div>
//         </>

//     )
// }

// export default Compiler


import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// import '../App.css'
import axios from 'axios'
import BASE_URL from '../config'

const Compiler = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [problem, setProblem] = useState(null)
    const [language, setLanguage] = useState('')
    const [code, setCode] = useState("")
    const [output, setOutput] = useState("")

    useEffect(() => {
        // axios.get(`http://localhost:4060/problems/${id}`)
        axios.get(`${BASE_URL}/problems/${id}`)
            .then(res => setProblem(res.data))
            .catch(error => console.log(error))
    }, [id])

    const handleSumbit = async () => {
        if (!language) {
            alert("Please select a language")
            return;
        }
        const payload = { language, code }
        console.log(payload)
        try {
            // const { data } = await axios.post("http://localhost:4060/run", payload)
            const { data } = await axios.post(`${BASE_URL}/run`, payload)
            console.log("data", data)
            setOutput(data.output);
            console.log(data.output)
            document.getElementById('output-box').scrollIntoView({ behavior: 'smooth', block: 'start' })
        } catch ({ response }) {
            if (response) {
                console.log("response : ", response);
            } else {
                window.alert("Error connecting to server");
            }
        }
    }

    const handleCommit = async () => {
        if (!language) {
            alert("Please select a language")
            return;
        }
        if (!code) {
            alert("Please write some code")
            return;
        }
        try {
            const { data } = await axios.post(`${BASE_URL}/github/commit`,
                { code, language, problemId: id },
                { withCredentials: true }
            )
            alert(data.message);
            navigate('/dashboard')
        } catch (error) {
            console.log("error.response.data.error : ", error.response.data.error)
            alert(error.response.data.error || "something went wrong")
            navigate('/')
        }
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: '#080B11',
            fontFamily: "'Inter', sans-serif",
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
        }}>

            {/* Ambient glows */}
            <div style={{
                position: 'fixed', top: '-160px', left: '-100px',
                width: '480px', height: '480px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
                pointerEvents: 'none', zIndex: 0,
            }} />
            <div style={{
                position: 'fixed', bottom: '-160px', right: '-80px',
                width: '480px', height: '480px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
                pointerEvents: 'none', zIndex: 0,
            }} />
            <div style={{
                position: 'fixed', inset: 0,
                backgroundImage: `linear-gradient(rgba(148,163,184,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.03) 1px, transparent 1px)`,
                backgroundSize: '48px 48px', pointerEvents: 'none', zIndex: 0,
            }} />

            {/* Navbar */}
            <div style={{
                position: 'sticky', top: 0, zIndex: 100,
                background: 'rgba(8,11,17,0.85)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderBottom: '1px solid rgba(148,163,184,0.08)',
                padding: '0 28px', height: '60px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
                {/* Brand */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                    <div style={{
                        width: '28px', height: '28px', borderRadius: '7px',
                        background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '9px', fontWeight: '700', color: 'white', flexShrink: 0,
                    }}>{'</>'}</div>
                    <span style={{ color: '#E2E8F0', fontWeight: '600', fontSize: '15px', letterSpacing: '-0.01em' }}>
                        100 Days of Coding
                    </span>
                </div>

                {/* Problem title in navbar */}
                {problem && (
                    <span style={{
                        color: '#64748B', fontSize: '13px', fontWeight: '500',
                        letterSpacing: '-0.01em',
                        maxWidth: '340px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                        {problem.title}
                    </span>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {/* Language select */}
                    <select
                        value={language}
                        onChange={(e) => { setLanguage(e.target.value); console.log(e.target.value); }}
                        style={{
                            background: 'rgba(15,18,28,0.9)',
                            border: '1px solid rgba(148,163,184,0.15)',
                            borderRadius: '8px',
                            padding: '7px 12px',
                            color: language ? '#E2E8F0' : '#475569',
                            fontSize: '13px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            fontFamily: "'Inter', sans-serif",
                            outline: 'none',
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            paddingRight: '28px',
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2364748B' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 10px center',
                        }}
                    >
                        <option value="">Language</option>
                        <option value='c'>C</option>
                        <option value='js'>JavaScript</option>
                        <option value='py'>Python</option>
                    </select>

                    {/* Run button */}
                    <button
                        onClick={handleSumbit}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            background: 'rgba(16,185,129,0.12)',
                            border: '1px solid rgba(16,185,129,0.3)',
                            borderRadius: '8px', padding: '7px 16px',
                            color: '#34D399', fontSize: '13px', fontWeight: '500',
                            cursor: 'pointer', transition: 'all 0.2s',
                            fontFamily: "'Inter', sans-serif",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(16,185,129,0.22)'; e.currentTarget.style.borderColor = 'rgba(16,185,129,0.55)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(16,185,129,0.12)'; e.currentTarget.style.borderColor = 'rgba(16,185,129,0.3)'; }}
                    >
                        {/* Play icon */}
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor">
                            <path d="M2.5 1.5l8 4.5-8 4.5V1.5z" />
                        </svg>
                        Run
                    </button>

                    {/* Commit button */}
                    <button
                        onClick={handleCommit}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            background: 'rgba(99,102,241,0.15)',
                            border: '1px solid rgba(99,102,241,0.35)',
                            borderRadius: '8px', padding: '7px 16px',
                            color: '#A5B4FC', fontSize: '13px', fontWeight: '500',
                            cursor: 'pointer', transition: 'all 0.2s',
                            fontFamily: "'Inter', sans-serif",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.25)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.6)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.15)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.35)'; }}
                    >
                        {/* Commit icon */}
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M10.5 7.75a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm1.43.75a4.002 4.002 0 01-7.86 0H.75a.75.75 0 110-1.5h3.32a4.002 4.002 0 017.86 0h3.32a.75.75 0 110 1.5h-3.32z" />
                        </svg>
                        Commit & Save
                    </button>
                </div>
            </div>

            {/* Main layout — two panels */}
            <div style={{
                position: 'relative', zIndex: 1,
                display: 'grid',
                gridTemplateColumns: '380px 1fr',
                flex: 1,
                height: 'calc(100vh - 60px)',
                overflow: 'hidden',
            }}>

                {/* Left panel — problem description */}
                <div style={{
                    borderRight: '1px solid rgba(148,163,184,0.08)',
                    overflowY: 'auto',
                    padding: '28px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}>
                    {problem && (
                        <>
                            {/* Problem header */}
                            <div>
                                <div style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '7px',
                                    background: 'rgba(99,102,241,0.1)',
                                    border: '1px solid rgba(99,102,241,0.22)',
                                    borderRadius: '999px', padding: '3px 12px',
                                    fontSize: '11px', fontWeight: '500', color: '#818CF8',
                                    letterSpacing: '0.04em', textTransform: 'uppercase',
                                    marginBottom: '14px',
                                }}>
                                    Problem
                                </div>
                                <h2 style={{
                                    color: '#E2E8F0', fontWeight: '600',
                                    fontSize: '18px', letterSpacing: '-0.02em',
                                    lineHeight: '1.3', marginBottom: '0',
                                }}>
                                    {problem.title}
                                </h2>
                            </div>

                            {/* Divider */}
                            <div style={{ height: '1px', background: 'rgba(148,163,184,0.07)' }} />

                            {/* Description */}
                            <div>
                                <p style={{
                                    color: '#94A3B8', fontSize: '14px',
                                    lineHeight: '1.75', margin: 0,
                                }}>
                                    {problem.description}
                                </p>
                            </div>
                        </>
                    )}

                    {!problem && (
                        <div style={{ color: '#334155', fontSize: '13px' }}>Loading problem...</div>
                    )}
                </div>

                {/* Right panel — editor + output */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }}>

                    {/* Code editor area */}
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        borderBottom: '1px solid rgba(148,163,184,0.08)',
                        position: 'relative',
                    }}>
                        {/* Editor top bar */}
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '10px 20px',
                            borderBottom: '1px solid rgba(148,163,184,0.06)',
                            background: 'rgba(15,18,28,0.5)',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(239,68,68,0.5)' }} />
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(234,179,8,0.5)' }} />
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(34,197,94,0.5)' }} />
                                <span style={{ color: '#334155', fontSize: '12px', marginLeft: '8px', fontWeight: '500' }}>
                                    solution.{language || 'code'}
                                </span>
                            </div>
                            <span style={{ color: '#1E293B', fontSize: '11px' }}>
                                {code.split('\n').length} lines
                            </span>
                        </div>

                        {/* Textarea */}
                        <textarea
                            rows='35'
                            cols="110"
                            value={code}
                            placeholder="// Start writing your code here..."
                            onChange={(e) => { setCode(e.target.value) }}
                            style={{
                                flex: 1,
                                width: '100%',
                                background: 'rgba(8,11,17,0.7)',
                                border: 'none',
                                outline: 'none',
                                resize: 'none',
                                padding: '20px 24px',
                                color: '#CBD5E1',
                                fontSize: '13.5px',
                                fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
                                lineHeight: '1.8',
                                letterSpacing: '0.01em',
                                caretColor: '#818CF8',
                            }}
                        />
                    </div>

                    {/* Output area */}
                    <div id='output-box' style={{
                        height: '220px',
                        display: 'flex',
                        flexDirection: 'column',
                        background: 'rgba(4,6,10,0.8)',
                    }}>
                        {/* Output top bar */}
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '10px 20px',
                            borderBottom: '1px solid rgba(148,163,184,0.06)',
                            background: 'rgba(15,18,28,0.5)',
                        }}>
                            <div style={{
                                width: '6px', height: '6px', borderRadius: '50%',
                                background: output ? '#34D399' : '#334155',
                                transition: 'background 0.3s',
                                boxShadow: output ? '0 0 6px rgba(52,211,153,0.6)' : 'none',
                            }} />
                            <span style={{ color: '#475569', fontSize: '12px', fontWeight: '500' }}>
                                Output
                            </span>
                        </div>

                        {/* Output textarea */}
                        <textarea
                            rows='25'
                            cols="110"
                            value={output}
                            placeholder="// Output will appear here after you run your code..."
                            readOnly
                            style={{
                                flex: 1,
                                width: '100%',
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                resize: 'none',
                                padding: '16px 24px',
                                color: output ? '#86EFAC' : '#1E293B',
                                fontSize: '13px',
                                fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
                                lineHeight: '1.7',
                            }}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Compiler