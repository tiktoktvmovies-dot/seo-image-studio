export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method === 'POST') {
      try {
        const body = await request.json();
        const base64 = body.image.split(',')[1];
        const binary = atob(base64);
        const imageArray = Array.from({ length: binary.length }, (_, i) => binary.charCodeAt(i));
        const response = await env.AI.run(
          '@cf/llava-hf/llava-1.5-7b-hf',
          { image: imageArray, prompt: 'Describe this image in detail, including colors, objects, style, mood, and composition.', max_tokens: 512 }
        );
        return Response.json({ result: response }, { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      } catch (err) {
        return Response.json({ error: err.message }, { status: 500, headers: corsHeaders });
      }
    }

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- SEO Meta Tags -->
<title>Img2Prompt — Free AI Image to Prompt Generator | Convert Images to AI Prompts</title>
<meta name="description" content="Convert any image to detailed AI prompts instantly. Free image to prompt generator powered by LLaVA AI. Perfect for Midjourney, Stable Diffusion, DALL-E, and more.">
<meta name="keywords" content="image to prompt, AI prompt generator, image to text AI, Midjourney prompt, Stable Diffusion prompt, DALL-E prompt, LLaVA, free AI tool">
<meta name="author" content="Img2Prompt">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://img2prompt.com">

<!-- Open Graph -->
<meta property="og:title" content="Img2Prompt — Turn Any Image Into a Perfect AI Prompt">
<meta property="og:description" content="Free AI-powered image to prompt generator. Upload any image and get detailed prompts for Midjourney, Stable Diffusion, DALL-E instantly.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://img2prompt.com">
<meta property="og:image" content="https://img2prompt.com/og-image.jpg">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Img2Prompt — Free AI Image to Prompt Generator">
<meta name="twitter:description" content="Convert any image to AI prompts instantly. Free, fast, and accurate.">

<!-- Schema.org -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Img2Prompt",
  "url": "https://img2prompt.com",
  "description": "AI-powered image to prompt generator",
  "applicationCategory": "AIApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
</script>

<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>
:root {
  --bg: #ffffff;
  --bg2: #fafafa;
  --bg3: #f5f5f5;
  --card: #ffffff;
  --border: #eeeeee;
  --border2: #e0e0e0;
  --red: #e53935;
  --red2: #c62828;
  --red-light: rgba(229,57,53,0.08);
  --red-border: rgba(229,57,53,0.2);
  --text: #111111;
  --text2: #444444;
  --muted: #999999;
  --muted2: #666666;
  --green: #2e7d32;
  --shadow: 0 4px 24px rgba(0,0,0,0.06);
  --shadow2: 0 8px 40px rgba(0,0,0,0.1);
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; }

/* ===== NAV ===== */
nav {
  position: sticky; top: 0; z-index: 100;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  padding: 0 40px; height: 64px;
  display: flex; align-items: center; justify-content: space-between;
}
.nav-logo {
  font-weight: 800; font-size: 1.2rem;
  color: var(--text); display: flex; align-items: center; gap: 8px;
  cursor: pointer; text-decoration: none;
}
.nav-logo-icon {
  width: 32px; height: 32px; background: var(--red);
  border-radius: 8px; display: flex; align-items: center;
  justify-content: center; font-size: 16px; color: white;
}
.nav-logo span { color: var(--red); }
.nav-center { display: flex; align-items: center; gap: 2px; }
.nav-link {
  padding: 8px 16px; border-radius: 8px; font-size: 0.85rem;
  font-weight: 500; color: var(--muted2); cursor: pointer;
  transition: all 0.2s; border: none; background: none;
}
.nav-link:hover { color: var(--text); background: var(--bg3); }
.nav-link.active { color: var(--red); font-weight: 600; }
.nav-right { display: flex; gap: 8px; align-items: center; }
.btn-ghost {
  padding: 8px 16px; border-radius: 8px; font-size: 0.85rem;
  font-weight: 600; color: var(--text); cursor: pointer;
  border: 1px solid var(--border2); background: transparent;
  transition: all 0.2s; font-family: 'Plus Jakarta Sans', sans-serif;
}
.btn-ghost:hover { border-color: var(--red); color: var(--red); }
.btn-red {
  padding: 8px 20px; border-radius: 8px; font-size: 0.85rem;
  font-weight: 700; color: white; cursor: pointer;
  border: none; background: var(--red);
  transition: all 0.2s; font-family: 'Plus Jakarta Sans', sans-serif;
}
.btn-red:hover { background: var(--red2); transform: translateY(-1px); box-shadow: 0 4px 16px rgba(229,57,53,0.3); }
.hamburger { display: none; background: none; border: none; font-size: 1.3rem; cursor: pointer; color: var(--text); }

/* Mobile nav */
.mob-nav { display: none; background: white; border-bottom: 1px solid var(--border); padding: 12px 20px; }
.mob-nav.open { display: block; }
.mob-link { display: block; padding: 12px 0; font-size: 0.9rem; font-weight: 500; color: var(--text2); cursor: pointer; border-bottom: 1px solid var(--border); }
.mob-link:last-child { border: none; }

/* ===== PAGES ===== */
.page { display: none; }
.page.active { display: block; }

/* ===== HOME PAGE ===== */

/* Hero */
.hero {
  padding: 100px 40px 80px;
  max-width: 1100px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 60px; align-items: center;
}
.hero-left {}
.hero-tag {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--red-light); border: 1px solid var(--red-border);
  color: var(--red); padding: 6px 14px; border-radius: 20px;
  font-size: 0.72rem; font-weight: 700; margin-bottom: 24px;
  text-transform: uppercase; letter-spacing: 0.06em;
}
.hero-tag::before { content: '●'; animation: blink 2s infinite; font-size: 7px; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
h1 {
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 800; line-height: 1.1;
  letter-spacing: -0.03em; margin-bottom: 20px;
  color: var(--text);
}
h1 .red { color: var(--red); }
.hero-desc {
  font-size: 1rem; color: var(--muted2);
  line-height: 1.7; margin-bottom: 32px;
  font-weight: 400; max-width: 480px;
}
.hero-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 32px; }
.btn-lg {
  padding: 14px 28px; border-radius: 10px; font-size: 0.95rem;
  font-weight: 700; cursor: pointer; transition: all 0.2s;
  font-family: 'Plus Jakarta Sans', sans-serif;
  display: flex; align-items: center; gap: 8px;
}
.btn-lg-red { background: var(--red); color: white; border: none; }
.btn-lg-red:hover { background: var(--red2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(229,57,53,0.3); }
.btn-lg-outline { background: transparent; color: var(--text); border: 1.5px solid var(--border2); }
.btn-lg-outline:hover { border-color: var(--red); color: var(--red); }
.hero-trust { display: flex; align-items: center; gap: 12px; }
.trust-avatars { display: flex; }
.trust-avatar {
  width: 28px; height: 28px; border-radius: 50%;
  border: 2px solid white; margin-left: -8px; font-size: 12px;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; color: white;
}
.trust-avatar:first-child { margin-left: 0; }
.trust-text { font-size: 0.78rem; color: var(--muted2); }
.trust-text strong { color: var(--text); }

/* Hero right - demo card */
.hero-card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: 20px; overflow: hidden; box-shadow: var(--shadow2);
  position: relative;
}
.hero-card-header {
  padding: 16px 20px; border-bottom: 1px solid var(--border);
  display: flex; align-items: center; gap: 10px;
  background: var(--bg2);
}
.hero-card-dots { display: flex; gap: 6px; }
.dot { width: 10px; height: 10px; border-radius: 50%; }
.dot-r { background: #ff5f56; }
.dot-y { background: #febc2e; }
.dot-g { background: #28c840; }
.hero-card-title { font-size: 0.78rem; font-weight: 600; color: var(--muted2); margin-left: 4px; }
.demo-upload {
  margin: 20px; border: 2px dashed var(--border2); border-radius: 12px;
  padding: 32px 16px; text-align: center; background: var(--bg3);
  cursor: pointer; transition: all 0.3s; position: relative;
}
.demo-upload:hover { border-color: var(--red); background: var(--red-light); }
.demo-upload input { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }
.demo-icon {
  width: 44px; height: 44px; background: white; border: 1px solid var(--border);
  border-radius: 10px; display: flex; align-items: center; justify-content: center;
  margin: 0 auto 10px; font-size: 20px; box-shadow: var(--shadow);
}
.demo-upload h4 { font-size: 0.85rem; font-weight: 700; margin-bottom: 4px; }
.demo-upload p { font-size: 0.72rem; color: var(--muted); }
.demo-result {
  margin: 0 20px 20px; background: var(--bg3); border: 1px solid var(--border);
  border-radius: 10px; padding: 14px; font-size: 0.78rem;
  color: var(--muted2); line-height: 1.6;
}
.demo-result-label {
  font-size: 0.65rem; font-weight: 700; color: var(--red);
  text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px;
}
.demo-preview { margin: 0 20px 16px; border-radius: 10px; overflow: hidden; border: 1px solid var(--border); display: none; max-height: 160px; }
.demo-preview.show { display: block; }
.demo-preview img { width: 100%; max-height: 160px; object-fit: cover; }
.demo-gen-btn {
  margin: 0 20px 20px; width: calc(100% - 40px); padding: 12px;
  background: var(--red); color: white; border: none; border-radius: 10px;
  font-weight: 700; font-size: 0.88rem; cursor: pointer; transition: all 0.2s;
  font-family: 'Plus Jakarta Sans', sans-serif; display: flex; align-items: center; justify-content: center; gap: 6px;
}
.demo-gen-btn:hover:not(:disabled) { background: var(--red2); }
.demo-gen-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.demo-err { margin: 0 20px 12px; font-size: 0.75rem; color: var(--red); display: none; }
.demo-err.show { display: block; }

/* Stats bar */
.stats-bar {
  background: var(--text); padding: 20px 40px;
  display: flex; justify-content: center; gap: 0;
}
.stat-item {
  padding: 8px 40px; text-align: center;
  border-right: 1px solid rgba(255,255,255,0.1);
}
.stat-item:last-child { border: none; }
.stat-num { font-size: 1.4rem; font-weight: 800; color: white; }
.stat-num span { color: var(--red); }
.stat-lbl { font-size: 0.72rem; color: rgba(255,255,255,0.5); margin-top: 2px; }

/* Tools section */
.section { max-width: 1100px; margin: 0 auto; padding: 80px 40px; }
.section-head { text-align: center; margin-bottom: 48px; }
.section-tag {
  display: inline-block; background: var(--red-light); color: var(--red);
  padding: 4px 12px; border-radius: 20px; font-size: 0.72rem;
  font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;
  margin-bottom: 12px;
}
.section-title { font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 800; letter-spacing: -0.02em; margin-bottom: 10px; }
.section-sub { font-size: 0.95rem; color: var(--muted2); max-width: 500px; margin: 0 auto; }

.tools-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.tool-card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: 16px; padding: 24px; cursor: pointer;
  transition: all 0.25s; position: relative; overflow: hidden;
}
.tool-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0;
  height: 3px; background: var(--red); transform: scaleX(0);
  transition: transform 0.25s; transform-origin: left;
}
.tool-card:hover { border-color: rgba(229,57,53,0.3); box-shadow: var(--shadow2); transform: translateY(-3px); }
.tool-card:hover::before { transform: scaleX(1); }
.tool-icon-wrap {
  width: 48px; height: 48px; border-radius: 12px;
  background: var(--red-light); border: 1px solid var(--red-border);
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; margin-bottom: 16px;
}
.tool-name { font-size: 1rem; font-weight: 700; margin-bottom: 6px; }
.tool-desc { font-size: 0.82rem; color: var(--muted2); line-height: 1.5; margin-bottom: 14px; }
.tool-tag {
  display: inline-block; padding: 3px 10px; border-radius: 6px;
  font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
}
.tag-free { background: rgba(46,125,50,0.1); color: #2e7d32; }
.tag-pro { background: var(--red-light); color: var(--red); }
.tag-soon { background: var(--bg3); color: var(--muted); }

/* How it works */
.how-section { background: var(--bg2); padding: 80px 40px; }
.how-inner { max-width: 1100px; margin: 0 auto; }
.steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-top: 48px; }
.step-card { text-align: center; padding: 32px 24px; }
.step-num {
  width: 48px; height: 48px; border-radius: 50%; background: var(--red);
  color: white; font-weight: 800; font-size: 1.1rem;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 20px;
}
.step-icon { font-size: 2rem; margin-bottom: 16px; }
.step-title { font-size: 1rem; font-weight: 700; margin-bottom: 8px; }
.step-desc { font-size: 0.85rem; color: var(--muted2); line-height: 1.6; }
.step-arrow { display: flex; align-items: center; justify-content: center; padding-top: 32px; font-size: 1.5rem; color: var(--muted); }

/* Use cases */
.use-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.use-card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: 16px; padding: 28px; display: flex; gap: 16px;
  transition: all 0.2s;
}
.use-card:hover { border-color: rgba(229,57,53,0.3); box-shadow: var(--shadow); }
.use-icon { font-size: 2rem; flex-shrink: 0; }
.use-title { font-size: 0.95rem; font-weight: 700; margin-bottom: 6px; }
.use-desc { font-size: 0.82rem; color: var(--muted2); line-height: 1.5; }

/* Reviews */
.reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.review-card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: 16px; padding: 24px; transition: all 0.2s;
}
.review-card:hover { box-shadow: var(--shadow); }
.review-stars { color: #f59e0b; font-size: 0.85rem; margin-bottom: 12px; letter-spacing: 2px; }
.review-text { font-size: 0.85rem; color: var(--muted2); line-height: 1.7; margin-bottom: 16px; font-style: italic; }
.review-author { display: flex; align-items: center; gap: 10px; }
.review-av {
  width: 36px; height: 36px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 14px; color: white; flex-shrink: 0;
}
.review-name { font-size: 0.82rem; font-weight: 700; }
.review-role { font-size: 0.72rem; color: var(--muted); }

/* CTA Banner */
.cta-banner {
  background: var(--text); margin: 0;
  padding: 80px 40px; text-align: center;
}
.cta-banner h2 { font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 800; color: white; margin-bottom: 12px; letter-spacing: -0.02em; }
.cta-banner h2 span { color: var(--red); }
.cta-banner p { color: rgba(255,255,255,0.6); font-size: 0.95rem; margin-bottom: 32px; }
.cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.btn-white { padding: 14px 28px; background: white; color: var(--text); border: none; border-radius: 10px; font-weight: 700; font-size: 0.95rem; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; transition: all 0.2s; }
.btn-white:hover { background: var(--bg3); transform: translateY(-1px); }
.btn-outline-w { padding: 14px 28px; background: transparent; color: white; border: 1.5px solid rgba(255,255,255,0.3); border-radius: 10px; font-weight: 600; font-size: 0.95rem; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; transition: all 0.2s; }
.btn-outline-w:hover { border-color: white; }

/* ===== TOOL PAGES ===== */
.tool-page { max-width: 800px; margin: 0 auto; padding: 60px 24px 80px; }
.tool-page-head { margin-bottom: 32px; }
.tool-page-tag { display: inline-block; background: var(--red-light); color: var(--red); padding: 4px 12px; border-radius: 6px; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px; }
.tool-page-title { font-size: 1.8rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 6px; }
.tool-page-sub { font-size: 0.9rem; color: var(--muted2); }
.tool-main-card { background: white; border: 1px solid var(--border); border-radius: 20px; overflow: hidden; box-shadow: var(--shadow); }

/* Upload zone */
.upload-zone {
  margin: 24px; border: 2px dashed var(--border2);
  border-radius: 14px; padding: 56px 16px; text-align: center;
  cursor: pointer; background: var(--bg3); transition: all 0.3s; position: relative;
}
.upload-zone:hover, .upload-zone.over { border-color: var(--red); background: var(--red-light); }
.upload-zone input { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }
.uz-icon { width: 56px; height: 56px; background: white; border: 1px solid var(--border); border-radius: 14px; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; font-size: 24px; box-shadow: var(--shadow); }
.uz-title { font-size: 0.95rem; font-weight: 700; margin-bottom: 4px; }
.uz-sub { font-size: 0.78rem; color: var(--muted); }

/* Preview */
.img-preview { margin: 0 24px 24px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); max-height: 280px; display: none; align-items: center; justify-content: center; background: var(--bg3); }
.img-preview.show { display: flex; }
.img-preview img { max-width: 100%; max-height: 280px; object-fit: contain; }

