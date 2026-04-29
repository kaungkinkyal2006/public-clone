'use client';
import { useState } from 'react';
import Link from 'next/link';
// ─── Shared Brand Panel ────────────────────────────────────────────────────
function PublicLogo({ color = 'white' }: { color?: string }) {
return (
<svg
xmlns="http://www.w3.org/2000/svg"
width={86}
height={26}
viewBox="0 0 80 24"
fill="none"
>
<path d="M74.7422 18.5721C76.6478 18.5721 78.5746 17.4903 79.592 15.6936L77.9249 14.6118C77.3187 15.6936 76.2839 16.4732 74.7393 16.4732C73.051 16.4732 71.5141 15.2188 71.5141 12.8807C71.5141 10.4133 73.051 9.28811 74.7393 9.28811C75.9943 9.28811 77.0127 9.80726 77.9249 10.889L79.397 9.56988C78.8847 8.83911 78.2047 8.24159 77.4141 7.82726C76.6234 7.41294 75.745 7.19386 74.8523 7.18834C72.0374 7.18834 69.2659 9.28811 69.2659 12.8816C69.2659 16.4752 71.9717 18.5721 74.7422 18.5721Z" fill={color}/>
<path d="M66.1257 5.43597C66.4628 5.43826 66.793 5.34028 67.0743 5.15448C67.3556 4.96869 67.5753 4.70347 67.7054 4.39255C67.8356 4.08163 67.8703 3.73905 67.8051 3.40837C67.74 3.07769 67.5779 2.77384 67.3396 2.53545C67.1013 2.29707 66.7974 2.13491 66.4666 2.0696C66.1359 2.00429 65.7931 2.03878 65.482 2.16868C65.1709 2.29858 64.9055 2.51803 64.7194 2.79912C64.5334 3.08021 64.4352 3.41025 64.4373 3.74728C64.4346 3.96971 64.4764 4.19044 64.5603 4.39649C64.6441 4.60253 64.7684 4.78973 64.9257 4.94707C65.083 5.10441 65.2702 5.22872 65.4763 5.31268C65.6824 5.39664 65.9031 5.43856 66.1257 5.43597Z" fill={color}/>
<path d="M67.1653 7.53477H65.0223V18.3125H67.1653V7.53477Z" fill={color}/>
<path d="M62.164 1.86462H59.8259V18.3125H62.164V1.86462Z" fill={color}/>
<path d="M52.5087 7.18835C50.885 7.18835 49.6938 7.86382 49.0229 8.94169V1.86462H46.6414V18.3125H49.0229V16.949C49.6986 17.9661 50.885 18.5721 52.5087 18.5721C55.6258 18.5721 57.791 16.1703 57.791 12.8787C57.791 9.76287 55.4964 7.18835 52.5087 7.18835ZM52.3156 16.3652C50.1716 16.3652 48.7217 14.9177 48.7217 12.8807C48.7217 10.889 50.1697 9.39619 52.3156 9.39619C54.2463 9.39619 55.6277 10.7809 55.6277 12.8807C55.6258 14.9148 54.2405 16.3652 52.3137 16.3652H52.3156Z" fill={color}/>
<path d="M38.8454 18.464C39.9932 18.464 40.945 17.9661 41.6603 16.949V18.3125H43.8902V7.53477H41.5966V13.7675C41.5966 15.3471 40.6438 16.3652 39.0867 16.3652C37.7662 16.3652 37.0518 15.2178 37.0518 13.7675V7.53477H34.7119V14.1361C34.7119 16.646 36.2709 18.464 38.8454 18.464Z" fill={color}/>
<path d="M27.5896 7.18834C26.0306 7.18834 24.8404 7.86382 23.8654 8.94169V7.53477H21.592V22.1646H23.8654V16.9538C24.8404 17.9709 26.0306 18.5769 27.5896 18.5769C30.6855 18.5769 32.9154 16.0014 32.9154 12.8836C32.9154 9.56988 30.6855 7.18834 27.5896 7.18834ZM27.2865 16.3652C25.0779 16.3652 23.7573 14.9177 23.7573 12.8807C23.7573 10.889 25.0779 9.39619 27.2865 9.39619C29.3861 9.39619 30.6855 10.889 30.6855 12.8807C30.6855 14.9148 29.3852 16.3652 27.2865 16.3652Z" fill={color}/>
<path d="M7.19768 14.3954C11.1728 14.3954 14.3954 11.1729 14.3954 7.19768C14.3954 3.22251 11.1728 0 7.19768 0C3.22251 0 0 3.22251 0 7.19768C0 11.1729 3.22251 14.3954 7.19768 14.3954Z" fill={color}/>
<path d="M3.59884 24C4.55519 23.9936 5.47023 23.6094 6.1444 22.931C6.81858 22.2527 7.19719 21.3353 7.19768 20.3789C7.19768 18.4282 5.57177 16.8023 3.59884 16.8023C1.62591 16.8023 0 18.4282 0 20.3789C0.000489063 21.3353 0.379103 22.2527 1.05328 22.931C1.72745 23.6094 2.64249 23.9936 3.59884 24Z" fill={color}/>
</svg>
);
}
function CheckIcon() {
return (
<svg style={{ color: '#4B9EFF', fill: 'currentColor', flexShrink: 0 }} width={12} height={12} viewBox="0 0 24 24">
<path d="M23.4978 3.99797C24.1674 4.66193 24.1674 5.7402 23.4978 6.40416L9.78507 20.002C9.1155 20.666 8.02812 20.666 7.35855 20.002L0.502176 13.2031C-0.167392 12.5391 -0.167392 11.4609 0.502176 10.7969C1.17174 10.1329 2.25912 10.1329 2.92869 10.7969L8.57449 16.3901L21.0767 3.99797C21.7462 3.33401 22.8336 3.33401 23.5032 3.99797H23.4978Z"/>
</svg>
);
}
function CaretRight() {
return (
<svg style={{ fill: 'currentColor', flexShrink: 0 }} width={20} height={20} viewBox="0 0 24 24">
<path fillRule="evenodd" clipRule="evenodd" d="M8.68062 24C8.90132 23.9761 9.33076 23.8487 9.51652 23.7201C9.61045 23.6552 9.69244 23.5796 9.77435 23.4989L19.5253 13.2127C19.6711 13.0363 19.7381 12.943 19.8437 12.7367C20.0521 12.2746 20.0521 11.7263 19.8437 11.2642C19.796 11.1584 19.7381 11.0579 19.6711 10.9646C19.6113 10.8816 19.5926 10.8642 19.5253 10.7883L9.77435 0.502094C9.40056 0.182965 9.15679 0.0713603 8.90132 0.0248154C8.53143 -0.0082718 8.34901 0.0248154 8.20315 0.051388C7.4195 0.420747 7.06603 0.949028 7.0085 1.53894C6.98582 1.77209 7.07618 2.23291 7.33019 2.75014L16.0778 12.0005L7.47597 21.0744C7.16475 21.5096 7.09 21.6911 7.0462 21.8807C7.02011 22.9379 7.33865 23.4903 7.82863 23.781C8.16666 23.9429 8.34901 23.9761 8.68062 24Z"/>
</svg>
);
}

