export const Ic = ({ d, s = 16 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>;

export const CalI = ({ s = 14 }) => <Ic s={s} d={<><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></>}/>;

export const PinI = ({ s = 14 }) => <Ic s={s} d={<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></>}/>;

export const UsrI = ({ s = 14 }) => <Ic s={s} d={<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>}/>;

export const HmI = ({ s = 22 }) => <Ic s={s} d={<><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>}/>;

export const PrI = ({ s = 22 }) => <Ic s={s} d={<><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>}/>;

export const BkI = ({ s = 18 }) => <Ic s={s} d={<><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></>}/>;

export const ChI = ({ s = 16 }) => <Ic s={s} d={<path d="m9 18 6-6-6-6"/>}/>;