/* Counter */
.usage-bar { margin: 0 24px 16px; background: var(--bg3); border: 1px solid var(--border); border-radius: 10px; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; }
.usage-text { font-size: 0.8rem; color: var(--muted2); }
.usage-text strong { color: var(--red); font-weight: 700; }
.upgrade-lnk { font-size: 0.78rem; color: var(--red); font-weight: 600; cursor: pointer; }
.upgrade-lnk:hover { text-decoration: underline; }

/* Divider */
.card-div { height: 1px; background: var(--border); margin: 0 24px; }

/* Gen btn */
.gen-wrap { padding: 20px 24px; }
.gen-btn {
  width: 100%; padding: 15px; background: var(--red); color: white;
  border: none; border-radius: 10px; font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: all 0.2s;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.gen-btn:hover:not(:disabled) { background: var(--red2); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(229,57,53,0.3); }
.gen-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; box-shadow: none; }
@keyframes spin { to { transform: rotate(360deg); } }
.spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite; }

/* Result */
.result-sec { border-top: 1px solid var(--border); padding: 24px; display: none; }
.result-sec.show { display: block; animation: up 0.35s ease; }
@keyframes up { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform:translateY(0); } }
.result-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.result-lbl { font-size: 0.82rem; font-weight: 700; display: flex; align-items: center; gap: 7px; }
.result-lbl::before { content: ''; width: 8px; height: 8px; background: var(--red); border-radius: 50%; display: inline-block; }
.copy-b { background: var(--bg3); border: 1px solid var(--border2); color: var(--muted2); padding: 6px 12px; border-radius: 7px; font-size: 0.75rem; cursor: pointer; transition: all 0.2s; font-family: 'Plus Jakarta Sans', sans-serif; }
.copy-b:hover { background: var(--red); color: white; border-color: var(--red); }
.result-box { background: var(--bg3); border: 1px solid var(--border); border-radius: 10px; padding: 18px; font-size: 0.88rem; line-height: 1.7; color: var(--text2); }

