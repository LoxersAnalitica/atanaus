import { useState, useEffect } from 'react'
import CookieConsent, { getCookieConsentValue } from 'react-cookie-consent'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import './index.css'

/* ─── Icons (Inline SVGs) ─────────────────────────────────── */

const KeyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
)

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="m9 11 3 3L22 4" />
  </svg>
)

/* ─── Global Scroll to Contact Function ──────────────────────── */
const scrollToContact = () => {
  // On mobile, scroll to the mobile form section; on desktop, scroll to the hero (where the form is)
  const isMobile = window.innerWidth <= 900;
  const target = isMobile
    ? document.getElementById('mobile-contact-form')
    : document.querySelector('.hero');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const firstInput = target.querySelector('input[type="email"]') || target.querySelector('input[name="name"]');
      if (firstInput) firstInput.focus();
    }, 500);
  }
}

/* ─── Header ─────────────────────────────────────────────── */

function Header({ onOpenDossier }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        <div className="logo">
          Atanaus Suites
        </div>
        <div className="contact-nav">
          <button
            onClick={onOpenDossier}
            className="dossier-btn"
            style={{
              backgroundColor: scrolled ? 'var(--text-main)' : 'rgba(255,255,255,0.15)',
              border: scrolled ? '1px solid var(--text-main)' : '1px solid rgba(255,255,255,0.4)',
              color: scrolled ? '#fff' : '#fff',
              padding: '8px 16px',
              borderRadius: '2px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              transition: 'all 0.3s ease',
              marginRight: '10px',
              cursor: 'pointer'
            }}
          >
            Access Full Dossier (in English)
          </button>
        </div>
      </div>
    </header>
  )
}

/* ─── Hero Section ───────────────────────────────────────── */

const KommoStyles = () => (
  <style dangerouslySetInnerHTML={{
    __html: `
    .amoforms-code-container input[type="text"],
    .amoforms-code-container input[type="tel"],
    .amoforms-code-container input[type="email"] {
      background-color: #ffffff !important;
      border: 1px solid rgba(0,0,0,0.1) !important;
      color: #333 !important;
      border-radius: 2px !important;
      padding: 14px 10px !important;
      font-family: 'Inter', sans-serif !important;
      font-size: 14px !important;
      width: 100% !important;
      margin-bottom: 15px !important;
    }
    .amoforms-code-container input:focus {
      border: 1px solid #C5A880 !important;
      outline: none !important;
    }
    .PhoneInput {
      background-color: #ffffff !important;
      border: 1px solid rgba(0,0,0,0.1) !important;
      border-radius: 2px !important;
      padding: 0 10px !important;
      margin-bottom: 15px !important;
      display: flex;
      align-items: center;
      transition: border 0.3s ease;
    }
    .PhoneInput:focus-within {
      border: 1px solid #C5A880 !important;
    }
    .PhoneInputInput {
      border: none !important;
      background: transparent !important;
      padding: 14px 0 !important;
      margin-bottom: 0 !important;
      color: #333 !important;
      font-family: 'Inter', sans-serif !important;
      font-size: 14px !important;
      width: 100% !important;
      outline: none !important;
    }
    .amoforms-label {
      color: #333 !important;
      font-family: 'Inter', sans-serif !important;
      font-size: 11px !important;
      text-transform: uppercase !important;
      margin-bottom: 6px !important;
      display: block !important;
    }
    .amoforms-action-btn {
      background-color: #C5A880 !important;
      border: none !important;
      color: #fff !important;
      font-family: 'Inter', sans-serif !important;
      font-size: 14px !important;
      text-transform: uppercase !important;
      letter-spacing: 2px !important;
      border-radius: 2px !important;
      padding: 18px 30px !important;
      width: 100% !important;
      cursor: pointer !important;
      transition: background-color 0.3s ease !important;
    }
    .amoforms-action-btn:hover {
      background-color: #b39770 !important;
    }
  `}} />
)