const features = [
{ label: 'Multi-asset investing' },
{ label: 'Industry-leading yields' },
{ label: 'AI-powered automation' },
{ label: 'Award-winning support' },
];
const pills = [
'Stocks', 'Options Trading', 'IRAs', 'Bonds',
'High-Yield Cash Account', 'ETFs', 'Crypto', 'Bond Account', 'Treasuries',
];
function BrandPanel() {
return (
<div style={{
backgroundColor: '#0A0A0A',
color: '#fff',
display: 'flex',
flexDirection: 'column',
padding: '40px 48px',
minHeight: '100vh',
width: '100%',
maxWidth: 520,
flexShrink: 0,
boxSizing: 'border-box',
}}>
{/* Logo */}
<div style={{ marginBottom: 56 }}>
<PublicLogo color="white" />
</div>
{/* Main content */}
<div style={{ flex: 1 }}>
{/* Title */}
<h1 style={{
fontSize: 36,
fontWeight: 700,
lineHeight: 1.2,
letterSpacing: '-0.5px',
margin: '0 0 40px 0',
color: '#fff',
fontFamily: 'Georgia, serif',
}}>
Investing for those{' '}
<span style={{ color: '#4B9EFF' }}>who take it seriously</span>
</h1>

{/* Feature list */}
<ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
{features.map(f => (
<li key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
<span style={{
width: 20,
height: 20,
borderRadius: '50%',
backgroundColor: 'rgba(75,158,255,0.15)',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
flexShrink: 0,
}}>
<CheckIcon />
</span>
<span style={{ fontSize: 14, color: '#CCCCCC', fontFamily: 'system-ui, sans-serif' }}>{f.label}</span>
</li>
))}
</ul>
{/* Pills */}
<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
{pills.map(p => (
<div key={p} style={{
display: 'flex',
alignItems: 'center',
gap: 6,
padding: '6px 12px',
borderRadius: 999,
border: '1px solid rgba(255,255,255,0.15)',
fontSize: 12,
color: '#CCCCCC',
fontFamily: 'system-ui, sans-serif',
backgroundColor: 'rgba(255,255,255,0.04)',
}}>
<CheckIcon />
{p}
</div>
))}
</div>
</div>
{/* Disclosures */}
<div style={{ marginTop: 40, fontSize: 11, color: '#555', lineHeight: 1.6, fontFamily: 'system-ui, sans-serif' }}>
All investing involves risk, including loss of principal.{' '}
<a href="#" style={{ color: '#666', textDecoration: 'underline' }}>Disclosures</a>

</div>
</div>
);
}
// ─── Login Page ────────────────────────────────────────────────────────────
export default function LoginPage() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);
const [emailFocused, setEmailFocused] = useState(false);
const [passwordFocused, setPasswordFocused] = useState(false);
const isValid = email.length > 0 && password.length > 0;
const inputBoxStyle = (focused: boolean, hasValue: boolean): React.CSSProperties => ({
position: 'relative',
borderRadius: 8,
border: `1.5px solid ${focused ? '#0A0A0A' : '#D1D5DB'}`,
backgroundColor: '#fff',
height: 56,
display: 'flex',
alignItems: 'center',
padding: '0 12px',
transition: 'border-color 0.15s',
});
const labelStyle = (focused: boolean, hasValue: boolean): React.CSSProperties => ({
position: 'absolute',
top: '50%',
left: 12,
transform: focused || hasValue ? 'translateY(-130%) scale(0.75)' : 'translateY(-50%) scale(1)',
transformOrigin: 'left center',
color: focused ? '#0A0A0A' : '#6B7280',
fontSize: 16,
pointerEvents: 'none',
transition: 'transform 0.15s, color 0.15s',
fontFamily: 'system-ui, sans-serif',
});
return (
<div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
{/* Brand panel — hidden on small screens in real app, shown here */}
<div style={{ display: 'none' }} className="brand-panel-desktop">
<BrandPanel />
</div>
{/* Inline brand panel always visible for demo */}

<div style={{ display: 'flex', flexShrink: 0 }}>
<BrandPanel />
</div>
{/* Form panel */}
<div style={{
flex: 1,
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
padding: '40px 24px',
backgroundColor: '#fff',
}}>
<div style={{ width: '100%', maxWidth: 400 }}>
{/* Heading */}
<h2 style={{
fontSize: 32,
fontWeight: 700,
margin: '0 0 4px 0',
color: '#0A0A0A',
fontFamily: 'Georgia, serif',
}}>
Log in
</h2>
{/* New to Public */}
<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
<span style={{ fontSize: 14, color: '#6B7280', fontFamily: 'system-ui, sans-serif' }}>
New to Public?
</span>
<Link href="/signup" style={{
display: 'flex',
alignItems: 'center',
gap: 2,
color: '#0A0A0A',
fontWeight: 600,
fontSize: 15,
textDecoration: 'none',
fontFamily: 'system-ui, sans-serif',
}}>
Create account <CaretRight />
</Link>
</div>
{/* Form */}
<div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
{/* Email */}

<div style={inputBoxStyle(emailFocused, email.length > 0)}>
<span style={labelStyle(emailFocused, email.length > 0)}>Email</span>
<input
type="email"
value={email}
onChange={e => setEmail(e.target.value)}
onFocus={() => setEmailFocused(true)}
onBlur={() => setEmailFocused(false)}
style={{
border: 'none',
outline: 'none',
width: '100%',
fontSize: 16,
paddingTop: emailFocused || email ? 12 : 0,
fontFamily: 'system-ui, sans-serif',
backgroundColor: 'transparent',
}}
/>
</div>
{/* Password */}
<div style={{ ...inputBoxStyle(passwordFocused, password.length > 0), paddingRight: 44 }}>
<span style={labelStyle(passwordFocused, password.length > 0)}>Password</span>
<input
type={showPassword ? 'text' : 'password'}
value={password}
onChange={e => setPassword(e.target.value)}
onFocus={() => setPasswordFocused(true)}
onBlur={() => setPasswordFocused(false)}
style={{
border: 'none',
outline: 'none',
width: '100%',
fontSize: 16,
paddingTop: passwordFocused || password ? 12 : 0,
fontFamily: 'system-ui, sans-serif',
backgroundColor: 'transparent',
}}
/>
<button
type="button"
onClick={() => setShowPassword(v => !v)}
aria-label={showPassword ? 'Hide password' : 'Show password'}
style={{
position: 'absolute',
right: 10,
top: '50%',

transform: 'translateY(-50%)',
background: 'none',
border: 'none',
cursor: 'pointer',
padding: 4,
color: '#9CA3AF',
display: 'flex',
}}
>
<svg fill="currentColor" width={18} height={18} viewBox="0 0 24 24">
{showPassword ? (
<path fillRule="evenodd" clipRule="evenodd" d="M12 4C4 4 1 12 1 12C1 12 4 20 12 20C20 20 23 12 23 12C23 12 20 4 12 4ZM12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12C15.5 13.933 13.933 15.5 12 15.5Z"/>
) : (
<path d="M3 3l18 18M10.5 10.677A3.5 3.5 0 0 0 12 15.5c1.933 0 3.5-1.567 3.5-3.5 0-.534-.12-1.04-.323-1.5M6.5 6.5C4.02 8.04 2 12 2 12s3 7 10 7c2.32 0 4.28-.86 5.82-2.18M19.5 17.5C21.43 15.96 23 12 23 12S20 5 12 5c-.95 0-1.87.1-2.73.27"/>
)}
</svg>
</button>
</div>
{/* Forgot password */}
<button
type="button"
style={{
alignSelf: 'flex-start',
background: 'none',
border: 'none',
cursor: 'pointer',
color: '#0A0A0A',
fontWeight: 600,
fontSize: 14,
padding: 0,
fontFamily: 'system-ui, sans-serif',
textDecoration: 'underline',
textUnderlineOffset: 2,
}}
>
Forgot your password?
</button>
{/* Submit */}
<div style={{ marginTop: 16 }}>
<button
type="button"
disabled={!isValid}
style={{
display: 'block',
marginLeft: 'auto',

padding: '14px 32px',
backgroundColor: isValid ? '#0A0A0A' : '#E5E7EB',
color: isValid ? '#fff' : '#9CA3AF',
border: 'none',
borderRadius: 999,
fontSize: 15,
fontWeight: 600,
cursor: isValid ? 'pointer' : 'not-allowed',
fontFamily: 'system-ui, sans-serif',
transition: 'background-color 0.2s',
minWidth: 100,
}}
>
Log in
</button>
</div>
</div>
</div>
</div>
</div>
);
}