/* Error */
.err { margin: 0 24px 12px; background: rgba(229,57,53,0.06); border: 1px solid var(--red-border); border-radius: 8px; padding: 12px 16px; color: var(--red); font-size: 0.82rem; display: none; }
.err.show { display: block; }

/* Text area */
.ta-wrap { padding: 24px 24px 0; }
textarea.prompt-ta {
  width: 100%; background: var(--bg3); border: 1px solid var(--border2);
  border-radius: 10px; padding: 16px; color: var(--text); font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.88rem; resize: vertical; min-height: 120px;
  outline: none; transition: border-color 0.2s; line-height: 1.6;
}
textarea.prompt-ta:focus { border-color: var(--red); }
textarea.prompt-ta::placeholder { color: var(--muted); }
.style-pills { display: flex; flex-wrap: wrap; gap: 8px; padding: 16px 24px 0; }
.pill {
  padding: 7px 16px; border-radius: 20px; font-size: 0.78rem; font-weight: 600;
  cursor: pointer; transition: all 0.2s; border: 1.5px solid var(--border2);
  background: transparent; color: var(--muted2); font-family: 'Plus Jakarta Sans', sans-serif;
}
.pill.active, .pill:hover { border-color: var(--red); color: var(--red); background: var(--red-light); }

/* ===== PRICING PAGE ===== */
.pricing-page { max-width: 1100px; margin: 0 auto; padding: 72px 40px 80px; }
.pricing-head { text-align: center; margin-bottom: 56px; }
.pricing-toggle { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 20px; font-size: 0.85rem; color: var(--muted2); }
.toggle-btn {
  width: 44px; height: 24px; background: var(--red); border-radius: 12px;
  cursor: pointer; border: none; position: relative; transition: background 0.2s;
}
.toggle-knob { position: absolute; top: 2px; right: 2px; width: 20px; height: 20px; background: white; border-radius: 50%; transition: transform 0.2s; }
.save-badge { background: var(--red-light); color: var(--red); padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 700; }

