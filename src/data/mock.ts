// DEMO DATA ONLY — illustrative kits, prices and contents. Real values come from approved BOMs (blueprint A3/A4).
export type Availability = 'available' | 'low' | 'unavailable'
export interface Character { slug: string; name: string; quality: string; cue: string; story: string }
export interface Component { name: string; qty: number; spec?: string }
export interface Kit { slug: string; name: string; character: string; descriptor: string; price: number; compareAt?: number; availability: Availability; components: Component[] }
export const characters: Character[] = [
 { slug:'arjun', name:'Arjun', quality:'Focus', cue:'Before training', story:'Arjun begins before the first rep. Preparation is the quiet part of strength.' },
 { slug:'bheema', name:'Bheema', quality:'Strength', cue:'The work of a session', story:'Strength is earned in the unglamorous middle of the session.' },
 { slug:'karna', name:'Karna', quality:'Resolve', cue:'Show up', story:'Resolve is deciding before you feel ready, then showing up.' },
 { slug:'sita', name:'Sita', quality:'Steadiness', cue:'Wind-down', story:'Steadiness is a skill you practise, and recovery is where it is built.' },
 { slug:'draupadi', name:'Draupadi', quality:'Self-possession', cue:'A purposeful routine', story:'Composure is a choice made daily, with purpose in every step.' },
 { slug:'savitri', name:'Savitri', quality:'Consistency', cue:'Consistency', story:'Consistency is quiet and cumulative. Day one, day two, day three.' },
]
const c = (name: string, qty: number, spec?: string): Component => ({ name, qty, spec })
export const kits: Kit[] = [
 { slug:'arjun-prep', name:'Prep Kit', character:'arjun', descriptor:'Everything for the minutes before training.', price:2499, compareAt:2899, availability:'available', components:[c('Wrist wraps',2,'Cotton blend, 45 cm'),c('Resistance band',1,'Medium'),c('Towel',1,'Microfibre')] },
 { slug:'arjun-flow', name:'Flow Kit', character:'arjun', descriptor:'Prep plus mobility.', price:3299, availability:'low', components:[c('Wrist wraps',2,'Cotton blend, 45 cm'),c('Resistance band',2,'Light, Medium'),c('Mobility ball',1),c('Towel',1,'Microfibre')] },
 { slug:'bheema-session', name:'Session Kit', character:'bheema', descriptor:'Built for the work of a training session.', price:3999, availability:'available', components:[c('Lifting straps',2),c('Chalk block',1),c('Grip pad',1),c('Towel',1,'Microfibre')] },
 { slug:'bheema-heavy', name:'Heavy Kit', character:'bheema', descriptor:'The full session setup.', price:5499, availability:'unavailable', components:[c('Lifting straps',2),c('Chalk block',2),c('Lifting belt',1,'Size M'),c('Knee sleeves',2)] },
 { slug:'karna-ignite', name:'Ignite Kit', character:'karna', descriptor:'For showing up when it is hard.', price:2999, availability:'available', components:[c('Headband',1),c('Resistance band',1,'Heavy'),c('Shaker',1,'700 ml')] },
 { slug:'sita-wind-down', name:'Wind-down Kit', character:'sita', descriptor:'A slow, steady recovery routine.', price:3499, compareAt:3899, availability:'available', components:[c('Foam roller',1),c('Massage ball',2),c('Stretch strap',1),c('Eye mask',1)] },
 { slug:'draupadi-poise', name:'Poise Kit', character:'draupadi', descriptor:'A purposeful routine, composed.', price:3799, availability:'low', components:[c('Yoga mat',1,'5 mm'),c('Resistance loops',3),c('Towel',1)] },
 { slug:'savitri-daily', name:'Daily Kit', character:'savitri', descriptor:'The same simple routine, every day.', price:2699, availability:'available', components:[c('Skipping rope',1),c('Resistance band',1,'Light'),c('Training notebook',1)] },
]
export const inr = (n: number) => new Intl.NumberFormat('en-IN', { style:'currency', currency:'INR', maximumFractionDigits:0 }).format(n)
export const charOf = (slug: string) => characters.find(x => x.slug === slug)!
export const label: Record<Availability, string> = { available:'Available', low:'Low stock', unavailable:'Unavailable' }