function Hero() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', budget: '', travelPlan: '' })
  const [status, setStatus] = useState('idle')
  const [formStep, setFormStep] = useState(1)

  // Detect lead source and full UTM details from URL params
  const getLeadSource = () => {
    const params = new URLSearchParams(window.location.search)
    const utmSource = (params.get('utm_source') || '').toLowerCase()
    const utmMedium = (params.get('utm_medium') || '').toLowerCase()
    const utmCampaign = params.get('utm_campaign') || ''
    const utmContent = params.get('utm_content') || ''
    const utmTerm = params.get('utm_term') || ''
    const gclid = params.get('gclid')
    const fbclid = params.get('fbclid')

    let sourceName = 'Direct / Organic'
    if (gclid || utmSource === 'google' || utmSource === 'adwords') sourceName = 'Google Ads'
    else if (fbclid || utmSource === 'facebook' || utmSource === 'instagram' || utmSource === 'meta' || utmSource === 'fb' || utmSource === 'ig') sourceName = 'Meta Ads'
    else if (utmMedium === 'cpc' || utmMedium === 'ppc') sourceName = utmSource ? utmSource + ' (paid)' : 'Paid'
    else if (utmSource) sourceName = utmSource

    return {
      sourceName,
      utmCampaign,
      utmContent,
      utmTerm,
      utmSource,
      utmMedium,
      gclid: gclid || '',
      fbclid: fbclid || ''
    }
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.phone || !formData.email || !formData.budget || !formData.travelPlan) {
      alert("Please fill all fields to request information.")
      return
    }

    setStatus('submitting')

    try {
      const leadSource = getLeadSource()
      const response = await fetch('/api/kommo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          budget: formData.budget,
          travelPlan: formData.travelPlan,
          source: leadSource.sourceName,
          utmCampaign: leadSource.utmCampaign,
          utmContent: leadSource.utmContent,
          utmTerm: leadSource.utmTerm,
          utmSource: leadSource.utmSource,
          utmMedium: leadSource.utmMedium,
          gclid: leadSource.gclid,
          fbclid: leadSource.fbclid
        })
      })

      if (response.ok) {
        setStatus('success')
        // Lead event is fired server-side via Meta CAPI (api/kommo.js)
        // Do NOT duplicate here with fbq('track', 'Lead')
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  const contactFormJSX = (
    <div className="glass-box">
      <KommoStyles />
      <h2 className="glass-box-title">Check Availability</h2>
      <p className="glass-box-desc">Request Information</p>

      <div style={{ position: 'relative', minHeight: '280px' }}>
        <div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: status === 'success' ? 1 : 0,
            visibility: status === 'success' ? 'visible' : 'hidden',
            transition: 'opacity 0.8s ease'
          }}
        >
          <h3 style={{
            color: 'var(--text-main)',
            fontFamily: 'var(--font-serif)',
            fontSize: '1.4rem',
            textAlign: 'center',
            lineHeight: '1.6'
          }}>
            Request sent successfully.<br />We will contact you shortly.
          </h3>
        </div>

        <form
          className="amoforms-code-container"
          style={{
            opacity: status === 'success' ? 0 : 1,
            visibility: status === 'success' ? 'hidden' : 'visible',
            transition: 'opacity 0.5s ease'
          }}
          onSubmit={handleSubmit}
        >
          {formStep === 1 && (
            <div style={{ marginBottom: '15px', animation: 'fadeIn 0.5s ease' }}>
              <label className="amoforms-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={status === 'submitting'}
                placeholder="Enter your email"
                required
              />
              <button
                type="button"
                className="amoforms-action-btn"
                onClick={() => {
                  if (formData.email && formData.email.includes('@')) setFormStep(2)
                  else alert('Please enter a valid email address.')
                }}
                style={{ marginTop: '15px' }}
              >
                Check Availability
              </button>
            </div>
          )}

          {formStep === 2 && (
            <div style={{ marginBottom: '15px', animation: 'fadeIn 0.5s ease' }}>
              <label className="amoforms-label">What is your approximate budget?</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                {[
                  { value: 'Below €350,000', label: 'Below €350,000' },
                  { value: '€350,000 - €500,000', label: '€350,000 – €500,000' },
                  { value: 'Above €500,000', label: 'Above €500,000' }
                ].map((option) => (
                  <label
                    key={option.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '14px 14px',
                      border: formData.budget === option.value ? '2px solid #C5A880' : '1px solid rgba(0,0,0,0.1)',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      backgroundColor: formData.budget === option.value ? 'rgba(197,168,128,0.08)' : '#fff',
                      transition: 'all 0.2s ease',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      color: '#333'
                    }}
                  >
                    <input
                      type="radio"
                      name="budget"
                      value={option.value}
                      checked={formData.budget === option.value}
                      onChange={handleInputChange}
                      style={{ accentColor: '#C5A880', width: '18px', height: '18px' }}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
              <button
                type="button"
                className="amoforms-action-btn"
                onClick={() => {
                  if (!formData.budget) {
                    alert('Please select your approximate budget.')
                    return
                  }
                  if (formData.budget === 'Below €350,000') {
                    setFormStep('low-budget')
                  } else {
                    setFormStep(3)
                  }
                }}
                style={{ marginTop: '15px', opacity: formData.budget ? 1 : 0.5 }}
                disabled={!formData.budget}
              >
                Continue
              </button>
              <button type="button" onClick={() => setFormStep(1)} style={{ background: 'none', border: 'none', color: '#666', marginTop: '10px', width: '100%', cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
            </div>
          )}

          {formStep === 'low-budget' && (
            <div className="budget-warning">
              <div className="budget-warning-icon">🏠</div>
              <h3 className="budget-warning-title">
                We currently don't have available properties in this price range.
              </h3>
              <p className="budget-warning-text">
                However, you can still reach out to us for future opportunities or alternative options.
              </p>
              <a
                href="https://wa.me/34919934639?text=Hello,%20I%20would%20like%20to%20request%20information%20about%20Atanaus%20Suites.%20My%20budget%20is%20below%20%E2%82%AC350,000."
                target="_blank"
                rel="noopener noreferrer"
                className="budget-warning-whatsapp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                Contact Us Anyway
              </a>
              <button type="button" onClick={() => setFormStep(2)} style={{ background: 'none', border: 'none', color: '#666', marginTop: '15px', width: '100%', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.85rem' }}>Change Budget</button>
            </div>
          )}

          {formStep === 3 && (
            <div style={{ marginBottom: '15px', animation: 'fadeIn 0.5s ease' }}>
              <label className="amoforms-label">Phone</label>
              <div style={{ position: 'relative' }}>
                <PhoneInput
                  international
                  defaultCountry="ES"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  disabled={status === 'submitting'}
                  required
                />
              </div>
              <p style={{ fontSize: '0.75rem', color: '#333', marginTop: '4px', fontStyle: 'italic', lineHeight: '1.2' }}>
                * Please provide a valid number with WhatsApp. You will receive an immediate verification message.
              </p>
              <button
                type="button"
                className="amoforms-action-btn"
                onClick={() => {
                  if (formData.phone && formData.phone.length > 8) setFormStep(4)
                  else alert('Please enter a valid phone number.')
                }}
                style={{ marginTop: '15px' }}
              >
                Continue
              </button>
              <button type="button" onClick={() => setFormStep(2)} style={{ background: 'none', border: 'none', color: '#666', marginTop: '10px', width: '100%', cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
            </div>
          )}

          {formStep === 4 && (
            <div style={{ marginBottom: '15px', animation: 'fadeIn 0.5s ease' }}>
              <label className="amoforms-label">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={status === 'submitting'}
                placeholder="Enter your full name"
                required
              />

              <button
                type="button"
                className="amoforms-action-btn"
                onClick={() => {
                  if (formData.name && formData.name.trim().length > 1) setFormStep(5)
                  else alert('Please enter your full name.')
                }}
                style={{ marginTop: '15px' }}
              >
                Continue
              </button>
              <button type="button" onClick={() => setFormStep(3)} style={{ background: 'none', border: 'none', color: '#666', marginTop: '10px', width: '100%', cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
            </div>
          )}

          {formStep === 5 && (
            <div style={{ marginBottom: '15px', animation: 'fadeIn 0.5s ease' }}>
              <label className="amoforms-label">When do you plan to come to Tenerife?</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                {[
                  { value: 'Already in Tenerife', label: "I'm already in Tenerife" },
                  { value: 'Less than 3 months', label: 'In less than 3 months' },
                  { value: 'More than 3 months', label: 'More than 3 months' }
                ].map((option) => (
                  <label
                    key={option.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '14px 14px',
                      border: formData.travelPlan === option.value ? '2px solid #C5A880' : '1px solid rgba(0,0,0,0.1)',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      backgroundColor: formData.travelPlan === option.value ? 'rgba(197,168,128,0.08)' : '#fff',
                      transition: 'all 0.2s ease',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      color: '#333'
                    }}
                  >
                    <input
                      type="radio"
                      name="travelPlan"
                      value={option.value}
                      checked={formData.travelPlan === option.value}
                      onChange={handleInputChange}
                      style={{ accentColor: '#C5A880', width: '18px', height: '18px' }}
                    />
                    {option.label}
                  </label>
                ))}
              </div>

              {status === 'error' && (
                <p style={{ color: 'red', fontSize: '0.85rem', marginBottom: '15px', marginTop: '10px' }}>
                  There was an error processing your request. Please try again.
                </p>
              )}

              <button type="submit" className="amoforms-action-btn" disabled={status === 'submitting' || !formData.travelPlan} style={{ marginTop: '15px', opacity: formData.travelPlan ? 1 : 0.5 }}>
                {status === 'submitting' ? 'Sending...' : 'Check Availability'}
              </button>
              <button type="button" onClick={() => setFormStep(4)} style={{ background: 'none', border: 'none', color: '#666', marginTop: '10px', width: '100%', cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
            </div>
          )}
        </form>
      </div>
    </div>
  )

  return (
    <>
      <section className="hero">
        <img src="/assets/hero-cupula.jpg" alt="Atanaus Suites Tenerife" className="hero-bg" />
        <div className="hero-overlay" style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.45) 70%, var(--bg-dark) 100%)' }}></div>

        <div className="container hero-content">
          <div className="hero-text-area">
            <div style={{ marginBottom: '1.5rem', animation: 'fadeInUp 1s ease-out' }}>
              <span style={{
                backgroundColor: 'rgba(39, 37, 34, 0.8)',
                backdropFilter: 'blur(5px)',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '50px',
                fontSize: '0.85rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                display: 'inline-block',
                marginBottom: '1.5rem',
                border: '1px solid var(--accent-gold)'
              }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: '#e74c3c', borderRadius: '50%', marginRight: '8px', animation: 'pulse 2s infinite' }}></span>
                Only 9 left
              </span>
              <h1 className="hero-h1" style={{ marginBottom: '0.5rem', lineHeight: '1.2' }}>
                Discover Atanaus Suites in Tenerife<br />
                <span className="text-gold" style={{ fontSize: '1.2em', fontWeight: '700', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>From 340.000 €</span>
              </h1>
            </div>

            <div className="mobile-only" style={{ marginTop: '1rem' }}>
              <button
                onClick={() => document.getElementById('description-prices')?.scrollIntoView({ behavior: 'smooth' })}
                className="amoforms-action-btn"
                style={{
                  display: 'inline-block',
                  padding: '16px 30px',
                  backgroundColor: 'var(--accent-gold)',
                  border: 'none',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  boxShadow: '0 8px 20px rgba(197, 168, 128, 0.4)',
                  borderRadius: '4px'
                }}>
                Get Prices & Floor Plans
              </button>
            </div>
          </div>

          <div className="desktop-only">
            {contactFormJSX}
          </div>
        </div>
      </section>

      {/* Unified Flow: Gallery immediately after Banner */}
      <Gallery />

      {/* Description Section */}
      <section id="description-prices" style={{ backgroundColor: '#F9F8F6', padding: '5rem 1.5rem 3rem', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <p style={{
            fontFamily: 'var(--font-sans)',
            color: 'var(--text-main)',
            fontSize: '1.2rem',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.7',
            fontWeight: '300'
          }}>
            Your new home in the south of Tenerife, just 600 meters from the promenade.<br /><br />
            An exclusive residential complex of 55 properties located in Los Cristianos, one of the most established and sought-after areas on the island. A unique opportunity offering the perfect combination of tranquility, strategic location, and quality of life.
          </p>
        </div>
      </section>

      {/* Price List - right after description */}
      <PriceList />

      {/* Mobile Contact Form - after price list */}
      <section id="mobile-contact-form" style={{ backgroundColor: '#F9F8F6', padding: '4rem 1.5rem', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="mobile-only" style={{ maxWidth: '500px', margin: '0 auto' }}>
            {contactFormJSX}
          </div>
        </div>
      </section>
    </>
  )
}

/* ─── Benefits Section ───────────────────────────────────── */

function Benefits() {
  return (
    <section className="benefits">
      <div className="container" style={{ textAlign: 'center' }}>
        <p className="value-add-subtitle">Wellness Area</p>
        <h2 className="value-add-title" style={{ marginBottom: '3rem', textAlign: 'center' }}>A Complex Designed for Your Well-being</h2>
        <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 3rem auto', lineHeight: '1.6' }}>
          Recently renovated to update its facilities and enhance its residential character, the complex is distributed across three low-rise blocks surrounding a core designed for relaxation under Tenerife's privileged climate.
        </p>

        <div className="benefits-grid" style={{ marginBottom: '3rem' }}>
          <div className="benefit-card">
            <div className="benefit-icon"><KeyIcon /></div>
            <h3 className="benefit-title">Spacious swimming pool</h3>
            <p className="benefit-desc">Communal swimming pool with a solarium and lounge area to relax.</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon"><ShieldIcon /></div>
            <h3 className="benefit-title">Fully equipped gym</h3>
            <p className="benefit-desc">Maintain an active lifestyle with our fully equipped indoor gym facility.</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon"><LeafIcon /></div>
            <h3 className="benefit-title">Landscaped gardens</h3>
            <p className="benefit-desc">Carefully landscaped gardens providing a tranquil atmosphere in a community with no elevator fees.</p>
          </div>
        </div>

        <button onClick={scrollToContact} className="amoforms-action-btn" style={{
          display: 'inline-block', width: 'auto', padding: '15px 40px', backgroundColor: 'var(--text-main)'
        }}>
          Check Availability
        </button>
      </div>
    </section>
  )
}

/* ─── Values & Location Section ──────────────────────────── */

function ValueAdd() {
  return (
    <section className="value-add">
      <div className="container value-add-content">
        <div>
          <p className="value-add-subtitle">Interiors & Location</p>
          <h2 className="value-add-title">Homes Designed to Inspire</h2>
          <p className="value-add-text">
            Enjoy functional, bright spaces adapted to the coastal lifestyle. We offer property types to suit your needs, from studios to one and two-bedroom homes, ideal as a primary residence or a second home.
          </p>
          <ul className="value-add-list">
            <li className="value-add-item">
              <div className="value-add-item-icon"><CheckCircleIcon /></div>
              <div>
                <h4 className="value-add-item-title">Open-plan design</h4>
                <p className="value-add-item-text">Bright living-dining rooms with modern, fully equipped kitchens.</p>
              </div>
            </li>
            <li className="value-add-item">
              <div className="value-add-item-icon"><CheckCircleIcon /></div>
              <div>
                <h4 className="value-add-item-title">Private exteriors</h4>
                <p className="value-add-item-text">Pleasant terraces, many with views of the pool or the sea.</p>
              </div>
            </li>
            <li className="value-add-item">
              <div className="value-add-item-icon"><CheckCircleIcon /></div>
              <div>
                <h4 className="value-add-item-title">Guaranteed comfort</h4>
                <p className="value-add-item-text">Each property includes a storage room and a parking space in the underground garage.</p>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <div style={{ padding: 'clamp(30px, 6vw, 60px)', border: '1px solid var(--border-color)', position: 'relative', backgroundColor: 'var(--bg-dark)' }}>
            <div style={{ position: 'absolute', top: '-10px', left: '-10px', width: '30px', height: '30px', borderTop: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)' }}></div>
            <div style={{ position: 'absolute', bottom: '-10px', right: '-10px', width: '30px', height: '30px', borderBottom: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)' }}></div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 5vw, 1.8rem)', color: 'var(--text-main)', textAlign: 'center', fontWeight: '400', fontStyle: 'italic', marginBottom: '1rem' }}>
              "The Perfect Location in Tenerife"
            </h3>
            <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', textAlign: 'center', fontSize: 'clamp(0.9rem, 3vw, 1rem)', lineHeight: '1.6' }}>
              Enjoy year-round sun and maximum comfort. You'll be steps away from beaches, dining, and essential services.
            </p>
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <img src="/assets/atanaus-map.png" alt="Atanaus Suites Location in Los Cristianos" style={{ width: '100%', maxWidth: '400px', height: 'auto', borderRadius: '4px', opacity: '0.9' }} />
            </div>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button onClick={scrollToContact} className="amoforms-action-btn" style={{
                display: 'inline-block', width: 'auto', padding: '12px 30px', backgroundColor: 'var(--accent-gold)'
              }}>
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Price List Section ──────────────────────────────────── */

const PROPERTIES = [
  { code: 'A4-1', floor: 'Ground', bedrooms: 1, interior: 44.43, terrace: 17.05, extra: 'Garden views', price: '€336,272', availability: 'Available', parking: 'Included', note: 'Local' },
  { code: 'A7-1', floor: 'First', bedrooms: 1, interior: 53.59, terrace: 4.41, extra: 'Pool views', price: '€318,003', availability: 'Available', parking: 'Included', note: '' },
  { code: 'A9-1', floor: 'First', bedrooms: 1, interior: 54.38, terrace: 4.41, extra: 'Pool views', price: '€318,003', availability: 'Available', parking: 'Included', note: '' },
  { code: 'A11-1', floor: 'Second', bedrooms: 2, interior: 102.08, terrace: 71.90, extra: 'Penthouse, rooftop, sea views', price: '€641,311', availability: 'Available', parking: 'Included', note: '' },
  { code: 'A11-2', floor: 'Second', bedrooms: 1, interior: 54.31, terrace: 6.26, extra: 'Penthouse, pool views', price: '€353,129', availability: 'Available', parking: 'Included', note: '' },
  { code: 'B2-2', floor: 'Ground', bedrooms: 1, interior: 59.23, terrace: 9.57, extra: 'Direct pool access, Block B', price: '€392,700', availability: 'Available', parking: 'Included', note: '' },
  { code: 'B7-1', floor: 'First', bedrooms: 1, interior: 54.41, terrace: 4.30, extra: 'Pool views', price: '€339,086', availability: 'Available', parking: 'Included', note: '' },
  { code: 'B7-2', floor: 'First', bedrooms: 2, interior: 134.72, terrace: 48.51, extra: 'Duplex, rooftop, mountain views', price: '€691,130', availability: 'Available', parking: 'Included', note: '' },
  { code: 'B10-1', floor: 'First', bedrooms: 1, interior: 48.40, terrace: 5.10, extra: 'Sea and pool views', price: '€348,700', availability: 'Blocked', parking: 'Included', note: '' },
  { code: 'B11-3', floor: 'Second', bedrooms: 1, interior: 56.72, terrace: 83.57, extra: 'Penthouse with panoramic views', price: '€455,565', availability: 'Available', parking: 'Included', note: '' },
  { code: 'C4', floor: 'First', bedrooms: 1, interior: 119.80, terrace: 84.72, extra: 'Penthouse with pool and sea views', price: '€569,580', availability: 'Available', parking: 'Included', note: 'Local' },
  { code: 'C-5', floor: 'First', bedrooms: 1, interior: 120.19, terrace: 84.72, extra: 'Penthouse, rooftop, mountain views', price: '€569,580', availability: 'Available', parking: 'Included', note: '' },
]

function PriceList() {
  return (
    <section className="price-list">
      <div className="container">
        <div className="price-list-header">
          <p className="value-add-subtitle">Available Properties</p>
          <h2 className="price-list-title">Prices &amp; Availability</h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', fontWeight: '300' }}>
            All properties include a parking space and storage room. Prices are subject to availability.
          </p>
        </div>

        {/* Desktop Table */}
        <div className="price-table-wrapper">
          <table className="price-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Floor</th>
                <th>Bed</th>
                <th>Interior</th>
                <th>Terrace</th>
                <th>Features</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {PROPERTIES.map((p) => (
                <tr key={p.code} className={p.availability === 'Blocked' ? 'row-blocked' : ''}>
                  <td className="col-code">
                    {p.code}
                    {p.note === 'Local' && <span className="badge-local">+ Local</span>}
                  </td>
                  <td>{p.floor}</td>
                  <td>{p.bedrooms}</td>
                  <td>{p.interior} m²</td>
                  <td>{p.terrace} m²</td>
                  <td className="col-extra">{p.extra}</td>
                  <td className="col-price">{p.price}</td>
                  <td>
                    <span className={`badge ${p.availability === 'Available' ? 'badge-available' : 'badge-blocked'}`}>
                      {p.availability === 'Blocked' ? 'Reserved' : p.availability}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="price-cards">
          {PROPERTIES.map((p) => (
            <div key={p.code} className={`price-card ${p.availability === 'Blocked' ? 'card-blocked' : ''}`}>
              <div className="price-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="price-card-code">{p.code}</span>
                  {p.note === 'Local' && <span className="badge-local">+ Local</span>}
                  <span className={`badge ${p.availability === 'Available' ? 'badge-available' : 'badge-blocked'}`}>
                    {p.availability === 'Blocked' ? 'Reserved' : p.availability}
                  </span>
                </div>
                <span className="price-card-price">{p.price}</span>
              </div>
              <div className="price-card-details">
                <span><span className="detail-label">Floor</span> {p.floor}</span>
                <span><span className="detail-label">Bed</span> {p.bedrooms}</span>
                <span><span className="detail-label">Interior</span> {p.interior} m²</span>
                <span><span className="detail-label">Terrace</span> {p.terrace} m²</span>
              </div>
              {p.extra && <div className="price-card-extra">{p.extra}</div>}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button onClick={scrollToContact} className="amoforms-action-btn" style={{
            display: 'inline-block', width: 'auto', padding: '15px 40px', backgroundColor: 'var(--text-main)'
          }}>
            Check Availability
          </button>
        </div>
      </div>
    </section>
  )
}

/* ─── Gallery Section ────────────────────────────────────────── */

function Gallery() {
  return (
    <section className="gallery">
      <div className="container">
        <div className="gallery-header" style={{ marginBottom: '2rem' }}>
          <p className="value-add-subtitle">Gallery</p>
          <h2 className="gallery-title">Discover the Coastal Lifestyle</h2>
        </div>
        <div className="gallery-grid">
          <div className="gallery-item">
            <img src="/assets/media__1773763542250.jpg" alt="Interior Living and Dining Area" />
            <div className="gallery-item-caption">Open-plan Living Areas</div>
          </div>
          <div className="gallery-item">
            <img src="/assets/media__1773763542263.jpg" alt="Bright Master Bedroom" />
            <div className="gallery-item-caption">Bright & Restful Bedrooms</div>
          </div>
          <div className="gallery-item">
            <img src="/assets/media__1773763542331.jpg" alt="Functional Coastal Design" />
            <div className="gallery-item-caption">Functional Coastal Design</div>
          </div>
          <div className="gallery-item">
            <img src="/assets/media__1773763542306.jpg" alt="Equipped Modern Kitchen" />
            <div className="gallery-item-caption">Fully Equipped Modern Kitchens</div>
          </div>
          <div className="gallery-item">
            <img src="/assets/media__1773853074127.jpg" alt="Spacious private terraces with pergola" />
            <div className="gallery-item-caption">Beautiful Private Terraces</div>
          </div>
          <div className="gallery-item">
            <img src="/assets/media__1773853074125.jpg" alt="Cozy outdoor dining area" />
            <div className="gallery-item-caption">Outdoor Dining Areas</div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button onClick={scrollToContact} className="amoforms-action-btn" style={{
            display: 'inline-block', width: 'auto', padding: '15px 40px', backgroundColor: 'var(--text-main)'
          }}>
            Check Availability
          </button>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="footer" style={{ paddingBottom: '3rem' }}>
      <div className="container">
        <p className="footer-text" style={{ marginBottom: '1rem' }}>
          Atanaus Suites - Los Cristianos, Tenerife.
          <span className="footer-phone">Direct WhatsApp: +34 919 934 639</span>
        </p>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <a
            href="/politica-de-privacidad"
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.8rem',
              textDecoration: 'none',
              fontFamily: 'var(--font-sans)',
              transition: 'color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.color = 'var(--text-light)'}
            onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  )
}

/* ─── WhatsApp Floating Button ───────────────────────────── */

function WhatsAppButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <a
      href="https://wa.me/34919934639?text=Hello,%20I%20would%20like%20to%20request%20information%20about%20Atanaus%20Suites."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact via WhatsApp"
      className={`whatsapp-float ${visible ? 'visible' : ''}`}
      onClick={() => {
        if (window.fbq) {
          window.fbq('track', 'Contact');
        }
      }}
    >
      <WhatsAppIcon />
    </a>
  )
}

/* ─── Privacy Policy Page ────────────────────────────────── */

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section style={{ paddingTop: '150px', paddingBottom: '100px', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)', fontSize: '2.5rem', marginBottom: '2rem' }}>
          Privacy Policy
        </h1>

        <div style={{ fontFamily: 'var(--font-sans)', lineHeight: '1.8', fontSize: '0.95rem' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            At <strong>Atanaus Suites</strong>, discretion and the protection of our clients' data are fundamental. This Privacy Policy describes how we collect, use, and protect the personal information we obtain through our platform.
          </p>

          <h3 style={{ fontSize: '1.2rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: 500 }}>
            1. Information we collect
          </h3>
          <p style={{ marginBottom: '1.5rem' }}>
            By requesting access to our portfolio, we collect the strictly necessary data to verify your suitability and to be able to contact you: Full Name, Phone, and Email address.
          </p>

          <h3 style={{ fontSize: '1.2rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: 500 }}>
            2. Use of information
          </h3>
          <div style={{ marginBottom: '1.5rem' }}>
            The data provided is used exclusively for the following purposes:
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '0.5rem' }}>
              <li>Initial evaluation of your profile.</li>
              <li>Direct communication for the presentation of available assets.</li>
              <li>Management of the commercial relationship in strict confidentiality.</li>
            </ul>
          </div>

          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Last updated: March 17, 2026.
            </p>
            <a href="/" style={{ display: 'inline-block', marginTop: '1.5rem', color: 'var(--accent-gold)', textDecoration: 'none', borderBottom: '1px solid var(--accent-gold)', paddingBottom: '2px' }}>
              &larr; Return to Home
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Dossier Modal Component ───────────────────────────── */

function DossierModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState('idle')

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !phone) {
      alert("Please provide both email and phone number to receive the dossier.")
      return
    }

    setStatus('submitting')

    try {
      const response = await fetch('/api/kommo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Dossier Request (Atanaus)',
          phone: phone,
          email: email
        })
      })

      if (response.ok) {
        setStatus('success')
        // Lead event is fired server-side via Meta CAPI (api/kommo.js)
        // Do NOT duplicate here with fbq('track', 'Lead')
        setTimeout(() => {
          onClose()
          setStatus('idle')
        }, 3000)
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
      zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: '#fff', padding: '40px 30px', borderRadius: '4px',
        maxWidth: '450px', width: '90%', position: 'relative',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '15px', right: '15px',
          fontSize: '1.5rem', color: '#999', cursor: 'pointer'
        }}>
          &times;
        </button>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '10px', textAlign: 'center' }}>
          Access the Full Dossier
        </h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '25px', textAlign: 'center' }}>
          Please enter your details to receive the complete Atanaus Suites dossier.
        </p>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <p style={{ color: 'var(--accent-gold)', fontSize: '1.2rem', fontFamily: 'var(--font-serif)' }}>
              Request sent successfully.<br />Check your inbox shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <PhoneInput
                international
                defaultCountry="ES"
                value={phone}
                onChange={setPhone}
                required
                disabled={status === 'submitting'}
                style={{
                  width: '100%', padding: '5px',
                  border: '1px solid #ccc', borderRadius: '2px',
                  fontFamily: 'var(--font-sans)', fontSize: '1rem',
                  backgroundColor: '#fff'
                }}
              />
              <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '6px', fontStyle: 'italic', lineHeight: '1.2', textAlign: 'left' }}>
                * We will send an immediate WhatsApp message to verify this number before sending the dossier.
              </p>
            </div>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Your email address"
              style={{
                width: '100%', padding: '15px', marginBottom: '20px',
                border: '1px solid #ccc', borderRadius: '2px',
                fontFamily: 'var(--font-sans)', fontSize: '1rem'
              }}
              disabled={status === 'submitting'}
            />
            {status === 'error' && (
              <p style={{ color: 'red', fontSize: '0.85rem', marginBottom: '15px', textAlign: 'center' }}>
                Error sending request. Please try again.
              </p>
            )}
            <button
              type="submit"
              disabled={status === 'submitting'}
              style={{
                width: '100%', padding: '16px', backgroundColor: 'var(--accent-gold)',
                color: '#fff', border: 'none', borderRadius: '2px',
                textTransform: 'uppercase', letterSpacing: '2px',
                cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: '500',
                transition: 'background-color 0.3s'
              }}
            >
              {status === 'submitting' ? 'Sending...' : 'Get Dossier'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

/* ─── App ─────────────────────────────────────────────────── */

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [isDossierOpen, setIsDossierOpen] = useState(false)

  const grantGoogleConsent = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'analytics_storage': 'granted'
      });
    }
  }

  useEffect(() => {
    if (getCookieConsentValue("atanaus-cookie-consent") === "true") {
      grantGoogleConsent();
    }

    const handleLocationChange = () => setCurrentPath(window.location.pathname)
    window.addEventListener('popstate', handleLocationChange)
    return () => window.removeEventListener('popstate', handleLocationChange)
  }, [])

  if (currentPath === '/politica-de-privacidad') {
    return (
      <>
        <Header onOpenDossier={() => setIsDossierOpen(true)} />
        <main>
          <PrivacyPolicy />
        </main>
        <Footer />
        <DossierModal isOpen={isDossierOpen} onClose={() => setIsDossierOpen(false)} />
      </>
    )
  }

  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="I Understand"
        cookieName="atanaus-cookie-consent"
        onAccept={grantGoogleConsent}
        style={{ background: "#272522", color: "#F9F8F6", fontFamily: "var(--font-sans)", fontSize: "14px" }}
        buttonStyle={{ backgroundColor: "#C5A880", color: "#fff", fontSize: "12px", borderRadius: "2px", fontWeight: "bold", textTransform: "uppercase", padding: "10px 20px" }}
        expires={150}
      >
        We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "I Understand", you consent to our use of cookies.
      </CookieConsent>
      <Header onOpenDossier={() => setIsDossierOpen(true)} />
      <main>
        <Hero />
        <Benefits />
        <ValueAdd />
      </main>
      <Footer />
      <WhatsAppButton />
      <DossierModal isOpen={isDossierOpen} onClose={() => setIsDossierOpen(false)} />
    </>
  )
}