.plans-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.plan {
  background: white; border: 1.5px solid var(--border);
  border-radius: 20px; padding: 32px; position: relative; transition: all 0.2s;
}
.plan:hover { transform: translateY(-4px); box-shadow: var(--shadow2); }
.plan.popular { border-color: var(--red); }
.plan-badge {
  position: absolute; top: -13px; left: 50%; transform: translateX(-50%);
  background: var(--red); color: white; padding: 4px 16px; border-radius: 20px;
  font-size: 0.7rem; font-weight: 700; white-space: nowrap;
}
.plan-name { font-size: 0.82rem; font-weight: 700; color: var(--muted2); text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 12px; }
.plan-price { font-size: 2.8rem; font-weight: 800; letter-spacing: -0.04em; line-height: 1; }
.plan-price sup { font-size: 1.2rem; vertical-align: top; margin-top: 8px; font-weight: 600; }
.plan-price sub { font-size: 0.9rem; font-weight: 400; color: var(--muted2); }
.plan-desc { font-size: 0.8rem; color: var(--muted2); margin: 8px 0 24px; }
.plan-btn {
  width: 100%; padding: 12px; border-radius: 10px; font-size: 0.88rem;
  font-weight: 700; cursor: pointer; transition: all 0.2s; margin-bottom: 24px;
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.plan-btn-free { background: var(--bg3); color: var(--text); border: 1.5px solid var(--border2); }
.plan-btn-free:hover { border-color: var(--red); color: var(--red); }
.plan-btn-red { background: var(--red); color: white; border: none; }
.plan-btn-red:hover { background: var(--red2); }
.plan-btn-dark { background: var(--text); color: white; border: none; }
.plan-btn-dark:hover { opacity: 0.85; }
.plan-sep { height: 1px; background: var(--border); margin-bottom: 20px; }
.feat { display: flex; align-items: flex-start; gap: 10px; font-size: 0.82rem; color: var(--text2); margin-bottom: 10px; line-height: 1.4; }
.feat-check { color: #2e7d32; font-weight: 700; flex-shrink: 0; margin-top: 1px; }
.feat-x { color: var(--muted); flex-shrink: 0; margin-top: 1px; }
.feat.off { color: var(--muted); }

/* FAQ */
.faq-wrap { max-width: 680px; margin: 64px auto 0; }
.faq-title-sec { text-align: center; font-size: 1.6rem; font-weight: 800; margin-bottom: 32px; letter-spacing: -0.02em; }
.faq-item { border: 1px solid var(--border); border-radius: 12px; margin-bottom: 10px; overflow: hidden; }
.faq-q { padding: 18px 20px; cursor: pointer; font-size: 0.88rem; font-weight: 600; display: flex; justify-content: space-between; align-items: center; transition: background 0.2s; gap: 12px; }
.faq-q:hover { background: var(--bg2); }
.faq-arrow { color: var(--muted); transition: transform 0.3s; flex-shrink: 0; }
.faq-arrow.open { transform: rotate(180deg); color: var(--red); }
.faq-a { font-size: 0.82rem; color: var(--muted2); line-height: 1.7; max-height: 0; overflow: hidden; transition: all 0.3s; padding: 0 20px; }
.faq-a.open { padding: 0 20px 16px; max-height: 300px; }

/* ===== AUTH PAGE ===== */
.auth-wrap { max-width: 440px; margin: 60px auto; padding: 0 24px 80px; }
.auth-card { background: white; border: 1px solid var(--border); border-radius: 20px; padding: 36px; box-shadow: var(--shadow); }
.auth-logo { text-align: center; font-size: 1.1rem; font-weight: 800; margin-bottom: 8px; }
.auth-logo span { color: var(--red); }
.auth-title { text-align: center; font-size: 1.4rem; font-weight: 800; margin-bottom: 4px; }
.auth-sub { text-align: center; font-size: 0.82rem; color: var(--muted2); margin-bottom: 24px; }
.auth-tabs { display: flex; background: var(--bg3); border-radius: 10px; padding: 3px; margin-bottom: 24px; }
.auth-tab { flex: 1; padding: 9px; border-radius: 8px; font-size: 0.82rem; font-weight: 600; border: none; cursor: pointer; transition: all 0.2s; background: transparent; color: var(--muted2); font-family: 'Plus Jakarta Sans', sans-serif; }
.auth-tab.active { background: white; color: var(--text); box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
.google-btn {
  width: 100%; padding: 11px; background: white; border: 1.5px solid var(--border2);
  border-radius: 10px; color: var(--text); font-size: 0.88rem; font-weight: 600;
  cursor: pointer; transition: all 0.2s; display: flex; align-items: center;
  justify-content: center; gap: 8px; font-family: 'Plus Jakarta Sans', sans-serif;
}
.google-btn:hover { border-color: var(--red); }
.auth-div { text-align: center; color: var(--muted); font-size: 0.75rem; margin: 16px 0; position: relative; }
.auth-div::before, .auth-div::after { content: ''; position: absolute; top: 50%; width: calc(50% - 20px); height: 1px; background: var(--border); }
.auth-div::before { left: 0; }
.auth-div::after { right: 0; }
.form-group { margin-bottom: 14px; }
label { font-size: 0.78rem; font-weight: 600; color: var(--muted2); display: block; margin-bottom: 5px; }
input.form-inp {
  width: 100%; background: var(--bg3); border: 1.5px solid var(--border2);
  border-radius: 8px; padding: 11px 14px; color: var(--text);
  font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.88rem; outline: none; transition: border-color 0.2s;
}
input.form-inp:focus { border-color: var(--red); background: white; }
.form-btn {
  width: 100%; padding: 13px; background: var(--red); color: white; border: none;
  border-radius: 10px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.92rem;
  font-weight: 700; cursor: pointer; transition: all 0.2s; margin-top: 6px;
}
.form-btn:hover { background: var(--red2); }

/* ===== FOOTER ===== */
footer { background: var(--text); padding: 60px 40px 32px; }
.footer-inner { max-width: 1100px; margin: 0 auto; }
.footer-top { display: grid; grid-template-columns: 2.5fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px; }
.footer-brand-logo { font-size: 1.1rem; font-weight: 800; color: white; margin-bottom: 12px; }
.footer-brand-logo span { color: var(--red); }
.footer-brand-desc { font-size: 0.8rem; color: rgba(255,255,255,0.4); line-height: 1.7; max-width: 260px; }
.footer-col h4 { font-size: 0.72rem; font-weight: 700; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 16px; }
.f-link { display: block; font-size: 0.8rem; color: rgba(255,255,255,0.6); margin-bottom: 10px; cursor: pointer; transition: color 0.2s; text-decoration: none; }
.f-link:hover { color: white; }
.footer-bottom { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
.footer-copy { font-size: 0.75rem; color: rgba(255,255,255,0.3); }
.footer-copy a { color: rgba(255,255,255,0.5); }
.footer-links-b { display: flex; gap: 20px; }
.footer-links-b a { font-size: 0.75rem; color: rgba(255,255,255,0.4); text-decoration: none; transition: color 0.2s; }
.footer-links-b a:hover { color: white; }

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  nav { padding: 0 20px; }
  .nav-center { display: none; }
  .hamburger { display: block; }
  .hero { grid-template-columns: 1fr; padding: 60px 20px 48px; gap: 40px; }
  .hero-card { max-width: 480px; margin: 0 auto; }
  .stats-bar { flex-wrap: wrap; gap: 0; padding: 20px; }
  .stat-item { padding: 12px 20px; width: 50%; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); }
  .stat-item:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.1); }
  .section { padding: 56px 20px; }
  .tools-grid { grid-template-columns: repeat(2, 1fr); }
  .steps-grid { grid-template-columns: 1fr; }
  .use-grid { grid-template-columns: 1fr; }
  .reviews-grid { grid-template-columns: repeat(2, 1fr); }
  .plans-grid { grid-template-columns: 1fr; max-width: 400px; margin: 0 auto; }
  .footer-top { grid-template-columns: 1fr 1fr; gap: 32px; }
  .pricing-page { padding: 56px 20px 60px; }
  .how-section { padding: 56px 20px; }
}
@media (max-width: 600px) {
  .tools-grid { grid-template-columns: 1fr; }
  .reviews-grid { grid-template-columns: 1fr; }
  .footer-top { grid-template-columns: 1fr; }
  .cta-banner { padding: 56px 20px; }
  .hero-btns { flex-direction: column; }
  .btn-lg { justify-content: center; }
}
</style>
</head>
<body>

<!-- NAV -->
<nav>
  <a class="nav-logo" onclick="goPage('home')">
    <div class="nav-logo-icon">👁</div>
    Img2<span>Prompt</span>
  </a>
  <div class="nav-center">
    <button class="nav-link" onclick="goPage('img2prompt')">Image to Prompt</button>
    <button class="nav-link" onclick="goPage('text2img')">Text to Image</button>
    <button class="nav-link" onclick="goPage('pricing')">Pricing</button>
    <button class="nav-link" onclick="goPage('api')">API</button>
  </div>
  <div class="nav-right">
    <button class="btn-ghost" onclick="goPage('login')" id="loginBtnNav">Sign In</button>
    <button class="btn-red" onclick="goPage('login')" id="ctaBtnNav">Start Free</button>
    <button class="hamburger" onclick="toggleMob()">☰</button>
  </div>
</nav>
<div class="mob-nav" id="mobNav">
  <div class="mob-link" onclick="goPage('img2prompt');toggleMob()">🖼 Image to Prompt</div>
  <div class="mob-link" onclick="goPage('text2img');toggleMob()">✨ Text to Image</div>
  <div class="mob-link" onclick="goPage('pricing');toggleMob()">💰 Pricing</div>
  <div class="mob-link" onclick="goPage('api');toggleMob()">⚡ API</div>
  <div class="mob-link" onclick="goPage('login');toggleMob()">🔐 Sign In / Sign Up</div>
</div>

<!-- ============ HOME PAGE ============ -->
<div id="page-home" class="page active">

  <!-- Hero -->
  <section class="hero">
    <div class="hero-left">
      <div class="hero-tag">✦ Powered by LLaVA AI</div>
      <h1>Turn Any Image Into a Perfect <span class="red">AI Prompt</span></h1>
      <p class="hero-desc">Upload any image and get detailed, creative prompts for Midjourney, Stable Diffusion, DALL-E, and more. Free to use — no account required.</p>
      <div class="hero-btns">
        <button class="btn-lg btn-lg-red" onclick="goPage('img2prompt')">🖼 Try for Free</button>
        <button class="btn-lg btn-lg-outline" onclick="goPage('pricing')">See Pricing →</button>
      </div>
      <div class="hero-trust">
        <div class="trust-avatars">
          <div class="trust-avatar" style="background:#e53935">S</div>
          <div class="trust-avatar" style="background:#1565c0">M</div>
          <div class="trust-avatar" style="background:#2e7d32">A</div>
          <div class="trust-avatar" style="background:#6a1b9a">J</div>
          <div class="trust-avatar" style="background:#e65100">K</div>
        </div>
        <div class="trust-text"><strong>12,000+</strong> creators use Img2Prompt daily</div>
      </div>
    </div>
    <div class="hero-card">
      <div class="hero-card-header">
        <div class="hero-card-dots">
          <div class="dot dot-r"></div><div class="dot dot-y"></div><div class="dot dot-g"></div>
        </div>
        <div class="hero-card-title">img2prompt.com — Image to Prompt</div>
      </div>
      <div class="demo-upload" id="heroDz">
        <input type="file" accept="image/*" onchange="heroHandleFile(this.files[0])">
        <div class="demo-icon">📁</div>
        <h4>Drop your image here</h4>
        <p>PNG, JPG, WEBP — up to 4MB</p>
      </div>
      <div class="demo-preview" id="heroPrev">
        <img id="heroPrevImg" src="" alt="">
      </div>
      <div class="demo-err" id="heroErr"></div>
      <button class="demo-gen-btn" id="heroGenBtn" onclick="heroGenerate()" disabled>
        <span id="heroIcon">✨</span> <span id="heroTxt">Generate Prompt</span>
      </button>
      <div class="demo-result" id="heroResult" style="display:none">
        <div class="demo-result-label">✦ Generated Prompt</div>
        <div id="heroResultTxt"></div>
      </div>
    </div>
  </section>

  <!-- Stats -->
  <div class="stats-bar">
    <div class="stat-item"><div class="stat-num">50<span>K+</span></div><div class="stat-lbl">Images Analyzed</div></div>
    <div class="stat-item"><div class="stat-num">12<span>K+</span></div><div class="stat-lbl">Active Users</div></div>
    <div class="stat-item"><div class="stat-num">4.9<span>★</span></div><div class="stat-lbl">Average Rating</div></div>
    <div class="stat-item"><div class="stat-num"><span>$</span>0</div><div class="stat-lbl">To Get Started</div></div>
  </div>

  <!-- Tools -->
  <section class="section">
    <div class="section-head">
      <div class="section-tag">All Tools</div>
      <h2 class="section-title">Everything You Need for AI Images</h2>
      <p class="section-sub">A complete suite of AI tools for creators, designers, and developers.</p>
    </div>
    <div class="tools-grid">
      <div class="tool-card" onclick="goPage('img2prompt')">
        <div class="tool-icon-wrap">🖼</div>
        <div class="tool-name">Image to Prompt</div>
        <div class="tool-desc">Upload any image and get a detailed AI-generated description and prompt in seconds.</div>
        <span class="tool-tag tag-free">Free</span>
      </div>
      <div class="tool-card" onclick="goPage('text2img')">
        <div class="tool-icon-wrap">✨</div>
        <div class="tool-name">Text to Image</div>
        <div class="tool-desc">Generate stunning, high-quality images from your text descriptions using AI.</div>
        <span class="tool-tag tag-pro">Pro</span>
      </div>
      <div class="tool-card" onclick="showSoon()">
        <div class="tool-icon-wrap">📦</div>
        <div class="tool-name">Batch Processing</div>
        <div class="tool-desc">Analyze multiple images at once. Export results as CSV or JSON in bulk.</div>
        <span class="tool-tag tag-pro">Pro</span>
      </div>
      <div class="tool-card" onclick="goPage('api')">
        <div class="tool-icon-wrap">⚡</div>
        <div class="tool-name">API Access</div>
        <div class="tool-desc">Integrate Img2Prompt into your apps with our simple REST API and SDKs.</div>
        <span class="tool-tag tag-pro">Business</span>
      </div>
      <div class="tool-card" onclick="showSoon()">
        <div class="tool-icon-wrap">🌍</div>
        <div class="tool-name">Translate Prompt</div>
        <div class="tool-desc">Translate and localize your AI prompts into 50+ languages instantly.</div>
        <span class="tool-tag tag-free">Free</span>
      </div>
      <div class="tool-card" onclick="showSoon()">
        <div class="tool-icon-wrap">🎬</div>
        <div class="tool-name">Video Prompt</div>
        <div class="tool-desc">Generate optimized prompts for AI video generation tools like Sora and Runway.</div>
        <span class="tool-tag tag-soon">Coming Soon</span>
      </div>
    </div>
  </section>

  <!-- How it works -->
  <div class="how-section">
    <div class="how-inner">
      <div class="section-head">
        <div class="section-tag">How It Works</div>
        <h2 class="section-title">3 Simple Steps</h2>
        <p class="section-sub">Get perfect AI prompts from any image in under 10 seconds.</p>
      </div>
      <div class="steps-grid">
        <div class="step-card">
          <div class="step-icon">📁</div>
          <div class="step-num">1</div>
          <div class="step-title">Upload Your Image</div>
          <div class="step-desc">Drag & drop or click to upload any PNG, JPG, or WEBP image up to 4MB. No account needed.</div>
        </div>
        <div class="step-card">
          <div class="step-icon">🤖</div>
          <div class="step-num">2</div>
          <div class="step-title">AI Analyzes It</div>
          <div class="step-desc">Our LLaVA AI model analyzes every detail — colors, objects, style, mood, and composition.</div>
        </div>
        <div class="step-card">
          <div class="step-icon">📋</div>
          <div class="step-num">3</div>
          <div class="step-title">Copy Your Prompt</div>
          <div class="step-desc">Get a detailed, ready-to-use prompt. Copy it and paste it into Midjourney, DALL-E, or any AI tool.</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Use cases -->
  <section class="section">
    <div class="section-head">
      <div class="section-tag">Use Cases</div>
      <h2 class="section-title">Who Uses Img2Prompt?</h2>
      <p class="section-sub">Trusted by creators, designers, and developers worldwide.</p>
    </div>
    <div class="use-grid">
      <div class="use-card">
        <div class="use-icon">🎨</div>
        <div><div class="use-title">AI Artists & Designers</div><div class="use-desc">Recreate styles from reference images. Get the exact prompt that matches your visual inspiration for Midjourney or Stable Diffusion.</div></div>
      </div>
      <div class="use-card">
        <div class="use-icon">📱</div>
        <div><div class="use-title">Content Creators</div><div class="use-desc">Generate consistent visual content at scale. Describe your brand's style once, then reproduce it across all your content.</div></div>
      </div>
      <div class="use-card">
        <div class="use-icon">💻</div>
        <div><div class="use-title">Developers & Teams</div><div class="use-desc">Use our API to build image analysis into your apps. Process thousands of images automatically with our Business plan.</div></div>
      </div>
      <div class="use-card">
        <div class="use-icon">🏢</div>
        <div><div class="use-title">Marketing Teams</div><div class="use-desc">Analyze competitor visuals, maintain brand consistency, and generate on-brand AI images at scale for campaigns.</div></div>
      </div>
    </div>
  </section>

  <!-- Reviews -->
  <section class="section" style="padding-top:0">
    <div class="section-head">
      <div class="section-tag">Reviews</div>
      <h2 class="section-title">Loved by 12,000+ Users</h2>
      <p class="section-sub">See what creators are saying about Img2Prompt.</p>
    </div>
    <div class="reviews-grid">
      <div class="review-card">
        <div class="review-stars">★★★★★</div>
        <div class="review-text">"This completely changed my Midjourney workflow. I upload a reference and get a perfect prompt in seconds. Saved me hours every week."</div>
        <div class="review-author"><div class="review-av" style="background:#e53935">S</div><div><div class="review-name">Sarah K.</div><div class="review-role">AI Artist · New York</div></div></div>
      </div>
      <div class="review-card">
        <div class="review-stars">★★★★★</div>
        <div class="review-text">"Finally a tool that works reliably. The prompts are incredibly detailed and accurate. I use Pro plan every day for client projects."</div>
        <div class="review-author"><div class="review-av" style="background:#1565c0">M</div><div><div class="review-name">Marcus T.</div><div class="review-role">Graphic Designer · London</div></div></div>
      </div>
      <div class="review-card">
        <div class="review-stars">★★★★★</div>
        <div class="review-text">"The API is super clean and well-documented. Integrated it in 20 minutes. Batch processing alone is worth the Business plan."</div>
        <div class="review-author"><div class="review-av" style="background:#2e7d32">A</div><div><div class="review-name">Aisha R.</div><div class="review-role">Developer · Dubai</div></div></div>
      </div>
      <div class="review-card">
        <div class="review-stars">★★★★★</div>
        <div class="review-text">"Our entire marketing team uses this. We went from spending 3 hours on image briefs to 15 minutes. ROI on the Business plan is insane."</div>
        <div class="review-author"><div class="review-av" style="background:#6a1b9a">J</div><div><div class="review-name">James L.</div><div class="review-role">Marketing Director · Berlin</div></div></div>
      </div>
      <div class="review-card">
        <div class="review-stars">★★★★★</div>
        <div class="review-text">"Tried 5 different tools. Nothing comes close to the quality here. The descriptions are so detailed I can recreate any image style perfectly."</div>
        <div class="review-author"><div class="review-av" style="background:#e65100">N</div><div><div class="review-name">Nina P.</div><div class="review-role">Photographer · Paris</div></div></div>
      </div>
      <div class="review-card">
        <div class="review-stars">★★★★★</div>
        <div class="review-text">"Free tier is extremely generous. 5 images/day is plenty to get started. Upgraded to Pro after 2 days because I loved it so much."</div>
        <div class="review-author"><div class="review-av" style="background:#00838f">K</div><div><div class="review-name">Kevin M.</div><div class="review-role">Student · Toronto</div></div></div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <div class="cta-banner">
    <h2>Start Generating <span>Perfect Prompts</span> Today</h2>
    <p>Join 12,000+ creators. No credit card required. Free forever.</p>
    <div class="cta-btns">
      <button class="btn-white" onclick="goPage('img2prompt')">🖼 Try for Free</button>
      <button class="btn-outline-w" onclick="goPage('pricing')">See Pricing</button>
    </div>
  </div>

</div><!-- /HOME -->

<!-- ============ IMAGE TO PROMPT ============ -->
<div id="page-img2prompt" class="page">
  <div class="tool-page">
    <div class="tool-page-head">
      <div class="tool-page-tag">Free Tool</div>
      <h1 class="tool-page-title">🖼 Image to Prompt Generator</h1>
      <p class="tool-page-sub">Upload any image and get a detailed AI-generated prompt in seconds. Works with Midjourney, Stable Diffusion, DALL-E, and more.</p>
    </div>
    <div class="tool-main-card">
      <div class="upload-zone" id="mainDz">
        <input type="file" accept="image/*" id="mainFi" onchange="mainHandleFile(this.files[0])">
        <div class="uz-icon">📁</div>
        <div class="uz-title">Upload your image</div>
        <div class="uz-sub">Drag & drop or click to browse · PNG, JPG, WEBP up to 4MB</div>
      </div>
      <div class="img-preview" id="mainPrev"><img id="mainPrevImg" src="" alt=""></div>
      <div class="usage-bar">
        <span class="usage-text">Free uses today: <strong id="usageCount">5</strong> / 5</span>
        <span class="upgrade-lnk" onclick="goPage('pricing')">Upgrade for unlimited ↗</span>
      </div>
      <div class="err" id="mainErr"></div>
      <div class="card-div"></div>
      <div class="gen-wrap">
        <button class="gen-btn" id="mainGenBtn" onclick="mainGenerate()" disabled>
          <span id="mainIcon">✨</span><span id="mainTxt">Generate Prompt</span>
        </button>
      </div>
      <div class="result-sec" id="mainResult">
        <div class="result-top">
          <span class="result-lbl">Generated Prompt</span>
          <button class="copy-b" onclick="copyMain()">📋 Copy</button>
        </div>
        <div class="result-box" id="mainResultTxt"></div>
      </div>
    </div>
  </div>
</div>

<!-- ============ TEXT TO IMAGE ============ -->
<div id="page-text2img" class="page">
  <div class="tool-page">
    <div class="tool-page-head">
      <div class="tool-page-tag" style="background:rgba(229,57,53,0.1);color:var(--red)">Pro Feature</div>
      <h1 class="tool-page-title">✨ Text to Image Generator</h1>
      <p class="tool-page-sub">Describe your vision and let AI create stunning images. Powered by Cloudflare's AI image generation.</p>
    </div>
    <div class="tool-main-card">
      <div class="ta-wrap">
        <textarea class="prompt-ta" id="t2iPrompt" placeholder="A majestic lion standing on a rocky cliff at golden hour, dramatic storm clouds, cinematic lighting, ultra-realistic, 8K photography..."></textarea>
      </div>
      <div style="padding:12px 24px 0;font-size:0.75rem;font-weight:700;color:var(--muted2);text-transform:uppercase;letter-spacing:0.06em">Style</div>
      <div class="style-pills">
        <button class="pill active" onclick="pickStyle(this)">Realistic</button>
        <button class="pill" onclick="pickStyle(this)">Anime</button>
        <button class="pill" onclick="pickStyle(this)">Oil Painting</button>
        <button class="pill" onclick="pickStyle(this)">Digital Art</button>
        <button class="pill" onclick="pickStyle(this)">Watercolor</button>
        <button class="pill" onclick="pickStyle(this)">Sketch</button>
        <button class="pill" onclick="pickStyle(this)">3D Render</button>
        <button class="pill" onclick="pickStyle(this)">Cinematic</button>
      </div>
      <div class="err" id="t2iErr" style="margin-top:16px"></div>
      <div class="gen-wrap">
        <button class="gen-btn" onclick="t2iGen()">
          <span id="t2iIcon">🎨</span><span id="t2iTxt">Generate Image</span>
        </button>
      </div>
      <div style="padding:0 24px 20px;text-align:center;font-size:0.75rem;color:var(--muted)">
        ✦ Pro feature · <span style="color:var(--red);cursor:pointer;font-weight:600" onclick="goPage('pricing')">Upgrade to unlock unlimited generations</span>
      </div>
    </div>
  </div>
</div>

<!-- ============ API PAGE ============ -->
<div id="page-api" class="page">
  <div class="tool-page" style="max-width:900px">
    <div class="tool-page-head">
      <div class="tool-page-tag">Developer</div>
      <h1 class="tool-page-title">⚡ Img2Prompt API</h1>
      <p class="tool-page-sub">Integrate AI image analysis into your apps with our simple REST API. Process thousands of images programmatically.</p>
    </div>
    <div class="tool-main-card" style="padding:32px">
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:32px">
        <div style="background:var(--bg3);border-radius:12px;padding:20px;text-align:center">
          <div style="font-size:1.6rem;font-weight:800;color:var(--red)">99.9%</div>
          <div style="font-size:0.75rem;color:var(--muted2);margin-top:4px">Uptime SLA</div>
        </div>
        <div style="background:var(--bg3);border-radius:12px;padding:20px;text-align:center">
          <div style="font-size:1.6rem;font-weight:800;color:var(--red)">&lt;2s</div>
          <div style="font-size:0.75rem;color:var(--muted2);margin-top:4px">Response Time</div>
        </div>
        <div style="background:var(--bg3);border-radius:12px;padding:20px;text-align:center">
          <div style="font-size:1.6rem;font-weight:800;color:var(--red)">REST</div>
          <div style="font-size:0.75rem;color:var(--muted2);margin-top:4px">Simple API</div>
        </div>
      </div>
      <div style="font-size:0.82rem;font-weight:700;color:var(--muted2);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:12px">Quick Start</div>
      <div style="background:#1a1a2e;border-radius:12px;padding:20px;font-family:monospace;font-size:0.8rem;line-height:1.8;color:#e0e0e0;overflow-x:auto">
        <span style="color:#888">// POST https://img2prompt.com/api/analyze</span><br>
        <span style="color:#ff6b6b">fetch</span>(<span style="color:#a8ff78">'https://img2prompt.com/api/analyze'</span>, {<br>
        &nbsp;&nbsp;method: <span style="color:#a8ff78">'POST'</span>,<br>
        &nbsp;&nbsp;headers: {<br>
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#a8ff78">'Authorization'</span>: <span style="color:#a8ff78">'Bearer YOUR_API_KEY'</span>,<br>
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#a8ff78">'Content-Type'</span>: <span style="color:#a8ff78">'application/json'</span><br>
        &nbsp;&nbsp;},<br>
        &nbsp;&nbsp;body: <span style="color:#ff6b6b">JSON</span>.stringify({ image: <span style="color:#a8ff78">base64ImageData</span> })<br>
        })<br><br>
        <span style="color:#888">// Response:</span><br>
        { <span style="color:#a8ff78">"description"</span>: <span style="color:#a8ff78">"A stunning sunset over..."</span> }
      </div>
      <div style="margin-top:24px;text-align:center">
        <button class="btn-red" style="padding:13px 32px;font-size:0.92rem" onclick="goPage('pricing')">Get API Access →</button>
      </div>
    </div>
  </div>
</div>

<!-- ============ PRICING ============ -->
<div id="page-pricing" class="page">
  <div class="pricing-page">
    <div class="pricing-head">
      <div class="section-tag">Pricing</div>
      <h1 class="section-title" style="font-size:2.4rem">Simple, Transparent Pricing</h1>
      <p class="section-sub" style="font-size:1rem">Start free. Upgrade when you need more power. Cancel anytime.</p>
      <div class="pricing-toggle">
        <span>Monthly</span>
        <button class="toggle-btn"><div class="toggle-knob"></div></button>
        <span>Annual <span class="save-badge">Save 30%</span></span>
      </div>
    </div>
    <div class="plans-grid">
      <!-- FREE -->
      <div class="plan">
        <div class="plan-name">Free</div>
        <div class="plan-price"><sup>$</sup>0<sub>/mo</sub></div>
        <div class="plan-desc">Perfect for getting started</div>
        <button class="plan-btn plan-btn-free" onclick="goPage('img2prompt')">Get Started Free</button>
        <div class="plan-sep"></div>
        <div class="feat"><span class="feat-check">✓</span> 5 images per day</div>
        <div class="feat"><span class="feat-check">✓</span> Image to Prompt</div>
        <div class="feat"><span class="feat-check">✓</span> Copy to clipboard</div>
        <div class="feat"><span class="feat-check">✓</span> Basic descriptions</div>
        <div class="feat off"><span class="feat-x">✕</span> Text to Image</div>
        <div class="feat off"><span class="feat-x">✕</span> Batch Processing</div>
        <div class="feat off"><span class="feat-x">✕</span> API Access</div>
        <div class="feat off"><span class="feat-x">✕</span> Priority support</div>
      </div>
      <!-- PRO -->
      <div class="plan popular">
        <div class="plan-badge">⭐ Most Popular</div>
        <div class="plan-name">Pro</div>
        <div class="plan-price"><sup>$</sup>9<sub>/mo</sub></div>
        <div class="plan-desc">For serious creators</div>
        <button class="plan-btn plan-btn-red" onclick="goPage('login')">Start Pro →</button>
        <div class="plan-sep"></div>
        <div class="feat"><span class="feat-check">✓</span> 100 images per day</div>
        <div class="feat"><span class="feat-check">✓</span> Image to Prompt</div>
        <div class="feat"><span class="feat-check">✓</span> Text to Image</div>
        <div class="feat"><span class="feat-check">✓</span> Batch Processing (20 images)</div>
        <div class="feat"><span class="feat-check">✓</span> History & export</div>
        <div class="feat"><span class="feat-check">✓</span> Detailed descriptions</div>
        <div class="feat off"><span class="feat-x">✕</span> API Access</div>
        <div class="feat"><span class="feat-check">✓</span> Email support</div>
      </div>
      <!-- BUSINESS -->
      <div class="plan">
        <div class="plan-name">Business</div>
        <div class="plan-price"><sup>$</sup>29<sub>/mo</sub></div>
        <div class="plan-desc">For teams & developers</div>
        <button class="plan-btn plan-btn-dark" onclick="goPage('login')">Go Business →</button>
        <div class="plan-sep"></div>
        <div class="feat"><span class="feat-check">✓</span> Unlimited images</div>
        <div class="feat"><span class="feat-check">✓</span> All Pro features</div>
        <div class="feat"><span class="feat-check">✓</span> Full API Access</div>
        <div class="feat"><span class="feat-check">✓</span> Batch Processing (unlimited)</div>
        <div class="feat"><span class="feat-check">✓</span> Team collaboration</div>
        <div class="feat"><span class="feat-check">✓</span> Custom branding</div>
        <div class="feat"><span class="feat-check">✓</span> Analytics dashboard</div>
        <div class="feat"><span class="feat-check">✓</span> 24/7 priority support</div>
      </div>
    </div>
    <!-- FAQ -->
    <div class="faq-wrap">
      <div class="faq-title-sec">Frequently Asked Questions</div>
      <div class="faq-item">
        <div class="faq-q" onclick="faq(this)">What AI model powers Img2Prompt? <span class="faq-arrow">▼</span></div>
        <div class="faq-a">We use LLaVA 1.5 7B, a powerful vision-language model running on Cloudflare's global GPU network for ultra-fast, accurate results anywhere in the world.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q" onclick="faq(this)">Can I cancel my subscription anytime? <span class="faq-arrow">▼</span></div>
        <div class="faq-a">Yes, absolutely. Cancel anytime from your account settings with no questions asked. You'll keep access until the end of your billing period.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q" onclick="faq(this)">Are my images stored or used for training? <span class="faq-arrow">▼</span></div>
        <div class="faq-a">No. Your images are processed in real-time and never stored on our servers. We take your privacy very seriously.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q" onclick="faq(this)">What image formats are supported? <span class="faq-arrow">▼</span></div>
        <div class="faq-a">We support PNG, JPG, WEBP, and GIF formats up to 4MB. For best results, use high-resolution images with clear subjects.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q" onclick="faq(this)">Do you offer refunds? <span class="faq-arrow">▼</span></div>
        <div class="faq-a">Yes, we offer a 7-day money-back guarantee. If you're not satisfied, contact us and we'll refund you immediately, no questions asked.</div>
      </div>
    </div>
  </div>
</div>

<!-- ============ LOGIN ============ -->
<div id="page-login" class="page">
  <div class="auth-wrap">
    <div class="auth-card">
      <div class="auth-logo">Img2<span>Prompt</span></div>
      <div class="auth-title">Welcome Back 👋</div>
      <div class="auth-sub">Sign in to your account or create a new one</div>
      <div class="auth-tabs">
        <button class="auth-tab active" onclick="switchAuth('login',this)">Sign In</button>
        <button class="auth-tab" onclick="switchAuth('signup',this)">Sign Up</button>
      </div>
      <div id="auth-login-form">
        <button class="google-btn">
          <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Continue with Google
        </button>
        <div class="auth-div">or</div>
        <div class="form-group"><label>Email</label><input type="email" class="form-inp" placeholder="you@example.com"></div>
        <div class="form-group"><label>Password</label><input type="password" class="form-inp" placeholder="••••••••"></div>
        <button class="form-btn" onclick="fakeLogin()">Sign In →</button>
      </div>
      <div id="auth-signup-form" style="display:none">
        <button class="google-btn">
          <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Sign up with Google
        </button>
        <div class="auth-div">or</div>
        <div class="form-group"><label>Full Name</label><input type="text" class="form-inp" placeholder="Your name"></div>
        <div class="form-group"><label>Email</label><input type="email" class="form-inp" placeholder="you@example.com"></div>
        <div class="form-group"><label>Password</label><input type="password" class="form-inp" placeholder="Min. 8 characters"></div>
        <button class="form-btn" onclick="fakeLogin()">Create Account →</button>
      </div>
    </div>
  </div>
</div>

<!-- FOOTER -->
<footer>
  <div class="footer-inner">
    <div class="footer-top">
      <div>
        <div class="footer-brand-logo">Img2<span>Prompt</span></div>
        <div class="footer-brand-desc">AI-powered image to prompt generator. Built for creators, designers, and developers who demand the best AI tools.</div>
      </div>
      <div class="footer-col">
        <h4>Tools</h4>
        <a class="f-link" onclick="goPage('img2prompt')">Image to Prompt</a>
        <a class="f-link" onclick="goPage('text2img')">Text to Image</a>
        <a class="f-link" onclick="showSoon()">Batch Processing</a>
        <a class="f-link" onclick="goPage('api')">API Access</a>
        <a class="f-link" onclick="showSoon()">Translate Prompt</a>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <a class="f-link" onclick="showSoon()">About Us</a>
        <a class="f-link" onclick="showSoon()">Blog</a>
        <a class="f-link" onclick="goPage('pricing')">Pricing</a>
        <a class="f-link" onclick="showSoon()">Contact</a>
        <a class="f-link" onclick="showSoon()">Affiliates</a>
      </div>
      <div class="footer-col">
        <h4>Legal</h4>
        <a class="f-link" onclick="showSoon()">Privacy Policy</a>
        <a class="f-link" onclick="showSoon()">Terms of Service</a>
        <a class="f-link" onclick="showSoon()">Cookie Policy</a>
        <a class="f-link" onclick="showSoon()">GDPR</a>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-copy">© 2025 <a href="#">Img2Prompt.com</a> · All rights reserved · Powered by Cloudflare Workers AI</div>
      <div class="footer-links-b">
        <a onclick="showSoon()">Twitter</a>
        <a onclick="showSoon()">LinkedIn</a>
        <a onclick="showSoon()">Discord</a>
      </div>
    </div>
  </div>
</footer>

<script>
const WORKER = 'https://image-to-prompt.tiktoktvmovies.workers.dev';
let freeUsed = parseInt(sessionStorage.getItem('fu') || '0');

function updateUsage() {
  const r = Math.max(0, 5 - freeUsed);
  document.getElementById('usageCount').textContent = r;
}
updateUsage();

// Navigation
function goPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  window.scrollTo(0, 0);
}
function toggleMob() { document.getElementById('mobNav').classList.toggle('open'); }

// Auth
function switchAuth(tab, btn) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('auth-login-form').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('auth-signup-form').style.display = tab === 'signup' ? 'block' : 'none';
}
function fakeLogin() {
  document.getElementById('loginBtnNav').textContent = '👤 Profile';
  goPage('img2prompt');
}

// Hero demo
let heroImg = null;
function heroHandleFile(f) {
  if (!f || f.size > 4*1024*1024) return;
  const r = new FileReader();
  r.onload = e => {
    heroImg = e.target.result;
    document.getElementById('heroPrevImg').src = heroImg;
    document.getElementById('heroPrev').classList.add('show');
    document.getElementById('heroGenBtn').disabled = false;
  };
  r.readAsDataURL(f);
}
async function heroGenerate() {
  if (!heroImg) return;
  const btn = document.getElementById('heroGenBtn');
  btn.disabled = true;
  document.getElementById('heroTxt').textContent = 'Analyzing...';
  document.getElementById('heroIcon').innerHTML = '<div style="width:14px;height:14px;border:2px solid rgba(255,255,255,0.3);border-top-color:white;border-radius:50%;animation:spin 0.8s linear infinite;display:inline-block"></div>';
  document.getElementById('heroResult').style.display = 'none';
  try {
    const res = await fetch(WORKER, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({image: heroImg}) });
    const data = await res.json();
    const desc = data?.result?.description || data?.description || 'No description returned.';
    document.getElementById('heroResultTxt').textContent = desc;
    document.getElementById('heroResult').style.display = 'block';
    freeUsed++; sessionStorage.setItem('fu', freeUsed); updateUsage();
  } catch(e) {
    document.getElementById('heroErr').textContent = '⚠️ Error: ' + e.message;
    document.getElementById('heroErr').classList.add('show');
  } finally {
    btn.disabled = false;
    document.getElementById('heroTxt').textContent = 'Generate Prompt';
    document.getElementById('heroIcon').textContent = '✨';
  }
}

// Main tool
let mainImg = null;
const dz = document.getElementById('mainDz');
dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('over'); });
dz.addEventListener('dragleave', () => dz.classList.remove('over'));
dz.addEventListener('drop', e => { e.preventDefault(); dz.classList.remove('over'); if(e.dataTransfer.files[0]) mainHandleFile(e.dataTransfer.files[0]); });

function mainHandleFile(f) {
  if (!f) return;
  if (f.size > 4*1024*1024) { showMainErr('File too large. Max 4MB.'); return; }
  const r = new FileReader();
  r.onload = e => {
    mainImg = e.target.result;
    document.getElementById('mainPrevImg').src = mainImg;
    document.getElementById('mainPrev').classList.add('show');
    document.getElementById('mainGenBtn').disabled = false;
    hideMainErr();
  };
  r.readAsDataURL(f);
}
async function mainGenerate() {
  if (!mainImg) return;
  if (freeUsed >= 5) { showMainErr('Daily limit reached. Upgrade to Pro for unlimited access.'); goPage('pricing'); return; }
  const btn = document.getElementById('mainGenBtn');
  btn.disabled = true;
  document.getElementById('mainTxt').textContent = 'Analyzing...';
  document.getElementById('mainIcon').innerHTML = '<div class="spinner"></div>';
  document.getElementById('mainResult').classList.remove('show');
  hideMainErr();
  try {
    const res = await fetch(WORKER, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({image: mainImg}) });
    if (!res.ok) throw new Error('Server error ' + res.status);
    const data = await res.json();
    const desc = data?.result?.description || data?.description || 'No description returned.';
    document.getElementById('mainResultTxt').textContent = desc;
    document.getElementById('mainResult').classList.add('show');
    freeUsed++; sessionStorage.setItem('fu', freeUsed); updateUsage();
  } catch(e) { showMainErr('Error: ' + e.message); }
  finally {
    btn.disabled = false;
    document.getElementById('mainTxt').textContent = 'Generate Prompt';
    document.getElementById('mainIcon').textContent = '✨';
  }
}
function copyMain() {
  navigator.clipboard.writeText(document.getElementById('mainResultTxt').textContent).then(() => {
    document.querySelector('.copy-b').textContent = '✅ Copied!';
    setTimeout(() => document.querySelector('.copy-b').textContent = '📋 Copy', 2000);
  });
}
function showMainErr(m) { const e=document.getElementById('mainErr'); e.textContent='⚠️ '+m; e.classList.add('show'); }
function hideMainErr() { document.getElementById('mainErr').classList.remove('show'); }

// Text to image
function pickStyle(btn) {
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
}
function t2iGen() {
  const p = document.getElementById('t2iPrompt').value.trim();
  if (!p) return;
  const e = document.getElementById('t2iErr');
  e.textContent = '✦ Text to Image requires a Pro account. Upgrade to unlock.';
  e.classList.add('show');
}

// FAQ
function faq(el) {
  const a = el.nextElementSibling;
  const arr = el.querySelector('.faq-arrow');
  a.classList.toggle('open');
  arr.classList.toggle('open');
}

function showSoon() { alert('🚀 Coming soon! This feature is under development.'); }
</script>
</body>
</html>
`;
    return new Response(html, {
      headers: { 'Content-Type': 'text/html;charset=UTF-8' }
    });
  },
};
